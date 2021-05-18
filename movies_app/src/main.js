import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import store from './store';
import './plugins/bootstrap';

Vue.config.productionTip = false;
Vue.use(Router);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
