<template>
	<div class="_LocationPage" v-if="location">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="box box--m">
			<ObjectMainInfo :location="location"/>
		</div>
		<div class="box box--m">
			<div class="pt-m s:hidden"></div>
			<ObjectTabs :object="location"/>
		</div>
	</div>
</template>

<script>

import ObjectTabs from "~/components/object/ObjectTabs";
import ObjectMainInfo from "~/components/object/ObjectMainInfo";
import seoCore from "~/utils/seoCore";

export default {
	name: "LocationPage",
	scrollToTop: true,
	head() {
		return seoCore({
			title: this.location.seo_title || this.location.title,
			description: this.location.seo_description,
		}, this)
	},
	props: {},
	components: {ObjectMainInfo, ObjectTabs},
	data() {
		return {}
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
	mounted() {
	}
}
</script>
