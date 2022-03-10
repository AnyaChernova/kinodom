<script>
export default {
	name: "GoogleDraggableMarker",
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
				return {
					latitude: 55.76,
					longitude: 37.64,
				}
			},
		},
		icon: {
			type: String,
			default: '',
		},
	},
	components: {},
	data() {
		return {
			marker: null,
		}
	},
	computed: {
		markerImage() {
			return this.icon ? this.icon : `${this.$store.state.env.BASE_HOST}/svg/pin-precice.svg`;
		},
	},
	methods: {
		setMarker() {
			this.marker = new google.maps.Marker({
				position: { lat: this.position.latitude, lng: this.position.longitude },
				map: this.map,
				draggable:true,
				icon: {
					url: this.markerImage,
				},
			});
			this.marker.addListener("dragend", this.onSetPosition);
		},
		onSetPosition() {
			this.$emit('move', this.marker.getPosition());
		},
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
		if (this.map) {
			this.setMarker();
		}
	},
}
</script>


