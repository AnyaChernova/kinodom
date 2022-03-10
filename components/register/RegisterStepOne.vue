<template>
	<div class="_RegisterStepOne cells --gap --line flex-grow items-stretch">
		<div class="cell w-1/12 m:hidden"></div>
		<div class="cell w-6/12 m:w-12/12">
			<div class="popup__header">
				<div class="title-m">Как вы планируете использовать сервис?</div>
				<div class="popup__content mt-10 from-m:hidden">
					Вы можете выбрать только одну роль, которую в последующем нельзя изменить
				</div>
			</div>
			<div class="popup__content">
				<FormRadio name="role" :value="1" class="w-full items-start mt-10" v-model="innerRole">
					<div>Ищу объекты</div>
					<FormSelect
						float
						:options="$store.state.professions"
						label="Профессия"
						option-track-by="id"
						option-label="name"
						class="--select w-full"
						v-model="innerProfessionID">
						<template #arrowIcon>
							<v-svg name="arrow-down" w="16" h="16"/>
						</template>
					</FormSelect>
				</FormRadio>
				<div class="mt-m">
					<FormRadio name="role" :value="0" label="Сдаю объекты" v-model="innerRole"/>
				</div>
			</div>
		</div>
		<div class="cell w-4/12 m:w-12/12 from-m:h-full">
			<div class="popup__inner">
				<div class="popup__content m:hidden">
					Вы можете выбрать только одну роль, которую в последующем нельзя изменить
				</div>
				<div class="popup__footer text-center">
					<v-btn @click="onNextClick" :disabled="nextDisabled">Далее</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormRadio from "~/components/_uikit/FormRadio";
import FormSelect from "~/components/form/FormSelect";

export default {
	name: "RegisterStepOne",
	props: {
		role: {
			type: [String, Number],
			default: ''
		},
		professionID: {
			type: [String, Number],
			default: ''
		},
	},
	components: {FormSelect, FormRadio, VBtn},
	data() {
		return {}
	},
	computed: {
		nextDisabled() {
			if (this.innerRole === 0) {
				return false;
			} else {
				return this.innerRole === '' || !this.innerProfessionID;
			}
		},
		innerRole: {
			get() {
				return this.role;
			},
			set(val) {
				if (!val) {
					this.innerProfessionID = '';
				}
				this.$emit('update:role', val);
			}
		},
		innerProfessionID: {
			get() {
				return this.professionID;
			},
			set(val) {
				if (val && !this.innerRole) {
					this.innerRole = 1;
				}
				this.$emit('update:professionID', val);
			}
		},
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
