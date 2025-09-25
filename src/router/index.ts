import { useAuthStore } from '@/modules/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('@/layouts/default.vue'),
			children: [
				{
					path: '',
					component: () => import('@/core/pages/index.vue'),
				},
			],
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'notfound',
			component: () => import('@/core/pages/notfound.vue'),
		},
	],
})

const modules = import.meta.glob('../modules/**/router/index.ts', { eager: true })

Object.values(modules).forEach((mod: any) => {
	if (mod.default) {
		router.addRoute(mod.default)
	}
	if (Array.isArray(mod.routes)) {
		mod.routes.forEach((r: any) => router.addRoute(r))
	}
})

router.beforeEach((to, from, next) => {
	const { token, tokenSession, setReturnUrl } = useAuthStore()
	const tokenConfig = token || tokenSession

	if (!to.meta.notRequireAuth && !tokenConfig) {
		setReturnUrl(to.fullPath)
		next({ path: 'auth/login', replace: true })
	} else if (to.path === '/auth/login' && tokenConfig) {
		next({ path: '/', replace: true })
	} else {
		next()
	}
})
export default router
