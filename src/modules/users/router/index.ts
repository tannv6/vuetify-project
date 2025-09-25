import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '',
		name: 'listu',
		component: () => import('../pages/ListPage.vue'),
		meta: { notRequireAuth: true },
	},
	{
		path: 'new',
		name: 'newu',
		component: () => import('../pages/NewPage.vue'),
		meta: { notRequireAuth: true },
	},
]

export default {
	path: '/users',
	name: 'users',
	component: () => import('@/layouts/default.vue'),
	children: [...routes],
}
