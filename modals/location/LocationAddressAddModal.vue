<template>
	<div class="_LocationAddressAddModal popup">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout h-full">
			<div class="popup__header">
				<div class="title-l">Указать на карте</div>
			</div>
			<div class="box box--s mapBox mapBox--set">
				<div class="mapBox__inner">
					<GoogleMap api-key="AIzaSyC5ecBmTydCiI_8psKvlY-b6cRGh8-SYIs">
						<template #map="{map}">
							<GoogleDraggableMarker :map="map" @move="onMove"/>
						</template>
					</GoogleMap>
				</div>
				<div class="mapBox__plate">
					<div class="mapPlate">
						<img src="/svg/pin-brand.svg" alt="map pin" class="mapPlate__icon">
						<v-spinner class="text-brand" v-if="loading"/>
						<span v-else-if="address">{{ address.value }}</span>
					</div>
				</div>
				<div class="mapBox__bottom from-s:hidden">
					<v-btn class="s:w-full" @click="onSave">Применить</v-btn>
				</div>
			</div>
			<div class="box box--s text-center s:hidden">
				<v-btn @click="onSave">Применить</v-btn>
			</div>
		</div>
	</div>
</template>
<script>


import VBtn from "~/components/_uikit/VBtn";
import GoogleMap from "~/components/google/GoogleMap";
import GoogleDraggableMarker from "~/components/google/GoogleDraggableMarker";
import VSpinner from "~/components/_uikit/VSpinner";

export default {
	name: "LocationAddressAddModal",
	props: {
		position: {
			type: Object,
			default: () => {
				return {
					lat: 55.76,
					lng: 37.64,
				}
			}
		},
	},
	components: {VSpinner, GoogleDraggableMarker, GoogleMap, VBtn},
	data() {
		return {
			loading: false,
			markerPosition: this.position,
			address: null,
			dadataToken: '4a6b0de7ee5b0000a149f3597299839b4dcc384e',
			dadataUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address'
		}
	},
	computed: {},
	methods: {
		async onMove(position) {
			this.markerPosition = position.toJSON();
			await this.getAddress(this.markerPosition.lat, this.markerPosition.lng);
		},
		async getAddress(lat, lon) {
			if (this.dadataToken) {
				this.loading = true;
				await this.$axios.get(this.dadataUrl, {
					params: {lat, lon},
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"Authorization": `Token ${this.dadataToken}`
					}
				}).then((res) => {
					this.address = res.data.suggestions[0];
					this.loading = false;
				}).catch(() => {
					this.$snotify.error('Ошибка');
					this.loading = false;
				});
			}
		},
		onSave() {
			this.$close(this.address);
		},
	},
	mounted() {
	}
}
</script>
