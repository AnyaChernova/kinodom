import {
	format,
	addMinutes,
	addDays,
	addMonths,
	subMonths,
	parse,
	parseISO,
	set,
	getUnixTime,
	startOfWeek,
	startOfDay,
	startOfMonth,
	getDaysInMonth
} from "date-fns";
import locale_ru from "date-fns/locale/ru";

export const $dateFns = {
	format: (date, formatStr) => format(date, formatStr, {
		locale: locale_ru
	}),
	addMinutes,
	addDays,
	addMonths,
	subMonths,
	startOfWeek,
	startOfDay,
	startOfMonth,
	parse,
	parseISO,
	set,
	getUnixTime,
	getDaysInMonth,
	formatDate(string) {
		let date = '';
		try {
			date = $dateFns.format(new Date(string), 'yyyy-MM-dd')
		} catch (e) {

		}
		return date;
	},
	formatDMY(string) {
		let date = '';
		try {
			date = $dateFns.format(new Date(string), 'dd.MM.yyyy')
		} catch (e) {

		}
		return date;
	},
};

export default function ({app}, inject) {
	inject('dateFns', $dateFns)
}
