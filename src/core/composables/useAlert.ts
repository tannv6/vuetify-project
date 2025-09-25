import { createApp, h, ref } from 'vue'
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VSpacer } from 'vuetify/components'
import vuetify from '@/plugins/vuetify'
export function showConfirm(message: string): Promise<boolean> {
	return new Promise((resolve) => {
		const dialog = ref(true)

		const app = createApp({
			setup() {
				const close = (result: boolean) => {
					dialog.value = false
					resolve(result)
					setTimeout(() => {
						app.unmount()
						container.remove()
					}, 200)
				}

				return () =>
					h(
						VDialog,
						{
							modelValue: dialog.value,
							'onUpdate:modelValue': (val: boolean) => (dialog.value = val),
							maxWidth: 400,
						},
						{
							default: () =>
								h(VCard, {}, [
									h(VCardTitle, { class: 'text-h6' }, 'Xác nhận'),
									h(VCardText, {}, message),
									h(VCardActions, {}, [
										h(VSpacer),
										h(VBtn, { text: true, color: 'grey', onClick: () => close(false) }, 'Hủy'),
										h(VBtn, { text: true, color: 'red', onClick: () => close(true) }, 'Đồng ý'),
									]),
								]),
						},
					)
			},
		})

		const container = document.createElement('div')
		document.body.appendChild(container)
		app.use(vuetify(false, 'en')).mount(container)
	})
}
