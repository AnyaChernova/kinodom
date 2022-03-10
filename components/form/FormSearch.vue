<template>
	<div class="_FormSearch">
		<FormSelect
			ref="search"
			class="search"
			autocomplete="off"
			search
			:loading="loading"
			:options="options"
			option-track-by="id"
			option-label="title"
			:save-anchor-click="true"
			:search-value="$route.query.search || ''"
			@search="onTyping"
			v-bind="$attrs"
			v-on="$listeners">
			<template #option="{option}">
				<div class="d-flex">
					<v-svg :name="option.icon" w="18" h="18" class="mt-3 mr-10"/>
					<span>{{ option.title }}</span>
				</div>
			</template>
			<template #before>
				<div class="d-flex items-center">
					<span class="mr-8 s:hidden">
						<v-spinner :size="16" v-if="loading"/>
						<v-svg name="search" w="16" h="16" v-else/>
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
				<v-btn small @click="onSearch" :disabled="!searchActive" class="s:hidden">Найти</v-btn>
			</template>
			<template #clearIcon>
				<v-svg name="close_s" w="12" h="12"/>
			</template>
		</FormSelect>
	</div>
</template>

<script>

import VBtn from "@/components/_uikit/VBtn";
import FormSelect from "~/components/form/FormSelect";
import VSpinner from "~/components/_uikit/VSpinner";

export default {
	name: "FormSearch",
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
		inputClass: {
			type: [String, Object],
			default: '',
		},
		isSearchType: {
			type: Boolean,
			default: false,
		},
		isSearchBtn: {
			type: Boolean,
			default: false,
		},
		apiUrl: {
			type: String,
			default: ''
		},
		apiParams: {
			type: Object,
			default() {
				return {}
			}
		},
	},
	components: {VSpinner, FormSelect, VBtn},
	data() {
		return {
			loading: false,
			searchTimeout: null,
			searchActive: false,
			tempModel: '',
			options: [],
			type: '1',
			typeDefault: '1',
			searchTypes: {
				'1': {
					id: '1',
					title: 'Локация',
					icon: 'search_icon_location'
				},
				'3': {
					id: '3',
					title: 'Транспорт поддержки',
					icon: 'search_icon_autoSupport'
				},
			},
		}
	},
	computed: {
		searchTypeIcon() {
			return this.searchTypes[this.type] ? this.searchTypes[this.type].icon : this.searchTypes[this.typeDefault].icon;
		},
		innerModel: {
			get() {
				return this.modelValue !== null ? this.modelValue : this.tempModel;
			},
			set(val) {
				this.tempModel = val;
				this.$emit('modelChange', val);
			}
		}
	},
	methods: {
		onTyping(searchString) {
			this.searchActive = !!searchString;
			if (!searchString) {
				clearTimeout(this.searchTimeout);
				this.options = [];
				this.loading = false;
				return;
			}
			this.loading = true;
			clearTimeout(this.searchTimeout);
			this.searchTimeout = setTimeout(() => {
				this.startSearch(searchString);
			}, 500);
		},
		startSearch() {
			this.options = [
				{
					id: '1',
					title: 'Заброшенный дом культуры на окраине',
					icon: 'search-house'
				},
				{
					id: '2',
					title: 'Дом-усадьба бояр Панковых',
					icon: 'search-house'
				},
				{
					id: '3',
					title: 'район Центральный',
					icon: 'search-pin'
				},
				{
					id: '4',
					title: 'стиль интерьера СССР',
					icon: 'search-burger'
				},
				{
					id: '5',
					title: 'Безвременность',
					icon: 'search-hash'
				}
			];
			this.loading = false;
		},
		onSearch() {
			this.$emit('search');
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	},
	beforeDestroy() {
	}
}
</script>
