import { ApiResponse, apiUrl, Pagination } from '@/core'
import { api } from '@/core/lib/axios'

import { CreatePositionRequest, Position, PositionDetailResponse, UpdatePositionRequest } from '../utils/types'

export class PositionService {
	static async fetchPositions() {
		try {
			const { data } = await api.get<any, ApiResponse<Pagination<Position>>>(apiUrl.position.getPositions)

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
	static async fetchPositionDetail(id: number) {
		try {
			const { data } = await api.get<any, ApiResponse<PositionDetailResponse>>(apiUrl.position.getPosition(id))

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
	static async createPosition(params?: CreatePositionRequest) {
		try {
			const { data } = await api.post(apiUrl.position.createPosition, params)

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
	static async updatePosition(id: number, params?: UpdatePositionRequest) {
		try {
			const { data } = await api.put(apiUrl.position.updatePosition(id), params)

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
	static async deletePosition(id: number) {
		try {
			await api.delete(apiUrl.position.deletePosition(id))
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
