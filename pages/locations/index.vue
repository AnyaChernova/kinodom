<template>
	<div class="_LocationsPage">
		<div class="layout">
			<div class="box box--s box--adaptive"></div>
			<div class="box box--s box--adaptive">
				<LocationsSearchResult/>
			</div>
		</div>
	</div>
</template>

<script>

import LocationsSearchResult from "~/components/locations/LocationsSearchResult";
import seoCore from "~/utils/seoCore";

export default {
	name: "LocationsPage",
	scrollToTop: true,
	watchQuery: true,
	layout: 'search',
	head() {
		return seoCore({
			title: 'Кинодом',
		}, this)
	},
	props: {},
	components: {LocationsSearchResult},
	data() {
		return {}
	},
	async asyncData({store, query}) {
		await store.dispatch('locations/fetchLocations', {query});
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
