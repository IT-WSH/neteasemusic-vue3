import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/css/animate.min.css'
import '@/common/css/flex.css'
const app = createApp(App)
app
  .use(store)
  .use(router)
  .mount('#app')
