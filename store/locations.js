import {filterQueryDecode} from "@/utils/filterQuery";

export const state = () => ({
	locations: [],
	locationsCount: 0,
	locationTypes: [],
	locationStyles: [],
	locationTags: [],
});

export const getters = {
};

export const mutations = {
	SET_LOCATIONS(state, value) {
		state.locations = value;
	},
	SET_LOCATIONS_COUNT(state, value) {
		state.locationsCount = value;
	},
	SET_LOCATION_TYPES(state, value) {
		state.locationTypes = value;
	},
	SET_LOCATION_STYLES(state, value) {
		state.locationStyles = value;
	},
	SET_LOCATION_TAGS(state, value) {
		state.locationTags = value;
	},
};

export const actions = {
	async fetchLocationTypes({commit}) {
		const types = await this.$repositories.common.types(
			{
				params: {
					category: 'location'
				}
			}
		).then((res) => {
			return res.data || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_LOCATION_TYPES', types);
	},
	async fetchLocationStyles({commit}) {
		const styles = await this.$repositories.common.styles(
			{
				params: {
					category: 'location'
				}
			}
		).then((res) => {
			return res.data || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_LOCATION_STYLES', styles);
	},
	async fetchLocationTags({commit}) {
		const tags = await this.$repositories.common.tags(
			{
				params: {
					category: 'location'
				}
			}
		).then((res) => {
			return res.data.tags || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_LOCATION_TAGS', tags);
	},
	async getLocations({commit, rootState}, {query, pagination, all, count = 21}) {
		if (query.search) {
			return await this.$repositories.search.search({
				params: {
					tags: query.search,
					pagination: pagination,
					count: all ? 1000 : count,
				}
			}).then((res) => {
				if (res.data.count) {
					commit('SET_LOCATIONS_COUNT', res.data.count);
				} else {
					commit('SET_LOCATIONS_COUNT', 0);
				}
				return res.data.locations || [];
			}).catch((res) => {
				console.dir(res);
				return [];
			});
		} else if (query.filterParams) {
			const filterParams = filterQueryDecode(query.filterParams);
			const params = {};
			Object.entries(filterParams).forEach(([key, value]) => {
				params[key] = JSON.stringify(value);
			});

			return await this.$repositories.search.filter({
				params: {
					...params,
					pagination: pagination,
					all: all
				}
			}).then((res) => {
				commit('SET_LOCATIONS_COUNT', res.data.countLocations);
				return res.data.locations || [];
			}).catch((res) => {
				console.dir(res);
				return [];
			});
		} else {
			return await this.$repositories.locations.all({
				params: {
					count: all ? 1000 : count,
					pagination: pagination,
				}
			}).then((res) => {
				commit('SET_LOCATIONS_COUNT', res.data.countLocations);
				return res.data.locations || [];
			}).catch((res) => {
				console.dir(res);
				return [];
			});
		}
	},
	async fetchLocations({commit, dispatch}, {query, all}) {
		const locations = await dispatch('getLocations', {query, all});

		commit('SET_LOCATIONS', locations);
	},
	clearLocations({commit}) {
		commit('SET_LOCATIONS', []);
		commit('SET_LOCATIONS_COUNT', 0);
	},
	addToFavorite({commit}, id) {
		return this.$repositories.favorite.add(id);
	},
	deleteFromFavorite({commit}, id) {
		return this.$repositories.favorite.delete(id);
	},
};
