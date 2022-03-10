<template>
	<div class="_FormSelectFilter">
		<FormSelect
			class="--filter"
			placeholder="Любой"
			multiple
			search
			search-place="dropdown"
			show-tags
			@search="onTyping"
			:option-label="optionLabel"
			:option-track-by="optionTrackBy"
			:options="options"
			v-model="innerModel"
			v-bind="$attrs"
			v-on="$listeners">
		</FormSelect>
	</div>
</template>

<script>

import VBtn from "@/components/_uikit/VBtn";
import FormSelect from "~/components/form/FormSelect";
import VSpinner from "~/components/_uikit/VSpinner";

export default {
	name: "FormSelectFilter",
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
		values: {
			type: Array,
			default: () => []
		},
		optionTrackBy: {
			type: String,
			default() {
				return 'id'
			}
		},
		optionLabel: {
			type: String,
			default() {
				return 'title'
			}
		},
	},
	components: {FormSelect},
	data() {
		return {
			options: [...this.values],
			allOptions: [...this.values],
		}
	},
	computed: {
		innerModel: {
			get() {
				return this.modelValue;
			},
			set(val) {
				this.$emit('modelChange', val);
			}
		}
	},
	methods: {
		onTyping(searchString) {
			this.searchString = searchString;
			if (!searchString) {
				this.options = this.allOptions;
				return;
			}
			this.options = this.allOptions.filter((option) => option[this.optionLabel].toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
		},
	},
	directives: {},
	filters: {},
	watch: {
		values() {
			this.options = [...this.values];
			this.allOptions = [...this.values];
		}
	},
	mounted() {},
}
</script>
