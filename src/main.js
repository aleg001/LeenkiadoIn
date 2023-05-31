import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store.js'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './index.css'

import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(router)
app.use(vuetify)
app.use(store)
app.mount('#app')
