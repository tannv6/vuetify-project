import { defineStore } from 'pinia'

export const useLayoutsStore = defineStore('layouts', {
	state: () => ({
		drawer: true,
		darkMode: false,
		locale: 'en',
	}),
	persist: true,
})
