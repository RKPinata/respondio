import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Unicon from 'vue-unicons'
import { uniBoltAlt, uniCommentAltLines, uniMessage, uniCalendarAlt } from 'vue-unicons/dist/icons'

Unicon.add([uniBoltAlt, uniCommentAltLines, uniMessage, uniCalendarAlt])

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Unicon)

app.mount('#app')
