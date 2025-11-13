import { api, ApiResponse, apiUrl, Pagination } from '@/core'

import {
	CreateGroupRequest,
	Field,
	GetGroupsRequestParams,
	Group,
	GroupDetailResponse,
	Permission,
	UpdateGroupRequest,
} from '../utils/types'

export class GroupService {
	static async fetchGroups(params?: GetGroupsRequestParams) {
		try {
			const { data } = await api.get<GetGroupsRequestParams, ApiResponse<Pagination<Group>>>(apiUrl.group.getGroups, {
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
	static async fetchGroupDetail(id: number) {
		try {
			const { data } = await api.get<{}, ApiResponse<GroupDetailResponse>>(apiUrl.group.getGroup(id))

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
	static async updateGroup(id: number, params?: UpdateGroupRequest) {
		try {
			const { data } = await api.put(apiUrl.group.updateGroup(id), params)

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
	static async createGroup(params?: CreateGroupRequest) {
		try {
			const { data } = await api.post(apiUrl.group.createGroup, params)

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
	static async fetchAllFields() {
		try {
			const { data } = await api.get<{}, ApiResponse<Pagination<Field>>>(apiUrl.group.getAllFields)

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
	static async fetchAllPermissions() {
		try {
			const { data } = await api.get<{}, ApiResponse<Pagination<Permission>>>(apiUrl.group.getAllPermissions)

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
	static async deleteGroup(id: number) {
		try {
			await api.delete(apiUrl.group.deleteGroup(id))
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
