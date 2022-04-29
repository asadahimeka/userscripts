// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import { getCurrentInstance } from '@vue/composition-api'
import { loadFonts } from './webfontloader'

loadFonts()
Vue.use(Vuetify)

export default new Vuetify({})

/** Get vuetify instance (For Composition api) */
export function useVuetify() {
  /** Get Instance */
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('Should be used in setup().')
  }
  return instance.proxy.$vuetify
}
