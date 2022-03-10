<template>
	<div class="_defaultAsyncModal popup">
		<div class="popup__header">
			<div class="popup__title">Vue Modal</div>
		</div>
		<div class="popup__content">

		</div>
		<div class="popup__footer">
			<div class="cells --gap-5">
				<div class="cell">
					<button class="btn" @click="this.$close">cancel</button>
				</div>
				<div class="cell">
					<button class="btn btn--accent" @click="this.$close(true)">success</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "defaultAsyncModal",
		async: true,
		props: {},
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
			setTimeout(() => {
				this.$emit('loaded');
			}, 2000)
		}
	}
</script>
