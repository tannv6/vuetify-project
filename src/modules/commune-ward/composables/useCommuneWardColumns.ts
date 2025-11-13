import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useCommuneWardColumns() {
	const { t } = useI18n()

	const columns = computed(() => [
		{ header: t('message.communeWard.id'), field: 'id' },
		{ header: t('message.communeWard.name'), field: 'name' },
	])

	return { columns }
}
