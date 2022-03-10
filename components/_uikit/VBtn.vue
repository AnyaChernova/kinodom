<template>
	<button
		class="_DkBtn btn"
		:class="[{
		'--loading': loading && !progressLoader,
		'--progressLoading': loading && progressLoader,
		'--xSmall': xSmall,
		'--small': small,
		'--large': large,
		'--outline': outline,
		'--outline-minor': outlineMinor,
		'--simple': simple,
		'--thin': thin,
		'--outside': outside,
		'--outside5': outside5,
		'--icon': icon,
		'--full': full,
	}, color ? `--c-${color}`:'']"
		:disabled="loading || disabled"
		:type="type"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<v-spinner v-if="loading && !progressLoader" :size="xSmall ? 12 : small ? 16 : large ? 26 : 22"/>
		<span class="btn__content"><slot/></span>
	</button>
</template>

<script>
	import VSpinner from "@/components/_uikit/VSpinner";

	export default {
		name: "VBtn",
		props: {
			loading: {
				type: Boolean,
				default: false,
			},
			progressLoader: {
				type: Boolean,
				default: false,
			},
			type: {
				type: String,
				default: 'button',
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			small: {
				type: Boolean,
				default: false,
			},
			xSmall: {
				type: Boolean,
				default: false,
			},
			large: {
				type: Boolean,
				default: false,
			},
			outline: {
				type: Boolean,
				default: false,
			},
			outlineMinor: {
				type: Boolean,
				default: false,
			},
			color: {
				type: String,
				default: '',
			},
			simple: {
				type: Boolean,
				default: false,
			},
			thin: {
				type: Boolean,
				default: false,
			},
			outside: {
				type: Boolean,
				default: false,
			},
			outside5: {
				type: Boolean,
				default: false,
			},
			icon: {
				type: Boolean,
				default: false,
			},
			full: {
				type: Boolean,
				default: false,
			}
		},
		components: {VSpinner},
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
