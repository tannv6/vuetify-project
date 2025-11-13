import { AxiosError } from 'axios'

import { api, ApiResponse, apiUrl, Pagination } from '@/core'

import {
	DegreeCertificate,
	DegreeCertificateCreateDto,
	DegreeCertificateListParams,
	DegreeCertificateUpdateDto,
} from '../types'

export const degreeCertificateService = {
	async listDegreeCertificates(params?: DegreeCertificateListParams): Promise<ApiResponse<Pagination<DegreeCertificate>>> {
		try {
			const response = await api.get<DegreeCertificateListParams, ApiResponse<Pagination<DegreeCertificate>>>(
				apiUrl.degreeCertificate.list,
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
	async createDegreeCertificate(payload: DegreeCertificateCreateDto): Promise<ApiResponse<DegreeCertificate>> {
		try {
			const response = await api.post<DegreeCertificate, ApiResponse<DegreeCertificate>>(
				apiUrl.degreeCertificate.create(),
				payload,
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
	async updateDegreeCertificate(
		id: number | string,
		payload: DegreeCertificateUpdateDto,
	): Promise<ApiResponse<DegreeCertificate>> {
		try {
			const response = await api.put<DegreeCertificate, ApiResponse<DegreeCertificate>>(
				apiUrl.degreeCertificate.update(id),
				payload,
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

	async approveDegreeCertificate(
		id: number | string,
		payload: DegreeCertificateUpdateDto,
	): Promise<ApiResponse<DegreeCertificate>> {
		try {
			const response = await api.put<DegreeCertificate, ApiResponse<DegreeCertificate>>(
				apiUrl.degreeCertificate.updateApprove(id),
				payload,
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
	async deleteDegreeCertificate(id: number | string): Promise<ApiResponse<null>> {
		try {
			const response = await api.delete<null, ApiResponse<null>>(apiUrl.degreeCertificate.delete(id))

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
