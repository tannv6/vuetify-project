import { debounce } from 'lodash-es'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { PAGE_SIZE_DEFAULT } from '@/core'

import { GroupService } from '../services/group.service'
import { Field, Group, Permission } from '../utils/types'
export const useGroupStore = defineStore('group', () => {
	// --- STATE ---
	const groups = ref<Group[]>([])
	const loading = ref<boolean>(false)
	const totalGroups = ref<number>(0)
	const page = ref<number>(1)
	const pageSize = ref<number>(PAGE_SIZE_DEFAULT)
	const keyword = ref<string>('')
	const showModalCreateGroup = ref<boolean>(false)
	const showModalEditGroup = ref<boolean>(false)
	const groupActive = ref<Group | null>(null)
	const loaddingGroup = ref<boolean>(false)
	const fields = ref<Field[]>([])
	const permissions = ref<Permission[]>([])

	// --- ACTIONS ---
	const fetchGroups = async () => {
		loading.value = true
		const result = await GroupService.fetchGroups({
			page: page.value,
			per_page: pageSize.value,
			name: keyword.value,
		})

		if (result.success) {
			const { data: { data = [], total } = {} } = result
			groups.value = data
			totalGroups.value = total || 0
		} else {
			groups.value = []
			totalGroups.value = 0
		}

		loading.value = false
	}

	const setPage = (value: number) => {
		page.value = value
		fetchGroups()
	}

	const setKeyword = (value: string) => {
		keyword.value = value
		debouncedFetch()
	}

	const setPageSize = (value: number) => {
		pageSize.value = value
	}

	const debouncedFetch = debounce(() => {
		page.value = 1
		fetchGroups()
	}, 300)

	const setShowModalEditGroup = async (show: boolean, group: Group | null = null) => {
		showModalEditGroup.value = show
		groupActive.value = group
	}

	const fetchAllFields = async () => {
		const result = await GroupService.fetchAllFields()
		if (result.success) {
			const { data: { data = [] } = {} } = result
			fields.value = data
		}
	}

	const fetchAllPermissions = async () => {
		const result = await GroupService.fetchAllPermissions()
		if (result.success) {
			const { data: { data = [] } = {} } = result
			permissions.value = data
		}
	}

	return {
		// state
		groups,
		loading,
		totalGroups,
		page,
		pageSize,
		keyword,
		showModalCreateGroup,
		showModalEditGroup,
		groupActive,
		loaddingGroup,
		fields,
		permissions,
		// actions
		fetchGroups,
		setPage,
		setKeyword,
		setPageSize,
		debouncedFetch,
		setShowModalEditGroup,
		fetchAllFields,
		fetchAllPermissions,
	}
})
