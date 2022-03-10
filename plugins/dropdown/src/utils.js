export function isEmpty(value = {}) {
	if (value == null) {
		return true;
	}
	for (const key in value) {
		if (Object.hasOwnProperty.call(value, key)) {
			return false;
		}
	}
	return true;
}
