<template>
	<div class="PageNavMobile">
		<v-btn simple v-if="isOpen" @click="closeMenu"><v-svg name="burger-close" w="32" h="32"/></v-btn>
		<v-btn simple v-else @click="openMenu"><v-svg name="burger" w="32" h="32"/></v-btn>
		<div class="menuMobile" v-if="isOpen">
			<ul class="nav">
				<li class="nav__item">
					<nuxt-link to="/" exact class="nav__link" @click.native="closeMenu">Главная</nuxt-link>
				</li>
				<li class="nav__item">
					<nuxt-link to="/map" class="nav__link" @click.native="closeMenu">Карта локаций</nuxt-link>
				</li>
				<li class="nav__item">
					<nuxt-link to="/contacts" class="nav__link" @click.native="closeMenu">Контакты</nuxt-link>
				</li>
				<li class="nav__item" v-if="$store.getters.isOwner">
					<nuxt-link to="/create" class="nav__link" @click.native="closeMenu">Разместить</nuxt-link>
				</li>
				<li class="nav__item" v-if="!$auth.user">
					<nuxt-link to="/support/create" class="nav__link" @click.native="closeMenu">Поддержка</nuxt-link>
				</li>
			</ul>
			<div class="menuMobile__footer">
				<a href="https://apps.apple.com/ru/app/kinodom/id1559942525" target="_blank" class="link"><img src="/svg/appstore.svg" alt="appstore" width="162" height="48"></a>
				<div class="mt-m">
					<a href="https://play.google.com/store/apps/details?id=ru.kinodom.app" target="_blank" class="link"><img src="/svg/googleplay.svg" alt="googleplay" width="162" height="48"></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
export default {
	name: "PageNavMobile",
	props: {},
	components: {VBtn},
	data() {
		return {
			isOpen: false
		}
	},
	computed: {},
	methods: {
		openMenu() {
			this.isOpen = true;
		},
		closeMenu() {
			this.isOpen = false;
		}
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	},
}
</script>
