<template>
	<div class="_TransportForm">
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Название объявления</div>
			</div>
			<FormInputFloat
				label="Название"
				autocomplete="new-name"
				v-model="formData.title"
				:errors="formError.fields.title"/>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Марка и модель</div>
			</div>
			<FormInputFloat label="Марка и модель" v-model="formData.model" :errors="formError.fields.model"/>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Год выпуска</div>
			</div>
			<FormFieldMask label="Год выпуска" v-model="formData.release_year" :errors="formError.fields.release_year"/>
		</div>
		<div class="fieldset">
			<div class="title-m">Фотографии</div>
			<div class="fieldset__item">
				<template v-if="galleryMain.photo || galleryAdditional.photos.length">
					<div class="cells --gap-pic">
						<div class="cell"><img :src="galleryMain.photo.src" :alt="galleryMain.photo.name" class="pic"></div>
						<div class="cell" v-for="(photo, i) in galleryAdditional.photos" :key="i">
							<img :src="photo.src" :alt="photo.name" class="pic">
						</div>
					</div>
				</template>
				<span class="text-label fz-18" v-else>Фото не загружены</span>
			</div>
			<div class="fieldset__item">
				<button class="link link--underline fz-16" @click="onChangeTransportPhotos">
					<template v-if="galleryMain.photo || galleryAdditional.photos.length">Изменить фото</template>
					<template v-else>Добавить фото</template>
				</button>
				<div class="text-danger fz-12" v-if="formError.fields.gallery.length">{{ formError.fields.gallery[0] }}</div>
			</div>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Стоимость аренды</div>
			</div>
			<FormFieldMask label="Стоимость аренды ₽/сутки" :mask-options="{
						mask: Number,
						scale: 2,
						thousandsSeparator: ' ',
						signed: false,
						unmask: true,
			}" v-model="formData.price" :errors="formError.fields.price"/>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Город</div>
			</div>
			<FormDadata label="Адрес"
									:options="options"
									v-model="formData.address"
									:errors="formError.fields.address"
									@select="onAddressSelect"
									@clear="resetAddress"/>
			<button class="link link--underline fz-16" @click="onChangeTransportAddress">Указать на карте</button>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Подробное описание</div>
			</div>
			<FormTextarea label="Подробное описание" float cut :cut-length="1000" v-model="formData.description"
										:errors="formError.fields.description"/>
		</div>
		<div class="fieldset">
			<div class="title-m">Тип кузова</div>
			<div class="fieldset__item">
				<div class="btnRow btnRow--xs" v-if="selectedTypes.length">
					<v-btn class="--badge"
								 v-for="selectedType in selectedTypes"
								 :key="selectedType.id"
								 @click="onTransportTypeClick(selectedType.id)">
						<span>{{ selectedType.type }}</span>
						<v-svg name="close_b" w="10" h="10" class="ml-8"/>
					</v-btn>
				</div>
				<div class="text-label fz-18" v-else>Ничего не выбрано</div>
			</div>
			<div class="fieldset__item">
				<button class="link link--underline fz-16" @click="onChangeTransportType">Изменить тип</button>
				<div class="text-danger fz-12" v-if="formError.fields.types.length">{{ formError.fields.types[0] }}</div>
			</div>
		</div>
		<div class="fieldset">
			<div class="title-m">Стиль авто</div>
			<div class="fieldset__item">
				<div class="btnRow btnRow--xs" v-if="selectedStyles.length">
					<v-btn class="--badge"
								 v-for="selectedStyle in selectedStyles"
								 :key="selectedStyle.id"
								 @click="onTransportStyleClick(selectedStyle.id)">
						<span>{{ selectedStyle.style }}</span>
						<v-svg name="close_b" w="10" h="10" class="ml-8"/>
					</v-btn>
				</div>
				<div class="text-label fz-18" v-else>Ничего не выбрано</div>
			</div>
			<div class="fieldset__item">
				<button class="link link--underline fz-16" @click="onChangeTransportStyle">Изменить стиль</button>
				<div class="text-danger fz-12" v-if="formError.fields.styles.length">{{ formError.fields.styles[0] }}</div>
			</div>
		</div>
		<div class="fieldset">
			<div class="title-m">Цвет авто</div>
			<div class="fieldset__item">
				<FormSelect
					option-label="title"
					option-track-by="title"
					:options="colors"
					v-model="formData.color">
					<template #selectedOption="{option}">
						<div class="d-flex items-center">
							<div class="rect mr-8"
									 :class="{'rect--border': option.color === '#ffffff'}"
									 :style="`background: ${option.color};`"/>
							<span>{{ option.title }}</span>
						</div>
					</template>
					<template #option="{option}">
						<div class="d-flex items-center">
							<div class="rect mr-8"
									 :class="{'rect--border': option.color === '#ffffff'}"
									 :style="`background: ${option.color};`"/>
							<span>{{ option.title }}</span>
						</div>
					</template>
					<template #arrowIcon>
						<v-svg name="arrow-down" w="16" h="16"/>
					</template>
				</FormSelect>
			</div>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Особые требования при аренде</div>
			</div>
			<FormTextarea label="Особые требования" float cut :cut-length="1000" v-model="formData.special_requirements"
										:errors="formError.fields.special_requirements"/>
		</div>
		<div class="fieldset">
			<div class="fieldset__header">
				<div class="title-m">Максимальный срок аренды</div>
			</div>
			<FormFieldMask label="Максимальный срок аренды (в сутках)" v-model="formData.max_rent"
										 :errors="formError.fields.max_rent"/>
		</div>
		<div class="fieldset">
			<div class="title-m">Теги</div>
			<div class="fieldset__item" v-if="formData.tags.length">
				<button class="link link--underline fz-16" @click="onChangeTransportTags">
					Выбрано {{ formData.tags.length }}
				</button>
			</div>
			<template v-else>
				<div class="fieldset__item text-label fz-18">Ничего не выбрано</div>
				<div class="fieldset__item">
					<button class="link link--underline fz-16" @click="onChangeTransportTags">Изменить теги</button>
				</div>
			</template>
		</div>
		<div class="fieldset text-center">
			<v-btn :loading="loading" @click="onSave">Разместить</v-btn>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";
import FormFieldMask from "~/components/form/FormFieldMask";
import FormTextarea from "~/components/form/FormTextarea";
import {mapState} from "vuex";
import FormSelect from "~/components/form/FormSelect";
import FormDadata from "~/components/form/FormDadata";

export default {
	name: "TransportForm",
	mixins: [_baseFormComponent],
	props: {
		type: {
			type: String,
			default: 'create'
		},
		transportType: {
			type: Number,
			default: 0
		},
		transport: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {FormDadata, FormSelect, FormTextarea, FormFieldMask, FormInputFloat, VBtn},
	data() {
		return {
			formUrl: 'transport',
			formUrlParam: this.transport.id || '',
			formFunc: this.type,
			errors: {
				title: 'Обязательное поле',
				price: 'Обязательное поле',
				description: 'Обязательное поле',
				address: 'Обязательное поле',
				gallery: 'Добавьте хотя бы одну фотографию',
				types: 'Выберите хотя бы один тип транспорта',
				styles: 'Выберите хотя бы один стиль транспорта',
			},
			globalError: 'Заполните все поля',
			formError: {
				fields: {
					gallery: [],
				}
			},
			formData: {
				type: this.transportType,
				title: this.transport.title || '',
				price: this.transport.price || '',
				description: this.transport.description || '',
				address: this.transport.address || '',
				max_rent: this.transport.max_rent || '',
				special_requirements: this.transport.special_requirements || '',
				color: this.transport.color || '',
				release_year: this.transport.release_year || '',
				model: this.transport.model || '',
				styles: this.transport.styles ? this.transport.styles.map(({style}) => style.id) : [],
				types: this.transport.types ? this.transport.types.map(({type}) => type.id) : [],
				tags: this.transport.tags ? this.transport.tags.map(({tag}) => tag.id) : [],
			},
			galleryMain: {
				photo: '',
				comment: ''
			},
			galleryAdditional: {
				photos: [],
				comments: []
			},
			verified_address: {
				city: this.transport.verified_address ? this.transport.verified_address.city : '',
				house: this.transport.verified_address ? this.transport.verified_address.house : '',
				region: this.transport.verified_address ? this.transport.verified_address.region : '',
				street: this.transport.verified_address ? this.transport.verified_address.street : '',
				district: this.transport.verified_address ? this.transport.verified_address.district : '',
				entrance: this.transport.verified_address ? this.transport.verified_address.entrance : '',
				apartment: this.transport.verified_address ? this.transport.verified_address.apartment : '',
				coordinates: {
					latitude: this.transport.verified_address ? this.transport.verified_address.coordinates.latitude : '',
					longitude: this.transport.verified_address ? this.transport.verified_address.coordinates.longitude : ''
				}
			},
			options: []
		}
	},
	computed: {
		...mapState({
			colors: 'colors',
		}),
		...mapState('transport', {
			transportTypes: 'transportTypes',
			transportStyles: 'transportStyles',
			transportTags: 'transportTags',
		}),
		selectedTypes() {
			return this.transportTypes.filter(({id}) => this.formData.types.includes(id));
		},
		selectedStyles() {
			return this.transportStyles.filter(({id}) => this.formData.styles.includes(id));
		},
		tags() {
			return this.transportTags.map((tag) => {
				return {
					id: tag.id,
					tag: `#${tag.tag}`
				};
			});
		}
	},
	methods: {
		async onSave() {
			this.$resetFormErrors({
				formError: this.formError,
			});
			this.checkEmptyFields();
			if (!this.isErrors) {
				const res = await this.$loadModal('ConfirmModal', {
					isSmall: true,
					isBottom: true,
					title: 'Разместить транспорт?',
					subTitle: `Ваша транспорт <b>${this.formData.title}</b> будет отправлен на модерацию.
						Вы уверены, что указали все необходимые данные и готовы разместить объект на сайте Кинодом?`,
					btnText: 'Разместить',
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
			await this.submitForm(newFormData).then(() => {
				this.$emit('save');
				this.$loadModal('ConfirmModal', {
					isSmall: true,
					isBottom: true,
					title: 'Отлично!',
					subTitle: `Ваш транспорт <b>${this.formData.title}</b> был успешно отправлен на модерацию,
									мы начнем проверку и свяжемся с вами в разделе "Поддержка".`,
					btnText: 'Ок',
				});
				this.$router.push('/my-objects?filterStatus=2');
			}).catch(() => {
			});
		},
		generateFormData() {
			const formData = new FormData();

			Object.entries(this.formData).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					formData.append(key, JSON.stringify(value));
				} else {
					formData.append(key, value);
				}
			});

			formData.append('verified_address', JSON.stringify(this.verified_address));
			formData.append('gallery[main][photo]', this.galleryMain.photo.file);
			formData.append('gallery[main][comment]', this.galleryMain.comment);

			if (this.galleryAdditional.photos.length) {
				this.galleryAdditional.photos.forEach((item) => {
					formData.append(`gallery[additional][photos][]`, item.file);
				});
				formData.append(`gallery[additional][comments]`, JSON.stringify(this.galleryAdditional.comments));
			}

			if (this.type === 'edit') {
				formData.append('_method', 'PUT');
			}

			return formData;
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

			if (this.type === 'create' && !this.galleryMain.photo && !this.galleryAdditional.photos.length) {
				this.formError.fields['gallery'].push(this.errors['gallery']);
			} else {
				this.formError.fields['gallery'] = [];
			}
		},
		setAddress(data) {
			this.verified_address.city = data.city;
			this.verified_address.house = data.house;
			this.verified_address.region = data.region;
			this.verified_address.street = data.street;
			this.verified_address.district = data.city_district;
			this.verified_address.coordinates.latitude = data.geo_lat;
			this.verified_address.coordinates.longitude = data.geo_lon;
		},
		resetAddress() {
			this.verified_address.city = '';
			this.verified_address.house = '';
			this.verified_address.region = '';
			this.verified_address.street = '';
			this.verified_address.district = '';
			this.verified_address.coordinates.latitude = '';
			this.verified_address.coordinates.longitude = '';
		},
		onAddressSelect(model) {
			if (model) {
				this.setAddress(model.data);
			}
		},
		async onChangeTransportAddress() {
			const address = await this.$loadModal('location/LocationAddressAddModal', {
				isFull: true,
				lock: true,
			});

			if (address) {
				this.options = [address];
				this.formData.address = address.value;
				this.setAddress(address.data);
			}
		},
		async onChangeTransportPhotos() {
			const addedPhotos = [...this.galleryAdditional.photos];
			const addedComments = [...this.galleryAdditional.comments];
			if (this.galleryMain.photo) {
				addedPhotos.unshift(this.galleryMain.photo)
			}
			if (this.galleryMain.comment) {
				addedComments.unshift(this.galleryMain.comment)
			}

			const {photos, comments} = await this.$loadModal('location/LocationAddPhotoModal', {
				isFull: true,
				lock: true,
				addedPhotos,
				addedComments,
			});

			if (photos) {
				const index = photos.findIndex(({main}) => main);
				if (index !== -1) {
					this.galleryMain.photo = photos[index];
					this.galleryMain.comment = comments[index];
					photos.splice(index, 1);
					comments.splice(index, 1);
				} else {
					this.galleryMain.photo = '';
					this.galleryMain.comment = '';
				}
				this.galleryAdditional.photos = photos;
				this.galleryAdditional.comments = comments;
			}
		},
		async onChangeTransportType() {
			const types = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Тип кузова',
				placeholder: 'Например: Хэтчбек',
				selectedItems: this.formData.types,
				allItems: this.transportTypes,
				label: 'type'
			});

			if (types) {
				this.formData.types = [...types];
			}
		},
		async onChangeTransportStyle() {
			const styles = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Стиль авто',
				placeholder: 'Например: Классика',
				selectedItems: this.formData.styles,
				allItems: this.transportStyles,
				label: 'style'
			});

			if (styles) {
				this.formData.styles = [...styles];
			}
		},
		async onChangeTransportTags() {
			const tags = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Теги',
				placeholder: 'Например: #авто',
				selectedItems: this.formData.tags,
				allItems: this.tags,
				label: 'tag'
			});

			if (tags) {
				this.formData.tags = [...tags];
			}
		},
		onTransportTypeClick(id) {
			const index = this.formData.types.findIndex((item) => item === id);
			if (index !== -1) {
				this.formData.types.splice(index, 1);
			}
		},
		onTransportStyleClick(id) {
			const index = this.formData.styles.findIndex((item) => item === id);
			if (index !== -1) {
				this.formData.styles.splice(index, 1);
			}
		}
	},
	directives: {},
	filters: {},
	watch: {
		galleryMain: {
			handler() {
				this.formError.fields.gallery = [];
			},
			deep: true
		},
		galleryAdditional: {
			handler() {
				this.formError.fields.gallery = [];
			},
			deep: true
		}
	},
	created() {
	},
	mounted() {},
}
</script>
