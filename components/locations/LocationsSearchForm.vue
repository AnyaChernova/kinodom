<template>
	<div class="_LocationsSearchForm">
		<div class="fieldset">
			<FormInputFloat label="Имя" v-model="formData.name" :errors="formError.fields.name"/>
		</div>
		<div class="fieldset">
			<FormInputFloat label="E-mail" v-model="formData.email" :errors="formError.fields.email"/>
		</div>
		<div class="fieldset">
			<FormFieldMask
				is-active
				:mask-options="{mask: '+7(000)000-00-00', lazy: false}"
				label="Телефон"
				v-model="formData.phone" :errors="formError.fields.phone"/>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Регион поиска</div>
			</div>
			<div class="btnRow btnRow--xs mt-m">
				<FormCheckbox
					class="--tab"
					v-for="region in regions"
					:key="region.id"
					:value="region.id"
					:inner-label="region.region"
					v-model="formData.regions"/>
			</div>
		</div>
		<div class="fieldset">
			<div class="title-m">Районы</div>
			<div class="fieldset__item">
				<span class="fz-18" v-if="formData.districts.length">
					Выбрано {{ formData.districts.length }}
				</span>
				<span class="text-label fz-18" v-else>По всем районам</span>
			</div>
			<div class="fieldset__item" v-if="formData.regions.length">
				<button class="link link--underline fz-16" @click="onChangeDistrictsType">Выбрать районы</button>
			</div>
			<div class="text-danger fz-12" v-if="formError.fields.regions.length">{{ formError.fields.regions[0] }}</div>
		</div>
		<div class="fieldset">
			<div class="title-m">Тип локации</div>
			<div class="fieldset__item">
				<div class="btnRow btnRow--xs" v-if="selectedTypes.length">
					<v-btn class="--badge"
								 v-for="selectedType in selectedTypes"
								 :key="selectedType.id"
								 @click="onLocationTypeClick(selectedType.id)">
						<span>{{ selectedType.type }}</span>
						<v-svg name="close_b" w="10" h="10" class="ml-8"/>
					</v-btn>
				</div>
				<div class="text-label fz-18" v-else>Любой</div>
			</div>
			<div class="fieldset__item">
				<button class="link link--underline fz-16" @click="onChangeLocationType">Изменить тип</button>
				<div class="text-danger fz-12" v-if="formError.fields.types.length">{{ formError.fields.types[0] }}</div>
			</div>
		</div>
		<div class="fieldset">
			<div class="title-m">Стиль пространства</div>
			<div class="fieldset__item">
				<div class="btnRow btnRow--xs" v-if="selectedStyles.length">
					<v-btn class="--badge"
								 v-for="selectedStyle in selectedStyles"
								 :key="selectedStyle.id"
								 @click="onLocationStyleClick(selectedStyle.id)">
						<span>{{ selectedStyle.style }}</span>
						<v-svg name="close_b" w="10" h="10" class="ml-8"/>
					</v-btn>
				</div>
				<div class="text-label fz-18" v-else>Любой</div>
			</div>
			<div class="fieldset__item">
				<button class="link link--underline fz-16" @click="onChangeLocationStyle">Изменить стиль</button>
				<div class="text-danger fz-12" v-if="formError.fields.styles.length">{{ formError.fields.styles[0] }}</div>
			</div>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Стоимость аренды</div>
			</div>
			<div class="btnRow btnRow--xs mt-m">
				<FormCheckbox
					class="--tab"
					v-for="type in priceTypes"
					:key="type.id"
					:value="type.id"
					:inner-label="type.type"
					v-model="formData.priceType"/>
			</div>
			<FormInputFloat
				class="mt-m"
				label="Максимальная стоимость аренды ₽/сутки"
				v-model="formData.maxPrice"/>
			<div class="text-danger fz-12" v-if="formError.fields.maxPrice.length">{{ formError.fields.maxPrice[0] }}</div>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Срок аренды</div>
			</div>
			<div class="cells --gap-form">
				<div class="cell w-12/12">
					<FormFieldMask label="Срок аренды в днях" v-model="formData.rentDays"/>
					<div class="text-danger fz-12" v-if="formError.fields.rentDays.length">{{
							formError.fields.rentDays[0]
						}}
					</div>
				</div>
				<div class="cell w-6/12 s:w-12/12">
					<FormDatepicker
						class="--date"
						:options="{min: minDate}"
						format="t"
						v-model="formData.startDate">
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
						v-model="formData.endDate">
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
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Количество участников съемочной группы</div>
			</div>
			<FormFieldMask label="Количество, чел." v-model="formData.teamCount"/>
		</div>
<!--		<div class="fieldset">-->
<!--			<div class="fieldset__header">-->
<!--				<div class="title-m">Расстояние до парковки</div>-->
<!--			</div>-->
<!--			<div class="range-slider">-->
<!--				<client-only>-->
<!--					<vue-slider-->
<!--						tooltip="always"-->
<!--						:dot-size="24"-->
<!--						:max="600"-->
<!--						:tooltip-formatter="val => `${val} м`"-->
<!--						v-model="formData.parking"/>-->
<!--				</client-only>-->
<!--			</div>-->
<!--		</div>-->
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Дополнения и уточнения</div>
			</div>
			<FormInputFloat label="Комментарий" cut :cut-length="1000" v-model="formData.message"/>
		</div>
		<div class="fieldset text-center">
			<v-btn :loading="loading" @click="onSave">Отправить</v-btn>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import FormDatepicker from "~/components/form/FormDatepicker";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";
import {mapState} from "vuex";
import FormFieldMask from "~/components/form/FormFieldMask";
import FormCheckbox from "~/components/_uikit/FormCheckbox";

export default {
	name: "LocationsSearchForm",
	mixins: [_baseFormComponent],
	props: {},
	components: {FormCheckbox, FormFieldMask, FormDatepicker, FormInputFloat, VBtn},
	data() {
		return {
			minDate: this.$dateFns.getUnixTime(new Date()),
			formUrl: 'support',
			formFunc: 'create',
			formParams: {
				theme: 'Запрос на поиск локации',
				theme_id: 5
			},
			formData: {
				name: this.$auth.user ? this.$auth.user.name : '',
				email: this.$auth.user ? this.$auth.user.email : '',
				phone: this.$auth.user ? this.$auth.user.phone : '',
				types: [],
				styles: [],
				regions: [],
				districts: [],
				priceType: [],
				maxPrice: '',
				rentDays: '',
				startDate: '',
				endDate: '',
				teamCount: '',
				message: '',
			},
			errors: {
				types: 'Выберите хотя бы один тип локации',
				styles: 'Выберите хотя бы один стиль локации',
				regions: 'Выберите хотя бы один регион',
				price: 'Укажите ценовой диапазон или введите максимальную стоимость аренды',
				days: 'Укажите срок аренды в днях или введите даты аренды',
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
		...mapState({
			regions: 'regions',
			priceTypes: 'priceTypes',
		}),
		...mapState('locations', {
			locationTypes: 'locationTypes',
			locationStyles: 'locationStyles',
		}),
		selectedTypes() {
			return this.locationTypes.filter(({id}) => this.formData.types.includes(id));
		},
		selectedStyles() {
			return this.locationStyles.filter(({id}) => this.formData.styles.includes(id));
		},
		districts() {
			let districts = [];
			const selectedRegions = this.regions.filter(({id}) => this.formData.regions.includes(id));
			if (selectedRegions.length) {
				selectedRegions.forEach((region) => {
					districts = districts.concat(region.districts);
				});
			}
			return districts;
		},
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
					title: 'Отправить анкету?',
					subTitle: 'Ваша анкета будет отправлена менеджеру Кинодома. ' +
						'Мы подберем наиболее подходящие для Вашего запроса локации и свяжемся с Вами в ближайшее время.',
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
				this.$emit('success');
				if (data.message) {
					this.$snotify.success(data.message);
				} else {
					this.$snotify.success('Отправлено');
				}
			}).catch(() => {
				this.$snotify.error('Произошла ошибка');
			});
		},
		generateFormData() {
			const formData = new FormData();

			formData.append('name', this.formData.name);
			formData.append('email', this.formData.email);
			formData.append('phone', this.formData.phone);
			formData.append('info[types]', JSON.stringify(this.formData.types));
			formData.append('info[styles]', JSON.stringify(this.formData.styles));
			formData.append('info[districts]', JSON.stringify(this.formData.districts));
			formData.append('info[price_type]', JSON.stringify(this.formData.priceType));
			formData.append('info[start_at]', this.$dateFns.formatDate(this.formData.startDate * 1000));
			formData.append('info[finished_at]', this.$dateFns.formatDate(this.formData.endDate * 1000));
			formData.append('info[rent_days]', this.formData.rentDays);
			formData.append('info[team_count]', this.formData.teamCount);
			formData.append('info[max_price]', this.formData.maxPrice);
			// formData.append('info[parking]', this.formData.parking);
			formData.append('info[message]', this.formData.message);

			return formData;
		},
		checkEmptyFields() {
			const fields = Object.keys(this.errors);

			fields.forEach((field) => {
				if (this.formError.fields[field] && this.errors[field]) {
					if (Array.isArray(this.formData[field]) && !this.formData[field].length) {
						this.formError.fields[field].push(this.errors[field]);
					} else if (!this.formData[field]) {
						this.formError.fields[field].push(this.errors[field]);
					}
				}
			});

			if (!this.formData.maxPrice && !this.formData.priceType.length) {
				this.formError.fields.maxPrice = [this.errors.price];
			}

			if (!this.formData.rentDays && !this.formData.startDate && !this.formData.endDate) {
				this.formError.fields.rentDays = [this.errors.days];
			}
		},
		checkEmail() {
			const isValid = this.$validateEmail(this.formData.email);
			if (this.formData.email && !isValid) {
				this.formError.fields.email.push(this.validateErrors.email);
			}
			return isValid;
		},
		async onChangeLocationType() {
			const types = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Тип локации',
				placeholder: 'Например: Гостиница',
				selectedItems: this.formData.types,
				allItems: this.locationTypes,
				label: 'type'
			});

			if (types) {
				this.formData.types = [...types];
			}
		},
		async onChangeLocationStyle() {
			const styles = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Стиль пространства',
				placeholder: 'Например: Классический',
				selectedItems: this.formData.styles,
				allItems: this.locationStyles,
				label: 'style'
			});

			if (styles) {
				this.formData.styles = [...styles];
			}
		},
		async onChangeDistrictsType() {
			const districts = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Районы',
				placeholder: 'Например: Арбат',
				selectedItems: this.formData.districts,
				allItems: this.districts,
				label: 'district'
			});

			if (districts) {
				this.formData.districts = [...districts];
			}
		},
		onLocationTypeClick(id) {
			const index = this.formData.types.findIndex((item) => item === id);
			if (index !== -1) {
				this.formData.types.splice(index, 1);
			}
		},
		onLocationStyleClick(id) {
			const index = this.formData.styles.findIndex((item) => item === id);
			if (index !== -1) {
				this.formData.styles.splice(index, 1);
			}
		}
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
	created() {
	},
	mounted() {},
}
</script>
