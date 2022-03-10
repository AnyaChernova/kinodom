const resource = '/api/v1/history';
export default ($axios) => ({
	all(query) {
		if (query) {
			return $axios.get(`${resource}?filterStatus=${query}`);
		} else {
			return $axios.get(`${resource}?filterStatus=0`);
		}
	},

	transport(query) {
		if (query) {
			return $axios.get(`${resource}/transport/by?filterStatus=${query}`);
		} else {
			return $axios.get(`${resource}/transport/by?filterStatus=0`);
		}
	},

	show(id) {
		return $axios.get(`${resource}/${id}`);
	},
})
