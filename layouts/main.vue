<template>
	<div class="_MainLayout page">
		<div class="page__header">
			<PageHeader is-search/>
		</div>
		<div class="page__content">
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
		name: 'MainLayout',
		components: {PageHeader, PageFooter},
		mixins: [_disableOutline],
	}
</script>
