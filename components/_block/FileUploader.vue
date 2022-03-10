<template>
	<div class="_FileUploader uploadCard" :class="{highlight, '--error': errors.length}" ref="dropZone"
			 @click="onClickChangeFile">

		<input type="file" ref="inputFile" class="hidden" :multiple="multiple" :accept="fileFormats"
					 @change="onChangeInputFile">

		<div class="uploadCard__placeholder s:hidden" :class="placeholderClassList" v-if="isShowPlaceholder && isInit">
			<transition name="hoverPlaceholder">
				<div class="uploadCard__hoverPlaceholder" v-if="highlight && isInit">
					<div class="uploadCard__titleLarge">{{placeholderTitle}}</div>
				</div>
			</transition>
				<div class="uploadCard__description" v-if="description">{{description}}</div>
				<!--          <div class="uploadCard__row" v-if="fileFormats">-->
				<!--            Разрешенные форматы: {{fileFormatsForShow}}-->
				<!--          </div>-->
				<!--          <div class="uploadCard__row" v-if="fileMaxSize">-->
				<!--            Максимальный размер: {{$humanFileSize(fileMaxSize)}}-->
				<!--          </div>-->
			</div>
		<div class="uploadCard__footer text-center">
				<v-btn simple :loading="loading">
					<v-svg name="upload" w="24" h="24" class="mr-8"/>
					{{uploadBtnTitle}}
				</v-btn>
		</div>
	</div>
</template>

<script>
import VBtn from "@/components/_uikit/VBtn";
import _fileUpload from "@/components/_mixins/_fileUpload";

export default {
	name: "FileUploader",
	mixins: [_fileUpload],
	props: {
		loading: {
			type: Boolean,
			default: () => false,
		},
		progress: {
			type: Object,
			default: () => ({
				total: 0,
				loaded: 0,
			}),
		},
		placeholderClassList: {
			type: String,
			default() {
				return ''
			}
		},
		description: {
			type: String,
			default() {
				return ''
			}
		},
		placeholderTitle: {
			type: String,
			default() {
				return 'Перетащите файлы сюда'
			}
		},
		uploadBtnTitle: {
			type: String,
			default() {
				return 'Выберите файл'
			}
		},
		isShowPlaceholder: {
			type: Boolean,
			default() {
				return true
			}
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		errors: {
			type: Array,
			default() {
				return []
			}
		},
	},
	components: {VBtn},
	data() {
		return {
			isInit: false,
			highlight: false,
			highlightTimeout: null,
		}
	},
	computed: {
		fileFormatsForShow() {
			return this.fileFormats.replace(/\./g, '');
		},
	},
	methods: {
		preventDefaults(e) {
			e.preventDefault();
			e.stopPropagation();
		},
		onDragEnter(e) {
			this.preventDefaults(e);
			if (this.loading) return;
			this.highlight = true;
		},
		onDragOver(e) {
			this.preventDefaults(e);
		},
		onDragLeave(e) {
			this.preventDefaults(e);
			if (e.target !== this.$refs.dropZone) return false;
			this.highlight = false;
		},
		onDropFile(e) {
			this.preventDefaults(e);
			if (this.loading) return;
			this.highlight = false;
			this.loadFile(e);
		},
		initDropZone() {
			this.$refs.dropZone.addEventListener('dragenter', this.onDragEnter);
			this.$refs.dropZone.addEventListener('dragover', this.onDragOver);
			this.$refs.dropZone.addEventListener('dragleave', this.onDragLeave);
			this.$refs.dropZone.addEventListener('drop', this.onDropFile);
			this.isInit = true;
		},
		destroyDropZone() {
			this.$refs.dropZone.removeEventListener('dragenter', this.onDragEnter);
			this.$refs.dropZone.removeEventListener('dragover', this.onDragOver);
			this.$refs.dropZone.removeEventListener('dragleave', this.onDragLeave);
			this.$refs.dropZone.removeEventListener('drop', this.onDropFile);
			this.isInit = false;
		},
	},
	directives: {},
	filters: {},
	watch: {
		disabled(newValue) {
			if (newValue && !this.isInit) {
				this.initDropZone();
			} else if (!newValue && this.isInit) {
				this.destroyDropZone();
			}
		},
	},
	mounted() {
		if (!this.disabled) {
			this.initDropZone();
		}
	},
	beforeDestroy() {
		if (this.isInit) {
			this.destroyDropZone()
		}
	},
}
</script>
