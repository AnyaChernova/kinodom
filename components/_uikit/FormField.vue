<template functional>
	<label
		class="_FormField formField"
		:class="{'--error': props.isErrorShow && props.errors && props.errors.length,
		'formField--small': props.small,
		'--float': props.float,
		'--search': props.search,
		'active': props.active
		}">

		<div class="formField__label" v-if="props.label">{{ props.label }}</div>

		<div class="formField__area formArea" :class="[{'formArea--small': props.small}, props.controlClass]">

			<div class="formArea__before" v-if="$slots.before">
				<slot name="before"/>
			</div>
			<div class="formArea__after" v-if="$slots.after">
				<slot name="after"/>
			</div>

			<div class="formArea__main">

				<div class="formArea__before-inner" v-if="$slots.beforeInner">
					<slot name="beforeInner"/>
				</div>
				<div class="formArea__after-inner" v-if="$slots.afterInner">
					<slot name="afterInner"/>
				</div>

				<button class="formArea__clear" type="button" v-show="props.clearable" tabindex="-1"
								@click.stop="props.clearInput">
					<slot name="clearIcon"/>
				</button>

				<slot/>

			</div>


		</div>

		<div class="formField__caption" v-if="props.caption">{{ props.caption }}</div>


	</label>
</template>

<script>
export default {
	name: "FormField",

	props: {
		label: {
			type: String,
			default() {
				return ''
			}
		},
		errors: {
			type: Array,
			default() {
				return []
			}
		},
		caption: {
			type: String,
			default() {
				return ''
			}
		},
		controlClass: {
			type: [String, Object, Array],
			default: '',
		},
		id: {
			type: [Number, String],
			default: 0,
		},
		clearable: {
			type: Boolean,
			default: false,
		},
		clearInput: {
			type: [Function, null],
			default: null,
		},
		isErrorShow: {
			type: Boolean,
			default: false,
		},
		small: {
			type: Boolean,
			default: false,
		},
		float: {
			type: Boolean,
			default: false,
		},
		search: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: false,
		}
	},
}
</script>
