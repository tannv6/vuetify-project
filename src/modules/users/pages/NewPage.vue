<script setup lang="ts">
import { reactive } from 'vue'

const screens = [
	{ id: 1, name: 'Screen A' },
	{ id: 2, name: 'Screen B' },
]

const permissions = [
	{ id: 10, name: 'View' },
	{ id: 11, name: 'Edit' },
]

// object lưu kết quả
const selectedPermissions = reactive({ permission: {} })

function togglePermission(screenId: any, permissionId: any) {
	if (!selectedPermissions.permission[screenId]) {
		selectedPermissions.permission[screenId] = {}
	}

	const exists = selectedPermissions.permission[screenId][permissionId]

	if (exists) {
		// nếu đã có thì bỏ chọn
		delete selectedPermissions.permission[screenId][permissionId]
	} else {
		// nếu chưa có thì thêm
		selectedPermissions.permission[screenId][permissionId] = permissionId
	}
}
</script>

<template>
	<div v-for="screen in screens" :key="screen.id" class="mb-4">
		<h3>{{ screen.name }}</h3>
		<div v-for="p in permissions" :key="p.id">
			<label>
				<input
					type="checkbox"
					:checked="!!selectedPermissions.permission[screen.id]?.[p.id]"
					@change="togglePermission(screen.id, p.id)"
				/>
				{{ p.name }}
			</label>
		</div>
	</div>

	<pre>{{ selectedPermissions }}</pre>
</template>
