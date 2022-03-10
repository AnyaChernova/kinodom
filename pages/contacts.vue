<template>
	<div class="_ContactsPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title">
			<h1 class="title">Контакты</h1>
		</div>
		<div class="box box--m">
			<div class="cells --gap">
				<div class="cell w-4/12 s:w-12/12 text-center">
					<div class="avatar --100">
						<img src="/img/maksim.jpg" alt="Максим Дондук">
					</div>
					<div class="mt-8">
						<h2 class="title-m">Максим Дондук</h2>
					</div>
					<div class="mt-8 text-dark fz-18">Менеджер по подбору локаций</div>
					<a href="tel:+79299359003" class="link fz-18 mt-8">+7 929 935-90-03</a>
				</div>
				<div class="cell w-4/12 s:w-12/12 text-center">
					<div class="avatar --100">
						<img src="/img/pavel.jpg" alt="Павел Полинов">
					</div>
					<div class="mt-8">
						<h2 class="title-m">Павел Полинов</h2>
					</div>
					<div class="mt-8 text-dark fz-18">Учредитель компании «Кинодом»</div>
					<a href="tel:+79670543438" class="link fz-18 mt-8">+7 967 054-34-38</a>
				</div>
				<div class="cell w-4/12 s:w-12/12 text-center">
					<div class="avatar --center --border --100">
						<v-svg name="message-b" w="48" h="48"/>
					</div>
					<div class="mt-8">
						<h2 class="title-m">На связи</h2>
					</div>
					<div class="mt-8 text-dark fz-18">ПН-ПТ: 9.30 - 20.00</div>
					<a href="https://t.me/kinodom_rus" target="_blank" class="link fz-18 mt-8">@kinodom_rus</a>
				</div>
			</div>
		</div>
		<div class="box box--m box--plate">
			<div class="box box--s box__inner">
				<div class="title-m">Оставьте заявку и локейшн-менеджер индивидуально подберет объект</div>
			</div>
			<div class="box box--s">
				<a href="https://wa.me/79256715406" target="_blank" class="btn --wideExtra">Связаться</a>
			</div>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import seoCore from "~/utils/seoCore";
export default {
	name: "ContactsPage",
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'Контакты',
		}, this)
	},
	props: {},
	components: {VBtn},
	data() {
		return {}
	},
	async asyncData({app}) {
	},
	computed: {},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	}
}
</script>
