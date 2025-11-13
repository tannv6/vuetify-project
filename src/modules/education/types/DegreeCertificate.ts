export interface DegreeCertificate {
	id: number | string
	name_vn?: string
	name_en?: string
	is_approve?: boolean
}

export interface DegreeCertificateListParams {
	page?: number
	per_page?: number
	name?: string
}

export interface DegreeCertificateCreateDto {
	name_vn?: string | null
	name_en?: string | null
	is_approve?: boolean
}

export interface DegreeCertificateUpdateDto {
	name_vn?: string | null
	name_en?: string | null
	is_approve?: boolean
}
