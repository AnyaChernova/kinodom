<template>
	<div class="_SupportPage">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="content__title">
			<h1 class="title">Поддержка</h1>
		</div>
		<div class="box">
			<div class="cells --gap">
				<div class="cell w-12/12">
					<div class="mb-10">
						<div class="tabsWrap tabsWrap--center">
							<TabsControl :tabs="tabs" :active-tab-index="1"/>
						</div>
					</div>
				</div>
				<div class="cell w-2/12 l:hidden"></div>
				<div class="cell w-8/12 l:w-12/12">
					<SupportList :supports="supports" v-if="supports.length"/>
					<DummyBox title="У вас пока нет ни одного обращения в службу поддержки" v-else/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import SupportList from "~/components/support/SupportList";
import DummyBox from "~/components/_block/DummyBox";
import seoCore from "~/utils/seoCore";
import TabsControl from "~/components/_block/TabsControl";

export default {
	name: "SupportPage",
	middleware: ['auth'],
	scrollToTop: true,
	head() {
		return seoCore({
			title: 'Поддержка',
		}, this)
	},
	props: {},
	components: {TabsControl, DummyBox, SupportList},
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
		const supports = await app.$repositories.support.all().then((res) => {
			return res.data.supports || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});

		return {
			supports
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
