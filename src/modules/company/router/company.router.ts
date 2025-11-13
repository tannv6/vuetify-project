import type { RouteRecordRaw } from 'vue-router'

const companyRoute: RouteRecordRaw = {
	path: '/companies',
	name: 'company',
	component: () => import('@/core/layout/components/AppLayout.vue'),
	children: [
		{
			path: '',
			name: 'company-list',
			component: () => import('../pages/CompanyPage.vue'),
		},
	],
}

export default companyRoute
