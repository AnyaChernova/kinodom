<template>
	<div class="_TransportPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="box box--m">
			<TransportMainInfo :transport="transport"/>
		</div>
		<div class="box box--m">
			<ObjectTabs type="transport" :object="transport"/>
		</div>
	</div>
</template>

<script>

import ObjectTabs from "~/components/object/ObjectTabs";
import TransportMainInfo from "~/components/transport/TransportMainInfo";
import seoCore from "~/utils/seoCore";

export default {
	name: "TransportPage",
	scrollToTop: true,
	head() {
		return seoCore({
			title: this.transport.seo_title || this.transport.title,
			description: this.transport.seo_description,
		}, this)
	},
	props: {},
	components: {
		TransportMainInfo,
		ObjectTabs
	},
	data() {
		return {}
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
	}
}
</script>
