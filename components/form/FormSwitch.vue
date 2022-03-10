<template>
	<label class="_FormSwitch formOption" :class="{'--error': isErrorShow && errors && errors.length}">

		<input
			type="checkbox"
			v-bind="$attrs"
			v-on="$listeners"
			v-model="innerModel"
			:value="value"
			:disabled="disabled"
			:readonly="readonly"
		>

		<span class="formOption__element formOption__element--switch"/>
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
	import FormCheckbox from "@/components/_uikit/FormCheckbox";

	export default {
		name: "FormSwitch",
		mixins: [FormCheckbox],
		props: {},
		components: {},
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
