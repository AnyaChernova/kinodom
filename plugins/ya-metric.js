export default ({app, $config }, inject) => {
	const YA_ID = $config.app_env.YA_COUNTER_ID;
	let yaCounter = {
		reachGoal() {

		}
	}

	if ($config.app_env.YA_COUNTER_ID) {
		yaCounter = {
			reachGoal(TARGET_NAME = '') {
				try {
					window['ym'](YA_ID, 'reachGoal', TARGET_NAME);
				} catch(e) {
					console.dir(e);
				}
			},
			hit(path = '') {
				try {
					if (window['ym']) {
						window['ym'](YA_ID, 'hit', path);
					}
				} catch(e) {
					console.dir(e);
				}
			},
		};

		app.router.afterEach((to, from) => {
			yaCounter.hit(to.fullPath);
		});
	}

	inject('yaCounter', yaCounter);
}
