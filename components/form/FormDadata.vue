<template>
	<div class="_FormDadata">
		<FormSelect
			float
			search
			:deselected="false"
			option-track-by="value"
			option-label="value"
			:options="innerOptions"
			:loading="searchLoading"
			v-model="innerModel"
			@search="onTyping"
			@clear="clearInput"
			v-bind="$attrs"
			v-on="$listeners">
		</FormSelect>
	</div>
</template>

<script>


import FormSelect from "~/components/form/FormSelect";

export default {
	name: "FormDadata",
	inheritAttrs: false,
	model: {
		prop: 'modelValue',
		event: 'modelChange'
	},
	props: {
		modelValue: {
			type: null,
			default: null,
		},
		options: {
			type: Array,
			default: () => [],
		},
		dadataUrl: {
			type: String,
			default: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
		},
	},
	components: {FormSelect},
	data() {
		return {
			dadataToken: '4a6b0de7ee5b0000a149f3597299839b4dcc384e',
			tempModel: this.title,
			innerOptions: [...this.options],
			searchLoading: false,
			searchTimeout: null,
		}
	},
	computed: {
		innerModel: {
			get() {
				return this.modelValue !== null ? this.modelValue : this.tempModel;
			},
			set(val) {
				this.tempModel = val;
				this.$emit('modelChange', val);
			}
		}
	},
	methods: {
		async startSearch(searchString) {
			if (this.dadataToken) {
				this.searchLoading = true;
				await this.$axios.post(this.dadataUrl, {
					query: searchString,
				}, {
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"Authorization": `Token ${this.dadataToken}`
					}
				}).then((res) => {
					this.innerOptions = res.data.suggestions.map((item) => {
						return item
					});
					this.searchLoading = false;
				}).catch(() => {
					this.$snotify.error('Ошибка');
					this.searchLoading = false;
				});
			}
		},
		async onTyping(searchString) {
			if (!searchString) {
				clearTimeout(this.searchTimeout);
				this.searchLoading = false;
				this.innerOptions = [];
				return;
			}
			this.searchLoading = true;
			clearTimeout(this.searchTimeout);
			this.searchTimeout = setTimeout(() => {
				this.startSearch(searchString);
			}, 500);
		},
		clearInput() {
			this.innerModel = '';
			this.$emit('clear');
		},
	},
	directives: {},
	filters: {},
	watch: {
		options() {
			this.innerOptions = [...this.options];
		}
	},
	mounted() {},
	beforeDestroy() {
	}
}
</script>
