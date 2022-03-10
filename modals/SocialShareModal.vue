<template>
	<div class="_SocialShareModal popup">
		<div class="popup__header">
			<div class="title">Поделиться</div>
		</div>
		<div class="popup__content">Выберите вашу социальную сеть</div>
		<div class="popup__footer">
			<div class="ya-share2"
					 data-curtain
					 data-size="l"
					 data-shape="round"
					 data-limit="5"
					 data-popup-position="outer"
					 data-services="vkontakte,facebook,viber,telegram,whatsapp,twitter,odnoklassniki"></div>
		</div>
	</div>
</template>
<script>

import VBtn from "@/components/_uikit/VBtn";
import {loadScript} from "~/plugins/get-script-promise";

export default {
	name: "SocialShareModal",
	props: {},
	components: {VBtn},
	data() {
		return {}
	},
	computed: {},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	beforeMount() {
		loadScript('share-js', 'https://yastatic.net/share2/share.js')
	},
	beforeDestroy() {
		const script = document.getElementById('share-js');
		if (script) {
			document.getElementsByTagName('head')[0].removeChild(script);
		}
	}
}
</script>
