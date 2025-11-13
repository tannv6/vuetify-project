import type { RouteRecordRaw } from 'vue-router'

const provinceRoute: RouteRecordRaw = {
	path: '/provinces',
	name: 'provinces',
	component: () => import('@/core/layout/components/AppLayout.vue'),
	children: [
		{
			path: '',
			name: 'province-list',
			component: () => import('../pages/ProvincePage.vue'),
		},
	],
}

export default provinceRoute
