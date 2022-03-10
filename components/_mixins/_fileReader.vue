<script>
	export default {
		name: "FileReader",
		data() {
			return {
				fileSrc: null,
				file: null
			}
		},
		methods: {
			getSrcFromFile(file) {
				const reader = new FileReader();
				return new Promise((resolve) => {
					reader.onload = (event) => {
						resolve(event.target.result);
					};
					reader.readAsDataURL(file);
				})
			},
		},
		watch: {
			async file(newValue, oldValue) {
				if (newValue === oldValue) return;
				if (newValue) {
					this.fileSrc = await this.getSrcFromFile(newValue);
				} else {
					this.fileSrc = null;
				}
			}
		},
		async mounted() {
			if (this.file instanceof File) {
				this.fileSrc = await this.getSrcFromFile(this.file);
			}
		}
	}
</script>
