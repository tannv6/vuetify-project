import { z } from 'zod'

export const provinceSchema = (t: (key: string) => string) =>
	z.object({
		name: z
			.string()
			.min(1, t('validates.required', { name: t('message.province.name') }))
			.max(100, t('validates.max', { name: t('message.province.name'), max: 100 })),
	})

export type ProvinceFormData = z.infer<ReturnType<typeof provinceSchema>>
