<template>
	<div class="_Rating">
		<div class="rating">
			<div class="rating__back">
				<div class="rating__item">
					<v-svg name="star" w="10" h="10"/>
				</div>
				<div class="rating__item">
					<v-svg name="star" w="10" h="10"/>
				</div>
				<div class="rating__item">
					<v-svg name="star" w="10" h="10"/>
				</div>
				<div class="rating__item">
					<v-svg name="star" w="10" h="10"/>
				</div>
				<div class="rating__item">
					<v-svg name="star" w="10" h="10"/>
				</div>
				<div class="rating__front" :style="`width: 80%;`">
					<div class="rating__item">
						<v-svg name="star" w="10" h="10"/>
					</div>
					<div class="rating__item">
						<v-svg name="star" w="10" h="10"/>
					</div>
					<div class="rating__item">
						<v-svg name="star" w="10" h="10"/>
					</div>
					<div class="rating__item">
						<v-svg name="star" w="10" h="10"/>
					</div>
					<div class="rating__item">
						<v-svg name="star" w="10" h="10"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Rating",
		props: {
			number: {
				type: String,
				default: '',
			},
		},
		components: {},
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


