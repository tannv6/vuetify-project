import { debounce } from 'lodash-es'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { PAGE_SIZE_DEFAULT } from '@/core'

import { PermissionService } from '../services/permission.service'
import { Permission } from '../utils/types'
export const usePermissionStore = defineStore('permission', () => {
	// --- STATE ---
	const permissions = ref<Permission[]>([])
	const loading = ref<boolean>(false)
	const totalPermissions = ref<number>(0)
	const page = ref<number>(1)
	const pageSize = ref<number>(PAGE_SIZE_DEFAULT)
	const keyword = ref<string>('')
	const showModalCreatePermission = ref<boolean>(false)
	const showModalEditPermission = ref<boolean>(false)
	const permissionActive = ref<Permission | null>(null)
	const permissionForm = ref<any>({})
	const loaddingPermission = ref<boolean>(false)

	// --- ACTIONS ---
	const fetchPermissions = async () => {
		loading.value = true
		const result = await PermissionService.fetchPermissions({
			page: page.value,
			per_page: pageSize.value,
			name: keyword.value,
		})

		if (result.success) {
			const { data: { data = [], total } = {} } = result
			permissions.value = data as Permission[]
			totalPermissions.value = total || 0
		} else {
			permissions.value = []
			totalPermissions.value = 0
		}

		loading.value = false
	}

	const setPage = (value: number) => {
		page.value = value
		fetchPermissions()
	}

	const setSort = (sortField: string, sortOrder: number) => {
		page.value = 1
		fetchPermissions()
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
		fetchPermissions()
	}, 300)

	const setShowModalCreatePermission = (show: boolean) => {
		showModalCreatePermission.value = show
	}

	const setShowModalEditPermission = async (show: boolean, permission: Permission | null = null) => {
		showModalEditPermission.value = show
		permissionActive.value = permission
	}

	const setPermissionActive = (permission: Permission | null) => {
		permissionActive.value = permission
	}

	const setPermissionForm = (form: any) => {
		permissionForm.value = form
	}

	return {
		// state
		permissions,
		loading,
		totalPermissions,
		page,
		pageSize,
		keyword,
		showModalCreatePermission,
		showModalEditPermission,
		permissionActive,
		permissionForm,
		loaddingPermission,
		// actions
		fetchPermissions,
		setPage,
		setSort,
		setKeyword,
		setPageSize,
		debouncedFetch,
		setShowModalCreatePermission,
		setShowModalEditPermission,
		setPermissionActive,
		setPermissionForm,
	}
})
