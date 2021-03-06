import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import HelloWorld from "@/components/HelloWorld";
import Products from './components/Products'
import customers from './components/Customers'
import payment from  './components/Payment'
import orders from './components/Orders'
import axios from 'axios'
Vue.config.productionTip = false;
Vue.use(VueRouter);
const P_URL = "http://localhost:4300/";
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {name: 'land', path: '/', component: Products},
    {name: 'login',path: '/login', component: HelloWorld },
    {name: 'products', path: '/products', component: Products},
    {name: 'customers', path: '/customers', component: customers},
    {name: 'payment', path: '/payment', component: payment},
    {name: 'orders', path: '/orders', component: orders}
  ]
});
router.beforeEach((to, from, next) => {
  let authToken = localStorage.getItem("Token");
  axios.get(P_URL + 'check_token/' + authToken).then(response => {
    if (!response.data.status) {
      next ({name: "login"})
    } else {
      axios.defaults.headers['Authorization'] = authToken;
    }
  });
  next()
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
