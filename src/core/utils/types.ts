export type Locales = 'en' | 'vi' | 'ja'

export interface GroupChildItem {
	id: number | string | null
	name: string
}

export interface GroupItem {
	id: number | string
	name: string
	children: GroupChildItem[]
}

export type GroupListProps = {
	modelValue?: GroupItem[]
	disabled?: boolean
	deep: 1 | 2
	labels: string[]
	placeholders: string[]
}

type FieldTypeMap = {
	text: any
	number: any
	password: any
	textarea: any
	select: any
	editor: any
	checkbox: any
	multiselect: any
	treeselect: any
	listbox: any
	autocomplete: any
	selectcustom: any
	mapping: {
		list: [Option[], Option[]]
	}
	relations: {
		list: OptionWithRelation[]
		keyOfChildren: string
		disabled?: boolean
	}
	grouplist: GroupListProps
	datepicker: any
	imagebox: {
		src?: string
		file?: File | null
		ratio?: string
		maxWidth?: string
	}
	ratio: {
		optionList: Option[]
		name?: string
	}
	dynamicformlist: {
		inputList: FieldSchema[]
		classNameCustom?: string
		optionAllList?: Option[][]
		childErrors?: { [key: string]: any }
		defaultValue?: any
	}
	inputgroup: {
		classNameCustom?: string
		inputList: FieldSchema[]
	}
	multiselectcustom: any
}

export interface FieldSchema<T extends keyof FieldTypeMap = keyof FieldTypeMap> {
	id?: string
	type: T
	label?: string
	placeholder?: string
	required?: boolean
	icon?: string
	optionList?: Option[]
	model?: any
	attrs?: FieldTypeMap[T]
	errors?: { value?: string }
	feedback?: boolean
	isHide?: boolean
	classNameCustom?: string
	collapsable?: boolean
	name?: string
	showAddBtn?: boolean
	addBtnLabel?: string
	addBtnManual?: string
	onClickAddBtn?: () => void
}

export interface ButtonSchema {
	url?: string
	classNameCustom?: string
	isShow?: boolean
}

export interface FormSchema {
	top?: { icon?: string; title?: string; subTitle?: string }
	fieldList: FieldSchema[]
	button?: ButtonSchema[]
	fieldListProps?: any
}

export interface MenuItem {
	label?: string
	icon?: string
	to?: string
	separator?: boolean
	items?: MenuItem[]
}

export type AlertType = 'success' | 'info' | 'warning' | 'question' | 'error'

export interface Pagination<T> {
	current_page: number
	data: T[]
	from: number
	to: number
	last_page: number
	per_page: number
	total: number
}

export interface ApiResponse<T> {
	success: boolean
	message?: string
	data?: T
	errors?: string[] | ApiValidationErrors
}
export interface ValidationError {
	code: string
	params: any[]
}

export type ApiValidationErrors = {
	[field: string]: ValidationError[]
}

export interface ColumnDef {
	field: string
	header: string
	body?: (rowData: any) => any
	attrs?: any
}

export interface Option {
	id: string | number
	name: string
}

export type OptionWithRelation<K extends string = string> = Option & Partial<Record<K, Option[]>>

export interface TeamTreeResponse {
	id: number
	name: string
	level: number
	children: TeamTreeResponse[]
	user_count: number
}

export interface Position {
	id: number
	name: string
	parent_id: number | null
	parent_name: string | null
	levels: LevelResponse[]
	level_code: LevelCodeResponse[]
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

export interface Province {
	id: number
	name: string
}

export interface CommuneWard {
	id: number
	name: string
}
