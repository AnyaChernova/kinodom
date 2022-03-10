<template>
	<div class="_Gallery slider slider--gallery" @click="onSliderClick">
		<client-only>
			<swiper :options="optionsSlider" ref="swiper" @ready="onSliderInit">
				<swiper-slide class="slider__pic" v-for="(picture, i) in pictures" :key="i">
					<img :data-src="picture.photo" alt="" class="swiper-lazy">
					<div class="swiper-lazy-preloader" v-if="i"></div>
				</swiper-slide>
				<button class="btnSwiper slider__btn slider__btn--prev" @click="showDescription = true" slot="button-prev">
					<v-svg name="arrow_back" w="24" h="24"/>
				</button>
				<button class="btnSwiper slider__btn slider__btn--next" @click="showDescription = true" slot="button-next">
					<v-svg name="arrow_right" w="24" h="24"/>
				</button>
				<div class="slider__bottom" :class="{hide: !showDescription || !description}" slot="pagination">
					<div class="slider__number"></div>
					<div class="slider__description" v-scrollBox>{{ description }}</div>
				</div>
			</swiper>
		</client-only>
	</div>
</template>

<script>

export default {
	name: "Gallery",
	props: {
		pictures: {
			type: Array,
			default: () => []
		},
		slideToIndex: {
			type: Number,
			default: 0,
		},
	},
	components: {
	},
	data() {
		return {
			swiper: null,
			showDescription: true,
			optionsSlider: {
				slidesPerView: 1,
				preloadImages: false,
				lazy: true,
				navigation: {
					nextEl: '.slider__btn--next',
					prevEl: '.slider__btn--prev'
				},
				pagination: {
					el: ".slider__number",
					type: "fraction",
				},
			},
		}
	},
	computed: {
		description() {
			if (this.swiper) {
				return this.pictures[this.swiper.activeIndex].comment
			} else {
				return '';
			}
		}
	},
	methods: {
		onSliderInit() {
			this.swiper = this.$refs.swiper.$swiper;
			if (this.slideToIndex) {
				this.swiper.slideTo(this.slideToIndex, false, false);
				this.swiper.lazy.load();
			}
		},
		onSliderClick(e) {
			if (!e.target.closest('.btnSwiper') && this.description) {
				this.showDescription = false;
			}
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


