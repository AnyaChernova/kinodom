<template>
	<div class="_LocationPhotoEdit plateCard plateCard--simple">
		<v-btn icon small class="--c-white --radius plateCard__addon" @click="onDeleteClick">
			<v-svg name="basket" w="16" h="16"/>
		</v-btn>
		<div class="plateCard__inner">
			<div class="plateCard__number">{{ photo.id }}</div>
			<img :src="photo.src" alt="" class="pic pic--m plateCard__pic">
			<div class="plateCard__content">
				<v-badge class="from-s:hidden mb-8" v-if="photo.main">Обложка</v-badge>
				<button class="link fz-18 from-s:hidden mb-5" v-else @click="setMain">Сделать обложкой</button>
				<div class="fz-14 mb-10">{{ photo.name }}</div>
				<FormTextarea float label="Описание" v-model="innerComment"/>
				<v-badge class="mt-8 s:hidden" v-if="photo.main">Обложка</v-badge>
				<button class="link fz-18 s:hidden" v-else @click="setMain">Сделать обложкой</button>
			</div>
		</div>
	</div>
</template>

<script>
import FormTextarea from "~/components/form/FormTextarea";
import VBtn from "~/components/_uikit/VBtn";
import VBadge from "~/components/_uikit/VBadge";
export default {
	name: "LocationPhotoEdit",
	props: {
		comment: {
			type: String,
			default: '',
		},
		photo: {
			type: Object,
			default: () => {
				return {
					id: '',
					src: '',
					name: '',
					main: '',
				}
			},
		},
	},
	components: {VBadge, VBtn, FormTextarea},
	data() {
		return {}
	},
	computed: {
		innerComment: {
			get() {
				return this.comment;
			},
			set(val) {
				this.$emit('update:comment', val);
			}
		},
		innerMain: {
			get() {
				return this.main;
			},
			set(val) {
				this.$emit('update:main', val);
			}
		},
	},
	methods: {
		setMain() {
			this.$emit('setMain', this.photo.id);
		},
		onDeleteClick() {
			this.$emit('delete', this.photo.id);
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


