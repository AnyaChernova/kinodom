<template>
	<div class="_FavoritesPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title content__title--l">
			<h1 class="title">Избранное</h1>
		</div>
		<ObjectsFavoriteList :favorites="favorites" @delete="onDelete" v-if="favorites.length"/>
		<DummyBox v-else title="У вас пока нет избранных объектов"/>
	</div>
</template>

<script>

import DummyBox from "~/components/_block/DummyBox";
import ObjectsFavoriteList from "~/components/objects/ObjectsFavoriteList";
import seoCore from "~/utils/seoCore";

export default {
	name: "FavoritesPage",
	middleware: ['auth'],
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'Избранное',
		}, this)
	},
	props: {},
	components: {ObjectsFavoriteList, DummyBox},
	data() {
		return {}
	},
	async asyncData({app}) {
		const locations = app.$repositories.favorite.all().then((res) => {
			return res.data.favorites || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});

		const transport = app.$repositories.favorite.allTransport().then((res) => {
			return res.data.favorites || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});

		return await Promise.all([
			locations,
			transport,
		]).then(([locations, transport]) => ({
			locations,
			transport,
		}));
	},
	computed: {
		favorites() {
			return [
				...this.locations.map(({location}) => location),
				...this.transport.map(({transport}) => transport)
			];
		}
	},
	methods: {
		onDelete(data) {
			if (data.locationID) {
				this.deleteLocation(data.locationID);
			} else if (data.transportID) {
				this.deleteTransport(data.transportID);
			}
		},
		deleteLocation(locationID) {
			const index = this.locations.findIndex(({location}) => location.l_id === locationID);
			if (index !== -1) {
				this.locations.splice(index, 1);
			}
		},
		deleteTransport(transportID) {
			const index = this.transport.findIndex(({transport}) => transport.t_id === transportID);
			if (index !== -1) {
				this.transport.splice(index, 1);
			}
		},
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	}
}
</script>
