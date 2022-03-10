<template>
	<div class="_ObjectsHistoryList">
		<div class="cardRow" ref="grid">
			<div class="grid">
				<ObjectCard class="grid-item grid-item--l"
										v-for="order in orders"
										:key="order.order.id"
										:order-i-d="order.order.id"
										:start-date="order.order.start_at"
										:end-date="order.order.finished_at"
										type="history"
										:info="getObjectInfo(order)"/>
			</div>
		</div>
	</div>
</template>

<script>
import VBtn from "~/components/_uikit/VBtn";
import ObjectCard from "~/components/object/ObjectCard";
import {mapState} from "vuex";

export default {
	name: "ObjectsHistoryList",
	props: {
		orders: {
			type: Array,
			default: () => []
		},
		status: {
			type: String,
			default: ''
		},
	},
	components: {ObjectCard, VBtn},
	data() {
		return {}
	},
	computed: {
		...mapState({
			ordersStatus: 'ordersStatus',
		}),
	},
	methods: {
		getObjectInfo(order) {
			let info = {
				picture: '',
				status: {
					code: this.status,
					title: this.ordersStatus[this.status].statusTitle,
					statusColor: this.ordersStatus[this.status].statusColor,
				}
			}

			if (order.location) {
				info.title = order.location.title;
				if (Object.keys(order.location.gallery.main).length) {
					info.picture = order.location.gallery.main.photo;
				}
			}

			if (order.transport) {
				info.title = order.transport.title;
				if (Object.keys(order.transport.gallery.main).length) {
					info.picture = order.transport.gallery.main.photo;
				}
			}

			return info;
		},
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {},
}
</script>
