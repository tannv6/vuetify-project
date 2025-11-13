<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormFields } from '@/core'
import { useAsyncConfirm } from '@/core'

import { usePermissionForm } from '../composables/usePermissionForm'
import { PermissionService } from '../services/permission.service'
import { usePermissionStore } from '../store/permission.store'

const permissionStore = usePermissionStore()
const { showModalCreatePermission, showModalEditPermission, permissionActive, loaddingPermission } =
	storeToRefs(permissionStore)

const { t } = useI18n()
const { fail } = useAsyncConfirm()
const { onSubmit, formSchema, setForm, resetForm } = usePermissionForm()

watch(
	showModalEditPermission,
	async (val) => {
		if (val && permissionActive.value) {
			loaddingPermission.value = true
			const { success, data, errors } = await PermissionService.fetchPermissionDetail(permissionActive.value.id)
			if (success) {
				if (data) setForm(data)
				loaddingPermission.value = false
			} else {
				await fail(t(`codes.${errors?.[0] || 'DEFAULT'}`))
				loaddingPermission.value = false
				showModalEditPermission.value = false
			}
		}
	},
	{ immediate: true },
)

watch(
	showModalCreatePermission,
	(val) => {
		if (val) {
			resetForm()
		}
	},
	{ immediate: true },
)

const visible = computed(() => {
	return showModalCreatePermission.value || showModalEditPermission.value
})

const handleHideModal = () => {
	showModalCreatePermission.value = false
	showModalEditPermission.value = false
}
</script>
<template>
	<Dialog
		:header="t('message.permission.add')"
		:visible="visible"
		:modal="true"
		class="w-[calc(100%-2rem)] md:w-[50rem]"
		scrollable
		:closeButtonProps="{ onClick: handleHideModal, variant: 'text', rounded: true }"
	>
		<FormFields :form-schema="formSchema" @submit="onSubmit" id="permission-form"></FormFields>
		<template #footer>
			<Button label="Cancel" icon="pi pi-times" severity="secondary" @click="handleHideModal" />
			<Button label="Save" icon="pi pi-check" type="submit" form="permission-form" />
		</template>
	</Dialog>
</template>
