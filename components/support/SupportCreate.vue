<template>
	<div class="_SupportCreate box">
		<div class="box__header box__header--s fz-18">Выберите тему обращения</div>
		<div class="cells --gap-m items-stretch">
			<div class="cell w-6/12 s:w-12/12" v-if="$store.getters.isOwner">
				<button class="plateCard plateCard--m" @click="onLocationPlacementClick">
					<div class="d-flex items-center text-left">
						<span class="title-s">Размещение локации</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</button>
			</div>
			<div class="cell w-6/12 s:w-12/12" v-if="$store.getters.isOwner">
				<button class="plateCard plateCard--m" @click="onTransportPlacementClick">
					<div class="d-flex items-center text-left">
						<span class="title-s">Размещение транспорта</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</button>
			</div>
			<div class="cell w-6/12 s:w-12/12" v-if="$store.getters.isRenter">
				<button class="plateCard plateCard--m" @click="onRentLocationClick">
					<div class="d-flex items-center text-left">
						<span class="title-s">Вопрос по аренде локации</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</button>
			</div>
			<div class="cell w-6/12 s:w-12/12" v-if="$store.getters.isRenter">
				<button class="plateCard plateCard--m" @click="onRentTransportClick">
					<div class="d-flex items-center text-left">
						<span class="title-s">Вопрос по аренде транспорта</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</button>
			</div>
			<div class="cell w-6/12 s:w-12/12" v-if="$store.getters.isRenter">
				<nuxt-link to="/search-form/location" class="plateCard plateCard--m">
					<div class="d-flex items-center text-left">
						<span class="title-s">Запрос на поиск локации</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</nuxt-link>
			</div>
			<div class="cell w-6/12 s:w-12/12" v-if="$store.getters.isRenter">
				<nuxt-link to="/search-form/transport" class="plateCard plateCard--m">
					<div class="d-flex items-center text-left">
						<span class="title-s">Запрос на поиск транспорта</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</nuxt-link>
			</div>
			<div class="cell w-6/12 s:w-12/12">
				<button class="plateCard plateCard--m" @click="onServiceQuestionClick">
					<div class="d-flex items-center text-left">
						<span class="title-s">Вопрос по работе сервиса</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</button>
			</div>
			<div class="cell w-6/12 s:w-12/12">
				<button class="plateCard plateCard--m" @click="onServiceErrorClick">
					<div class="d-flex items-center text-left">
						<span class="title-s">Ошибка на сайте</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</button>
			</div>
			<div class="cell w-6/12 s:w-12/12" v-if="!$auth.user">
				<button class="plateCard plateCard--m" @click="onPartnershipClick">
					<div class="d-flex items-center text-left">
						<span class="title-s">Сотрудничество</span>
						<v-svg name="arrow" w="24" h="24" class="text-brand ml-auto"/>
					</div>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from "vuex";

export default {
	name: "SupportCreate",
	props: {},
	components: {},
	data() {
		return {}
	},
	computed: {
		...mapState({
			supportThemes: 'supportThemes',
		}),
	},
	methods: {
		async onRentLocationClick() {
			const res = await this.$loadModal('RentRequestModal', {
				theme: this.supportThemes['3'],
				isFull: true,
				lock: true});

			if (res && this.$auth.user) {
				await this.$router.push('/support');
			}
		},
		async onRentTransportClick() {
			const res = await this.$loadModal('RentRequestModal', {
				theme: this.supportThemes['3'],
				type: 'transport',
				isFull: true,
				lock: true});

			if (res && this.$auth.user) {
				await this.$router.push('/support');
			}
		},
		async onLocationPlacementClick() {
			const res = await this.$loadModal('SupportRequestModal', {
				isFull: true,
				lock: true,
				requestParams: this.supportThemes['4']
			});

			if (res && this.$auth.user) {
				await this.$router.push('/support');
			}
		},
		async onTransportPlacementClick() {
			const res = await this.$loadModal('SupportRequestModal', {
				isFull: true,
				lock: true,
				requestParams: this.supportThemes['7']
			});

			if (res && this.$auth.user) {
				await this.$router.push('/support');
			}
		},
		async onServiceQuestionClick() {
			const res = await this.$loadModal('SupportRequestModal', {
				isFull: true,
				lock: true,
				requestParams: this.supportThemes['0']
			});

			if (res && this.$auth.user) {
				await this.$router.push('/support');
			}
		},
		async onServiceErrorClick() {
			const res = await this.$loadModal('SupportRequestModal', {
				isFull: true,
				lock: true,
				requestParams: this.supportThemes['1']
			});

			if (res && this.$auth.user) {
				await this.$router.push('/support');
			}
		},
		onPartnershipClick() {
			this.$loadModal('SupportRequestModal', {
				isFull: true,
				lock: true,
				requestParams: this.supportThemes['2']
			});
		}
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
	}
}
</script>


