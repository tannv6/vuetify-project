import { defineStore } from 'pinia'
import { ref } from 'vue'

import { PositionService } from '../services/position.service'
import type { Position } from '../utils/types'

export const usePositionStore = defineStore('position', () => {
	const positions = ref<Position[]>([])
	const loading = ref(false)
	const totalPositions = ref(0)
	const loaddingPosition = ref(false)
	const showModalEditPosition = ref(false)
	const showModalCreatePosition = ref(false)
	const positionActive = ref<Position | null>(null)

	const fetchPositions = async () => {
		loading.value = true
		const result = await PositionService.fetchPositions()

		if (result.success) {
			const { data: { data = [], total } = {} } = result
			positions.value = data as Position[]
			totalPositions.value = total || 0
		} else {
			positions.value = []
			totalPositions.value = 0
		}

		loading.value = false
	}

	const setShowModalEditPosition = (show: boolean, position: Position | null = null) => {
		showModalEditPosition.value = show
		positionActive.value = position
	}

	return {
		positions,
		loading,
		totalPositions,
		loaddingPosition,
		showModalEditPosition,
		showModalCreatePosition,
		positionActive,
		fetchPositions,
		setShowModalEditPosition,
	}
})
