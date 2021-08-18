import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from '@kyvg/vue3-notification'
import { Modal } from '@/components/molecules'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Notifications)
app.component('Modal', Modal)
app.mount('#app')
