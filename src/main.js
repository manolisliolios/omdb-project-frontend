import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue} from "bootstrap-vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from "vue-axios";
import '@/assets/styles/globals/_boostrap.scss';
import Notifications from 'vue-notification'
import {setupAxiosInterceptors} from './store/interceptors';
Vue.config.productionTip = false

Vue.use(BootstrapVue);

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

setupAxiosInterceptors(store, router, axiosInstance);

Vue.use(Notifications)

Vue.use(VueAxios, axiosInstance);

new Vue({
  render: h => h(App),
  store: store,
  router: router,
  created(){
    store.dispatch('init');
  }
}).$mount('#app')
