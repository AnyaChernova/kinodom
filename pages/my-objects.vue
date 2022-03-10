<template>
	<div class="_MyObjectsPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="cells --gap-s box box--m">
			<div class="cell w-8/12 m-12/12">
				<h1 class="title">Мои объекты</h1>
			</div>
			<div class="cell w-4/12 m:hidden">
				<nuxt-link to="/create" class="btn w-full">Новый объект</nuxt-link>
			</div>
		</div>
		<div class="box box--l box--m box--adaptive">
			<div class="tabsWrap">
				<TabsControl :tabs="tabs" v-model="activeTab"/>
			</div>
		</div>
		<div class="box box--l box--adaptive">
			<ObjectsMyList :objects="objects" @updateList="fetchObjects" v-if="objects.length"/>
			<DummyBox v-else :title="locationsStatus[activeTab].emptyError"/>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import ObjectsMyList from "~/components/objects/ObjectsMyList";
import {mapState} from "vuex";
import DummyBox from "~/components/_block/DummyBox";
import seoCore from "~/utils/seoCore";
import TabsControl from "~/components/_block/TabsControl";

export default {
	name: "MyObjectsPage",
	middleware: ['auth'],
	scrollToTop: true,
	watchQuery: true,
	head() {
		return seoCore({
			title: 'Мои объекты',
		}, this)
	},
	props: {},
	components: {TabsControl, DummyBox, ObjectsMyList, VBtn},
	data() {
		return {}
	},
	async asyncData({app, query}) {
		const locations = app.$repositories.locations.my(query.filterStatus).then((res) => {
			return res.data.locations || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});

		const transport = app.$repositories.transport.my(query.filterStatus).then((res) => {
			return res.data.transports || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});

		return await Promise.all([
			locations,
			transport,
		]).then(([locations, transport]) => ({
			objects: [...locations, ...transport]
		}));
	},
	computed: {
		...mapState({
			locationsStatus: 'locationsStatus',
		}),
		tabs() {
			return Object.keys(this.locationsStatus).slice(0, 4).map((key) => {
				return {
					title: this.locationsStatus[key].title,
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
	methods: {
		async fetchObjects() {
			const locations = this.$repositories.locations.my(this.$route.query.filterStatus).then((res) => {
				return res.data.locations || [];
			}).catch((res) => {
				console.dir(res);
				return [];
			});

			const transport = this.$repositories.transport.my(this.$route.query.filterStatus).then((res) => {
				return res.data.transports || [];
			}).catch((res) => {
				console.dir(res);
				return [];
			});

			this.objects =  await Promise.all([
				locations,
				transport,
			]).then(([locations, transport]) => [...locations, ...transport]);
		}
	},
	directives: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {}
}
</script>
