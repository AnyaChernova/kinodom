<script>
	import MediaAside from "@/components/_uikit/MediaAside";
	import MediaBody from "@/components/_uikit/MediaBody";

	export default {
		name: "Media",
		functional: true,
		props: {
			tag: {
				type: String,
				default() {
					return 'div'
				}
			},
			asideTag: {
				type: String,
				default() {
					return 'div'
				}
			},
			bodyTag: {
				type: String,
				default() {
					return 'div'
				}
			},
			rightAlign: {
				type: Boolean,
				default() {
					return false
				}
			},
			verticalAlign: {
				type: String,
				default() {
					return 'top'
				}
			},
			noBody: {
				type: Boolean,
				default() {
					return false
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
			const slots = context.slots();
			const {tag, asideTag, bodyTag, rightAlign, verticalAlign, noBody, disableRound} = context.props;
			const asideSlot = slots.aside;
			const defaultSlot = slots.default;

			const asideNode = asideSlot ? createElement(MediaAside, {
				props: {
					tag: asideTag,
					verticalAlign: verticalAlign,
					disableRound: disableRound,
				},
				class: [rightAlign ? 'ml-5' : 'mr-5']
			}, [asideSlot]) : null;
			const defaultNode = defaultSlot ? noBody ? defaultSlot : createElement(MediaBody, {
				props: {
					tag: bodyTag,
				},
				class: ['align-self-center']
			}, [defaultSlot]) : null;

			return createElement(tag, {
				class: ['_Media media', context.data.class, context.data.staticClass],
				style: [context.data.style, context.data.staticStyle],
				attrs: context.data.attrs,
				on: context.listeners,
				ref: context.data.ref
			}, rightAlign ? [defaultNode, asideNode] : [asideNode, defaultNode])
		}
	}
</script>
