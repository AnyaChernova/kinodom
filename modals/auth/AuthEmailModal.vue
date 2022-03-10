<template>
	<div class="_AuthEmailModal popup">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-5/12 m:w-12/12 m:hidden">
				<div class="popup__header">
					<div class="title">Авторизация</div>
				</div>
				<div class="popup__content pt-10">
					<FormInputFloat label="E-mail"/>
				</div>
			</div>
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-4/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header popup__header--mobS from-m:hidden">
						<div class="title">Авторизация</div>
					</div>
					<div class="popup__header m:hidden"></div>
					<div class="popup__header m:hidden"></div>
					<div class="popup__header m:hidden"></div>
					<div class="popup__header -mt-5">
						Для использования сервиса необходим e-mail
					</div>
					<div class="popup__content">
						<div class="popup__header from-m:hidden">
							<FormInputFloat label="E-mail"/>
						</div>
					</div>
					<div class="popup__footer text-center">
						<v-btn>Отправить</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";

export default {
	name: "AuthEmailModal",
	props: {},
	components: {FormInputFloat, VBtn},
	data() {
		return {}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
