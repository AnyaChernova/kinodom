const resource = '/api/v1/search';
export default ($axios) => ({
	search(payload) {
		return $axios.get(`${resource}`, payload);
	},

	searchTransport(payload) {
		return $axios.get(`${resource}/transport`, payload);
	},

	filter(payload) {
		return $axios.get(`${resource}/filter`, payload);
	},

	filterTransport(payload) {
		return $axios.get(`${resource}/transport/filter`, payload);
	},

	filterParams(payload) {
		return $axios.get(`${resource}/filter/params`, payload);
	},

	filterTransportParams(payload) {
		return $axios.get(`${resource}/transport/filter/params`, payload);
	},
})
