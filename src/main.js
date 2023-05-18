import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/styles.scss'
import 'bootstrap'

import ProformajsVue from '@openclinical/proformajs-vue3-perform'

const vueApp = createApp(App)

vueApp.use(ProformajsVue)
vueApp.use(createPinia())

vueApp.mount('#app')