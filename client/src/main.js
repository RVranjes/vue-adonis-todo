import 'vuetify/dist/vuetify.min.css';

import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(Vuetify);
sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render(h) { return h(App); },
}).$mount('#app');
