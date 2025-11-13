import { TreeNode } from 'primevue/treenode'

import { GroupItem } from '@/core'

import { Position, PositionDetailResponse } from './types'

export const buildPositionTreeTable = (items: Position[]) => {
	const map: Record<string, TreeNode> = {}
	const roots: TreeNode[] = []

	items.forEach((item) => {
		map[item.id] = {
			key: String(item.id),
			data: { ...item },
			children: [],
		}
	})

	items.forEach((item) => {
		const node = map[item.id]
		if (item.parent_id && map[item.parent_id]) {
			if (map[item.parent_id]?.children) map[item.parent_id].children?.push(node)
		} else {
			roots.push(node)
		}
	})

	return roots
}

export const buildPositionTreeSelect = (items: Position[], currentId?: number) => {
	const map: Record<string, TreeNode> = {}
	const roots: TreeNode[] = []

	items.forEach((item) => {
		map[item.id] = {
			key: String(item.id),
			id: String(item.id),
			label: item.name,
			children: [],
		}
	})

	items.forEach((item) => {
		const node = map[item.id]
		if (item.id == currentId || item.parent_id) node.selectable = false
		if (item.parent_id && map[item.parent_id]) {
			if (map[item.parent_id]?.children) map[item.parent_id].children?.push(node)
		} else {
			roots.push(node)
		}
	})

	return roots
}

export const mapPositionLevel = (data: PositionDetailResponse['levels']): GroupItem[] => {
	return data.map((item) => {
		return {
			id: item.id,
			name: item.name,
			children: item.level_codes.map((level) => {
				return {
					id: level.id,
					name: level.name,
				}
			}),
		}
	})
}

export const mapPositionLevelCode = (data: PositionDetailResponse['level_code']): GroupItem[] => {
	return data.map((item) => {
		return {
			id: item.id,
			name: item.name,
			children: [],
		}
	})
}
