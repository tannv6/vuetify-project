<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormFields, type FormSchema, useAlert } from '@/core'

import { SchoolFormData, schoolSchema } from '../schemas/SchoolSchema'
import { schoolService } from '../services/SchoolService'
import { useEducationStore } from '../store/EducationStore'
import { School } from '../types'

interface Props {
	school: School | null
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

const schoolStore = useEducationStore()

const validationSchema = computed(() => toTypedSchema(schoolSchema(t)))

const { handleSubmit, errors, resetForm, defineField, setFieldError } = useForm<SchoolFormData>({
	validationSchema: validationSchema.value,
	initialValues: props.school,
})

const [name_vn, nameVnAttrs] = defineField('name_vn')
const [name_en, nameEnAttrs] = defineField('name_en')
const [short_name, shortNameAttrs] = defineField('short_name')

watch(
	() => props.school,
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
			? await schoolService.createSchool(values)
			: await schoolService.updateSchool(props.school.id, values)

	if (!response.success) {
		if (response.errors && typeof response.errors === 'object' && !Array.isArray(response.errors)) {
			for (const [field, fieldErrors] of Object.entries(response.errors)) {
				if (Array.isArray(fieldErrors)) {
					const messages = fieldErrors.map((error) =>
						t(`codes.${error.code}`, { param: t(`message.education.school.${field}`) }),
					)

					setFieldError(field as keyof SchoolFormData, messages.join(', '))
				}
			}
		}

		return
	}
	showAlert('success', t(`alert.success.${props.type}`))

	schoolStore.getSchools()

	emit('submit')
})

const onCancel = () => {
	emit('cancel')
}

const communeWardFormSchema: FormSchema = {
	fieldList: [
		{
			type: 'text',
			label: t('message.education.school.name_vn'),
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
			label: t('message.education.school.name_en'),
			id: 'name_en',
			required: true,
			errors: computed(() => errors.value.name_en),
			model: name_en,
			attrs: {
				...nameEnAttrs,
			},
		},
		{
			type: 'text',
			label: t('message.education.school.short_name'),
			id: 'short_name',
			required: false,
			errors: computed(() => errors.value.short_name),
			model: short_name,
			attrs: {
				...shortNameAttrs,
			},
		},
	],
}
</script>

<template>
	<FormFields :formSchema="communeWardFormSchema" @submit="onSubmit" id="school-form"></FormFields>
	<div class="flex justify-end gap-2 mt-4">
		<Button type="button" :label="t('button.cancel')" icon="pi pi-times" @click="onCancel" severity="secondary" />
		<Button type="submit" :label="t('button.save')" icon="pi pi-check" form="school-form" />
	</div>
</template>
