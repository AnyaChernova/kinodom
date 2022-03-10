<template>
	<div class="_LocationsMap">
		<GoogleMap api-key="AIzaSyC5ecBmTydCiI_8psKvlY-b6cRGh8-SYIs">
			<template #map="{map}">
				<GoogleMarker v-for="location in locations"
											:key="location.id"
											:marker-i-d="location.id"
											:map="map"
											:marker-title="location.title"
											:marker-price="location.price_type"
											:position="location.verified_address.coordinates"
											:is-active="activeLocationID === location.id"
											@open="onOpen"/>
			</template>
		</GoogleMap>
	</div>
</template>

<script>
import GoogleMap from "~/components/google/GoogleMap";
import GoogleMarker from "~/components/google/GoogleMarker";

export default {
	name: "LocationsMap",
	props: {
		locations: {
			type: Array,
			default: () => [],
		},
		activeLocationID: {
			type: Number,
			default: 0,
		},
	},
	components: {GoogleMarker, GoogleMap},
	data() {
		return {}
	},
	computed: {},
	methods: {
		onOpen(locationID) {
			this.$emit('open', locationID);
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


