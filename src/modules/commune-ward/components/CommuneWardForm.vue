<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormFields, type FormSchema, Option } from '@/core'

import { type CommuneWardFormData, communeWardSchema } from '../schemas/CommuneWardSchema'
import { CommuneWard } from '../types'

interface Props {
	communeWard?: CommuneWard | null
	provinces: Option[]
}

interface Emits {
	(e: 'submit', value: CommuneWardFormData): void
	(e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

const validationSchema = computed(() => toTypedSchema(communeWardSchema(t)))

const { handleSubmit, errors, resetForm, defineField } = useForm<CommuneWardFormData>({
	validationSchema: validationSchema.value,
	initialValues: props.communeWard,
})

const [name, nameAttrs] = defineField('name')
const [province_id, provinceAttrs] = defineField('province_id')

watch(
	() => props.communeWard,
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

const communeWardFormSchema: FormSchema = {
	fieldList: [
		{
			type: 'text',
			label: t('message.communeWard.name'),
			id: 'name',
			required: true,
			errors: computed(() => errors.value.name),
			model: name,
			attrs: {
				...nameAttrs,
			},
		},
		{
			type: 'select',
			label: t('message.province.name'),
			id: 'provinceId',
			required: true,
			errors: computed(() => errors.value.province_id),
			model: province_id,
			attrs: {
				...provinceAttrs,
				filter: true,
			},
			optionList: props.provinces,
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
