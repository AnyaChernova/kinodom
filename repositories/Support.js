const resource = '/api/v1/support';
export default ($axios) => ({
	all(payload) {
		return $axios.get(`${resource}`, payload);
	},

	create(payload) {
		return $axios.post(`${resource}`, payload);
	},
})
