import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import axios from "./util/http";
import router from "./router";
import VueParticles from 'vue-particles'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$https = axios
app.use(VueParticles).use(store).use(router).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')
