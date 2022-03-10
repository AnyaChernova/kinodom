<template>
	<div class="_LocationCard">
		<component :is="to ? 'nuxt-link' : 'div'" :to="to" class="cardBox">
			<div class="cardBox__back" :class="{'cardBox__back--s': $store.getters.isOwner}">
				<template v-if="!$auth.user || $store.getters.isRenter">
					<v-btn outline>Арендовать</v-btn>
				</template>
			</div>
			<div class="cardBox__pic">
				<template v-if="!$auth.user || $store.getters.isRenter">
					<button class="cardBox__top addon addon--circle addon--fav" @click.prevent="onClickDelete" v-if="favorite">
						<v-svg name="heart-fill" w="19" h="17"/>
					</button>
					<button class="cardBox__top addon addon--circle addon--fav" @click.prevent="onClickAdd" v-else>
						<v-svg name="heart" w="19" h="17"/>
					</button>
				</template>
				<div class="cardBox__img" ref="image" :lazy-background="info.picture" v-if="lazy">
					<CardSlider :pictures="pictures" navigation :thumbs="false" @slideChange="onSlideChange" v-if="isSlider"/>
					<span class="cardBox__bottom addon" v-else>1/{{ info.galleryCount }}</span>
				</div>
				<div class="cardBox__img" v-else>
					<CardSlider :pictures="pictures" navigation :thumbs="false"/>
				</div>
			</div>
			<div class="cardBox__content">
				<object class="cardBox__action">
					<a class="btn --icon --m --pic cardBox__action" href="tel:+79299359003" target="_blank" @click.stop="">
						<img data-src="/svg/call.svg" alt="call" width="40" height="40" class="lazyLoad" v-lazy-load>
					</a>
					<a class="btn --icon --m --pic cardBox__action" :href="`https://wa.me/79256715406?text=${messageText}`" target="_blank" @click.stop="">
						<img data-src="/svg/message.svg" alt="message" width="40" height="40" class="lazyLoad" v-lazy-load>
					</a>
				</object>
				<div class="cardBox__item-l text-brand">Локация</div>
				<h2 class="title-s cardBox__item">{{ info.title }}</h2>
				<div class="cardBox__item d-flex items-center text-icon">
					<v-svg name="house" w="10" h="10" class="mr-8"/>
					<span>{{ address }}</span>
				</div>
				<div class="cardBox__item-l cardBox__footer">
					<div :class="`price price--rub price-${+info.priceType + 1}`">
						<span>₽</span>
						<span>₽</span>
						<span>₽</span>
						<span>₽</span>
					</div>
				</div>
			</div>
		</component>
	</div>
</template>

<script>

import Rating from "~/components/_block/Rating";
import VBtn from "~/components/_uikit/VBtn";
import VBadge from "~/components/_uikit/VBadge";
import CardSlider from "~/components/card/CardSlider";
import {mapActions} from "vuex";

export default {
	name: "LocationCard",
	props: {
		to: {
			type: String,
			default: ''
		},
		messageText: {
			type: String,
			default: ''
		},
		locationID: {
			type: Number,
			default: 0
		},
		isFavorite: {
			type: Boolean,
			default: false
		},
		pictures: {
			type: Array,
			default: () => []
		},
		info: {
			type: Object,
			default: () => {
				return {}
			}
		},
		lazy: {
			type: Boolean,
			default: true
		},
	},
	components: {
		CardSlider,
		VBadge,
		VBtn,
		Rating
	},
	data() {
		return {
			timeout: null,
			favorite: this.isFavorite,
			isSlider: false,
		}
	},
	computed: {
		address() {
			if (this.info.district) {
				return `${this.info.district.region.region}, ${this.info.district.district}`;
			} else {
				return '';
			}
		}
	},
	methods: {
		...mapActions('locations', {
			addToFavorite: 'addToFavorite',
			deleteFromFavorite: 'deleteFromFavorite',
		}),
		async onClickAdd() {
			if (this.$auth.loggedIn) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(async () => {
					this.favorite = true;
					await this.addToFavorite(this.locationID).then(() => {
						this.$snotify.success('Добавлено в избранное');
					}).catch(() => {
						this.favorite = false;
					});
				}, 300);
			} else {
				this.$loadModal('AuthCheckModal', {
					isSmall: true,
					isBottom: true,
					title: 'Добавить в избранное',
					subTitle: 'Только зарегистрированные пользователи могут добавлять локации в избранное.',
				});
			}
		},
		async onClickDelete() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(async () => {
				this.favorite = false;
				this.$emit('delete', {locationID: this.locationID});
				await this.deleteFromFavorite(this.locationID).then(() => {
					this.$snotify.success('Удалено из избранного');
				}).catch(() => {
				});
			}, 300);
		},
		onScroll() {
			const isImageVisible = this.checkImagePosition();
			if (isImageVisible) {
				this.isSlider = true;
				window.removeEventListener('scroll', this.onScroll);
			}
		},
		checkImagePosition() {
			const bottomOffset = window.pageYOffset + this.$refs.image.getBoundingClientRect().top;
			const windowBottom = window.pageYOffset + document.documentElement.clientHeight;
			return bottomOffset < windowBottom;
		},
		onSlideChange() {
			this.$refs.image.style.backgroundImage = '';
		}
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
		if (process.browser && this.lazy) {
			window.addEventListener('scroll', this.onScroll);
		}
	},
	beforeDestroy() {
		if (this.lazy) {
			window.removeEventListener('scroll', this.onScroll);
		}
	}
}
</script>
