<template>
	<div class="_RegisterStepThree cells --gap --line flex-grow items-stretch">
		<div class="cell w-1/12 m:hidden"></div>
		<div class="cell w-5/12 m:w-12/12">
			<div class="popup__header popup__header--mobXS">
				<div class="title-m">Введите e-mail и&nbsp;придумайте пароль</div>
			</div>
			<div class="popup__content">
				<FormInputFloat label="E-mail" v-model="email" :errors="formError.fields.email"/>
				<FormFieldPassword autocomplete="new-password" label="Пароль" v-model="password" :errors="formError.fields.password"/>
				<FormFieldPassword label="Повторите пароль" v-model="passwordConfirm" :errors="formError.fields.passwordConfirm"/>
			</div>
		</div>
		<div class="cell w-1/12 m:hidden"></div>
		<div class="cell w-4/12 m:w-12/12 from-m:h-full">
			<div class="popup__inner">
				<div class="popup__header mt-10 m:hidden">
					Вы можете авторизоваться через вашу любимую соцcеть
				</div>
				<div class="popup__content">
					<AuthSocial/>
				</div>
				<div class="popup__footer text-center">
					<v-btn :loading="loading" :disabled="nextDisabled" @click="onNextClick">Далее</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import FormFieldPassword from "~/components/form/FormFieldPassword";
import AuthSocial from "~/components/auth/AuthSocial";

export default {
	name: "RegisterStepThree",
	props: {
		role: {
			type: [String, Number],
			default: ''
		},
		professionID: {
			type: [String, Number],
			default: ''
		},
	},
	components: {AuthSocial, FormFieldPassword, FormInputFloat, VBtn},
	data() {
		return {
			loading: false,
			email: '',
			password: '',
			passwordConfirm: '',
			formError: {
				fields: {
					email: [],
					password: [],
					passwordConfirm: [],
				}
			},
			errorMessage: {
				email: 'Такой e-mail уже занят',
				emailInvalid: 'Неверный формат e-mail',
				password: 'Пароли не совпадают',
			}
		}
	},
	computed: {
		nextDisabled() {
			return !this.email || !this.password || !this.passwordConfirm;
		},
	},
	methods: {
		async register() {
			this.loading = true;
			await this.$auth.loginWith('registerAuth', {
				data: {
					role: this.role,
					profession_id: this.professionID || void (0),
					email: this.email,
					password: this.password,
					password_confirmation: this.passwordConfirm,
				}
			}).then((res) => {
				this.$emit('next');
			}).catch(() => {
				this.formError.fields.email.push(this.errorMessage.email);
			});
			this.loading = false;
		},
		async onNextClick() {
			this.resetErrors();
			const validEmail = this.checkEmail();
			const validPassword = this.checkPassword();
			if (validEmail && validPassword) {
				await this.register();
			}
		},
		onDataChanged() {
			if (this.formError.fields.email.length || this.formError.fields.password.length ||  this.formError.fields.passwordConfirm.length) {
				this.resetErrors();
			}
		},
		resetErrors() {
			this.$resetFormErrors({
				formError: this.formError,
			});
		},
		checkEmail() {
			const isValid = this.$validateEmail(this.email);
			if (!isValid) {
				this.formError.fields.email.push(this.errorMessage.emailInvalid);
			}
			return isValid;
		},
		checkPassword() {
			const isValid = this.password === this.passwordConfirm;
			if (!isValid) {
				this.formError.fields.passwordConfirm.push(this.errorMessage.password);
			}
			return isValid;
		}
	},
	watch: {
		email() {
			this.onDataChanged();
		},
		password() {
			this.onDataChanged();
		},
		passwordConfirm() {
			this.onDataChanged();
		},
	},
	mounted() {
	}
}
</script>
