export const state = () => ({
	env: {},
	professions: [],
	regions: [],
	filterParams: [],
	mainInfo: null,
	searchState: 'close',
	categories: {
		'0': {
			id: '0',
			title: 'Локация',
			icon: 'search_icon_location'
		},
		'1': {
			id: '1',
			title: 'Транспорт поддержки',
			icon: 'search_icon_autoSupport'
		},
	},
	supportThemes: {
		'0': {
			theme_id: 0,
			theme: 'Вопрос по работе сервиса'
		},
		'1': {
			theme_id: 1,
			theme: 'Ошибка на сайте'
		},
		'2': {
			theme_id: 2,
			theme: 'Сотрудничество'
		},
		'3': {
			theme_id: 3,
			theme: 'Вопрос по аренде'
		},
		'4': {
			theme_id: 4,
			theme: 'Размещение локации'
		},
		'5': {
			theme_id: 5,
			theme: 'Запрос на поиск локации'
		},
		'6': {
			theme_id: 6,
			theme: 'Запрос на аренду'
		},
		'7': {
			theme_id: 7,
			theme: 'Размещение транспорта'
		},
		'8': {
			theme_id: 8,
			theme: 'Запрос на поиск транспорта'
		},
		'9': {
			theme_id: 9,
			theme: 'Запрос на аренду транспорта'
		},
	},
	locationsStatus: {
		'0': {
			statusColor: '',
			title: 'Свободные',
			emptyError: 'У вас пока нет ни одной свободной локации'
		},
		'1': {
			statusColor: 'success',
			title: 'В аренде',
			emptyError: 'У вас пока нет ни одной арендуемой локации'
		},
		'2': {
			statusColor: 'accent',
			title: 'На модерации',
			emptyError: 'У вас пока нет ни одной локации на модерации'
		},
		'3': {
			statusColor: 'gray',
			title: 'Архив',
			emptyError: 'У вас пока нет ни одной архивной локации'
		},
		'4': {
			statusColor: 'gray',
			title: 'Архив',
			emptyError: 'У вас пока нет ни одной архивной локации'
		},
		'from_archive': {
			statusColor: 'ok',
			title: 'Восстановление',
		},
		'to_archive': {
			statusColor: 'danger',
			title: 'Архивируется',
		},
	},
	ordersStatus: {
		'0': {
			title: 'В аренде',
			statusTitle: 'В аренде',
			statusColor: '',
			emptyError: 'У вас пока нет текущих съемок'
		},
		'1': {
			title: 'Запланировано',
			statusTitle: 'Запланирована',
			statusColor: 'accent',
			emptyError: 'У вас пока нет запланированных съемок'
		},
		'2': {
			title: 'Завершено',
			statusTitle: 'Завершена',
			statusColor: 'success',
			emptyError: 'У вас пока нет завершенных съемок'
		},
		'3': {
			title: 'Отменено',
			statusTitle: 'Отменена',
			statusColor: 'black',
			emptyError: 'У вас пока нет отмененных съемок'
		},
	},
	priceTypes: [
		{
			id: 0,
			type: '₽'
		},
		{
			id: 1,
			type: '₽₽'
		},
		{
			id: 2,
			type: '₽₽₽'
		},
		{
			id: 3,
			type: '₽₽₽₽'
		},
	],
	colors: [
		{
			color: '#ffffff',
			title: 'Белый'
		},
		{
			color: 'linear-gradient(to bottom, #a3a3a3 0, #ebebeb 100%)',
			title: 'Серебряный',
		},
		{
			color: '#a3a3a3',
			title: 'Серый'
		},
		{
			color: '#974b00',
			title: 'Коричневый'
		},
		{
			color: 'linear-gradient(to bottom, #fdb226 0, #ffeb78 100%)',
			title: 'Золотой'
		},
		{
			color: '#f1ddba',
			title: 'Бежевый'
		},
		{
			color: '#fe0002',
			title: 'Красный'
		},
		{
			color: '#8c0033',
			title: 'Бордовый'
		},
		{
			color: '#ff7906',
			title: 'Оранжевый'
		},
		{
			color: '#ff7906',
			title: 'Оранжевый'
		},
		{
			color: '#ffeb78',
			title: 'Жёлтый'
		},
		{
			color: '#28b26f',
			title: 'Зелёный'
		},
		{
			color: '#78c5f3',
			title: 'Голубой'
		},
		{
			color: '#3144b6',
			title: 'Синий'
		},
		{
			color: '#7f00ff',
			title: 'Фиолетовый'
		},
		{
			color: '#c400aa',
			title: 'Пурпурный'
		},
		{
			color: '#ffcada',
			title: 'Розовый'
		},
	]
});

export const getters = {
	isOwner(state) {
		return (state.auth.user && +state.auth.user.role === 0);
	},
	isRenter(state) {
		return (state.auth.user && +state.auth.user.role === 1);
	},
};

export const mutations = {
	SET_ENV(state, value) {
		state.env = value
	},
	SET_PROFESSIONS(state, value) {
		state.professions = value;
	},
	SET_REGIONS(state, value) {
		state.regions = value;
	},
	SET_FILTER_PARAMS(state, value) {
		state.filterParams = value;
	},
	SET_MAIN_INFO(state, value) {
		state.mainInfo = value;
	},
	SET_SEARCH_STATE(state, value) {
		state.searchState = value;
	},
};

export const actions = {
	async fetchProfessions({commit}) {
		const professions = await this.$repositories.common.professions().then((res) => {
			return res.data || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_PROFESSIONS', professions);
	},
	async fetchRegions({commit}) {
		const regions = await this.$repositories.common.regions().then((res) => {
			return res.data.regions || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_REGIONS', regions);
	},
	async fetchFilterParams({commit}) {
		const regions = await this.$repositories.search.filterParams().then((res) => {
			return res.data.params || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_FILTER_PARAMS', regions);
	},
	async fetchMainInfo({commit}) {
		const info = await this.$repositories.common.info().then((res) => {
			return res.data || [];
		}).catch((res) => {
			console.dir(res);
			return [];
		});
		commit('SET_MAIN_INFO', info);
	},
	async nuxtServerInit({commit, dispatch}) {
		await dispatch('fetchProfessions');
		await dispatch('fetchRegions');
		commit('SET_ENV', {
			API_WEB_URL: process.env.API_WEB_URL,
			BASE_HOST: process.env.BASE_HOST,
			VK_CLIENT_ID: process.env.VK_CLIENT_ID,
			FB_CLIENT_ID: process.env.FB_CLIENT_ID,
			GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
			APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
		});
	},
	nuxtClientInit({dispatch}) {
		dispatch('fetchFilterParams');
		dispatch('locations/fetchLocationTypes');
		dispatch('locations/fetchLocationStyles');
		dispatch('locations/fetchLocationTags');
		dispatch('transport/fetchTransportTypes');
		dispatch('transport/fetchTransportStyles');
		dispatch('transport/fetchTransportTags');
	}
};
