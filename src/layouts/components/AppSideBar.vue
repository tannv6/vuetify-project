<script lang="ts" setup>
import { useLayoutsStore } from '@/layouts/layouts.store'
import { storeToRefs } from 'pinia'

const layoutsStore = useLayoutsStore()
const { drawer } = storeToRefs(layoutsStore)
</script>
<template>
	<v-navigation-drawer app permanent v-model="drawer" theme="dark">
		<v-list nav dense>
			<v-list-item tag="router-link" to="/" prepend-icon="mdi-view-dashboard" title="Dashboard" density="compact" />
			<v-list-group prepend-icon="mdi-account" value="true">
				<template #activator="{ props }">
					<v-list-item v-bind="props" title="Người dùng" />
				</template>
				<v-list-item tag="router-link" exact to="/users" title="Danh sách" prepend-icon="mdi-format-list-bulleted" />
				<v-list-item tag="router-link" to="/users/new" title="Thêm mới" prepend-icon="mdi-plus" />
			</v-list-group>
			<v-list-item tag="router-link" to="/settings" prepend-icon="mdi-cog" title="Cài đặt" />
		</v-list>
	</v-navigation-drawer>
</template>
<style scoped lang="scss">
:deep(.v-list-item__spacer) {
	width: 8px !important;
}
</style>
