import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'


Vue.config.productionTip = false
axios.defaults.baseURL = "http://192.168.1.188:12";
Vue.use(ElementUI)
Vue.use(VueAxios, axios)


axios.interceptors.request.use(
  function (config) {
    // 拦截每次请求,携带token
    config.headers.Authorization = sessionStorage.getItem('token')

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(response => {
  // NProgress.done() 
  return response
}, error => {
  //获取状态码
  const {status} = error.response;

  if(status === 401) {
     console.log(error)
      //清除token
      sessionStorage.removeItem('token');
      //重新登录
      router.push('/login')
  }

  return Promise.reject(error)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
