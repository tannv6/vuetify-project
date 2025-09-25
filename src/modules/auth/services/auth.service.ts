import { apiUrl } from '@/core'
import { api } from '@/core/lib/axios'

import { useAuthStore } from '../store/auth.store'

export class AuthService {
	static async login(email: string, password: string) {
		try {
			const { data } = await api.post(apiUrl.login, { email, password })

			const authStore = useAuthStore()

			authStore.setToken(data.token)
			return {
				success: true,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		}
	}
	static async logout() {
		const authStore = useAuthStore()
		try {
			await api.post(apiUrl.logout)
			return {
				success: true,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		} finally {
			authStore.logout()
		}
	}
}

export default new AuthService()
