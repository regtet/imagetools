import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://175.27.228.178:3434/api/private/v1/'
axios.interceptors.request.use(config => {
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token');
    // 在最后必须return 
    return config
})
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')