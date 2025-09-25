<script lang="ts" setup>
import { ref } from 'vue'
import { required, isEmail, minLength, maxLength } from '../utils/validationRules'
import { useI18n } from 'vue-i18n'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const valid = ref(false)

const nameRules = [required(), minLength(2), maxLength(10)]
const emailRules = [required(), isEmail()]
const { t } = useI18n()
const handleSubmit = () => {
	if (!valid.value) return
	alert(`Submitted: ${firstname.value} ${lastname.value} ${email.value}`)
}
</script>
<template>
	<v-form validateOn="input" @submit.prevent="handleSubmit" v-model="valid">
		<v-container>
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field v-model="firstname" :rules="nameRules" :label="t('firstName')"></v-text-field>
				</v-col>

				<v-col cols="12" md="4">
					<v-text-field v-model="lastname" :rules="nameRules" label="Last name"></v-text-field>
				</v-col>

				<v-col cols="12" md="4">
					<v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
				</v-col>
			</v-row>
			<v-btn type="submit" color="primary">Submit</v-btn>
		</v-container>
	</v-form>
</template>
