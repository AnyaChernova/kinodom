<template>
	<div class="_RegisterStepFour cells cells--popup --gap flex-grow items-stretch">
		<div class="cell w-1/12 m:hidden"></div>
		<div class="cell w-5/12 m:w-12/12">
			<div class="popup__header">
				На вашу почту отправлено письмо со ссылкой для подтверждения e-mail. После перехода по ссылке ваш e-mail будет
				подтвержден
			</div>
			<nuxt-link to="/settings" class="link fz-18">Настройки профиля</nuxt-link>
		</div>
		<div class="cell w-1/12 m:hidden"></div>
		<div class="cell w-4/12 m:w-12/12 from-m:h-full">
			<div class="popup__inner">
				<div class="popup__footer text-center">
					<v-btn @click="onClickClose">Завершить</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";

export default {
	name: "RegisterStepFour",
	props: {},
	components: {VBtn},
	data() {
		return {}
	},
	methods: {
		onClickClose() {
			this.$emit('close');
		}
	},
	computed: {},
	mounted() {
	}
}
</script>
