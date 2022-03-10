<template>
	<div class="_AuthPage">
		<DummyBox v-if="error" :title="error"></DummyBox>
	</div>
</template>

<script>

import DummyBox from "~/components/_block/DummyBox";
import {serializeToObj} from "~/utils/serialize";

export default {
	name: "AuthPage",
	head() {
		return {
			title: 'Вход'
		}
	},
	layout: 'public',
	scrollToTop: true,
	props: {},
	components: {DummyBox},
	data() {
		return {
			error: '',
			urlParams: {}
		}
	},
	asyncData() {},
	computed: {},
	methods: {
		getParams() {
			if (Object.keys(this.$route.query).length) {
				this.urlParams = this.$route.query;
			} else if (this.$route.hash) {
				this.urlParams = serializeToObj(this.$route.hash.slice(1));
			}
			return this.urlParams;
		},
		async login() {
			await this.$auth.loginWith(this.urlParams.state, {
				params: {
					email: this.urlParams.email,
					access_token: this.urlParams.access_token,
					user_id: this.urlParams.user_id
				},
			}).then((res) => {
				console.log(res);
				this.$router.push('/settings');
			}).catch(() => {
				this.error = 'Ошибка входа';
			});
		}
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
		this.getParams();

		if (this.urlParams.access_token) {
			this.login();
		} else {
			this.error = 'Ошибка входа';
		}
	}
}
</script>
