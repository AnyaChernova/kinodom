<template>
	<div class="_SwiperList">
		<client-only>
			<swiper :options="optionsSlider">
				<swiper-slide class="swiperList" :class="slideClass">
					<slot></slot>
				</swiper-slide>
			</swiper>
		</client-only>
	</div>
</template>

<script>

export default {
	name: "SwiperList",
	props: {
		slideClass: {
			type: String,
			default: ''
		},
	},
	components: {
	},
	data() {
		return {
			optionsSlider: {
				slidesPerView: 'auto',
				resistance: true,
				resistanceRatio: 0,
				freeMode: true,
				freeModeMomentumBounce: false,
			},
		}
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


