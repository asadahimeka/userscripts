<template>
  <v-container :ref="vcont" class="pa-2" fluid>
    <masonry :cols="columnCount" gutter="8px">
      <v-card v-for="(image, index) in store.imageList" :key="index" class="mb-2">
        <v-img
          transition="scroll-y-transition"
          :src="image.previewUrl ?? void 0"
          :aspect-ratio="image.aspectRatio"
          @click="showImgModal(index)"
          @click.middle="openDetail(image)"
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
    <image-detail />
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@vue/composition-api'
import { isReachBottom, searchBooru, throttleScroll } from '@/common/utils'
import { useVuetify } from '@/plugins/vuetify'
import store from '@/common/store'
import ImageDetail from './ImageDetail.vue'
import type Post from 'booru/dist/structures/Post'

const columnCount = ref({
  300: 1,
  600: 2,
  900: 3,
  1200: 4,
  1600: 6,
  1920: 7,
  2400: 8,
  2700: 9,
  3000: 10,
  default: 6
})

const showNoMore = computed(() => !store.requestState && store.requestStop)

const showImgModal = (index: number) => {
  store.imageSelectedIndex = index
  store.showImageSelected = true
}

const openDetail = (img: Post) => {
  window.open(img.postView, '_blank', 'noreferrer')
}

const params = new URLSearchParams(location.search)
let page = +(params.get('page') ?? 1)
const fetchData = async (refresh?: boolean) => {
  if (refresh) page = 1
  store.requestState = true
  try {
    const results = await searchBooru(location.host, page, params.get('tags') ?? '')
    if (Array.isArray(results) && results.length > 0) {
      store.imageList = refresh ? results : [...store.imageList, ...results]
      page++
    } else {
      store.requestStop = true
    }
  } catch (error) {
    console.log('fetch error: ' + error)
  } finally {
    store.requestState = false
  }
}

// eslint-disable-next-line unicorn/no-null,@typescript-eslint/no-explicit-any
const vcont = ref<any>(null)
const calcFetchTimes = () => {
  const cnth = vcont.value?.clientHeight
  const doch = document.documentElement.clientHeight
  return cnth ? Math.ceil(doch / cnth) : 1
}

const initData = async (refresh?: boolean) => {
  await fetchData(refresh)
  const times = calcFetchTimes()
  for (let index = 0; index < times; index++) {
    await fetchData()
  }
}

const vuetify = useVuetify()
const refresh = () => {
  vuetify.goTo(0)
  initData(true)
}

onMounted(async () => {
  await initData()
  window.addEventListener('scroll', throttleScroll(scroll => {
    if (!store.showFab && scroll > 200) store.showFab = true
    if (store.requestStop) return
    if (store.requestState) return
    isReachBottom() && fetchData()
  }, () => {
    if (store.showFab) store.showFab = false
  }))
})
</script>
