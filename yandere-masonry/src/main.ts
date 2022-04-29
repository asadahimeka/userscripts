import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueMasonry from 'vue-masonry-css'
import vuetify from './plugins/vuetify'
import App from './App.vue'

Vue.use(VueCompositionAPI)
Vue.use(VueMasonry)

const app = new Vue({
  vuetify,
  render: h => h(App),
})

app.$mount('#app')
