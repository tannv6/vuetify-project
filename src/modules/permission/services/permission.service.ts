import { api, ApiResponse, apiUrl, Pagination } from '@/core'

import {
	CreatePermissionRequest,
	GetPermissionsRequestParams,
	Permission,
	PermissionDetailResponse,
	UpdatePermissionRequest,
} from '../utils/types'

export class PermissionService {
	static async fetchPermissions(params?: GetPermissionsRequestParams) {
		try {
			const { data } = await api.get<GetPermissionsRequestParams, ApiResponse<Pagination<Permission>>>(
				apiUrl.permission.getPermissions,
				{
					params: params || {},
				},
			)

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
	static async fetchPermissionDetail(id: number) {
		try {
			const { data } = await api.get<{}, ApiResponse<PermissionDetailResponse>>(apiUrl.permission.getPermission(id))

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
	static async updatePermission(id: number, params?: UpdatePermissionRequest) {
		try {
			const { data } = await api.put(apiUrl.permission.updatePermission(id), params)

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
	static async createPermission(params?: CreatePermissionRequest) {
		try {
			const { data } = await api.post(apiUrl.permission.createPermission, params)

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
	static async deletePermission(id: number) {
		try {
			await api.delete(apiUrl.permission.deletePermission(id))
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

export default new PermissionService()
