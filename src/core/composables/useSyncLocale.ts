import { watch } from 'vue'
import { useLocale } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useLayoutsStore } from '@/layouts/layouts.store'
import { storeToRefs } from 'pinia'

export function useSyncLocale() {
	const { current } = useLocale()
	const { locale: currentLocale } = storeToRefs(useLayoutsStore())
	const { locale } = useI18n()

	watch(currentLocale, (val) => {
		current.value = val
		locale.value = val
	})
}
