<template>
	<div class="_SettingsForm box">
		<div class="box__header text-center">
			<button class="avatar --xl" @click="onPhotoClick">
				<img :src="$auth.user.avatar" :alt="$auth.user.name" v-if="$auth.user.avatar">
				<v-svg name="user_big" w="256" h="256" class="text-label" v-else/>
				<span class="avatar__addon text-brand">
					<v-svg name="camera" w="32" h="32"/>
				</span>
			</button>
		</div>
		<div class="text-center">
			<h2 class="title-m">{{ $auth.user.name }}</h2>
			<div class="mt-m text-label fz-18" v-if="$store.getters.isOwner">Использование сервиса для сдачи локаций в аренду</div>
			<div class="mt-m text-label fz-18" v-else>Использование сервиса для поиска локаций</div>
		</div>
		<div class="fieldset fieldset--m mt-m">
			<div class="fieldset__item-s">
				<FormInputFloat label="Имя" v-model="formData.name"/>
			</div>
			<div class="fieldset__item-s" v-if="$store.getters.isRenter">
				<FormSelect
					float
					:options="$store.state.professions"
					label="Профессия"
					option-track-by="id"
					option-label="name"
					class="--select w-full"
					v-model="formData.profession">
					<template #arrowIcon>
						<v-svg name="arrow-down" w="16" h="16"/>
					</template>
				</FormSelect>
			</div>
			<div class="fieldset__item-s d-flex items-center">
				<FormInputFloat disabled class="--writeOnly flex-grow mr-3" label="E-mail" :clearable="false" :model-value="$auth.user.email"/>
				<button class="link fz-18 pl-10" @click="onEmailChangeClick">Изменить</button>
			</div>
			<div class="fieldset__item-s d-flex items-center">
				<div class="d-flex items-center text-danger mr-10">
					<v-svg name="error" w="24" h="24"/>
					<span class="ml-4">E-mail не подтвержден</span>
				</div>
				<button class="link fz-18 ml-auto" :class="{'link--loading': acceptLoading}" @click="onEmailAcceptClick">Подтвердить</button>
			</div>
			<div class="fieldset__item-s d-flex items-center">
				<FormFieldMask
					disabled
					is-active
					class="--writeOnly flex-grow mr-3"
					:clearable="false"
					:mask-options="{mask: '+7(000)000-00-00', lazy: false}"
					label="Телефон"
					:model-value="$auth.user.phone"/>
				<button class="link fz-18 pl-10" @click="onPhoneChangeClick">Изменить</button>
			</div>
			<div class="fieldset__item-s d-flex items-center">
				<FormFieldPassword disabled class="--writeOnly flex-grow mr-3" label="Пароль"/>
				<button class="link fz-18 pl-10" @click="onPasswordChangeClick">Изменить</button>
			</div>
		</div>
		<div class="fieldset fieldset--m">
			<div class="box__header box__header--s">
				<h2 class="title-m">О себе</h2>
			</div>
			<FormTextarea float cut :cut-length="200" label="Расскажите коротко о себе" v-model="formData.about"/>
		</div>
<!--		<div class="fieldset fieldset&#45;&#45;m">-->
<!--			<div class="box__header box__header&#45;&#45;s">-->
<!--				<h2 class="title-m">Настройки уведомлений</h2>-->
<!--			</div>-->
<!--			<div class="list list&#45;&#45;switch">-->
<!--				<div class="list__item d-flex items-center justify-between">-->
<!--					<span class="fz-18">На e-mail</span>-->
<!--					<FormCheckbox mode="switch" class="mr-m"/>-->
<!--				</div>-->
<!--				<div class="list__item d-flex items-center justify-between">-->
<!--					<span class="fz-18">Пуш-уведомления</span>-->
<!--					<FormCheckbox mode="switch" class="mr-m"/>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
		<div class="fieldset text-center">
			<v-btn :loading="loading" @click="onSave">Сохранить</v-btn>
		</div>
	</div>
</template>

<script>
import FormInputFloat from "~/components/form/FormInputFloat";
import FormSelect from "~/components/form/FormSelect";
import FormFieldMask from "~/components/form/FormFieldMask";
import FormFieldPassword from "~/components/form/FormFieldPassword";
import FormTextarea from "~/components/form/FormTextarea";
import FormCheckbox from "~/components/_uikit/FormCheckbox";
import VBtn from "~/components/_uikit/VBtn";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";

export default {
	name: "SettingsForm",
	mixins: [_baseFormComponent],
	props: {},
	components: {
		VBtn,
		FormCheckbox,
		FormTextarea,
		FormFieldPassword,
		FormFieldMask,
		FormSelect,
		FormInputFloat
	},
	data() {
		return {
			acceptLoading: false,
			formUrl: 'profile',
			formFunc: 'updateInfo',
			formData: {
				name: this.$auth.user.name || '',
				profession: this.$auth.user.profession ? this.$auth.user.profession.id : '',
				about: this.$auth.user.about || '',
			},
		}
	},
	computed: {},
	methods: {
		onPhotoClick() {
			this.$loadModal('settings/SettingsPhotoChangeModal');
		},
		onEmailChangeClick() {
			this.$loadModal('settings/SettingsEmailChangeModal');
		},
		onPhoneChangeClick() {
			this.$loadModal('settings/SettingsPhoneChangeModal');
		},
		onPasswordChangeClick() {
			this.$loadModal('settings/SettingsPasswordChangeModal');
		},
		async onEmailAcceptClick() {
			const res = await this.$loadModal('ConfirmModal', {
				isSmall: true,
				isBottom: true,
				title: 'Подтверждение email',
				subTitle: 'На вашу почту будет отправлено письмо со ссылкой для подтверждения Email. После перехода по ссылке ваш Email будет подтвержден.',
				btnText: 'Ок',
			});
			if (res) {
				await this.acceptEmail();
			}
		},
		async acceptEmail() {
			this.acceptLoading = true;
			await this.$repositories.profile.acceptEmail().then(({data}) => {
				this.$snotify.success('Отправлено');
			}).catch(() => {});
			this.acceptLoading = false;
		},
		async onSave() {
			await this.submitForm().then(() => {
				this.$snotify.success('Сохранено');
				this.$auth.fetchUser();
			}).catch(() => {
			})
		},
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {}
}
</script>


