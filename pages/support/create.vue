<template>
	<div class="_SupportCreatePage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title">
			<h1 class="title">Поддержка</h1>
		</div>
		<div class="box">
			<div class="cells --gap">
				<div class="cell w-12/12" v-if="$auth.user">
					<div class="mb-10">
						<div class="tabsWrap tabsWrap--center">
							<TabsControl :tabs="tabs" :active-tab-index="0"/>
						</div>
					</div>
				</div>
				<div class="cell w-2/12 xl:w-1/12 l:hidden"></div>
				<div class="cell w-8/12 xl:w-10/12 l:w-12/12">
					<SupportCreate/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import SupportCreate from "~/components/support/SupportCreate";
import seoCore from "~/utils/seoCore";
import TabsControl from "~/components/_block/TabsControl";

export default {
	name: "SupportCreatePage",
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'Поддержка',
		}, this)
	},
	props: {},
	components: {TabsControl, SupportCreate},
	data() {
		return {
			tabs: [
				{
					title: 'Новое обращение',
					value: 'create',
					to: '/support/create'
				},
				{
					title: 'История обращений',
					value: 'history',
					to: '/support'
				},
			]
		}
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
