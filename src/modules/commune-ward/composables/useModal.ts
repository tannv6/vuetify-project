import { ref } from 'vue'

export function useModal() {
	const visible = ref(false)
	const data = ref<any>(null)
	const type = ref<'create' | 'edit'>('create')

	const open = (item?: any, modalType: 'create' | 'edit' = 'create') => {
		data.value = item || null
		type.value = modalType
		visible.value = true
	}

	const close = () => {
		visible.value = false
		data.value = null
	}

	return {
		visible,
		data,
		type,
		open,
		close,
	}
}
