<script>
	export default {
		name: "MediaAside",
		functional: true,
		props: {
			tag: {
				type: String,
				default() {
					return 'div'
				}
			},
			verticalAlign: {
				type: String,
				default() {
					return 'top'
				}
			},
			disableRound: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		render(createElement, context) {
			const defaultNode = context.slots().default;
			const {tag, verticalAlign, disableRound} = context.props;
			const alignClass = verticalAlign === 'top' ? 'align-self-start' : verticalAlign === 'center' ? 'align-self-center' : verticalAlign === 'bottom' ? 'align-self-end' : '';

			return createElement(tag, {
				class: ['_MediaAside mediaAside', alignClass, {'mediaAside--round': !disableRound}, context.data.class, context.data.staticClass],
				style: [context.data.style, context.data.staticStyle],
				attrs: context.data.attrs,
				on: context.listeners,
				ref: context.data.ref
			}, defaultNode)
		}
	}
</script>
