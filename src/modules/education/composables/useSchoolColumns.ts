import ToggleSwitch from 'primevue/toggleswitch'
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'

export const useSchoolColumns = (onToggleApproved: (rowData: any, val: boolean) => void) => {
	const { t } = useI18n()
	const columns = computed(() => [
		{ header: t('message.education.school.id'), field: 'id' },
		{ header: t('message.education.school.name_vn'), field: 'name_vn' },
		{ header: t('message.education.school.name_en'), field: 'name_en' },
		{ header: t('message.education.school.short_name'), field: 'short_name' },
		{
			header: t('message.education.school.approved'),
			field: 'is_approve',
			body: (rowData: any) =>
				h(ToggleSwitch, {
					modelValue: !!rowData.is_approve,
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
