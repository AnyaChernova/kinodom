import Vue from 'vue';

export const $declOfNum = (n, titles) => {
	return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};

export const $humanFileSize = (size) => {
	if (+size === 0) return '0 B';
	let i = Math.floor(Math.log(size) / Math.log(1024));
	return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export const $fileSize = {
	B: 1,
	kB: 1024,
	MB: 1024 * 1024,
	GB: 1024 * 1024 * 1024,
	TB: 1024 * 1024 * 1024 * 1024,
};

export const $fileExtension = (filename) => {
	return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || '?';
};

export const $validateEmail = (email) => {
	let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return email.match(emailFormat);
};

export const $formatPrice = (str) => {
	let parts = (str + '').split('.');
	let main = parts[0];
	let output = '';
	for (let i = main.length - 1; i >= 0; i--) {
		output = main.charAt(i) + output;
		if ((main.length - i) % 3 === 0 && i > 0) {
			output = '\u00A0' + output;
		}
	}
	if (parts.length > 1) {
		output += '.' + parts[1];
	}
	return output;
};

export const $getDuration = (duration) => {
	let hours = Math.floor(duration / 60 / 60);
	let minutes = Math.floor(duration / 60) - (hours * 60);
	let hoursStr = `${hours} ${$declOfNum(hours, ['час', 'часа', 'часов'])}`;
	let minStr = `${minutes} ${$declOfNum(minutes, ['минута', 'минуты', 'минут'])}`;
	if (hours || minutes) {
		return `${hours ? hoursStr : ''} ${minutes ? minStr : ''}`
	} else {
		return '0'
	}
};

export const $getDurationGenitive = (duration) => {
	let hours = Math.floor(duration / 60 / 60);
	let minutes = Math.floor(duration / 60) - (hours * 60);
	let hoursStr = `${hours} ${$declOfNum(hours, ['часа', 'часов', 'часов'])}`;
	let minStr = `${minutes} ${$declOfNum(minutes, ['минуты', 'минут', 'минут'])}`;
	if (hours || minutes) {
		return `${hours ? hoursStr : ''} ${minutes ? minStr : ''}`
	} else {
		return '0'
	}
};

export const $copyData = (el) => {
	return new Promise((resolve, reject) => {
		try {
			el.select();
			document.execCommand('copy');
			const s = window.getSelection();
			s.removeAllRanges();
			resolve(true);
		} catch (e) {
			reject(false);
		}
	});
};

// разбор ошибок из апи
const resetField = (obj, field) => {
	if (!Array.isArray(obj[field]) && typeof obj[field] === 'object') {
		Object.keys(obj[field]).forEach((key) => {
			resetField(obj[field], key);
		});
	} else {
		Vue.set(obj, field, []);
	}
};
export const $setFormErrors = ({response, formError}) => {
	if (response.status === 409 && response.data.error) { // если статус 409 то там нет ошибок валидании, это общая ошибка формы
		formError.global = response.data.error;
	} else if (response.status === 422 && response.data && response.data.error.errors) { // если статус 422 то это ошибки валидации
		// Проход по всем полям с ошибками и добавление их в объект formError
		Object.keys(response.data.error.errors).forEach((key) => {
			console.log(key);
			const resFiled = response.data.error.errors[key];
			// текст ошибки должен быть в массиве
			if (Array.isArray(resFiled)) {
				// Имя ключа ошибки может относится к вложенным данным, например 'field1.field2.field3' = ['текст ошибки']
				// разбиваем имя на массив по точке
				const keyArray = key.split('.');
				if (keyArray.length > 1) { // если ошибка со вложенными полями
					// проходимся по ключам имени
					keyArray.reduce((accumulator, currentValue, index, array) => {
						if (array.length === index + 1) {
							// на последнем уровне вложенности добавляем значение
							Vue.set(accumulator, currentValue, resFiled);
						} else if (!accumulator[currentValue] || Array.isArray(accumulator[currentValue]) || typeof accumulator[currentValue] !== 'object') {
							//иначе если ключа нет или он не объект то добавляем пустой объект
							Vue.set(accumulator, currentValue, {});
						}
						return accumulator[currentValue];
					}, formError.fields);
				} else { // если ошибка к одиночному полю
					Vue.set(formError.fields, key, resFiled);
				}
			} else {
				if (resFiled) {
					Vue.set(formError.fields, key, [resFiled]);
				} else {
					Vue.set(formError.fields, key, []);
				}
			}
		})
	}
	return formError;
};
export const $resetFormErrors = ({formError}) => {
	formError.global = '';
	resetField(formError, 'fields');
	return formError;
};

export default ({app, store}, inject) => {
	inject('declOfNum', $declOfNum);
	inject('fileSize', $fileSize);
	inject('humanFileSize', $humanFileSize);
	inject('fileExtension', $fileExtension);
	inject('formatPrice', $formatPrice);
	inject('getDuration', $getDuration);
	inject('copyData', $copyData);
	inject('validateEmail', $validateEmail);
	inject('getDurationGenitive', $getDurationGenitive);
	inject('setFormErrors', ({response, formError}) => $setFormErrors({response, formError}));
	inject('resetFormErrors', ({formError}) => $resetFormErrors({formError}));
};
