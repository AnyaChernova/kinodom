<template>
	<div class="_RegisterStepTwo cells --gap --line flex-grow items-stretch">
		<div class="cell w-1/12 m:hidden"></div>
		<div class="cell w-6/12 m:w-12/12">
			<div class="popup__header">
				<div class="title-m">Ознакомьтесь с правовой информацией</div>
			</div>
			<div class="popup__header">
				<button class="link fz-18" @click="$loadModal('LicenseAgreementModal', {isFull: true, lock: true})">
					Лицензионное соглашение
				</button>
				<div class="mt-m">
					<button class="link fz-18" @click="$loadModal('PrivacyPolicyModal', {isFull: true, lock: true})">
						Политика конфиденциальности
					</button>
				</div>
			</div>
			<div class="popup__content">
				<FormCheckbox class="mt-5" label="Ознакомлен с лицензионным соглашением" v-model="acceptConfirm"/>
				<div class="mt-m">
					<FormCheckbox label="Ознакомлен с политикой конфиденциальности" v-model="acceptPolicy"/>
				</div>
			</div>
		</div>
		<div class="cell w-4/12 m:w-12/12 from-m:h-full">
			<div class="popup__inner">
				<div class="popup__footer text-center">
					<v-btn :disabled="nextDisabled" @click="onNextClick">Далее</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormCheckbox from "~/components/_uikit/FormCheckbox";

export default {
	name: "RegisterStepTwo",
	props: {
	},
	components: {FormCheckbox, VBtn},
	data() {
		return {
			acceptConfirm: false,
			acceptPolicy: false,
		}
	},
	computed: {
		nextDisabled() {
			return !this.acceptConfirm || !this.acceptPolicy;
		}
	},
	methods: {
		onNextClick() {
			this.$emit('next');
		}
	},
	mounted() {
	}
}
</script>
