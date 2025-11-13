export interface Team {
	id: number
	name: string
	description: string
	member: any[]
	parent_name: string
	created_at: string
}

export interface GetTeamsRequestParams {
	page: number
	per_page: number
	name: string
}

export interface CreateTeamRequest {
	name: string
	chatwork_room_id: string
	description: string
	parent_id: number | string | null
	user_id: number[]
	leader_id: number[]
}

export interface UpdateTeamRequest {
	name: string
	chatwork_room_id: string
	description: string
	parent_id: number | string | null
	user_id: number[]
	leader_id: number[]
}

export interface TeamTree {
	key: number
	label: string
	children: TeamTree[]
	selectable?: boolean
}

export interface TeamTreeResponse {
	id: number
	name: string
	level: number
	children: TeamTreeResponse[]
	user_count: number
}

export interface UserTeam {
	id: number
	name: string
	role_id: number
	group_id: number
	position_id: number | null
	level_code_id: number | null
	email: string
	email_verified_at: string | null
	created_at: string
	updated_at: string
	deleted_at: string | null
	pivot: {
		team_id: number
		user_id: number
		is_leader: number
		created_at: string
		updated_at: string
	}
}

export interface TeamDetailResponse {
	id: number
	name: string
	description: string
	parent: string
	children_count: number
	users: UserTeam[]
	parent_id: number
	disable_team: number[]
	team_trees: TeamTreeResponse[]
	chatwork_room_id?: string
	leader_id?: number[]
}

export interface UserResponse {
	id: number
	role_id: number
	group_id: number
	position_id: number | null
	level_code_id: number | null
	email: string
	email_verified_at: string | null
	created_at: string
	updated_at: string
	deleted_at: string | null
	user_basic_info: {
		id: number
		user_id: number
		employee_code: string
		entry_code: string | null
		full_name_vn: string | null
		full_name_jp: string
		full_name_en: string | null
		image: string | null
		date_of_birth: string | null
		gender: number
		chatwork_id: string | null
		date_of_joining: string | null
		date_of_resignation: string | null
		is_dev_ops: number
		phone: string | null
		is_married: number
		number_of_children: string | null
		has_young_children: number
		employment_status: string | null
		personal_email: string | null
		introducer: string | null
		training_end_date: string | null
		created_at: string | null
		updated_at: string | null
		deleted_at: string | null
	}
}
