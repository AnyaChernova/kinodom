<template>
	<div class="_LocationEditPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link mr-8">Главная</nuxt-link>
			<v-svg name="arrow" w="24" h="25" class="mr-8"/>
			<nuxt-link to="/my-objects" class="link">Мои локации</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title">
			<h1 class="title">Редактировать локацию</h1>
		</div>
		<div class="box">
			<div class="cells --gap">
				<div class="cell w-2/12 l:hidden"></div>
				<div class="cell w-8/12 l:w-12/12">
					<LocationsForm :location="location" type="edit" @save="isSaved = true"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import LocationsForm from "~/components/locations/LocationsForm";
import seoCore from "~/utils/seoCore";

export default {
	name: "LocationEditPage",
	middleware: ['auth'],
	scrollToTop: true,
	head() {
		return seoCore({
			title: this.location.title,
		}, this)
	},
	props: {},
	components: {LocationsForm},
	data() {
		return {
			isSaved: false
		}
	},
	 async asyncData({app, params}) {
		 const location = await app.$repositories.locations.show(params.id).then((res) => {
			 return res.data || null;
		 }).catch((res) => {
			 console.dir(res);
			 return null;
		 });

		 return {
			 location
		 }
	},
	computed: {},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {},
	async beforeRouteLeave(to, from, next) {
		if (this.isSaved) {
			next();
		} else {
			const res = await this.$loadModal('ConfirmModal', {
				isSmall: true,
				isBottom: true,
				title: 'Отменить редактирование?',
				subTitle: 'Несохраненный процесс редактирования локации будет потерян.',
				btnText: 'Отменить',
				btnClass: '--c-danger'
			});
			if (res) next()
			else next(false);
		}
	}
}
</script>
