<template>
	<div class="_ObjectOrderInfo">
		<div class="cells --gap">
			<div class="cell w-12/12">
				<div class="cells --gap-s">
					<div class="cell w-8/12 xl:w-6/12 l:w-12/12">
						<h1 class="title" v-if="order.location">{{ order.location.title }}</h1>
						<h1 class="title" v-if="order.transport">{{ order.transport.title }}</h1>
					</div>
					<div class="cell w-4/12 xl:w-6/12 l:w-12/12 text-right s:text-left">
						<v-btn class="--c-white --bigRadius --copy mt-10" @click="onCopyClick">
							<span class="ws-no-wrap" v-if="order.location">id: {{ order.location.l_id }}</span>
							<span class="ws-no-wrap" v-if="order.transport">id: {{ order.transport.t_id }}</span>
							<v-svg name="copy" w="16" h="16" class="ml-8"/>
						</v-btn>
						<input class="visually-hidden" readonly ref="idInput" :value="order.location.l_id" v-if="order.location">
						<input class="visually-hidden" readonly ref="idInput" :value="order.transport.t_id" v-if="order.transport">
					</div>
				</div>
			</div>
			<div class="cell w-12/12 from-xs:hidden">
				<nuxt-link :to="`/locations/${order.location.id}`" class="btn --simple mr-m" v-if="order.location">Карточка локации</nuxt-link>
				<nuxt-link :to="`/transport/${order.transport.id}`" class="btn --simple mr-m" v-if="order.transport">Карточка транспорта</nuxt-link>
			</div>
			<template v-if="order.location">
				<div class="cell w-12/12" v-if="order.location.gallery.main.photo">
					<div class="d-flex items-center justify-between mt-10">
						<div class="title-m">Фото ({{ order.location.gallery.additional.length + 1}})</div>
						<nuxt-link :to="`/locations/${order.location.id}`" class="btn --simple mr-m xs:hidden">Карточка локации</nuxt-link>
					</div>
				</div>
			</template>
			<template v-if="order.transport">
				<div class="cell w-12/12" v-if="order.transport.gallery.main.photo">
					<div class="d-flex items-center justify-between mt-10">
						<div class="title-m">Фото ({{ order.transport.gallery.additional.length + 1}})</div>
						<nuxt-link :to="`/transport/${order.transport.id}`" class="btn --simple mr-m xs:hidden">Карточка транспорта</nuxt-link>
					</div>
				</div>
			</template>
			<div class="cell w-12/12"></div>
		</div>
		<template v-if="order.location">
			<div class="box box--m" v-if="order.location.gallery.main.photo">
				<ObjectSlider :gallery="order.location.gallery.additional" :main="order.location.gallery.main"/>
			</div>
		</template>
		<template v-if="order.transport">
			<div class="box box--m" v-if="order.transport.gallery.main.photo">
				<ObjectSlider :gallery="order.transport.gallery.additional" :main="order.transport.gallery.main"/>
			</div>
		</template>
		<div class="box box--m list list--border">
			<div class="list__title">
				<div class="cells --gap-s">
					<div class="cell w-2/12 m:w-6/12 s:w-12/12">
						<div class="title-s">Статус аренды:</div>
					</div>
					<div class="cell w-2/12 l:w-4/12 m:w-6/12 s:hidden">
						<div class="title-s">Даты аренды</div>
					</div>
				</div>
			</div>
			<div class="list__item">
				<div class="cells --gap-s">
					<div class="cell w-2/12 m:w-6/12 s:w-4/12">
						<v-badge :color="ordersStatus[orderStatus].statusColor">{{ ordersStatus[orderStatus].statusTitle }}</v-badge>
					</div>
					<div class="cell w-3/12 l:w-4/12 m:w-6/12 s:w-8/12 m:text-right">
						<div class="fz-18">
							{{ $dateFns.formatDMY(order.order.start_at) }} — {{ $dateFns.formatDMY(order.order.finished_at) }}
						</div>
					</div>
					<div class="cell w-7/12 l:w-6/12 m:w-12/12 m:text-right">
<!--						<v-btn simple class="ml-10" @click="onReviewClick" v-if="orderStatus === '2'">-->
<!--							<v-svg name="pencil" w="24" h="24"/>-->
<!--							<span class="ml-8">Оставить отзыв</span>-->
<!--						</v-btn>-->
					</div>
				</div>
			</div>
<!--			<div class="list__item">-->
<!--				<div class="cells &#45;&#45;gap-s">-->
<!--					<div class="cell w-2/12 m:w-6/12 s:w-4/12">-->
<!--						<v-badge color="success">Завершена</v-badge>-->
<!--					</div>-->
<!--					<div class="cell w-3/12 l:w-4/12 m:w-6/12 s:w-8/12 m:text-right">-->
<!--						<div class="fz-18">12.06.2021 — 14.06.2021</div>-->
<!--					</div>-->
<!--					<div class="cell w-7/12 l:w-6/12 m:w-12/12">-->
<!--						<div class="mb-8">20 окт 2018</div>-->
<!--						<div class="title-s">Не наливают</div>-->
<!--						<div class="mt-8 text-l">Музей, кунц-камера, ковры, ресторан, сауна. Локация доступна с 13 января 2021,-->
<!--							ресторан, сауна. Локация 1, ресторан, сауна. Локация доступна с 13 января 2021...Музей, кунц-камера,-->
<!--							ковры, ресторан, сауна. Локация доступна с 13 января 2021, ресторан, сауна. Локация 1, ресторан, сауна.-->
<!--							Локация доступна с 13 января 2021...Музей, кунц-камера, ковры, ресторан, сауна. Локация доступна с 13-->
<!--							января 2021, ресторан, сауна. Локация 1, ресторан, сауна. Локация доступна с 13 января 2021...-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
		</div>
		<div class="box box--m text-right">
			<nuxt-link :to="`/locations/${order.location.id}`" class="btn --simple mr-m" v-if="order.location">Карточка локации</nuxt-link>
			<nuxt-link :to="`/transport/${order.transport.id}`" class="btn --simple mr-m" v-if="order.transport">Карточка транспорта</nuxt-link>
		</div>
	</div>
</template>

<script>

import {mapState} from "vuex";
import VBtn from "~/components/_uikit/VBtn";
import ObjectSlider from "~/components/object/ObjectSlider";
import VBadge from "~/components/_uikit/VBadge";

export default {
	name: "ObjectOrderInfo",
	props: {
		order: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {VBadge, ObjectSlider, VBtn},
	data() {
		return {
		}
	},
	computed: {
		...mapState({
			ordersStatus: 'ordersStatus',
		}),
		orderStatus() {
			if (this.order.order.canceled_at) return '3';
			if (this.$dateFns.getUnixTime(new Date(this.order.order.start_at)) > this.$dateFns.getUnixTime(new Date())) return '1';
			if (this.$dateFns.getUnixTime(new Date(this.order.order.finished_at)) < this.$dateFns.getUnixTime(new Date())) return '2';
			return '0';
		}
	},
	methods: {
		async onCopyClick() {
			const res = await this.$copyData(this.$refs.idInput);
			if (res) {
				this.$snotify.success('Скопировано');
			} else {
				this.$snotify.error('Ошибка');
			}
		},
		onReviewClick() {
			this.$loadModal('review/ReviewModal', {orderID: this.order.order.id});
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
