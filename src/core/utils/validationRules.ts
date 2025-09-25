export const required =
	(msg = 'Trường này là bắt buộc') =>
	(v: string | null | undefined) =>
		!!v || msg

export const isEmail =
	(msg = 'Email không hợp lệ') =>
	(v: string) =>
		/.+@.+\..+/.test(v) || msg

export const minLength = (length: number, msg?: string) => (v: string) =>
	(v && v.length >= length) || msg || `Tối thiểu ${length} ký tự`

export const maxLength = (length: number, msg?: string) => (v: string) =>
	(v && v.length <= length) || msg || `Tối đa ${length} ký tự`

export const isNumber =
	(msg = 'Chỉ được nhập số') =>
	(v: string) =>
		/^\d+$/.test(v) || msg
