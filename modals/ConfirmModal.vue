<template>
	<div class="_ConfirmModal popup">
		<div class="popup__header">
			<div class="title">{{ title }}</div>
		</div>
		<div class="popup__content" v-if="subTitle" v-html="subTitle"></div>
		<div class="popup__footer d-flex flex-wrap justify-end" :class="{'btnRow btnRow--mob': cancelText}">
			<v-btn :class="btnClass" @click="$close(true)">{{ btnText }}</v-btn>
			<v-btn outline @click="$close(false)" v-if="cancelText">{{ cancelText }}</v-btn>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";

export default {
	name: "ConfirmModal",
	props: {
		title: {
			type: String,
			default: 'Подтвердите действие',
		},
		subTitle: {
			type: String,
			default: '',
		},
		btnText: {
			type: String,
			default: 'Подтвердить',
		},
		btnClass: {
			type: String,
			default: '',
		},
		cancelText: {
			type: String,
			default: '',
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
