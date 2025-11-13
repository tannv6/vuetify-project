import { api, ApiResponse, apiUrl, Pagination } from '@/core'

import { CreateRoleRequest, GetRolesRequestParams, Role, RoleDetailResponse, Screen, UpdateRoleRequest } from '../utils/types'

export class RoleService {
	static async fetchRoles(params?: GetRolesRequestParams) {
		try {
			const { data } = await api.get<GetRolesRequestParams, ApiResponse<Pagination<Role>>>(apiUrl.role.getRoles, {
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
	static async fetchAllScreens() {
		try {
			const { data } = await api.get<{}, ApiResponse<Pagination<Screen>>>(apiUrl.role.getAllScreens)

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
	static async fetchRoleDetail(id: number) {
		try {
			const { data } = await api.get<{}, ApiResponse<RoleDetailResponse>>(apiUrl.role.getRole(id))

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
	static async createRole(params?: CreateRoleRequest) {
		try {
			const { data }: Pagination<Role> = await api.post(apiUrl.role.createRole, params)

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
	static async updateRole(id: number, params?: UpdateRoleRequest) {
		try {
			const { data } = await api.put(apiUrl.role.updateRole(id), params)

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
	static async deleteRole(id: number) {
		try {
			await api.delete(apiUrl.role.deleteRole(id))
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
