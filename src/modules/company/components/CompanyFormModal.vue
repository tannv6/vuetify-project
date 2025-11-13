<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { Company } from '../types'
import CompanyForm from './CompanyForm.vue'

const { t } = useI18n()

interface Props {
	modalVisible: boolean
	company: Company | null
	type: 'create' | 'edit'
}

interface Emits {
	(e: 'update:modalVisible', value: boolean): void
	(e: 'save'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSave = () => {
	emit('save')
}

const closeModal = () => {
	emit('update:modalVisible', false)
}
</script>

<template>
	<Dialog
		:visible="modalVisible"
		@close="closeModal"
		:header="props.type === 'create' ? t('message.company.add') : t('message.company.edit')"
		:modal="true"
	>
		<CompanyForm :company="company" @submit="handleSave" :type="props.type" @cancel="closeModal" />
	</Dialog>
</template>
