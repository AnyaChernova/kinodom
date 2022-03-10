<template>
	<div class="_RentRequestModal popup popup--bottom">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout">
			<SupportRentForm
				:location-i-d="locationID"
				:transport-i-d="transportID"
				:type="type"
				:theme="theme"
				@success="$close(true)"/>
		</div>
	</div>
</template>
<script>

import SupportRentForm from "~/components/support/SupportRentForm";
export default {
	name: "RentRequestModal",
	props: {
		locationID: {
			type: Number,
			default: 0
		},
		transportID: {
			type: Number,
			default: 0
		},
		type: {
			type: String,
			default: 'location'
		},
		theme: {
			type: Object,
			default: () => {
				return {
					theme_id: 6,
					theme: 'Запрос на аренду'
				}
			}
		},
	},
	components: {SupportRentForm},
	data() {
		return {}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
