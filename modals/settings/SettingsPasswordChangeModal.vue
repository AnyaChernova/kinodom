<template>
	<div class="_SettingsPasswordChangeModal popup">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-10/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header">
						<div class="title">Введите новый пароль</div>
					</div>
					<div class="popup__content">
						<FormFieldPassword label="Пароль" v-model="formData.password" :errors="formError.fields.password"/>
						<FormFieldPassword label="Пароль еще раз" v-model="formData.password_confirmation" :errors="formError.fields.password_confirmation"/>
					</div>
					<div class="popup__footer text-center">
						<v-btn :disabled="disabledBtn" :loading="loading" @click="onSave">Изменить</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import VBtn from "@/components/_uikit/VBtn";
import FormFieldPassword from "~/components/form/FormFieldPassword";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";

export default {
	name: "SettingsPasswordChangeModal",
	mixins: [_baseFormComponent],
	props: {},
	components: {FormFieldPassword, VBtn},
	data() {
		return {
			formUrl: 'profile',
			formFunc: 'updatePassword',
			formData: {
				password: '',
				password_confirmation: '',
			},
			errorMessage: {
				password: 'Пароли не совпадают',
			}
		}
	},
	computed: {
		disabledBtn() {
			return !this.formData.password || !this.formData.password_confirmation;
		}
	},
	methods: {
		async onSave() {
			const validPassword = this.checkPassword();
			if (validPassword) {
				await this.submitForm().then(() => {
					this.$close(true);
					this.$loadModal('settings/SettingsPasswordReadyModal');
					this.$auth.fetchUser();
				}).catch(({data}) => {
					if (!data.status && data.message) {
						this.formError.fields.password.push(data.message);
					}
				})
			}
		},
		checkPassword() {
			const isValid = this.formData.password === this.formData.password_confirmation;
			if (!isValid) {
				this.formError.fields.password.push(this.errorMessage.password);
				this.formError.fields.password_confirmation.push(this.errorMessage.password);
			}
			return isValid;
		}
	},
	mounted() {
	}
}
</script>
