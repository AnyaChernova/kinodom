<template>
	<div class="_SupportRequestModal popup popup--bottom">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout">
			<SupportRequestForm :request-params="requestParams" @success="$close(true)"/>
		</div>
	</div>
</template>
<script>


import SupportRequestForm from "~/components/support/SupportRequestForm";
export default {
	name: "SupportRequestModal",
	props: {
		requestParams: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {SupportRequestForm},
	data() {
		return {}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
