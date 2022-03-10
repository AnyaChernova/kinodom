import {filterQueryDecode} from "@/utils/filterQuery";

export const state = () => ({
	transports: [],
	transportsCount: 0,
	transportTypes: [],
	transportStyles: [],
	transportTags: [],
});

export const getters = {};

export const mutations = {
	SET_TRANSPORT(state, value) {
		state.transports = value;
	},
	SET_TRANSPORT_COUNT(state, value) {
		state.transportsCount = value;
	},
	SET_TRANSPORT_TYPES(state, value) {
		state.transportTypes = value;
	},
	SET_TRANSPORT_STYLES(state, value) {
		state.transportStyles = value;
	},
	SET_TRANSPORT_TAGS(state, value) {
		state.transportTags = value;
	},
};

export const actions = {
	async fetchTransportTypes({commit}) {
		const types = await this.$repositories.common.types({
			params: {
				category: 'transport'
			}
		}).then((res) => {
			return res.data || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_TRANSPORT_TYPES', types);
	},
	async fetchTransportStyles({commit}) {
		const styles = await this.$repositories.common.styles({
			params: {
				category: 'transport'
			}
		}).then((res) => {
			return res.data || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_TRANSPORT_STYLES', styles);
	},
	async fetchTransportTags({commit}) {
		const tags = await this.$repositories.common.tags({
			params: {
				category: 'transport'
			}
		}).then((res) => {
			return res.data.tags || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_TRANSPORT_TAGS', tags);
	},
	async getTransport({commit, rootState}, {query, pagination, all, count = 21}) {
		if (query.search) {
			return await this.$repositories.search.searchTransport({
				params: {
					tags: query.search,
					type: +query.type || void (0),
					pagination: pagination,
				}
			}).then((res) => {
				if (res.data.count) {
					commit('SET_TRANSPORT_COUNT', res.data.count);
				} else {
					commit('SET_TRANSPORT_COUNT', 0);
				}
				return res.data.transports || [];
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

			return await this.$repositories.search.filterTransport({
				params: {
					...params,
					pagination: pagination,
				}
			}).then((res) => {
				commit('SET_TRANSPORT_COUNT', res.data.countTransports);
				return res.data.transports || [];
			}).catch((res) => {
				console.dir(res);
				return [];
			});
		} else {
			return await this.$repositories.transport.all({
				params: {
					count: all ? void (0) : count,
					pagination: pagination,
					all: all
				}
			}).then((res) => {
				if (res.data.countTransports) {
					commit('SET_TRANSPORT_COUNT', res.data.countTransports);
				} else {
					commit('SET_TRANSPORT_COUNT', 0);
				}
				return res.data.transports || [];
			}).catch((res) => {
				console.dir(res);
				return [];
			});
		}
	},
	async fetchTransport({commit, dispatch}, {query, all}) {
		const transports = await dispatch('getTransport', {query, all});

		commit('SET_TRANSPORT', transports);
	},
	addToFavorite({commit}, id) {
		return this.$repositories.favorite.addTransport(id)
	},
	deleteFromFavorite({commit}, id) {
		return this.$repositories.favorite.deleteTransport(id)
	}
};
