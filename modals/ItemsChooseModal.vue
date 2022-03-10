<template>
	<div class="_ItemsChooseModal popup popup--fix filterPanel">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout popup__wrap">
			<div class="title-l">{{ title }}</div>
			<div class="popup__header popup__header--s mt-10">
				<FormInput class="--searchFilter" :placeholder="placeholder" v-model="searchString">
					<template #beforeInner>
						<v-svg name="search" w="16" h="16"/>
					</template>
				</FormInput>
			</div>
			<div class="cells --gap-list">
				<div class="cell w-4/12 m:w-6/12 s:w-12/12" v-for="item in filteredItems" :key="item[trackBy]">
					<FormCheckbox :label="item[label]" :value="item[trackBy]" v-model="innerItems"/>
				</div>
			</div>
			<div class="filterPanel__footer filterPanel__footer--s popup__bottom">
				<div class="cells --gap-btn --line items-center justify-center">
					<div class="cell s:w-6/12">
						<v-btn class="s:w-full --wide" @click="onAcceptClick">Применить</v-btn>
					</div>
					<div class="cell s:w-6/12">
						<v-btn simple class="s:w-full" @click="onResetClick">Сбросить все</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "~/components/_uikit/VBtn";
import FormCheckbox from "~/components/_uikit/FormCheckbox";
import FormInput from "~/components/_uikit/FormInput";

export default {
	name: "ItemsChooseModal",
	props: {
		selectedItems: {
			type: Array,
			default: () => []
		},
		allItems: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		trackBy: {
			type: String,
			default: 'id'
		},
		label: {
			type: String,
			default: 'title'
		},
	},
	components: {FormInput, FormCheckbox, VBtn},
	data() {
		return {
			innerItems: [...this.selectedItems],
			searchString: '',
			timeout: null,
		}
	},
	computed: {
		filteredItems() {
			let items;
			if (this.searchString) {
				items = this.allItems.filter((item) => item[this.label].toLowerCase().includes(this.searchString.toLowerCase()));
			} else {
				items = [...this.allItems];
			}

			return items;
		}
	},
	methods: {
		onAcceptClick() {
			this.$close(this.innerItems);
		},
		onResetClick() {
			this.innerItems = [];
		},
	},
	mounted() {
	}
}
</script>
