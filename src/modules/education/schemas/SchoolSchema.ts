import { z } from 'zod'

export const schoolSchema = (t: (key: string, options?: object) => string) =>
	z
		.object({
			name_vn: z.string().nullable().optional(),
			name_en: z
				.string()
				.max(100, t('validates.max', { name: t('message.education.school.name_en'), max: 100 }))
				.nullable()
				.optional(),
			short_name: z
				.string()
				.max(10, t('validates.max', { name: t('message.education.school.short_name'), max: 10 }))
				.nullable()
				.optional(),
		})
		.refine(
			(data) => {
				const isVnEmpty = !data.name_vn || data.name_vn.trim() === ''
				const isEnEmpty = !data.name_en || data.name_en.trim() === ''

				return !isVnEmpty || !isEnEmpty
			},
			{
				message: t('validates.atLeastOne', {
					names: `${t('message.education.school.name_vn')}, ${t('message.education.school.name_en')}`,
				}),
				path: ['name_en'],
			},
		)

export type SchoolFormData = z.infer<ReturnType<typeof schoolSchema>>
