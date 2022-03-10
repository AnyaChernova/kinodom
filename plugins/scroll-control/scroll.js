import check from "~/utils/check";

class DScroll {
	constructor(Vue) {
		if (check.isNode) return;
		this.vm = Vue;
		this.state = this.vm.observable({
			scrollDisabled: false,
		});
		this.body = document.body;
		this.rootElement = document.documentElement || this.body;
		this.disableCount = 0;
		this.savedScrollPositionY = 0;
		this.savedScrollPositionX = 0;
	}

	incCounter() {
		this.disableCount++;
	}

	decCounter() {
		if (this.disableCount > 0) this.disableCount--;
	}

	setDisableStyle() {
		const scrollWidth = window.innerWidth - this.rootElement.offsetWidth;
		this.rootElement.style.overflow = 'hidden';
		this.body.style.paddingRight = scrollWidth + 'px';
		if (this.body.querySelector('.header')) {
			this.body.querySelector('.header').style.paddingRight = scrollWidth + 'px';
		}
		this.body.style.overflow = 'hidden';
		this.body.style.height = window.innerHeight + 'px';
		this.body.scrollTo({
			top: this.savedScrollPositionY,
			left: this.savedScrollPositionX,
		});
	}

	removeDisableStyle() {
		this.body.scrollTo({top: 0, left: 0});
		this.rootElement.style.overflow = null;
		this.body.style.paddingRight = null;
		if (this.body.querySelector('.header')) {
			this.body.querySelector('.header').style.paddingRight = null;
		}
		this.body.style.overflow = null;
		this.body.style.height = null;
	}

	saveScrollPosition() {
		this.savedScrollPositionY = window.pageYOffset;
		this.savedScrollPositionX = window.pageXOffset;
	}

	restoreScrollPosition() {
		this.rootElement.scrollTo({
			top: this.savedScrollPositionY,
			left: this.savedScrollPositionX,
		});
		this.savedScrollPositionY = 0;
		this.savedScrollPositionX = 0;
	}

	disableGlobalScroll() {
		if (this.disableCount === 0) {
			this.saveScrollPosition();
			this.setDisableStyle();
			this.state.scrollDisabled = true;
		}
		this.incCounter();
	}

	enableGlobalScroll() {
		if (this.disableCount === 1) {
			this.removeDisableStyle();
			this.restoreScrollPosition();
			this.state.scrollDisabled = false;
		}
		this.decCounter();
	}
}

export default DScroll;
