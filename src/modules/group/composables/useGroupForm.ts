import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

import { FieldSchema, FormSchema, getValidateCodes } from '@/core'
import { useAlert } from '@/core'

import { GroupService } from '../services/group.service'
import { useGroupStore } from '../store/group.store'
import { GroupDetailResponse } from '../utils/types'

export function useGroupForm() {
	const { t, locale } = useI18n()
	const groupStore = useGroupStore()
	const { showAlert } = useAlert()
	const groupId = ref<number | undefined>(undefined)

	const {
		loaddingGroup,
		showModalEditGroup,
		showModalCreateGroup,
		fields,
		permissions: permissionList,
	} = storeToRefs(groupStore)
	const schema = computed(() =>
		z.object({
			name: z.string().min(1, t('validates.required', { name: t('message.group.name') })),
			permissions: z.any(),
		}),
	)

	const fieldWithLocale = computed(() => {
		return fields.value.map((item) => {
			let name = ''
			try {
				name = JSON.parse(item.name)[locale.value]
			} catch (error) {
				name = ''
			}
			return {
				...item,
				name,
			}
		})
	})

	const preparePermissions = (permissions: Record<string, Record<string, boolean>>) => {
		return Object.entries(permissions).flatMap(([screenId, sub]) =>
			Object.entries(sub)
				.filter(([, value]) => value)
				.map(([permissionId]) => ({
					field_id: Number(screenId),
					permission_id: Number(permissionId),
				})),
		)
	}

	const {
		handleSubmit,
		defineField,
		errors,
		resetForm: reset,
	} = useForm({
		validationSchema: computed(() => toTypedSchema(schema.value)),
		initialValues: {
			name: '',
			permissions: {},
		},
	})

	const onSubmit = handleSubmit(async (values) => {
		loaddingGroup.value = true

		if (showModalCreateGroup.value) {
			const result = await GroupService.createGroup({
				name: values.name.trim(),
				permissions: preparePermissions(values.permissions),
			})
			if (result.success) {
				await showAlert('success', '', t('message.group.createSuccess'))
				showModalCreateGroup.value = false
				groupStore.setPage(1)
			} else {
				await showAlert('error', '', t(`codes.${getValidateCodes(result.errors)[0]}`))
			}
		} else if (showModalEditGroup.value && groupId.value) {
			const result = await GroupService.updateGroup(groupId.value, {
				name: values.name.trim(),
				permissions: preparePermissions(values.permissions),
			})
			if (result.success) {
				await showAlert('success', '', t('message.group.updateSuccess'))
				showModalEditGroup.value = false
				groupStore.fetchGroups()
			} else {
				await showAlert('error', '', t(`codes.${getValidateCodes(result.errors)[0]}`))
			}
		}

		loaddingGroup.value = false
	})

	const [name, nameAttrs] = defineField('name')
	const [permissions, permissionsAttrs] = defineField('permissions')

	const setForm = (values: GroupDetailResponse) => {
		groupId.value = values.id
		name.value = values.name || ''
		const obj: Record<string, Record<string, boolean>> = {}
		values.permissions.forEach((item) => {
			const obj1: Record<string, boolean> = {}
			item.permissions.forEach((item1) => {
				obj1[item1.permission_id] = true
			})
			obj[item.field_id] = obj1
		})
		permissions.value = obj
	}

	const resetForm = () => {
		reset()
		groupId.value = undefined
	}

	const formSchema = computed<FormSchema>(() => ({
		fieldList: [
			{
				type: 'text',
				label: t('message.group.name'),
				id: 'name',
				required: true,
				errors: computed(() => errors.value.name),
				model: name,
				attrs: {
					...nameAttrs,
					disabled: loaddingGroup.value,
				},
			} as FieldSchema<'text'>,
			{
				type: 'mapping',
				id: 'mapping',
				label: t('message.group.permissions'),
				errors: computed(() => errors.value.permissions),
				model: permissions,
				attrs: {
					...permissionsAttrs,
					list: [fieldWithLocale.value, permissionList.value],
				},
			} as FieldSchema<'mapping'>,
		],
	}))

	return {
		onSubmit,
		formSchema,
		setForm,
		resetForm,
	}
}
