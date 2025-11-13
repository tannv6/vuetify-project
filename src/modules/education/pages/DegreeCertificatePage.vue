<script setup lang="ts">
import { DataTablePageEvent, Toolbar } from 'primevue'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { CommonTable, PAGE_DEFAULT, useAlert } from '@/core'
import { useAsyncConfirm } from '@/core/composables/useAsyncConfirm'

import DegreeCertificatesFormModal from '../components/DegreeCertificatesFormModal.vue'
import { useDegreeCertificateColumns } from '../composables/useDegreeCertificateColumns'
import { useModal } from '../composables/useModal'
import { degreeCertificateService } from '../services/DegreeCertificateService'
import { useEducationStore } from '../store/EducationStore'
import { DegreeCertificate } from '../types'

const handleToggleApproved = async (rowData: DegreeCertificate, val: boolean) => {
	const res = await degreeCertificateService.approveDegreeCertificate(rowData.id, { is_approve: val })
	if (res.success) {
		rowData.is_approve = val
		showAlert('success', t('alert.success.edit'))
	} else {
		showAlert('error', t('alert.error.edit'))
	}
}

const confirm = useAsyncConfirm()
const { columns: degreeCertificateColumns } = useDegreeCertificateColumns(handleToggleApproved)
const educationStore = useEducationStore()
const { t } = useI18n()
const { showAlert } = useAlert()
const modal = useModal()
const tableAttrs = computed(() => ({
	value: educationStore.degreeCertificates,
	rows: educationStore.filters.perPage,
	totalRecords: educationStore.total,
	first: (educationStore.filters.page - 1) * educationStore.filters.perPage,
	lazy: true,
	onPage: onPage,
}))

const openModal = (degreeCertificate: DegreeCertificate | null = null) => {
	modal.open(degreeCertificate, degreeCertificate ? 'edit' : 'create')
}

const handleSave = async () => {
	modal.close()
}

const handleAction = async (action: string, data: DegreeCertificate) => {
	if (action === 'edit') {
		openModal(data)
	} else if (action === 'delete') {
		const result = await confirm.show({
			message: t('alert.delete.confirm', { item: data.name_en || data.name_vn }),
			icon: 'pi pi-exclamation-triangle',
		})

		if (result) {
			const response = await degreeCertificateService.deleteDegreeCertificate(data.id)

			if (!response.success) {
				showAlert('error', t('alert.error.delete'), t(`codes.${response.errors?.[0] || 'DEFAULT'}`))
				return
			}

			showAlert('success', t('alert.success.delete'))
			educationStore.getDegreeCertificates()
		}
	}
}

onMounted(async () => {
	await educationStore.getDegreeCertificates()
})

const onPage = (event: DataTablePageEvent) => {
	educationStore.setFilters({ perPage: Number(event.rows), page: event.page + 1 })

	educationStore.getDegreeCertificates()
}

const search = (k: string) => {
	educationStore.setFilters({ keyword: k, page: PAGE_DEFAULT })

	educationStore.getDegreeCertificates()
}
</script>

<template>
	<Toolbar class="mb-2">
		<template #start>
			<Button
				:label="t('message.education.degreeCertificate.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="openModal()"
			/>
		</template>
	</Toolbar>
	<CommonTable
		:title="t('menu.education.degreeCertificate')"
		:columns="degreeCertificateColumns"
		:actions="['edit', 'delete']"
		@search="search"
		@editRow="handleAction('edit', $event)"
		@deleteRow="handleAction('delete', $event)"
		:attrs="tableAttrs"
	>
	</CommonTable>
	<DegreeCertificatesFormModal
		v-model:modalVisible="modal.visible.value"
		:degreeCertificate="modal.data.value"
		:type="modal.type.value"
		@save="handleSave"
	/>
</template>

<style>
.p-toggleswitch.p-component.p-toggleswitch-checked {
	pointer-events: none;
}
</style>
