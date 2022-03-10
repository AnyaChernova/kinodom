<template>
	<div class="_LocationCreatePage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link mr-8">Главная</nuxt-link>
			<v-svg name="arrow" w="24" h="25" class="mr-8"/>
			<nuxt-link to="/my-objects" class="link">Мои объекты</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title">
			<h1 class="title">Новый объект</h1>
		</div>
		<div class="box">
			<div class="cells --gap">
				<div class="cell w-2/12 l:hidden"></div>
				<div class="cell w-8/12 l:w-12/12">
					<div class="box__header box__header--m">
						<div class="tabsWrap tabsWrap--center">
							<TabsControl :tabs="tabs" v-model="activeTab"/>
						</div>
					</div>
					<keep-alive>
						<component :is="componentName" :transportType="transportType" @save="isSaved = true"/>
					</keep-alive>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import seoCore from "~/utils/seoCore";
import TabsControl from "~/components/_block/TabsControl";
import {mapState} from "vuex";

export default {
	name: "LocationCreatePage",
	middleware: ['auth'],
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'Новый объект',
		}, this)
	},
	props: {},
	components: {
		TabsControl,
		TransportForm: () => import("~/components/transport/TransportForm"),
		LocationsForm: () => import("~/components/locations/LocationsForm"),
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
					title: 'Транспорт поддержки',
					value: 'transport-support',
				},
			],
			isSaved: false
		}
	},
	asyncData() {
	},
	computed: {
		componentName() {
			switch (this.activeTab) {
				case 'location':
					return 'LocationsForm';
				case 'transport-game':
					return 'TransportForm';
				case 'transport-support':
					return 'TransportForm';
				default:
					return null;
			}
		},
		transportType() {
			switch (this.activeTab) {
				case 'transport-game':
					return 2;
				case 'transport-support':
					return 1;
				default:
					return 0;
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
	async beforeRouteLeave(to, from, next) {
		if (this.isSaved) {
			next();
		} else {
			const res = await this.$loadModal('ConfirmModal', {
				isSmall: true,
				isBottom: true,
				title: 'Отменить размещение?',
				subTitle: 'Несохраненный процесс размещения нового объекта будет потерян.',
				btnText: 'Отменить',
				btnClass: '--c-danger'
			});
			if (res) next()
			else next(false);
		}
	}
}
</script>
