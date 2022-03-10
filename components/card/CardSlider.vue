<template>
	<div class="_CardSlider cardSlider">
		<span class="addon cardSlider__number" v-if="swiper">{{ swiper.activeIndex + 1 }}/{{ pictures.length }}</span>
		<client-only>
			<swiper
				:options="optionsSlider"
				ref="swiper"
				class="slider slider--card"
				@ready="onSliderInit"
				v-if="thumbSliderInit || !thumbs">
				<swiper-slide class="slider__pic" v-for="(src, i) in pictures" :key="i">
					<template v-if="i">
						<img :data-src="src" alt="" class="swiper-lazy">
						<div class="swiper-lazy-preloader"></div>
					</template>
					<img :data-src="src" alt="" class="lazyLoad" v-lazy-load v-else>
				</swiper-slide>
				<template v-if="navigation">
					<button class="btnSwiper slider__btn slider__btn--prev" slot="button-prev" @click.prevent="">
						<v-svg name="arrow_back" w="16" h="16"/>
					</button>
					<button class="btnSwiper slider__btn slider__btn--next" slot="button-next" @click.prevent="">
						<v-svg name="arrow_right" w="16" h="16"/>
					</button>
				</template>
			</swiper>
			<swiper ref="thumbSwiper" class="cardSlider__bottom" :options="optionsThumbSlider" @ready="onSliderThumbsInit" v-if="thumbs">
				<swiper-slide class="cardSlider__bottomItem" v-for="(src, i) in pictures" :key="i"></swiper-slide>
			</swiper>
		</client-only>
	</div>
</template>

<script>

export default {
	name: "CardSlider",
	props: {
		pictures: {
			type: Array,
			default: () => []
		},
		thumbs: {
			type: Boolean,
			default: true
		},
		navigation: {
			type: Boolean,
			default: false
		},
	},
	components: {},
	data() {
		return {
			swiper: null,
			optionsSlider: {
				slidesPerView: 1,
				preloadImages: false,
				loadPrevNext: true,
				lazy: true,
				spaceBetween: 16,
				navigation: {
					nextEl: '.slider__btn--next',
					prevEl: '.slider__btn--prev'
				},
				breakpoints: {
					640: {
						allowTouchMove: false,
					},
				}
			},
			optionsThumbSlider: {
				spaceBetween: 8,
				slidesPerView: 5,
			},
			thumbSliderInit: false
		}
	},
	computed: {},
	methods: {
		onSliderInit() {
			this.swiper = this.$refs.swiper.$swiper;
			this.swiper.on('slideChangeTransitionStart', this.onSlideStartChange);
		},
		onSliderThumbsInit() {
			this.optionsSlider.thumbs = {swiper: this.$refs.thumbSwiper.$swiper, autoScrollOffset: 1};
			this.thumbSliderInit = true;
		},
		onSlideStartChange() {
			this.$emit('slideChange');
			this.swiper.off('slideChangeTransitionStart', this.onSlideStartChange);
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


