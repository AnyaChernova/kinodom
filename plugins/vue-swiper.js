import Vue from "vue";
import { Swiper as SwiperClass, Thumbs, Lazy, Navigation, Pagination } from 'swiper/js/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
SwiperClass.use([Thumbs, Lazy, Navigation, Pagination])
Vue.use(getAwesomeSwiper(SwiperClass));
