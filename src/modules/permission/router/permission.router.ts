import type { RouteRecordRaw } from 'vue-router'

const permissionRoutes: RouteRecordRaw[] = [
	{
		path: '',
		name: 'permission-list',
		component: () => import('../pages/PermissionList.vue'),
	},
]

export default {
	path: '/permissions',
	name: 'permissions',
	component: () => import('@/core/layout/components/AppLayout.vue'),
	children: [...permissionRoutes],
}
