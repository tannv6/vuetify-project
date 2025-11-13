import type { TeamTreeResponse } from './types'

export function mapToTeamTree(data: TeamTreeResponse[], disabledList: number[] = [], onlyChild = false): any[] {
	return data.map((item) => ({
		key: String(item.id),
		label: item.name,
		children: item.children ? mapToTeamTree(item.children, disabledList, onlyChild) : [],
		selectable: (onlyChild && (item.children?.length === 0 || !item.children)) || !disabledList.includes(item.id),
	}))
}

export function mapDisableTeamTree(data: any[], disabledList: (number | string)[] = []): any[] {
	return data.map((item) => ({
		...item,
		children: item.children ? mapDisableTeamTree(item.children, disabledList) : [],
		selectable: !disabledList.includes(Number(item.key)),
	}))
}

export function mapToUser(data: any[], lang = 'en') {
	return data.map((item) => {
		return {
			id: item.id,
			name:
				item.user_basic_info?.[`full_name_${lang}`] ||
				item.user_basic_info?.full_name_vn ||
				item.user_basic_info?.full_name_jp ||
				item.user_basic_info?.full_name_en ||
				'',
		}
	})
}
