<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon @click="store.toggleDrawer" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn text color="#ffffff" disabled>
      Rating Safe
    </v-btn>
    <v-progress-linear
      :active="store.requestState"
      :height="6"
      color="deep-purple accent-4"
      indeterminate
      absolute
      bottom
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import store from '@/common/store'

const title = computed(() => store.imageList.length + ' Post')
</script>
