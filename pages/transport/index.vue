<template>
	<div class="_TransportPage">
		<div class="layout">
			<div class="box box--s box--adaptive"></div>
			<div class="box box--s box--adaptive">
				<template v-if="transports.length">
					<div class="from-s:hidden">
						<div class="title-m mt-m">Найдено: {{ count }}</div>
						<div class="mt-m"></div>
					</div>
					<div class="box box--s">
						<div class="title-m s:hidden">Найдено: {{ count }}</div>
					</div>
					<div class="box box--s">
						<TransportsList :objects="transports" :count="count" is-load-more/>
					</div>
				</template>
				<template v-else>
					<template v-if="$route.query.search">
						<div class="title-m">Ничего не найдено по запросу «{{ $route.query.search }}»</div>
						<div class="mt-m fz-18">Попробуйте сформулировать запрос иначе, или обратитесь за
							<a href="https://wa.me/79256715406" target="_blank" class="link">помощью к менеджеру</a>
						</div>
					</template>
					<template v-if="$route.query.filterParams">
						<div class="title-m">Подходящий транспорт не найден</div>
						<div class="mt-m fz-18">Попробуйте смягчить условия поиска, или обратитесь за
							<a href="https://wa.me/79256715406" target="_blank" class="link">помощью к менеджеру</a>
						</div>
					</template>
				</template>
			</div>
		</div>
	</div>
</template>

<script>

import seoCore from "~/utils/seoCore";
import {mapState} from "vuex";
import TransportsList from "~/components/transports/TransportsList";

export default {
	name: "TransportPage",
	scrollToTop: true,
	watchQuery: true,
	layout: 'search',
	head() {
		return seoCore({
			title: 'Кинодом',
		}, this)
	},
	props: {},
	components: {TransportsList},
	data() {
		return {}
	},
	async asyncData({store, query}) {
		await store.dispatch('transport/fetchTransport', {query});
	},
	computed: {
		...mapState('transport', {
			transports: 'transports',
			count: 'transportsCount',
		}),
	},
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
