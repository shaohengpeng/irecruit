import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'


Vue.prototype.$http=axios

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false

axios.interceptors.request.use(
  config =>{
    // const contenttype = "content-type";
    // config.headers.contenttype = "application/x-www-form-urlencoded;charset=utf-8";
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error =>{
    return Promise.reject(error);
  }
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
