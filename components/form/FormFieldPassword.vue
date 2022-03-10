<template>
	<div class="_FormFieldPassword formFieldPassword" @click="onClick">
		<FormInputFloat :type="passwordType"
										ref="password"
										input-class="--m"
										class="--password"
										:clearable="false"
										v-model="innerModel"
										v-bind="$attrs"
										v-on="$listeners"/>
		<v-btn simple class="formFieldPassword__btn" type="button" @click="passwordShow" v-show="modelValue" :disabled="isBtnDisable"
					 v-if="passwordType === 'password'">
			<v-svg name="ban-eye" w="20" h="20"/>
		</v-btn>
		<v-btn simple class="formFieldPassword__btn" type="button" @click="passwordHide" v-show="modelValue" :disabled="isBtnDisable"
					 v-if="passwordType === 'text'">
			<v-svg name="eye" w="20" h="20"/>
		</v-btn>
	</div>
</template>

<script>

import VBtn from "@/components/_uikit/VBtn";
import FormInputFloat from "@/components/form/FormInputFloat";

export default {
	name: "FormFieldPassword",
	inheritAttrs: false,
	model: {
		prop: 'modelValue',
		event: 'modelChange'
	},
	props: {
		isBtnDisable: {
			type: Boolean,
			default: false
		},
		modelValue: {
			type: null,
			default: null,
		},
	},
	components: {FormInputFloat, VBtn},
	data() {
		return {
			passwordType: 'password',
			tempModel: '',
		}
	},
	computed: {
		innerModel: {
			get() {
				return this.modelValue !== null ? this.modelValue : this.tempModel;
			},
			set(val) {
				this.tempModel = val;
				this.$emit('modelChange', val);
			}
		}
	},
	methods: {
		onClick() {
			this.$refs.password.$el.querySelector('input').focus();
		},
		passwordShow() {
			this.passwordType = 'text'
		},
		passwordHide() {
			this.passwordType = 'password'
		},
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	},
	beforeDestroy() {
	}
}
</script>
