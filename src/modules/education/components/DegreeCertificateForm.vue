<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormFields, type FormSchema, useAlert } from '@/core'

import { DegreeCertificateFormData, degreeCertificateSchema } from '../schemas/DegreeCertificateSchema'
import { degreeCertificateService } from '../services/DegreeCertificateService'
import { useEducationStore } from '../store/EducationStore'
import { DegreeCertificate } from '../types'

interface Props {
	degreeCertificate: DegreeCertificate | null
	type: string
}

interface Emits {
	(e: 'submit'): void
	(e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()
const { showAlert } = useAlert()

const educationStore = useEducationStore()

const validationSchema = computed(() => toTypedSchema(degreeCertificateSchema(t)))

const { handleSubmit, errors, resetForm, defineField, setFieldError } = useForm<DegreeCertificateFormData>({
	validationSchema: validationSchema.value,
	initialValues: props.degreeCertificate,
})

const [name_vn, nameVnAttrs] = defineField('name_vn')
const [name_en, nameEnAttrs] = defineField('name_en')

watch(
	() => props.degreeCertificate,
	(newData) => {
		if (newData) {
			resetForm({ values: newData })
		} else {
			resetForm()
		}
	},
	{ immediate: true },
)

const onSubmit = handleSubmit(async (values) => {
	const response =
		props.type === 'create'
			? await degreeCertificateService.createDegreeCertificate(values)
			: await degreeCertificateService.updateDegreeCertificate(props.degreeCertificate.id, values)

	if (!response.success) {
		if (response.errors && typeof response.errors === 'object' && !Array.isArray(response.errors)) {
			for (const [field, fieldErrors] of Object.entries(response.errors)) {
				if (Array.isArray(fieldErrors)) {
					const messages = fieldErrors.map((error) =>
						t(`codes.${error.code}`, { param: t(`message.education.degreeCertificate.${field}`) }),
					)

					setFieldError(field as keyof DegreeCertificateFormData, messages.join(', '))
				}
			}
		}

		return
	}
	showAlert('success', t(`alert.success.${props.type}`))

	educationStore.getDegreeCertificates()

	emit('submit')
})

const onCancel = () => {
	emit('cancel')
}

const communeWardFormSchema: FormSchema = {
	fieldList: [
		{
			type: 'text',
			label: t('message.education.degreeCertificate.name_vn'),
			id: 'name_vn',
			required: true,
			errors: computed(() => errors.value.name_vn),
			model: name_vn,
			attrs: {
				...nameVnAttrs,
			},
		},
		{
			type: 'text',
			label: t('message.education.degreeCertificate.name_en'),
			id: 'name_en',
			required: true,
			errors: computed(() => errors.value.name_en),
			model: name_en,
			attrs: {
				...nameEnAttrs,
			},
		},
	],
}
</script>

<template>
	<FormFields :formSchema="communeWardFormSchema" @submit="onSubmit" id="degreeCertificate-form"></FormFields>
	<div class="flex justify-end gap-2 mt-4">
		<Button type="button" :label="t('button.cancel')" icon="pi pi-times" @click="onCancel" severity="secondary" />
		<Button type="submit" :label="t('button.save')" icon="pi pi-check" form="degreeCertificate-form" />
	</div>
</template>
