export const FilterMatchMode = {
	BETWEEN: 'between',
	CONTAINS: 'contains',
	EQUALS: 'equals',
	STARTS_WITH: 'startsWith',
	ENDS_WITH: 'endsWith',
	DATE_IS: 'dateIs',
	DATE_BEFORE: 'dateBefore',
	DATE_AFTER: 'dateAfter',
}

export const FilterOperator = {
	AND: 'and',
	OR: 'or',
}

export const apiRequestTimeOut: number = 30000
export const localeOptions = [{ id: 'en' }, { id: 'vi' }, { id: 'ja' }]
export const mapLocaleToFlag = { en: 'gb', vi: 'vn', ja: 'jp' }

export const apiUrl = {
	login: '/auth/login',
	logout: '/auth/logout',
	team: {
		getTeams: '/teams',
		getTeamTree: '/teams/tree-parent',
		getAllUser: '/teams/users',
		createTeam: '/teams',
		getTeam: (id: number) => `/teams/${id}`,
		updateTeam: (id: number) => `/teams/${id}`,
		deleteTeam: (id: number) => `/teams/${id}`,
	},
	permission: {
		getPermissions: '/permissions',
		getPermission: (id: number) => `/permissions/${id}`,
		createPermission: '/permissions',
		updatePermission: (id: number) => `/permissions/${id}`,
		deletePermission: (id: number) => `/permissions/${id}`,
	},
}

export const PAGE_SIZE_DEFAULT = 10

export const PAGE_SIZE_OPTIONS = [10, 20, 50]

export const DEFAULT_AVATAR = '/images/avatar-default.svg'

export const DEFAULT_TOAST_LIFE_TIME = 3000
