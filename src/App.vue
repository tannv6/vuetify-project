<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script lang="ts" setup>
import { useSyncLocale } from './core/composables/useSyncLocale'

useSyncLocale()
</script>
