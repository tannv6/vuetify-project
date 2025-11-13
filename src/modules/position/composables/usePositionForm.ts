import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

import { FieldSchema, FormSchema, getValidateCodes, GroupChildItem, GroupItem } from '@/core'
import { useAlert } from '@/core/composables/useAlert'

import { PositionService } from '../services/position.service'
import { usePositionStore } from '../store/position.store'
import { buildPositionTreeSelect, mapPositionLevel, mapPositionLevelCode } from '../utils/function'
import { CreatePositionRequest, PositionDetailResponse, UpdatePositionRequest } from '../utils/types'

export function usePositionForm() {
	const { t } = useI18n()
	const positionStore = usePositionStore()
	const { showAlert } = useAlert()
	const positionId = ref<number | undefined>(undefined)

	const { loaddingPosition, showModalEditPosition, showModalCreatePosition, positions } = storeToRefs(positionStore)

	const positionTree = computed(() => {
		return buildPositionTreeSelect(positions.value, positionId.value)
	})

	const schema = computed(() =>
		z.object({
			name: z.string().min(1, t('validates.required', { name: t('message.position.name') })),
			parentId: z.any().optional(),
			levels: z.any(),
			levelCodes: z.any(),
		}),
	)

	const {
		handleSubmit,
		defineField,
		errors,
		resetForm: reset,
	} = useForm({
		validationSchema: computed(() => toTypedSchema(schema.value)),
		initialValues: {
			name: '',
			parentId: null,
			levels: [],
			levelCodes: [],
		},
	})

	const getId = (id: string | number | null) => (typeof id === 'string' && id.startsWith('new-') ? null : Number(id))

	const prepareLevels = (levels: GroupItem[]) => {
		return levels.map((level) => {
			return {
				level: {
					id: getId(level.id),
					name: level.name,
				},
				level_code: level.children?.map((child) => {
					return {
						id: getId(child.id),
						name: child.name,
					}
				}),
			}
		})
	}

	const prepareLevelCodes = (levelCodes: GroupChildItem[]) => {
		return levelCodes.map((levelCode) => {
			return {
				id: getId(levelCode.id),
				name: levelCode.name,
			}
		})
	}

	const onSubmit = handleSubmit(async (values) => {
		loaddingPosition.value = true
		const parentId = Number(Object.keys(values.parentId || {})[0]) || null
		if (showModalCreatePosition.value) {
			const params: CreatePositionRequest = {
				name: values.name.trim(),
				parent_id: parentId,
			}
			if (parentId) {
				if (values.levels.length > 0) {
					params['levels'] = prepareLevels(values.levels)
				} else if (values.levelCodes.length > 0) {
					params['level_code'] = prepareLevelCodes(values.levelCodes)
				}
			}
			const result = await PositionService.createPosition(params)
			if (result.success) {
				await showAlert('success', '', t('message.position.createSuccess'))
				showModalCreatePosition.value = false
				positionStore.fetchPositions()
			} else {
				await showAlert('error', '', t(`codes.${getValidateCodes(result.errors)[0]}`))
			}
		} else if (showModalEditPosition.value && positionId.value) {
			const params: UpdatePositionRequest = {
				name: values.name.trim(),
				parent_id: parentId,
			}
			if (parentId) {
				if (values.levels.length > 0) {
					params['levels'] = prepareLevels(values.levels)
				} else if (values.levelCodes.length > 0) {
					params['level_code'] = prepareLevelCodes(values.levelCodes)
				}
			}
			const result = await PositionService.updatePosition(positionId.value, params)
			if (result.success) {
				await showAlert('success', '', t('message.position.updateSuccess'))
				showModalEditPosition.value = false
				positionStore.fetchPositions()
			} else {
				await showAlert('error', '', t(`codes.${getValidateCodes(result.errors)[0]}`))
			}
		}

		loaddingPosition.value = false
	})

	const [name, nameAttrs] = defineField('name')
	const [parentId, parentIdAttrs] = defineField('parentId')
	const [levels, levelsAttrs] = defineField('levels')
	const [levelCodes, levelCodesAttrs] = defineField('levelCodes')

	const setForm = (values: PositionDetailResponse) => {
		positionId.value = values.id
		name.value = values.name || ''
		parentId.value =
			values.parent_id && positions.value.find((item) => item.id === values.parent_id)
				? { [values.parent_id]: true }
				: null
		if (values.levels.length > 0) {
			levels.value = mapPositionLevel(values.levels)
		} else if (values.level_code.length > 0) {
			levelCodes.value = mapPositionLevelCode(values.level_code)
		} else {
			levels.value = []
			levelCodes.value = []
		}
	}

	const resetForm = () => {
		reset()
		positionId.value = undefined
		loaddingPosition.value = false
		parentId.value = null
		levels.value = []
		levelCodes.value = []
	}

	const formSchema = computed<FormSchema>(() => ({
		fieldList: [
			{
				type: 'text',
				label: t('message.position.name'),
				id: 'name',
				required: true,
				errors: computed(() => errors.value.name),
				model: name,
				attrs: {
					...nameAttrs,
					disabled: loaddingPosition.value,
				},
			} as FieldSchema<'text'>,
			{
				type: 'treeselect',
				label: t('message.position.parent'),
				id: 'parent',
				errors: computed(() => errors.value.parentId),
				model: parentId,
				optionList: positionTree.value,
				placeholder: t('message.position.chooseParent'),
				attrs: {
					...parentIdAttrs,
					disabled: loaddingPosition.value,
					showClear: true,
					filter: true,
				},
			} as FieldSchema<'treeselect'>,
			{
				type: 'grouplist',
				label: t('message.position.level'),
				id: 'level',
				errors: computed(() => errors.value.levels),
				model: levels,
				isHide: parentId.value === null,
				attrs: {
					...levelsAttrs,
					deep: 2,
					disabled: loaddingPosition.value || levelCodes.value.length > 0,
					labels: [t('message.position.addLevel'), t('message.position.addLevelCode')],
					placeholders: [t('message.position.level'), t('message.position.levelCode')],
				},
			} as FieldSchema<'grouplist'>,
			{
				type: 'grouplist',
				label: t('message.position.levelCode'),
				id: 'level_code',
				errors: computed(() => errors.value.levelCodes),
				model: levelCodes,
				isHide: parentId.value === null,
				attrs: {
					...levelCodesAttrs,
					disabled: loaddingPosition.value || levels.value.length > 0,
					deep: 1,
					labels: [t('message.position.addLevelCode')],
					placeholders: [t('message.position.levelCode')],
				},
			} as FieldSchema<'grouplist'>,
		],
	}))

	return {
		onSubmit,
		formSchema,
		setForm,
		resetForm,
	}
}
