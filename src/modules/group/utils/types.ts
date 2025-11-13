export interface Group {
	id: number
	name: string
}
export interface Field {
	id: string
	name: string
}
export interface Permission {
	id: number
	name: string
}

export interface GetGroupsRequestParams {
	page: number
	per_page: number
	name: string
}

export interface GroupDetailResponse {
	id: number
	name: string
	permissions: {
		field_id: number
		field_name: string
		permissions: {
			permission_id: number
			permission_name: string
		}[]
	}[]
}

export interface CreateGroupRequest {
	name: string
	permissions: {
		field_id: number
		permission_id: number
	}[]
}

export interface UpdateGroupRequest {
	name: string
	permissions: {
		field_id: number
		permission_id: number
	}[]
}
