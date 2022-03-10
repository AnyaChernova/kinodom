<template>
	<div class="_LocationAddPhotoModal popup">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout">
			<div class="popup__header">
				<div class="title-l">Выбрать фото</div>
			</div>
			<div class="box box--s">
				<FileUploader multiple class="uploadCard--m" upload-btn-title="Выбрать фото"
											description="Чтобы добавить фото, перетащите файлы сюда" @upload="onUpload"/>
			</div>
			<div class="box box--s" v-if="photos.length">
				<LocationPhotoEdit v-for="(photo, i) in photos"
													 :key="photo.id"
													 :photo="photo"
													 :comment.sync="comments[i]"
													 @delete="onDelete"
														@setMain="onSetMain"/>
			</div>
			<div class="box box--s text-center">
				<v-btn class="s:w-full s:mt-20" @click="onSave">Сохранить</v-btn>
			</div>
		</div>
	</div>
</template>
<script>


import VBtn from "~/components/_uikit/VBtn";
import FormTextarea from "~/components/form/FormTextarea";
import VBadge from "~/components/_uikit/VBadge";
import FileUploader from "~/components/_block/FileUploader";
import _fileReader from "~/components/_mixins/_fileReader";
import LocationPhotoEdit from "~/components/location/LocationPhotoEdit";

export default {
	name: "LocationAddPhotoModal",
	mixins: [_fileReader],
	props: {
		addedPhotos: {
			type: Array,
			default: () => [],
		},
		addedComments: {
			type: Array,
			default: () => [],
		},
	},
	components: {LocationPhotoEdit, FileUploader, VBadge, FormTextarea, VBtn},
	data() {
		return {
			photos: [...this.addedPhotos],
			comments: [...this.addedComments]
		}
	},
	computed: {
		fileMain() {
			return this.photos.findIndex(({main}) => main);
		}
	},
	methods: {
		async onUpload(files) {
			const newPhotos = await Promise.all(files.map(async (file, i) => {
				const src = await this.getSrcFromFile(file);
				const name = file.name;
				const id = `0${+this.photos.length + +i + 1}`;
				const main = this.fileMain === -1 && id === '01';
				return {id, src, name, main, file};
			}));

			this.photos = [...this.photos, ...newPhotos];
			this.comments = [...this.comments, ...files.map(() => '')];
		},
		onSetMain(photoId) {
			const index = this.photos.findIndex(({id}) => id === photoId);
			if (index !== -1) {
				this.photos.forEach((photo) => {
					photo.main = false;
				});
				this.photos[index].main = true;
			}
		},
		onDelete(photoId) {
			const index = this.photos.findIndex(({id}) => id === photoId);
			if (index !== -1) {
				this.photos.splice(index, 1);
			}
		},
		onSave() {
			this.$close({
				photos: this.photos,
				comments: this.comments
			});
		}
	},
	mounted() {
	}
}
</script>
