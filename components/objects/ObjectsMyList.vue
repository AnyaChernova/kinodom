<template>
	<div class="_ObjectsMyList">
		<div class="cardRow" ref="grid">
			<div class="grid">
				<ObjectCard class="grid-item grid-item--l"
										v-for="object in objects"
										:key="object.id"
										:id="object.id"
										:type="getObjectType(object)"
										is-edit
										:is-archive="!object.actions.from_archive && !object.actions.to_archive"
										@archive="onArchive"
										@unarchive="onUnArchive"
										:info="getObjectInfo(object)"/>
			</div>
		</div>
	</div>
</template>

<script>

import {mapState} from "vuex";
import ObjectCard from "~/components/object/ObjectCard";

export default {
	name: "ObjectsMyList",
	props: {
		objects: {
			type: Array,
			default: () => [],
		},
	},
	components: {ObjectCard},
	data() {
		return {}
	},
	computed: {
		...mapState({
			locationsStatus: 'locationsStatus',
		}),
	},
	methods: {
		getObjectType(object) {
			if (object.t_id) {
				return 'transport'
			} else {
				return 'locations'
			}
		},
		getObjectInfo(object) {
			let status;

			if (object.actions.from_archive) {
				status = this.locationsStatus.from_archive;
			} else if (object.actions.to_archive) {
				status = this.locationsStatus.to_archive;
			} else if (object.status) {
				status = {
					...object.status,
					statusColor: this.locationsStatus[object.status.code].statusColor
				};
			} else {
				const code = this.$route.filterStatus || '0'
				status = {
					...this.locationsStatus[code],
					code: +code
				};
			}

			const info = {
				picture: '',
				title: object.title,
				status
			}

			if (Object.keys(object.gallery.main).length) {
				info.picture = object.gallery.main.photo;
			}

			return info;
		},
		async onArchive({id, type}) {
			const res = await this.$loadModal('ConfirmModal', {
				isSmall: true,
				isBottom: true,
				title: 'Перенести в архив?',
				subTitle: 'Карточка объекта будет сохранена в архиве и не будет видна пользователям сервиса. Вы всегда сможете восстановить ее.',
				btnText: 'Архивировать',
				btnClass: '--c-danger'
			});

			if (res) {
				if (type === 'locations') {
					await this.archiveLocation(id);
				} else {
					await this.archiveTransport(id);
				}
			}
		},
		async onUnArchive({id, type}) {
			const res = await this.$loadModal('ConfirmModal', {
				isSmall: true,
				isBottom: true,
				title: 'Восстановить из архива?',
				subTitle: 'После модерации объект снова появится на сайте и будет виден пользователям сервиса.',
				btnText: 'Восстановить',
			});

			if (res) {
				if (type === 'locations') {
					await this.unArchiveLocation(id);
				} else {
					await this.unArchiveTransport(id);
				}
			}
		},
		async archiveLocation(id) {
			await this.$repositories.locations.archive(id).then(({data}) => {
				this.$emit('updateList');
				if (data.message) {
					this.$snotify.success(data.message);
				}
			}).catch(() => {});
		},
		async unArchiveLocation(id) {
			await this.$repositories.locations.unarchive(id).then(({data}) => {
				this.$emit('updateList');
				if (data.message) {
					this.$snotify.success(data.message);
				}
			}).catch(() => {});
		},
		async archiveTransport(id) {
			await this.$repositories.transport.archive(id).then(({data}) => {
				this.$emit('updateList');
				if (data.message) {
					this.$snotify.success(data.message);
				}
			}).catch(() => {});
		},
		async unArchiveTransport(id) {
			await this.$repositories.transport.unarchive(id).then(({data}) => {
				this.$emit('updateList');
				if (data.message) {
					this.$snotify.success(data.message);
				}
			}).catch(() => {});
		}
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {},
}
</script>
