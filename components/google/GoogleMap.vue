<template>
	<div class="_GoogleMap mapWrapper">
		<div class="map" ref="map"></div>
		<template v-if="gMap">
			<slot name="map" :map="gMap"></slot>
		</template>
	</div>
</template>

<script>
export default {
	name: "GoogleMap",
	props: {
		apiKey: {
			type: String,
			default: '',
		},
		mapOptions: {
			type: Object,
			default: () => {
				return {
					zoom: 10,
					zoomControl: false,
					mapTypeControl: false,
					scaleControl: false,
					streetViewControl: false,
					rotateControl: false,
					fullscreenControl: false
				}
			},
		},
		mapCenter: {
			type: Object,
			default: () => {
				return {
					lat: 55.76,
					lng: 37.64,
				}
			},
		},
	},
	components: {},
	data() {
		return {
			gMap: null,
			gBounds: null,
			isMapScriptLoaded: false,
		}
	},
	computed: {
		mapConfig() {
			return {
				...this.mapOptions,
				center: this.mapCenter
			}
		},
		url() {
			return `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
		}
	},
	methods: {
		async loadMapScript() {
			this.isMapScriptLoaded = await this.loadScript('map-js', this.url);
		},
		loadScript(id, src) {
			return new Promise(function(resolve) {
				if (document.getElementById(id)) {
					resolve(true);
					return;
				}

				const script = document.createElement('script');
				script.src = src;
				script.id = id;
				script.async = true;

				script.onerror = () => resolve(false);
				script.onload = () => {
					resolve(true);
				};

				document.head.appendChild(script);
			});
		},
		createMap() {
			this.gMap = new google.maps.Map(this.$refs.map, this.mapConfig);
		},
	},
	directives: {},
	filters: {},
	watch: {},
	async mounted() {
		if (!this.apiKey) return;
		await this.loadMapScript();
		this.createMap();
	}
}
</script>


