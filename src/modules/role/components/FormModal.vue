<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormFields } from '@/core'
import { useAsyncConfirm } from '@/core'

import { useRoleForm } from '../composables/useRoleForm'
import { RoleService } from '../services/role.service'
import { useRoleStore } from '../store/role.store'

const roleStore = useRoleStore()
const { showModalCreateRole, showModalEditRole, roleActive, loaddingRole } = storeToRefs(roleStore)

const { t } = useI18n()
const { fail } = useAsyncConfirm()
const { onSubmit, formSchema, setForm, resetForm } = useRoleForm()

watch(
	showModalEditRole,
	async (val) => {
		if (val && roleActive.value) {
			loaddingRole.value = true
			const { success, data, errors } = await RoleService.fetchRoleDetail(roleActive.value.id)
			await roleStore.fetchAllScreens()
			if (success) {
				if (data) setForm(data)
				loaddingRole.value = false
			} else {
				await fail(t(`codes.${errors?.[0] || 'DEFAULT'}`))
				loaddingRole.value = false
				showModalEditRole.value = false
			}
		}
	},
	{ immediate: true },
)

watch(
	showModalCreateRole,
	async (val) => {
		if (val) {
			await roleStore.fetchAllScreens()
			resetForm()
		}
	},
	{ immediate: true },
)

const visible = computed(() => {
	return showModalCreateRole.value || showModalEditRole.value
})

const handleHideModal = () => {
	showModalCreateRole.value = false
	showModalEditRole.value = false
}
</script>
<template>
	<Dialog
		:header="showModalCreateRole ? t('message.role.add') : t('message.role.edit')"
		:visible="visible"
		:modal="true"
		class="w-[calc(100%-2rem)] md:w-[50rem]"
		scrollable
		:closeButtonProps="{ onClick: handleHideModal, variant: 'text', rounded: true }"
	>
		<FormFields :form-schema="formSchema" @submit="onSubmit" id="role-form"></FormFields>
		<template #footer>
			<Button label="Cancel" icon="pi pi-times" severity="secondary" @click="handleHideModal" />
			<Button label="Save" icon="pi pi-check" type="submit" form="role-form" />
		</template>
	</Dialog>
</template>
