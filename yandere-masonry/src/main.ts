import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import masonry from 'vue-next-masonry'
import { loadFonts } from './plugins/webfontloader'
import App from './App.vue'

loadFonts()

const app = createApp(App)
app.use(vuetify)
app.use(masonry)
app.mount('#app')
