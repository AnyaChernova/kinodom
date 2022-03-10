<template>
	<div class="_LocationsSearchResult">
		<template v-if="locations.length">
			<div class="from-s:hidden">
				<div class="title-m mt-m">Найдено: {{ count }}</div>
				<div class="mt-m"></div>
			</div>
			<div class="box box--s">
				<div class="mapBox mapBox--m mapBox--border">
					<div class="mapBox__inner">
						<GoogleMap api-key="AIzaSyC5ecBmTydCiI_8psKvlY-b6cRGh8-SYIs">
							<template #map="{map}">
								<GoogleMarker v-for="location in locations"
															:key="location.id"
															:marker-i-d="location.id"
															:map="map"
															:marker-title="location.title"
															:position="location.verified_address.coordinates"
															@open="onOpenMap"/>
							</template>
						</GoogleMap>
					</div>
				</div>
			</div>
			<div class="box box--s">
				<div class="cells --gap --line items-center">
					<div class="cell">
						<div class="title-m s:hidden">Найдено: {{ count }}</div>
					</div>
					<div class="cell s:w-12/12 s:text-center">
						<v-btn class="btn --simple" @click="onOpenMap(false)">
							<v-svg name="map-pin" w="25" h="24" class="mr-8"/>
							Развернуть карту
						</v-btn>
					</div>
				</div>
			</div>
			<div class="box box--s">
				<div class="pt-10 s:pt-0"></div>
				<ObjectsList :objects="locations" :count="count" is-load-more/>
			</div>
		</template>
		<template v-else>
			<template v-if="$route.query.search">
				<div class="title-m">Ничего не найдено по запросу «{{ $route.query.search }}»</div>
				<div class="mt-m fz-18">Попробуйте сформулировать запрос иначе, или обратитесь за
					<a href="https://wa.me/79256715406" target="_blank" class="link">помощью к менеджеру</a>
				</div>
			</template>
			<template v-if="$route.query.filterParams">
				<div class="title-m">Подходящие локации не найдены</div>
				<div class="mt-m fz-18">Попробуйте смягчить условия поиска, или обратитесь за
					<a href="https://wa.me/79256715406" target="_blank" class="link">помощью к менеджеру</a>
				</div>
			</template>
		</template>
	</div>
</template>

<script>

import GoogleMap from "~/components/google/GoogleMap";
import GoogleMarker from "~/components/google/GoogleMarker";
import ObjectsList from "~/components/objects/ObjectsList";
import VBtn from "~/components/_uikit/VBtn";
import {mapState} from "vuex";

export default {
	name: "LocationsSearchResult",
	props: {},
	components: {VBtn, ObjectsList, GoogleMarker, GoogleMap},
	data() {
		return {}
	},
	computed: {
		...mapState('locations', {
			locations: 'locations',
			count: 'locationsCount',
		}),
	},
	methods: {
		onOpenMap(locationID) {
			const query = {
				filterParams: this.$route.query.filterParams,
				search: this.$route.query.search,
			}

			if (locationID) {
				query.locationID = locationID;
			}

			this.$router.push({path: '/map', query: query});
		},
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


