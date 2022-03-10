<template>
	<div class="_ObjectDescription pt-5">
		<div class="box box--m">
			<div class="text-l" v-html="description"></div>
			<div class="text-l text-brand mt-m" v-if="object.tags && object.tags.length">
				<button class="link mr-8" v-for="objectTag in object.tags" :key="objectTag.id" @click="onTagClick(objectTag.tag.id)">
					#{{ objectTag.tag.tag }}
				</button>
			</div>
		</div>
		<div class="box box--m" v-if="rooms.length">
			<div class="title-s">Описание отдельных помещений</div>
			<div class="btnRow btnRow--xs mt-m">
				<v-btn class="--tab"
							 v-for="(room, i) in rooms"
							 :key="i"
							 :class="{active: activeTab === i}"
							 @click="activeTab = i">
					{{ room.title }}
				</v-btn>
			</div>
			<div class="text-l mt-m" v-for="(room, i) in rooms" v-if="activeTab === i">
				{{ room.description }}
				<div class="mt-m">Площадь помещения: {{ room.square }} м²</div>
			</div>
		</div>
		<div class="box box--m" v-if="object.special_requirements">
			<div class="title-s">Особые требования</div>
			<div class="text-l text-dark mt-8">{{ object.special_requirements }}</div>
		</div>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
import {filterQueryEncode} from "~/utils/filterQuery";

export default {
	name: "ObjectDescription",
	props: {
		object: {
			type: Object,
			default: () => {
				return {}
			}
		},
		type: {
			type: String,
			default: 'locations'
		},
	},
	components: {VBtn},
	data() {
		return {
			activeTab: 0
		}
	},
	computed: {
		description() {
			const regExp = /([^\"=]{2}|^)((https?|ftp):\/\/\S+[^\s.,> )\];'\"!?])/;
			const subst = '$1<a class="fz-14" href="$2" target="_blank">$2</a>';
			return this.object.description.replace(regExp, subst).replace(/\n/g, "<br />");
		},
		rooms() {
			return this.object.rooms ? JSON.parse(this.object.rooms) : []
		}
	},
	methods: {
		onTagClick(id) {
			const filter = {
				tags: [id]
			}
			this.$router.replace({path: `/${this.type}`, query: {filterParams: filterQueryEncode(filter)}});
		}
	},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	},
}
</script>
