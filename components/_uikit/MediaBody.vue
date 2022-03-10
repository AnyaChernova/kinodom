<script>
	export default {
		name: "MediaBody",
		functional: true,
		props: {
			tag: {
				type: String,
				default() {
					return 'div'
				}
			}
		},
		render(createElement, context) {
			const defaultNode = context.slots().default;
			return createElement('div', {
				class: ['MediaBody mediaBody', context.data.class, context.data.staticClass],
				style: [context.data.style, context.data.staticStyle],
				attrs: context.data.attrs,
				on: context.listeners,
				ref: context.data.ref
			}, [defaultNode])
		}
	}
</script>
