const resource = '/api/v1/password';
export default ($axios) => ({
	reset(payload) {
		return $axios.post(`${resource}/reset`, payload);
	},
})
