<template>
	<div class="_SearchField searchField" :class="{active: isActive}" @click="onSearchClick">
		<FormInputSearch
			class="search"
			:placeholder="placeholder"
			is-search-btn
			is-search-type
			v-model="searchString"
			@search="onSearch"/>
		<v-btn icon class="searchField__btn text-brand" @click="onFilterClick" v-if="!searchString">
			<v-svg name="filter" w="24" h="24"/>
		</v-btn>
	</div>
</template>

<script>

import FormInputSearch from "~/components/form/FormInputSearch";
import VBtn from "~/components/_uikit/VBtn";

export default {
	name: "SearchField",
	props: {},
	components: {VBtn, FormInputSearch},
	data() {
		return {
			isActive: false,
			placeholder: 'Что ищем?',
			placeholderDefault: 'Что ищем?',
			searchString: ''
		}
	},
	computed: {},
	methods: {
		onFilterClick() {
			this.$loadModal('filter/FilterMainModal', {isFull: true, lock: true});
		},
		onSearch({searchString, type}) {
			if (type === '0') {
				this.searchLocations(searchString);
			} else {
				this.searchTransport(searchString, type);
			}
		},
		searchLocations(searchString) {
			if (searchString) {
				this.$router.push(`/locations?search=${searchString}`);
			}
		},
		searchTransport(searchString, type) {
			if (searchString) {
				this.$router.push(`/transport?search=${searchString}&type=${type}`);
			}
		},
		onSearchClick() {
			this.isActive = true;
			this.placeholder = '';
			document.body.addEventListener('click', this.bodyHandler);
		},
		bodyHandler(e) {
			if (e.target.closest('.search') || e.target.closest('.dropdown')) return;
			this.isActive = false;
			this.placeholder = this.placeholderDefault;
			document.body.removeEventListener('click', this.bodyHandler);
		}
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	},
}
</script>
