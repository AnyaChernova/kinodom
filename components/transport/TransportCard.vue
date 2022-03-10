<template>
	<div class="_TransportCard">
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
				<div class="cardBox__img" v-if="pictures.length > 1">
					<CardSlider :pictures="pictures" navigation :thumbs="false"/>
				</div>
				<div class="cardBox__img" v-else>
					<span class="cardBox__bottom addon">1/{{ info.galleryCount }}</span>
					<img :data-src="info.picture" alt="card" class="lazyLoad" v-lazy-load>
				</div>
			</div>
			<div class="cardBox__content">
				<object>
					<a class="btn --icon --m --pic cardBox__action" href="tel:+79299359003" target="_blank" @click.stop="">
						<img data-src="/svg/call.svg" alt="call" width="40" height="40" class="lazyLoad" v-lazy-load>
					</a>
					<a class="btn --icon --m --pic cardBox__action" :href="`https://wa.me/79256715406?text=${messageText}`" target="_blank" @click.stop="">
						<img data-src="/svg/message.svg" alt="message" width="40" height="40" class="lazyLoad" v-lazy-load>
					</a>
				</object>
				<div class="cardBox__item-l text-brand">{{ typeTitle }}</div>
				<h2 class="title-s cardBox__item">{{ info.title }}</h2>
				<div class="cardBox__item d-flex items-center">
					<v-svg name="marker" w="10" h="10" class="mr-8"/>
					<!--					<span class="mr-8">1967 г.</span>-->
					<span class="mr-8">год выпуска не указан</span>
					<!--					<Rating/>-->
				</div>
				<div class="cardBox__item-l cardBox__footer">
					<div class="d-flex items-center">
						<span class="price text-brand mr-8">{{ info.price }}</span>
						<span>₽/сутки</span>
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
import {mapActions, mapState} from "vuex";

export default {
	name: "TransportCard",
	props: {
		to: {
			type: String,
			default: ''
		},
		messageText: {
			type: String,
			default: ''
		},
		transportID: {
			type: Number,
			default: 0
		},
		transportType: {
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
			favorite: this.isFavorite
		}
	},
	computed: {
		...mapState({
			transportCategory: 'categories',
		}),
		typeTitle() {
			return this.transportCategory[this.transportType] ? this.transportCategory[this.transportType].title : 'Транспорт';
		}
	},
	methods: {
		...mapActions('transport', {
			addToFavorite: 'addToFavorite',
			deleteFromFavorite: 'deleteFromFavorite',
		}),
		async onClickAdd() {
			if (this.$auth.loggedIn) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(async () => {
					this.favorite = true;
					await this.addToFavorite(this.transportID).then(() => {
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
					subTitle: 'Только зарегистрированные пользователи могут добавлять транспорт в избранное.',
				});
			}
		},
		async onClickDelete() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(async () => {
				this.favorite = false;
				this.$emit('delete', {transportID: this.transportID});
				await this.deleteFromFavorite(this.transportID).then(() => {
					this.$snotify.success('Удалено из избранного');
				}).catch(() => {
				});
			}, 300);
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
