import ToggleSwitch from 'primevue/toggleswitch'
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'

export const useCompanyColumns = (onToggleApproved: (rowData: any, val: boolean) => void) => {
	const { t } = useI18n()
	const columns = computed(() => [
		{ header: t('message.company.id'), field: 'id' },
		{ header: t('message.company.name_vn'), field: 'name_vn' },
		{ header: t('message.company.name_en'), field: 'name_en' },
		{
			header: t('message.company.approved'),
			field: 'is_approve',
			body: (rowData: any) =>
				h(ToggleSwitch, {
					modelValue: !!rowData.is_approve,
					disabled: !!rowData.is_approve,
					'onUpdate:modelValue': (val: boolean) => {
						if (val && !rowData.is_approve) {
							onToggleApproved(rowData, val)
						}
					},
				}),
		},
	])

	return { columns }
}
