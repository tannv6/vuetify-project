import { GroupChildItem } from '@/core'

export interface Position {
	id: number
	name: string
	parent_id: number | null
	parent_name: string | null
}
export interface PositionStates {
	positions: Position[]
	loading: boolean
	totalPositions: number
	loaddingPosition: boolean
	showModalEditPosition: boolean
	showModalCreatePosition: boolean
	positionActive: Position | null
}

export interface LevelItemResponse {
	id: number
	position_id: number
	name: string
	order_rank: number
}

export interface LevelCodeResponse extends LevelItemResponse {
	level_id: number
}

export interface LevelResponse extends LevelItemResponse {
	level_codes: LevelCodeResponse[]
}

export interface PositionDetailResponse {
	id: number
	name: string
	parent_id: number | null
	parent_name: string | null
	levels: LevelResponse[]
	level_code: LevelCodeResponse[]
}

export interface CreatePositionRequest {
	name: string
	parent_id?: number | null
	levels?: {
		level: GroupChildItem
		level_code: GroupChildItem[]
	}[]
	level_code?: GroupChildItem[]
}

export interface UpdatePositionRequest {
	name: string
	parent_id?: number | null
	levels?: {
		level: GroupChildItem
		level_code: GroupChildItem[]
	}[]
	level_code?: GroupChildItem[]
}
