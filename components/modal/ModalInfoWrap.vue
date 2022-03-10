<template>
	<div class="_ModalInfoWrap popup text-center">
		<div class="popup__pic" v-if="$slots.pic">
			<slot name="pic"></slot>
		</div>
		<div class="popup__header">
			<div class="title" v-if="title">{{title}}</div>
			<slot name="title"></slot>
		</div>
		<div class="popup__caption" v-if="caption">{{caption}}</div>
		<div class="popup__description" v-if="description">
			{{description}}
		</div>
		<div class="popup__description" v-if="$slots.description">
			<slot name="description"></slot>
		</div>
		<div class="popup__footer" v-if="btnText">
			<v-btn full :class="{'--c-gray': btnColor === 'gray', '--c-light': btnColor === 'light'}" @click="$emit('close')">
				{{btnText}}
			</v-btn>
		</div>
		<div class="popup__footer" v-if="$slots.footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script>
	import VBtn from "@/components/_uikit/VBtn";

	export default {
		name: "ModalInfoWrap",
		props: {
			title: {
				type: String,
				default: () => '',
			},
			caption: {
				type: String,
				default: () => '',
			},
			description: {
				type: String,
				default: () => '',
			},
			btnText: {
				type: String,
				default: () => '',
			},
			btnColor: {
				type: String,
				default: () => '',
			},
		},
		components: {VBtn},
		data() {
			return {}
		},
		computed: {},
		methods: {},
		directives: {},
		filters: {},
		watch: {},
		mounted() {
		}
	}
</script>


