export interface CommuneWard {
	id: number
	name: string
}

export interface CommuneWardListParams {
	page?: number
	per_page?: number
	name?: string
	province_id?: number | null
}

export interface CommuneWardCreateDto {
	province_id: number
	name: string
}

export interface CommuneWardUpdateDto {
	province_id: number
	name: string
}
