<template>
	<label class="_FormCheckbox formOption" :class="{'--error': isErrorShow && errors && errors.length}">

		<input
			type="checkbox"
			v-bind="$attrs"
			v-on="$listeners"
			v-model="innerModel"
			:value="value"
			:disabled="disabled"
			:readonly="readonly"
		>

		<span class="formOption__element" :class="{'formOption__element--switch': mode === 'switch'}">
			<span v-if="innerLabel">{{innerLabel}}</span>
		</span>
		<span class="formOption__content" v-if="label || caption || $slots.default || $slots.label || $slots.caption">
			<slot/>
			<span class="formOption__label" v-if="label || $slots.label">
				<slot name="label">{{label}}</slot>
			</span>
			<span class="formOption__caption" v-if="caption || $slots.caption">
				<slot name="caption">{{caption}}</slot>
			</span>
			<template v-if="isErrorShow && errors && errors.length">
			<div class="formField__errorBox">
				<div class="formField__errorText" v-for="error in errors" :key="`error_${error}`">{{error}}</div>
			</div>
		</template>
		</span>
	</label>
</template>

<script>
	import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";

	export default {
		name: "FormCheckbox",
		inheritAttrs: false,
		mixins: [_baseFormField_mixin],
		props: {
			value: {
				type: [Boolean, Number, String, Object, Array],
				default() {
					return null
				}
			},
			trueValue: {
				default: true,
			},
			falseValue: {
				default: false,
			},
			mode: {
				default: 'checkbox',
			},
			innerLabel: {
				type: String,
				default: '',
			}
		},
		components: {},
		data() {
			return {}
		},
		computed: {
			innerModel: {
				get() {
					if (this.modelValue instanceof Array) {
						return this.modelValue.includes(this.value);
					} else if (this.modelValue !== null) {
						return this.modelValue === this.trueValue;
					}
					return this.tempModel;
				},
				set(val) {
					this.tempModel = this.getCheckboxValue(val);
					this.$emit('modelChange', this.tempModel);
					this.isErrorShow = false;
				}
			},
		},
		methods: {
			getCheckboxValue(val) {
				const isChecked = val;

				if (this.modelValue instanceof Array) {
					let newValue = [...this.modelValue];

					if (isChecked) {
						newValue.push(this.value);
					} else {
						newValue.splice(newValue.indexOf(this.value), 1);
					}

					return newValue;
				} else {
					return isChecked ? this.trueValue : this.falseValue;
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
