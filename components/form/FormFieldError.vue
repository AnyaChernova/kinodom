<template>
	<div class="_FormFieldError formFieldError" ref="error">
		<span class="d-block text-ellipsis ws-no-wrap" v-for="(error, i) in errors" :key="`error_${error}_${i}`">{{error}}</span>
	</div>
</template>

<script>
	export default {
		name: "FormFieldError",
		props: {
			errors: {
				type: Array,
				default() {
					return []
				}
			},
		},
		components: {},
		data() {
			return {}
		},
		computed: {},
		methods: {},
		directives: {},
		filters: {},
		watch: {},
		mounted() {
			this.$refs.error.addEventListener('click', (e) => {
				e.preventDefault();
			})
		}
	}
</script>

