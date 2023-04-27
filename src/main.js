import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/iconfont/iconfont.css'
import router from './router/index.js'
import store from './store/store';


Vue.config.productionTip = false
Vue.use(ElementUI)
//时间转换
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // return `${y}.${m}.${d} ${hh}:${mm}:${ss}`
  return `${y}-${m}-${d}`
  })
  Vue.filter('playvolume',function(arg){
    if(!arg) {
      arg = ""
    } else {    
    if(arg.toString().length>=13){
      // return arg/1000000000000+"万亿"
      const volume= arg/1000000000000
      const realVal = parseFloat(volume).toFixed(0);
      return realVal+"万亿"
      
    }else if(arg.toString().length>=9){
      const volume= arg/100000000
      const realVal = parseFloat(volume).toFixed(0);
      return realVal+"亿"
    }else if(arg.toString().length>=4){
      const volume= arg/10000
      const realVal = parseFloat(volume).toFixed(0);
      return realVal+"万"
    }
    } 
  }
)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
