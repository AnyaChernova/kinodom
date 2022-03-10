<template>
	<ul class="_PageNav nav">
		<li class="nav__item">
			<nuxt-link to="/" exact class="nav__link">Главная</nuxt-link>
		</li>
		<li class="nav__item">
			<nuxt-link to="/map" class="nav__link">Карта локаций</nuxt-link>
		</li>
		<li class="nav__item">
			<nuxt-link to="/contacts" class="nav__link">Контакты</nuxt-link>
		</li>
<!--		<li class="nav__item" v-if="$store.getters.isOwner">-->
<!--			<nuxt-link to="/create" class="nav__link">Разместить</nuxt-link>-->
<!--		</li>-->
		<li class="nav__item" v-if="!$auth.user">
			<nuxt-link to="/support/create" class="nav__link">Поддержка</nuxt-link>
		</li>
	</ul>
</template>

<script>

export default {
	name: "PageNav",
	props: {},
	components: {},
	data() {
		return {}
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
