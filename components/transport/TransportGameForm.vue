<template>
	<div class="_TransportGameForm popupPlate">
		<v-btn simple class="popupPlate__close" @click="$emit('close')">
			<v-svg name="close_s" w="24" h="24"/>
		</v-btn>
		<div class="cells --gap">
			<div class="cell w-1/12"></div>
			<div class="cell w-10/12 box">
				<div class="box__header box__header--s s:mb-0">
					<div class="title">Отправить заявку</div>
					<div class="fz-18 mt-m from-m:hidden">
						Ищете что-то уникальное? Или наоборот, нужно подешевле? Сформулируйте свой запрос, и&nbsp;заполните форму.
					</div>
				</div>
			</div>
			<div class="cell w-1/12"></div>
			<div class="cell w-1/12"></div>
			<div class="cell w-5/12 m:w-10/12">
				<div class="fieldset">
					<FormSelect float label="Тип транспорта" :options="types" v-model="formData.type"/>
				</div>
				<div class="fieldset">
					<FormInputFloat label="Цвет" cut :cut-length="100" v-model="formData.color"/>
				</div>
				<div class="fieldset">
					<FormInputFloat label="Ценовой сегмент" cut :cut-length="100" v-model="formData.price"/>
				</div>
				<div class="fieldset">
					<FormInputFloat label="Дополнительный комментарий" cut :cut-length="100" v-model="formData.message"/>
				</div>
			</div>
			<div class="cell w-1/12"></div>
			<div class="cell w-4/12 m:w-10/12 m:hidden">
				<div class="fz-18 mt-m">
					Ищете что-то уникальное? Или наоборот, нужно подешевле? Сформулируйте свой запрос, и&nbsp;заполните форму.
				</div>
			</div>
			<div class="cell w-7/12 m:w-1/12"></div>
			<div class="cell w-4/12 m:w-10/12">
				<a class="btn --c-success w-full mt-m" :href="`https://wa.me/79256715406?text=${messageText}`" target="_blank">
					<v-svg name="message" w="24" h="24"/>
					<span class="ml-8">Подобрать авто</span>
				</a>
			</div>
			<div class="cell w-1/12"></div>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import FormSelect from "~/components/form/FormSelect";

export default {
	name: "TransportGameForm",
	props: {},
	components: {FormSelect, FormInputFloat, VBtn},
	data() {
		return {
			formData: {
				type: 'Любой',
				color: 'Любой',
				price: 'Любой',
				message: '',
			},
			types: [
				{
					id: 'Любой',
					title: 'Любой'
				},
				{
					id: 'Легковые',
					title: 'Легковые'
				},
				{
					id: 'Грузовые',
					title: 'Грузовые'
				},
				{
					id: 'Автобусы',
					title: 'Автобусы'
				},
				{
					id: 'Мототехника',
					title: 'Мототехника'
				},
				{
					id: 'Водный транспорт',
					title: 'Водный транспорт'
				},
				{
					id: 'Спецтранспорт',
					title: 'Спецтранспорт'
				},
				{
					id: 'Ржд',
					title: 'Ржд'
				},
				{
					id: 'Военные',
					title: 'Военные'
				},
				{
					id: 'Воздушный транспорт',
					title: 'Воздушный транспорт'
				},
				{
					id: 'Ретро авто',
					title: 'Ретро авто'
				},
			]
		}
	},
	computed: {
		messageText() {
			const text = `Заявка на игровой транспорт. Тип транспорта: ${this.formData.type}. Цвет: ${this.formData.color}. Ценовой сегмент: ${this.formData.price}. Дополнительный комментарий: ${this.formData.message}`;
			return encodeURIComponent(text);
		}
	},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	},
}
</script>
