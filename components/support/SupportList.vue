<template>
	<div class="_SupportList">
		<div class="plateCard plateCard--s plateCard--gray" v-for="support in supports" :key="support.id">
			<div class="title-xs">{{ support.theme }}</div>
			<div class="d-flex justify-between flex-wrap mt-8 text-label">
				<div class="mr-m mb-8">Ticket ID: {{ support.id }}</div>
				<div class="mb-8">{{ getDate(support) }}</div>
			</div>
			<div class="fz-18 text-gray">{{ support.info.message }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SupportList",
	props: {
		supports: {
			type: Array,
			default: () => []
		},
	},
	components: {},
	data() {
		return {}
	},
	computed: {},
	methods: {
		getDate(support) {
			const date = support.messages[0].created_at;
			const dateStr = this.$dateFns.format(new Date(date), 'dd MMM yyyy');
			const timeStr = this.$dateFns.format(new Date(date), 'HH:mm');
			return `${dateStr} / ${timeStr}`;
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


