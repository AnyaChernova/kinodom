<template>
	<FormField
		class="_FormDatepicker"
		:id="createdCounter"
		v-bind="$props"
		:label="label"
		:caption="caption"
		:clearable="!!innerModel && clearable"
		:clearInput="clearInput"
		:errors="errors"
		:isErrorShow="isErrorShow"
	>
		<template #before>
			<slot name="before"></slot>
		</template>
		<template #beforeInner>
			<slot name="beforeInner"></slot>
		</template>
		<template #after>
			<slot name="after"></slot>
		</template>
		<template #afterInner>
			<slot name="afterInner"></slot>
		</template>
		<template #clearIcon>
			<slot name="clearIcon"></slot>
		</template>


		<input
			class="formControl"
			ref="input"
			autocomplete="off"
			:class="[{'formControl--small': small}, inputClass]"
			:id="createdCounter"
			:disabled="disabled"
			v-bind="$attrs"
			v-on="$listeners"
			v-bind:value="innerModel"
			v-on:input="onInput"
			v-on:focus="onFocus"
			v-on:blur="onBlur"
			v-on:keypress="validateInput($event)"
			v-on:keypress.enter="onEnter"
			v-on:pickmeup-change="onPickmeupChange($event)"
		>

		<FormFieldError :errors="errors"/>

	</FormField>
</template>

<script>
import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";
import pickmeup from 'pickmeup';
import FormFieldError from "~/components/form/FormFieldError";

pickmeup.defaults.locales['ru'] = {
	days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
};

export default {
	name: "FormDatepicker",
	mixins: [_baseFormField_mixin],
	props: {
		options: {
			type: Object,
			default() {
				return {}
			}
		},
		format: {
			type: String,
			default: 'yyyy-MM-dd',
		}
	},
	components: {FormFieldError},
	data() {
		return {
			inputFormat: 'dd.MM.yyyy',
			pickmeup: null,
		}
	},
	computed: {
		innerModel: {
			get() {
				return this.inputDateAdapter(this.modelValue || this.tempModel);
			},
			set(val) {
				this.tempModel = val;
				this.isErrorShow = false;
				this.$emit('modelChange', this.outputDateAdapter(val));
			}
		},
		_options() {
			return {
				...this.options,
				min: this.inputDateAdapter(this.options.min),
				max: this.inputDateAdapter(this.options.max),
			}
		},
	},
	methods: {
		initPickmeup() {
			this.pickmeup = pickmeup(this.$refs.input, {
				format: 'd.m.Y',
				locale: 'ru',
				hide_on_select: true,
				default_date: false,
				...this._options
			});
		},
		onPickmeupChange(event) {
			this.innerModel = event.detail.formatted_date;
			this.$refs.input.blur();
		},
		inputDateAdapter(value) {
			return this.dateAdapter(value, this.format, this.inputFormat);
		},
		outputDateAdapter(value) {
			return this.dateAdapter(value, this.inputFormat, this.format);
		},
		dateAdapter(value, inputFormat, outputFormat) {
			if (value === '') return '';
			try {
				let date = this.$dateFns.parse(value, inputFormat, new Date());
				return this.$dateFns.format(date, outputFormat);
			} catch (e) {
				return '';
			}
		},
		checkDateValid(value) {
			if (value && typeof value === 'string') {
				const modelArr = value.split('.');
				const dateValid = modelArr[0] && modelArr[0].length === 2;
				const monthValid = modelArr[1] && modelArr[1].length === 2;
				const yearValid = modelArr[2] && modelArr[2].length === 4;
				return !!dateValid && !!monthValid && !!yearValid;
			}
			return false;
		},
		clearInput() {
			this.innerModel = '';
			this.pickmeup.clear();
			this.pickmeup.hide();
		},
		validateInput(event) {
			let key = event.key;
			const regex = /[0-9]|\./;
			if (!regex.test(key)) {
				event.returnValue = false;
				if (event.preventDefault) event.preventDefault();
			}
		},
		onInput() {
			const value = this.$refs.input.value;
			if (value === '') {
				this.innerModel = '';
			} else if (this.checkDateValid(value)) {
				this.innerModel = value;
			}
		},
		onFocus() {
			const wrap = this.$refs.input.closest('.formField');
			wrap.classList.add('--focus');
		},
		onBlur() {
			const value = this.$refs.input.value;
			const wrap = this.$refs.input.closest('.formField');
			wrap.classList.remove('--focus');
			if (value === '') {
				this.innerModel = '';
			} else if (this.checkDateValid(value)) {
				this.innerModel = value;
			} else {
				this.innerModel = '';
				this.$refs.input.value = '';
			}
		},
		onEnter() {
			this.pickmeup.hide();
			this.$refs.input.blur();
			this.$nextTick(() => {
				this.pickmeup.hide();
			})
		}
	},
	directives: {},
	filters: {},
	watch: {
		options() {
			this.pickmeup.destroy();
			this.initPickmeup();
		}
	},
	mounted() {
		this.initPickmeup();
	},
	beforeDestroy() {
		this.pickmeup.destroy();
		this.pickmeup = null;
	}
}
</script>
