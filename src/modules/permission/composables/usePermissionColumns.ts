import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { ColumnDef } from '@/core'

export function usePermissionColumns() {
	const { t } = useI18n()

	const columns = computed((): ColumnDef[] => [
		{
			header: t('message.permission.id'),
			field: 'id',
			attrs: { class: 'col-center', style: 'width: 5rem' },
		},
		{ header: t('message.permission.name'), field: 'name' },
	])

	return { columns }
}
