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
export const localeOptions = [{ id: 'en' }, { id: 'vi' }, { id: 'ja' }, { id: 'cn' }]
export const mapLocaleToFlag = { en: 'us', vi: 'vn', ja: 'jp', cn: 'cn' }

export const apiUrl = {
	login: '/auth/login',
	logout: '/auth/logout',
	team: {
		getTeams: '/team',
		getTeamTree: '/team/tree-parent',
		getAllUser: '/team/users',
		createTeam: '/team',
		getTeam: (id: number) => `/team/${id}`,
		updateTeam: (id: number) => `/team/${id}`,
		deleteTeam: (id: number) => `/team/${id}`,
	},
	permission: {
		getPermissions: '/permission',
		getPermission: (id: number) => `/permission/${id}`,
		createPermission: '/permission',
		updatePermission: (id: number) => `/permission/${id}`,
		deletePermission: (id: number) => `/permission/${id}`,
	},
}

export const PAGE_SIZE_DEFAULT = 10

export const PAGE_SIZE_OPTIONS = [10, 20, 50]

export const DEFAULT_AVATAR = '/images/avatar-default.svg'

export const DEFAULT_TOAST_LIFE_TIME = 3000
