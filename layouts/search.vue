<template>
	<div class="_SearchLayout page">
		<div class="page__header">
			<PageHeader is-search is-search-show/>
		</div>
		<div class="page__content page__content--top">
			<div class="content">
				<nuxt></nuxt>
			</div>
		</div>
		<div class="page__footer">
			<PageFooter/>
		</div>
		<client-only>
			<div class="dropdownTargetWrap">
				<portal-target class="dropdownTarget" name="dropdownTarget" multiple/>
			</div>
			<dialogs-wrapper/>
			<vue-snotify class="snotify-custom"/>
		</client-only>
	</div>
</template>
<script>
	import _disableOutline from "@/components/_mixins/_disableOutline";
	import PageFooter from "~/components/page/PageFooter";
	import PageHeader from "~/components/page/PageHeader";

	export default {
		name: 'SearchLayout',
		components: {PageHeader, PageFooter},
		mixins: [_disableOutline],
	}
</script>
