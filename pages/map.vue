<template>
	<div class="_MapPage">
		<div class="mapBox mapBox--full">
			<div class="mapBox__overlay --mob" v-if="$fetchState.pending">
				<v-spinner class="text-brand"/>
			</div>
			<div class="mapBox__overlay" v-if="!showList && $fetchState.pending">
				<v-spinner class="text-brand"/>
			</div>
			<LocationsMap class="mapBox__map"
										:class="{'mapBox__map--left': showList}"
										:locations="locations"
										:active-location-i-d="activeLocationID"
										@open="openPanel"/>
			<div class="asidePanel asidePanel--list open s:hidden" v-if="showList">
				<div class="text-center" v-if="$fetchState.pending">
					<v-spinner class="text-brand"/>
				</div>
				<div class="asidePanel__inner" v-scrollBox v-else>
					<div class="title-s">Найдено: {{ count }}</div>
					<ObjectCardList :locations="locations" @open="openPanel"/>
				</div>
			</div>
			<div class="asidePanel" :class="{'asidePanel--left': showList, open: isPanelOpen}">
				<v-btn icon class="asidePanel__close text-dark --m" @click="closePanel">
					<v-svg name="close_s" w="12" h="12"/>
				</v-btn>
				<ObjectCardPanel :location="location" :key="location.id" v-if="location" @close="closePanel"/>
			</div>
		</div>
	</div>
</template>

<script>

import ObjectCardPanel from "~/components/object/ObjectCardPanel";
import LocationsMap from "~/components/locations/LocationsMap";
import VBtn from "~/components/_uikit/VBtn";
import ObjectCardList from "~/components/object/ObjectCardList";
import {mapState} from "vuex";
import seoCore from "~/utils/seoCore";
import VSpinner from "~/components/_uikit/VSpinner";

export default {
	name: "MapPage",
	scrollToTop: true,
	watchQuery: true,
	layout: 'full',
	head() {
		return seoCore({
			title: 'Карта локаций',
		}, this)
	},
	props: {},
	components: {VSpinner, ObjectCardList, VBtn, LocationsMap, ObjectCardPanel},
	data() {
		return {
			isPanelOpen: false,
			location: null
		}
	},
	asyncData({store}) {
		store.dispatch('locations/clearLocations');
	},
	async fetch() {
		await this.$store.dispatch('locations/fetchLocations', {query: this.$route.query, all: 1});
	},
	fetchOnServer: false,
	computed: {
		...mapState('locations', {
			locations: 'locations',
			count: 'locationsCount',
		}),
		showList() {
			return this.$route.query.search || this.$route.query.filterParams;
		},
		activeLocationID() {
			return this.location ? this.location.id : 0;
		}
	},
	methods: {
		closePanel() {
			this.isPanelOpen = false;
			this.location = null;
		},
		openPanel(locationID) {
			const location = this.locations.find(({id}) => +id === +locationID);
			if (location) {
				this.location = location;
				this.isPanelOpen = true;
			}
		},
	},
	directives: {},
	filters: {},
	watch: {
		'$route.query'() {
			this.isPanelOpen = false;
			this.$fetch();
		},
	},
	beforeMount() {
		this.$dScroll.disableGlobalScroll();
	},
	mounted() {
		if (this.$route.query.locationID) {
			this.openPanel(this.$route.query.locationID);
		}
	},
	beforeDestroy() {
		this.$dScroll.enableGlobalScroll();
	}
}
</script>
