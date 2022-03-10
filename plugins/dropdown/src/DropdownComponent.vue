<template>
	<span class="_Dropdown" ref="wrap">
		<div class="_dr_ dropdown" v-if="isShow || alwaysOn"
				 :class="[{isActive: isActive, fixMaxWidth: !widthByAnchor}, targetClass]"
				 ref="root">
			<slot/>
		</div>
	</span>
</template>

<script>
import {createPopper, dropdownCore} from "./dropdown-core";

export default {
	name: "Dropdown",
	model: {
		prop: 'modelValue',
		event: 'modelChange'
	},
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			default: '',
		},
		manual: {
			type: Boolean,
			default: false,
		},
		alwaysOn: {
			type: Boolean,
			default: false,
		},
		saveInnerClick: {
			type: Boolean,
			default: false,
		},
		saveBodyClick: {
			type: Boolean,
			default: false,
		},
		saveAnchorClick: {
			type: Boolean,
			default: false,
		},
		widthByAnchor: {
			type: Boolean,
			default: false,
		},
		targetClass: {
			type: [String, Array, Object],
			default: '',
		},
		top: {
			type: Boolean,
			default: false,
		},
		topStart: {
			type: Boolean,
			default: false,
		},
		topEnd: {
			type: Boolean,
			default: false,
		},
		bottom: {
			type: Boolean,
			default: false,
		},
		bottomStart: {
			type: Boolean,
			default: false,
		},
		bottomEnd: {
			type: Boolean,
			default: false,
		},
		right: {
			type: Boolean,
			default: false,
		},
		rightStart: {
			type: Boolean,
			default: false,
		},
		rightEnd: {
			type: Boolean,
			default: false,
		},
		left: {
			type: Boolean,
			default: false,
		},
		leftStart: {
			type: Boolean,
			default: false,
		},
		leftEnd: {
			type: Boolean,
			default: false,
		},
		offset: {
			default: () => ([0, 0])
		},
	},
	components: {},
	data() {
		return {
			popper: null,
			isActive: false,
			isShow: false,
			anchorEl: null,
			dropdownEl: null,
			dropdownWrap: null,
			anchorObserver: null,
		}
	},
	computed: {
		popperPlacement() {
			let placement = 'bottom';
			this.top && (placement = 'top');
			this.topStart && (placement = 'top-start');
			this.topEnd && (placement = 'top-end');
			this.bottom && (placement = 'bottom');
			this.bottomStart && (placement = 'bottom-start');
			this.bottomEnd && (placement = 'bottom-end');
			this.right && (placement = 'right');
			this.rightStart && (placement = 'right-start');
			this.rightEnd && (placement = 'right-end');
			this.left && (placement = 'left');
			this.leftStart && (placement = 'left-start');
			this.leftEnd && (placement = 'left-end');
			return placement;
		},
	},
	methods: {
		open() {
			this.isShow = true;
			this.$nextTick(() => {
				this.dropdownEl = this.$refs.root;
				this.dropdownWrap = this.$refs.wrap;
				this.moveToBody();
				this.initPopper();
				this.addBodyEventListener();
				this.startAnchorObserver();
				this.isActive = true;
				this.$emit('modelChange', true);
			});
		},

		close() {
			this.destroyPopper();
			this.removeBodyEventListener();
			this.stopAnchorObserver();
			this.isActive = false;
			this.moveToWrap();
			this.$nextTick(() => {
				this.isShow = false;
				this.dropdownEl = null;
				this.$emit('modelChange', false);
			});
		},

		moveToBody() {
			document.body.appendChild(this.dropdownEl);
			this.dropdownEl.wrapLink = this.dropdownWrap;
		},

		moveToWrap() {
			if (!this.isShow) return;
			this.dropdownWrap.appendChild(this.dropdownEl);
		},

		addBodyEventListener() {
			if (process.server) return;
			// Клик на документе срабатывает при открытии
			setTimeout(() => {
				document.addEventListener('click', this.onBodyClick, true);
			}, 1);
		},

		removeBodyEventListener() {
			document.removeEventListener('click', this.onBodyClick, true);
		},

		startAnchorObserver() {
			const config = {attributes: true, childList: true, subtree: true, characterData: true};
			try {
				if (!this.anchorObserver) {
					this.anchorObserver = new MutationObserver(this.onAnchorUpdate);
				}
				this.anchorObserver.observe(this.anchorEl, config);
			} catch (e) {
				console.log(e)
			}
		},

		stopAnchorObserver() {
			if (!this.anchorObserver) return;
			try {
				this.anchorObserver.disconnect();
			} catch (e) {
				console.log(e)
			}
		},

		removeAnchorObserver() {
			if (!this.anchorObserver) return;
			this.stopAnchorObserver();
			this.anchorObserver = null;
		},

		initPopper() {
			if (!this.anchorEl || !this.dropdownEl) return;
			this.popper = createPopper(this.anchorEl, this.dropdownEl, {
				placement: this.popperPlacement,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: this.offset,
						},
					},
					{
						name: 'widthByAnchor',
						enabled: this.widthByAnchor,
					}]
			});
		},

		destroyPopper() {
			if (!this.popper) return;
			this.popper.destroy();
			this.popper = null;
		},

		checkInnerClick(target) {
			const targetEl = target.closest('._dr_');
			if (!targetEl) return false;
			if (targetEl === this.dropdownEl) return true;
			const targetWrap = targetEl.wrapLink;
			return this.dropdownEl.contains(targetWrap);
		},

		onAnchorUpdate() {
			this.popper.update();
		},

		onBodyClick(event) {
			const target = event.target;
			if (this.anchorEl.contains(target) || this.saveBodyClick) return;
			if (!this.saveInnerClick || !this.checkInnerClick(target)) {
				this.close();
			}
		},

		onAnchorClick() {
			const save = this.saveAnchorClick;
			if (!this.anchorEl || this.manual) return;
			this.isActive ? !save && this.close() : this.open();
		},

		onAnchorInit(anchorEl) {
			this.anchorEl = anchorEl;
		}
	},
	directives: {},
	filters: {},
	watch: {
		modelValue(newValue, oldValue) {
			if (newValue === oldValue) return;
			if (newValue === this.isActive) return;
			newValue ? this.open() : this.close();
		}
	},
	mounted() {
		dropdownCore.on(this.name, 'click', this.onAnchorClick);
		dropdownCore.initContainer(this.name, this.onAnchorInit);
	},
	beforeDestroy() {
		this.moveToWrap();
		this.removeAnchorObserver();
		dropdownCore.off(this.name);
		dropdownCore.destroyContainer(this.name);
		this.destroyPopper();
	}
}
</script>
