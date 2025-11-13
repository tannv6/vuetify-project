import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

import { FieldSchema, FormSchema, getValidateCodes } from '@/core'
import { useAlert } from '@/core'

import { PermissionService } from '../services/permission.service'
import { usePermissionStore } from '../store/permission.store'
import { PermissionDetailResponse } from '../utils/types'

export function usePermissionForm() {
	const { t } = useI18n()
	const permissionStore = usePermissionStore()
	const { showAlert } = useAlert()
	const permissionId = ref<number | undefined>(undefined)

	const { loaddingPermission, showModalEditPermission, showModalCreatePermission } = storeToRefs(permissionStore)
	const schema = computed(() =>
		z.object({
			name: z.string().min(1, t('validates.required', { name: t('message.permission.name') })),
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
		},
	})

	const onSubmit = handleSubmit(async (values) => {
		loaddingPermission.value = true
		if (showModalCreatePermission.value) {
			const result = await PermissionService.createPermission({
				name: values.name.trim(),
			})
			if (result.success) {
				await showAlert('success', '', t('message.permission.createSuccess'))
				showModalCreatePermission.value = false
				permissionStore.setPage(1)
			} else {
				await showAlert('error', '', t(`codes.${getValidateCodes(result.errors)[0]}`))
			}
		} else if (showModalEditPermission.value && permissionId.value) {
			const result = await PermissionService.updatePermission(permissionId.value, {
				name: values.name.trim(),
			})
			if (result.success) {
				await showAlert('success', '', t('message.permission.updateSuccess'))
				showModalEditPermission.value = false
				permissionStore.fetchPermissions()
			} else {
				await showAlert('error', '', t(`codes.${getValidateCodes(result.errors)[0]}`))
			}
		}

		loaddingPermission.value = false
	})

	const [name, nameAttrs] = defineField('name')

	const setForm = (values: PermissionDetailResponse) => {
		permissionId.value = values.id
		name.value = values.name || ''
	}

	const resetForm = () => {
		reset()
		permissionId.value = undefined
	}

	const formSchema = computed<FormSchema>(() => ({
		fieldList: [
			{
				type: 'text',
				label: t('message.permission.name'),
				id: 'name',
				required: true,
				errors: computed(() => errors.value.name),
				model: name,
				attrs: {
					...nameAttrs,
					disabled: loaddingPermission.value,
				},
			} as FieldSchema<'text'>,
		],
	}))

	return {
		onSubmit,
		formSchema,
		setForm,
		resetForm,
	}
}
