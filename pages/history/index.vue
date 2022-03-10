<template>
	<div class="_HistoryPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title">
			<h1 class="title">
				<template v-if="$store.getters.isRenter">История съемок</template>
				<template v-else>История аренды</template>
			</h1>
		</div>
		<div class="box">
			<div class="box__header">
				<div class="tabsWrap">
					<TabsControl :tabs="tabs" v-model="activeTab"/>
				</div>
			</div>
		</div>
		<ObjectsHistoryList :orders="orders" :status="activeTab" v-if="orders.length"/>
		<DummyBox v-else :title="ordersStatus[activeTab].emptyError"/>
	</div>
</template>

<script>

import ObjectsHistoryList from "~/components/objects/ObjectsHistoryList";
import {mapState} from "vuex";
import DummyBox from "~/components/_block/DummyBox";
import seoCore from "~/utils/seoCore";
import TabsControl from "~/components/_block/TabsControl";

export default {
	name: "HistoryPage",
	middleware: ['auth'],
	scrollToTop: true,
	watchQuery: true,
	head() {
		return seoCore({
			title: 'История',
		}, this)
	},
	props: {},
	components: {TabsControl, DummyBox, ObjectsHistoryList},
	data() {
		return {}
	},
	async asyncData({app, query}) {
		const locations = app.$repositories.history.all(query.filterStatus).then((res) => {
			return res.data.orders || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});

		const transport = app.$repositories.history.transport(query.filterStatus).then((res) => {
			return res.data.orders || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});

		return await Promise.all([
			locations,
			transport,
		]).then(([locations, transport]) => ({
			orders: [...locations, ...transport]
		}));
	},
	computed: {
		...mapState({
			ordersStatus: 'ordersStatus',
		}),
		tabs() {
			return Object.keys(this.ordersStatus).map((key) => {
				return {
					title: this.ordersStatus[key].title,
					value: key,
				}
			})
		},
		activeTab: {
			get() {
				return this.$route.query.filterStatus || '0';
			},
			set(val) {
				let query;
				if (+val) {
					query = {filterStatus: val};
				} else {
					query = {}
				}
				this.$router.replace({query: query}).catch(()=>{});
			}
		}
	},
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
