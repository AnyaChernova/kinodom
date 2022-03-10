<template>
	<div class="_SettingsEmailSuccessModal popup">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-10/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header">
						<div class="title">Подтверждение e-mail</div>
					</div>
					<div class="popup__content">
						Ваша почта <span class="text-mid">pochta_name@ru.ru</span> успешно подтверждена.<br>
						Теперь вам доступны все функции сайта.
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
	name: "SettingsEmailSuccessModal",
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
