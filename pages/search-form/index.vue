<template>
	<div class="_SearchFormPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title d-flex justify-between">
			<h1 class="title">Анкета на поиск</h1>
			<v-btn simple class="ml-10 m:mr-m" @click="$loadModal('SearchFormFaqModal', {isFull: true, lock: true})">
				<v-svg name="help" w="24" h="24"/>
				<span class="ml-8 xs:hidden">faq</span>
			</v-btn>
		</div>
		<div class="box">
			<div class="cells --gap">
				<div class="cell w-12/12">
					<div class="mb-10">
						<div class="tabsWrap tabsWrap--center">
							<TabsControl :tabs="tabs" v-model="activeTab"/>
						</div>
					</div>
				</div>
				<div class="cell w-2/12 l:hidden"></div>
				<div class="cell w-8/12 l:w-12/12">
					<keep-alive>
						<component :is="componentName"/>
					</keep-alive>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import seoCore from "~/utils/seoCore";
import VBtn from "~/components/_uikit/VBtn";
import TabsControl from "~/components/_block/TabsControl";

export default {
	name: "SearchFormPage",
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'Анкета на поиск',
		}, this)
	},
	props: {},
	components: {
		TabsControl,
		VBtn,
		LocationsSearchForm: () => import("~/components/locations/LocationsSearchForm"),
		TransportSearchForm: () => import("~/components/transport/TransportSearchForm"),
		},
	data() {
		return {
			activeTab: 'location',
			tabs: [
				{
					title: 'Локации',
					value: 'location',
				},
				{
					title: 'Транспорт',
					value: 'transport',
				},
			]
		}
	},
	async asyncData({app}) {
	},
	computed: {
		componentName() {
			switch (this.activeTab) {
				case 'location':
					return 'LocationsSearchForm';
				case 'transport':
					return 'TransportSearchForm';
				default:
					return null;
			}
		}
	},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {},
}
</script>
