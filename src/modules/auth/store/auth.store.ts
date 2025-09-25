import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: null as null | string,
		tokenSession: null as null | string,
		rememberMe: true,
		returnUrl: null as null | string,
	}),
	actions: {
		setToken(token: any) {
			if (this.rememberMe) {
				this.token = token
			} else {
				this.tokenSession = token
			}
		},
		logout() {
			this.token = null
			this.tokenSession = null
			this.returnUrl = null
		},
		setRememberMe(value: boolean) {
			this.rememberMe = value
		},
		setReturnUrl(url: string) {
			this.returnUrl = url
		},
	},
	persist: [
		{
			key: 'auth',
			pick: ['token', 'rememberMe'],
			storage: localStorage,
		},
		{
			key: 'auth',
			pick: ['tokenSession', 'returnUrl'],
			storage: sessionStorage,
		},
	],
})
