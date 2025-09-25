<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

const { t } = useI18n()

const schema = z.object({
	email: z
		.string()
		.min(1, 'Bắt buộc nhập email')
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email không hợp lệ' }),
})

const { handleSubmit, defineField, errors } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		email: '',
	},
})

const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit(async (values) => {
	//
})
</script>

<template>
	<div class="text-center mb-8">
		<div class="text-surface-900 dark:text-surface-0 text-xl text-md-2xl font-medium mb-4">
			{{ t('message.auth.forgotPassword') }}!
		</div>
	</div>

	<v-form class="mx-auto" style="max-width: 400px" @submit.prevent="onSubmit">
		<v-text-field v-model="email" label="Email" :error-messages="errors.email" v-bind="emailAttrs"></v-text-field>
		<v-btn type="submit" color="primary" class="mt-4" block>{{ t('message.auth.sendResetLink') }}</v-btn>
	</v-form>
</template>

<style scoped>
.pi-eye {
	transform: scale(1.6);
	margin-right: 1rem;
}

.pi-eye-slash {
	transform: scale(1.6);
	margin-right: 1rem;
}
</style>
