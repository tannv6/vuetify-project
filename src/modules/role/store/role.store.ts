import { debounce } from 'lodash-es'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { PAGE_SIZE_DEFAULT } from '@/core'

import { RoleService } from '../services/role.service'
import { Role, Screen } from '../utils/types'
export const useRoleStore = defineStore('role', () => {
	// --- STATE ---
	const roles = ref<Role[]>([])
	const loading = ref<boolean>(false)
	const totalRoles = ref<number>(0)
	const page = ref<number>(1)
	const pageSize = ref<number>(PAGE_SIZE_DEFAULT)
	const keyword = ref<string>('')

	const showModalCreateRole = ref<boolean>(false)
	const showModalEditRole = ref<boolean>(false)
	const roleActive = ref<Role | null>(null)
	const roleForm = ref<any>({})
	const loaddingRole = ref<boolean>(false)
	const screens = ref<Screen[]>([])

	// --- ACTIONS ---
	const fetchRoles = async () => {
		loading.value = true
		const result = await RoleService.fetchRoles({
			page: page.value,
			per_page: pageSize.value,
			name: keyword.value,
		})

		if (result.success) {
			const { data: { data = [], total } = {} } = result
			roles.value = data as Role[]
			totalRoles.value = total || 0
		} else {
			roles.value = []
			totalRoles.value = 0
		}

		loading.value = false
	}

	const setPage = (value: number) => {
		page.value = value
		fetchRoles()
	}

	const setSort = (sortField: string, sortOrder: number) => {
		page.value = 1
		fetchRoles()
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
		fetchRoles()
	}, 300)

	const setShowModalEditRole = async (show: boolean, role: Role | null = null) => {
		showModalEditRole.value = show
		roleActive.value = role
	}

	const fetchAllScreens = async () => {
		const result = await RoleService.fetchAllScreens()

		if (result.success) {
			screens.value = result.data?.data || []
		} else {
			screens.value = []
		}
	}

	return {
		// state
		roles,
		loading,
		totalRoles,
		page,
		pageSize,
		keyword,
		showModalCreateRole,
		showModalEditRole,
		roleActive,
		roleForm,
		loaddingRole,
		screens,
		// actions
		fetchRoles,
		setPage,
		setSort,
		setKeyword,
		setPageSize,
		debouncedFetch,
		setShowModalEditRole,
		fetchAllScreens,
	}
})
