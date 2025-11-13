import { z } from 'zod'

export const degreeCertificateSchema = (t: (key: string, options?: object) => string) =>
	z
		.object({
			name_vn: z.string().nullable().optional(),
			name_en: z
				.string()
				.max(100, t('validates.max', { name: t('message.education.degreeCertificate.name_en'), max: 100 }))
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
					names: `${t('message.education.degreeCertificate.name_vn')}, ${t('message.education.degreeCertificate.name_en')}`,
				}),
				path: ['name_en'],
			},
		)

export type DegreeCertificateFormData = z.infer<ReturnType<typeof degreeCertificateSchema>>
