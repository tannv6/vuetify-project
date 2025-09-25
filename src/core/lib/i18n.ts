import { createI18n } from 'vue-i18n'

import { cn, en, ja, vi } from '@/locales'

export const i18nInit = (locale: string) => {
	return createI18n({
		legacy: false,
		locale: locale,
		fallbackLocale: 'en',
		messages: { en, vi, ja, cn },
	})
}
