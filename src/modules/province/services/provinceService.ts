import { AxiosError } from 'axios'

import { api, ApiResponse, apiUrl, Pagination } from '@/core'

import { Province, ProvinceCreateDto, ProvinceListParams } from '../types'

export const provinceService = {
	async listProvinces(params?: ProvinceListParams): Promise<ApiResponse<Pagination<Province>>> {
		try {
			const response = await api.get<ProvinceListParams, ApiResponse<Pagination<Province>>>(apiUrl.province.list, {
				params,
			})

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
	async createProvince(payload: ProvinceCreateDto): Promise<ApiResponse<Province>> {
		try {
			const response = await api.post<Province, ApiResponse<Province>>(apiUrl.province.create(), payload)

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
	async updateProvince(id: number | string, payload: ProvinceCreateDto): Promise<ApiResponse<Province>> {
		try {
			const response = await api.put<Province, ApiResponse<Province>>(apiUrl.province.update(id), payload)

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
	async deleteProvince(id: number | string): Promise<ApiResponse<null>> {
		try {
			const response = await api.delete<null, ApiResponse<null>>(apiUrl.province.delete(id))

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
