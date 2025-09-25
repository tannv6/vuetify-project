/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'
import { useLayoutsStore } from '@/layouts/layouts.store'
import { i18nInit } from '@/core/lib/i18n'

export function registerPlugins(app: App) {
	app.use(router).use(pinia)
	const { darkMode, locale } = useLayoutsStore()
	app.use(vuetify(darkMode, locale))
	const i18n = i18nInit(locale)
	app.use(i18n)
}
