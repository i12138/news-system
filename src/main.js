import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import elementIcon from "./plugins/icons";
import axios from "axios"
import request from '@/utils/request.js'
import locale from "element-plus/es/locale/lang/zh-cn"
const app = createApp(App)
app.use(elementIcon)
app.config.globalProperties.$axios = axios
app.config.globalProperties.request = request
app.use(router)
app.use(ElementPlus, { locale })
app.mount('#app')
