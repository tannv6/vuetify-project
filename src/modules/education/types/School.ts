export interface School {
	id: number | string
	name_vn?: string
	name_en?: string
	short_name?: string
	is_approve?: boolean
}

export interface SchoolListParams {
	page?: number
	per_page?: number
	name?: string
}

export interface SchoolCreateDto {
	name_vn?: string | null
	name_en?: string | null
	short_name?: string | null
	is_approve?: boolean
}

export interface SchoolUpdateDto {
	name_vn?: string | null
	name_en?: string | null
	short_name?: string | null
	is_approve?: boolean
}
