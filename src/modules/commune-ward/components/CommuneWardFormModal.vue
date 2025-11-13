<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { Province } from '@/modules/province'

import { CommuneWardFormData } from '../schemas/CommuneWardSchema'
import { CommuneWard } from '../types'
import CommuneWardForm from './CommuneWardForm.vue'

const { t } = useI18n()

interface Props {
	modalVisible: boolean
	communeWard: CommuneWard
	provinces: Province[]
	type: 'create' | 'edit'
}

interface Emits {
	(e: 'update:modalVisible', value: boolean): void
	(e: 'save', value: CommuneWardFormData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSave = (formData: CommuneWardFormData) => {
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
		:header="props.type === 'create' ? t('message.communeWard.add') : t('message.communeWard.edit')"
		:modal="true"
	>
		<CommuneWardForm :communeWard="communeWard" :provinces="provinces" @submit="handleSave" @cancel="closeModal" />
	</Dialog>
</template>
