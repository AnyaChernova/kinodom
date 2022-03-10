<template>
	<div class="_LocationRoomAddModal popup">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout">
			<div class="popup__header">
				<div class="title-l">Помещения</div>
			</div>
			<div class="box box--s">
				<client-only>
					<draggable v-model="innerRooms" draggable=".plateCard" handle=".plateCard__mover">
						<LocationRoomEdit v-for="(room, i) in innerRooms"
															:key="room.id"
															:index="i"
															:title.sync="room.title"
															:description.sync="room.description"
															:square.sync="room.square"
															:errors="roomsErrors[i]"
															@delete="deleteRoom"
						/>
					</draggable>
				</client-only>
			</div>
			<div class="box box--s from-s:d-flex justify-between items-center">
				<v-btn simple @click="addRoom">
					<v-svg name="plus" w="24" h="24" class="ml-m"/>
					<span class="ml-8">Добавить помещение</span>
				</v-btn>
				<v-btn class="s:w-full s:mt-20" @click="onSave">Сохранить</v-btn>
			</div>
		</div>
	</div>
</template>
<script>


import VBtn from "~/components/_uikit/VBtn";
import FormInputFloat from "~/components/form/FormInputFloat";
import FormFieldMask from "~/components/form/FormFieldMask";
import FormTextarea from "~/components/form/FormTextarea";
import LocationRoomEdit from "~/components/location/LocationRoomEdit";

export default {
	name: "LocationRoomAddModal",
	props: {
		rooms: {
			type: Array,
			default: () => []
		},
	},
	components: {LocationRoomEdit, FormTextarea, FormFieldMask, FormInputFloat, VBtn},
	data() {
		return {
			innerRooms: [...this.rooms],
			roomsErrors: [],
			errors: {
				title: 'Укажите название',
				description: 'Укажите описание',
				square: 'Укажите площадь',
			}
		}
	},
	computed: {
		isErrors() {
			const fieldErrors = this.roomsErrors.filter((room) => {
				const fields = Object.values(room).filter((item) => item.length);
				return fields.length;
			});
			return fieldErrors.length > 0;
		}
	},
	methods: {
		onSave() {
			this.checkRooms();
			if (!this.isErrors) {
				this.$close(this.innerRooms);
			}
		},
		addRoom() {
			this.innerRooms.push({
				id: this.innerRooms.length + 1,
				title: '',
				description: '',
				square: '',
			});

			this.roomsErrors.push({
				title: [],
				description: [],
				square: [],
			});
		},
		deleteRoom(key) {
			this.innerRooms.splice(key, 1);
			this.roomsErrors.splice(key, 1);
		},
		fillRoomErrors() {
			this.roomsErrors = this.innerRooms.map(() => {
				return {
					title: [],
					description: [],
					square: [],
				}
			});
		},
		checkRooms() {
			this.innerRooms.forEach((room, index) => {
				const fields = Object.keys(room);
				fields.forEach((field) => {
					if (!room[field]) {
						this.roomsErrors[index][field] = [this.errors[field]];
					} else {
						this.roomsErrors[index][field] = [];
					}
				})
			});
		}
	},
	created() {
		if (!this.innerRooms.length) {
			this.innerRooms.push({
				id: 1,
				title: '',
				description: '',
				square: '',
			});
		}

		this.fillRoomErrors();
	},
	mounted() {
	}
}
</script>
