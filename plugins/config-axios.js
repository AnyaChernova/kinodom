function logger(response) {
	let log = {
		status: response.status,
		config: {
			url: response.config.url,
			method: response.config.method,
			params: response.config.params,
			headers: response.config.headers,
		},
		data: {
			message: response.data.message,
			error: response.data.error,
			errors: response.data.errors,
		},
	};
	console.log(`${new Date()}: `, JSON.stringify(log, null, 2));
}

export default function ({app, $axios, error, redirect}) {
	$axios.onError(({response}) => {
		const code = response && response.status;
		if (+code === 404) {
			error({statusCode: 404})
		}
		if (+code === 403) {
			error({statusCode: 403})
		}
		if (+code === 401 && app.$auth.loggedIn && !!app.$auth.user) {
			redirect(redirect('/'));
			app.$auth.logout();
		}
		if (process.server) {
			logger(response);
		} else {
			console.log(response);
		}
	})
}
