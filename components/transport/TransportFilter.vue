<template>
	<div class="_TransportFilter">
<!--		<div class="filterPanel__item">-->
<!--			<div class="filterPanel__title">-->
<!--				<span class="title-s">Тип транспорта</span>-->
<!--			</div>-->
<!--			<div class="btnRow btnRow&#45;&#45;xs">-->
<!--				<FormRadio-->
<!--					class="&#45;&#45;tab"-->
<!--					v-for="category in categories"-->
<!--					:key="category.id"-->
<!--					:value="category.id"-->
<!--					:inner-label="category.title"-->
<!--					v-model="filterData.type"/>-->
<!--			</div>-->
<!--		</div>-->
		<div class="filterPanel__item">
			<div class="filterPanel__title">
				<span class="title-s">Регион поиска</span>
			</div>
			<div class="btnRow btnRow--xs">
				<FormCheckbox
					class="--tab"
					v-for="region in regions"
					:key="region.id"
					:value="region.id"
					:inner-label="region.region"
					v-model="filterData.regions"/>
			</div>
		</div>
		<div class="filterPanel__item">
			<div class="filterPanel__title">
				<span class="title-s">Районы</span>
			</div>
			<template v-if="filterData.regions.length">
				<div class="fz-14 self-end" v-if="filterData.districts.length">Выбрано {{ filterData.districts.length }}</div>
				<div class="text-label fz-14 self-end" v-else>Любой</div>
			</template>
			<div class="text-label fz-14 self-end" v-else>Выберите регион поиска</div>
			<div class="filterPanel__right" v-if="filterData.regions.length">
				<v-btn simple class="btn--text" @click="onChangeDistrictsType">
					<span class="text-underline">Изменить</span>
					<v-svg name="arrow" w="24" h="24" class="ml-8"/>
				</v-btn>
			</div>
		</div>
		<div class="filterPanel__item">
			<div class="filterPanel__title">
				<span class="title-s">Ценовой диапазон</span>
			</div>
			<div class="btnRow btnRow--xs">
				<FormCheckbox
					class="--tab"
					v-for="type in priceTypes"
					:key="type.id"
					:value="type.id"
					:inner-label="type.type"
					v-model="filterData.price_type"/>
			</div>
		</div>
		<div class="filterPanel__item">
			<div class="filterPanel__title">
				<span class="title-s">Тип кузова</span>
			</div>
			<FormSelectFilter
				class="flex-grow"
				:values="transportTypes"
				option-track-by="id"
				option-label="type"
				v-model="filterData.types">
			</FormSelectFilter>
		</div>
		<div class="filterPanel__item">
			<div class="filterPanel__title">
				<span class="title-s">Стиль авто</span>
			</div>
			<FormSelectFilter
				class="flex-grow"
				:values="transportStyles"
				option-track-by="id"
				option-label="style"
				v-model="filterData.styles">
			</FormSelectFilter>
		</div>
		<div class="filterPanel__item">
			<div class="filterPanel__title">
				<span class="title-s">Теги</span>
			</div>
			<FormSelectFilter
				class="flex-grow"
				:values="transportTags"
				option-track-by="id"
				option-label="tag"
				v-model="filterData.tags">
			</FormSelectFilter>
		</div>
		<div class="filterPanel__footer popup__bottom">
			<div class="cells --gap-btn --line items-center justify-center">
				<div class="cell s:w-6/12">
					<v-btn class="s:w-full --wide" @click="onApplyFilter">Применить</v-btn>
				</div>
				<div class="cell s:w-6/12">
					<v-btn simple class="s:w-full" @click="onResetFilter">Сбросить все</v-btn>
				</div>
			</div>
		</div>
		<!--		<div class="filterPanel__item">-->
		<!--			<div class="filterPanel__title">-->
		<!--				<span class="title-s">Цвет</span>-->
		<!--			</div>-->
		<!--			<div class="btnRow btnRow&#45;&#45;xs">-->
		<!--				<v-btn class="&#45;&#45;badge">-->
		<!--					<span>Красный</span>-->
		<!--					<v-svg name="close_b" w="10" h="10" class="ml-8"/>-->
		<!--				</v-btn>-->
		<!--				<v-btn class="&#45;&#45;badge">-->
		<!--					<span>Оранжевый</span>-->
		<!--					<v-svg name="close_b" w="10" h="10" class="ml-8"/>-->
		<!--				</v-btn>-->
		<!--				<v-btn class="&#45;&#45;badge">-->
		<!--					<span>Желтый</span>-->
		<!--					<v-svg name="close_b" w="10" h="10" class="ml-8"/>-->
		<!--				</v-btn>-->
		<!--				<v-btn class="&#45;&#45;badge">-->
		<!--					<span>Белый</span>-->
		<!--					<v-svg name="close_b" w="10" h="10" class="ml-8"/>-->
		<!--				</v-btn>-->
		<!--			</div>-->
		<!--			<div class="filterPanel__right">-->
		<!--				<v-btn simple class="btn&#45;&#45;text">-->
		<!--					<span class="text-underline">Изменить</span>-->
		<!--					<v-svg name="arrow" w="24" h="24" class="ml-8"/>-->
		<!--				</v-btn>-->
		<!--			</div>-->
		<!--		</div>-->
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import {filterQueryDecode, filterQueryEncode} from "~/utils/filterQuery";
import {mapState} from "vuex";
import VSpinner from "~/components/_uikit/VSpinner";
import FormCheckbox from "~/components/_uikit/FormCheckbox";
import FormRadio from "~/components/_uikit/FormRadio";
import FormSelectFilter from "~/components/form/FormSelectFilter";

export default {
	name: "TransportFilter",
	props: {},
	components: {FormSelectFilter, FormRadio, FormCheckbox, VSpinner, VBtn},
	data() {
		return {
			categories: Object.values(this.$store.state.categories).slice(1, 3),
			filterData: {
				regions: [],
				districts: [],
				price_type: [],
				types: [],
				styles: [],
				tags: [],
			}
		}
	},
	computed: {
		...mapState([
			'regions',
			'priceTypes'
		]),
		...mapState('transport', [
			'transportTypes',
			'transportStyles',
			'transportTags',
		]),
		districts() {
			let districts = [];
			const selectedRegions = this.regions.filter(({id}) => this.filterData.regions.includes(id));
			if (selectedRegions.length) {
				selectedRegions.forEach((region) => {
					districts = districts.concat(region.districts);
				});
			}
			return districts;
		},
		tags() {
			return this.transportTags.map((tag) => {
				return {
					id: tag.id,
					tag: `#${tag.tag}`
				};
			});
		}
	},
	methods: {
		getFilterData() {
			const filterParams = this.$route.query.filterParams;
			if (filterParams) {
				const filterData = filterQueryDecode(filterParams);
				Object.entries(filterData).forEach(([key, value]) => {
					this.filterData[key] = value;
				});
			}
		},
		onApplyFilter() {
			const filterData = this.generateFilterData();

			this.$emit('apply', filterData);

			if (Object.keys(filterData).length) {
				this.$router.replace({path: '/transport', query: {filterParams: filterQueryEncode(filterData)}});
			} else {
				this.$router.replace({query: {}});
			}
		},
		generateFilterData() {
			const filterData = {};
			if (this.filterData.regions.length) filterData.regions = this.filterData.regions;
			if (this.filterData.districts.length) filterData.districts = this.filterData.districts;
			if (this.filterData.price_type.length) filterData.price_type = this.filterData.price_type;
			if (this.filterData.types.length) filterData.types = this.filterData.types;
			if (this.filterData.styles.length) filterData.styles = this.filterData.styles;
			if (this.filterData.tags.length) filterData.tags = this.filterData.tags;

			return filterData;
		},
		onResetFilter() {
			this.filterData = {
				regions: [],
				districts: [],
				price_type: [],
				types: [],
				styles: [],
				tags: [],
			}
		},
		async onChangeDistrictsType() {
			const districts = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Районы',
				placeholder: 'Например: Арбат',
				selectedItems: this.filterData.districts,
				allItems: this.districts,
				label: 'district'
			});

			if (districts) {
				this.filterData.districts = [...districts];
			}
		},
		async onChangeTransportType() {
			const types = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Тип кузова',
				placeholder: 'Например: Хэтчбек',
				selectedItems: this.filterData.types,
				allItems: this.transportTypes,
				label: 'type'
			});

			if (types) {
				this.filterData.types = [...types];
			}
		},
		async onChangeTransportStyle() {
			const styles = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Стиль авто',
				placeholder: 'Например: Классика',
				selectedItems: this.filterData.styles,
				allItems: this.transportStyles,
				label: 'style'
			});

			if (styles) {
				this.filterData.styles = [...styles];
			}
		},
		async onChangeTransportTags() {
			const tags = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Теги',
				placeholder: 'Например: #авто',
				selectedItems: this.filterData.tags,
				allItems: this.tags,
				label: 'tag'
			});

			if (tags) {
				this.filterData.tags = [...tags];
			}
		},
		onTransportTypeClick(id) {
			const index = this.filterData.types.findIndex((item) => item === id);
			if (index !== -1) {
				this.filterData.types.splice(index, 1);
			}
		},
		onTransportStyleClick(id) {
			const index = this.filterData.styles.findIndex((item) => item === id);
			if (index !== -1) {
				this.filterData.styles.splice(index, 1);
			}
		}
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
		if (this.$route.name === 'transport' || this.$route.name === 'map') {
			this.getFilterData();
		}
	},
	mounted() {
	},
}
</script>
