import Vue from 'vue'
import Snotify, {SnotifyPosition} from 'vue-snotify';

const options = {
	toast: {
		position: SnotifyPosition.leftBottom,
		titleMaxLength: 300,
		timeout: 3000,
		icon: false,
	}
};
Vue.use(Snotify, options);
