<template>
	<div class="_SupportRentForm">
		<div class="popup__header popup__header--l">
			<div class="title-l">{{ formParams.theme }}</div>
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
				<div class="fieldset fieldset--s" v-if="type === 'location'">
					<div class="fieldset__header">
						<div class="title-m">Ссылка на локацию</div>
						<span v-if="!locationID" class="fz-16">Скопируйте ID из карточки локации.</span>
					</div>
					<FormInputFloat
						class="--writeOnly"
						:disabled="!!locationID"
						:clearable="!locationID"
						label="ID локации"
						v-model="formData.id"
						:errors="formError.fields.id"/>
				</div>
				<div class="fieldset fieldset--s" v-if="type === 'transport'">
					<div class="fieldset__header">
						<div class="title-m">Ссылка на транспорт</div>
						<span v-if="!transportID" class="fz-16">Скопируйте ID из карточки транспорта.</span>
					</div>
					<FormInputFloat
						class="--writeOnly"
						:disabled="!!transportID"
						:clearable="!transportID"
						label="ID транспорта"
						v-model="formData.id"
						:errors="formError.fields.id"/>
				</div>
				<div class="fieldset fieldset--s">
					<div class="fieldset__header">
						<div class="title-m">Предполагаемые даты аренды</div>
					</div>
					<div class="cells --gap-form">
						<div class="cell w-6/12 s:w-12/12">
							<FormDatepicker
								class="--date"
								:options="{min: minDate}"
								format="t"
								v-model="formData.startDate"
								:errors="formError.fields.startDate">
								<template #beforeInner>
									<span>С</span>
								</template>
								<template #afterInner>
									<v-svg name="arrow-down" w="16" h="16"/>
								</template>
							</FormDatepicker>
						</div>
						<div class="cell w-6/12 s:w-12/12">
							<FormDatepicker
								class="--date --after"
								:options="{min: minDate}"
								format="t"
								v-model="formData.endDate"
								:errors="formError.fields.endDate">
								<template #beforeInner>
									<span>До</span>
								</template>
								<template #afterInner>
									<v-svg name="arrow-down" w="16" h="16"/>
								</template>
							</FormDatepicker>
						</div>
					</div>
				</div>
				<div class="fieldset fieldset--s" v-if="type === 'location'">
					<div class="fieldset__header">
						<div class="title-m">Количество участников съемочной группы</div>
					</div>
					<FormFieldMask label="Количество" v-model="formData.teamCount"/>
				</div>
				<div class="fieldset fieldset--s">
					<div class="fieldset__header">
						<div class="title-m">Дополнения и уточнения</div>
					</div>
					<FormTextarea float label="Комментарий" v-model="formData.message" :errors="formError.fields.message"/>
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
import FormDatepicker from "~/components/form/FormDatepicker";
import FormFieldMask from "~/components/form/FormFieldMask";
import VBtn from "~/components/_uikit/VBtn";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";
import FormTextarea from "~/components/form/FormTextarea";

export default {
	name: "SupportRentForm",
	mixins: [_baseFormComponent],
	props: {
		locationID: {
			type: Number,
			default: 0
		},
		transportID: {
			type: Number,
			default: 0
		},
		theme: {
			type: Object,
			default: () => {
				return {
					theme_id: 6,
					theme: 'Запрос на аренду'
				}
			}
		},
		type: {
			type: String,
			default: 'location'
		},
	},
	components: {FormTextarea, VBtn, FormFieldMask, FormDatepicker, FormInputFloat},
	data() {
		return {
			formUrl: 'support',
			formFunc: 'create',
			formParams: this.theme,
			minDate: this.$dateFns.getUnixTime(new Date()),
			formData: {
				id: this.locationID || this.transportID || '',
				name: this.$auth.user ? this.$auth.user.name : '',
				email: this.$auth.user ? this.$auth.user.email : '',
				phone: this.$auth.user ? this.$auth.user.phone : '',
				startDate: '',
				endDate: '',
				teamCount: '',
				message: '',
			},
			errors: {
				id: 'Обязательное поле',
				startDate: 'Обязательное поле',
				endDate: 'Обязательное поле',
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
	computed: {},
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
					this.formError.fields.id = ['Введите корректный id'];
				}
				if (res.data.errors && res.data.errors['info.transport_id']) {
					this.formError.fields.id = ['Введите корректный id'];
				}
			});
		},
		checkEmptyFields() {
			const fields = Object.keys(this.errors);

			fields.forEach((field) => {
				if (Array.isArray(this.formData[field]) && !this.formData[field].length) {
					this.formError.fields[field].push(this.errors[field]);
				} else if (!this.formData[field]) {
					this.formError.fields[field].push(this.errors[field]);
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
			formData.append('info[start_at]', this.$dateFns.formatDate(this.formData.startDate * 1000));
			formData.append('info[finished_at]', this.$dateFns.formatDate(this.formData.endDate * 1000));
			formData.append('info[message]', this.formData.message);
			if (this.type === 'location') {
				formData.append('info[location_id]', String(this.formData.id));
				if (this.theme.theme_id === 6) {
					formData.append('info[team_count]', this.formData.teamCount);
				} else {
					formData.append('info[participants_count]', this.formData.teamCount);
				}
			}
			if (this.type === 'transport') {
				formData.append('info[transport_id]', String(this.formData.id));
			}

			return formData;
		},
	},
	directives: {},
	filters: {},
	watch: {
		'formData.startDate'(val) {
			if (val && this.formData.endDate && this.formData.endDate < this.formData.startDate) {
				this.formData.endDate = val;
			}
		},
		'formData.endDate'(val) {
			if (val && this.formData.startDate && this.formData.endDate < this.formData.startDate) {
				this.formData.startDate = val;
			}
		},
	},
	mounted() {
	}
}
</script>


