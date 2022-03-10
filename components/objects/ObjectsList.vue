<template>
	<div class="_ObjectsList">
		<template v-if="locations.length">
			<div class="cardRow box">
				<div class="grid">
					<LocationCard class="grid__item"
											v-for="(location, i) in locations"
											:key="location.id"
											:lazy="i < 24"
											:location-i-d="location.l_id"
											:to="`/locations/${location.id}`"
											:is-favorite="location.is_favorite"
											:pictures="getPictures(location.gallery)"
											:message-text="getMessageText(location.id)"
											:info="{
												picture: location.gallery.main.photo,
												title: location.title,
												district: location.district,
												reviews: location.reviews.length,
												priceType: location.price_type,
												galleryCount: location.gallery.additional.length + 1
											}"/>
				</div>
			</div>
			<div class="box text-center" ref="spinner" v-if="isLoadMore && loadMoreState">
				<v-spinner class="text-brand"/>
			</div>
		</template>
		<DummyBox title="Ничего не найдено" v-else/>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import VSpinner from "~/components/_uikit/VSpinner";
import DummyBox from "~/components/_block/DummyBox";
import LocationCard from "~/components/location/LocationCard";

export default {
	name: "ObjectsList",
	props: {
		objects: {
			type: Array,
			default: () => {
				return [];
			}
		},
		count: {
			type: Number,
			default: 0
		},
		activeTab: {
			type: String,
			default: ''
		},
		isLoadMore: {
			type: Boolean,
			default: false
		},
	},
	components: {LocationCard, DummyBox, VSpinner, VBtn},
	data() {
		return {
			locations: [...this.objects]
		}
	},
	computed: {
		loadMoreState() {
			return this.locations.length < this.count
		},
	},
	methods: {
		getPictures(gallery) {
			if (gallery.main.photo) {
				const additionals = gallery.additional.map(({photo}) => photo);
				return [gallery.main.photo, ...additionals];
			} else {
				return []
			}
		},
		getMessageText(id) {
			const text = `Здравствуйте! Интересует данная локация: ${this.$store.state.env.BASE_HOST}/locations/${id}`;
			return encodeURIComponent(text);
		},
		addLocations(arr) {
			this.locations = this.locations.concat(arr);
		},
		async showMoreLocations() {
			const locations = await this.$store.dispatch('locations/getLocations', {
				query: this.$route.query,
				count: 12,
				pagination: this.locations[this.locations.length - 1].id
			});

			this.addLocations(locations);
		},
		async onScroll() {
			const spinner = this.$refs.spinner;
			if (spinner) {
				const bottomOffset = window.pageYOffset + spinner.getBoundingClientRect().top + 100;
				const windowBottom = window.pageYOffset + document.documentElement.clientHeight;
				if (bottomOffset < windowBottom) {
					window.removeEventListener('scroll', this.onScroll);
					await this.showMoreLocations().then(() => {
						window.addEventListener('scroll', this.onScroll);
					});
				}
			} else {
				window.removeEventListener('scroll', this.onScroll);
			}
		},
	},
	directives: {},
	filters: {},
	watch: {
		objects() {
			this.locations = [...this.objects];
		},
		activeTab(val) {
			if (val === 'locations') {
				window.addEventListener('scroll', this.onScroll);
			} else {
				window.removeEventListener('scroll', this.onScroll);
			}
		}
	},
	created() {
	},
	mounted() {
		this.$nextTick(() => {
			if (this.isLoadMore) {
				this.onScroll();
				window.addEventListener('scroll', this.onScroll);
			}
		});
	},
	activated() {
		if (this.isLoadMore) {
			window.addEventListener('scroll', this.onScroll);
		}
	},
	deactivated() {
		if (this.isLoadMore) {
			window.removeEventListener('scroll', this.onScroll);
		}
	},
	beforeDestroy() {
		if (this.isLoadMore) {
			window.removeEventListener('scroll', this.onScroll);
		}
	}
}
</script>
