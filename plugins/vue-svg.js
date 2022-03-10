import Vue from 'vue';

Vue.component('v-svg', {
	name: "v-svg",
	functional: true,
	props: {
		w: {
			type: [String, Number],
			default() {
				return 16
			}
		},
		h: {
			type: [String, Number],
			default() {
				return 16
			}
		},
		name: {
			type: String,
			default: () => '',
		}
	},
	render(h, {data, props, children}) {
		return h('svg-icon', {
			class: data.class,
			staticClass: data.staticClass,
			style: data.style,
			staticStyle: data.staticStyle,
			attrs: {
				...data.attrs,
				width: props.w,
				height: props.h,
				name: props.name,
			}
		}, children);
	},
});
