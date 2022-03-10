<template functional>
	<div
		class="_VAlert alert"
		:class="[{
		'--danger': props.danger,
		'--info': props.info,
		'--accent': props.accent,
		'--success': props.success,
	}, data.staticClass]"
		:style="staticStyle"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<div class="alert__icon">
			<slot name="icon">
				<md-icon v-if="props.danger">warning</md-icon>
				<md-icon v-else-if="props.accent">warning</md-icon>
				<md-icon v-else-if="props.success">done_all</md-icon>
				<md-icon v-else>info</md-icon>
			</slot>
		</div>
		<div class="alert__content">
			<slot>Ошибка</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "VAlert",
		props: {
			danger: {
				type: Boolean,
				default: false,
			},
			info: {
				type: Boolean,
				default: false,
			},
			accent: {
				type: Boolean,
				default: false,
			},
			success: {
				type: Boolean,
				default: false,
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
