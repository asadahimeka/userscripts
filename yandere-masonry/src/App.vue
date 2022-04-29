<template>
  <v-app :theme="store.theme">
    <AppBar />
    <NavDrawer />
    <v-main app>
      <AppContainer />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import AppBar from './components/AppBar.vue'
import NavDrawer from './components/NavDrawer.vue'
import AppContainer from './components/AppContainer.vue'
import store from './common/store'
import { onMounted } from '@vue/composition-api'
import { useVuetify } from './plugins/vuetify'

const vuetify = useVuetify()
const changeTheme = () => {
  const mode = localStorage.getItem('darken-mode')
  vuetify.theme.dark = mode === 'dark'
}

onMounted(() => {
  changeTheme()
  window.addEventListener('storage', () => { changeTheme() })
})
</script>
