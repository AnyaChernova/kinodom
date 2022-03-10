<template>
	<label class="_FormCheckbox formOption" :class="{'--error': isErrorShow && errors && errors.length}">

		<input
			type="radio"
			v-bind="$attrs"
			v-on="$listeners"
			v-model="innerModel"
			:value="value"
			:readonly="readonly"
			:disabled="disabled"
		>

		<span class="formOption__element">
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
		name: "FormRadio",
		inheritAttrs: false,
		mixins: [_baseFormField_mixin],
		props: {
			value: {
				type: [Boolean, Number, String, Object, Array],
				default() {
					return true
				}
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
					return this.modelValue !== null ? this.modelValue : this.tempModel;
				},
				set(val) {
					this.tempModel = this.value;
					this.$emit('modelChange', this.value);
					this.isErrorShow = false;
				}
			}
		},
		methods: {},
		directives: {},
		filters: {},
		watch: {},
		mounted() {
		}
	}
</script>
