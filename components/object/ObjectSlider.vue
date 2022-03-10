<template>
	<div class="_ObjectSlider">
		<client-only>
			<swiper :options="optionsSlider" :cleanup-styles-on-destroy="false" class="slider slider--pics">
				<swiper-slide class="slider__pic hover"
											@click.native="onPictureClick(i)"
											:class="{'slider__pic--s': i % 2 !== 0}"
											v-for="(picture, i) in pictures" :key="i">
					<img :data-src="picture.photo" alt="location picture" class="swiper-lazy">
					<div class="swiper-lazy-preloader"></div>
				</swiper-slide>
				<button class="btnSwiper slider__btn slider__btn--prev" slot="button-prev">
					<v-svg name="arrow_back" w="24" h="24"/>
				</button>
				<button class="btnSwiper slider__btn slider__btn--next" slot="button-next">
					<v-svg name="arrow_right" w="24" h="24"/>
				</button>
			</swiper>
		</client-only>
	</div>
</template>

<script>

export default {
	name: "ObjectSlider",
	props: {
		gallery: {
			type: Array,
			default: () => []
		},
		main: {
			type: Object,
			default: () => {
				return null
			}
		},
	},
	components: {
	},
	data() {
		return {
			optionsSlider: {
				slidesPerView: 1,
				preloadImages: false,
				lazy: true,
				watchSlidesVisibility: true,
				spaceBetween: 16,
				navigation: {
					nextEl: '.slider__btn--next',
					prevEl: '.slider__btn--prev'
				},
				breakpoints: {
					640: {
						slidesPerView: 'auto',
					}
				}
			},
		}
	},
	computed: {
		pictures() {
			const gallery = [...this.gallery];
			if (this.main) {
				gallery.unshift(this.main);
			}
			return gallery;
		}
	},
	methods: {
		onPictureClick(i) {
			this.$loadModal('GalleryModal', {isFull: true, lock: true, pictures: this.pictures, slideToIndex: i});
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


