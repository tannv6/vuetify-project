<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormFields } from '@/core'
import { useAsyncConfirm } from '@/core'

import { useGroupForm } from '../composables/useGroupForm'
import { GroupService } from '../services/group.service'
import { useGroupStore } from '../store/group.store'

const groupStore = useGroupStore()
const { showModalCreateGroup, showModalEditGroup, groupActive, loaddingGroup } = storeToRefs(groupStore)

const { t } = useI18n()
const { fail } = useAsyncConfirm()
const { onSubmit, formSchema, setForm, resetForm } = useGroupForm()

watch(
	showModalEditGroup,
	async (val) => {
		if (val && groupActive.value) {
			loaddingGroup.value = true
			const { success, data, errors } = await GroupService.fetchGroupDetail(groupActive.value.id)
			await groupStore.fetchAllFields()
			await groupStore.fetchAllPermissions()
			if (success) {
				if (data) setForm(data)
				loaddingGroup.value = false
			} else {
				await fail(t(`codes.${errors?.[0] || 'DEFAULT'}`))
				loaddingGroup.value = false
				showModalEditGroup.value = false
			}
		}
	},
	{ immediate: true },
)

watch(
	showModalCreateGroup,
	async (val) => {
		if (val) {
			groupStore.fetchAllFields()
			groupStore.fetchAllPermissions()
			resetForm()
		}
	},
	{ immediate: true },
)

const visible = computed(() => {
	return showModalCreateGroup.value || showModalEditGroup.value
})

const handleHideModal = () => {
	showModalCreateGroup.value = false
	showModalEditGroup.value = false
}
</script>
<template>
	<Dialog
		:header="showModalCreateGroup ? t('message.group.add') : t('message.group.edit')"
		:visible="visible"
		:modal="true"
		class="w-[calc(100%-2rem)] md:w-[50rem]"
		scrollable
		:closeButtonProps="{ onClick: handleHideModal, variant: 'text', rounded: true }"
	>
		<FormFields :form-schema="formSchema" @submit="onSubmit" id="group-form"></FormFields>
		<template #footer>
			<Button label="Cancel" icon="pi pi-times" severity="secondary" @click="handleHideModal" />
			<Button label="Save" icon="pi pi-check" type="submit" form="group-form" />
		</template>
	</Dialog>
</template>
