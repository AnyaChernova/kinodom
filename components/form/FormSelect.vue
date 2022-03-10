<template>
	<FormField
		class="_FormSelect"
		:id="idName"
		v-bind="$props"
		:float="float"
		:search="search"
		:label="float ? '' : label"
		:active="isActive"
		:caption="caption"
		:clearable="((!!innerModel && !multiple) || (multiple && fullModel.size > 0)) && clearable"
		:clearInput="clearInput"
		:errors="errors"
		:isErrorShow="isErrorShow"
	>
		<template #before>
			<slot name="before"/>
		</template>
		<template #beforeInner>
			<slot name="beforeInner"/>
		</template>
		<template #after>
			<slot name="after"/>
		</template>
		<template #afterInner>
			<slot name="afterInner" v-if="search"/>
			<div class="formSelect__icon" :class="{'text-brand':isOpened}" v-else>
				<slot name="arrowIcon"/>
			</div>
		</template>
		<template #clearIcon>
			<slot name="clearIcon"/>
		</template>

		<div
			class="formControl formSelect"
			:class="[{'formControl--small': small}, {'disabled': disabled}, {'focus': focus}, inputClass]"
			@focus="onFocus"
			@focusout="onFocusOut"
			:tabindex="disabled? null : 0"
			ref="input"
			v-dropdown:[idName]
		>
			<div class="formField__label" v-if="label && float">
				{{label}}
			</div>
			<!--Плейсхолдер-->
			<template v-if="(!innerModel && innerModel !== 0) || innerModel.length === 0">
				<div class="formField__placeholder text-label text-ellipsis ws-no-wrap" v-if="!float">{{placeholder}}</div>
			</template>
			<!--Выбранное значение, если передан слот-->
			<div class="formSelect__value" v-else-if="isSlotTemplate">
				<slot name="selectedOption" v-bind:option="fullModel.values().next().value || {}" v-if="multiple"/>
				<slot name="selectedOption" v-bind:option="fullModel" v-else/>
			</div>

			<!--Дефолтный шаблон выбранного занчения-->
			<template v-else-if="isDefaultTemplate">
				<template v-if="multiple">
					{{extractor(fullModel.values().next().value, optionLabel)}}
				</template>
				<template v-else>
					<div class="formSelect__selected">{{extractor(fullModel, optionLabel)}}</div>
				</template>
			</template>
			<template v-else-if="isDefaultGroupLabel">
				{{groupLabel}}
			</template>

			<!--Дефолтные тэги-->
			<div class="cells --gap-4 overflow-auto" v-else-if="multiple && showTags && innerModel.length > 0"
					 v-scroll-box.disableShowTransition.disableThumbHover>
				<div
					class="cell"
					v-for="(option, i) in fullModel"
					:key="`${createdCounter}FormSelect_tag_id_${extractor(option[1], optionTrackBy, i + 1)}`"
				>
					<v-btn class="--badge" @click.prevent.stop="onSelectOption(option[1])">
						<span>{{option[1][optionLabel]}}</span>
						<v-svg name="close_b" w="10" h="10" class="ml-8"/>
					</v-btn>
				</div>
			</div>
			<div class="formSelect__search" :class="{open: search && isOpened}" v-if="search && searchPlace === 'field'">
				<FormInputFloat
					v-if="float"
					active
					name="search"
					:small="small"
					:inputClass="inputClass"
					v-model="searchString"
					:clearable="!!searchString"
					:label="label"
					@clear="$emit('clear')"
					autocomplete="off"
					ref="searchInput">
					<template #clearIcon>
						<slot name="clearIcon"/>
					</template>
				</FormInputFloat>
				<FormInput
					v-else
					name="search"
					:small="small"
					:inputClass="inputClass"
					v-model="searchString"
					:clearable="!!searchString"
					autocomplete="off"
					ref="searchInput">
					<template #clearIcon>
						<slot name="clearIcon"/>
					</template>
				</FormInput>
			</div>
		</div>

		<Dropdown
			v-if="isDropdown"
			:target-class="['formSelect__dropdown', dropdownClass]"
			:name="idName"
			:widthByAnchor="widthByAnchor"
			bottom-start
			:offset="dropdownOffset"
			ref="dropdown"
			:saveAnchorClick="saveAnchorClick"
			:saveInnerClick="!currentCloseOnClick"
			v-model="isOpened"
		>
			<div class="formSelect__list" :class="optionsListClass">
				<div class="formSelect__optionField" v-if="search && searchPlace === 'dropdown'">
					<FormInput
						placeholder="Поиск по названию"
						:inputClass="inputClass"
						v-model="searchString"
						:clearable="!!searchString"
						autocomplete="off"
						ref="searchInput">
						<template #beforeInner>
							<v-svg name="search" w="16" h="16"/>
						</template>
					</FormInput>
				</div>
				<div class="formSelect__optionList" v-scrollBox ref="scrollBar">
					<div>

						<div class="text-gray p-10" v-if="(!options || !options.length)">
							<span v-if="loading">Поиск...</span>
							<span v-else-if="search && !searchString">Начните вводить</span>
							<span v-else>Список пуст</span>
						</div>
						<div
							v-else
							class="formSelect__wrap"
							:class="[{'--selected':getSelectedState(option)},
										 {'--disabled':!getSelectedState(option) && isMaxSelected},
										 {'--active': pointer === i}]"
							v-for="(option, i) in options"
							:id="`id_${i}`"
							:key="`${createdCounter}FormSelect_option_id_${extractor(option, optionTrackBy, i + 1)}`"
							@click="onSelectOption(option, i)"

							@mousemove="onMouseMoveOption(i)"
							@mouseleave="onMouseLeaveOption"
						>

							<div class="formSelect__option">
								<div class="formOption formSelect__checkbox" v-if="multiple">

									<input
										type="checkbox"
										:checked="getSelectedState(option)"
										:disabled="!getSelectedState(option) && isMaxSelected"
									>

									<span class="formOption__element"/>
								</div>
								<!--Шаблон элемента списка, если передан слот-->
								<div class="formSelect__custom-option" v-if="$scopedSlots.option">
									<slot name="option" v-bind:option="option"/>
								</div>
								<!--Дефолтный шаблон элемента списка-->
								<template v-else>
									<div class="mw-full">
										<div class="text-ellipsis">{{extractor(option, optionLabel)}}</div>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Dropdown>
		<template v-else>
			<div class="formSelect__list formSelect__list--dropdown" ref="dropdownEl" :class="optionsListClass" v-if="isOpened">
				<div class="layout">
					<div class="formSelect__optionList" v-scrollBox ref="scrollBar">
						<div>
							<div class="formSelect__caption" v-if="(!options || !options.length)">
								<span v-if="loading">Поиск...</span>
								<span v-else-if="search && !searchString">Начните вводить</span>
								<span v-else>Список пуст</span>
							</div>
							<div
								v-else
								class="formSelect__wrap"
								:class="[{'--selected':getSelectedState(option)},
										 {'--disabled':!getSelectedState(option) && isMaxSelected},
										 {'--active': pointer === i}]"
								v-for="(option, i) in options"
								:id="`id_${i}`"
								:key="`${createdCounter}FormSelect_option_id_${extractor(option, optionTrackBy, i + 1)}`"
								@click="onSelectOption(option, i)"

								@mousemove="onMouseMoveOption(i)"
								@mouseleave="onMouseLeaveOption"
							>

								<div class="formSelect__option">
									<div class="formOption formSelect__checkbox" v-if="multiple">

										<input
											type="checkbox"
											:checked="getSelectedState(option)"
											:disabled="!getSelectedState(option) && isMaxSelected"
										>

										<span class="formOption__element"/>
									</div>
									<!--Шаблон элемента списка, если передан слот-->
									<div class="formSelect__custom-option" v-if="$scopedSlots.option">
										<slot name="option" v-bind:option="option"/>
									</div>
									<!--Дефолтный шаблон элемента списка-->
									<template v-else>
										<div class="mw-full">
											<div class="text-ellipsis">{{extractor(option, optionLabel)}}</div>
										</div>
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<FormFieldError :errors="errors"/>
	</FormField>
</template>

<script>
	import _baseFormField_mixin from "@/components/_uikit/_baseFormField_mixin";
	import VSpinner from "@/components/_uikit/VSpinner";
	import VBadge from "@/components/_uikit/VBadge";
	import FormInputFloat from "@/components/form/FormInputFloat";
	import FormFieldError from "@/components/form/FormFieldError";
	import FormInput from "@/components/_uikit/FormInput";
	import VBtn from "~/components/_uikit/VBtn";

	export default {
		name: "FormSelect",
		mixins: [_baseFormField_mixin],
		props: {
			placeholder: {
				type: String,
				default() {
					return 'Выберите значение'
				}
			},
			float: {
				type: Boolean,
				default() {
					return false
				}
			},
			optionsListClass: {
				type: String,
				default() {
					return ''
				}
			},
			options: {
				type: Array,
				default() {
					return []
				}
			},
			optionTrackBy: {
				type: String,
				default() {
					return 'id'
				}
			},
			optionLabel: {
				type: String,
				default() {
					return 'title'
				}
			},
			multiple: {
				type: Boolean,
				default() {
					return false
				}
			},
			groupLabelFirstChunk: {
				type: Array,
				default() {
					return ['Выбран', 'Выбраны', 'Выбраны']
				}
			},
			groupLabelSecondChunk: {
				type: Array,
				default() {
					return ['элемент', 'элемента', 'элементов']
				}
			},
			showTags: {
				type: Boolean,
				default() {
					return false
				}
			},
			search: {
				type: Boolean,
				default() {
					return false
				},
			},
			searchValue: {
				type: String,
				default: '',
			},
			searchPlace: {
				type: String,
				default: 'field',
			},
			debounce: {
				type: Boolean,
				default() {
					return false
				},
			},
			loading: {
				type: Boolean,
				default() {
					return false
				}
			},
			maxSelectedOptions: {
				type: Number,
				default() {
					return 0
				}
			},
			closeOnClick: {
				type: Boolean,
				default: null,
			},
			saveAnchorClick: {
				type: Boolean,
				default: false,
			},
			widthByAnchor: {
				type: Boolean,
				default: true,
			},
			emitFullModelAsMap: {
				type: Boolean,
				default() {
					return false
				}
			},
			deselected: {
				type: Boolean,
				default() {
					return true
				}
			},
			isDropdown: {
				type: Boolean,
				default() {
					return true
				}
			},
			dropdownClass: {
				type: String,
				default() {
					return ''
				}
			},
			dropdownOffset: {
				type: Array,
				default() {
					return [0, 8]
				}
			},
		},
		components: {
			VBtn,
			FormInput,
			FormFieldError,
			FormInputFloat,
			VSpinner,
			VBadge,
		},
		data($props) {
			return {
				temp: $props.modelValue,
				fullModel: $props.multiple ? new Map() : '',
				isOpened: false,
				isActive: false,
				selectedOption: null,
				searchString: this.searchValue,
				timerID: null,
				typing: false,
				cache: {},
				pointer: -1,
				focus: false,
				isMouseAllowed: true,
				init: false,
			}
		},
		computed: {
			idName() {
				return this.createdCounter + 'FormSelect';
			},
			innerModel: {
				get() {
					return this.modelValue;
				},
				set(val) {
					if (this.multiple) {
						this.setGroupModel(val);
						const arrModels = this.getArrayModels();
						this.temp = arrModels.IDs;
						if (this.emitFullModelAsMap) {
							this.emitModel(arrModels.IDs, this.fullModel)
						} else {
							this.emitModel(arrModels.IDs, arrModels.full)
						}
					} else {
						const short = this.extractor(val, this.optionTrackBy);
						this.temp = short;
						this.fullModel = val;
						this.emitModel(short, val)
					}
					this.isErrorShow = false;
					this.isActive = val !== '' && val !== null;
				}
			},
			isSlotTemplate() {
				return this.$scopedSlots.selectedOption && ((this.innerModel.length === 1 && this.multiple) || ((this.innerModel || this.innerModel === 0) && !this.multiple))
			},
			isDefaultTemplate() {
				return !this.$scopedSlots.selectedOption && !this.showTags && ((this.innerModel.length === 1 && this.multiple) || ((this.innerModel || this.innerModel === 0) && !this.multiple))
			},
			isDefaultGroupLabel() {
				return this.multiple && this.innerModel.length > 1 && !this.showTags
			},
			isMaxSelected() {
				return Boolean(this.maxSelectedOptions) && this.multiple && (this.innerModel.length >= this.maxSelectedOptions)
			},
			groupLabel() {
				return `${this.groupLabelFirstChunkComputed} ${this.innerModel.length} ${this.groupLabelSecondChunkComputed}`
			},
			groupLabelFirstChunkComputed() {
				return this.$declOfNum(this.innerModel.length, this.groupLabelFirstChunk)
			},
			groupLabelSecondChunkComputed() {
				return this.$declOfNum(this.innerModel.length, this.groupLabelSecondChunk)
			},
			currentCloseOnClick() {
				if (this.closeOnClick === null) {
					return !this.multiple && !this.search;
				}
				return this.closeOnClick;
			},
		},
		methods: {
			setGroupModel(val) {
				const key = this.extractor(val, this.optionTrackBy);
				if (val) {
					if (this.fullModel.has(key)) {
						this.fullModel.delete(key)
					} else {
						this.fullModel.set(key, val)
					}
				} else {
					this.fullModel.clear()
				}
			},
			setFullModelMap(selected) {
				this.fullModel = new Map(selected.map((option) => {
					return [this.extractor(option, this.optionTrackBy), option]
				}))
			},
			setFullModelSingleVal() {
				this.fullModel = this.options.find((option) => {
					return this.modelValue === this.extractor(option, this.optionTrackBy)
				}) || ''
			},
			setPointer(action, callback) {
				if (action === 'increase') {
					if (this.pointer >= this.options.length - 1) {
						this.pointer = this.options.length - 1
					} else {
						this.pointer++;
						if (callback && typeof callback === 'function') {
							callback()
						}
					}
				} else if (action === 'decrease') {
					if (this.pointer <= 0) {
						this.pointer = 0;
					} else {
						this.pointer--;
						if (callback && typeof callback === 'function') {
							callback()
						}
					}
				}
			},
			getSelectedOptions() {
				return this.options.filter((option) => {
					return this.modelValue.includes(this.extractor(option, this.optionTrackBy))
				});
			},
			getArrayModels() {
				const full = [];
				const IDs = [];

				this.fullModel.forEach((value) => {
					full.push(value);
					IDs.push(this.extractor(value, this.optionTrackBy))
				});

				return {full, IDs}
			},
			getSelectedState(option) {
				if (this.cache.option === option) {
					return this.cache.val
				} else {
					this.cache.option = option;
					if (this.multiple) {
						this.cache.val = this.fullModel.has(this.extractor(option, this.optionTrackBy))
					} else {
						this.cache.val = this.extractor(option, this.optionTrackBy) === this.innerModel
					}
					return this.cache.val
				}
			},
			getScrollElement() {
				return this.$refs.scrollBar
			},
			emitModel(short, full) {
				this.$emit('modelChange', short);
				this.$emit('select', full);
			},
			emitSearch() {
				this.typing = false;
				this.$emit('search', this.searchString);
			},
			onMouseMoveOption(i) {
				if (this.isMouseAllowed) {
					this.pointer = i
				}
				this.isMouseAllowed = true;
			},
			onMouseLeaveOption() {
				if (this.isMouseAllowed) {
					this.pointer = -1
				}
			},
			onArrowKeyDown(evt, action) {
				if (this.isOpened) {
					evt.preventDefault();
					this.isMouseAllowed = false;
					this.focusFormElement();
					this.setPointer(action, this.scrollIntoView);
				}
			},
			onOpenKeysDown(evt) {
				if (this.isOpened) {
					evt.preventDefault();
					this.onSelectOption(this.options[this.pointer])
				} else if (this.focus) {
					evt.preventDefault();
					this.toggleOpenState();
				}
			},
			onCloseKeysDown() {
				if (this.focus && this.isOpened) {
					this.toggleOpenState()
				}
			},
			onSelectOption(option, pointer) {
				if (option.disabled) return;
				if (!this.getSelectedState(option) && this.multiple && this.isMaxSelected) return;
				this.focusFormElement();
				if (this.getSelectedState(option) && this.deselected) {
					if (this.multiple) {
						this.innerModel = option;
					} else {
						this.innerModel = '';
					}
				} else {
					this.innerModel = option;
				}
				if (pointer) {
					this.pointer = pointer
				}
				if (this.multiple && this.closeOnClick === null) return;
				this.isOpened = false;
				if (this.search) this.searchString = option[this.optionLabel];
			},
			onKeyDown(evt) {
				switch (evt.code) {
					case 'ArrowUp':
						this.onArrowKeyDown(evt, 'decrease');
						break;
					case 'ArrowDown':
						this.onArrowKeyDown(evt, 'increase');
						break;
					case 'Enter':
						this.onOpenKeysDown(evt);
						break;
					case 'Space':
						const isSearchInFocus = document.activeElement === (this.$refs.searchInput && this.$refs.searchInput.$refs.input);
						if (!isSearchInFocus) {
							this.onOpenKeysDown(evt);
						}
						break;
					case 'Tab':
					case 'Escape':
						this.onCloseKeysDown();
						break;
				}
			},
			onFocus() {
				this.focus = true;
				if (!this.isDropdown) {
					this.isOpened = true;
				}
			},
			onFocusOut() {
				this.focus = false;
			},
			onSearch() {
				if (this.search) {
					if (this.debounce) {
						this.typing = true;
						clearTimeout(this.timerID);
						this.timerID = setTimeout(this.emitSearch, 500);
					} else {
						this.emitSearch();
					}
				}
			},
			onSearchFocus() {
				this.isOpened = true;
			},
			onSearchFocusOut() {
				this.isOpened = false;
			},
			onComponentUpdate() {
				if (this.isOpened) {
					this.$nextTick(() => {
						if (this.pointer > this.options.length - 1) {
							this.pointer = -1
						}
					})
				}
			},
			focusFormElement() {
				if (this.search && !this.focus && !this.disabled) {
					this.$refs.input.focus();
				}
			},
			scrollIntoView() {
				const selector = `#id_${this.pointer}`;
				const container = this.getScrollElement();
				const el = container.querySelector(selector);

				const isHigher = el.offsetTop < container.scrollTop;
				const isLower = el.offsetTop + el.offsetHeight > container.offsetHeight + container.scrollTop;
				if (isHigher) {
					this.scrollTo(container, el.offsetTop)
				} else if (isLower) {
					this.scrollTo(container, el.offsetTop - container.offsetHeight + el.offsetHeight)
				}
			},
			toggleOpenState() {
				if (!this.disabled) {
					this.isOpened = !this.isOpened;
				} else {
					this.isOpened = false
				}
			},
			extractor(item, strKey, index) {
				if (this.search && index) return index;
				if (!item) return;
				if (strKey && typeof strKey === 'string') {
					const arrayKey = strKey.split('.');
					if (arrayKey.length === 1) {
						return item[strKey]
					}
					return arrayKey.reduce((previousValue, currentValue) => {
						if (previousValue[currentValue]) {
							return previousValue[currentValue];
						}
						return {};
					}, item);
				}
			},
			scrollTo(el, point, behavior = 'auto') {
				el.scrollTo({
					top: point,
					left: 0,
					behavior
				})
			},
			scrollToSelected() {
				const scrollEl = this.getScrollElement();
				const activeEl = scrollEl.querySelector('.--selected');
				if (activeEl) {
					this.scrollTo(scrollEl, activeEl.offsetTop);
					this.pointer = activeEl.id.slice(3);
				}
			},
			addGlobalListener() {
				if (process.browser) {
					document.addEventListener('keydown', this.onKeyDown)
				}
			},
			removeGlobalListener() {
				if (process.browser) {
					document.removeEventListener('keydown', this.onKeyDown)
				}
			},
			prepareModel() {
				this.init = true;
				if (this.multiple) {
					const selected = this.getSelectedOptions();
					this.setFullModelMap(selected);
					const arrModels = this.getArrayModels();
					this.temp = arrModels.IDs;
					if (this.temp.length) {
						if (this.emitFullModelAsMap) {
							this.emitModel(arrModels.IDs, this.fullModel)
						} else {
							this.emitModel(arrModels.IDs, arrModels.full)
						}
					}
				} else {
					this.setFullModelSingleVal();
					const id = this.extractor(this.fullModel, this.optionTrackBy);
					this.temp = id;
					if (this.temp) {
						this.emitModel(id, this.fullModel)
					}
				}
			},
			checkInput() {
				this.isActive = this.innerModel !== '' && this.innerModel !== null;
			}
		},
		directives: {},
		filters: {},
		watch: {
			searchString() {
				this.onSearch();
			},
			isOpened(newVal) {
				if (newVal) {
					this.$nextTick(() => {
						if (this.search) {
							this.$refs.searchInput.$el.focus();
						}
						this.$nextTick(this.scrollToSelected)
					})
				}
			},
			disabled(newVal) {
				if (newVal) {
					this.toggleOpenState();
				}
			},
			modelValue(newVal, oldVal) {
				if (!this.init) return;
				if (this.multiple) {
					if ((newVal.length === this.temp.length) && newVal.every((val, i) => val === this.temp[i])) return;
				} else {
					if (newVal === this.temp) return;
				}
				this.prepareModel();
				if (this.search) this.searchString = newVal;
				if (this.float) {
					this.checkInput();
				}
			},
			options(newVal, oldVal) {
				if (newVal.length === oldVal.length && newVal.every((val, i) => val === oldVal[i])) return;
				if (this.search && this.init) return;

				this.prepareModel();
			}
		},
		beforeUpdate() {
			this.cache = {}
		},
		beforeDestroy() {
			this.removeGlobalListener();
		},
		beforeMount() {
			if (this.float) {
				this.checkInput();
			}
		},
		updated() {
			this.onComponentUpdate();
		},
		mounted() {
			this.addGlobalListener();
			if (this.options && (this.options.length !== 0)) {
				this.prepareModel();
			}
		}
	}
</script>
