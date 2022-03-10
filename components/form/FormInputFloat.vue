<template>
	<FormField
		class="_FormInputFloat"
		float
		:active="isFloating"
		:id="createdCounter"
		v-bind="$props"
		:clearable="!!innerModel && clearable"
		:clearInput="clearInput"
		:isErrorShow="isErrorShow"
		:errors="errors"
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
			v-model="innerModel"
			:id="createdCounter"
			:type="type"
			:disabled="disabled"
			v-bind="$attrs"
			v-on="controlListeners"
		>

		<FormFieldError :errors="errors"/>

	</FormField>
</template>

<script>
	import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";
	import _fieldFloat from "@/components/_mixins/_fieldFloat";
	import FormFieldError from "@/components/form/FormFieldError";

	export default {
		name: "FormInputFloat",
		mixins: [_baseFormField_mixin, _fieldFloat],
		props: {
			type: {
				type: String,
				default: 'text',
			},
			clearable: {
				type: Boolean,
				default: true,
			},
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
		},
	}
</script>
