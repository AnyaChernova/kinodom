<template>
	<div class="_TransportsList">
		<div class="box text-center" v-if="loading">
			<v-spinner class="text-brand"/>
		</div>
		<template v-else>
			<template v-if="transports.length">
				<div class="cardRow">
					<div class="grid">
						<TransportCard class="grid__item"
													 v-for="transport in transports"
													 :key="transport.id"
													 :transport-i-d="transport.t_id"
													 :to="`/transport/${transport.id}`"
													 :is-favorite="transport.is_favorite"
													 :pictures="getPictures(transport.gallery)"
													 :message-text="getMessageText(transport.id)"
													 :transport-type="transport.type"
													 :info="{
															picture: transport.gallery.main.photo,
															title: transport.title,
															reviews: transport.reviews.length,
															price: transport.price,
															galleryCount: transport.gallery.additional.length + 1
														}"/>
					</div>
				</div>
				<div class="box text-center" ref="spinner" v-if="isLoadMore && loadMoreState">
					<v-spinner class="text-brand"/>
				</div>
			</template>
			<DummyBox title="Ничего не найдено" v-else/>
		</template>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import TransportCard from "~/components/transport/TransportCard";
import VSpinner from "~/components/_uikit/VSpinner";
import DummyBox from "~/components/_block/DummyBox";
import {mapGetters, mapState} from "vuex";

export default {
	name: "TransportsList",
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
		isFetch: {
			type: Boolean,
			default: false
		},
		isLoadMore: {
			type: Boolean,
			default: false
		},
	},
	components: {DummyBox, VSpinner, TransportCard, VBtn},
	data() {
		return {
			loading: false,
			transports: [...this.objects]
		}
	},
	computed: {
		loadMoreState() {
			return this.transports.length < this.count
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
			const text = `Здравствуйте! Интересует данный транспорт: ${this.$store.state.env.BASE_HOST}/transport/${id}`;
			return encodeURIComponent(text);
		},
		addTransport(arr) {
			this.transports = this.transports.concat(arr);
		},
		async fetchTransport() {
			this.loading = true;
			await this.$store.dispatch('transport/fetchTransport', {query: this.$route.query});
			this.loading = false;
			if (this.transports.length) {
				this.$nextTick(async () => {
					if (this.isLoadMore) {
						await this.onScroll();
						window.addEventListener('scroll', this.onScroll);
					}
				})
			}
		},
		async showMoreTransport() {
			const transport = await this.$store.dispatch('transport/getTransport', {
				query: this.$route.query,
				count: 12,
				pagination: this.transports[this.transports.length - 1].id
			});

			this.addTransport(transport);
		},
		async onScroll() {
			const spinner = this.$refs.spinner;
			if (spinner) {
				const bottomOffset = window.pageYOffset + spinner.getBoundingClientRect().top + 100;
				const windowBottom = window.pageYOffset + document.documentElement.clientHeight;
				if (bottomOffset < windowBottom) {
					window.removeEventListener('scroll', this.onScroll);
					await this.showMoreTransport().then(() => {
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
			this.transports = [...this.objects];
		},
		activeTab(val) {
			if (val === 'transport') {
				window.addEventListener('scroll', this.onScroll);
			} else {
				window.removeEventListener('scroll', this.onScroll);
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (this.isFetch) {
				this.fetchTransport();
			} else {
				if (this.isLoadMore) {
					this.onScroll();
					window.addEventListener('scroll', this.onScroll);
				}
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
