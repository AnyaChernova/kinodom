<!--
Пример разметки в рендер-функции
<div class="_VBadge label">
	<div class="label__icon">
		<slot name="icon"/>
	</div>
	<div class="label__content">
		<slot/>
	</div>
</div>
-->
<script>
export default {
	name: "VBadge",
	functional: true,
	props: {
		color: {
			type: String,
			default: () => '',
		},
		upper: {
			type: Boolean,
			default: () => false,
		},
		iconRight: {
			type: Boolean,
			default: () => false,
		}
	},
	render(createElement, context) {
		const slots = context.slots();
		const iconNode = slots.icon;
		const defaultNode = slots.default;
		return createElement('div', {
			class: [
				'_VBadge badge',
				context.data.class,
				context.data.staticClass,
				context.props.color ? '--c-' + context.props.color : '',
				context.props.upper ? 'text-upper' : '',
			],
			style: [context.data.style, context.data.staticStyle],
			attrs: context.data.attrs,
			on: context.listeners,
			ref: context.data.ref,
		}, [
			iconNode && !context.props.iconRight ? createElement('div', {
				class: ['badge__icon']
			}, iconNode) : null,
			defaultNode ? createElement('div', {
				class: ['badge__content']
			}, defaultNode) : null,
			iconNode && context.props.iconRight ? createElement('div', {
				class: ['badge__icon']
			}, iconNode) : null,
		])
	},
}
</script>
