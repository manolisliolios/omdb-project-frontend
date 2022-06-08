import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue} from "bootstrap-vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from "vue-axios";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import {faUser} from "@fortawesome/free-regular-svg-icons";
import '@/assets/styles/globals/_boostrap.scss';
import Notifications from 'vue-notification'

Vue.config.productionTip = false

library.add(faUser);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
Vue.use(Notifications)

Vue.use(VueAxios, axiosInstance);

new Vue({
  render: h => h(App),
  store: store,
  router: router,
}).$mount('#app')
