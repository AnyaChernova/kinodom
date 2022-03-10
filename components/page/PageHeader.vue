<template>
	<header class="_PageHeader header" ref="header" :class="{'--scroll': isScroll}">
		<div class="layout">
			<div class="header__wrap">
				<div class="header__menu from-xl:hidden">
					<PageNavMobile/>
				</div>
				<nuxt-link to="/" class="header__logo logo">
					<v-svg name="logo" w="140" h="25" class="s:hidden"/>
					<v-svg name="logo-s" w="33" h="25" class="from-s:hidden"/>
				</nuxt-link>
				<div class="header__nav header__nav--owner xl:hidden">
					<PageNav/>
				</div>
				<div class="header__contacts">
					<div class="text-right mr-8 m:hidden">
						<a href="tel:+79299359003" class="link title-xxs text-brand">+7 929 935-90-03</a>
						<div class="fz-12 mt-4">Подберём локацию бесплатно</div>
					</div>
					<a class="btn --icon --small --pic mr-8" href="https://wa.me/79256715406" target="_blank">
						<img src="/svg/whatsapp.svg" alt="whatsapp" width="32" height="32">
					</a>
					<a class="btn --icon --small --pic" href="https://t.me/kinodom_rus" target="_blank">
						<img src="/svg/telegram.svg" alt="telegram" width="32" height="32">
					</a>
				</div>
				<div class="header__right">
					<div class="header__btns" v-if="$auth.user">
						<template v-if="$store.getters.isOwner">
							<nuxt-link to="/my-objects" class="btn --icon s:hidden">
								<v-svg name="locations" w="24" h="24"/>
							</nuxt-link>
							<nuxt-link to="/history" class="btn --icon s:hidden">
								<v-svg name="clock" w="24" h="24"/>
							</nuxt-link>
						</template>
						<template v-else>
							<nuxt-link to="/favorites" class="btn --icon s:hidden">
								<v-svg name="favorite" w="24" h="24"/>
							</nuxt-link>
							<nuxt-link to="/history" class="btn --icon s:hidden">
								<v-svg name="kino" w="24" h="24"/>
							</nuxt-link>
						</template>
						<nuxt-link to="/support" class="btn --icon s:hidden">
							<v-svg name="message" w="24" h="24"/>
						</nuxt-link>
						<PageUserMenu/>
					</div>
					<v-btn simple @click="$loadModal('auth/AuthModal')" v-else>
						<v-svg name="user" w="25" h="25"/>
						<span class="ml-8 xxl:hidden">Войти</span>
					</v-btn>
				</div>
			</div>
		</div>
		<SearchPanel :class="{open: isSearchOpen, '--sticky': isSearchShow}" v-if="isSearch"/>
	</header>
</template>

<script>

import VBtn from "@/components/_uikit/VBtn";
import SearchPanel from "~/components/search/SearchPanel";
import PageNav from "~/components/page/PageNav";
import PageNavMobile from "~/components/page/PageNavMobile";
import PageUserMenu from "~/components/page/PageUserMenu";
import {mapState} from "vuex";

export default {
	name: "PageHeader",
	props: {
		isSearch: {
			type: Boolean,
			default: false,
		},
		isSearchShow: {
			type: Boolean,
			default: false,
		},
		isScrollChanged: {
			type: Boolean,
			default: false,
		},
	},
	components: {PageUserMenu, PageNavMobile, PageNav, SearchPanel, VBtn},
	data() {
		return {
			isScroll: false,
			isSearchOpen: false
		}
	},
	computed: {
	},
	methods: {
		onScroll() {
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			this.isSearchOpen = scrollTop > 200;
			this.isScroll = this.isScrollChanged && scrollTop > 0;
		},
		calcInnerHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
			window.addEventListener('resize', () => {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			});
		},
	},
	directives: {},
	filters: {},
	watch: {
	},
	created() {
	},
	mounted() {
		window.addEventListener('scroll', this.onScroll);
		this.calcInnerHeight();
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll);
	}
}
</script>
