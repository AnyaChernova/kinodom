<template>
	<div class="_testViewer viewer">
		<div class="viewer__header viewer__header--sticky">
			<div class="viewer__sticky-left">
				<div class="title-s">Vue viewer</div>
			</div>
			<div class="viewer__sticky-right">
				<md-icon>cancel</md-icon>
				<md-icon>cancel</md-icon>
			</div>
		</div>
		<div class="viewer__header">
			<div style="width: 500px; height: 100px; background-color: black"></div>
		</div>
		<div class="viewer__content">
			<div v-for="i in 300">
				{{ i }}
			</div>
		</div>
		<div class="viewer__footer">
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
		name: "testViewer",
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
