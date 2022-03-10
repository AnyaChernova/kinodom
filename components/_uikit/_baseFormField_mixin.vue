<template>
	<FormField :label="label" :caption="caption" :errors="errors">
		<input v-bind="$attrs" v-on="$listeners" type="text" v-model="innerModel">
		<!--Проброс слотов в FormBaseLabel-->
		<slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>
		<template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
			<slot :name="slot" v-bind="scope"/>
		</template>
	</FormField>
</template>

<script>
	import FormField from "@/components/_uikit/FormField";

	let createdCounter = 0;

	export default {
		name: "_baseFormField_mixin",
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
			label: {
				type: String,
				default: ''
			},
			errors: {
				type: Array,
				default: () => []
			},
			caption: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			readonly: {
				type: Boolean,
				default: false,
			},
			clearable: {
				type: Boolean,
				default: false,
			},
			small: {
				type: Boolean,
				default: false,
			},
			inputClass: {
				type: [String, Object],
				default: '',
			}
		},
		components: {FormField},
		data() {
			return {
				tempModel: '',
				isErrorShow: true,
				createdCounter: 0,
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
					this.isErrorShow = false;
				}
			}
		},
		methods: {
			clearInput() {
				if (!this.clearable) return;
				this.innerModel = '';
				if (!this.$refs.input) return;
				this.$refs.input.focus();
				this.$emit('clear');
			},
		},
		directives: {},
		filters: {},
		watch: {
			errors() {
				this.isErrorShow = true;
			},
		},
		created() {
			this.createdCounter = ++createdCounter;
		},
		mounted() {
			this.$el.focus = (options) => {
				this.$refs.input && this.$refs.input.focus(options);
			}
		}
	}
</script>
