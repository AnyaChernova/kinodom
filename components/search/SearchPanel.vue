<template>
	<header class="_SearchPanel searchPanel">
		<div class="layout">
			<div class="searchPanel__inner">
				<div class="searchPanel__field">
					<FormInputSearch
						class="search"
						v-model="searchString"
						is-search-btn
						:is-search-type="$route.path !== '/map'"
						@search="onSearch"/>
				</div>
				<v-btn icon class="searchPanel__btn text-brand --m ml-m" :class="{active: isActive}" @click="onFilterClick">
					<v-svg name="filter" w="24" h="24"/>
				</v-btn>
			</div>
		</div>
	</header>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import FormSearch from "~/components/form/FormSearch";
import FormSelect from "~/components/form/FormSelect";
import {mapState} from "vuex";
import FormInputSearch from "~/components/form/FormInputSearch";
import {filterQueryEncode} from "~/utils/filterQuery";

export default {
	name: "SearchPanel",
	props: {},
	components: {FormInputSearch, FormSelect, FormSearch, VBtn},
	data() {
		return {
			searchString: this.$route.query.search || ''
		}
	},
	computed: {
		isActive() {
			return this.$route.query.filterParams;
		}
	},
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
			if (this.$route.path !== '/map') {
				if (searchString) {
					this.$router.push(`/locations?search=${searchString}`);
				} else {
					this.$router.push('/locations');
				}
			} else {
				if (searchString) {
					this.$router.replace({query: {search: searchString}});
				} else {
					this.$router.replace({query: {}});
				}
			}
		},
		searchTransport(searchString, type) {
			if (searchString) {
				this.$router.push(`/transport?search=${searchString}&type=${type}`);
			} else {
				this.$router.push('/transport');
			}
		},
	},
	directives: {},
	filters: {},
	watch: {
		'$route.query.search'() {
			this.searchString = this.$route.query.search || '';
		}
	},
	created() {
	},
	mounted() {
	},
}
</script>
