<template>
	<div class="_testViewer viewer">
		<div class="viewer__header sticky d-flex">
			<div class="title-s">Vue viewer</div>
			<div class="title-s test">Vue viewer2</div>
		</div>
		<div class="viewer__header">
			<div class="title-s">Vue viewer</div>
		</div>
		<div class="viewer__header sticky">
			<div class="title-s">asd</div>
		</div>
		<div class="viewer__content">
			<div v-for="i in 300">
				{{ i }}
			</div>
		</div>
		<div class="viewer__footer" :class="{'viewer__footer--shadow': displayFooterShadow}">
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
		async: true,
		props: {
			displayFooterShadow: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		components: {VBtn},
		data() {
			return {
				text: '',

			}
		},
		methods: {
			init() {
				const nodes = this.$el.querySelectorAll('.sticky');
				Array.from(nodes).reduce((acc, el) => {
					el.style.top = `${acc}px`;
					acc += el.offsetHeight;
					return acc
				}, 0)
			},
			onClick() {
				this.$close('asd')
			},
		},
		computed: {},
		mounted() {
			this.init();
			setTimeout(() => {
				this.$emit('loaded');
			}, 1000)
		}
	}
</script>
