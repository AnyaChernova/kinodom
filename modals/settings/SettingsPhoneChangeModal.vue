<template>
	<div class="_SettingsPhoneChangeModal popup">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-10/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header">
						<div class="title">Введите новый номер телефона</div>
					</div>
					<div class="popup__content">
						<FormFieldMask is-active label="Телефон" :mask-options="{mask: '+7(000)000-00-00', lazy: false}"
													 v-model="formData.phone" :errors="formError.fields.phone"/>
					</div>
					<div class="popup__footer text-center">
						<v-btn :disabled="!formData.phone" :loading="loading" @click="onSave">Изменить</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormFieldMask from "~/components/form/FormFieldMask";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";

export default {
	name: "SettingsPhoneChangeModal",
	mixins: [_baseFormComponent],
	props: {},
	components: {FormFieldMask, VBtn},
	data() {
		return {
			formUrl: 'profile',
			formFunc: 'updatePhone',
			formData: {
				phone: ''
			}
		}
	},
	methods: {
		async onSave() {
			await this.submitForm().then(() => {
				this.$snotify.success('Сохранено');
				this.$auth.fetchUser();
				this.$close(true);
			}).catch(({data}) => {
				if (!data.status && data.message) {
					this.$snotify.error(data.message);
				}
			})
		},
	},
	computed: {},
	mounted() {
	}
}
</script>
