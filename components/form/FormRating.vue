<template>
	<div class="_FormRating selectRate" :class="[classForRate, classForHoverRate]" @mouseleave="onMouseLeave">
		<label class="selectRate__star" v-for="i in 5" :key="`radio_${i}`" @mouseenter="onMouseEnter(i)">
			<input type="radio" :value="i" v-model="rate">
			<v-svg name="star" w="38" h="39"/>
		</label>
	</div>
</template>

<script>

	export default {
		name: "FormRating",
		props: {
			value: {
				type: Number,
				default() {
					return 0
				}
			},
		},
		components: {},
		data() {
			return {
				hoverRate: 0,
			}
		},
		computed: {
			classForHoverRate() {
				return `rate-hover-${this.hoverRate}`
			},
			classForRate() {
				return `rate-${this.rate}`
			},
			rate: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit('input', val)
				},
			}
		},
		methods: {
			onMouseEnter(i) {
				this.hoverRate = i;
			},
			onMouseLeave() {
				this.hoverRate = 0;
			},
		},
		directives: {},
		filters: {},
		watch: {},
		mounted() {},
		beforeDestroy() {}
	}
</script>
