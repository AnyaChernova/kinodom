export default ({title, description, keywords, image, script}, _self = null) => {
	if(!_self) {
		console.log('отсуствует контекст _self');
		return {};
	}
	let default_title = 'Кинодом';
	let default_description = '';
	let default_keywords = '';

	return {
		title: title || default_title,
		script: script,
		meta: [
			{ hid: 'description', name: 'description', content: description || default_description},
			{ hid: 'keywords', name: 'keywords', content: keywords || default_keywords},
			{name: 'og:title', content: title || default_title},
			{name: 'og:description', content: description || default_description},
			{name: 'og:url', content: process.browser ? window.location.href : ''},
			{name: 'og:image', content: image || (process.browser ? window.location.origin : '') + '/img/public.png?v=2'},
			{name: 'og:site_name', content: 'Кинодом'},
		],
	};
}
