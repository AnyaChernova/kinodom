import {isEmpty} from "./utils";
import {
	popperGenerator,
	defaultModifiers,
} from "@popperjs/core/lib/popper-lite";
import flip from "@popperjs/core/lib/modifiers/flip";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow";
import hide from "@popperjs/core/lib/modifiers/hide";
import offset from "@popperjs/core/lib/modifiers/offset";

const widthByAnchor = {
	name: "widthByAnchor",
	enabled: false,
	phase: "beforeWrite",
	requires: ["computeStyles"],
	effect: ({state, options}) => {
		state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
	}
};

export const createPopper = popperGenerator({
	defaultModifiers: [...defaultModifiers, flip, preventOverflow, hide, offset, widthByAnchor]
});

class DropdownCore {
	constructor() {
		this.listeners = {};
		this.anchors = {};
		this.containers = [];
	}

	initAnchor(id, target) {
		this.anchors[id] = target;
		this.callContainers(id);
	}

	destroyAnchor(id) {
		delete this.anchors[id];
	}

	initContainer(id, callback) {
		this.containers.push({id, callback});
		this.callContainers(id);
	}

	destroyContainer(id) {
		const findIndexes = [];
		this.containers.forEach((container, index) => {
			if (container.id === id) {
				findIndexes.push(index);
			}
		});
		findIndexes.forEach(index => {
			this.containers.splice(index, 1);
		});
	}

	callContainers(id) {
		this.containers.forEach((item) => {
			if (id === item.id && this.anchors[item.id]) {
				item.callback.call(this, this.anchors[item.id])
			}
		})
	}


	removeCallbackFromListeners(id, event, callback) {
		const callbackList = this.listeners[id][event];
		if (!callbackList || callbackList.length === 0) return;
		const findIndexes = [];
		callbackList.forEach((_callback, index) => {
			if (_callback === callback) {
				findIndexes.push(index);
			}
		});
		findIndexes.forEach(index => {
			this.listeners[id][event].splice(index, 1);
		});
	}

	calListener(id, event, data) {
		this.listeners[id][event].map((callback, index) => {
			callback.call(this, data);
		});
	}

	emit(id, event, data) {
		if (!event || !id) return false;

		if (this.listeners[id] && this.listeners[id][event]) {
			this.calListener(id, event, data);
		}
	}

	on(id, event, callback) {
		if (!this.listeners[id]) this.listeners[id] = {};
		if (!this.listeners[id][event]) this.listeners[id][event] = [];
		this.listeners[id][event].push(callback);
	}

	off(id, event, callback) {
		if (!id) return;
		if (!this.listeners[id]) return;
		const isCb = Boolean(callback);
		const isEv = Boolean(event);
		const eventList = this.listeners[id][event];
		if (isEv && isCb && eventList) {
			this.removeCallbackFromListeners(id, event, callback);
		}
		if ((isEv && !isCb) || (eventList && eventList.length === 0)) {
			delete this.listeners[id][event];
		}
		if ((!isEv && !isCb) || isEmpty(this.listeners[id])) {
			delete this.listeners[id];
		}
	}
}

export const dropdownCore = new DropdownCore();
window.dropdownCore = dropdownCore;
