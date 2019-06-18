import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from './stores/index'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
//全局过上啦刷新组件
import scroller from '@/components/scroller'
Vue.component("scroller",scroller);
//全局加载组件
import loading from '@/components/loading'
Vue.component("loading",loading)
//全局过滤
Vue.filter("setWh",(url,arg)=>{
   return url.replace(/w\.h/,arg);
});

Vue.use(MintUI)

Vue.use(VueAxios,axios);
Vue.config.productionTip = false;
/*
FastClick.prototype.onTouchStart = function (event) {

  let e = event || window.event
  e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数
  e.cancelBubble = true
}
FastClick.prototype.onTouchMove = function (event) {

  let e = event || window.event
  e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数
  e.cancelBubble = true
}
FastClick.prototype.onTouchEnd = function (event) {

  let e = event || window.event
  e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数
  e.cancelBubble = true
}*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
