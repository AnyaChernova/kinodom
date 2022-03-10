<template>
	<div class="_SettingsEmailReadyModal popup">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-10/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header">
						<div class="title">Подтверждение e-mail</div>
					</div>
					<div class="popup__content">
						На почту <span class="text-mid">{{ $auth.user.email }}</span> отправлено письмо со ссылкой. После прехода по ссылке ваш e-mail будет подтвержден.
					</div>
					<div class="popup__footer text-center">
						<v-btn @click="$close(true)">Оk</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";

export default {
	name: "SettingsEmailReadyModal",
	props: {},
	components: {VBtn},
	data() {
		return {}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
