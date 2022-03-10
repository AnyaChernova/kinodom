<template>
	<div class="ObjectCardList">
		<button class="cardPanel cardPanel--list" v-for="location in locations" :key="location.id"
						@click="onClick(location.id)">
			<div class="cardPanel__pic" v-if="location.gallery.main.photo">
				<img class="lazyLoad" :data-src="location.gallery.main.photo" :alt="location.title" v-lazy-load>
			</div>
			<div class="cardPanel__content">
				<h2 class="title-s">{{ location.title }}</h2>
				<div class="d-flex items-center text-icon mt-8">
					<v-svg name="house" w="10" h="10" class="mr-8"/>
					<span>{{ getAddress(location) }}</span>
				</div>
				<div class="d-flex items-center justify-between mt-8">
					<div :class="`price price--rub price-${+location.price_type + 1} mr-m`">
						<span>₽</span>
						<span>₽</span>
						<span>₽</span>
						<span>₽</span>
					</div>
				</div>
			</div>
		</button>
	</div>
</template>

<script>

export default {
	name: "ObjectCardList",
	props: {
		locations: {
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
		onClick(locationID) {
			this.$emit('open', locationID);
		},
		getAddress(location) {
			if (location.district) {
				return `${location.district.region.region}, ${location.district.district}`;
			} else {
				return '';
			}
		},
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	},
}
</script>
