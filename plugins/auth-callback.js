export default async function ({app, store}) {

	let onLogin = async function () {

	};

	let onLogout = async function () {

	};

	store.watch(state => state.auth.loggedIn, async (newValue) => {
		if (newValue) {
			await onLogin();
			console.log('onLogin');
		} else {
			await onLogout();
			console.log('onLogout');
		}
	});

}
