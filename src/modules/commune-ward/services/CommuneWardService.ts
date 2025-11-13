import { AxiosError } from 'axios'

import { api, ApiResponse, apiUrl, Pagination } from '@/core'

import { CommuneWard, CommuneWardCreateDto, CommuneWardListParams, CommuneWardUpdateDto } from '../types'

export const communeWardService = {
	async listCommuneWards(params?: CommuneWardListParams): Promise<ApiResponse<Pagination<CommuneWard>>> {
		try {
			const response = await api.get<CommuneWardListParams, ApiResponse<Pagination<CommuneWard>>>(
				apiUrl.communeWard.list,
				{
					params,
				},
			)

			return response
		} catch (e) {
			const axiosError = e as AxiosError<any>

			return {
				success: false,
				message: axiosError.response?.data?.message || axiosError.message,
				errors: axiosError.response?.data?.errors || [],
			}
		}
	},
	async createCommuneWard(payload: CommuneWardCreateDto): Promise<ApiResponse<CommuneWard>> {
		try {
			const response = await api.post<CommuneWard, ApiResponse<CommuneWard>>(apiUrl.communeWard.create(), payload)

			return response
		} catch (e) {
			const axiosError = e as AxiosError<any>

			return {
				success: false,
				message: axiosError.response?.data?.message || axiosError.message,
				errors: axiosError.response?.data?.errors || [],
			}
		}
	},
	async updateCommuneWard(id: number | string, payload: CommuneWardUpdateDto): Promise<ApiResponse<CommuneWard>> {
		try {
			const response = await api.put<CommuneWard, ApiResponse<CommuneWard>>(apiUrl.communeWard.update(id), payload)

			return response
		} catch (e) {
			const axiosError = e as AxiosError<any>

			return {
				success: false,
				message: axiosError.response?.data?.message || axiosError.message,
				errors: axiosError.response?.data?.errors || [],
			}
		}
	},
	async deleteCommuneWard(id: number | string): Promise<ApiResponse<null>> {
		try {
			const response = await api.delete<null, ApiResponse<null>>(apiUrl.communeWard.delete(id))

			return response
		} catch (e) {
			const axiosError = e as AxiosError<any>

			return {
				success: false,
				message: axiosError.response?.data?.message || axiosError.message,
				errors: axiosError.response?.data?.errors || [],
			}
		}
	},
}
