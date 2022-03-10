<template>
	<div class="_SearchFormPage">
		<div class="breadcrumbs"></div>
		<div class="mt-10"></div>
		<div class="content__title d-flex justify-between">
			<h1 class="title">Запрос на поиск локации</h1>
			<v-btn simple class="ml-10 m:mr-m" @click="$loadModal('SearchFormFaqModal', {isFull: true, lock: true})">
				<v-svg name="help" w="24" h="24"/>
				<span class="ml-8 xs:hidden">faq</span>
			</v-btn>
		</div>
		<div class="box">
			<div class="cells --gap">
				<div class="cell w-2/12 l:hidden"></div>
				<div class="cell w-8/12 l:w-12/12">
					<LocationsSearchForm @success="$router.push('/support')"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import seoCore from "~/utils/seoCore";
import VBtn from "~/components/_uikit/VBtn";
import LocationsSearchForm from "~/components/locations/LocationsSearchForm";

export default {
	name: "SearchFormPage",
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'Запрос на поиск локации',
		}, this)
	},
	props: {},
	components: {LocationsSearchForm, VBtn},
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
	},
}
</script>
