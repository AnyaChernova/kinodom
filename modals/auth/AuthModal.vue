<template>
	<form class="_AuthModal popup" @submit.prevent="onSubmit">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-5/12 m:w-12/12 m:hidden">
				<div class="popup__header">
					<div class="title">Авторизация</div>
				</div>
				<div class="popup__content pt-10">
					<FormInputFloat label="E-mail" v-model="authData.email" :errors="authError.fields.email"/>
					<FormFieldPassword label="Пароль" v-model="authData.password" :errors="authError.fields.password"/>
					<div class="pt-10">
						<button class="link fz-18 mt-20" type="button" @click="onPasswordRecoveryClick">Забыли пароль?</button>
						<div class="mt-10">
							Нет аккаунта? <button class="link fz-18" type="button" @click="onRegisterClick">Зарегистрируйтесь</button>
						</div>
					</div>
				</div>
			</div>
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-4/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header popup__header--mobS from-m:hidden">
						<div class="title">Авторизация</div>
					</div>
					<div class="popup__header m:hidden"></div>
					<div class="popup__header m:hidden"></div>
					<div class="popup__header m:hidden"></div>
					<div class="popup__header -mt-5 m:hidden">
						Вы можете авторизоваться через вашу любимую соцcеть
					</div>
					<div class="popup__content">
						<div class="popup__header from-m:hidden">
							<FormInputFloat label="E-mail" v-model="authData.email" :errors="authError.fields.email"/>
							<FormFieldPassword label="Пароль" v-model="authData.password" :errors="authError.fields.password"/>
						</div>
						<AuthSocial/>
						<div class="pt-4 from-m:hidden">
							<button class="link fz-18 mt-20" type="button" @click="onPasswordRecoveryClick">Забыли пароль?</button>
							<div class="mt-10">
								Нет аккаунта? <button class="link fz-18" type="button" @click="onRegisterClick">Зарегистрируйтесь</button>
							</div>
						</div>
					</div>
					<div class="popup__footer text-center">
						<v-btn type="submit" :loading="loading" :disabled="!authData.email || !authData.password">Вход</v-btn>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import FormFieldPassword from "~/components/form/FormFieldPassword";
import AuthSocial from "~/components/auth/AuthSocial";

export default {
	name: "AuthModal",
	props: {},
	components: {AuthSocial, FormFieldPassword, FormInputFloat, VBtn},
	data() {
		return {
			loading: false,
			authData: {
				email: '',
				password: ''
			},
			authError: {
				fields: {
					email: [],
					password: [],
				}
			},
			errorMessage: {
				email: 'Неверный формат e-mail',
				password: 'Неверный логин или пароль',
			}
		}
	},
	methods: {
		onRegisterClick() {
			this.$close(true);
			this.$loadModal('RegisterModal');
		},
		onPasswordRecoveryClick() {
			this.$close(true);
			this.$loadModal('password/PasswordRecoveryModal');
		},
		async onSubmit() {
			this.resetErrors();
			if (this.checkEmail()) {
				await this.login();
			}
		},
		async login() {
			this.loading = true;
			await this.$auth.loginWith('localAuth', {
				data: {
					...this.authData,
				}
			}).then(({data}) => {
				if (!data.status) {
					this.authError.fields.email.push(this.errorMessage.password);
					this.authError.fields.password.push(this.errorMessage.password);
				} else {
					this.$close(true);
				}
			}).catch(() => {
				this.authError.fields.email.push(this.errorMessage.password);
				this.authError.fields.password.push(this.errorMessage.password);
			});
			this.loading = false;
		},
		resetErrors() {
			this.$resetFormErrors({
				formError: this.authError,
			});
		},
		checkEmail() {
			const isValid = this.$validateEmail(this.authData.email);
			if (!isValid) {
				this.authError.fields.email.push(this.errorMessage.email);
			}
			return isValid;
		}
	},
	computed: {},
	watch: {
		authData: {
			handler(){
				if (this.authError.fields.email.length || this.authError.fields.password.length) {
					this.resetErrors();
				}
			},
			deep: true
		}
	},
	mounted() {
	}
}
</script>
