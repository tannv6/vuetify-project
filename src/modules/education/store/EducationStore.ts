import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '@/core'

import { degreeCertificateService } from '../services/DegreeCertificateService'
import { schoolService } from '../services/SchoolService'
import { DegreeCertificate, School } from '../types'

export const useEducationStore = defineStore('education', () => {
	// state
	const schools = ref<School[]>()
	const degreeCertificates = ref<DegreeCertificate[]>()
	const total = ref<number>(0)
	const loading = ref<boolean>(false)
	const filters = reactive({
		page: PAGE_DEFAULT,
		perPage: PAGE_SIZE_DEFAULT,
		keyword: '',
	})

	// actions
	const getSchools = async () => {
		loading.value = true
		const response = await schoolService.listSchools({
			page: filters.page,
			per_page: filters.perPage,
			...(filters.keyword && { name: filters.keyword }),
		})
		loading.value = false

		if (!response.success) return

		schools.value = response.data?.data

		total.value = response.data?.total || 0
	}

	const setFilters = (newFilters: Partial<typeof filters>) => {
		Object.assign(filters, newFilters)
	}

	const getDegreeCertificates = async () => {
		loading.value = true
		const response = await degreeCertificateService.listDegreeCertificates({
			page: filters.page,
			per_page: filters.perPage,
			...(filters.keyword && { name: filters.keyword }),
		})
		loading.value = false

		if (!response.success) return

		degreeCertificates.value = response.data?.data

		total.value = response.data?.total || 0
	}

	return {
		// state
		schools,
		degreeCertificates,
		total,
		loading,
		filters,
		// actions
		getSchools,
		getDegreeCertificates,
		setFilters,
		// getters
	}
})
