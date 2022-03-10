<script>
export default {
	name: "GoogleMarker",
	render: () => null,
	props: {
		map: {
			type: Object,
			default: () => {
				return null
			},
		},
		position: {
			type: Object,
			default: () => {
				return null
			},
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		markerID: {
			type: Number,
			default: 0,
		},
		markerPrice: {
			type: String,
			default: '',
		},
		markerTitle: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: '',
		},
		iconHover: {
			type: String,
			default: '',
		}
	},
	components: {},
	data() {
		return {
			marker: null,
			circle: null
		}
	},
	computed: {
		latitude() {
			if (!String(this.position.latitude).includes('.')) return null;
			return +this.position.latitude + (Math.random() - 0.5) * 0.005;
		},
		longitude() {
			if (!String(this.position.longitude).includes('.')) return null;
			return +this.position.longitude + (Math.random() - 0.5) * 0.005;
		},
		markerPriceText() {
			return Array(+this.markerPrice + 1).fill('₽').join('');
		},
		markerImage() {
			return this.icon ? this.icon : `${this.$store.state.env.BASE_HOST}/svg/pin.svg`;
		},
		markerHoverImage() {
			return this.iconHover ? this.iconHover : `${this.$store.state.env.BASE_HOST}/svg/pin-brand.svg`;
		},
	},
	methods: {
		setMarker() {
			if (this.latitude && this.longitude) {
				this.marker = new google.maps.Marker({
					id: this.markerID,
					position: { lat: this.latitude, lng: this.longitude },
					map: this.map,
					icon: {
						url: this.isActive ? this.markerHoverImage : this.markerImage,
						anchor: new google.maps.Point(24, 24),
						labelOrigin: new google.maps.Point(24, 48),
					},
					title: this.markerTitle,
					label: {
						text: this.markerPriceText ? this.markerPriceText : void (0),
						className: 'marker-label',
						color: 'rgba(0, 0, 0, 0.5)',
						fontSize: '8px',
						fontWeight: '500',
						fontFamily: 'Roboto, sans-serif',
					}
				});

				this.addMarkerListeners();
				this.setCircle();
			}
		},
		setCircle() {
			this.circle = new google.maps.Circle({
				strokeWeight: 0,
				fillColor: "#000000",
				fillOpacity: 0.4,
				map: this.map,
				center: { lat: this.latitude, lng: this.longitude },
				radius: 500,
			});
		},
		addMarkerListeners() {
			// this.marker.addListener("mouseover", this.setActiveMarker);
			//
			// this.marker.addListener("mouseout", this.setUnActiveMarker);

			this.marker.addListener("click", this.onMarkerClick);
		},
		onMarkerClick() {
			this.map.panTo(this.marker.getPosition());
			this.$emit('open', this.marker.id);
		},
		setActiveMarker() {
			this.marker.setIcon({
				url: this.markerHoverImage,
				anchor: new google.maps.Point(24, 24),
				labelOrigin: new google.maps.Point(24, 48),
			});
		},
		setUnActiveMarker() {
			this.marker.setIcon({
				url: this.isActive ? this.markerHoverImage : this.markerImage,
				anchor: new google.maps.Point(24, 24),
				labelOrigin: new google.maps.Point(24, 48),
			});
		}
	},
	directives: {},
	filters: {},
	watch: {
		isActive(val) {
			if (this.marker) {
				this.marker.setIcon({
					url: val ? this.markerHoverImage : this.markerImage,
					anchor: new google.maps.Point(24, 24),
					labelOrigin: new google.maps.Point(24, 48),
				});
				this.map.panTo(this.marker.getPosition());
			}
		}
	},
	mounted() {
		if (this.position && this.map) {
			this.setMarker();
		}
	},
	beforeDestroy() {
		if (this.marker) {
			this.marker.setMap(null);
			this.circle.setMap(null);
		}
	}
}
</script>


