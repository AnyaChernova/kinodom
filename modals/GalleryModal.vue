<template>
	<div class="_GalleryModal popup popup--dark">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="16" h="16"/>
		</button>
		<Gallery :pictures="pictures" :slide-to-index="slideToIndex"/>
	</div>
</template>
<script>

import Gallery from "~/components/_block/Gallery";

export default {
	name: "GalleryModal",
	props: {
		pictures: {
			type: Array,
			default: () => []
		},
		slideToIndex: {
			type: Number,
			default: 0,
		},
	},
	components: {Gallery},
	data() {
		return {}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
