<template>
	<div class="_SupportRequestForm">
		<div class="popup__header popup__header--l">
			<div class="title-l">{{ requestParams.theme }}</div>
		</div>
		<div class="cells --gap">
			<div class="cell w-2/12 m:hidden"></div>
			<div class="cell w-8/12 m:w-12/12">
				<div class="fieldset fieldset--s">
					<FormInputFloat label="Имя" v-model="formData.name" :errors="formError.fields.name"/>
				</div>
				<div class="fieldset fieldset--s">
					<FormInputFloat label="E-mail" v-model="formData.email" :errors="formError.fields.email"/>
				</div>
				<div class="fieldset fieldset--s">
					<FormFieldMask
						is-active
						:mask-options="{mask: '+7(000)000-00-00', lazy: false}"
						label="Телефон"
						v-model="formData.phone" :errors="formError.fields.phone"/>
				</div>
				<div class="fieldset fieldset--s" v-if="requestParams.theme_id === 1">
					<div class="fieldset__header">
						<div class="title-m">Ссылка на локацию с ошибкой</div>
						<span class="fz-16">Скопируйте ID из карточки локации и вставьте ниже.</span>
					</div>
					<FormInputFloat
						label="ID локации"
						v-model="formData.location_id"
						:errors="formError.fields.location_id"/>
				</div>
				<div class="fieldset fieldset--s">
					<FormTextarea
						float
						cut
						:cut-length="1000"
						:label="messageLabel"
						v-model="formData.message"
						:errors="formError.fields.message"/>
				</div>
			</div>
			<div class="cell w-2/12 m:hidden"></div>
		</div>
		<div class="mt-24 s-mt-auto">
			<div class="popup__footer text-center">
				<v-btn :loading="loading" @click="onSave">Отправить</v-btn>
			</div>
		</div>
	</div>
</template>

<script>

import FormInputFloat from "~/components/form/FormInputFloat";
import FormFieldMask from "~/components/form/FormFieldMask";
import VBtn from "~/components/_uikit/VBtn";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";
import FormTextarea from "~/components/form/FormTextarea";

export default {
	name: "SupportRequestForm",
	mixins: [_baseFormComponent],
	props: {
		requestParams: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {FormTextarea, VBtn, FormFieldMask, FormInputFloat},
	data() {
		return {
			formUrl: 'support',
			formFunc: 'create',
			formParams: this.requestParams,
			formData: {
				name: this.$auth.user ? this.$auth.user.name : '',
				email: this.$auth.user ? this.$auth.user.email : '',
				phone: this.$auth.user ? this.$auth.user.phone : '',
				location_id: '',
				message: '',
			},
			errors: {
				location_id: this.requestParams.theme_id === 1 ? 'Обязательное поле' : void (0),
				message: 'Обязательное поле',
				name: 'Укажите имя',
				email: 'Укажите почту',
				phone: 'Укажите телефон',
			},
			validateErrors: {
				email: 'Неверный формат e-mail',
			},
			globalError: 'Заполните все поля',
		}
	},
	computed: {
		messageLabel() {
			return this.requestParams.theme_id === 1 ? 'Описание ошибки' : 'Сообщение';
		}
	},
	methods: {
		async onSave() {
			this.$resetFormErrors({
				formError: this.formError,
			});
			const isValidEmail = this.checkEmail();
			this.checkEmptyFields();
			if (!this.isErrors && isValidEmail) {
				const res = await this.$loadModal('ConfirmModal', {
					isSmall: true,
					isBottom: true,
					title: 'Отправить обращение?',
					subTitle: 'Ваше обращение будет отправлено менеджеру Кинодома. ' +
						'Мы свяжемся с Вами в ближайшее время указанным Вами способом.',
					btnText: 'Отправить',
				});

				if (res) {
					await this.sendForm();
				}
			} else {
				this.$snotify.error(this.globalError);
			}
		},
		async sendForm() {
			const newFormData = this.generateFormData();
			await this.submitForm(newFormData).then((data) => {
				if (data.message) {
					this.$snotify.success(data.message);
				} else {
					this.$snotify.success('Отправлено');
				}
				this.$emit('success');
			}).catch((res) => {
				if (res.data.errors && res.data.errors['info.location_id']) {
					this.formError.fields.location_id = ['Введите корректный id'];
				}
			});
		},
		checkEmptyFields() {
			const fields = Object.keys(this.errors);

			fields.forEach((field) => {
				if (this.errors[field]) {
					if (Array.isArray(this.formData[field]) && !this.formData[field].length) {
						this.formError.fields[field].push(this.errors[field]);
					} else if (!this.formData[field]) {
						this.formError.fields[field].push(this.errors[field]);
					}
				}
			});
		},
		checkEmail() {
			const isValid = this.$validateEmail(this.formData.email);
			if (this.formData.email && !isValid) {
				this.formError.fields.email.push(this.validateErrors.email);
			}
			return isValid;
		},
		generateFormData() {
			const formData = new FormData();

			formData.append('name', this.formData.name);
			formData.append('email', this.formData.email);
			formData.append('phone', this.formData.phone);
			formData.append('info[message]', this.formData.message);

			if (this.requestParams.theme_id === 1) {
				formData.append('info[location_id]', String(this.formData.location_id));
			}

			return formData;
		},
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


