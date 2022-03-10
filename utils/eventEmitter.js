export default class EventEmitter {
	constructor() {
		this._events = {};
	}

	emit(eventName, ...args) {
		if (!this._events[eventName]) return;

		this._events[eventName].forEach(handler => {
			handler.apply(this, args);
		});
	}

	on(eventName, handler) {
		if (!this._events[eventName] || !Array.isArray(this._events[eventName])) {
			this._events[eventName] = [];
		}

		this._events[eventName].push(handler);
	}

	off(eventName, handler) {
		if (!eventName) {
			this._events = {};
		} else if (!handler) {
			delete this._events[eventName];
		} else {
			let handlers = this._events && this._events[eventName];
			if (!handlers) return;
			const indexHandler = this._events[eventName].indexOf(handler);
			if (indexHandler === -1) return;
			this._events[eventName].splice(indexHandler, 1);
		}
	}
}
