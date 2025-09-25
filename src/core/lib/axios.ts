import axios from 'axios'

import { apiRequestTimeOut } from '@/core/utils/constants'
import router from '@/router'
import { useAuthStore } from '@/modules/auth'

const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}${import.meta.env.VITE_API_PREFIX || '/api'}`,
	timeout: apiRequestTimeOut,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use(
	(config) => {
		const { token, tokenSession } = useAuthStore()

		const tokenConfig = token || tokenSession
		if (tokenConfig) config.headers.Authorization = `Bearer ${tokenConfig}`
		if (config.data instanceof FormData) config.headers['Content-Type'] = 'multipart/form-data'
		return config
	},
	(error) => Promise.reject(error),
)

api.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		if (error.code === 'ERR_NETWORK') {
			return Promise.reject(error)
		}

		if (
			error.response?.status === 401 &&
			(error.response?.data?.errors?.includes('EAPI004') || error.response?.data?.errors?.includes('EAPI005'))
		) {
			const { logout, setReturnUrl } = useAuthStore()
			logout()
			setReturnUrl(router.currentRoute.value.fullPath)
			router.replace('/auth/login')
			return false
		}
		if (!error.response?.data?.errors) {
			return Promise.reject({
				...error,
				response: {
					data: {
						errors: ['DEFAULT'],
					},
				},
			})
		}
		return Promise.reject(error)
	},
)

export { api }
