<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { DataTablePageEvent, Toolbar, useToast } from 'primevue'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { CommonTable, DEFAULT_TOAST_LIFE_TIME } from '@/core'
import { useAsyncConfirm } from '@/core'

import FormModal from '../components/FormModal.vue'
import { useGroupColumns } from '../composables/useGroupColumns'
import { GroupService } from '../services/group.service'
import { useGroupStore } from '../store/group.store'
import { Group } from '../utils/types'
const groupStore = useGroupStore()
const { t } = useI18n()
const { columns } = useGroupColumns()
const { groups, keyword, loading, page, pageSize, totalGroups, showModalCreateGroup } = storeToRefs(groupStore)

onMounted(() => {
	groupStore.fetchGroups()
})
const confirm = useAsyncConfirm()
const toast = useToast()
const onPage = (event: DataTablePageEvent) => {
	groupStore.setPageSize(Number(event.rows))
	groupStore.setPage(event.page + 1)
}
const onShowCreateModal = () => {
	showModalCreateGroup.value = true
}
const onEdit = (data: Group) => {
	groupStore.setShowModalEditGroup(true, data)
}
const onDelete = async (data: Group) => {
	const result = await confirm.show({
		message: t('message.group.confirmDelete', { groupName: data.name }),
		icon: 'pi pi-exclamation-triangle',
	})
	if (result) {
		loading.value = true
		const { errors, success } = await GroupService.deleteGroup(data.id)
		loading.value = false
		if (errors?.length) {
			await confirm.fail(t(`codes.${errors[0]}`))
			return
		}
		if (success) {
			toast.add({
				severity: 'success',
				summary: t('message.common.success'),
				detail: t('message.group.deleteSuccess', { groupName: data.name }),
				life: DEFAULT_TOAST_LIFE_TIME,
			})
			await groupStore.fetchGroups()
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
				:label="t('message.group.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="onShowCreateModal()"
			/>
		</template>
	</Toolbar>
	<CommonTable
		:title="t('menu.group_list')"
		:columns="columns"
		:actions="['edit', 'delete']"
		:keyword="keyword"
		@update:keyword="groupStore.setKeyword($event)"
		@editRow="onEdit"
		@deleteRow="onDelete"
		:attrs="{
			value: groups,
			rows: pageSize,
			loading: loading,
			totalRecords: totalGroups,
			first: (page - 1) * pageSize,
			lazy: true,
			onPage,
		}"
	/>
	<FormModal />
</template>
