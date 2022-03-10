<template>
	<div class="_PageUserMenu">
		<v-btn icon class="btn--circle" v-dropdown:menu>
			<img :src="$auth.user.avatar" :alt="$auth.user.name" v-if="$auth.user.avatar" width="32" height="32">
			<v-svg name="user_profile" w="32" h="32" :class="{'text-brand': isOpen}" v-else/>
		</v-btn>
		<Dropdown name="menu" bottom-end target-class="--custom" :offset="[0, 8]" v-model="isOpen">
			<div class="userDropdown">
				<div class="user userDropdown__item">
					<div class="avatar --l user__pic">
						<img :src="$auth.user.avatar" :alt="$auth.user.name" v-if="$auth.user.avatar">
						<v-svg name="user_big" w="78" h="78" v-else/>
					</div>
					<div class="user__content">
						<div class="title-s">{{ $auth.user.name }}</div>
						<div class="mt-4" v-if="$store.getters.isOwner">Использование сервиса для сдачи локаций в аренду</div>
						<div class="mt-4" v-else>Использование сервиса для поиска локаций</div>
					</div>
				</div>
				<div class="mt-5"></div>
				<template v-if="$store.getters.isOwner">
					<div class="userDropdown__item from-s:hidden">
						<nuxt-link to="/my-objects" class="link d-flex items-center">
							<v-svg name="locations" w="24" h="24" class="text-brand mr-m"/>
							<span class="fz-18 text-dark">Мои локации</span>
						</nuxt-link>
					</div>
					<div class="userDropdown__item from-s:hidden">
						<nuxt-link to="/history" class="link d-flex items-center">
							<v-svg name="clock" w="24" h="24" class="text-brand mr-m"/>
							<span class="fz-18 text-dark">История аренды</span>
						</nuxt-link>
					</div>
				</template>
				<template v-else>
					<div class="userDropdown__item from-s:hidden">
						<nuxt-link to="/favorites" class="link d-flex items-center">
							<v-svg name="favorite" w="24" h="24" class="text-brand mr-m"/>
							<span class="fz-18 text-dark">Избранное</span>
						</nuxt-link>
					</div>
					<div class="userDropdown__item from-s:hidden">
						<nuxt-link to="/history" class="link d-flex items-center">
							<v-svg name="kino" w="24" h="24" class="text-brand mr-m"/>
							<span class="fz-18 text-dark">История аренды</span>
						</nuxt-link>
					</div>
				</template>
				<div class="userDropdown__item from-s:hidden">
					<nuxt-link to="/support/create" class="link d-flex items-center">
						<v-svg name="message" w="24" h="24" class="text-brand mr-m"/>
						<span class="fz-18 text-dark">Поддержка</span>
					</nuxt-link>
				</div>
				<div class="userDropdown__item">
					<nuxt-link to="/settings" class="link d-flex items-center">
						<v-svg name="settings" w="24" h="24" class="text-brand mr-m"/>
						<span class="fz-18 text-dark">Настройки профиля</span>
					</nuxt-link>
				</div>
				<div class="userDropdown__item">
					<button class="link d-flex items-center" @click="">
						<v-svg name="logout" w="24" h="24" class="text-brand mr-m"/>
						<span class="fz-18 text-dark" @click="onLogout">Выйти</span>
					</button>
				</div>
			</div>
		</Dropdown>
	</div>
</template>

<script>

import VBtn from "~/components/_uikit/VBtn";
export default {
	name: "PageUserMenu",
	props: {},
	components: {VBtn},
	data() {
		return {
			isOpen: false
		}
	},
	computed: {},
	methods: {
		async onLogout() {
			const res = await this.$loadModal('ConfirmModal', {
				isSmall: true,
				isBottom: true,
				title: 'Выйти?',
				btnText: 'Выйти',
				btnClass: '--c-danger --wide',
				cancelText: 'Отменить'
			});

			if (res) {
				await this.$auth.logout();
			}
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
