<template>
	<div class="_DummyBox dummyBox">
		<div class="dummyBox__pic">
			<slot name="pic"><v-svg name="logo-l" w="167" h="128"/></slot>
		</div>
		<div class="dummyBox__title" v-if="title">{{ title }}</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "DummyBox",
	props: {
		title: {
			type: String,
			default: '',
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
	}
}
</script>


