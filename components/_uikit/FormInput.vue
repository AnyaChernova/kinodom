<template>
	<FormField
		class="_FormInput"
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
			<slot name="clearIcon"></slot>
		</template>


		<input
			class="formControl"
			:class="[{'formControl--small': small}, inputClass]"
			ref="input"
			v-model="innerModel"
			:id="createdCounter"
			:type="type"
			:disabled="disabled"
			v-bind="$attrs"
			v-on="$listeners"
		>

		<FormFieldError :errors="errors"/>

	</FormField>
</template>

<script>
	import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";
	import FormFieldError from "@/components/form/FormFieldError";

	export default {
		name: "FormInput",
		mixins: [_baseFormField_mixin],
		props: {
			type: {
				type: String,
				default: 'text',
			}
		},
		components: {FormFieldError},
		data() {
			return {}
		},
		computed: {},
		methods: {},
		directives: {},
		filters: {},
		watch: {},
		mounted() {
		}
	}
</script>
