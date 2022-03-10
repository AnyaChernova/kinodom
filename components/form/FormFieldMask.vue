<template>
	<div class="_FormFieldMask formField">
		<FormField
			:float="float"
			:active="isFloating"
			:id="createdCounter"
			v-bind="$props"
			:clearable="!!innerModel && clearable"
			:errors="errors"
			:clearInput="clearInput"
			:isErrorShow="isErrorShow"
		>
			<template #before>
				<slot name="before"></slot>
			</template>
			<template #beforeInner>
				<slot name="beforeInner"></slot>
			</template>
			<template #after>
				<slot name="after"></slot>
			</template>
			<template #afterInner>
				<slot name="afterInner"></slot>
			</template>
			<template #clearIcon>
				<v-svg name="close_b" w="12" h="12"/>
			</template>

			<input
				class="formControl"
				:class="[{'formControl--small': small}, inputClass]"
				ref="input"
				autocomplete="off"
				type="text"
				:disabled="disabled"
				v-bind="$attrs"
				v-on="controlListeners"
			>

			<FormFieldError :errors="errors"/>

		</FormField>
	</div>
</template>

<script>
	import IMask from 'imask';
	import FormField from "@/components/_uikit/FormField";
	import FormFieldError from "@/components/form/FormFieldError";
	import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";
	import _fieldFloat from "@/components/_mixins/_fieldFloat";

	export default {
		name: "FormFieldMask",
		mixins: [_baseFormField_mixin, _fieldFloat],
		props: {
			float: {
				type: Boolean,
				default: true
			},
			isActive: {
				type: Boolean,
				default: false
			},
			clearable: {
				type: Boolean,
				default: true
			},
			maskOptions: {
				type: Object,
				default: () => {
					return {
						mask: Number,
						scale: 0,
						signed: false,
						unmask: true,
					}
				}
			},
		},
		components: {FormFieldError, FormField},
		data() {
			return {
				mask: null,
			}
		},
		computed: {
			isFloating() {
				return Boolean(this.mask && this.mask.value) || this.isControlFocus || this.isActive;
			},
		},
		methods: {
			updateInputValue() {
				this.mask.value = String(this.modelValue);
			},
			emitValue() {
				this.$emit('modelChange', this.mask.value ? this.mask.unmaskedValue : null);
			},
		},
		directives: {},
		filters: {},
		watch: {
			modelValue(newVal) {
				if (String(newVal) === this.mask.value) return;
				this.updateInputValue();
			}
		},
		mounted() {
			this.mask = IMask(this.$refs.input, this.maskOptions);
			this.mask.on('accept', this.emitValue);
			this.updateInputValue();
		},
		beforeDestroy() {
			this.mask.off('accept', this.emitValue);
			this.mask.destroy();
		}
	}
</script>
