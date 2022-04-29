<template>
  <v-navigation-drawer v-model="store.showDrawer" app temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Yande.re
        </v-list-item-title>
        <v-list-item-subtitle>Rating Safe</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            About
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink">
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-github</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Fork from</v-list-item-title>
          <v-list-item-subtitle>yande-re-chinese-patch</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import store from '@/common/store'

const openLink = () => {
  window.open('https://github.com/coderzhaoziwei/yande-re-chinese-patch', '_blank', 'noreferrer')
}
</script>
