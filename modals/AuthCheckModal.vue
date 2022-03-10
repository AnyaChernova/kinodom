<template>
	<div class="_AuthCheckModal popup">
		<div class="popup__header">
			<div class="title">{{title}}</div>
		</div>
		<div class="popup__content" v-if="subTitle">
			{{subTitle}}
		</div>
		<div class="popup__footer">
			<div class="btnRow btnRow--l justify-end">
				<v-btn class="--withIcon" @click="onAuthClick">
					<v-svg class="mr-8" name="user" w="25" h="25"/>
					<span>Войти</span>
				</v-btn>
				<v-btn outline @click="onRegisterClick">Регистрация</v-btn>
			</div>
		</div>
	</div>
</template>
<script>

	import VBtn from "@/components/_uikit/VBtn";

	export default {
		name: "AuthCheckModal",
		props: {
			title: {
				type: String,
				default: '',
			},
			subTitle: {
				type: String,
				default: '',
			},
		},
		components: {VBtn},
		data() {
			return {}
		},
		computed: {},
		methods: {
			onAuthClick() {
				this.$close(true);
				this.$loadModal('auth/AuthModal');
			},
			onRegisterClick() {
				this.$close(true);
				this.$loadModal('RegisterModal');
			}
		},
		directives: {},
		filters: {},
		watch: {},
		mounted() {
		}
	}
</script>
