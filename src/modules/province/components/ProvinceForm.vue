<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormFields, type FormSchema } from '@/core'

import { type ProvinceFormData, provinceSchema } from '../schemas/provinceSchema'

interface Props {
	initialData?: ProvinceFormData | null
}

interface Emits {
	(e: 'submit', value: ProvinceFormData): void
	(e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

const validationSchema = computed(() => toTypedSchema(provinceSchema(t)))

const { handleSubmit, errors, resetForm, defineField } = useForm<ProvinceFormData>({
	validationSchema: validationSchema.value,
	initialValues: props.initialData || {
		name: '',
	},
})

const [name, nameAttrs] = defineField('name')

watch(
	() => props.initialData,
	(newData) => {
		if (newData) {
			resetForm({ values: newData })
		} else {
			resetForm()
		}
	},
	{ immediate: true },
)

const onSubmit = handleSubmit((values) => {
	emit('submit', values)
})

const onCancel = () => {
	emit('cancel')
}

const provinceFormSchema: FormSchema = {
	fieldList: [
		{
			type: 'text',
			label: t('message.province.name'),
			id: 'name',
			required: true,
			errors: computed(() => errors.value.name),
			model: name,
			attrs: {
				...nameAttrs,
			},
		},
	],
}
</script>

<template>
	<FormFields :form-schema="provinceFormSchema" @submit="onSubmit" id="province-form"></FormFields>
	<div class="flex justify-end gap-2 mt-4">
		<Button type="button" :label="t('button.cancel')" icon="pi pi-times" @click="onCancel" severity="secondary" />
		<Button type="submit" :label="t('button.save')" icon="pi pi-check" form="province-form" />
	</div>
</template>
