const request = require('request');
export default function (req, res, next) {
	const url = req.url.slice(1);
	if(url) {
		return request({
			url: url,
			method: req.method,
		}).pipe(res)
	} else {
		res.statusCode = 404;
		res.end(false);
	}
}
