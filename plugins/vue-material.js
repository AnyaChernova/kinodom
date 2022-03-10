import Vue from 'vue';

Vue.component('md-icon', {
	name: "md-icon",
	functional: true,
	props: {},
	render(h, {data, props, children}) {
		return h('span', {
			class: [data.class, 'md-icon'],
			staticClass: data.staticClass,
			style: data.style,
			staticStyle: data.staticStyle,
			attrs: data.attrs
		}, children);
	},
});
