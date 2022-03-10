export const filterQueryEncode = (query) => {
	return JSON.stringify(query);
};
export const filterQueryDecode = (query) => {
	return JSON.parse(query);
};
