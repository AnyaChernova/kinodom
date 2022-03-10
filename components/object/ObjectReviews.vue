<template>
	<div class="_ObjectReviews pt-5">
		<div class="reviewBox">
			<div class="reviewBox__header">
				<Media>
					<template #aside>
						<div class="avatar">
							<img src="/svg/user.svg" alt="">
						</div>
					</template>
					<div class="title-s">Иван Черный</div>
				</Media>
				<div class="fz-14 ws-no-wrap">20 окт 2018</div>
			</div>
			<div class="title-s">Очень просторное помещение</div>
			<div class="text-l reviewBox__content" :class="{cut: isCut}">
				Музей, кунц-камера, ковры, ресторан, сауна. Локация доступна с 13 января 2021, ресторан, сауна. Локация 1,
				ресторан, сауна. Локация доступна с 13 января 2021...Музей, кунц-камера, ковры, ресторан, сауна. Локация
				доступна с 13 января 2021, ресторан, сауна. Локация 1, ресторан, сауна. Локация доступна с 13 января
				2021...Музей, кунц-камера, ковры, ресторан, сауна. Локация доступна с 13 января 2021, ресторан, сауна. Локация
				1, ресторан, сауна. Локация доступна с 13 января 2021...
			</div>
			<div class="reviewBox__footer">
				<button class="link link--line fz-14" v-if="isCut" @click="openReview">Смотреть полностью</button>
				<button class="link link--line fz-14" v-else @click="closeReview">Скрыть</button>
			</div>
		</div>
		<div class="reviewBox">
			<div class="reviewBox__header">
				<Media>
					<template #aside>
						<div class="avatar">
							<img src="/temp/user.jpg" alt="">
						</div>
					</template>
					<div class="title-s">Иван Черный</div>
				</Media>
				<div class="fz-14 ws-no-wrap">20 окт 2018</div>
			</div>
			<div class="title-s">Только в тапочках</div>
			<div class="text-l reviewBox__content" :class="{cut: isCut}">
				Музей, кунц-камера, ковры, ресторан, сауна. Локация доступна с 13 января 2021, ресторан, сауна. Локация 1,
			</div>
		</div>
		<div class="reviewBox">
			<div class="reviewBox__header">
				<Media>
					<template #aside>
						<div class="avatar">
							<img src="/temp/user.jpg" alt="">
						</div>
					</template>
					<div class="title-s">Иван Черный</div>
				</Media>
				<div class="fz-14 ws-no-wrap">20 окт 2018</div>
			</div>
			<div class="title-s">Только в тапочках</div>
			<div class="text-l reviewBox__content" :class="{cut: isCut}">
				Музей, кунц-камера, ковры, ресторан, сауна. Локация доступна с 13 января 2021, ресторан, сауна. Локация 1,
				ресторан, сауна. Локация доступна с 13 января 2021...Музей, кунц-камера, ковры, ресторан, сауна. Локация
				доступна с 13 января 2021, ресторан, сауна. Локация 1, ресторан, сауна. Локация доступна с 13 января
				2021...Музей, кунц-камера, ковры, ресторан, сауна. Локация доступна с 13 января 2021, ресторан, сауна. Локация
				1, ресторан, сауна. Локация доступна с 13 января 2021...
			</div>
			<div class="reviewBox__footer">
				<button class="link link--line fz-14" v-if="isCut" @click="openReview">Смотреть полностью</button>
				<button class="link link--line fz-14" v-else @click="closeReview">Скрыть</button>
			</div>
		</div>
	</div>
</template>

<script>

import Media from "~/components/_uikit/Media";

export default {
	name: "ObjectReviews",
	props: {},
	components: {Media},
	data() {
		return {
			isCut: true
		}
	},
	computed: {},
	methods: {
		openReview() {
			this.isCut = false;
		},
		closeReview() {
			this.isCut = true;
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
