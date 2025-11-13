export interface Province {
	id: number
	name: string
}

export interface ProvinceListParams {
	page?: number
	per_page?: number
	name?: string
}

export interface ProvinceCreateDto {
	name: string
}
