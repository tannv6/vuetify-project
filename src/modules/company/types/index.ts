export interface Company {
	id: number | string
	name_vn?: string
	name_en?: string
	short_name?: string
	is_approve?: boolean
}

export interface CompanyListParams {
	page?: number
	per_page?: number
	name?: string
}

export interface CompanyCreateDto {
	name_vn?: string | null
	name_en?: string | null
	short_name?: string | null
	is_approve?: boolean
}

export interface CompanyUpdateDto {
	name_vn?: string | null
	name_en?: string | null
	short_name?: string | null
	is_approve?: boolean
}
