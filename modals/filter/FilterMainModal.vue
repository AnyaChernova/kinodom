<template>
	<div class="_FilterMainModal popup popup--fix filterPanel">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout popup__wrap">
			<div class="popup__header">
				<div class="title-l">Фильтры</div>
			</div>
			<div class="popup__header" v-if="$route.path !== '/map'">
				<div class="tabsWrap">
					<TabsControl :tabs="tabs" v-model="activeTab"/>
				</div>
			</div>
			<keep-alive>
				<component :is="componentName" @apply="$close(true)"/>
			</keep-alive>
		</div>
	</div>
</template>
<script>

import VBtn from "~/components/_uikit/VBtn";
import LocationsFilter from "~/components/locations/LocationsFilter";
import TransportFilter from "~/components/transport/TransportFilter";
import TabsControl from "~/components/_block/TabsControl";

export default {
	name: "FilterMainModal",
	props: {},
	components: {
		TabsControl,
		LocationsFilter: () => import("~/components/locations/LocationsFilter"),
		TransportFilter: () => import("~/components/transport/TransportFilter"),
		VBtn,
	},
	data() {
		return {
			activeTab: this.$route.name === 'transport' ? 'transport' : 'location',
			tabs: [
				{
					title: 'Локации',
					value: 'location',
				},
				{
					title: 'Транспорт',
					value: 'transport',
				},
			]
		}
	},
	methods: {},
	computed: {
		componentName() {
			switch (this.activeTab) {
				case 'location':
					return 'LocationsFilter';
				case 'transport':
					return 'TransportFilter';
				default:
					return null;
			}
		}
	},
	mounted() {}
}
</script>
