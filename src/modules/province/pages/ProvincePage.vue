<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { DataTablePageEvent, Toolbar } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { CommonTable, PAGE_DEFAULT, useAlert } from '@/core'
import { useAsyncConfirm } from '@/core/composables/useAsyncConfirm'

import ProvinceFormModal from '../components/ProvinceFormModal.vue'
import { useProvinceColumns } from '../composables/useProvinceColumns'
import { ProvinceFormData } from '../schemas/provinceSchema'
import { provinceService } from '../services/provinceService'
import { useProvinceStore } from '../store/provinceStore'

const { columns: provinceColumns } = useProvinceColumns()
const provinceStore = useProvinceStore()
const { t } = useI18n()
const { showAlert } = useAlert()
const confirm = useAsyncConfirm()

const { provinces, loading, page, perPage, total } = storeToRefs(provinceStore)

const modalVisible = ref(false)
const editingProvince = ref(null)
const modalType = ref<'create' | 'edit'>('create')

const openModal = (province = null) => {
	editingProvince.value = province
	modalType.value = province ? 'edit' : 'create'
	modalVisible.value = true
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
			loading.value = true
			const response = await provinceService.deleteProvince(data.id)
			loading.value = false

			if (!response.success) {
				showAlert('error', t('alert.error.delete'), t(`codes.${response.errors?.[0] || 'DEFAULT'}`))
				return
			}

			showAlert('success', t('alert.success.delete'))
			provinceStore.getProvinces()
		}
	}
}

const handleSave = async (formData: ProvinceFormData) => {
	if (modalType.value === 'create') {
		const response = await provinceService.createProvince(formData)

		if (!response.success) {
			showAlert('error', t('alert.error.create'), t(`codes.${response.errors?.[0] || 'DEFAULT'}`))
			return
		}

		showAlert('success', t('alert.success.create'))
	} else {
		const response = await provinceService.updateProvince(editingProvince.value?.id, formData)

		if (!response.success) {
			showAlert('error', t('alert.error.edit'), t(`codes.${response.errors?.[0] || 'DEFAULT'}`))
			return
		}

		showAlert('success', t('alert.success.edit'))
	}

	modalVisible.value = false
	provinceStore.getProvinces()
}

onMounted(() => {
	provinceStore.getProvinces()
})

const onPage = (event: DataTablePageEvent) => {
	provinceStore.setPerPage(Number(event.rows))
	provinceStore.setPage(event.page + 1)

	provinceStore.getProvinces()
}

const tableAttrs = computed(() => ({
	value: provinces.value,
	rows: perPage.value,
	loading: loading.value,
	totalRecords: total.value,
	first: (page.value - 1) * perPage.value,
	lazy: true,
	onPage,
}))

const search = (k: string) => {
	provinceStore.setKeyword(k)
	provinceStore.setPage(PAGE_DEFAULT)
	provinceStore.getProvinces()
}
</script>

<template>
	<Toolbar class="mb-2">
		<template #start>
			<Button
				:label="t('message.province.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="openModal()"
			/>
		</template>
	</Toolbar>
	<CommonTable
		:title="t('menu.address.provinces')"
		:columns="provinceColumns"
		:actions="['edit', 'delete']"
		@search="search"
		@editRow="handleAction('edit', $event)"
		@deleteRow="handleAction('delete', $event)"
		:attrs="tableAttrs"
	/>
	<ProvinceFormModal v-model:modalVisible="modalVisible" :province="editingProvince" :type="modalType" @save="handleSave" />
</template>
