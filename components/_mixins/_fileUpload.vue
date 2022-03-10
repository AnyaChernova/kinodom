<script>
	export default {
		name: "FileUpload",
		props: {
			multiple: {
				type: Boolean,
				default() {
					return false
				}
			},
			fileFormats: {
				type: String,
				default() {
					return ''
				}
			},
			fileMaxSize: {
				type: Number,
				default() {
					return 0
				}
			},
		},
		data() {
			return {}
		},
		methods: {
			filterFileBySize(files) {
				if (this.fileMaxSize === 0) return files;
				return files.filter((file) => {
					const isValidSize = file.size <= this.fileMaxSize;
					if (!isValidSize) {
						this.$snotify.error(`Файл превышает максимальный размер (${this.$humanFileSize(this.fileMaxSize)})`, 'Ошибка загрузки');
					}
					return isValidSize;
				})
			},
			filterFileByFormat(files) {
				if (this.fileFormats === '') return files;
				return files.filter((file) => {
					const ext = this.$fileExtension(file.name);
					const isValidFormat = this.fileFormats.includes(ext.toLocaleLowerCase());
					if (!isValidFormat) {
						this.$snotify.error('Формат файла не разрешен', 'Ошибка загрузки');
					}
					return isValidFormat
				})
			},
			emitFiles(files) {
				if (files && files.length) {
					if (this.multiple) {
						this.$emit('upload', files);
					} else {
						this.$emit('upload', files[0]);
					}
				}
			},
			loadFile(e) {
				try {
					const files = e.target.files || e.dataTransfer.files;
					let filesArray = Array.from(files);
					const validFiles = this.filterFileByFormat(this.filterFileBySize(filesArray));
					this.emitFiles(validFiles);
				} catch (e) {
				}
			},
			onChangeInputFile(e) {
				this.loadFile(e);
				e.target.value = '';
			},
			onClickChangeFile() {
				this.$refs.inputFile.click();
			},
		},
	}
</script>
