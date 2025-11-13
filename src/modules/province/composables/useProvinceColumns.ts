import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useProvinceColumns() {
	const { t } = useI18n()

	const columns = computed(() => [
		{ header: t('message.province.id'), field: 'id' },
		{ header: t('message.province.name'), field: 'name' },
	])

	return { columns }
}
