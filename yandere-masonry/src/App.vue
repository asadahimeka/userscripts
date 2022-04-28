<template>
  <v-app>
    <AppBar />
    <NavDrawer />
    <v-main>
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
</script>
