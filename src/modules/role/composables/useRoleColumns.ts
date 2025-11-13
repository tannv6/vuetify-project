import { Tag } from 'primevue'
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'

import { ColumnDef } from '@/core'

export function useRoleColumns() {
	const { t } = useI18n()

	const columns = computed((): ColumnDef[] => [
		{
			header: t('message.role.id'),
			field: 'id',
			attrs: { class: 'col-center', style: 'width: 5rem' },
		},
		{ header: t('message.role.name'), field: 'name' },
		{
			header: t('message.role.isDefault'),
			field: 'name',
			body: (rowData) => (rowData.is_default ? h(Tag, { severity: 'success', value: t('message.role.isDefault') }) : ''),
			attrs: { style: 'width: 8rem' },
		},
	])

	return { columns }
}
