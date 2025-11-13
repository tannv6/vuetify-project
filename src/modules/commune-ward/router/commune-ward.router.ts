import type { RouteRecordRaw } from 'vue-router'

const communeWardRoute: RouteRecordRaw = {
	path: '/commune-wards',
	name: 'commune-ward',
	component: () => import('@/core/layout/components/AppLayout.vue'),
	children: [
		{
			path: '',
			name: 'commune-ward-list',
			component: () => import('../pages/CommuneWardPage.vue'),
		},
	],
}

export default communeWardRoute
