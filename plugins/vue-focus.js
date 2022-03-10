import Vue from 'vue';

Vue.directive('focus', {
	inserted: function (el, {modifiers}) {
		el.focus({preventScroll: modifiers.preventScroll})
	}
});
