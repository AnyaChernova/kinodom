<template>
	<div class="_LocationsFilter">
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
				<span class="title-s">Тип локации</span>
			</div>
			<FormSelectFilter
				class="flex-grow"
				:values="locationTypes"
				option-track-by="id"
				option-label="type"
				v-model="filterData.types">
			</FormSelectFilter>
		</div>
		<div class="filterPanel__item">
			<div class="filterPanel__title">
				<span class="title-s">Стиль пространства</span>
			</div>
			<FormSelectFilter
				class="flex-grow"
				:values="locationStyles"
				option-track-by="id"
				option-label="style"
				v-model="filterData.styles">
			</FormSelectFilter>
<!--			<div class="btnRow btnRow&#45;&#45;xs" v-if="selectedStyles.length">-->
<!--				<v-btn class="&#45;&#45;badge"-->
<!--							 v-for="selectedStyle in selectedStyles"-->
<!--							 :key="selectedStyle.id"-->
<!--							 @click="onLocationStyleClick(selectedStyle.id)">-->
<!--					<span>{{ selectedStyle.style }}</span>-->
<!--					<v-svg name="close_b" w="10" h="10" class="ml-8"/>-->
<!--				</v-btn>-->
<!--			</div>-->
<!--			<div class="text-label fz-14 self-end" v-else>Любой</div>-->
<!--			<div class="filterPanel__right">-->
<!--				<v-btn simple class="btn&#45;&#45;text" @click="onChangeLocationStyle">-->
<!--					<span class="text-underline">Изменить</span>-->
<!--					<v-svg name="arrow" w="24" h="24" class="ml-8"/>-->
<!--				</v-btn>-->
<!--			</div>-->
		</div>
		<div class="filterPanel__item">
			<div class="filterPanel__title">
				<span class="title-s">Теги</span>
			</div>
			<FormSelectFilter
				class="flex-grow"
				:values="tags"
				option-track-by="id"
				option-label="tag"
				v-model="filterData.tags">
			</FormSelectFilter>
		</div>
		<div class="filterPanel__bottom">
			<div class="cells --gap">
				<div class="cell w-6/12 s:w-12/12">
					<span class="title-s">Площадь</span>
					<div class="range-slider mt-m">
						<client-only>
							<vue-slider
								tooltip="always"
								:dot-size="24"
								:max="filterParams.square.max"
								:min="filterParams.square.min"
								v-model="filterData.square">
								<template v-slot:tooltip="{ value }">
									<div class="vue-slider-dot-tooltip-inner">{{ value }} м<sup>2</sup></div>
								</template>
							</vue-slider>
						</client-only>
					</div>
				</div>
				<!--					<div class="cell w-3/12 xl:w-6/12 s:w-12/12">-->
				<!--						<span class="title-s">Количество помещений</span>-->
				<!--						<div class="range-slider mt-m">-->
				<!--							<client-only>-->
				<!--								<vue-slider-->
				<!--									tooltip="always"-->
				<!--									:dot-size="24"-->
				<!--									:max="filterParams.rooms.max"-->
				<!--									:min="filterParams.rooms.min"-->
				<!--									v-model="filterData.rooms"/>-->
				<!--							</client-only>-->
				<!--						</div>-->
				<!--					</div>-->
				<!--					<div class="cell w-3/12 xl:w-6/12 s:w-12/12">-->
				<!--						<span class="title-s">Расстояние до парковки</span>-->
				<!--						<div class="range-slider mt-m">-->
				<!--							<client-only>-->
				<!--								<vue-slider-->
				<!--									tooltip="always"-->
				<!--									:dot-size="24"-->
				<!--									:max="this.filterParams.parking.max"-->
				<!--									:tooltip-formatter="val => `${val} м`"-->
				<!--									v-model="filterData.parking"/>-->
				<!--							</client-only>-->
				<!--						</div>-->
				<!--					</div>-->
			</div>
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
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import FormCheckbox from "~/components/_uikit/FormCheckbox";
import VSpinner from "~/components/_uikit/VSpinner";
import {mapState} from "vuex";
import {filterQueryDecode, filterQueryEncode} from "@/utils/filterQuery";
import FormSelect from "~/components/form/FormSelect";
import FormSelectFilter from "~/components/form/FormSelectFilter";

export default {
	name: "LocationsFilter",
	props: {},
	components: {FormSelectFilter, FormSelect, VSpinner, FormCheckbox, VBtn},
	data() {
		return {
			filterParams: {
				square: {min: 0, max: 5600}
			},
			filterData: {
				regions: [],
				districts: [],
				price_type: [],
				types: [],
				styles: [],
				tags: [],
				square: [0, 5600],
			}
		}
	},
	computed: {
		...mapState({
			regions: 'regions',
			priceTypes: 'priceTypes',
		}),
		...mapState('locations', {
			locationTypes: 'locationTypes',
			locationStyles: 'locationStyles',
			locationTags: 'locationTags',
		}),
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
			return this.locationTags.map((tag) => {
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
					if (key === 'square' || key === 'rooms') {
						this.filterData[key] = [value.to, value.from]
					} else {
						this.filterData[key] = value;
					}
				});
			}
		},
		onApplyFilter() {
			const filterData = this.generateFilterData();

			this.$emit('apply', filterData);

			if (Object.keys(filterData).length) {
				if (this.$route.path !== '/map') {
					this.$router.replace({path: '/locations', query: {filterParams: filterQueryEncode(filterData)}});
				} else {
					this.$router.replace({query: {filterParams: filterQueryEncode(filterData)}});
				}
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
			if (this.filterData.square[0] !== this.filterParams.square.min || this.filterData.square[1] !== this.filterParams.square.max) {
				filterData.square = {to: this.filterData.square[0], from: this.filterData.square[1]};
			}
			// if (this.filterData.rooms[0] !== this.filterParams.rooms.min || this.filterData.rooms[1] !== this.filterParams.rooms.max) {
			// 	filterData.rooms = {to: this.filterData.rooms[0], from: this.filterData.rooms[1]};
			// }
			// if (this.filterData.parking !== this.filterParams.parking.max) {
			// 	filterData.parking = this.filterData.parking;
			// }

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
				square: [this.filterParams.square.min, this.filterParams.square.max],
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
		async onChangeLocationType() {
			const types = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Тип локации',
				placeholder: 'Например: Гостиница',
				selectedItems: this.filterData.types,
				allItems: this.locationTypes,
				label: 'type'
			});

			if (types) {
				this.filterData.types = [...types];
			}
		},
		async onChangeLocationStyle() {
			const styles = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Стиль пространства',
				placeholder: 'Например: Классический',
				selectedItems: this.filterData.styles,
				allItems: this.locationStyles,
				label: 'style'
			});

			if (styles) {
				this.filterData.styles = [...styles];
			}
		},
		async onChangeLocationTags() {
			const tags = await this.$loadModal('ItemsChooseModal', {
				isFull: true,
				lock: true,
				title: 'Теги',
				placeholder: 'Например: #квартира',
				selectedItems: this.filterData.tags,
				allItems: this.tags,
				label: 'tag'
			});

			if (tags) {
				this.filterData.tags = [...tags];
			}
		},
		onLocationTypeClick(id) {
			const index = this.filterData.types.findIndex((item) => item === id);
			if (index !== -1) {
				this.filterData.types.splice(index, 1);
			}
		},
		onLocationStyleClick(id) {
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
		if (this.$route.name === 'locations' || this.$route.name === 'map') {
			this.getFilterData();
		}
	},
	mounted() {
	}
}
</script>
