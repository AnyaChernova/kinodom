<template>
	<div class="_testModal popup">
		<div class="popup__header">
			<div class="popup__title">Vue Modal</div>
		</div>
		<div class="popup__content">
			popup__content
		</div>
		<div class="popup__footer">
			<div class="cells --gap-5">
				<div class="cell">
					<v-btn outline @click="onClick">Отмена</v-btn>
				</div>
				<div class="cell">
					<v-btn @click="onClick">Сохранить</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import VBtn from "@/components/_uikit/VBtn";

	export default {
		name: "testModal",
		props: {},
		components: {VBtn},
		data() {
			return {
				text: '',

			}
		},
		methods: {
			onClick() {
				this.$close('asd')
			},
		},
		computed: {},
		mounted() {
		}
	}
</script>
