<template>
	<div class="_ErrorPage content">
		<div class="breadcrumbs">
			<nuxt-link to="/" class="link">Главная</nuxt-link>
		</div>
		<div class="mt-10"></div>
		<div class="box box--l">
			<div class="title">{{ errorTitle }}</div>
		</div>
		<div class="box box--l">
			<template v-if="error.statusCode === 404">
				<div class="box box--s text-center">
					<img src="/svg/404.svg" alt="" width="234" height="76">
				</div>
				<div class="box box--s text-center fz-18">
					Возможно, ссылка устарела или содержит ошибку.
				</div>
			</template>
		</div>
		<div class="box box--l box--plate">
			<div class="box box--s box__inner">
				<div class="title-m">Оставьте заявку и локейшн-менеджер индивидуально подберет объект</div>
			</div>
			<div class="box box--s">
				<nuxt-link to="/support/create" class="btn --wideExtra">Связаться</nuxt-link>
			</div>
		</div>
	</div>
</template>
<script>
import _disableOutline from "@/components/_mixins/_disableOutline";
import VBtn from "~/components/_uikit/VBtn";

export default {
	name: "ErrorPage",
	mixins: [_disableOutline],
	scrollToTop: true,
	props: {
		error: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	components: {VBtn},
	data() {
		return {}
	},
	asyncData() {
	},
	computed: {
		errorTitle() {
			if (this.error.statusCode === 404) {
				return 'Страница не найдена'
			} else if (this.error.statusCode === 403) {
				return 'Доступ к разделу запрещён'
			} else {
				return 'Произошла ошибка'
			}
		}

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

