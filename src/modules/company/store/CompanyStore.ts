import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '@/core'

import { companyService } from '../services/CompanyService'
import { Company } from '../types'

export const useCompanyStore = defineStore('company', () => {
	// state
	const companies = ref<Company[]>()
	const total = ref<number>(0)
	const loading = ref<boolean>(false)
	const filters = reactive({
		page: PAGE_DEFAULT,
		perPage: PAGE_SIZE_DEFAULT,
		keyword: '',
	})

	// actions
	const getCompanies = async () => {
		loading.value = true
		const response = await companyService.listCompanies({
			page: filters.page,
			per_page: filters.perPage,
			...(filters.keyword && { name: filters.keyword }),
		})
		loading.value = false

		if (!response.success) return

		companies.value = response.data?.data

		total.value = response.data?.total || 0
	}

	const setFilters = (newFilters: Partial<typeof filters>) => {
		Object.assign(filters, newFilters)
	}

	return {
		// state
		companies,
		total,
		loading,
		filters,
		// actions
		getCompanies,
		setFilters,
		// getters
	}
})
