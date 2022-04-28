<template>
  <v-dialog
    v-model="showImageSelected" :width="imageSelectedWidth" :height="imageSelectedHeight"
    :overlay-opacity="0.7"
  >
    <v-img
      v-if="showImageSelected" :src="imageSelected.sampleUrl ?? void 0"
      :lazy-src="imageSelected.previewUrl ?? void 0" @click="showImageInfo = !showImageInfo;"
    >
      <v-toolbar v-show="showImageInfo" flat color="transparent">
        <v-chip-group class="hidden-sm-and-down" column>
          <v-chip
            v-for="tag in imageSelected.tags" :key="tag" class="mr-1" small
            color="#ee8888" text-color="#ffffff"
            @click.stop="toTagsPage(tag)" v-text="tag"
          />
        </v-chip-group>
        <v-spacer />
        <v-btn icon color="#ee8888" @click.stop="toDetailPage">
          <v-icon>mdi-link-variant</v-icon>
          <v-tooltip activator="parent" anchor="bottom">
            {{ '详情 ' + imageSelected.postView }}
          </v-tooltip>
        </v-btn>
        <v-btn icon color="#ee8888" @click.stop="toSourcePage">
          <v-icon>mdi-launch</v-icon>
          <v-tooltip activator="parent" anchor="bottom">
            {{ '来源 ' + imageSelected.sourceUrl }}
          </v-tooltip>
        </v-btn>
        <v-btn icon color="#ee8888">
          <v-icon>mdi-download</v-icon>
          <v-menu dense open-on-hover offset-y activator="parent">
            <v-list dense flat>
              <v-list-item two-line link dense>
                <v-list-item-header @click.stop="download(imageSelected.sampleUrl, imageSelected.sampleDownloadName)">
                  <v-list-item-title>下载缩略图</v-list-item-title>
                  <v-list-item-subtitle v-text="imageSelected.sampleDownloadText" />
                </v-list-item-header>
              </v-list-item>
              <v-list-item v-if="imageSelected.jpegSize !== 0" two-line link dense>
                <v-list-item-header @click.stop="download(imageSelected.jpegUrl, imageSelected.jpegDownloadName)">
                  <v-list-item-title>下载高清图</v-list-item-title>
                  <v-list-item-subtitle v-text="imageSelected.jpegDownloadText" />
                </v-list-item-header>
              </v-list-item>
              <v-list-item two-line link dense>
                <v-list-item-header @click.stop="download(imageSelected.fileUrl, imageSelected.fileDownloadName)">
                  <v-list-item-title>下载原文件</v-list-item-title>
                  <v-list-item-subtitle v-text="imageSelected.fileDownloadText" />
                </v-list-item-header>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn icon color="#ee8888" @click.stop="close">
          <v-icon>mdi-close</v-icon>
          <v-tooltip activator="parent" anchor="bottom">
            关闭
          </v-tooltip>
        </v-btn>
      </v-toolbar>
    </v-img>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import store from '@/common/store'
import { downloadFile, isURL } from '@/common/utils'

const showImageInfo = ref(false)
const innerWidth = ref(window.innerWidth)
const innerHeight = ref(window.innerHeight)

const showImageSelected = computed(() => store.showImageSelected)
const imageSelected = computed(() => store.imageList[store.imageSelectedIndex] || {})

const imageSelectedWidth = computed(() => {
  const width = Number.parseInt(
    Math.min(
      innerWidth.value * 0.9,
      imageSelected.value.sampleWidth ?? innerWidth.value
    ).toString()
  )
  const height = Math.min(innerHeight.value * 0.9, imageSelected.value.sampleHeight ?? innerHeight.value)
  const width2 = Number.parseInt((height * imageSelected.value.aspectRatio).toString())
  return Math.min(width, width2)
})

const imageSelectedHeight = computed(() => {
  const width = Math.min(innerWidth.value * 0.9, imageSelected.value.sampleWidth ?? innerWidth.value)
  const height = Number.parseInt(
    Math.min(
      innerHeight.value * 0.9,
      imageSelected.value.sampleHeight ?? innerHeight.value
    ).toString()
  )
  const height2 = Number.parseInt((width / imageSelected.value.aspectRatio).toString())
  return Math.min(height, height2)
})

const toTagsPage = (tag: string) => {
  const { domain } = imageSelected.value.booru
  const notKY = ['konachan', 'yande'].every(e => !domain.includes(e))
  if (notKY) return
  window.open(`https://${domain}/post?tags=${tag}`, '_blank', 'noreferrer')
}

const toDetailPage = () => {
  window.open(imageSelected.value.postView, '_blank', 'noreferrer')
}

const toSourcePage = () => {
  const { sourceUrl } = imageSelected.value
  if (!isURL(sourceUrl)) return
  window.open(sourceUrl, '_blank', 'noreferrer')
}

const download = (url: string, name: string) => {
  downloadFile(url, name)
}

const close = () => {
  store.showImageSelected = false
}

onMounted(() => {
  window.addEventListener('resize', () => {
    innerWidth.value = window.innerWidth
    innerHeight.value = window.innerHeight
  })
})
</script>
