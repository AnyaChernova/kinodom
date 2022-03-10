<template>
	<div class="_PasswordChangeModal popup">
		<div class="cells cells--popup --gap">
			<div class="cell w-1/12"></div>
			<div class="cell w-11/12 m:w-12/12">
				<div class="popup__header">
					<div class="title">Введите новый пароль</div>
				</div>
			</div>
		</div>
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-5/12 m:hidden">
				<div class="popup__content pt-10">
					<FormFieldPassword label="Пароль"/>
					<FormFieldPassword label="Повторите пароль"/>
				</div>
			</div>
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-4/12 m:w-12/12">
				<div class="popup__header">
					Пароль должен состоять не менее чем из восьми символов
				</div>
				<div class="popup__content from-m:hidden">
					<FormFieldPassword label="Пароль"/>
					<FormFieldPassword label="Повторите пароль"/>
				</div>
			</div>
		</div>
		<div class="popup__footer">
			<div class="cells cells--popup --gap">
				<div class="cell w-11/12 m:w-12/12 text-right"><v-btn>Сохранить</v-btn></div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import FormFieldPassword from "~/components/form/FormFieldPassword";

export default {
	name: "PasswordChangeModal",
	props: {},
	components: {FormFieldPassword, VBtn},
	data() {
		return {}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
