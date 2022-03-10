<template>
	<div class="_TransportMainInfo">
		<div class="cells --gap">
			<div class="cell w-12/12">
				<div class="cells --gap-s">
					<div class="cell w-8/12 xl:w-6/12 l:w-12/12 box">
						<div class="box__header box__header--xs">
							<h1 class="title">{{ transport.title }}</h1>
						</div>
						<div class="d-flex items-center">
							<div class="d-flex items-center mr-m">
								<span class="price text-brand mr-8">{{ transport.price }}</span>
								<span>₽/сутки</span>
							</div>
<!--							<v-badge :color="locationsStatus[transport.status.code].statusColor">-->
<!--								{{ transport.status.text }}-->
<!--							</v-badge>-->
						</div>
					</div>
					<div class="cell w-4/12 xl:w-6/12 l:w-12/12">
						<div class="btnRow btnRow--m justify-end s:justify-start s:flex-wrap mt-10 s:mt-0">
							<v-btn icon class="--c-white --radius s:hidden" @click="onShareClick">
								<v-svg name="share" w="16" h="16"/>
							</v-btn>
							<v-btn icon class="--c-white --radius from-s:hidden" @click="onShareMobClick">
								<v-svg name="share" w="16" h="16"/>
							</v-btn>
							<template v-if="!$auth.user || $store.getters.isRenter">
								<v-btn icon class="--c-white --radius" @click.prevent="onClickDelete" v-if="isFavorite">
									<v-svg name="heart_thin-fill" w="19" h="17"/>
								</v-btn>
								<v-btn icon class="--c-white --radius" @click.prevent="onClickAdd" v-else>
									<v-svg name="heart_thin" w="19" h="17"/>
								</v-btn>
								<a class="btn --simple --c-white --radius" href="https://t.me/kinodom_rus" target="_blank">
									<img src="/svg/telegram.svg" alt="telegram">
								</a>
							</template>
							<v-btn class="--c-white --bigRadius --copy s-ml-auto" @click="onCopyClick">
								<span class="ws-no-wrap">id: {{ transport.t_id }}</span>
								<v-svg name="copy" w="16" h="16" class="ml-8"/>
							</v-btn>
							<input class="visually-hidden" readonly ref="idInput" :value="transport.t_id">
						</div>
					</div>
				</div>
			</div>
			<div class="cell w-12/12" v-if="transport.properties">
				<div class="infoBox">
					<v-svg name="logo-house" w="43" h="48" class="infoBox__pic"/>
					<div class="infoBox__content">
						<div class="title-s">Дополнительная информация от&nbsp;&laquo;Кинодома&raquo;</div>
						<div>Доступна в течение
							<Timer :deadline="location.properties.available_until_at"/>
						</div>
					</div>
					<v-btn simple class="infoBox__btn" @click="openInfoModal">
						<v-svg name="eye" w="24" h="24" class="mr-8"/>
						<span>Смотреть</span>
					</v-btn>
				</div>
			</div>
			<div class="cell w-12/12" v-if="transport.gallery.main.photo">
				<div class="title-m">Фото ({{ transport.gallery.additional.length + 1 }})</div>
			</div>
			<div class="cell w-12/12"></div>
		</div>
		<div class="box box--m">
			<ObjectSlider :gallery="transport.gallery.additional" :main="transport.gallery.main"/>
		</div>
		<div class="box box--m from-s:hidden">
			<div class="cells --gap" ref="buttons">
				<div class="cell w-6/12">
					<a class="btn --c-success w-full" href="tel:+79299359003" target="_blank">
						<v-svg name="call" w="25" h="24"/>
						<span class="ml-8 xxxs:hidden">Позвонить</span>
					</a>
				</div>
				<div class="cell w-6/12">
					<a class="btn --c-blue w-full" :href="`https://wa.me/79256715406?text=${messageText}`" target="_blank">
						<v-svg name="send" w="25" h="24"/>
						<span class="ml-8 xxxs:hidden">Написать</span>
					</a>
				</div>
			</div>
		</div>
		<div class="box box--m box--border">
			<div class="cells --gap-s">
<!--				<div class="cell w-2/12 l:w-4/12 s:w-6/12 xs:w-12/12">-->
<!--					<div class="cells &#45;&#45;gap-xs">-->
<!--						<div class="cell w-12/12 xs:w-6/12">-->
<!--							<div class="title-s">Статус:</div>-->
<!--						</div>-->
<!--						<div class="cell w-12/12 xs:w-6/12">-->
<!--							<v-badge :color="locationsStatus[transport.status.code].statusColor">-->
<!--								{{ transport.status.text }}-->
<!--							</v-badge>-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
				<div class="cell w-2/12 l:w-4/12 s:w-6/12 xs:w-12/12" v-if="transport.model">
					<div class="cells --gap-xs">
						<div class="cell w-12/12 xs:w-6/12">
							<div class="title-s">Модель:</div>
						</div>
						<div class="cell w-12/12 xs:w-6/12">
							<div class="fz-18">{{ transport.model }}</div>
						</div>
					</div>
				</div>
				<div class="cell w-2/12 l:w-4/12 s:w-6/12 xs:w-12/12" v-if="transport.verified_address.city">
					<div class="cells --gap-xs">
						<div class="cell w-12/12 xs:w-6/12">
							<div class="title-s">Город:</div>
						</div>
						<div class="cell w-12/12 xs:w-6/12">
							<div class="fz-18">{{ transport.verified_address.city }}</div>
						</div>
					</div>
				</div>
				<div class="cell w-2/12 l:w-4/12 s:w-6/12 xs:w-12/12" v-if="transport.release_year">
					<div class="cells --gap-xs">
						<div class="cell w-12/12 xs:w-6/12">
							<div class="title-s">Год выпуска:</div>
						</div>
						<div class="cell w-12/12 xs:w-6/12">
							<div class="fz-18">{{ transport.release_year }}</div>
						</div>
					</div>
				</div>
				<div class="cell w-2/12 l:w-4/12 s:w-6/12 xs:w-12/12" v-if="transport.color">
					<div class="cells --gap-xs">
						<div class="cell w-12/12 xs:w-6/12">
							<div class="title-s">Цвет:</div>
						</div>
						<div class="cell w-12/12 xs:w-6/12">
							<div class="fz-18">{{ transport.color }}</div>
						</div>
					</div>
				</div>
				<div class="cell w-2/12 l:w-4/12 s:w-6/12 xs:w-12/12" v-if="transport.max_rent">
					<div class="cells --gap-xs">
						<div class="cell w-12/12 xs:w-6/12">
							<div class="title-s">Срок аренды:</div>
						</div>
						<div class="cell w-12/12 xs:w-6/12">
							<div class="fz-18">до&nbsp;{{ transport.max_rent }}&nbsp;дней</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box box--borderM box--m">
			<div class="cells --gap">
				<div class="cell w-4/12 m:w-6/12 s:w-12/12" v-if="transport.types.length">
					<div class="title-m">Тип кузова</div>
					<div class="mt-m">
						<div class="tagRow text-brand">
							<span class="tag" v-for="transportType in transport.types" :key="transportType.id">
								{{ transportType.type.type }}
							</span>
						</div>
					</div>
				</div>
				<div class="cell w-5/12 m:w-6/12 s:w-12/12" v-if="transport.styles.length">
					<div class="title-m">Стиль авто</div>
					<div class="mt-m">
						<div class="tagRow text-brand">
							<span class="tag" v-for="transportStyle in transport.styles" :key="transportStyle.id">
								{{ transportStyle.style.style }}
							</span>
						</div>
					</div>
				</div>
				<div class="cell w-3/12 m:w-12/12 text-right">
					<div class="d-flex items-center justify-end mr-m">
						<div class="title-m">{{ transport.price }}</div>
						<span class="fz-16 ml-10">₽/сутки</span>
					</div>
					<a class="btn --c-success w-full mt-m m:hidden" href="tel:+79299359003" target="_blank">
						<v-svg name="call" w="25" h="24"/>
						<span class="ml-8">Позвонить</span>
					</a>
					<div class="mt-m m:hidden">
						<a class="btn --c-blue w-full" :href="`https://wa.me/79256715406?text=${messageText}`" target="_blank">
							<v-svg name="send" w="25" h="24"/>
							<span class="ml-8">Написать</span>
						</a>
					</div>
				</div>
				<div class="cell w-6/12 from-m:hidden s:hidden">
					<a class="btn --c-success w-full" href="tel:+79299359003" target="_blank">
						<v-svg name="call" w="25" h="24"/>
						<span class="ml-8">Позвонить</span>
					</a>
				</div>
				<div class="cell w-6/12 from-m:hidden s:hidden">
					<a class="btn --c-blue w-full" :href="`https://wa.me/79256715406?text=${messageText}`" target="_blank">
						<v-svg name="send" w="25" h="24"/>
						<span class="ml-8">Написать</span>
					</a>
				</div>
			</div>
		</div>
		<div class="floatBox from-s:hidden">
			<div class="cells --gap">
				<div class="cell w-6/12">
					<a class="btn --c-success w-full" href="tel:+79299359003" target="_blank">
						<v-svg name="call" w="25" h="24"/>
						<span class="ml-8 xxxs:hidden">Позвонить</span>
					</a>
				</div>
				<div class="cell w-6/12">
					<a class="btn --c-blue w-full":href="`https://wa.me/79256715406?text=${messageText}`" target="_blank">
						<v-svg name="send" w="25" h="24"/>
						<span class="ml-8 xxxs:hidden">Написать</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import VBadge from "~/components/_uikit/VBadge";
import VBtn from "~/components/_uikit/VBtn";
import ObjectSlider from "~/components/object/ObjectSlider";
import Timer from "~/components/_block/Timer";

export default {
	name: "TransportMainInfo",
	props: {
		transport: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	components: {Timer, ObjectSlider, VBtn, VBadge},
	data() {
		return {
			timeout: null,
			isFavorite: this.transport.is_favorite
		}
	},
	computed: {
		...mapState({
			locationsStatus: 'locationsStatus',
			supportThemes: 'supportThemes',
		}),
		messageText() {
			const text = `Здравствуйте! Интересует данный транспорт: ${this.$store.state.env.BASE_HOST}/transport/${this.transport.id}`;
			return encodeURIComponent(text);
		},
	},
	methods: {
		...mapActions('locations', {
			addToFavorite: 'addToFavorite',
			deleteFromFavorite: 'deleteFromFavorite',
		}),
		openInfoModal() {
			this.$loadModal('LocationInfoModal', {info: this.location.properties, isFull: true, lock: true});
		},
		async onClickAdd() {
			if (this.$auth.loggedIn) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(async () => {
					this.isFavorite = true;
					await this.addToFavorite(this.transport.t_id).then(() => {
						this.$snotify.success('Добавлено в избранное');
					}).catch(() => {
						this.isFavorite = false;
					});
				}, 300);
			} else {
				this.$loadModal('AuthCheckModal', {
					isSmall: true,
					isBottom: true,
					title: 'Добавить в избранное',
					subTitle: 'Только зарегистрированные пользователи могут добавлять транспорт в избранное.',
				});
			}
		},
		async onClickDelete() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(async () => {
				this.isFavorite = false;
				await this.deleteFromFavorite(this.transport.t_id).then(() => {
					this.$snotify.success('Удалено из избранного');
				}).catch(() => {
				});
			}, 300);
		},
		onShareClick() {
			this.$loadModal('SocialShareModal', {
				isSmall: true,
				isBottom: true,
			})
		},
		onShareMobClick() {
			if (navigator.share) {
				navigator.share({
					title: this.transport.seo_title || this.transport.title,
					text: this.transport.seo_description || void(0),
					url: window.location.href
				}).then(() => {
				}).catch(err => {
					console.log(err);
				});
			}
		},
		onRentClick() {
			this.$loadModal('RentRequestModal', {
				transportID: this.transport.t_id,
				theme: this.supportThemes['9'],
				type: 'transport',
				isFull: true,
				lock: true
			});
		},
		async onCopyClick() {
			const res = await this.$copyData(this.$refs.idInput);
			if (res) {
				this.$snotify.success('Скопировано');
			} else {
				this.$snotify.error('Ошибка');
			}
		},
		async onScroll() {
			const buttons = this.$refs.buttons;
			if (buttons) {
				const buttonsOffset = buttons.getBoundingClientRect().top;
				if (buttonsOffset < 0) {
					document.querySelector('.floatBox').classList.add('show');
				} else {
					document.querySelector('.floatBox').classList.remove('show');
				}
			}
		},
	},
	directives: {},
	filters: {},
	watch: {},
	mounted() {
		if (!process.browser) return;
		if (window.innerWidth < 640) {
			window.addEventListener('scroll', this.onScroll);
		}
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll);
	}
}
</script>
