<template>
	<div class="_loadViewerWrap">
		<div class="v-bg" :class="{init: isInit}" v-if="viewerProps.background" @mouseup.capture="close()"/>
		<div class="v-content" :class="[animationState]" @animationend="animationHandler" :style="`top: ${top}`"
				 ref="content">
			<div class="v-wrap" v-if="isLoading || isError">
				<v-spinner class="v-loader" :class="{'--centered': !viewerProps.animation}" size="36" v-if="isLoading"/>
				<v-alert class="v-error" v-else-if="isError" danger>Ошибка загрузки</v-alert>
			</div>

			<component
				v-scroll-box
				ref="viewer"
				:is="asyncComponent"
				v-bind="viewerProps"
				:displayFooterShadow="displayFooterShadow"
				@loaded="onViewerLoaded"
				@viewerMounted="onViewerMounted"
				@instantClose="$close(params)"
			/>
		</div>
	</div>
</template>

<script>
	import {viewerEventBus} from '@/plugins/vue-loadModal/index'
	import VSpinner from "@/components/_uikit/VSpinner";
	import VAlert from "@/components/_uikit/VAlert";

	export default {
		name: "loadViewerWrap",
		props: {
			viewerProps: {
				type: Object,
				default: () => ({}),
			}
		},
		components: {
			VSpinner,
			VAlert
		},
		data() {
			return {
				isInit: false,
				isAsyncComponent: false,
				animationState: null,
				asyncComponent: '',
				isLoading: true,
				isError: false,
				anchorElement: null,
				// defaultTop: 15,
				defaultTop: 0,
				top: null,
				params: null,
				displayFooterShadow: true,
			}
		},
		methods: {
			onViewerMounted() {
				if (this.viewerProps.animation) {
					this.animationState = 'load-start';
					if (!this.isAsyncComponent) {
						this.animationState = 'loaded';
					}
				}
				this.$refs.viewer.$el.addEventListener('reach-start', this.scrollPositionHandler);
				this.$refs.viewer.$el.addEventListener('between', this.scrollPositionHandler);
				this.$refs.viewer.$el.addEventListener('reach-end', this.scrollPositionHandler);

				this.$refs.viewer.$el.addEventListener('created', this.scrollStateHandler);
				this.$refs.viewer.$el.addEventListener('updated', this.scrollStateHandler);
			},
			onViewerLoaded() {
				if (this.viewerProps.animation) {
					if (this.animationState && this.animationState !== 'close' && this.animationState !== 'close-short' && this.isLoading) {
						this.animationState = 'loaded';
					}
				}
				this.isLoading = false;
			},
			close() {
				if (this.isLoading && this.viewerProps.animation) {
					this.animationState = 'close-short';
				} else {
					this.animationState = 'close';
				}
			},
			animationHandler(evt) {
				switch (evt.animationName) {
					case 'loaded':
						this.animationState = null;
						break;
					case 'load-start':
						this.animationState = 'on-load';
						break;
					case 'close':
					case 'close-short':
						this.$refs.content.style.display = 'none';
						this.animationState = null;
						this.$close(this.params);
						this.params = null;
						break;
				}
			},
			scrollHandler() {
				const rect = this.anchorElement.getBoundingClientRect();
				if (rect.bottom > 0) {
					this.top = `${this.defaultTop + rect.bottom}px`
				} else {
					this.top = `${this.defaultTop}px`
				}
			},
			windowHandler(event) {
				if (!process.browser) return false;
				if (event.key === 'Escape') {
					this.close()
				}
			},
			scrollPositionHandler(evt) {
				if (evt.detail.axis === 'y') {
					if (evt.type === 'between' || evt.type === 'reach-start') {
						this.displayFooterShadow = true
					} else if (evt.type === 'reach-end') {
						this.displayFooterShadow = false
					}
				}
			},
			scrollStateHandler(evt) {
				if (evt.detail.y === false) {
					this.displayFooterShadow = false
				}
			}
		},
		computed: {},
		watch: {},
		async mounted() {
			if (!process.browser) return false;

			viewerEventBus.on('routChange', this.$close);

			this.anchorElement = this.viewerProps.anchorElement ? this.viewerProps.anchorElement.$el || this.viewerProps.anchorElement : null;
			window.addEventListener('keydown', this.windowHandler);
			if (this.anchorElement) {
				window.addEventListener('scroll', this.scrollHandler);
				this.scrollHandler();
			}

			this.isInit = true;
			this.asyncComponent = async () => await import(`@/viewers/${this.component}`).then((res) => {
				const component = res.default;
				// проверка на асинхронный компонент
				if (!component.async) {
					this.isLoading = false;
				} else {
					this.isAsyncComponent = true;
				}
				// Добавление метод закрытия компоненту
				return {
					extends: component,
					methods: {
						$close(params) {
							this.$parent.animationState = 'close';
							this.$parent.params = params;
						},
						$instantClose(params) {
							this.$emit('instantClose', params)
						}
					},
					mounted() {
						this.$emit('viewerMounted')
					}
				};
			}).catch(() => {
				this.isLoading = false;
				this.isError = true;
			});
		},
		beforeDestroy() {
			if (!process.browser) return false;
			if (this.anchorElement) {
				window.removeEventListener('scroll', this.scrollHandler);
			}

			viewerEventBus.off('routChange', this.$close);

			this.$refs.viewer.$el.removeEventListener('reach-start', this.scrollPositionHandler);
			this.$refs.viewer.$el.removeEventListener('between', this.scrollPositionHandler);
			this.$refs.viewer.$el.removeEventListener('reach-end', this.scrollPositionHandler);

			this.$refs.viewer.$el.removeEventListener('created', this.scrollStateHandler);
			this.$refs.viewer.$el.removeEventListener('updated', this.scrollStateHandler);
		},
	}
</script>
