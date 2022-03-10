<template>
	<footer class="_PageFooter footer">
		<div class="layout">
			<div class="footer__wrap">
				<div class="footer__item">
					<nuxt-link to="/" class="logo">
						<v-svg name="logo" w="140" h="25"/>
					</nuxt-link>
					<nuxt-link to="/about" class="link d-block">О нас</nuxt-link>
					<div class="mt-6">&copy;&nbsp;2022. Кинодом</div>
					<button class="link d-block mt-6" @click="$loadModal('LicenseAgreementModal', {isFull: true, lock: true})">
						Лицензионное соглашение
					</button>
					<button class="link d-block mt-6" @click="$loadModal('PrivacyPolicyModal', {isFull: true, lock: true})">
						Политика конфиденциальности
					</button>
				</div>
				<div class="footer__item from-xs:hidden">
					<a href="https://instagram.com/kinodomu" target="_blank" class="link">
						<img data-src="/svg/instagram.svg" alt="instagram" width="48" height="48" class="lazyLoad" v-lazy-load>
					</a>
				</div>
				<div class="footer__item">
					<div class="btnRow btnRow--m">
						<a href="https://instagram.com/kinodomu" target="_blank" class="link xs:hidden">
							<img data-src="/svg/instagram.svg" alt="instagram" width="48" height="48" class="lazyLoad" v-lazy-load>
						</a>
						<a href="https://apps.apple.com/ru/app/kinodom/id1559942525" target="_blank" class="link">
							<img data-src="/svg/appstore.svg" alt="appstore" width="162" height="48" class="lazyLoad" v-lazy-load>
						</a>
						<a href="https://play.google.com/store/apps/details?id=ru.kinodom.app" target="_blank" class="link">
							<img data-src="/svg/googleplay.svg" alt="googleplay" width="162" height="48" class="lazyLoad" v-lazy-load>
						</a>
					</div>
				</div>
				<div class="footer__right l:hidden">
					<nuxt-link to="/search-form" class="btn --outline ws-no-wrap">
						Заполнить анкету
					</nuxt-link>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>

	import VBtn from "~/components/_uikit/VBtn";
	export default {
		name: "PageFooter",
		props: {},
		components: {VBtn},
		data() {
			return {}
		},
		computed: {},
		methods: {},
		directives: {},
		filters: {},
		watch: {},
		created() {
		},
		mounted() {
		},
	}
</script>
