<template>
	<div class="ObjectCardPanel cardPanel">
		<div class="cardPanel__addons s:hidden">
			<v-btn icon class="--c-white --m --radius" @click="onCloseClick">
				<v-svg name="close_s" w="12" h="12"/>
			</v-btn>
			<v-btn icon class="--c-white --m --radius mr-8 ml-auto s:hidden" @click="onShareClick">
				<v-svg name="share" w="16" h="16"/>
			</v-btn>
			<v-btn icon class="--c-white --m --radius mr-8 ml-auto from-s:hidden" @click="onShareMobClick">
				<v-svg name="share" w="16" h="16"/>
			</v-btn>
			<v-btn icon class="--c-white --m --radius" @click="onClickDelete" v-if="isFavorite">
				<v-svg name="heart-fill" w="17" h="15"/>
			</v-btn>
			<v-btn icon class="--c-white --m --radius" @click="onClickAdd" v-else>
				<v-svg name="heart" w="17" h="15"/>
			</v-btn>
		</div>
		<CardSlider class="cardPanel__pic s:hidden"
								v-if="pictures.length"
								:pictures="pictures"/>
		<div class="cardPanel__pic from-s:hidden" v-if="location.gallery.main.photo">
			<img :src="location.gallery.main.photo" :alt="location.title">
		</div>
		<div class="cardPanel__content" v-scrollBox>
			<div class="cells --gap-card">
				<div class="cell w-12/12">
					<h2 class="title-m">{{ location.title }}</h2>
				</div>
				<div class="cell w-12/12" v-if="address">
					<div class="d-flex items-center text-icon">
						<v-svg name="house" w="10" h="10" class="mr-8"/>
						<span>{{ address }}</span>
					</div>
				</div>
				<div class="cell w-12/12">
					<div class="d-flex items-center justify-between">
						<div :class="`price price--rub price-${+location.price_type + 1} mr-m`">
							<span>₽</span>
							<span>₽</span>
							<span>₽</span>
							<span>₽</span>
						</div>
					</div>
				</div>
<!--				<div class="cell w-6/12 s:hidden">-->
<!--					<div class="title-s mb-10">Статус:</div>-->
<!--					<v-badge :color="locationsStatus[location.status.code].statusColor">-->
<!--						{{ location.status.text }}-->
<!--					</v-badge>-->
<!--				</div>-->
				<div class="cell w-6/12 s:hidden" v-if="location.square">
					<div class="title-s mb-8">Площадь:</div>
					<div class="fz-18">{{ location.square }}&nbsp;м&sup2;</div>
				</div>
				<div class="cell w-6/12 s:hidden" v-if="location.stage">
					<div class="title-s mb-8">Этаж:</div>
					<div class="fz-18">{{ location.stage }}</div>
				</div>
				<div class="cell w-6/12 s:hidden" v-if="rooms.length">
					<div class="title-s mb-8">Помещений:</div>
					<div class="fz-18">{{ rooms.length }}</div>
				</div>
				<div class="cell w-6/12 s:hidden" v-if="location.parking">
					<div class="title-s mb-8">До парковки:</div>
					<div class="fz-18">{{ location.parking }}&nbsp;м</div>
				</div>
				<div class="cell w-6/12 s:hidden" v-if="location.max_rent">
					<div class="title-s mb-8">Срок аренды:</div>
					<div class="fz-18">до&nbsp;{{ location.max_rent }}&nbsp;дней</div>
				</div>
				<div class="cell w-12/12 s:hidden">
					<div class="line"></div>
				</div>
				<div class="cell w-12/12 s:hidden" v-if="location.types.length">
					<div class="title-s mb-8">Тип локации</div>
					<div class="tagRow text-brand">
							<span class="tag" v-for="locationType in location.types" :key="locationType.id">
								{{ locationType.type.type }}
							</span>
					</div>
				</div>
				<div class="cell w-12/12 s:hidden" v-if="location.styles.length">
					<div class="title-s mb-8">Стиль пространства</div>
					<div class="tagRow text-brand">
							<span class="tag" v-for="locationStyle in location.styles" :key="locationStyle.id">
								{{ locationStyle.style.style }}
							</span>
					</div>
				</div>
			</div>
		</div>
		<div class="cardPanel__footer">
			<div class="cells --gap-btn --line items-center" v-if="!$auth.user || $store.getters.isRenter">
				<div class="cell w-6/12">
					<v-btn class="w-full" @click="onRentClick">Арендовать</v-btn>
				</div>
				<div class="cell w-6/12">
					<nuxt-link :to="`locations/${location.id}`" class="btn --simple w-full s:hidden">Подробнее</nuxt-link>
					<nuxt-link :to="`locations/${location.id}`" class="btn --outline w-full from-s:hidden">Подробнее</nuxt-link>
				</div>
			</div>
			<nuxt-link :to="`locations/${location.id}`" class="btn --outline w-full" v-else>Подробнее</nuxt-link>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import CardSlider from "~/components/card/CardSlider";
import VBadge from "~/components/_uikit/VBadge";
import {mapActions, mapState} from "vuex";

export default {
	name: "ObjectCardPanel",
	props: {
		location: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {VBadge, CardSlider, VBtn},
	data() {
		return {
			isFavorite: this.location.is_favorite
		}
	},
	computed: {
		...mapState({
			locationsStatus: 'locationsStatus',
		}),
		address() {
			if (this.location.district) {
				return `${this.location.district.region.region}, ${this.location.district.district}`;
			} else {
				return '';
			}
		},
		pictures() {
			if (this.location.gallery.main.photo) {
				const additionals = this.location.gallery.additional.map(({photo}) => photo);
				return [this.location.gallery.main.photo, ...additionals];
			} else {
				return []
			}
		},
		rooms() {
			return this.location.rooms ? JSON.parse(this.location.rooms) : []
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
					await this.addToFavorite(this.location.l_id).then(() => {
						this.isFavorite = true;
						this.$snotify.success('Добавлено в избранное');
					}).catch(() => {
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
				await this.deleteFromFavorite(this.location.l_id).then(() => {
					this.isFavorite = false;
					this.$snotify.success('Удалено из избранного');
				}).catch(() => {
				});
			}, 300);
		},
		onCloseClick() {
			this.$emit('close');
		},
		onRentClick() {
			this.$loadModal('RentRequestModal', {locationID: this.location.l_id, isFull: true, lock: true});
		},
		onShareClick() {
			this.$loadModal('SocialShareModal', {
				isSmall: true,
				isBottom: true,
			})
		},
		onShareMobClick() {
			if (navigator.share) {
				navigator.share({
					title: this.location.seo_title || this.location.title,
					text: this.location.seo_description || void(0),
					url: window.location.href
				}).then(() => {
				}).catch(err => {
					console.log(err);
				});
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
