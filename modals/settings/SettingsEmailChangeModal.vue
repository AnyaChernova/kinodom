<template>
	<div class="_SettingsEmailChangeModal popup">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-10/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header">
						<div class="title">Введите новый e-mail</div>
					</div>
					<div class="popup__content">
						<FormInputFloat label="E-mail" v-model="formData.email" :errors="formError.fields.email"/>
					</div>
					<div class="popup__footer text-center">
						<v-btn :disabled="!formData.email" :loading="loading" @click="onSave">Изменить</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import VBtn from "@/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";

export default {
	name: "SettingsEmailChangeModal",
	mixins: [_baseFormComponent],
	props: {},
	components: {FormInputFloat, VBtn},
	data() {
		return {
			formUrl: 'profile',
			formFunc: 'updateEmail',
			formData: {
				email: ''
			},
			errorMessage: {
				email: 'E-mail совпадают',
				emailInvalid: 'Неверный формат e-mail',
			}
		}
	},
	methods: {
		async onSave() {
			const validEmail = this.checkEmail();
			if (validEmail) {
				await this.submitForm().then(async() => {
					await this.$auth.fetchUser();
					this.$close(true);
					this.$loadModal('settings/SettingsEmailReadyModal');
				}).catch(({data}) => {
					if (!data.status && data.message) {
						this.formError.fields.email.push(data.message);
					}
				})
			}
		},
		checkEmail() {
			const isValid = this.$validateEmail(this.formData.email);
			const isInUse = this.formData.email === this.$auth.user.email;
			if (!isValid) {
				this.formError.fields.email.push(this.errorMessage.emailInvalid);
			}
			if (isInUse) {
				this.formError.fields.email.push(this.errorMessage.email);
			}
			return isValid && !isInUse;
		}
	},
	computed: {},
	mounted() {
	}
}
</script>
