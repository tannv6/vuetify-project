<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { DataTablePageEvent, Toolbar, useToast } from 'primevue'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { CommonTable, DEFAULT_TOAST_LIFE_TIME } from '@/core'
import { useAsyncConfirm } from '@/core'

import FormModal from '../components/FormModal.vue'
import { useRoleColumns } from '../composables/useRoleColumns'
import { RoleService } from '../services/role.service'
import { useRoleStore } from '../store/role.store'
import { Role } from '../utils/types'
const roleStore = useRoleStore()
const { t } = useI18n()
const { columns } = useRoleColumns()
const confirm = useAsyncConfirm()
const toast = useToast()
const { roles, keyword, loading, page, pageSize, totalRoles, showModalCreateRole } = storeToRefs(roleStore)

onMounted(() => {
	roleStore.fetchRoles()
})
const onPage = (event: DataTablePageEvent) => {
	roleStore.setPageSize(Number(event.rows))
	roleStore.setPage(event.page + 1)
	return false
}
const onShowCreateModal = () => {
	showModalCreateRole.value = true
}
const onEdit = (data: Role) => {
	roleStore.setShowModalEditRole(true, data)
}
const onDelete = async (data: Role) => {
	const result = await confirm.show({
		message: t('message.role.confirmDelete', { roleName: data.name }),
		icon: 'pi pi-exclamation-triangle',
	})
	if (result) {
		loading.value = true
		const { errors, success } = await RoleService.deleteRole(data.id)
		loading.value = false
		if (errors?.length) {
			await confirm.fail(t(`codes.${errors[0]}`))
			return
		}
		if (success) {
			toast.add({
				severity: 'success',
				summary: t('message.common.success'),
				detail: t('message.role.deleteSuccess', { roleName: data.name }),
				life: DEFAULT_TOAST_LIFE_TIME,
			})
			await roleStore.fetchRoles()
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
				:label="t('message.role.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="onShowCreateModal()"
			/>
		</template>
	</Toolbar>
	<CommonTable
		:title="t('menu.role_list')"
		:columns="columns"
		:actions="['edit', 'delete']"
		:keyword="keyword"
		@update:keyword="roleStore.setKeyword($event)"
		@editRow="onEdit"
		@delete-row="onDelete"
		:attrs="{
			value: roles,
			rows: pageSize,
			loading: loading,
			totalRecords: totalRoles,
			first: (page - 1) * pageSize,
			lazy: true,
			onPage,
		}"
	/>
	<FormModal />
</template>
