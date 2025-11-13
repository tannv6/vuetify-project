export interface Permission {
	id: number
	name: string
}

export interface CreatePermissionRequest {
	name: string
}

export interface UpdatePermissionRequest {
	name: string
}

export interface GetPermissionsRequestParams {
	page: number
	per_page: number
	name: string
}

export interface PermissionDetailResponse {
	id: number
	name: string
}
