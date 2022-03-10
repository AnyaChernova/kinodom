import Vue from 'vue';
import * as ModalDialogs from 'vue-modal-dialogs';
import loadModalWrap from "@/plugins/vue-loadModal/_loadModalWrap";
import loadViewerWrap from "@/plugins/vue-loadModal/_loadViewerWrap";
import EventEmitter from "@/utils/eventEmitter";

let viewerWrap = {
	instance: null,
	viewerName: null,
};

export const viewerEventBus = new EventEmitter();

export let $loadModal = (modalName, props = {}) => {
	return ModalDialogs.create(loadModalWrap, 'component', 'modalProps')(modalName, props);
};
export let $loadViewer = (viewerName, props = {}) => {
	//не открывать вьювер, если предыдущий в процессе открытия/закрытия
	if (viewerWrap.instance && viewerWrap.instance.animationState) return;
	props.animation = true;

	//закрытие уже открытого вьювера, если переоткрываем тот же - пропуск анимации
	if (viewerWrap.instance && !viewerWrap.instance._isDestroyed) {
		if (viewerWrap.viewerName === viewerName) {
			props.animation = false;
		}
		viewerWrap.instance.$close();
	}

	const promise = ModalDialogs.create(loadViewerWrap, 'component', 'viewerProps')(viewerName, props);
	promise.getInstance().then((wrap) => {
		viewerWrap = {
			instance: wrap,
			viewerName: viewerName,
		}
	});

	return promise
};

export default function ({app, store}, inject) {
	Vue.use(ModalDialogs);
	inject('loadModal', $loadModal);
	inject('loadViewer', $loadViewer);
}
