<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { AuthService } from '../services/auth.service'
import { useAuthStore } from '../store/auth.store'
import { showConfirm } from '@/core/composables/useAlert'
import { isEmail, required } from '@/core/utils/validationRules'

const loading = ref(false)

const auth = useAuthStore()

const { returnUrl } = storeToRefs(auth)

const router = useRouter()

const emailRules = [required(), isEmail()]
const passwordRules = [required()]

const valid = ref(false)

const email = ref('')
const password = ref('')

const onSubmit = async () => {
	loading.value = true
	const loginResult = await AuthService.login(email.value, password.value)

	if (loginResult.success) {
		if (returnUrl.value) {
			router.replace(returnUrl.value as string)
		} else {
			router.replace('/')
		}
	} else {
		showConfirm('Bạn có chắc muốn xóa user này không?')
	}

	loading.value = false
}
const showPass = ref(false)
</script>
<template>
	<v-form v-model="valid" class="mx-auto" style="max-width: 400px" @submit.prevent="onSubmit">
		<v-text-field v-model="email" label="Email" :rules="emailRules" bg-color="light-blue-lighten-5"></v-text-field>
		<v-text-field
			v-model="password"
			label="Password"
			:rules="passwordRules"
			:type="showPass ? 'text' : 'password'"
			bg-color="light-blue-lighten-5"
			:append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
			@click:append-inner="showPass = !showPass"
		></v-text-field>
		<v-btn block color="primary" @click="onSubmit" type="submit" :disabled="!valid" :loading="loading">Login</v-btn>
	</v-form>
</template>
<style>
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
	background-color: transparent !important;
	-webkit-box-shadow: 0 0 0px 1000px #00000000 inset !important;
	transition: background-color 9999s ease-in-out 0s;
}
</style>
