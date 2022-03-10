import {resolve} from 'path';

const globSassLoader = {
	test: /\.scss/,
	enforce: "pre",
	loader: "import-glob-loader",
};
const isProd = process.env.NODE_ENV === 'production';

export default {
	ssr: true,
	telemetry: false,
	modern: isProd,
	head: {
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
		],
		link: [
			{
				rel: 'preload',
				as: 'font',
				crossorigin: 'anonymous',
				type: 'font/woff2',
				href: '/fonts//MuseoSansCyrl-500.woff2',
			},
			{
				rel: 'preload',
				as: 'font',
				crossorigin: 'anonymous',
				type: 'font/woff2',
				href: '/fonts//MuseoSansCyrl-700.woff2',
			},
			{
				rel: 'preload',
				as: 'font',
				crossorigin: 'anonymous',
				type: 'font/woff2',
				href: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu5mxKOzY.woff2'
			},
			{
				rel: 'preload',
				as: 'font',
				crossorigin: 'anonymous',
				type: 'font/woff2',
				href: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fABc4EsA.woff2'
			},
			{
				rel: 'preload',
				as: 'image',
				type: 'image/webp',
				href: '/img/intro.webp',
				media: '(min-width:381px)'
			},
			{
				rel: 'preload',
				as: 'image',
				type: 'image/webp',
				href: '/img/intro-mob.webp',
				media: '(max-width:380px)'
			},
		],
	},
	server: {
		host: process.env.NUXT_SERVER_HOST, // default: localhost,
		port: process.env.NUXT_SERVER_PORT, // default: 3000
	},
	serverMiddleware: [
		{path: '/proxy', handler: '~/serverMiddleware/proxy.js'}
	],
	env: {
		NODE_ENV: process.env.NODE_ENV,
		GA_ID: process.env.GA_ID,
		FB_ID: process.env.FB_ID,
		YA_COUNTER_ID: process.env.YA_COUNTER_ID,
	},
	publicRuntimeConfig: {
		app_env: {
			GA_ID: process.env.GA_ID,
			FB_ID: process.env.FB_ID,
			YA_COUNTER_ID: process.env.YA_COUNTER_ID,
		},
	},
	loading: {color: '#00E1F0', throttle: 500},
	css: [
		'@/assets/scss/style.scss',
	],
	router: {
		linkActiveClass: 'active',
		linkExactActiveClass: 'activeExact',
	},
	render: {
		resourceHints: true,
	},
	components: false,
	plugins: [
		{src: '~/plugins/date-fns.js'},
		{src: '~/plugins/config-axios.js'},
		{src: '~/plugins/vue-svg.js'},
		{src: '~/plugins/vue-material.js'},
		{src: '~/plugins/vue-snotify.js'},
		{src: '~/plugins/vue-scrollBox.js', mode: 'client'},
		{src: '~/plugins/scroll-control', mode: 'client'},
		{src: '~/plugins/vue-focus.js', mode: 'client'},
		{src: '~/plugins/vue-loadModal/index.js', mode: 'client'},
		{src: '~/plugins/utils.js'},
		{src: '~/plugins/router-callback.js'},
		{src: '~/plugins/dropdown', mode: 'client'},
		{src: '~/plugins/dropdown/ssr.js', mode: 'server'},
		{src: '~/plugins/range-slider.js', mode: 'client'},
		{src: '~/plugins/repositories.js'},
		{src: '~/plugins/vue-draggable.js', mode: 'client'},
		{src: '~/plugins/vue-swiper.js', mode: 'client'},
		{src: '~/plugins/nuxt-client-init.js', mode: 'client'},
		{src: '~/plugins/ya-metric.js', mode: 'client'},
		{src: '~/plugins/ga-metric.js', mode: 'client'},
	],
	buildModules: [
		'@nuxtjs/pwa',
		'nuxt-purgecss',
	],
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		'@nuxtjs/svg-sprite',
		'portal-vue/nuxt',
		['nuxt-lazy-load', {
			directiveOnly: true
		},
		]
	],
	pwa: {
		meta: {
			ogTitle: false,
			ogDescription: false,
			ogSiteName : false,
			author: false,
			lang: 'ru',
			theme_color: '#00CAD7',
		},
		workbox: {
			cleanupOutdatedCaches: true,
		},
		icon: {
			fileName: 'icon.png'
		}
	},
	axios: {
		baseURL: process.env.API_WEB_URL,
		proxyHeaders: false,
		retry: false,
	},
	auth: {
		localStorage: false,
		plugins: [
			{src: '~/plugins/auth-callback.js', mode: 'client'},
		],
		cookie: {
			prefix: "auth",
			options: {
				domain: process.env.BASE_DOMAIN,
				expires: 300,
			}
		},
		redirect: {
			login: '/',
			logout: '/',
			home: false,
		},
		resetOnError: true,
		rewriteRedirects: true,
		fullPathRedirect: true,
		strategies: {
			localAuth: {
				_scheme: 'local',
				tokenType: 'Bearer',
				endpoints: {
					login: {url: '/api/v1/login', method: 'post', propertyName: 'token'},
					logout: {url: '/api/v1/logout', method: 'post'},
					user: {
						url: '/api/v1/profile/info',
						method: 'get',
						propertyName: 'profile',
					},
				},
			},
			registerAuth: {
				_scheme: 'local',
				tokenType: 'Bearer',
				endpoints: {
					login: {url: '/api/v1/register', method: 'post', propertyName: 'token'},
					logout: {url: '/api/v1/logout', method: 'post'},
					user: {
						url: '/api/v1/profile/info',
						method: 'get',
						propertyName: 'profile',
					},
				},
			},
			vkontakte: {
				_scheme: 'local',
				tokenType: 'Bearer',
				endpoints: {
					login: {url: '/login/vkontakte/callback', method: 'get', propertyName: 'token'},
					logout: {url: '/api/v1/logout', method: 'post'},
					user: {
						url: '/api/v1/profile/info',
						method: 'get',
						propertyName: 'profile',
					},
				},
			},
			facebook: {
				_scheme: 'local',
				tokenType: 'Bearer',
				endpoints: {
					login: {url: '/login/facebook/callback', method: 'get', propertyName: 'token'},
					logout: {url: '/api/v1/logout', method: 'post'},
					user: {
						url: '/api/v1/profile/info',
						method: 'get',
						propertyName: 'profile',
					},
				},
			},
			google: {
				_scheme: 'local',
				tokenType: 'Bearer',
				endpoints: {
					login: {url: '/login/google/callback', method: 'get', propertyName: 'token'},
					logout: {url: '/api/v1/logout', method: 'post'},
					user: {
						url: '/api/v1/profile/info',
						method: 'get',
						propertyName: 'profile',
					},
				},
			},
		}
	},
	purgeCSS: {
		mode: 'webpack',
		paths: [
			'modals/**/*.vue',
			'viewers/**/*.vue',
			'plugins/**/*.vue',
		],
		whitelistPatternsChildren: [
			/--/,
		],
	},
	build: {
		extractCSS: isProd,
		extend(config, ctx) {
			config.module.rules.push(globSassLoader);
		}
	}
}
