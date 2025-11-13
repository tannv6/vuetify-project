import { AxiosError } from 'axios'

import { api, ApiResponse, apiUrl, Pagination } from '@/core'

import { School, SchoolCreateDto, SchoolListParams, SchoolUpdateDto } from '../types'

export const schoolService = {
	async listSchools(params?: SchoolListParams): Promise<ApiResponse<Pagination<School>>> {
		try {
			const response = await api.get<SchoolListParams, ApiResponse<Pagination<School>>>(apiUrl.school.list, {
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
	async createSchool(payload: SchoolCreateDto): Promise<ApiResponse<School>> {
		try {
			const response = await api.post<School, ApiResponse<School>>(apiUrl.school.create(), payload)

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
	async updateSchool(id: number | string, payload: SchoolUpdateDto): Promise<ApiResponse<School>> {
		try {
			const response = await api.put<School, ApiResponse<School>>(apiUrl.school.update(id), payload)

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

	async approveSchool(id: number | string, payload: SchoolUpdateDto): Promise<ApiResponse<School>> {
		try {
			const response = await api.put<School, ApiResponse<School>>(apiUrl.school.updateApprove(id), payload)

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
	async deleteSchool(id: number | string): Promise<ApiResponse<null>> {
		try {
			const response = await api.delete<null, ApiResponse<null>>(apiUrl.school.delete(id))

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
