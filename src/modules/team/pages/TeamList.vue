<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import CreateModal from '../components/CreateModal.vue'
import { useTeamStore } from '../store/team.store'

const teamStore = useTeamStore()
const { t } = useI18n()

const { teams, keyword, loading, page, pageSize, totalTeams, showModalCreateTeam } = storeToRefs(teamStore)

const deleteItem = async (data: any) => {
	// const result = await confirm.show({
	// 	message: t('message.team.confirmDelete', { teamName: data.name }),
	// 	icon: 'pi pi-exclamation-triangle',
	// })
	// if (result) {
	// 	loading.value = true
	// 	const { errors, success } = await TeamService.deleteTeam(data.id)
	// 	loading.value = false
	// 	if (success) {
	// 		toast.add({
	// 			severity: 'success',
	// 			summary: t('message.common.success'),
	// 			detail: t('message.team.deleteSuccess', { teamName: data.name }),
	// 		})
	// 		await teamStore.fetchTeams()
	// 	} else if (errors?.length) {
	// 		await confirm.fail(t(`codes.${errors[0]}`))
	// 	}
	// }
}
</script>

<template>
	<div class="mb-2">
		<create-modal />
	</div>
	<v-data-table-server
		:headers="[
			{ title: t('message.team.id'), key: 'id' },
			{ title: t('message.team.name'), key: 'name' },
			{ title: t('message.team.parent'), key: 'parent_name' },
			{ title: 'Actions', value: 'actions', sortable: false, align: 'center', width: '8rem' },
		]"
		:items="teams"
		:items-length="totalTeams"
		:loading="loading"
		v-model:page="page"
		@update:options="teamStore.handleUpdateTable"
		v-model:items-per-page="pageSize"
		:search="keyword"
	>
		<template v-slot:item.actions="{ item }">
			<v-btn icon @click="teamStore.handleShowUpdate(item.id)" size="small" color="blue">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
			<v-btn icon @click="deleteItem(item)" size="small" color="red" class="ml-1">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</template>
	</v-data-table-server>
</template>
