import { ref } from 'vue'

import { School } from '../types'

export function useModal() {
	const visible = ref(false)
	const data = ref<School | null>(null)
	const type = ref<'create' | 'edit'>('create')

	const open = (item: School | null, modalType: 'create' | 'edit' = 'create') => {
		data.value = item || null
		type.value = modalType
		visible.value = true
	}

	const close = () => {
		visible.value = false
		data.value = null
		type.value = 'create'
	}

	return {
		visible,
		data,
		type,
		open,
		close,
	}
}
