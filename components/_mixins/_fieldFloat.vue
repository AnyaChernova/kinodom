<script>
export default {
	name: "FieldFloat",
	data() {
		return {
			isControlFocus: false
		}
	},
	computed: {
		isFloating() {
			return Boolean(this.innerModel) || this.isControlFocus || this.isActive;
		},
		controlListeners() {
			return {
				...this.$listeners,
				focus: (evt) => {
					this.$emit('focus', evt);
					this.isControlFocus = true;
				},
				blur: (evt) => {
					this.$emit('blur', evt);
					this.isControlFocus = false;
				},
			}
		},
	},
	methods: {},
	mounted() {

	},
}
</script>
