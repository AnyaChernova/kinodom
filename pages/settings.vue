<template>
	<div class="_SettingsPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title">
			<h1 class="title">Настройки профиля</h1>
		</div>
		<div class="cells --gap">
			<div class="cell w-3/12 xl:w-2/12 m:hidden"></div>
			<div class="cell w-6/12 xl:w-8/12 m:w-12/12">
				<SettingsForm/>
			</div>
		</div>
	</div>
</template>

<script>

import SettingsForm from "~/components/settings/SettingsForm";
import seoCore from "~/utils/seoCore";
export default {
	name: "SettingsPage",
	middleware: ['auth'],
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'Настройки',
		}, this)
	},
	props: {},
	components: {SettingsForm},
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
