<template>
	<div class="_SettingsPhotoChangeModal popup popup--m">
		<div class="cells cells--popup --gap flex-grow">
			<div class="cell w-1/12 m:hidden"></div>
			<div class="cell w-10/12 m:w-12/12 h-full">
				<div class="popup__inner">
					<div class="popup__header">
						<div class="title">Изменить фото</div>
					</div>
					<div class="popup__content s-mt-auto">
						<div class="box text-center" v-if="file">
							<div class="avatar --xl">
								<img :src="fileSrc" alt="user photo">
							</div>
						</div>
						<FileUploader v-else
													upload-btn-title="Выбрать фото"
													@upload="onCoverUpload"
													description="Чтобы добавить фото, перетащите файлы сюда"/>
					</div>
					<div class="mt-auto" v-if="file">
						<div class="cells --gap-btn --line items-center justify-center">
							<div class="cell s:w-6/12"><v-btn simple class="mr-m s:w-full" @click="onReset">Вернуться</v-btn></div>
							<div class="cell s:w-6/12"><v-btn class="s:w-full" :loading="loading" @click="onSave">Сохранить</v-btn></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import FileUploader from "~/components/_block/FileUploader";
import _fileReader from "~/components/_mixins/_fileReader";
import _baseFormComponent from "~/components/_mixins/_baseFormComponent";

export default {
	name: "SettingsPhotoChangeModal",
	mixins: [_fileReader, _baseFormComponent],
	props: {},
	components: {FileUploader, VBtn},
	data() {
		return {
			formUrl: 'profile',
			formFunc: 'updateAvatar',
		}
	},
	methods: {
		onCoverUpload(file) {
			this.file = file;
		},
		onReset() {
			this.file = null;
			this.fileSrc = null;
		},
		async onSave() {
			const newFormData = this.formDataFilePrepare(this.file, 'avatar');
			newFormData.append('_method', 'PATCH');
			await this.submitForm(newFormData).then(() => {
				this.$snotify.success('Сохранено');
				this.$auth.fetchUser();
			}).catch(() => {
			})
		},
	},
	computed: {},
	mounted() {
	}
}
</script>
