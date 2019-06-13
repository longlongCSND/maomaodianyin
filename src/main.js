import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from './stores/index'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
//全局过滤
Vue.filter("setWh",(url,arg)=>{
   return url.replace(/w\.h/,arg);
});

Vue.use(MintUI)

Vue.use(VueAxios,axios);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
