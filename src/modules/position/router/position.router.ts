import type { RouteRecordRaw } from 'vue-router'

export default {
	path: '/positions',
	name: 'positions',
	component: () => import('@/core/layout/components/AppLayout.vue'),
	children: [
		{
			path: '',
			name: 'position-list',
			component: () => import('../pages/PositionList.vue'),
		},
	],
} as RouteRecordRaw
