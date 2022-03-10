<template>
	<div class="_AuthSocial d-flex s:justify-center">
		<button type="button" class="link mr-m" @click="onAuthVK"><img src="/svg/vk.svg" alt="vkontakte" width="48" height="48"></button>
		<button type="button" class="link mr-m" @click="onAuthFB"><img src="/svg/fb.svg" alt="facebook" width="48" height="48"></button>
		<button type="button" class="link mr-m" @click="onAuthGOOGLE"><img src="/svg/google.svg" alt="google" width="48" height="48"></button>
		<button type="button" class="link mr-m" @click="onAuthAPPLE"><img src="/svg/apple.svg" alt="apple" width="48" height="48"></button>
	</div>
</template>

<script>

import {auth_VK, auth_FB, auth_GOOGLE, auth_APPLE} from "~/utils/auth-social-redirect";

export default {
	name: "AuthSocial",
	props: {},
	components: {},
	data() {
		return {}
	},
	computed: {},
	methods: {
		onAuthVK() {
			auth_VK({state: this.$store.state});
		},
		onAuthFB() {
			auth_FB({state: this.$store.state})
		},
		onAuthGOOGLE() {
			auth_GOOGLE({state: this.$store.state});
		},
		onAuthAPPLE() {
			auth_APPLE({state: this.$store.state});
		},
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


