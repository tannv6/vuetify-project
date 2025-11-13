import { defineStore } from 'pinia'
import { ref } from 'vue'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '@/core'

import { provinceService } from '../services/provinceService'
import { Province } from '../types'

export const useProvinceStore = defineStore('province', () => {
	// state
	const provinces = ref<Province[]>()
	const total = ref<number>(0)
	const loading = ref<boolean>(false)
	const page = ref<number>(PAGE_DEFAULT)
	const perPage = ref<number>(PAGE_SIZE_DEFAULT)
	const keyword = ref<string>('')

	// actions
	const getProvinces = async () => {
		loading.value = true
		const params: Record<string, any> = {
			page: page.value,
			per_page: perPage.value,
		}

		if (keyword.value) params.name = keyword.value

		const response = await provinceService.listProvinces(params)
		loading.value = false

		if (!response.success) return

		provinces.value = response.data?.data
		total.value = response.data?.total || 0
	}

	const setPage = (p: number) => (page.value = p)
	const setPerPage = (r: number) => (perPage.value = r)
	const setKeyword = (k: string) => (keyword.value = k)

	return {
		// state
		provinces,
		total,
		loading,
		page,
		perPage,
		// actions
		getProvinces,
		setPage,
		setPerPage,
		setKeyword,
		// getters
	}
})
