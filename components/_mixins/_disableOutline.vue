<script>
	export default {
		name: "_disableOutline",
		props: {},
		components: {},
		computed: {
			body() {
				if (process.browser) {
					return document.querySelector('body');
				}
			}
		},
		methods: {
			bodyHandler() {
				if (!process.browser) return false;
				this.body.classList.add('disableOutline');
			},
			windowHandler(event) {
				if (!process.browser) return false;
				const TAB_KEY = 9;
				if (event.keyCode === TAB_KEY) {
					this.body.classList.remove('disableOutline');
				}
			}
		},
		mounted() {
			if (!process.browser) return false;
			this.bodyHandler();
			this.body.addEventListener('click', this.bodyHandler);
			window.addEventListener('keydown', this.windowHandler);
		},
		beforeDestroy() {
			if (!process.browser) return false;
			this.body.removeEventListener('click', this.bodyHandler);
			window.removeEventListener('keydown', this.windowHandler);
		}
	}
</script>
