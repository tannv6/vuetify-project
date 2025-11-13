import type { RouteRecordRaw } from 'vue-router'

const teamRoutes: RouteRecordRaw[] = [
	{
		path: '',
		name: 'team-list',
		component: () => import('../pages/TeamList.vue'),
		meta: { notRequireAuth: true },
	},
]

export default {
	path: '/teams',
	name: 'teams',
	component: () => import('@/layouts/default.vue'),
	children: [...teamRoutes],
}
