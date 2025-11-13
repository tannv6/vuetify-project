import type { RouteRecordRaw } from 'vue-router'

const educationRoute: RouteRecordRaw = {
	path: '/education-management',
	name: 'education-management',
	component: () => import('@/core/layout/components/AppLayout.vue'),
	children: [
		{
			path: '/edu-institutions',
			name: 'edu-institution-list',
			component: () => import('../pages/SchoolPage.vue'),
		},
		{
			path: '/degree-certificates',
			name: 'degree-list',
			component: () => import('../pages/DegreeCertificatePage.vue'),
		},
	],
}

export default educationRoute
