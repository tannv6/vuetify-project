import type { RouteRecordRaw } from 'vue-router'

export default {
	path: '/groups',
	name: 'groups',
	component: () => import('@/core/layout/components/AppLayout.vue'),
	children: [
		{
			path: '',
			name: 'group-list',
			component: () => import('../pages/GroupList.vue'),
		},
	],
} as RouteRecordRaw
