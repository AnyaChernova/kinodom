<template>
	<FormField
		class="_FormTextarea"
		:id="createdCounter"
		:label="label"
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
		<template #afterInner>
			<slot name="afterInner"></slot>
		</template>
		<template #clearIcon>
			<slot name="clearIcon"></slot>
		</template>

		<textarea
			class="formControl"
			ref="input"
			:class="inputClass"
			:id="createdCounter"
			v-model="innerModel"
			:disabled="disabled"
			v-bind="$attrs"
			v-on="$listeners"
		></textarea>


	</FormField>
</template>

<script>
	import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";
	import autosize from 'autosize';

	export default {
		name: "FormTextarea",
		props: {},
		mixins: [_baseFormField_mixin],
		components: {},
		data() {
			return {}
		},
		computed: {},
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
