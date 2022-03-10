<template>
	<div class="_ObjectCard">
		<component :is="to ? 'nuxt-link' : 'div'" :to="to" class="cardBox cardBox--simple">
			<div class="cardBox__pic">
				<nuxt-link :to="`/history/${orderID}`"
									 class="btn --small --icon --c-white --radius cardBox__top"
									 v-if="type === 'history'">
					<v-svg name="eye" w="16" h="16"/>
				</nuxt-link>
				<nuxt-link :to="`/${type}/${id}`"
									 v-else
									 class="btn --small --icon --c-white --radius cardBox__top">
					<v-svg name="eye" w="16" h="16"/>
				</nuxt-link>
				<nuxt-link :to="`/${type}/${id}/edit`"
									 class="btn --small --icon --c-white --radius cardBox__top"
									 v-if="isEdit && info.status.code !== 2">
					<v-svg name="pencil" w="16" h="16"/>
				</nuxt-link>
				<template v-if="isArchive && info.status.code !== 2">
					<v-btn small icon class="--c-white --radius cardBox__top"
								 v-if="info.status.code === 4"
								 @click="onClickUnArchive">
						<v-svg name="archive-out" w="16" h="16"/>
					</v-btn>
					<v-btn small icon class="--c-white --radius cardBox__top"
								 v-else
								 @click="onClickArchive">
						<v-svg name="archive" w="16" h="16"/>
					</v-btn>
				</template>
				<img :data-src="info.picture" alt="card" class="cardBox__img lazyLoad" v-lazy-load>
			</div>
			<div class="cardBox__item-l d-flex items-center justify-between">
				<v-badge :color="info.status.statusColor">{{ info.status.text || info.status.title }}</v-badge>
				<span v-if="startDate && endDate">
					{{ $dateFns.formatDMY(startDate) }} — {{ $dateFns.formatDMY(endDate) }}
				</span>
			</div>
			<h2 class="title-s cardBox__item-l">{{ info.title }}</h2>
		</component>
	</div>
</template>

<script>

import Rating from "~/components/_block/Rating";
import VBtn from "~/components/_uikit/VBtn";
import VBadge from "~/components/_uikit/VBadge";

export default {
	name: "ObjectCard",
	props: {
		type: {
			type: String,
			default: 'locations'
		},
		to: {
			type: String,
			default: ''
		},
		startDate: {
			type: String,
			default: ''
		},
		endDate: {
			type: String,
			default: ''
		},
		id: {
			type: Number,
			default: 0
		},
		orderID: {
			type: Number,
			default: 0
		},
		isEdit: {
			type: Boolean,
			default: false
		},
		isArchive: {
			type: Boolean,
			default: false
		},
		info: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {
		VBadge,
		VBtn,
		Rating
	},
	data() {
		return {
			timeout: null
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
		async onClickArchive() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(async () => {
				this.$emit('archive', {id: this.id, type: this.type});
			}, 300);
		},
		async onClickUnArchive() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(async () => {
				this.$emit('unarchive', {id: this.id, type: this.type});
			}, 300);
		}
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
