<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useTeamStore } from '../store/team.store'
import { required } from '@/core'
const teamStore = useTeamStore()
const { showModalCreateTeam, name, chatId, isValid, form, teamId } = storeToRefs(teamStore)
</script>
<template>
	<v-dialog max-width="500" v-model="showModalCreateTeam">
		<template v-slot:activator="{}">
			<v-btn @click="teamStore.handleShowCreate()" color="primary" prepend-icon="mdi-plus" text="Tạo nhóm mới"></v-btn>
		</template>
		<template v-slot:default="{ isActive }">
			<v-card :title="teamId ? 'Chỉnh sửa nhóm' : 'Tạo nhóm mới'">
				<v-card-text>
					<v-form ref="form" v-model="isValid">
						<v-text-field
							v-model="name"
							:rules="[required()]"
							color="deep-purple"
							label="Tên team"
							type="text"
							variant="filled"
						></v-text-field>
						<v-text-field
							v-model="chatId"
							:rules="[required()]"
							color="deep-purple"
							label="ID chatwork"
							type="text"
							variant="filled"
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn text="Lưu" color="primary" @click="teamStore.handleSubmit()"></v-btn>
					<v-btn text="Đóng" @click="isActive.value = false"></v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>
