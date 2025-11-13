<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { School } from '../types'
import SchoolForm from './SchoolForm.vue'

const { t } = useI18n()

interface Props {
	modalVisible: boolean
	school: School | null
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
		:header="props.type === 'create' ? t('message.education.school.add') : t('message.education.school.edit')"
		:modal="true"
	>
		<SchoolForm :school="school" @submit="handleSave" :type="props.type" @cancel="closeModal" />
	</Dialog>
</template>
