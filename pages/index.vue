<template>
	<div class="_IndexPage">
		<div class="intro box">
			<picture>
				<source type="image/webp" media="(max-width:380px)" srcset="/img/intro-mob.webp">
				<source type="image/jpeg" media="(max-width:380px)" srcset="/img/intro-mob.jpg">
				<source type="image/webp" media="(min-width:381px)" srcset="/img/intro.webp">
				<source type="image/jpeg" media="(min-width:381px)" srcset="/img/intro.jpg">
				<img src="/img/intro.jpg" alt="Подберём идеальную локацию и транспорт для съемок" class="intro__img" width="1440" height="559">
			</picture>
			<div class="layout">
				<SearchField/>
				<h1 class="intro__title">Подберём идеальную локацию и&nbsp;транспорт для съемок</h1>
				<div class="intro__btn">
					<a href="https://wa.me/79256715406" target="_blank" class="btn s:w-full">Оставить заявку</a>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="layout">
				<div class="box__header box__header--s text-center">
					<div class="title">Рекомендуем</div>
				</div>
				<div class="box">
					<div class="box__header">
						<div class="tabsWrap tabsWrap--center">
							<TabsControl :tabs="tabs" v-model="activeTab"/>
						</div>
					</div>
					<div ref="list" style="min-height: 500px;">
						<keep-alive v-if="isListVisible">
							<component :is="componentName"
												 :objects="objects"
												 :count="count"
												 is-fetch
												 is-load-more
												 :active-tab="activeTab"/>
						</keep-alive>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import FormInputSearch from "~/components/form/FormInputSearch";
import SearchField from "~/components/search/SearchField";
import {mapState} from "vuex";
import seoCore from "~/utils/seoCore";
import TabsControl from "~/components/_block/TabsControl";

export default {
	name: "IndexPage",
	scrollToTop: true,
	watchQuery: true,
	layout: 'main',
	head() {
		return seoCore({
			title: 'Кинодом',
		}, this)
	},
	props: {},
	components: {
		TabsControl,
		SearchField,
		FormInputSearch,
		VBtn,
		TransportsList: () => import("~/components/transports/TransportsList"),
		ObjectsList: () => import("~/components/objects/ObjectsList"),
		TransportGameInfo: () => import("~/components/transport/TransportGameInfo"),
	},
	data() {
		return {
			isListVisible: false,
			activeTab: 'locations',
			tabs: [
				{
					title: 'Локации',
					value: 'locations',
				},
				{
					title: 'Транспорт поддержки',
					value: 'transport',
				},
				{
					title: 'Игровой транспорт',
					value: 'game',
				},
			]
		}
	},
	async asyncData({app, store, query}) {
		await store.dispatch('locations/fetchLocations', {query});
		// const metatags = app.$repositories.common.metatags().then((res) => {
		// 	return res.data || null;
		// }).catch((res) => {
		// 	console.dir(res);
		// 	return null;
		// });
		//
		// return {
		// 	metatags
		// }
	},
	computed: {
		...mapState('locations', {
			locations: 'locations',
			locationsCount: 'locationsCount',
		}),
		...mapState('transport', {
			transports: 'transports',
			transportsCount: 'transportsCount',
		}),
		componentName() {
			switch (this.activeTab) {
				case 'locations':
					return 'ObjectsList';
				case 'transport':
					return 'TransportsList';
				case 'game':
					return 'TransportGameInfo';
				default:
					return null;
			}
		},
		objects() {
			switch (this.activeTab) {
				case 'locations':
					return this.locations;
				case 'transport':
					return this.transports;
				default:
					return [];
			}
		},
		count() {
			switch (this.activeTab) {
				case 'locations':
					return this.locationsCount;
				case 'transport':
					return this.transportsCount;
				default:
					return 0;
			}
		}
	},
	methods: {
		checkListPosition() {
			const bottomOffset = window.pageYOffset + this.$refs.list.getBoundingClientRect().top;
			const windowBottom = window.pageYOffset + document.documentElement.clientHeight;
			return bottomOffset < windowBottom;
		},
		onScroll() {
			this.isListVisible = true;
			window.removeEventListener('scroll', this.onScroll);
		},
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
		this.isListVisible = this.checkListPosition();
		if (!this.isListVisible) {
			window.addEventListener('scroll', this.onScroll);
		}
	},
	beforeDestroy() {
		if (!this.isListVisible) {
			window.removeEventListener('scroll', this.onScroll);
		}
	}
}
</script>
