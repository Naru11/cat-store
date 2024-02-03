
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives/index'
import '@/styles/common.scss'
import { componentPlugin } from './components/index'

const app = createApp(App)




app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


