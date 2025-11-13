import { z } from 'zod'

export const communeWardSchema = (t: (key: string, options?: object) => string) =>
	z.object({
		province_id: z
			.number({ error: t('validates.required', { name: t('message.province.id') }) })
			.min(1, t('validates.required', { name: t('message.province.name') })),
		name: z
			.string()
			.min(1, t('validates.required', { name: t('message.communeWard.name') }))
			.max(100, t('validates.max', { name: t('message.communeWard.name'), max: 100 })),
	})

export type CommuneWardFormData = z.infer<ReturnType<typeof communeWardSchema>>
