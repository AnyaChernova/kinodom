<template>
	<div class="_TabsControl">
		<client-only>
			<swiper class="tabs" :options="optionsSlider" ref="swiper" @ready="onSliderInit">
				<swiper-slide v-for="(tab, i) in tabs" :key="tab.value">
					<component
						class="tabs__item"
						exact
						:is="tab.to ? 'nuxt-link' : 'button'" :to="tab.to"
						:class="{active: isActive(i, tab)}"
						@click="onClick(i)">
						{{ tab.title }}
					</component>
				</swiper-slide>
			</swiper>
		</client-only>
	</div>
</template>

<script>

export default {
	name: "TabsControl",
	model: {
		prop: 'modelValue',
		event: 'modelChange'
	},
	props: {
		modelValue: {
			type: null,
			default: null,
		},
		activeTabIndex: {
			type: Number,
			default: 0
		},
		tabs: {
			type: Array,
			default: () => [
				{
					title: 'tab1',
					value: 'tab1'
				}
			]
		}
	},
	components: {},
	data() {
		return {
			swiper: null,
			optionsSlider: {
				slidesPerView: 'auto',
			},
		}
	},
	computed: {},
	methods: {
		onSliderInit() {
			this.swiper = this.$refs.swiper.$swiper;
			if (this.modelValue) {
				this.onModelValue();
			} else {
				this.swiper.slideTo(this.activeTabIndex, false, false);
			}
		},
		onModelValue() {
			const index = this.tabs.findIndex(({value}) => value === this.modelValue);
			if (index !== -1) {
				this.swiper.slideTo(index, false, false);
			}
		},
		onClick(i) {
			this.$emit('modelChange', this.tabs[i].value);
		},
		isActive(i, tab) {
			if (this.modelValue) {
				return tab.value === this.modelValue;
			} else {
				return i === this.activeTabIndex;
			}
		}
	},
	directives: {},
	filters: {},
	watch: {
		modelValue() {
			this.onModelValue();
		}
	},
	mounted() {
	}
}
</script>


