import { ref } from 'vue'

import { Company } from '../types'

export function useModal() {
	const visible = ref(false)
	const data = ref<Company | null>(null)
	const type = ref<'create' | 'edit'>('create')

	const open = (item: Company | null, modalType: 'create' | 'edit' = 'create') => {
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
