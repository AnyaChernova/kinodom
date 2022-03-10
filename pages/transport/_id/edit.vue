<template>
	<div class="_TransportEditPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link mr-8">Главная</nuxt-link>
			<v-svg name="arrow" w="24" h="25" class="mr-8"/>
			<nuxt-link to="/my-objects" class="link">Мои локации</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title">
			<h1 class="title">Редактировать транспорт</h1>
		</div>
		<div class="box">
			<div class="cells --gap">
				<div class="cell w-2/12 l:hidden"></div>
				<div class="cell w-8/12 l:w-12/12">
					<TransportForm :transport="transport" type="edit" @save="isSaved = true"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import seoCore from "~/utils/seoCore";
import TransportForm from "~/components/transport/TransportForm";

export default {
	name: "TransportEditPage",
	middleware: ['auth'],
	scrollToTop: true,
	head() {
		return seoCore({
			title: this.transport.title,
		}, this)
	},
	props: {},
	components: {TransportForm},
	data() {
		return {
			isSaved: false
		}
	},
	 async asyncData({app, params}) {
		 const transport = await app.$repositories.transport.show(params.id).then((res) => {
			 return res.data || null;
		 }).catch((res) => {
			 console.dir(res);
			 return null;
		 });

		 return {
			 transport
		 }
	},
	computed: {},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	},
	async beforeRouteLeave(to, from, next) {
		if (this.isSaved) {
			next();
		} else {
			const res = await this.$loadModal('ConfirmModal', {
				isSmall: true,
				isBottom: true,
				title: 'Отменить редактирование?',
				subTitle: 'Несохраненный процесс редактирования транспорта будет потерян.',
				btnText: 'Отменить',
				btnClass: '--c-danger'
			});
			if (res) next()
			else next(false);
		}
	}
}
</script>
