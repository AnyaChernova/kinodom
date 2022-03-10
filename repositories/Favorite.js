const resource = '/api/v1/favorite';
export default ($axios) => ({
	all(payload) {
		return $axios.get(`${resource}`, payload);
	},

	add(id) {
		return $axios.post(`${resource}/${id}`);
	},

	delete(id) {
		return $axios.post(`${resource}/${id}`, {
			'_method': 'DELETE'
		});
	},

	allTransport(payload) {
		return $axios.get(`${resource}/transport`, payload);
	},

	addTransport(id) {
		return $axios.post(`${resource}/transport/${id}`);
	},

	deleteTransport(id) {
		return $axios.post(`${resource}/transport/${id}`, {
			'_method': 'DELETE'
		});
	},
})
