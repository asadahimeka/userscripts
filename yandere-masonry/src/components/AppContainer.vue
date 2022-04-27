<template>
  <v-container class="app-container pa-2" fluid>
    <masonry :cols="columnCount" gutter="8px">
      <v-card v-for="(image, index) in store.imageList" :key="index" class="mb-2">
        <v-img
          transition="scroll-y-transition"
          :src="image.previewUrl"
          :aspect-ratio="image.aspectRatio"
          @click="showImgModal(index)"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="#ee8888" />
            </v-row>
          </template>
        </v-img>
      </v-card>
    </masonry>
    <div class="d-flex justify-center">
      <v-btn v-show="showNoMore" color="#ee8888" text>
        下面没有了...
      </v-btn>
    </div>
    <v-fab-transition>
      <v-btn
        v-show="store.showFab"
        fab
        dark
        fixed
        bottom
        right
        color="pink"
        @click="refresh"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import store from '@/common/store'

const columnCount = {
  300: 1,
  600: 2,
  900: 3,
  1200: 4,
  1600: 5,
  1920: 6,
  2400: 7,
  2700: 8,
  3000: 9,
  default: 6
}

const showNoMore = computed(() => !store.requestState && store.requestStop)

const showImgModal = (index: number) => {
  store.imageSelectedIndex = index
  store.showImageSelected = true
}
const refresh = () => {
  //
}
</script>
