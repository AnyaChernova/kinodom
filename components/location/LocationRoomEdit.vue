<template>
	<div class="_LocationRoomEdit plateCard">
		<v-btn icon small class="--c-white --radius plateCard__addon" @click="onDeleteClick">
			<v-svg name="basket" w="16" h="16"/>
		</v-btn>
		<v-btn simple class="plateCard__mover">
			<v-svg name="mover" w="6" h="14"/>
		</v-btn>
		<FormInputFloat label="Название помещения" v-model="innerTitle" :errors="innerErrors.title"/>
		<FormFieldMask label="Площадь помещения, м²" v-model="innerSquare" :errors="innerErrors.square"/>
		<FormTextarea float label="Описание помещения" v-model="innerDescription" :errors="innerErrors.description"/>
	</div>
</template>

<script>
import FormTextarea from "~/components/form/FormTextarea";
import VBtn from "~/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import FormFieldMask from "~/components/form/FormFieldMask";

export default {
	name: "LocationRoomEdit",
	props: {
		index: {
			type: Number,
			default: 0,
		},
		title: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		square: {
			type: String,
			default: '',
		},
		errors: {
			type: Object,
			default: () => {
				return {
					title: [],
					description: [],
					square: [],
				}
			},
		}
	},
	components: {FormFieldMask, FormInputFloat, VBtn, FormTextarea},
	data() {
		return {
			innerErrors: JSON.parse(JSON.stringify(this.errors))
		}
	},
	computed: {
		innerTitle: {
			get() {
				return this.title;
			},
			set(val) {
				if (val) this.innerErrors.title = [];
				this.$emit('update:title', val);
			}
		},
		innerDescription: {
			get() {
				return this.description;
			},
			set(val) {
				if (val) this.innerErrors.description = [];
				this.$emit('update:description', val);
			}
		},
		innerSquare: {
			get() {
				return this.square;
			},
			set(val) {
				if (val) this.innerErrors.square = [];
				this.$emit('update:square', val);
			}
		},
	},
	methods: {
		onDeleteClick() {
			this.$emit('delete', this.index);
		}
	},
	directives: {},
	filters: {},
	watch: {
		errors: {
			handler(){
				this.innerErrors = JSON.parse(JSON.stringify(this.errors));
			},
			deep: true
		}
	},
	mounted() {
	}
}
</script>


