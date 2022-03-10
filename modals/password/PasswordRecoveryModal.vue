<template>
	<div class="_PasswordRecoveryModal popup">
		<div class="popup__inner">
			<div class="cells --gap --line">
				<div class="cell w-1/12"></div>
				<div class="cell w-11/12 m:w-12/12">
					<div class="popup__header">
						<div class="title">Восстановление пароля</div>
					</div>
				</div>
			</div>
			<div class="cells cells --gap --line flex-grow items-stretch">
				<div class="cell w-1/12 m:hidden"></div>
				<div class="cell w-5/12 m:w-12/12">
					<div class="popup__content" v-if="isReady">
						На адрес <span class="text-mid">{{ formData.email }}</span> отправлено письмо со ссылкой для изменения пароля
					</div>
					<template v-else>
						<div class="popup__header from-m:hidden" v-if="!isReady">
							Введите e-mail, указанный при регистрации
						</div>
						<div class="popup__content pt-10">
							<FormInputFloat label="E-mail" v-model="formData.email" :errors="formError.fields.email"/>
						</div>
					</template>
				</div>
				<div class="cell w-1/12 m:hidden"></div>
				<div class="cell w-4/12 m:w-12/12 from-m:h-full">
					<div class="popup__inner">
						<div class="popup__header m:hidden" v-if="!isReady">
							Введите e-mail, указанный при регистрации
						</div>
						<div class="popup__footer">
							<v-btn v-if="isReady" @click="$close(true)">ОК</v-btn>
							<v-btn :disabled="!formData.email" :loading="loading" @click="onSave" v-else>Восстановить</v-btn>
						</div>
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
	name: "PasswordRecoveryModal",
	mixins: [_baseFormComponent],
	props: {},
	components: {FormInputFloat, VBtn},
	data() {
		return {
			isReady: false,
			formUrl: 'password',
			formFunc: 'reset',
			formData: {
				email: ''
			},
			errorMessage: {
				email: 'Данный e-mail не зарегистрирован',
				emailInvalid: 'Неверный формат e-mail',
			}
		}
	},
	methods: {
		async onSave() {
			const validEmail = this.checkEmail();
			if (validEmail) {
				await this.submitForm().then(() => {
					this.isReady = true;
				}).catch(() => {
					this.formError.fields.email.push(this.errorMessage.email);
				})
			}
		},
		checkEmail() {
			const isValid = this.$validateEmail(this.formData.email);
			if (!isValid) {
				this.formError.fields.email.push(this.errorMessage.emailInvalid);
			}
			return isValid;
		}
	},
	computed: {},
	mounted() {
	}
}
</script>
