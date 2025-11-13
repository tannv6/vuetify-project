import { api, type ApiResponse, apiUrl, type Pagination } from '@/core'

import type {
	CreateTeamRequest,
	GetTeamsRequestParams,
	Team,
	TeamDetailResponse,
	TeamTreeResponse,
	UpdateTeamRequest,
	UserResponse,
} from '../utils/types'

export class TeamService {
	static async fetchTeams(params?: GetTeamsRequestParams) {
		try {
			const { data } = await api.get<GetTeamsRequestParams, ApiResponse<Pagination<Team>>>(apiUrl.team.getTeams, {
				params: params || {},
			})

			return {
				success: true,
				data,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		}
	}
	static async fetchTeamDetail(id: number): Promise<ApiResponse<TeamDetailResponse>> {
		try {
			const { data } = await api.get(apiUrl.team.getTeam(id))

			return {
				success: true,
				data,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		}
	}
	static async updateTeam(id: number, params?: UpdateTeamRequest) {
		try {
			const { data } = await api.put(apiUrl.team.updateTeam(id), params)

			return {
				success: true,
				data,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		}
	}
	static async createTeams(params?: CreateTeamRequest) {
		try {
			const { data }: Pagination<Team> = await api.post(apiUrl.team.createTeam, params)

			return {
				success: true,
				data,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		}
	}
	static async fetchTeamTree(): Promise<ApiResponse<TeamTreeResponse[]>> {
		try {
			const { data } = await api.get(apiUrl.team.getTeamTree)

			return {
				success: true,
				data,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		}
	}
	static async fetAllUsers() {
		try {
			const { data } = await api.get<{}, ApiResponse<Pagination<UserResponse>>>(apiUrl.team.getAllUser)

			return {
				success: true,
				data,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		}
	}
	static async deleteTeam(id: number) {
		try {
			await api.delete(apiUrl.team.deleteTeam(id))
			return {
				success: true,
			}
		} catch (error: any) {
			return {
				success: false,
				errors: error.response?.data?.errors || [],
			}
		}
	}
}

export default new TeamService()
