<script lang="ts" setup>
import { useLayoutsStore } from '@/layouts/layouts.store'
import { AuthService } from '@/modules/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useTheme } from 'vuetify'

const router = useRouter()

const layoutsStore = useLayoutsStore()
const theme = useTheme()
const { drawer, darkMode } = storeToRefs(layoutsStore)
const handleDarkMode = (isDarkMode: boolean) => {
	darkMode.value = isDarkMode
	theme.global.name.value = isDarkMode ? 'dark' : 'light'
}
const handleLogout = async () => {
	const logoutResult = await AuthService.logout()
	if (logoutResult.success) {
		router.replace('/auth/login')
	} else {
		router.replace('/auth/login')
	}
}
const { locale } = storeToRefs(useLayoutsStore())
const items = [
	{ id: 'en', label: 'English' },
	{ id: 'vi', label: 'Tiếng Việt' },
	{ id: 'ja', label: '日本語' },
	{ id: 'cn', label: '中文' },
]
</script>
<template>
	<v-app-bar app color="primary" theme="light">
		<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
		<v-toolbar-title>THK HOLDINGS VIETNAM COMPANY LIMITED</v-toolbar-title>
		<v-select
			variant="solo"
			density="compact"
			v-model="locale"
			single-line
			:items="items"
			itemValue="id"
			itemTitle="label"
			maxWidth="150px"
			hide-details
		></v-select>
		<v-btn icon>
			<v-icon v-if="darkMode" @click="handleDarkMode(false)">mdi-weather-night</v-icon>
			<v-icon v-else @click="handleDarkMode(true)">mdi-white-balance-sunny</v-icon>
		</v-btn>
		<v-btn icon @click="handleLogout">
			<v-icon>mdi-logout</v-icon>
		</v-btn>
	</v-app-bar>
</template>
