<template>
	<div class="_loadModalWrap p-wrap" tabindex="1" v-focus>
		<div class="p-bg" :class="{init: isInit}"/>
		<div class="p-container" :class="{'--bottom': modalProps.isBottom}" @mouseup.capture="onClickToClose()">
			<div class="p-loader" v-if="isLoading">
				<v-spinner size="36"/>
			</div>
			<div class="p-error" v-else-if="isError">
				<v-alert danger>Ошибка загрузки</v-alert>
			</div>
			<div class="p-content" :class="{'--full': modalProps.isFull, '--small': modalProps.isSmall}" @mousedown="onMouseDown" @mouseup="onMouseUp">
				<button class="p-close" v-if="!isLoading && !modalProps.lock" @click="onClickToClose">
					<v-svg name="close_s" w="24" h="24"/>
				</button>
				<component
					:is="asyncComponent"
					v-bind="modalProps"
					@innerClose="onInnerClose"
					@loaded="onModalLoaded"
					@click.native="onCLickComponent($event)"/>
			</div>
		</div>
	</div>
</template>

<script>
	import VSpinner from "@/components/_uikit/VSpinner";
	import VAlert from "@/components/_uikit/VAlert";

	export default {
		name: "loadModalWrap",
		props: {
			modalProps: {
				type: Object,
				default: () => ({}),
			}
		},
		components: {VAlert, VSpinner},
		data() {
			return {
				asyncComponent: '',
				isLoading: true,
				isError: false,
				isInit: false,
				lockClick: false,
			}
		},
		methods: {
			windowHandler(event) {
				if (!process.browser) return false;
				if (event.key === 'Escape' && !this.modalProps.lock) {
					this.$close(null);
				}
			},
			onMouseDown() {
				this.lockClick = true;
			},
			onMouseUp() {
				this.lockClick = false;
			},
			onClickToClose(e) {
				if (!this.modalProps.lock && !this.lockClick) {
					this.$close(null);
				}
			},
			onCLickComponent(e) {
				// в попапе формы faq есть ссылки на файлы
				// if (e.target.tagName.toLowerCase() === 'a') {
				// 	this.$close(null);
				// }
			},
			onModalLoaded() {
				this.isLoading = false;
			},
			onInnerClose(param) {
				this.$close(param)
			},
		},
		computed: {},
		async mounted() {
			if (!process.browser) return false;
			this.isInit = true;
			this.$el.focus();
			window.addEventListener('keydown', this.windowHandler);
			this.$dScroll.disableGlobalScroll();
			this.asyncComponent = async () => await import(`@/modals/${this.component}`).then((res) => {
				const component = res.default;
				// проверка на асинхронный компонент
				if (!component.async) {
					this.isLoading = false;
				}
				// Добавление метод закрытия компоненту
				return {
					extends: component,
					methods: {
						$close(params) {
							this.$emit('innerClose', params)
						},
					}
				};
			}).catch(() => {
				this.isLoading = false;
				this.isError = true;
			});
		},
		beforeDestroy() {
			if (!process.browser) return false;
			this.$el.style.display = 'none';
			window.removeEventListener('keydown', this.windowHandler);
			this.$dScroll.enableGlobalScroll();
		},
	}
</script>
