<template>
	<div class="_HistoryLocationPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link mr-8">Главная</nuxt-link>
			<v-svg name="arrow" w="24" h="25" class="mr-8"/>
			<nuxt-link to="/history" class="link">
				<template v-if="$store.getters.isRenter">История съемок</template>
				<template v-else>История аренды</template>
			</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<ObjectOrderInfo :order="order"/>
	</div>
</template>

<script>

import VBadge from "~/components/_uikit/VBadge";
import VBtn from "~/components/_uikit/VBtn";
import ObjectSlider from "~/components/object/ObjectSlider";
import ObjectOrderInfo from "~/components/object/ObjectOrderInfo";
import seoCore from "~/utils/seoCore";

export default {
	name: "HistoryLocationPage",
	middleware: ['auth'],
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'История',
		}, this)
	},
	props: {},
	components: {ObjectOrderInfo, ObjectSlider, VBtn, VBadge},
	data() {
		return {}
	},
	async asyncData({app, params}) {
		const order = await app.$repositories.history.show(params.id).then((res) => {
			return res.data.order || null;
		}).catch((res) => {
			console.dir(res);
			return null;
		});

		return {
			order
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
