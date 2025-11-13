<script setup lang="ts">
import { DataTablePageEvent, Toolbar } from 'primevue'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { CommonTable, PAGE_DEFAULT, useAlert } from '@/core'
import { useAsyncConfirm } from '@/core/composables/useAsyncConfirm'

import CommuneWardFormModal from '../components/CommuneWardFormModal.vue'
import { useCommuneWardColumns } from '../composables/useCommuneWardColumns'
import { useModal } from '../composables/useModal'
import { useProvinceFilter } from '../composables/useProvinceFilter'
import { CommuneWardFormData } from '../schemas/CommuneWardSchema'
import { communeWardService } from '../services/CommuneWardService'
import { useCommuneWardStore } from '../store/communeWardStore'

const { columns: CommuneWardColumns } = useCommuneWardColumns()
const communeWardStore = useCommuneWardStore()
const { t } = useI18n()
const { showAlert } = useAlert()
const modal = useModal()
const provinceFilter = useProvinceFilter()
const confirm = useAsyncConfirm()

const tableAttrs = computed(() => ({
	value: communeWardStore.communeWards,
	rows: communeWardStore.filters.perPage,
	loading: communeWardStore.loading,
	totalRecords: communeWardStore.total,
	first: (communeWardStore.filters.page - 1) * communeWardStore.filters.perPage,
	lazy: true,
	onPage: onPage,
}))

const openModal = (communeWard: any = null) => {
	modal.open(communeWard, communeWard ? 'edit' : 'create')
}

const handleAction = async (action: string, data: any) => {
	if (action === 'edit') {
		openModal(data)
	} else if (action === 'delete') {
		const result = await confirm.show({
			message: t('alert.delete.confirm', { item: data.name }),
			icon: 'pi pi-exclamation-triangle',
		})

		if (result) {
			const response = await communeWardService.deleteCommuneWard(data.id)

			if (!response.success) {
				showAlert('error', t('alert.error.delete'), t(`codes.${response.errors?.[0] || 'DEFAULT'}`))
				return
			}

			showAlert('success', t('alert.success.delete'))
			communeWardStore.getCommuneWards()
		}
	}
}

const handleSave = async (formData: CommuneWardFormData) => {
	const response =
		modal.type.value === 'create'
			? await communeWardService.createCommuneWard(formData)
			: await communeWardService.updateCommuneWard(modal.data.value.id, formData)

	if (!response.success) {
		showAlert('error', t(`alert.error.${modal.type.value}`))
		return
	}
	showAlert('success', t(`alert.success.${modal.type.value}`))
	modal.close()

	communeWardStore.getCommuneWards()
}

onMounted(async () => {
	await provinceFilter.fetchProvinces()
	communeWardStore.getCommuneWards()
})

const onPage = (event: DataTablePageEvent) => {
	updateFilterAndFetch({ perPage: Number(event.rows), page: event.page + 1 })
}

const search = (k: string) => {
	updateFilterAndFetch({ keyword: k, page: PAGE_DEFAULT })
}

const updateFilterAndFetch = (filters: Record<string, any>) => {
	communeWardStore.setFilters(filters)
	communeWardStore.getCommuneWards()
}
</script>

<template>
	<Toolbar class="mb-2">
		<template #start>
			<Button
				:label="t('message.communeWard.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="openModal()"
			/>
		</template>
	</Toolbar>
	<CommonTable
		:title="t('menu.address.communeWards')"
		:columns="CommuneWardColumns"
		:actions="['edit', 'delete']"
		@search="search"
		@editRow="handleAction('edit', $event)"
		@deleteRow="handleAction('delete', $event)"
		:attrs="tableAttrs"
		:customFilters="true"
	>
		<template #filters>
			<AutoComplete
				v-model="provinceFilter.firstProvince"
				optionLabel="name"
				dropdown
				:suggestions="provinceFilter.filteredProvinces.value"
				@complete="provinceFilter.searchProvince"
				@item-select="provinceFilter.onProvinceSelect"
			/>
		</template>
	</CommonTable>
	<CommuneWardFormModal
		v-model:modalVisible="modal.visible.value"
		:communeWard="modal.data.value"
		:type="modal.type.value"
		:provinces="provinceFilter.provinces.value"
		@save="handleSave"
	/>
</template>
