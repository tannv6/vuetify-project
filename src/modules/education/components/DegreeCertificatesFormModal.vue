<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { DegreeCertificate } from '../types'
import DegreeCertificateForm from './DegreeCertificateForm.vue'

const { t } = useI18n()

interface Props {
	modalVisible: boolean
	degreeCertificate: DegreeCertificate | null
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
		:header="
			props.type === 'create'
				? t('message.education.degreeCertificate.add')
				: t('message.education.degreeCertificate.edit')
		"
		:modal="true"
	>
		<DegreeCertificateForm
			:degreeCertificate="degreeCertificate"
			@submit="handleSave"
			:type="props.type"
			@cancel="closeModal"
		/>
	</Dialog>
</template>
