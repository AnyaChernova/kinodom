<template>
	<div class="_SearchFormConfirmModal popup">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-10/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header">
						<div class="title">Отправить анкету?</div>
					</div>
					<div class="popup__content">
						Ваша анкета будет отправлена менеджеру Кинодома. Мы подберем наиболее подходящие для Вашего запроса
						объекта и свяжемся с Вами в ближайшее время.
					</div>
					<div class="popup__footer text-center">
						<v-btn>Отправить</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import VBtn from "@/components/_uikit/VBtn";

export default {
	name: "SearchFormConfirmModal",
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
