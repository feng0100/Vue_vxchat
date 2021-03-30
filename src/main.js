import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('ws://127.0.0.1:3000'),  // 连接后端地址
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,

}).$mount('#app')

