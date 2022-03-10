import {dropdownCore} from "./dropdown-core";


const initDropdownAnchor = (target, binding) => {
	const id = binding.arg;

	if (dropdownCore.anchors[id]) {
		(async () => { // Асинхронная функция - чтоб не вешать всю страницу при ошибке
			console.log(`id "${id}" - `, dropdownCore.anchors[id]);
			throw new Error(`id "${id}" already exist in page`)
		})();
		return false;
	}

	dropdownCore.initAnchor(id, target);

	const onClickTarget = (event) => {
		dropdownCore.emit(id, 'click', event);
	};

	target.addEventListener('click', onClickTarget);

	target.$destroy = () => {
		delete dropdownCore.destroyAnchor(id);
		target.removeEventListener('click', onClickTarget);
	}
};


export const dropdownDirective = {
	bind: (target, binding) => {
		initDropdownAnchor(target, binding);
	},
	unbind: (target) => {
		target.$destroy && target.$destroy();
	},
};
