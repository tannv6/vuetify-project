import { OptionWithRelation } from '@/core'

export interface Role {
	id: number
	name: string
	is_default: boolean
}

export interface GetRolesRequestParams {
	page: number
	per_page: number
	name: string
}

export interface RoleDetailResponse {
	id: number
	name: string
	is_default: boolean
	permissions: {
		screen_id: number
		permissions: {
			permission_id: number
		}[]
	}[]
}

export interface CreateRoleRequest {
	name: string
	is_default?: 1 | 0
	permissions: {
		screen_id: number
		permission_id: number
	}[]
}

export interface UpdateRoleRequest {
	name?: string
	is_default?: 1 | 0
	permissions: {
		screen_id: number
		permission_id: number
	}[]
}

export type Screen = OptionWithRelation<'permissions'>
