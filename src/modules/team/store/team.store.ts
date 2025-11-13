import { defineStore } from 'pinia'
import { ref } from 'vue'

import { PAGE_SIZE_DEFAULT } from '@/core'

import { TeamService } from '../services/team.service'
import { mapDisableTeamTree, mapToTeamTree, mapToUser } from '../utils/functions'
import { debounce } from 'lodash-es'
export const useTeamStore = defineStore('team', () => {
	// --- STATE ---
	const teams = ref<any[]>([])
	const loading = ref<boolean>(false)
	const totalTeams = ref<number>(0)
	const page = ref<number>(1)
	const pageSize = ref<number>(PAGE_SIZE_DEFAULT)
	const keyword = ref<string>('')

	const teamTree = ref<any[]>([])
	const users = ref<any[]>([])

	const showModalCreateTeam = ref<boolean>(false)
	const teamId = ref<any | null>(null)
	const loaddingTeam = ref<boolean>(false)

	const name = ref('')
	const chatId = ref('')
	const parentId = ref(null)
	const description = ref('')
	const userIds = ref<any[]>([])
	const leaderIds = ref<any[]>([])
	const form = ref()
	const isValid = ref(false)

	// --- ACTIONS ---
	const fetchTeams = async () => {
		loading.value = true
		const result = await TeamService.fetchTeams({
			page: page.value,
			per_page: pageSize.value,
			name: keyword.value,
		})
		if (result.success) {
			const { data: { data = [], total } = {} } = result
			teams.value = data as any[]
			totalTeams.value = total || 0
		} else {
			teams.value = []
			totalTeams.value = 0
		}
		loading.value = false
	}

	const handleUpdateTable = ({ page, itemsPerPage, sortBy }: any) => {
		console.log({ page, itemsPerPage, sortBy })
		fetchTeams()
	}

	const setPage = (value: number) => {
		page.value = value
		fetchTeams()
	}

	const setSort = (sortField: string, sortOrder: number) => {
		page.value = 1
		fetchTeams()
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
		fetchTeams()
	}, 300)

	const handleCreateTeam = async () => {
		const result = await TeamService.createTeams({
			name: name.value.trim(),
			chatwork_room_id: chatId.value.trim(),
			description: '',
			parent_id: null,
			user_id: [],
			leader_id: [],
		})
		if (result.success) {
			// await showAlert('success', '', t('message.team.createSuccess'))
			showModalCreateTeam.value = false
			setPage(1)
		} else {
			// await showAlert('error', '', t(`codes.${getValidateCodes(result.errors)[0]}`))
		}
	}

	const handleShowUpdate = async (id: number) => {
		teamId.value = id
		showModalCreateTeam.value = true
		const { success, data } = await TeamService.fetchTeamDetail(id)
		if (success) {
			name.value = data?.name || ''
			chatId.value = data?.chatwork_room_id || ''
		}
	}

	const handleShowCreate = () => {
		teamId.value = null
		showModalCreateTeam.value = true
	}

	const handleUpdateTeam = async (teamId: number) => {
		const result = await TeamService.updateTeam(teamId, {
			name: name.value.trim(),
			chatwork_room_id: chatId.value.trim(),
			description: description.value.trim(),
			parent_id: parentId.value,
			user_id: userIds.value || [],
			leader_id: leaderIds.value || [],
		})
		if (result.success) {
			// await showAlert('success', '', t('message.team.updateSuccess'))
			fetchTeams()
		} else {
			// await showAlert('error', '', t(`codes.${getValidateCodes(result.errors)[0]}`))
		}
	}

	const handleSubmit = async () => {
		const { valid } = await form.value.validate()
		if (!valid) return
		if (teamId.value) {
			return handleUpdateTeam(teamId.value)
		}
		handleCreateTeam()
	}

	const fetchTeamTree = async () => {
		const result = await TeamService.fetchTeamTree()
		if (result.success) {
			teamTree.value = mapToTeamTree(result.data || [])
		}
	}

	const setDisableTeam = async (ids: number[]) => {
		teamTree.value = mapDisableTeamTree(teamTree.value, ids)
	}

	const fetAllUsers = async (locale?: string) => {
		const result = await TeamService.fetAllUsers()
		if (result.success) {
			users.value = mapToUser(result.data?.data || [], locale)
		}
	}

	const setShowModalCreateTeam = (show: boolean) => {
		showModalCreateTeam.value = show
	}

	return {
		// state
		teams,
		loading,
		totalTeams,
		page,
		pageSize,
		keyword,
		teamTree,
		users,
		showModalCreateTeam,
		loaddingTeam,
		name,
		chatId,
		form,
		isValid,
		teamId,
		// actions
		fetchTeams,
		setPage,
		setSort,
		setKeyword,
		setPageSize,
		debouncedFetch,
		fetchTeamTree,
		setDisableTeam,
		fetAllUsers,
		setShowModalCreateTeam,
		handleSubmit,
		handleShowUpdate,
		handleShowCreate,
		handleUpdateTable,
	}
})
