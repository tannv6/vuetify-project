import { ref } from 'vue'

import { Province, provinceService } from '@/modules/province'

import { useCommuneWardStore } from '../store/communeWardStore'

const communeWardStore = useCommuneWardStore()

export function useProvinceFilter() {
	const selectedProvince = ref<Province | null>(null)
	const firstProvince = ref<Province | null>(null)
	const provinces = ref<Province[]>([])
	const filteredProvinces = ref<Province[]>([])

	const fetchProvinces = async () => {
		const response = await provinceService.listProvinces()
		provinces.value = response.data?.data || []
		filteredProvinces.value = [...provinces.value]

		if (provinces.value.length > 0 && !firstProvince.value) {
			firstProvince.value = provinces.value[0]
			communeWardStore.setFilters({ provinceId: firstProvince.value.id })
		}
	}

	const searchProvince = (event: { query: string }) => {
		const query = event.query.trim().toLowerCase()

		if (!query.length) {
			filteredProvinces.value = [...provinces.value]
		} else {
			filteredProvinces.value = provinces.value.filter((province) => province.name.toLowerCase().includes(query))
		}
	}

	const onProvinceSelect = (event: any) => {
		selectedProvince.value = event.value
		communeWardStore.setFilters({ provinceId: selectedProvince.value?.id })

		communeWardStore.getCommuneWards()
	}

	return {
		selectedProvince,
		provinces,
		filteredProvinces,
		firstProvince,
		fetchProvinces,
		searchProvince,
		onProvinceSelect,
	}
}
