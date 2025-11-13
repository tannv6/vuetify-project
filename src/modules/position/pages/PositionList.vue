<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Toolbar, useToast } from 'primevue'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { ColumnDef, DEFAULT_TOAST_LIFE_TIME, useAsyncConfirm } from '@/core'
import TreeTable from '@/core/components/TreeTable.vue'

import FormModal from '../components/FormModal.vue'
import { PositionService } from '../services/position.service'
import { usePositionStore } from '../store/position.store'
import { buildPositionTreeTable } from '../utils/function'
import { Position } from '../utils/types'
const positionStore = usePositionStore()
const { t } = useI18n()
const toast = useToast()
const confirm = useAsyncConfirm()
const { positions, loading, showModalCreatePosition } = storeToRefs(positionStore)

onMounted(() => {
	positionStore.fetchPositions()
})

const tree = computed(() => {
	return buildPositionTreeTable(positions.value)
})

const columns = computed((): ColumnDef[] => [
	{
		header: t('message.position.id'),
		field: 'id',
		attrs: { class: 'col-center', style: 'width: 5rem' },
	},
	{ header: t('message.position.name'), field: 'name' },
	{ header: t('message.position.parent'), field: 'parent_name', attrs: { style: 'width: 15rem' } },
])
const onShowCreateModal = () => {
	showModalCreatePosition.value = true
}
const onEdit = (data: Position) => {
	positionStore.setShowModalEditPosition(true, data)
}
const onDelete = async (data: Position) => {
	const result = await confirm.show({
		message: t('message.position.confirmDelete', { positionName: data.name }),
		icon: 'pi pi-exclamation-triangle',
	})
	if (result) {
		loading.value = true
		const { errors, success } = await PositionService.deletePosition(data.id)
		loading.value = false
		if (errors?.length) {
			await confirm.fail(t(`codes.${errors[0]}`))
			return
		}
		if (success) {
			toast.add({
				severity: 'success',
				summary: t('message.common.success'),
				detail: t('message.position.deleteSuccess', { positionName: data.name }),
				life: DEFAULT_TOAST_LIFE_TIME,
			})
			await positionStore.fetchPositions()
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
				:label="t('message.position.add')"
				icon="pi pi-plus"
				severity="info"
				class="w-full sm:w-auto"
				@click="onShowCreateModal()"
			/>
		</template>
	</Toolbar>
	<TreeTable
		:title="t('menu.position_list')"
		:columns="columns"
		:actions="['edit', 'delete']"
		defaultExpandAll
		@editRow="onEdit"
		@deleteRow="onDelete"
		:attrs="{
			value: tree,
			loading: loading,
			lazy: true,
		}"
	/>
	<FormModal />
</template>
