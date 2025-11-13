<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { DataTablePageEvent, Toolbar, useToast } from 'primevue'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { CommonTable, DEFAULT_TOAST_LIFE_TIME } from '@/core'
import { useAsyncConfirm } from '@/core'

import FormModal from '../components/FormModal.vue'
import { usePermissionColumns } from '../composables/usePermissionColumns'
import { PermissionService } from '../services/permission.service'
import { usePermissionStore } from '../store/permission.store'
import { Permission } from '../utils/types'
const permissionStore = usePermissionStore()
const { t } = useI18n()
const { columns } = usePermissionColumns()
const confirm = useAsyncConfirm()
const toast = useToast()
const { permissions, keyword, loading, page, pageSize, totalPermissions, showModalCreatePermission } =
	storeToRefs(permissionStore)

onMounted(() => {
	permissionStore.fetchPermissions()
})
const onPage = (event: DataTablePageEvent) => {
	permissionStore.setPageSize(Number(event.rows))
	permissionStore.setPage(event.page + 1)
	return false
}
const onShowCreateModal = () => {
	showModalCreatePermission.value = true
}
const onEdit = (data: Permission) => {
	permissionStore.setShowModalEditPermission(true, data)
}
const onDelete = async (data: Permission) => {
	const result = await confirm.show({
		message: t('message.permission.confirmDelete', { permissionName: data.name }),
		icon: 'pi pi-exclamation-triangle',
	})
	if (result) {
		loading.value = true
		const { errors, success } = await PermissionService.deletePermission(data.id)
		loading.value = false
		if (errors?.length) {
			await confirm.fail(t(`codes.${errors[0]}`))
			return
		}
		if (success) {
			toast.add({
				severity: 'success',
				summary: t('message.common.success'),
				detail: t('message.permission.deleteSuccess', { permissionName: data.name }),
				life: DEFAULT_TOAST_LIFE_TIME,
			})
			await permissionStore.fetchPermissions()
		} else if (errors?.length) {
			await confirm.fail(t(`codes.${errors[0]}`))
		}
	}
}
</script>

<template>
	<Toolbar class="mb-2">
		<template #start>
			<Button
				:label="t('message.permission.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="onShowCreateModal()"
			/>
		</template>
	</Toolbar>
	<CommonTable
		:title="t('menu.permission_list')"
		:columns="columns"
		:actions="['edit', 'delete']"
		:keyword="keyword"
		@update:keyword="permissionStore.setKeyword($event)"
		@editRow="onEdit"
		@deleteRow="onDelete"
		:attrs="{
			value: permissions,
			rows: pageSize,
			loading: loading,
			totalRecords: totalPermissions,
			first: (page - 1) * pageSize,
			lazy: true,
			onPage,
		}"
	/>
	<FormModal />
</template>
