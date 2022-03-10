<template>
	<div class="_PasswordRecoveryErrorModal popup">
		<div class="cells cells--popup --gap">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-11/12 m:w-12/12">
				<div class="popup__header">
					<div class="title">Восстановление пароля</div>
				</div>
			</div>
		</div>
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-6/12 m:w-12/12">
				<div class="popup__header">
					Ссылка для изменения пароля не действительна. Попробуйте повторить процедуру восстановления.
				</div>
				<button class="link fz-18">Восстановить пароль</button>
			</div>
		</div>
		<div class="popup__footer">
			<div class="cells cells--popup --gap">
				<div class="cell w-11/12 m:w-12/12 text-right"><v-btn>ОК</v-btn></div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";

export default {
	name: "PasswordRecoveryErrorModal",
	props: {},
	components: {VBtn},
	data() {
		return {}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
