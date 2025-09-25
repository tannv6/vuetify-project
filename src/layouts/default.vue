<template>
	sdfgsd
	<AppSideBar />
	<v-main>
		<AppHeader />
		<v-container fluid>
			<router-view />
		</v-container>
	</v-main>
</template>

<script lang="ts" setup>
import AppHeader from './components/AppHeader.vue'
import AppSideBar from './components/AppSideBar.vue'
</script>
