export default ({app, $config }, inject) => {
	if (!$config.app_env.GA_ID) return false;

	const gaCounter = {
		set(path = '') {
			try {
				if (window['ga']) {
					window['ga']('set', 'page', path);
					window['ga']('send', 'pageview');
				}
			} catch(e) {
				console.dir(e);
			}
		},
	};

	app.router.afterEach((to, from) => {
		gaCounter.set(to.fullPath);
	});
}
