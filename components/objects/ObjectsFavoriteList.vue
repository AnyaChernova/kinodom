<template>
	<div class="_ObjectsFavoriteList">
		<div class="cardRow box" ref="grid">
				<div class="grid">
					<div class="grid__item" v-for="favorite in favorites" :key="favorite.id">
						<LocationCard	v-if="favorite.l_id"
													 :lazy="false"
													:location-i-d="favorite.l_id"
													:to="`/locations/${favorite.id}`"
													:is-favorite="favorite.is_favorite"
													 :pictures="getPictures(favorite.gallery)"
													:info="{
														picture: favorite.gallery.main.photo,
														title: favorite.title,
														district: favorite.district,
														reviews: favorite.reviews.length,
														priceType: favorite.price_type,
														galleryCount: favorite.gallery.additional.length + 1
													}"
													@delete="onClickDeleteLocation"
						/>
						<TransportCard v-if="favorite.t_id"
													 :transport-i-d="favorite.t_id"
													 :to="`/transport/${favorite.id}`"
													 :is-favorite="favorite.is_favorite"
													 :pictures="getPictures(favorite.gallery)"
													 :transport-type="favorite.type"
													 :info="{
															picture: favorite.gallery.main.photo,
															title: favorite.title,
															reviews: favorite.reviews.length,
															price: favorite.price,
															galleryCount: favorite.gallery.additional.length + 1
														}"
													 @delete="onClickDeleteTransport"
						/>
					</div>
				</div>
			</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import VSpinner from "~/components/_uikit/VSpinner";
import DummyBox from "~/components/_block/DummyBox";
import LocationCard from "~/components/location/LocationCard";
import {mapActions, mapGetters} from "vuex";
import TransportCard from "~/components/transport/TransportCard";

export default {
	name: "ObjectsFavoriteList",
	props: {
		favorites: {
			type: Array,
			default: () => []
		},
	},
	components: {TransportCard, LocationCard, DummyBox, VSpinner, VBtn},
	data() {
		return {}
	},
	computed: {},
	methods: {
		...mapActions('locations', {
			deleteLocationFromFavorite: 'deleteFromFavorite',
		}),
		...mapActions('transport', {
			deleteTransportFromFavorite: 'deleteFromFavorite',
		}),
		getPictures(gallery) {
			if (gallery.main.photo) {
				const additionals = gallery.additional.map(({photo}) => photo);
				return [gallery.main.photo, ...additionals];
			} else {
				return []
			}
		},
		async onClickDeleteLocation({locationID}) {
			this.$emit('delete', {locationID});
		},
		async onClickDeleteTransport({transportID}) {
			this.$emit('delete', {transportID});
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
