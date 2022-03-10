<template>
	<FormField
		class="_FormInputSearch"
		:id="createdCounter"
		v-bind="$props"
		:clearable="!!innerModel && clearable"
		:clearInput="clearInput"
		:isErrorShow="isErrorShow"
		:errors="errors"
	>
		<template #beforeInner>
			<slot name="beforeInner"></slot>
		</template>
		<template #before>
			<div class="d-flex items-center">
					<span class="mr-8 s:hidden">
						<v-svg name="search" w="16" h="16"/>
					</span>
				<FormSelect
					v-if="isSearchType"
					class="--searchPanel mr-8"
					options-list-class="--panel"
					dropdown-class="--bigRadius"
					:dropdown-offset="[-16, 0]"
					:width-by-anchor="false"
					option-track-by="id"
					option-label="title"
					:deselected="false"
					:options="Object.values(searchTypes)"
					v-model="type">
					<template #option="{option}">
						<div class="d-flex items-center">
							<v-svg :name="option.icon" w="16" h="16" class="mr-m"/>
							<span class="ws-no-wrap">{{ option.title }}</span>
						</div>
					</template>
					<template #arrowIcon>
						<v-svg name="arrow-down" w="16" h="16"/>
					</template>
					<template #beforeInner>
						<v-svg :name="searchTypeIcon" w="16" h="16" class="mr-m"/>
					</template>
				</FormSelect>
			</div>
		</template>
		<template #after v-if="isSearchBtn">
			<v-btn small v-if="!!innerModel" class="s:hidden" @click="onSearch">Найти</v-btn>
		</template>
		<template #afterInner>
			<slot name="afterInner"></slot>
		</template>
		<template #clearIcon>
			<v-svg name="close_s" w="12" h="12"/>
		</template>

		<input
			class="formControl"
			autocomplete="off"
			:class="inputClass"
			ref="input"
			v-model="innerModel"
			:id="createdCounter"
			:type="type"
			@keyup.enter="onSearch"
			:disabled="disabled"
			v-bind="$attrs"
		>

		<FormFieldError :errors="errors"/>

	</FormField>
</template>

<script>
	import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";
	import FormFieldError from "@/components/form/FormFieldError";
	import VBtn from "~/components/_uikit/VBtn";
	import FormSelect from "~/components/form/FormSelect";
	import {mapState} from "vuex";

	export default {
		name: "FormInputSearch",
		mixins: [_baseFormField_mixin],
		props: {
			isSearchType: {
				type: Boolean,
				default: false,
			},
			isSearchBtn: {
				type: Boolean,
				default: false,
			},
			clearable: {
				type: Boolean,
				default: true,
			},
		},
		components: {FormSelect, VBtn, FormFieldError},
		data() {
			return {
				type: this.$route.query.type || '0',
				typeDefault: '0',
			}
		},
		computed: {
			...mapState({
				searchTypes: 'categories',
			}),
			searchTypeIcon() {
				return this.searchTypes[this.type] ? this.searchTypes[this.type].icon : this.searchTypes[this.typeDefault].icon;
			},
		},
		methods: {
			onSearch() {
				this.$emit('search', {searchString: this.innerModel, type: this.type});
			}
		},
		directives: {},
		filters: {},
		watch: {},
		mounted() {
		},
	}
</script>
