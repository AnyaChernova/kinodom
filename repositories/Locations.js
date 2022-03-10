const resource = '/api/v1/locations';
export default ($axios) => ({
	all(payload) {
		return $axios.get(`${resource}`, payload);
	},

	my(query) {
		if (query) {
			return $axios.get(`${resource}/my?filterStatus=${query}`);
		} else {
			return $axios.get(`${resource}/my?filterStatus=0`);
		}
	},

	show(id) {
		return $axios.get(`${resource}/${id}`);
	},

	create(payload) {
		return $axios.post(`${resource}`, payload);
	},

	edit(payload, id) {
		return $axios.post(`${resource}/${id}`, payload);
	},

	archive(id) {
		return $axios.post(`${resource}/${id}/archive`);
	},

	unarchive(id) {
		return $axios.post(`${resource}/${id}/unarchive`);
	},
})
