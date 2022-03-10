const resource = '/api/v1';
export default ($axios) => ({
	professions(payload) {
		return $axios.get(`${resource}/professions`, payload);
	},

	regions(payload) {
		return $axios.get(`${resource}/regions`, payload);
	},

	types(payload) {
		return $axios.get(`${resource}/types`, payload);
	},

	styles(payload) {
		return $axios.get(`${resource}/styles`, payload);
	},

	tags(payload) {
		return $axios.get(`${resource}/tags`, payload);
	},

	info(payload) {
		return $axios.get(`${resource}/info_pages`, payload);
	},

	metatags(payload) {
		return $axios.get(`${resource}/metatags/index`, payload);
	},
})
