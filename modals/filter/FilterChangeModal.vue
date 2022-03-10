<template>
	<div class="_FilterChangeModal popup popup--fix filterPanel">
		<button class="p-close" @click="$close(false)">
			<v-svg name="close_s" w="24" h="24"/>
		</button>
		<div class="layout popup__wrap">
			<div class="title-l">Стиль пространства</div>
			<div class="popup__header popup__header--s mt-10">
				<FormInput class="--searchFilter" placeholder="Например: Арбат">
					<template #beforeInner>
						<v-svg name="search" w="16" h="16"/>
					</template>
				</FormInput>
			</div>
			<div class="cells --gap-list">
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Центральный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Северный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Северо-Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Юго-Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Центральный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Северный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Северо-Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Юго-Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Западный"/></div>
				<div class="cell w-4/12 m:w-6/12 s:w-12/12"><FormCheckbox label="Юго-Западный"/></div>
			</div>

			<div class="filterPanel__footer filterPanel__footer--s popup__bottom">
				<div class="cells --gap-btn --line items-center justify-center">
					<div class="cell s:w-6/12">
						<v-btn class="s:w-full --wide" @click="$close(true)">Применить</v-btn>
					</div>
					<div class="cell s:w-6/12">
						<v-btn simple class="s:w-full">Сбросить все</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import VBtn from "~/components/_uikit/VBtn";
import FormCheckbox from "~/components/_uikit/FormCheckbox";
import FormInput from "~/components/_uikit/FormInput";

export default {
	name: "FilterChangeModal",
	props: {},
	components: {FormInput, FormCheckbox, VBtn},
	data() {
		return {
		}
	},
	methods: {},
	computed: {},
	mounted() {
	}
}
</script>
