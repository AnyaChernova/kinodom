const resource = '/api/v1/profile';
export default ($axios) => ({
	updateInfo(payload) {
		return $axios.patch(`${resource}/info/update`, payload);
	},

	updateEmail(payload) {
		return $axios.patch(`${resource}/email/update`, payload);
	},

	acceptEmail(payload) {
		return $axios.get(`${resource}/email/verification/send`, payload);
	},

	updatePhone(payload) {
		return $axios.patch(`${resource}/phone/update`, payload);
	},

	updatePassword(payload) {
		return $axios.patch(`${resource}/password/update`, payload);
	},

	updateAvatar(payload) {
		return $axios.post(`${resource}/avatar/update`, payload);
	},
})
