<template>
	<div class="_User">
		<Media :class="{'--s': small}">
			<template v-slot:aside>
				<div class="avatar" v-if="Object.values(picture).length">
					<img :src="picture['s']" :srcset="`${picture['m']} 2x`"
							 :alt="name ? name : ''">
				</div>
				<div class="avatar" v-else>
					<img src="~/static/svg/user.svg">
				</div>
			</template>
			<slot name="title"></slot>
			<div class="mediaBody__name" :class="{'--cut': nameCut}">
				<div class="text-ellipsis" :class="{'text-brand': brand}" v-if="name">{{name}}</div>
				<div class="text-ellipsis text-label" v-else>Исполнитель <br> еще не определен</div>
			</div>
			<slot></slot>
		</Media>
	</div>
</template>

<script>
	import Media from "@/components/_uikit/Media";

	export default {
		name: "User",
		props: {
			name: {
				type: String,
				default: () => '',
			},
			nameCut: {
				type: Boolean,
				default: () => false,
			},
			picture: {
				type: Object,
				default: () => ({}),
			},
			small: {
				type: Boolean,
				default: () => false,
			},
			brand: {
				type: Boolean,
				default: () => true,
			}
		},
		components: {Media},
		data() {
			return {}
		},
		computed: {},
		methods: {},
		directives: {},
		filters: {},
		watch: {},
		mounted() {
		}
	}
</script>


