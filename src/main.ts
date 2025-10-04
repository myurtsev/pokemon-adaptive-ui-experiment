import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './routes'
import './index.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory('/pokemon-adaptive-ui-experiment/'),
  routes: routes,
})

app.use(createPinia())
app.use(router)
app.mount('#app')
