<template>
	<div class="_ObjectTabs box">
		<div class="box__header box__header--s">
			<div class="title-m">Описание</div>
<!--			<button class="tabs__item" :class="{active: activeTab === 'description'}" @click="activeTab = 'description'">-->
<!--				Описание-->
<!--			</button>-->
<!--			<button class="tabs__item" :class="{active: activeTab === 'reviews'}" @click="activeTab = 'reviews'">-->
<!--				Отзывы-->
<!--			</button>-->
		</div>
		<div class="cells --gap">
			<div class="cell w-8/12 s:w-12/12">
				<ObjectDescription :type="type" :object="object"/>
<!--				<template v-if="activeTab === 'reviews'">-->
<!--					<ObjectReviews v-if="object.reviews.length"/>-->
<!--					<span class="text-label fz-18" v-else>Отзывов пока нет</span>-->
<!--				</template>-->
			</div>
			<template v-if="!$auth.user || $store.getters.isRenter">
				<div class="cell w-4/12 s:w-12/12 text-right self-end" v-if="type === 'locations'">
					<v-btn class="mr-m s:w-full box__bottom" @click="onRentLocationClick">Арендовать</v-btn>
				</div>
				<div class="cell w-12/12 text-right" v-else>
					<v-btn class="s:w-full box__bottom" @click="onRentTransportClick">Арендовать</v-btn>
				</div>
			</template>
		</div>
	</div>
</template>

<script>

import ObjectDescription from "~/components/object/ObjectDescription";
import VBtn from "~/components/_uikit/VBtn";
import ObjectReviews from "~/components/object/ObjectReviews";
import {mapState} from "vuex";

export default {
	name: "ObjectTabs",
	props: {
		type: {
			type: String,
			default: 'locations'
		},
		object: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {ObjectReviews, VBtn, ObjectDescription},
	data() {
		return {
			activeTab: 'description'
		}
	},
	computed: {
		...mapState({
			supportThemes: 'supportThemes',
		}),
	},
	methods: {
		onRentLocationClick() {
			this.$loadModal('RentRequestModal', {
				locationID: this.object.l_id,
				isFull: true,
				lock: true
			});
		},
		onRentTransportClick() {
			this.$loadModal('RentRequestModal', {
				transportID: this.object.t_id,
				theme: this.supportThemes['9'],
				type: 'transport',
				isFull: true,
				lock: true
			});
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
