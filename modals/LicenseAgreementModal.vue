<template>
	<div class="_LicenseAgreementModal popup">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout">
			<div class="cells --gap">
				<div class="cell w-2/12 m:hidden"></div>
				<div class="cell w-8/12 m:w-12/12">
					<div class="popup__header popup__header--m">
						<div class="title-l">Лицензионное соглашение</div>
					</div>
					<div class="text-center" v-if="loading">
						<v-spinner class="text-brand"/>
					</div>
					<template v-else>
						<div v-if="mainInfo && mainInfo.license_agreement" v-html="text"></div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import {mapState} from "vuex";
import VSpinner from "~/components/_uikit/VSpinner";

export default {
	name: "LicenseAgreementModal",
	props: {},
	components: {VSpinner},
	data() {
		return {
			loading: false
		}
	},
	methods: {},
	computed: {
		...mapState({
			mainInfo: 'mainInfo',
		}),
		text() {
			return this.mainInfo.license_agreement.replace(/\n/g, "<br />").replace(/\u2028/g, ' ');
		}
	},
	async created() {
		this.loading = true;
		await this.$store.dispatch('fetchMainInfo');
		this.loading = false;
	}
}
</script>
