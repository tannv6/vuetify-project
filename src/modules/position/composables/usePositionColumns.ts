import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { ColumnDef } from '@/core'

export function usePositionColumns() {
	const { t } = useI18n()

	const columns = computed((): ColumnDef[] => [
		{
			header: t('message.position.id'),
			field: 'id',
			attrs: { class: 'col-center', style: 'width: 5rem' },
		},
		{ header: t('message.position.name'), field: 'name' },
	])

	return { columns }
}
