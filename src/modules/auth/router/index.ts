import type { RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw[] = [
	{
		path: 'login',
		name: 'login',
		component: () => import('../pages/LoginPage.vue'),
		meta: { notRequireAuth: true },
	},
	{
		path: 'access-denied',
		name: 'access',
		component: () => import('../pages/AccessDenied.vue'),
		meta: { notRequireAuth: true },
	},
	{
		path: 'error',
		name: 'error',
		component: () => import('../pages/Error.vue'),
		meta: { notRequireAuth: true },
	},
]

export default {
	path: '/auth',
	name: 'auth',
	component: () => import('@/layouts/auth.vue'),
	children: [...authRoutes],
}
