<script>
	export default {
		name: "_baseFormComponent",
		props: {},
		components: {},
		data() {
			return {
				loading: false,
				formUrl: '',
				formUrlParam: '',
				formFunc: '',
				formParams: {},
				formData: {},
				formError: {
					global: '',
					fields: {},
				},
			}
		},
		computed: {
			isErrors() {
				const fields = Object.keys(this.formError.fields);
				if (fields.length) {
					const fieldErrors = fields.filter((field) => this.formError.fields[field].length);
					return fieldErrors.length > 0;
				}
			}
		},
		methods: {
			fillFields(fieldsForm, fieldsResponse) {
				Object.keys(fieldsForm).forEach((key) => {
					if (fieldsResponse[key]) {
						if (!Array.isArray(fieldsForm[key]) && typeof fieldsForm[key] === 'object' && fieldsForm[key] !== null) {
							this.fillFields(fieldsForm[key], fieldsResponse[key]);
						} else {
							this.$set(fieldsForm, key, fieldsResponse[key]);
						}
					}
				});
			},

			formDataFilePrepare(file, field) {
				const formData = new FormData();
				const formDataObj = {
					...this.formData
				};
				if (file) {
					formDataObj[field] = file;
				} else if (formDataObj[field] === null) {
					formDataObj[field] = '';
				} else {
					delete formDataObj[field];
				}
				Object.entries(formDataObj).forEach(([key, value]) => {
					formData.append(key, value);
				});

				return formData
			},

			formDataFilesPrepare() {
				const formData = new FormData();
				const formDataObj = {
					...this.formData
				};
				Object.entries(formDataObj).forEach(([key, value]) => {
					if (Array.isArray(value)) {
						value.forEach((item) => {
							formData.append(`${key}[]`, item);
						});
					} else {
						formData.append(key, value);
					}
				});

				return formData
			},

			submitForm(formData = null) {
				if (!this.formUrl) {
					throw new Error('this.formUrl не задан');
				}

				this.$resetFormErrors({
					formError: this.formError,
				});

				this.loading = true;
				let newFormData = null;

				if (formData instanceof FormData) {
					newFormData = formData;
					if (this.formParams && Object.keys(this.formParams).length) {
						Object.entries(this.formParams).forEach(([key, value]) => {
							formData.append(key, value);
						})
					}
				} else {
					newFormData = {
						...this.formParams,
						...(formData || this.formData),
					};
				}

				return this.$repositories[this.formUrl][this.formFunc](newFormData, this.formUrlParam || void (0)).then((res) => {
					this.loading = false;
					return res.data;
				}).catch(({response}) => {
					// if (res.response) {
					// 	this.$setFormErrors({
					// 		response: res.response,
					// 		formError: this.formError,
					// 	});
					// }
					if (response.message) {
						this.$snotify.error(response.message);
					}
					this.loading = false;
					throw response;
				})
			},

			createFormErrorModel(formData, formError) {
				Object.keys(formData).forEach((key) => {
					if (formData[key] && !Array.isArray(formData[key]) && typeof formData[key] === 'object') {
						if (!formError[key]) {
							this.$set(formError, key, {});
						}
						this.createFormErrorModel(formData[key], formError[key]);
					} else {
						this.$set(formError, key, []);
					}
				});
			},

			createWatchers() {
				Object.keys(this.formData).forEach((field) => {
					this.$watch(`formData.${field}`, () => {
						if(this.formError.fields[field]) {
							this.formError.fields[field] = [];
						}
					})
				});
			},
		},
		directives: {},
		filters: {},
		watch: {},
		created() {
			this.createFormErrorModel(this.formData, this.formError.fields);
		},
		mounted() {
			this.createWatchers();
		}
	}
</script>

