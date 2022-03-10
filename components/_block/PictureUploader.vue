<template>
	<div class="_PictureUploader">
		<v-btn simple class="picUpload" @click="onClickChangeFile">
				<img class="picUpload__img" :src="fileSrc" v-if="fileSrc">
				<v-svg class="picUpload__icon" name="camera" w="24" h="25" v-else/>
		</v-btn>
		<input type="file" ref="inputFile" class="hidden" :accept="fileFormats" @change="onChangeInputFile">
	</div>
</template>

<script>
	import VBtn from "@/components/_uikit/VBtn";
	import _fileUpload from "@/components/_mixins/_fileUpload";
	import _fileReader from "@/components/_mixins/_fileReader";
	export default {
		name: "PictureUploader",
		mixins: [_fileUpload, _fileReader],
		props: {},
		components: {VBtn},
		data() {
			return {}
		},
		computed: {},
		methods: {
			emitFiles(files) {
				if (files && files.length) {
					this.$emit('upload', files[0]);
					this.file = files[0];
				}
			},
		},
		directives: {},
		filters: {},
		watch: {},
		mounted() {
		}
	}
</script>


