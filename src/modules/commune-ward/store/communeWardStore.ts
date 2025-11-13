import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '@/core'

import { communeWardService } from '../services/CommuneWardService'
import { CommuneWard } from '../types'

export const useCommuneWardStore = defineStore('commune-ward', () => {
	// state
	const communeWards = ref<CommuneWard[]>()
	const total = ref<number>(0)
	const loading = ref<boolean>(false)
	const filters = reactive({
		page: PAGE_DEFAULT,
		perPage: PAGE_SIZE_DEFAULT,
		keyword: '',
		provinceId: null as number | null,
	})

	// actions
	const getCommuneWards = async () => {
		loading.value = true
		const response = await communeWardService.listCommuneWards({
			page: filters.page,
			per_page: filters.perPage,
			province_id: filters.provinceId,
			...(filters.keyword && { name: filters.keyword }),
		})
		loading.value = false

		if (!response.success) return

		communeWards.value = response.data?.data
		total.value = response.data?.total || 0
	}

	const setFilters = (newFilters: Partial<typeof filters>) => {
		Object.assign(filters, newFilters)
	}

	return {
		// state
		communeWards,
		total,
		loading,
		filters,
		// actions
		getCommuneWards,
		setFilters,
		// getters
	}
})
