<template>
	<div class="_MarkupPage">
		<div class="intro box">
			<img src="/img/intro.jpg" alt="intro pic" class="intro__img">
			<div class="layout">
				<FormInput class="search" placeholder="Что ищем?" autocomplete="off">
					<template #before>
						<v-svg name="search" w="16" h="16" class="mr-8 -mt-2"/>
					</template>
				</FormInput>
				<h1 class="intro__title">Подберём идеальную локацию и&nbsp;транспорт для съемок</h1>
				<div class="intro__btn">
					<nuxt-link to="/search-form" class="btn s:w-full">Заполнить анкету</nuxt-link>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="layout">
				<div class="box__header box__header--s text-center">
					<div class="title">Страницы</div>
				</div>
				<nuxt-link to="/" class="link link--line fz-18 d-block">Главная</nuxt-link>
				<nuxt-link to="/about" class="link link--line fz-18 d-block mt-m">О нас</nuxt-link>
				<nuxt-link to="/map" class="link link--line fz-18 d-block mt-m">Карта локаций</nuxt-link>
				<nuxt-link to="/search-result?search=Дом времен СССР в центре" class="link link--line fz-18 d-block mt-m">Выдача</nuxt-link>
				<nuxt-link to="/search-map?search=Дом времен СССР в центре" class="link link--line fz-18 d-block mt-m">Выдача локаций на карте</nuxt-link>
				<nuxt-link to="/locations/5" class="link link--line fz-18 d-block mt-m">Страница локации</nuxt-link>
				<nuxt-link to="/transport/5" class="link link--line fz-18 d-block mt-m">Страница транспорта</nuxt-link>
				<nuxt-link to="/favorites" class="link link--line fz-18 d-block mt-m">Избранное</nuxt-link>
				<nuxt-link to="/history" class="link link--line fz-18 d-block mt-m">История съемок</nuxt-link>
				<nuxt-link to="/history/4" class="link link--line fz-18 d-block mt-m">История съемок - локация</nuxt-link>
				<nuxt-link to="/my-objects" class="link link--line fz-18 d-block mt-m">Мои объекты</nuxt-link>
				<nuxt-link to="/create" class="link link--line fz-18 d-block mt-m">Новый объект</nuxt-link>
				<nuxt-link to="/locations/4/edit" class="link link--line fz-18 d-block mt-m">Редактирование локации</nuxt-link>
				<nuxt-link to="/search-form" class="link link--line fz-18 d-block mt-m">Анкета на поиск</nuxt-link>
				<nuxt-link to="/settings" class="link link--line fz-18 d-block mt-m">Настройки профиля</nuxt-link>
				<nuxt-link to="/contacts" class="link link--line fz-18 d-block mt-m">Контакты</nuxt-link>
				<nuxt-link to="/ss" class="link link--line fz-18 d-block mt-m">404</nuxt-link>

				<div class="box__header box__header--s text-center">
					<div class="title">Фильтры</div>
				</div>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('filter/FilterMainModal', {isFull: true, lock: true})">
					Фильтры
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('filter/FilterChangeModal', {isFull: true, lock: true})">
					Изменение параметров фильтра
				</button>

				<div class="box__header box__header--s text-center mt-20">
					<div class="title">Модальные окна</div>
				</div>

				<button class="link link--line fz-18 d-block" @click="$loadModal('RegisterModal')">Регистрация
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('auth/AuthModal')">Авторизация</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('auth/AuthEmailModal')">Авторизация
					Email
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('password/PasswordRecoveryModal')">
					Восстановление пароля
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('password/PasswordRecoveryErrorModal')">
					Восстановление пароля - ошибка
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('password/PasswordChangeModal')">Новый
					пароль
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('LicenseAgreementModal', {isFull: true, lock: true})">
					Лицензионное соглашение
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('PrivacyPolicyModal', {isFull: true, lock: true})">
					Политика конфиденциальности
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('RentRequestModal', {isFull: true, lock: true})">
					Запрос на аренду
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('LocationInfoModal', {isFull: true, lock: true})">
					Информация от Кинодома
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('location/LocationRoomAddModal', {isFull: true, lock: true})">
					Добавить помещение
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('location/LocationAddPhotoModal', {isFull: true, lock: true})">
					Выбрать фото
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('GalleryModal', {isFull: true, lock: true})">
					Превью картинок
				</button>
				<button class="link link--line fz-18 d-block mt-m"
								@click="$loadModal('SearchFormConfirmModal', {isBottom: true})">Отправить анкету?
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('review/ReviewModal')">Оставить отзыв
				</button>
				<button class="link link--line fz-18 d-block mt-m"
								@click="$loadModal('review/ReviewSuccessModal', {isBottom: true})">Отзыв отправлен
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('settings/SettingsEmailChangeModal')">
					Изменить e-mail
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('settings/SettingsEmailReadyModal')">
					Изменить e-mail - готово
				</button>
				<button class="link link--line fz-18 d-block mt-m"
								@click="$loadModal('settings/SettingsEmailSuccessModal', {isBottom: true})">Подтверждение e-mail
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('settings/SettingsPasswordChangeModal')">
					Изменить пароль
				</button>
				<button class="link link--line fz-18 d-block mt-m"
								@click="$loadModal('settings/SettingsPasswordReadyModal', {isBottom: true})">Изменить пароль - готово
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('settings/SettingsPhoneChangeModal')">
					Изменить телефон
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('settings/SettingsPhotoChangeModal')">
					Изменить фото
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('ConfirmModal', {
					isSmall: true,
					isBottom: true,
					title: 'Разместить объект?',
					subTitle: 'Ваш объект  location_name будет отправлен на модерацию. Вы уверены, что указали все необходимые данные и готовы разместить объект на сайте Кинодом?',
					btnText: 'Разместить'
				})">Разместить объект?
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('ConfirmModal', {
					isSmall: true,
					isBottom: true,
					title: 'Перенести в архив?',
					subTitle: 'Карточка объекта будет сохранена в архиве и не будет видна пользователям сервиса. Вы всегда сможете восстановить ее.',
					btnText: 'Архивировать',
					btnClass: '--c-danger'
				})">Перенести в архив?
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('ConfirmModal', {
					isSmall: true,
					isBottom: true,
					title: 'Восстановить из архива?',
					subTitle: 'После модерации объект снова появится на сайте и будет виден пользователям сервиса.',
					btnText: 'Восстановить',
				})">Восстановить из архива?
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('ConfirmModal', {
					isSmall: true,
					isBottom: true,
					title: 'Отменить редактирование?',
					subTitle: 'Несохраненный процесс редактирования объекта будет потерян.',
					btnText: 'Отменить',
					btnClass: '--c-danger'
				})">Отменить редактирование?
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('AuthCheckModal', {
					isSmall: true,
					isBottom: true,
					title: 'Добавить в избранное',
					subTitle: 'Только зарегистрированные пользователи могут добавлять локации в избранное.',
				})">Добавить в избранное
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('AuthCheckModal', {
					isSmall: true,
					isBottom: true,
					title: 'Арендовать',
					subTitle: 'Аренда доступна только зарегистрированным пользователям, занимающимся подбором локаций.',
				})">Арендовать
				</button>
				<button class="link link--line fz-18 d-block mt-m" @click="$loadModal('SocialShareModal', {
					isSmall: true,
					isBottom: true,
				})">Поделиться
				</button>
			</div>
		</div>
	</div>
</template>

<script>

import FormInput from "~/components/_uikit/FormInput";

export default {
	name: "MarkupPage",
	scrollToTop: true,
	layout: 'main',
	props: {},
	components: {FormInput},
	data() {
		return {}
	},
	async asyncData({app}) {
	},
	computed: {},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	}
}
</script>
