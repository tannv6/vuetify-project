import { AxiosError } from 'axios'

import { api, ApiResponse, apiUrl, Pagination } from '@/core'

import { Company, CompanyCreateDto, CompanyListParams, CompanyUpdateDto } from '../types'

export const companyService = {
	async listCompanies(params?: CompanyListParams): Promise<ApiResponse<Pagination<Company>>> {
		try {
			const response = await api.get<CompanyListParams, ApiResponse<Pagination<Company>>>(apiUrl.company.list, {
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
	async createCompany(payload: CompanyCreateDto): Promise<ApiResponse<Company>> {
		try {
			const response = await api.post<Company, ApiResponse<Company>>(apiUrl.company.create(), payload)

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
	async updateCompany(id: number | string, payload: CompanyUpdateDto): Promise<ApiResponse<Company>> {
		try {
			const response = await api.put<Company, ApiResponse<Company>>(apiUrl.company.update(id), payload)

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

	async approveCompany(id: number | string, payload: CompanyUpdateDto): Promise<ApiResponse<Company>> {
		try {
			const response = await api.put<Company, ApiResponse<Company>>(apiUrl.company.updateApprove(id), payload)

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
	async deleteCompany(id: number | string): Promise<ApiResponse<null>> {
		try {
			const response = await api.delete<null, ApiResponse<null>>(apiUrl.company.delete(id))

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
