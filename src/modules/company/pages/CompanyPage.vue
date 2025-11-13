<script setup lang="ts">
import { DataTablePageEvent, Toolbar } from 'primevue'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { CommonTable, PAGE_DEFAULT, useAlert } from '@/core'
import { useAsyncConfirm } from '@/core/composables/useAsyncConfirm'

import CompanyFormModal from '../components/CompanyFormModal.vue'
import { useCompanyColumns } from '../composables/useCompanyColumns'
import { useModal } from '../composables/useModal'
import { companyService } from '../services/CompanyService'
import { useCompanyStore } from '../store/CompanyStore'
import { Company } from '../types'

const handleToggleApproved = async (rowData: Company, val: boolean) => {
	const res = await companyService.approveCompany(rowData.id, { is_approve: val })
	if (res.success) {
		rowData.is_approve = val
		showAlert('success', t('alert.success.edit'))
	} else {
		showAlert('error', t('alert.error.edit'))
	}
}

const confirm = useAsyncConfirm()
const { columns: companyColumns } = useCompanyColumns(handleToggleApproved)
const companyStore = useCompanyStore()
const { t } = useI18n()
const { showAlert } = useAlert()
const modal = useModal()
const tableAttrs = computed(() => ({
	value: companyStore.companies,
	rows: companyStore.filters.perPage,
	totalRecords: companyStore.total,
	first: (companyStore.filters.page - 1) * companyStore.filters.perPage,
	lazy: true,
	onPage: onPage,
}))

const openModal = (company: Company | null = null) => {
	modal.open(company, company ? 'edit' : 'create')
}

const handleSave = async () => {
	modal.close()
}

const handleAction = async (action: string, data: Company) => {
	if (action === 'edit') {
		openModal(data)
	} else if (action === 'delete') {
		const result = await confirm.show({
			message: t('alert.delete.confirm', { item: data.name_en || data.name_vn }),
			icon: 'pi pi-exclamation-triangle',
		})

		if (result) {
			const response = await companyService.deleteCompany(data.id)

			if (!response.success) {
				showAlert('error', t('alert.error.delete'), t(`codes.${response.errors?.[0] || 'DEFAULT'}`))
				return
			}

			showAlert('success', t('alert.success.delete'))
			companyStore.getCompanies()
		}
	}
}

onMounted(async () => {
	await companyStore.getCompanies()
})

const onPage = (event: DataTablePageEvent) => {
	companyStore.setFilters({ perPage: Number(event.rows), page: event.page + 1 })

	companyStore.getCompanies()
}

const search = (k: string) => {
	companyStore.setFilters({ keyword: k, page: PAGE_DEFAULT })

	companyStore.getCompanies()
}
</script>

<template>
	<Toolbar class="mb-2">
		<template #start>
			<Button
				:label="t('message.company.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="openModal()"
			/>
		</template>
	</Toolbar>
	<CommonTable
		:title="t('menu.company.management')"
		:columns="companyColumns"
		:actions="['edit', 'delete']"
		@search="search"
		@editRow="handleAction('edit', $event)"
		@deleteRow="handleAction('delete', $event)"
		:attrs="tableAttrs"
	>
	</CommonTable>
	<CompanyFormModal
		v-model:modalVisible="modal.visible.value"
		:company="modal.data.value"
		:type="modal.type.value"
		@save="handleSave"
	/>
</template>
