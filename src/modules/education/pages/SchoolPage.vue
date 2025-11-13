<script setup lang="ts">
import { DataTablePageEvent, Toolbar } from 'primevue'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { CommonTable, PAGE_DEFAULT, useAlert } from '@/core'
import { useAsyncConfirm } from '@/core/composables/useAsyncConfirm'

import SchoolFormModal from '../components/SchoolFormModal.vue'
import { useModal } from '../composables/useModal'
import { useSchoolColumns } from '../composables/useSchoolColumns'
import { schoolService } from '../services/SchoolService'
import { useEducationStore } from '../store/EducationStore'
import { School } from '../types'

const handleToggleApproved = async (rowData: School, val: boolean) => {
	const res = await schoolService.approveSchool(rowData.id, { is_approve: val })
	if (res.success) {
		rowData.is_approve = val
		showAlert('success', t('alert.success.edit'))
	} else {
		showAlert('error', t('alert.error.edit'))
	}
}

const confirm = useAsyncConfirm()
const { columns: schoolColumns } = useSchoolColumns(handleToggleApproved)
const schoolStore = useEducationStore()
const { t } = useI18n()
const { showAlert } = useAlert()
const modal = useModal()
const tableAttrs = computed(() => ({
	value: schoolStore.schools,
	rows: schoolStore.filters.perPage,
	loading: schoolStore.loading,
	totalRecords: schoolStore.total,
	first: (schoolStore.filters.page - 1) * schoolStore.filters.perPage,
	lazy: true,
	onPage: onPage,
}))

const openModal = (school: School | null = null) => {
	modal.open(school, school ? 'edit' : 'create')
}

const handleSave = async () => {
	modal.close()
}

const handleAction = async (action: string, data: School) => {
	if (action === 'edit') {
		openModal(data)
	} else if (action === 'delete') {
		const result = await confirm.show({
			message: t('alert.delete.confirm', { item: data.name_en || data.name_vn }),
			icon: 'pi pi-exclamation-triangle',
		})

		if (result) {
			const response = await schoolService.deleteSchool(data.id)

			if (!response.success) {
				showAlert('error', t('alert.error.delete'), t(`codes.${response.errors?.[0] || 'DEFAULT'}`))
				return
			}

			showAlert('success', t('alert.success.delete'))
			schoolStore.getSchools()
		}
	}
}

onMounted(async () => {
	await schoolStore.getSchools()
})

const onPage = (event: DataTablePageEvent) => {
	schoolStore.setFilters({ perPage: Number(event.rows), page: event.page + 1 })

	schoolStore.getSchools()
}

const search = (k: string) => {
	schoolStore.setFilters({ keyword: k, page: PAGE_DEFAULT })

	schoolStore.getSchools()
}
</script>

<template>
	<Toolbar class="mb-2">
		<template #start>
			<Button
				:label="t('message.education.school.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="openModal()"
			/>
		</template>
	</Toolbar>
	<CommonTable
		:title="t('menu.education.schools')"
		:columns="schoolColumns"
		:actions="['edit', 'delete']"
		@search="search"
		@editRow="handleAction('edit', $event)"
		@deleteRow="handleAction('delete', $event)"
		:attrs="tableAttrs"
	>
	</CommonTable>
	<SchoolFormModal
		v-model:modalVisible="modal.visible.value"
		:school="modal.data.value"
		:type="modal.type.value"
		@save="handleSave"
	/>
</template>

<style>
.p-toggleswitch.p-component.p-toggleswitch-checked {
	pointer-events: none;
}
</style>
