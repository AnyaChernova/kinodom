const resource = '/api/v1/orders';
export default ($axios) => ({
	review(id, payload) {
		return $axios.post(`${resource}/${id}/reviews`, payload);
	},
})
