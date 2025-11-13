<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormFields } from '@/core'
import { useAsyncConfirm } from '@/core/composables/useAsyncConfirm'

import { usePositionForm } from '../composables/usePositionForm'
import { PositionService } from '../services/position.service'
import { usePositionStore } from '../store/position.store'

const positionStore = usePositionStore()
const { showModalCreatePosition, showModalEditPosition, positionActive, loaddingPosition } = storeToRefs(positionStore)

const { t } = useI18n()
const { fail } = useAsyncConfirm()
const { onSubmit, formSchema, setForm, resetForm } = usePositionForm()

watch(
	showModalEditPosition,
	async (val) => {
		if (val && positionActive.value) {
			loaddingPosition.value = true
			const { success, data, errors } = await PositionService.fetchPositionDetail(positionActive.value.id)
			await positionStore.fetchPositions()
			if (success) {
				if (data) setForm(data)
				loaddingPosition.value = false
			} else {
				await fail(t(`codes.${errors?.[0] || 'DEFAULT'}`))
				loaddingPosition.value = false
				showModalEditPosition.value = false
			}
		}
	},
	{ immediate: true },
)

watch(
	showModalCreatePosition,
	(val) => {
		if (val) {
			resetForm()
		}
	},
	{ immediate: true },
)

const visible = computed(() => {
	return showModalCreatePosition.value || showModalEditPosition.value
})

const handleHideModal = () => {
	showModalCreatePosition.value = false
	showModalEditPosition.value = false
}
</script>
<template>
	<Dialog
		:header="showModalCreatePosition ? t('message.position.add') : t('message.position.edit')"
		:visible="visible"
		:modal="true"
		class="w-[calc(100%-2rem)] md:w-[50rem]"
		scrollable
		:closeButtonProps="{ onClick: handleHideModal, variant: 'text', rounded: true }"
	>
		<FormFields :form-schema="formSchema" @submit="onSubmit" id="position-form"></FormFields>
		<template #footer>
			<Button label="Cancel" icon="pi pi-times" severity="secondary" @click="handleHideModal" />
			<Button label="Save" icon="pi pi-check" type="submit" form="position-form" />
		</template>
	</Dialog>
</template>
