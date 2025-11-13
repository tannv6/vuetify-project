import type { RouteRecordRaw } from 'vue-router'

export default {
	path: '/roles',
	name: 'roles',
	component: () => import('@/core/layout/components/AppLayout.vue'),
	children: [
		{
			path: '',
			name: 'role-list',
			component: () => import('../pages/RoleList.vue'),
		},
	],
} as RouteRecordRaw
