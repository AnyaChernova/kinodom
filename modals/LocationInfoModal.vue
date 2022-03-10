<template>
	<div class="_LocationInfoModal popup">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout">
			<div class="popup__header">
				<div class="title">Дополнительная информация</div>
			</div>
			<div class="box box--m" v-if="info.rent_per_day">
				<div class="title-m">Стоимость аренды</div>
				<div class="mt-8 fz-18">{{ info.rent_per_day }} ₽/сутки</div>
			</div>
			<div class="box box--m" v-if="info.photo_from_location.length">
				<div class="box__header box__header--s">
					<div class="title-m">Фото с площадки</div>
				</div>
				<div class="pt-8">
					<ObjectSlider :gallery="info.photo_from_location"/>
				</div>
			</div>
<!--			<div class="box box&#45;&#45;m">-->
<!--				<div class="box__header box__header&#45;&#45;s">-->
<!--					<div class="title-m">Расположение</div>-->
<!--					<Media class="mt-20">-->
<!--						<template #aside>-->
<!--							<v-svg name="pin_s" w="24" h="29"/>-->
<!--						</template>-->
<!--						<div class="fz-18 ml-5">Москва, г. Москва, район Арбат, Свердловский пр-т, дом 146/45а строение 234 корпус 16, подъезд 13, кв. 651</div>-->
<!--					</Media>-->
<!--				</div>-->
<!--				<div class="mapBox">-->
<!--					<img src="/temp/map.jpg" alt="" class="mapBox__inner">-->
<!--				</div>-->
<!--			</div>-->
		</div>
	</div>
</template>
<script>

import ObjectSlider from "~/components/object/ObjectSlider";
import Media from "~/components/_uikit/Media";

export default {
	name: "LocationInfoModal",
	props: {
		info: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {Media, ObjectSlider},
	data() {
		return {}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
