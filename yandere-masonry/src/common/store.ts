import { reactive } from 'vue'
import type Post from 'booru/dist/structures/Post'

interface AppState {
  theme: string
  requestState: boolean
  requestStop: boolean
  showImageSelected: boolean
  imageSelectedIndex: number
  showDrawer: boolean
  showFab: boolean
  imageList: Post[],
  toggleDrawer: () => void
}

const store = reactive<AppState>({
  theme: localStorage.getItem('darken-mode') ?? 'light',
  requestState: false,
  requestStop: false,
  showImageSelected: false,
  imageSelectedIndex: 0,
  showDrawer: false,
  showFab: false,
  imageList: [],
  toggleDrawer() {
    this.showDrawer = !this.showDrawer
  }
})

export default store
