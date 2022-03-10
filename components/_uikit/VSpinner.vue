<template functional>
	<div class="_VSpinner spinner-svg" :class="[data.staticClass, data.class]">
		<svg :width="props.size" :height="props.size" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="11" cy="11" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
		</svg>
	</div>
</template>

<script>
	export default {
		name: "VSpinner",
		props: {
			size: {
				type: [String, Number],
				default: () => '22',
			},
		},
	}
</script>
