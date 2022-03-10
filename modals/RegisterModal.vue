<template>
	<div class="_RegisterModal popup">
		<div class="popup__inner">
			<div class="cells --gap --line">
				<div class="cell w-1/12 m:hidden"></div>
				<div class="cell w-6/12 m:w-12/12">
					<div class="popup__header">
						<div class="title">Регистрация</div>
					</div>
				</div>
				<div class="cell w-4/12 m:w-12/12">
					<div class="popup__header">
						<div class="title-m text-gray mt-20 s:mt-0">Шаг {{ activeStep }} из 4</div>
					</div>
				</div>
			</div>
			<RegisterStepOne :role.sync="role"
											 :profession-i-d.sync="profession_id"
											 v-if="activeStep === 1"
											 @next="changeStep"/>
			<RegisterStepTwo v-if="activeStep === 2" @next="changeStep"/>
			<RegisterStepThree v-if="activeStep === 3"
												 :role="role"
												 :profession-i-d="profession_id"
												 @next="changeStep"/>
			<RegisterStepFour v-if="activeStep === 4" @close="$close(true)"/>
		</div>
	</div>
</template>
<script>

import RegisterStepOne from "~/components/register/RegisterStepOne";
import RegisterStepTwo from "~/components/register/RegisterStepTwo";
import RegisterStepThree from "~/components/register/RegisterStepThree";
import RegisterStepFour from "~/components/register/RegisterStepFour";

export default {
	name: "RegisterModal",
	props: {},
	components: {
		RegisterStepFour,
		RegisterStepThree,
		RegisterStepTwo,
		RegisterStepOne,
	},
	data() {
		return {
			activeStep: 1,
			role: '',
			profession_id: '',
		}
	},
	methods: {
		changeStep() {
			this.activeStep++;
		},
	},
	computed: {},
	mounted() {
	}
}
</script>
