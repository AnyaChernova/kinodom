export const serializeToUrl = function (obj) {
	let isEmpty = true;
	let resultString = '';
	Object.entries(obj).map(([key, value]) => {
		if(value) {
			isEmpty = false;
			resultString += `${key}=${encodeURIComponent(value)}&`
		}
	});
	return isEmpty? '': `${resultString.slice(0, -1)}`;
};

export const serializeToObj = function (str) {
	if(!str) return '';
	let resObj = {};
	str.split('&').map((key) => {
		let rowArr = key.split('=');
		resObj[rowArr[0]] = decodeURIComponent(rowArr[1])
	});
	return resObj;
};
