<template>
	<div class="_AboutPage">
		<div class="intro intro--about box">
			<img src="/img/about.jpg" alt="about pic" class="intro__img">
			<img src="/img/camera.png" alt="camera pic" class="intro__decor m:hidden">
			<div class="layout">
				<div class="breadcrumbs">
					<nuxt-link to="/" class="link">Главная</nuxt-link>
				</div>
				<h1 class="title intro__content">Сервис для поиска локаций под фото- и&nbsp;видеосъемки</h1>
				<div class="btnRow btnRow--l">
					<a href="https://apps.apple.com/ru/app/kinodom/id1559942525" target="_blank" class="link"><img src="/svg/appstore.svg" alt="appstore" width="162" height="48"></a>
					<a href="https://play.google.com/store/apps/details?id=ru.kinodom.app" target="_blank" class="link"><img src="/svg/googleplay.svg" alt="googleplay" width="162" height="48"></a>
				</div>
				<div class="cells cells--stretch --gap">
					<div class="cell w-6/12 m:w-12/12">
						<div class="box box--plate box--intro" style="background-image: url('/img/app.jpg');">
							<div class="box__inner">
								<h3 class="title-m text-white">Найдите прямо <br class="hidden-from-s"> сейчас объект на <br
									class="hidden-from-s"> нашем сайте</h3>
							</div>
							<nuxt-link to="/" class="btn box__footer">Каталог локаций</nuxt-link>
						</div>
					</div>
					<div class="cell w-6/12 m:w-12/12">
						<div class="box box--plate box--intro" style="background-image: url('/img/manager.jpg');">
							<div class="box__inner">
								<h3 class="title-m">Оставьте заявку и локейшн-менеджер индивидуально подберет объект</h3>
							</div>
							<nuxt-link to="/contacts" class="btn box__footer">Связаться</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="layout">
				<div class="cells cells--stretch --gap">
					<div class="cell w-4/12 l:w-6/12 s:w-12/12">
						<div class="borderBox">
							<h3 class="title-m">100% гарантируем удобство и&nbsp;реализацию всего, что необходимо съемочной
								группе.</h3>
						</div>
					</div>
					<div class="cell w-4/12 l:w-6/12 s:w-12/12">
						<div class="borderBox">
							<h3 class="title-m">Помощь при бронировании, опытные локейшн-менеджеры, администрация, возможность
								продления, клининг.</h3>
						</div>
					</div>
					<div class="cell w-4/12 l:w-6/12 s:w-12/12">
						<div class="borderBox">
							<h3 class="title-m">Мы&nbsp;несем полную юридическую ответственность за&nbsp;оказанные услуги: заключаем
								договор с&nbsp;ООО (УСН) и&nbsp;ИП.</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box pb-15">
			<div class="layout">
				<div class="cells --gap items-center">
					<div class="cell w-6/12 m:w-12/12">
						<div class="box box--s">
							<h2 class="title-l text-danger">Самая большая база объектов для съемок в&nbsp;Москве!</h2>
						</div>
						<div class="box box--s fz-18 text-dark">
							Квартиры, дома, офисы, гаражи, лофт и&nbsp;хай-тек пространства, заводы, подвалы, конюшни, ангары,
							автосервисы, фермы, и&nbsp;другие локации.
						</div>
						<div class="borderBox box box--s">
							<h3 class="title-m">Галерея пополняется ежедневно, проходя мощный контроль качества</h3>
						</div>
					</div>
					<div class="cell w-6/12 m:w-12/12 text-right m:text-center">
						<picture>
							<source media="(max-width:639px)" srcset="/img/app-man-mob.png 1x, /img/app-man-mob@2x.png 2x">
							<source media="(min-width:640px)" srcset="/img/app-man.png 1x, /img/app-man@2x.png 2x">
							<img src="/img/app-man.png" alt="kinodom app" class="mw-100">
						</picture>
					</div>
				</div>
			</div>
		</div>
		<div class="box box--back">
			<div class="layout">
				<div class="gridBox">
					<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location" width="369"
																					height="194"></div>
					<div class="gridBox__item"><img src="/img/location1.jpg" class="pic pic--full" alt="location" width="369"
																					height="404"></div>
					<div class="gridBox__item"><img src="/img/location1.jpg" class="pic pic--full" alt="location" width="369"
																					height="404"></div>
					<div class="gridBox__item"><img src="/img/location1.jpg" class="pic pic--full" alt="location" width="369"
																					height="404"></div>
					<div class="gridBox__item"><img src="/img/location1.jpg" class="pic pic--full" alt="location" width="369"
																					height="404"></div>
					<div class="gridBox__item"><img src="/img/location1.jpg" class="pic pic--full" alt="location" width="369"
																					height="404"></div>
					<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location" width="369"
																					height="194"></div>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="layout">
				<div class="cells --gap items-center">
					<div class="cell w-5/12 xl:w-6/12 m:hidden">
						<img src="/img/location2.jpg" alt="location" class="pic pic--full">
						<div class="gridBox-owners mt-m">
							<div class="gridBox__item"><img src="/img/location3.jpg" class="pic pic--full pic--sharp" alt="location">
							</div>
							<div class="gridBox__item"><img src="/img/location3.jpg" class="pic pic--full pic--sharp" alt="location">
							</div>
							<div class="gridBox__item"><img src="/img/location3.jpg" class="pic pic--full pic--sharp" alt="location">
							</div>
						</div>
					</div>
					<div class="cell w-1/12 xl:hidden"></div>
					<div class="cell w-6/12 m:w-12/12">
						<div class="box box--s">
							<h2 class="title-l">Только <br> проверенные <br> собственники</h2>
						</div>
						<div class="box box--s fz-18 text-dark">
							Все представленные площадки исключительно из&nbsp;первых рук.
						</div>
						<div class="box box--s">
							<div class="cells cells--stretch --gap-s">
								<div class="cell w-6/12 xl:w-12/12">
									<div class="borderBox borderBox--danger">
										<h2 class="title-m">Не платим посредникам</h2>
									</div>
								</div>
								<div class="cell w-6/12 xl:w-12/12">
									<div class="borderBox borderBox--danger">
										<h2 class="title-m">Контролируем весь процесс съемки</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box box--bg">
			<div class="layout">
				<div class="cells --gap-m items-center">
					<div class="cell w-6/12 l:w-12/12">
						<div class="box box--s">
							<h2 class="title-l text-white">Точное подробное описание объекта и&nbsp;актуальные фотографии</h2>
						</div>
						<div class="box box--s fz-18 text-white">Все представленные площадки исключительно из первых рук.</div>
						<div class="box box--s box--fix">
							<div class="cells --gap-phone">
								<div class="cell w-4/12">
									<img src="/img/phone.png" srcset="/img/phone@2x.png 2x" alt=""
											 class="pic pic--full pic--sharp pic--contain">
								</div>
								<div class="cell w-4/12">
									<img src="/img/phone.png" srcset="/img/phone@2x.png 2x" alt=""
											 class="pic pic--full pic--sharp pic--contain">
								</div>
								<div class="cell w-4/12">
									<img src="/img/phone.png" srcset="/img/phone@2x.png 2x" alt=""
											 class="pic pic--full pic--sharp pic--contain">
								</div>
							</div>
						</div>
					</div>
					<div class="cell w-6/12 l:w-12/12">
						<div class="gridBox-photo">
							<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location"
																							width="369" height="404"></div>
							<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location"
																							width="369" height="404"></div>
							<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location"
																							width="369" height="404"></div>
							<div class="gridBox__item"><img src="/img/location1.jpg" class="pic pic--full" alt="location" width="369"
																							height="404"></div>
							<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location"
																							width="369" height="404"></div>
							<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location"
																							width="369" height="194"></div>
							<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location"
																							width="369" height="194"></div>
							<div class="gridBox__item"><img src="/img/location1_line.jpg" class="pic pic--full" alt="location"
																							width="369" height="194"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="layout">
				<div class="cells --gap items-center">
					<div class="cell w-5/12 m:w-12/12">
						<div class="borderBox">
							<div class="title-m">
								Нужна советская дача? <br> Конюшня? <br>
								Или стильный лофт <br> с&nbsp;высокими потолками? <br>
								Мы&nbsp;уже провели тщательный отбор, осталось только выбрать!
							</div>
						</div>
					</div>
					<div class="cell w-1/12 m:hidden"></div>
					<div class="cell w-6/12 m:w-12/12">
						<div class="box box--s">
							<h2 class="title-l">Удобный поиск</h2>
						</div>
						<div class="box box--s fz-18 text-dark">Воспользуйтесь удобными разделами, поиском, хэштегами и функцией
							«подбор по
							параментрам».
						</div>
						<div class="box box--s box--fix">
							<div class="cells --gap-phone">
								<div class="cell w-4/12">
									<img src="/img/phone.png" srcset="/img/phone@2x.png 2x" alt=""
											 class="pic pic--full pic--sharp pic--contain">
								</div>
								<div class="cell w-4/12">
									<img src="/img/phone.png" srcset="/img/phone@2x.png 2x" alt=""
											 class="pic pic--full pic--sharp pic--contain">
								</div>
								<div class="cell w-4/12">
									<img src="/img/phone.png" srcset="/img/phone@2x.png 2x" alt=""
											 class="pic pic--full pic--sharp pic--contain">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box box--pic box--s">
			<img src="/img/motor.png" srcset="/img/motor@2x.png 2x" alt="" class="box__backPic">
			<div class="layout">
				<div class="cells --gap">
					<div class="cell w-4/12 s:hidden"></div>
					<div class="cell w-8/12 s:w-12/12">
						<h2 class="title-l text-brand">Наша команда старается, чтобы творческая группа была довольна, а&nbsp;каждый
							проект стал
							уникальным</h2>
					</div>
				</div>
			</div>
		</div>
		<div class="box box--s">
			<div class="layout">
				<div class="cells cells--stretch --gap-m">
					<div class="cell w-7/12 m:w-12/12">
						<div class="borderBox">
							<div class="box box--m fz-18 text-dark">Пришлите нам идею, концепт, сюжет или сценарий и&nbsp;мы&nbsp;подберем
								подходящие, и&nbsp;даже эксклюзивные объекты для съемок с&nbsp;учетом Ваших пожеланий.
							</div>
							<div class="box box--m">
								<a href="https://t.me/kinodom_rus" target="_blank" class="link d-flex items-center ml-m mb-20">
									<v-svg name="mail" w="24" h="24" class="mr-8"/>
									<span class="title-xs text-upper text-brand">@kinodom_rus</span>
								</a>
							</div>
						</div>
					</div>
					<div class="cell w-5/12 m:w-12/12">
						<div class="borderBox borderBox--bg">
							<div class="title-m text-white">Для постоянных заказчиков предоставляются хорошие скидки и&nbsp;бонусы!
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>


import seoCore from "~/utils/seoCore";

export default {
	name: "AboutPage",
	scrollToTop: true,
	layout: 'about',
	head() {
		return seoCore({
			title: 'О нас',
		}, this)
	},
	props: {},
	components: {},
	data() {
		return {}
	},
	async asyncData({app}) {
	},
	computed: {},
	methods: {},
	directives: {},
	filters: {},
	watch: {},
	created() {
	},
	mounted() {
	}
}
</script>
