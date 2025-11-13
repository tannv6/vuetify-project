<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { ProvinceFormData } from '../schemas/provinceSchema'
import ProvinceForm from './ProvinceForm.vue'

const { t } = useI18n()

interface Props {
	modalVisible: boolean
	province?: any
	type: 'create' | 'edit'
}

interface Emits {
	(e: 'update:modalVisible', value: boolean): void
	(e: 'save', value: ProvinceFormData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSave = (formData: ProvinceFormData) => {
	emit('save', formData)
}

const closeModal = () => {
	emit('update:modalVisible', false)
}
</script>

<template>
	<Dialog
		:visible="modalVisible"
		@close="closeModal"
		:header="props.type === 'create' ? t('message.province.add') : t('message.province.edit')"
		:modal="true"
	>
		<ProvinceForm :initialData="province" @submit="handleSave" @cancel="closeModal" />
	</Dialog>
</template>
