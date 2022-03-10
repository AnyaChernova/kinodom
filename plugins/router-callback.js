import {viewerEventBus} from '@/plugins/vue-loadModal/index'

export default function ({app}) {
	app.router.beforeEach((to, from, next) => {
		if (from.path !== to.path) {
			viewerEventBus.emit('routChange');
		}
		next();
	})
}
