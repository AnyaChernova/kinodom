export function loadScript(id, src) {
	return new Promise(function(resolve, reject) {
		if (document.getElementById(id)) {
			resolve(true);
			return;
		}

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		script.id = id;

		script.onerror = () => resolve(false);
		script.onload = () => {
			resolve(true);
		};

		const t = document.getElementsByTagName('script')[0];
		t.parentElement.insertBefore(script, t);

	});
}
