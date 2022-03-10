<template>
	<FormField
		class="_FormTextarea"
		:float="float"
		:active="isFloating"
		:id="createdCounter"
		:label="innerLabel"
		:caption="caption"
		:clearable="!!innerModel && clearable"
		:clearInput="clearInput"
		:errors="errors"
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
<!--		<template slot="afterInner" v-if="cut && cutLength">-->
<!--			<span class="fz-12">{{leftNumber}}</span>-->
<!--		</template>-->
		<template #afterInner>
			<slot name="afterInner"></slot>
		</template>
		<template #clearIcon>
			<v-svg name="close_b" w="12" h="12"/>
		</template>

		<textarea
			class="formControl"
			:class="[{'formControl--small': small}, inputClass]"
			ref="input"
			:id="createdCounter"
			v-model="innerModel"
			:disabled="disabled"
			v-bind="$attrs"
			v-on="controlListeners"
			:maxlength="cutLength"
		></textarea>

		<FormFieldError :errors="errors"/>

	</FormField>
</template>

<script>
	import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";
	import _fieldFloat from "@/components/_mixins/_fieldFloat";
	import autosize from 'autosize';
	import FormFieldError from "@/components/form/FormFieldError";

	export default {
		name: "FormTextarea",
		props: {
			float: {
				type: Boolean,
				default() {
					return false
				},
			},
			cut: {
				type: Boolean,
				default() {
					return false
				},
			},
			cutLength: {
				type: Number,
				default() {
					return null
				}
			},
			clearable: {
				type: Boolean,
				default: true,
			},
		},
		mixins: [_baseFormField_mixin, _fieldFloat],
		components: {FormFieldError},
		data() {
			return {}
		},
		computed: {
			innerLabel() {
				if (this.cut && this.cutLength) {
					return `${this.label} (${this.modelValue.length}/${this.cutLength} симв.)`;
				} else {
					return this.label;
				}
			},
			// leftNumber() {
			// 	if (this.modelValue !== null) {
			// 		return this.cutLength - this.modelValue.length;
			// 	} else {
			// 		return 0
			// 	}
			// }
		},
		methods: {},
		directives: {},
		filters: {},
		watch: {},
		updated() {
			autosize.update(this.$refs.input);
		},
		mounted() {
			this.$nextTick(() => {
				autosize(this.$refs.input);
			})
		},
		beforeDestroy() {
			autosize.destroy(this.$refs.input);
		}
	}
</script>
