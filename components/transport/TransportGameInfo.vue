<template>
	<div class="_TransportGameInfo">
		<div class="box">
			<div class="cells --gap">
				<div class="cell w-3/12 s:hidden"></div>
				<div class="cell w-6/12 s:w-12/12 box text-center">
					<div class="box__header">
						<div class="text-title text-mid text-dark fz-20">
							Наша база игрового транспорта включает в&nbsp;себя более 1000&nbsp;моделей, работаем по&nbsp;всей стране. подберем подходящий транспорт под любой ваш запрос!
						</div>
					</div>
					<v-btn @click="showForm">Оставить заявку</v-btn>
				</div>
				<div class="cell w-3/12 s:hidden"></div>
			</div>
		</div>
		<div class="box">
			<TransportGameForm @close="hideForm" v-if="isForm"/>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import TransportGameForm from "~/components/transport/TransportGameForm";
export default {
	name: "TransportGameInfo",
	props: {},
	components: {TransportGameForm, VBtn},
	data() {
		return {
			isForm: false
		}
	},
	computed: {},
	methods: {
		showForm() {
			this.isForm = true;
		},
		hideForm() {
			this.isForm = false;
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {},
}
</script>
