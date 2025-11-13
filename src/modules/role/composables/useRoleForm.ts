import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

import { FieldSchema, FormSchema, getValidateCodes, OptionWithRelation } from '@/core'
import { useAlert } from '@/core'

import { RoleService } from '../services/role.service'
import { useRoleStore } from '../store/role.store'
import { RoleDetailResponse } from '../utils/types'

export function useRoleForm() {
	const { t } = useI18n()
	const roleStore = useRoleStore()
	const { showAlert } = useAlert()
	const roleId = ref<number | undefined>(undefined)

	const { loaddingRole, showModalEditRole, showModalCreateRole, screens: listScreens } = storeToRefs(roleStore)
	const schema = computed(() =>
		z.object({
			name: z.string().min(1, t('validates.required', { name: t('message.role.name') })),
			isDefault: z.enum(['0', '1']),
			permissions: z.any(),
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
			isDefault: undefined,
			permissions: {},
		},
	})

	const preparePermissions = (permissions: Record<string, Record<string, boolean>>) => {
		return Object.entries(permissions).flatMap(([screenId, sub]) =>
			Object.entries(sub)
				.filter(([, value]) => value)
				.map(([permissionId]) => ({
					screen_id: Number(screenId),
					permission_id: Number(permissionId),
				})),
		)
	}

	const onSubmit = handleSubmit(async (values) => {
		loaddingRole.value = true
		if (showModalCreateRole.value) {
			const result = await RoleService.createRole({
				name: values.name.trim(),
				is_default: (Number(values.isDefault) || 0) as 1 | 0,
				permissions: preparePermissions(values.permissions),
			})
			if (result.success) {
				await showAlert('success', '', t('message.role.createSuccess'))
				showModalCreateRole.value = false
				roleStore.setPage(1)
			} else {
				await showAlert(
					'error',
					'',
					t(`codes.${getValidateCodes(result.errors)[0]}`, { attribute: t('message.role.setDefault') }),
				)
			}
		} else if (showModalEditRole.value && roleId.value) {
			const result = await RoleService.updateRole(roleId.value, {
				name: values.name.trim(),
				is_default: (Number(values.isDefault) || 0) as 1 | 0,
				permissions: preparePermissions(values.permissions),
			})
			if (result.success) {
				await showAlert('success', '', t('message.role.updateSuccess'))
				showModalEditRole.value = false
				roleStore.fetchRoles()
			} else {
				await showAlert(
					'error',
					'',
					t(`codes.${getValidateCodes(result.errors)[0]}`, { attribute: t('message.role.setDefault') }),
				)
			}
		}

		loaddingRole.value = false
	})

	const [name, nameAttrs] = defineField('name')
	const [isDefault, isDefaultAttrs] = defineField('isDefault')
	const [permissions, permissionsAttrs] = defineField('permissions')

	const setForm = (values: RoleDetailResponse) => {
		roleId.value = values.id
		name.value = values.name ?? ''
		isDefault.value = values.is_default ? '1' : '0'

		permissions.value = (values.permissions || []).reduce<Record<string, Record<string, boolean>>>((acc, item) => {
			acc[item.screen_id] = {}
			item.permissions.forEach((p) => {
				acc[item.screen_id][p.permission_id] = true
			})
			return acc
		}, {})
	}

	const resetForm = () => {
		reset()
		roleId.value = undefined
	}

	watch(
		() => [listScreens.value],
		([newVal]) => {
			if (newVal.length) {
				newVal.forEach((screen) => {
					if (permissions.value[screen.id] === undefined) {
						permissions.value[screen.id] = {}
					}
				})
			}
		},
	)

	const formSchema = computed<FormSchema>(() => ({
		fieldList: [
			{
				type: 'text',
				label: t('message.role.name'),
				id: 'name',
				required: true,
				errors: computed(() => errors.value.name),
				model: name,
				attrs: {
					...nameAttrs,
					disabled: loaddingRole.value,
				},
			} as FieldSchema<'text'>,
			{
				type: 'checkbox',
				label: t('message.role.setDefault'),
				id: 'isChooseUser',
				errors: computed(() => errors.value.isDefault),
				model: isDefault,
				attrs: {
					...isDefaultAttrs,
					disabled: loaddingRole.value,
					trueValue: '1',
					falseValue: '0',
				},
			} as FieldSchema<'checkbox'>,
			{
				type: 'relations',
				label: t('message.role.permissions'),
				id: 'permissions',
				errors: computed(() => errors.value.permissions),
				model: permissions,
				attrs: {
					...permissionsAttrs,
					list: listScreens.value as OptionWithRelation[],
					keyOfChildren: 'permissions',
					disabled: loaddingRole.value,
				},
			} as FieldSchema<'relations'>,
		],
	}))

	return {
		onSubmit,
		formSchema,
		setForm,
		resetForm,
	}
}
