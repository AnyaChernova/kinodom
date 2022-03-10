import Vue from 'vue';

class ScrollBox {
	constructor(el) {
		//элементы
		this.scrollEl = el;
		this.parent = el.parentNode;
		this.outer = null;
		this.overlay = null;
		this.XAxisBarEl = null;
		this.XAxisThumbEl = null;
		this.YAxisBarEl = null;
		this.YAxisThumbEl = null;
		this.body = document.querySelector('body');

		this.activeThumb = null;
		this.disableDrag = false;
		this.overlayClasses = [];

		this.observerEl = null;
		this.resizeObserver = null;
		this.mutationObserver = null;

		//кастомные ивенты
		//положение скроллбаров
		this.YBetween = false;
		this.XBetween = false;
		this['x-reach-start'] = new CustomEvent('reach-start', {
			detail: {
				axis: 'x',
			}
		});
		this['x-reach-end'] = new CustomEvent('reach-end', {
			detail: {
				axis: 'x',
			}
		});
		this['x-between'] = new CustomEvent('between', {
			detail: {
				axis: 'x',
			}
		});
		this['y-reach-start'] = new CustomEvent('reach-start', {
			detail: {
				axis: 'y',
			}
		});
		this['y-reach-end'] = new CustomEvent('reach-end', {
			detail: {
				axis: 'y',
			}
		});
		this['y-between'] = new CustomEvent('between', {
			detail: {
				axis: 'y',
			}
		});
		//хуки директивы
		this.hookDetail = {
			x: false,
			y: false,
		};
		this.created = new CustomEvent('created', {
			detail: this.hookDetail
		});
		this.updated = new CustomEvent('updated', {
			detail: this.hookDetail
		});
		this.destroyed = new CustomEvent('destroyed');

		//данные для рассчета
		this.isDrag = false;
		this.scrollElPropertyScrollTopMax = 0;
		this.scrollElPropertyScrollLeftMax = 0;

		this.eventDirection = null;
		this.eventCoord = 0;
		this.eventAnchorPoint = null;

		this.scrollPoint = {
			top: 0,
			left: 0
		};

		this.XAxisThumbElPropertyLeftMax = 0;
		this.XAxisThumbElLeftPosition = 0;

		this.YAxisThumbElPropertyTopMax = 0;
		this.YAxisThumbElTopPosition = 0;

		this.onScroll = this.onScroll.bind(this);
		this.resize = this.resize.bind(this);
		this.update = this.update.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}

	createDiv(className) {
		const el = document.createElement('div');
		if (className) {
			this.setClass(el, className);
		}
		return el;
	}

	setClass(el, className) {
		Array.isArray(className) ? el.classList.add(...className) : el.classList.add(className);
	}

	removeClass(el, className) {
		Array.isArray(className) ? el.classList.remove(...className) : el.classList.remove(className);
	}

	getStyle(el) {
		if (el.currentStyle) {
			return el.currentStyle;
		} else if (window.getComputedStyle) {
			return window.getComputedStyle(el, null);
		}
	}

	createTemplate(disableDrag, disableShowTransition, showOnHover) {
		if (showOnHover) {
			this.overlayClasses.push('scroll-box__overlay--show-on-hover');
		}
		if (disableDrag) {
			this.overlayClasses.push('scroll-box__overlay--disable-drag');
		}
		if (disableShowTransition) {
			this.overlayClasses.push('scroll-box__overlay--disable-show-transition');
		}

		this.XAxisBarEl = this.createDiv('scroll-box__scroll-barX');
		this.XAxisThumbEl = this.createDiv('scroll-box__thumbX');
		this.YAxisBarEl = this.createDiv('scroll-box__scroll-barY');
		this.YAxisThumbEl = this.createDiv('scroll-box__thumbY');
		this.outer = this.createDiv('scroll-box__outer');
		this.overlay = this.createDiv('scroll-box__overlay');


		this.XAxisBarEl.appendChild(this.XAxisThumbEl);
		this.YAxisBarEl.appendChild(this.YAxisThumbEl);
		this.overlay.appendChild(this.XAxisBarEl);
		this.overlay.appendChild(this.YAxisBarEl);
		this.outer.appendChild(this.overlay);

		this.parent.insertBefore(this.outer, this.scrollEl);

		this.XAxisThumbEl.scrollEl = this.scrollEl;
		this.YAxisThumbEl.scrollEl = this.scrollEl;

		this.setClass(this.overlay, this.overlayClasses);
		this.setClass(this.scrollEl, 'scroll-box');

		this.scrollEl.overlay = this.overlay;
		this.scrollEl.resize = this.resize;


		//без переключения оверфлоу не выходит скрыть нативный скролл
		const temp = this.scrollEl.style.overflow;
		this.scrollEl.style.overflow = 'hidden';
		setTimeout(() => {
			this.scrollEl.style.overflow = temp;
		});

		this.observerEl = this.createDiv('scroll-box__observer');
		this.observerWrap = this.createDiv('scroll-box__observerWrap');
		this.observerWrap.appendChild(this.observerEl);
		this.scrollEl.appendChild(this.observerWrap);
	}

	resizeWrap() {
		this.overlay.style.height = `${this.scrollEl.offsetHeight}px`;
		this.overlay.style.width = `${this.scrollEl.offsetWidth}px`;
	}

	resizeAxis(axis) {
		let size;
		let prop;
		let barEl;
		let thumbEl;

		if (axis === 'x') {
			size = 'Width';
			prop = 'Left';
			barEl = this.XAxisBarEl;
			thumbEl = this.XAxisThumbEl;
		} else {
			size = 'Height';
			prop = 'Top';
			barEl = this.YAxisBarEl;
			thumbEl = this.YAxisThumbEl;
		}

		const barSize = barEl[`offset${size}`];
		const scrollSize = this.scrollEl[`scroll${size}`];
		const thumbMinSize = this.getStyle(thumbEl)[`min${size}`];
		const thumbSizeAbs = (barSize * 100) / scrollSize;

		let thumbSize = (thumbSizeAbs * barSize) / 100;

		if (thumbSize < (parseFloat(thumbMinSize) || 0)) {
			thumbSize = (parseFloat(thumbMinSize) || 0)
		}

		this[`scrollElPropertyScroll${prop}Max`] = scrollSize - barSize;
		this[`${axis.toUpperCase()}AxisThumbElProperty${prop}Max`] = barSize - thumbSize;

		thumbEl.style[size.toLowerCase()] = `${thumbSize}px`;

		if (thumbSizeAbs === 100) {
			thumbEl.style.display = 'none';
			this.hookDetail[axis] = false;
		} else {
			thumbEl.style.display = 'block ';
			this.hookDetail[axis] = true;
		}
	}

	resize() {
		this.resizeWrap();
		this.resizeAxis('y');
		this.resizeAxis('x');
		this.onScroll();
	}

	onScroll() {
		if (!this.isDrag) {
			this.YAxisThumbElTopPosition = this.scaling(this.scrollEl.scrollTop, 0, this.scrollElPropertyScrollTopMax, 0, this.YAxisThumbElPropertyTopMax);
			this.YAxisThumbEl.style.top = `${this.YAxisThumbElTopPosition}px`;

			this.XAxisThumbElLeftPosition = this.scaling(this.scrollEl.scrollLeft, 0, this.scrollElPropertyScrollLeftMax, 0, this.XAxisThumbElPropertyLeftMax);
			this.XAxisThumbEl.style.left = `${this.XAxisThumbElLeftPosition}px`;
		}

		if (this.scrollElPropertyScrollTopMax !== 0) {
			if (this.scrollEl.scrollTop === 0) {
				this.scrollEl.dispatchEvent(this['y-reach-start']);
				this.YBetween = false;
			} else if (this.scrollEl.scrollTop === this.scrollElPropertyScrollTopMax) {
				this.YBetween = false;
				this.scrollEl.dispatchEvent(this['y-reach-end']);
			} else if (!this.YBetween) {
				this.YBetween = true;
				this.scrollEl.dispatchEvent(this['y-between']);
			}
		}

		if (this.scrollElPropertyScrollLeftMax !== 0) {
			if (this.scrollEl.scrollLeft === 0) {
				this.XBetween = false;
				this.scrollEl.dispatchEvent(this['x-reach-start']);
			} else if (this.scrollEl.scrollLeft === this.scrollElPropertyScrollLeftMax) {
				this.XBetween = false;
				this.scrollEl.dispatchEvent(this['x-reach-end']);
			} else if (!this.XBetween) {
				this.XBetween = true;
				this.scrollEl.dispatchEvent(this['x-between']);
			}
		}
	}

	onMouseEnter() {
		if (!this.overlay.classList.contains('scroll-box__overlay--hover')) {
			this.overlay.classList.add('scroll-box__overlay--hover')
		}
	}

	onMouseLeave() {
		if (this.overlay.classList.contains('scroll-box__overlay--hover')) {
			this.overlay.classList.remove('scroll-box__overlay--hover')
		}
	}

	setMouseListeners() {
		this.scrollEl.addEventListener('mouseenter', this.onMouseEnter);
		this.scrollEl.addEventListener('mouseleave', this.onMouseLeave);
	}

	clearMouseListeners() {
		this.scrollEl.removeEventListener('mouseenter', this.onMouseEnter);
		this.scrollEl.removeEventListener('mouseleave', this.onMouseLeave);
	}

	scaling(valIn, minIn, maxIn, minOut, maxOut) {
		return (((valIn - minIn) * (maxOut - minOut)) / (maxIn - minIn)) + minOut;
	}

	setScrollListener() {
		this.scrollEl.addEventListener('scroll', this.onScroll)
	}

	clearScrollListener() {
		this.scrollEl.removeEventListener('scroll', this.onScroll)
	}

	scrollTo(point, behavior = 'auto') {
		this.scrollEl.scrollTo({
			top: point.top,
			left: point.left,
			behavior
		})
	}

	init(disableDrag, disableShowTransition, showOnHover) {
		this.disableDrag = disableDrag;
		this.createTemplate(disableDrag, disableShowTransition, showOnHover);
		this.setScrollListener();
		this.setMouseListeners();

		this.resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				if (entry.target === this.observerEl || entry.target === this.scrollEl) {
					setTimeout(() => {

						this.resize()
					})
				}
			}
		});
		this.resizeObserver.observe(this.observerEl);
		this.resizeObserver.observe(this.scrollEl);

		this.mutationObserver = new MutationObserver(mutations => {
			this.observerEl.style.height = null;
			this.observerEl.style.width = null;

			setTimeout(() => {
				this.observerEl.style.height = `${this.scrollEl.scrollHeight}px`;
				this.observerEl.style.width = `${this.scrollEl.scrollWidth}px`;
			})
		});
		this.mutationObserver.observe(this.scrollEl, {
			childList: true,
			subtree: true,
			characterData: true,
			attributes: false,
		});

		this.scrollEl.dispatchEvent(this.created);
	}

	update() {
		// this.observerEl.style.height = null;
		// this.observerEl.style.width = null;
		//
		// this.observerEl.style.height = `${this.scrollEl.scrollHeight}px`;
		// this.observerEl.style.width = `${this.scrollEl.scrollWidth}px`;
		this.scrollEl.dispatchEvent(this.updated);
	}

	destroy() {
		this.resizeObserver.disconnect();
		this.resizeObserver = null;

		this.mutationObserver.disconnect();
		this.mutationObserver = null;

		this.clearScrollListener();
		this.clearMouseListeners();
		this.removeClass(this.scrollEl, 'scroll-box');
		this.parent.removeChild(this.outer);

		this.scrollEl.dispatchEvent(this.destroyed);
	}
}


class FabricScroll {
	constructor() {
		this.scrollInstances = new Map();
		this.activeInstance = null;
		this.isDragLock = false;


		//биндинг контекста колбэков
		this.onInserted = this.onInserted.bind(this);
		this.onComponentUpdated = this.onComponentUpdated.bind(this);
		this.onUnbind = this.onUnbind.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	//работа с инстансами скролбаров
	initNewInstance(el) {
		if (this.checkEmpty()) {
			this.setListeners();
		}
		const scrollBox = new ScrollBox(el);
		this.scrollInstances.set(el, scrollBox);
	}

	getInstance(el) {
		return this.scrollInstances.get(el);
	}

	setActiveInstance(el) {
		this.activeInstance = this.getInstance(el);
	}

	clearActiveInstance() {
		this.activeInstance = null;
	}

	deleteInstance(el) {
		return this.scrollInstances.delete(el);
	}

	checkEmpty() {
		return this.scrollInstances.size === 0;
	}

	//колбэки хуков директивы
	onInserted(el, {modifiers}) {
		this.initNewInstance(el);
		const scrollBox = this.getInstance(el);
		let {disableDrag, disableShowTransition, showOnHover} = modifiers;

		scrollBox.init(disableDrag, disableShowTransition, showOnHover);
	}

	onComponentUpdated(el) {
		const scrollBox = this.getInstance(el);

		setTimeout(scrollBox.update);
		if (!scrollBox.scrollEl.classList.contains('scroll-box')) {
			scrollBox.scrollEl.classList.add('scroll-box')
		}
	}

	onUnbind(el) {
		const scrollBox = this.getInstance(el);

		scrollBox.destroy();

		this.deleteInstance(el);

		if (this.checkEmpty()) {
			this.clearListeners();
		}
	}

	//хэлперы
	stopClick(evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}

	banClickEvents() {
		document.addEventListener('click', this.stopClick, true);
		document.addEventListener('dblclick', this.stopClick, true);
	}

	unBunClickEvents() {
		setTimeout(() => {
			document.removeEventListener('click', this.stopClick, true);
			document.removeEventListener('dblclick', this.stopClick, true);
		});
	}

	setListeners() {
		document.addEventListener('mousedown', this.onDragStart);
		document.addEventListener('mousemove', this.onDrag);
		document.addEventListener('mouseup', this.onDragEnd);
	}

	clearListeners() {
		document.removeEventListener('mousedown', this.onDragStart);
		document.removeEventListener('mousemove', this.onDrag);
		document.removeEventListener('mouseup', this.onDragEnd);
	}

	//колбэки слушателей

	getEl(evt) {
		return evt.target.scrollEl
	}

	getThumb(evt) {
		const targetClassList = evt.target.classList;
		if (targetClassList.contains('scroll-box__thumbX')) {
			return {
				el: evt.target,
				axis: 'X',
				prop: 'Left'
			}
		} else if (targetClassList.contains('scroll-box__thumbY')) {
			return {
				el: evt.target,
				axis: 'Y',
				prop: 'Top'
			}
		} else {
			return null
		}
	}

	onDragStart(evt) {
		const thumb = this.getThumb(evt);
		if (!thumb) return;
		const scrollEl = this.getEl(evt);
		this.setActiveInstance(scrollEl);
		if (this.activeInstance.disableDrag) return;
		this.activeInstance.activeThumb = thumb;
		let {axis, prop, el} = this.activeInstance.activeThumb;

		this.banClickEvents();

		el.parentNode.classList.add(`scroll-box__scroll-bar${axis}--full`);
		this.activeInstance.overlay.classList.add('scroll-box__overlay--drag');
		this.activeInstance.eventCoord = evt[`client${axis}`];
		this.activeInstance.isDrag = true;
		this.activeInstance.body.classList.add("unselectable");

		const thumbRect = el.getBoundingClientRect();
		this.activeInstance.eventAnchorPoint = this.activeInstance.eventCoord - thumbRect[prop.toLowerCase()];
	}

	onDrag(evt) {
		if (!this.activeInstance || this.activeInstance.disableDrag) return;
		setTimeout(() => {
			this.isDragLock = false;
		}, 8);
		this.isDragLock = true;
		let {axis, prop, el} = this.activeInstance.activeThumb;
		if (this.activeInstance.isDrag || !this.isDragLock) {
			const coordDelta = evt[`client${axis}`] - this.activeInstance.eventCoord;
			const thumbRect = el.getBoundingClientRect();

			if (coordDelta > 0) {
				this.activeInstance.eventDirection = 'increase'
			} else if (coordDelta < 0) {
				this.activeInstance.eventDirection = 'decrease'
			}

			if (this.activeInstance.eventDirection === 'decrease' && evt[`client${axis}`] <= thumbRect[prop.toLowerCase()] + this.activeInstance.eventAnchorPoint ||
				this.activeInstance.eventDirection === 'increase' && evt[`client${axis}`] >= thumbRect[prop.toLowerCase()] + this.activeInstance.eventAnchorPoint) {
				this.activeInstance[`${axis}AxisThumbEl${prop}Position`] += coordDelta;

				if (this.activeInstance[`${axis}AxisThumbEl${prop}Position`] < 0) {
					this.activeInstance[`${axis}AxisThumbEl${prop}Position`] = 0;
				} else if (this.activeInstance[`${axis}AxisThumbEl${prop}Position`] > this.activeInstance[`${axis}AxisThumbElProperty${prop}Max`]) {
					this.activeInstance[`${axis}AxisThumbEl${prop}Position`] = this.activeInstance[`${axis}AxisThumbElProperty${prop}Max`];
				}
				this.activeInstance.scrollPoint.top = this.activeInstance.scrollElPropertyScrollTopMax * (this.activeInstance.YAxisThumbElTopPosition / this.activeInstance.YAxisThumbElPropertyTopMax);
				this.activeInstance.scrollPoint.left = this.activeInstance.scrollElPropertyScrollLeftMax * (this.activeInstance.XAxisThumbElLeftPosition / this.activeInstance.XAxisThumbElPropertyLeftMax);
				el.style[prop.toLowerCase()] = `${this.activeInstance[`${axis}AxisThumbEl${prop}Position`]}px`;
				this.activeInstance.scrollTo(this.activeInstance.scrollPoint);
			}
			this.activeInstance.eventCoord = evt[`client${axis}`];
		}
	}

	onDragEnd() {
		if (!this.activeInstance || this.activeInstance.disableDrag) return;
		let {axis, el} = this.activeInstance.activeThumb;

		this.unBunClickEvents();
		el.parentNode.classList.remove(`scroll-box__scroll-bar${axis}--full`);
		this.activeInstance.overlay.classList.remove('scroll-box__overlay--drag');
		this.activeInstance.eventCoord = 0;
		this.activeInstance.eventDirection = null;
		this.activeInstance.eventAnchorPoint = null;
		this.activeInstance.activeThumb = null;
		this.activeInstance.isDrag = false;
		this.activeInstance.body.classList.remove("unselectable");

		this.clearActiveInstance();
	}
}

const fabric = new FabricScroll();


Vue.directive('scrollBox', {
	inserted: fabric.onInserted,
	componentUpdated: fabric.onComponentUpdated,
	unbind: fabric.onUnbind,
});

