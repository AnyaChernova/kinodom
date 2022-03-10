<template>
	<div class="_ReviewModal popup">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-10/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header">
						<div class="title">Оставить отзыв</div>
					</div>
					<div class="popup__content">
						<FormTextarea float
													cut
													:cut-length="1000"
													label="Текст отзыва"
													v-model="message"/>
					</div>
					<div class="popup__footer text-center">
						<v-btn :disabled="!message" :loading="loading" @click="onSave">Отправить</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FormTextarea from "~/components/form/FormTextarea";

export default {
	name: "ReviewModal",
	props: {
		orderID: {
			type: Number,
			default: 0,
		},
	},
	components: {FormTextarea, VBtn},
	data() {
		return {
			message: '',
			loading: false
		}
	},
	methods: {
		async onSave() {
			this.loading = true;
			await this.$repositories.orders.review(this.orderID, {
				message: this.message
			}).then(({data}) => {

			}).catch(() => {});
			this.loading = false;
		}
	},
	computed: {},
	mounted() {
	}
}
</script>
