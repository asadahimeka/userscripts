/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSizeText } from './utils'

class Post {
  [x: string]: any
  constructor(data: any) {
    if (typeof data !== 'object') data = {}
    this.id = data.id || 0
    this.score = data.score || 0
    this.tags = data.tags || ''
    this.source = data.source || ''
    this.author = data.author || ''
    this.creatorId = data.creator_id || 0
    this.createdAt = data.created_at || 0
    this.updatedAt = data.updated_at || 0
    this.rating = data.rating || 's'
    this.fileUrl = data.file_url || ''
    this.fileExt = data.file_ext || ''
    this.fileSize = data.file_size || 0
    this.width = data.width || 0
    this.height = data.height || 0
    this.jpegUrl = data.jpeg_url || ''
    this.jpegSize = data.jpeg_file_size || 0
    this.jpegWidth = data.jpeg_width || 0
    this.jpegHeight = data.jpeg_height || 0
    this.sampleUrl = data.sample_url
    this.sampleSize = data.sample_file_size || 0
    this.sampleWidth = data.sample_width || 0
    this.sampleHeight = data.sample_height || 0
    this.previewUrl = data.preview_url
    this.previewWidth = data.actual_preview_width || 0
    this.previewHeight = data.actual_preview_height || 0
  }
  get isRatingS() {
    return this.rating === 's'
  }
  get isRatingQ() {
    return this.rating === 'q'
  }
  get isRatingE() {
    return this.rating === 'e'
  }
  get aspectRatio() {
    return this.width / this.height
  }
  get tagsArr() {
    return this.tags.split(/\s+/)
  }
  get sampleSizeText() {
    return getSizeText(this.sampleSize)
  }
  get sampleDownloadText() {
    return `下载缩略图 ${this.sampleWidth}×${this.sampleHeight} [${this.sampleSizeText}]`
  }
  get sampleDownloadSecondText() {
    return `${this.sampleWidth}×${this.sampleHeight} [${this.sampleSizeText}]`
  }
  get sampleDownloadName() {
    return `${location.hostname}.${this.id}.${this.sampleWidth}x${this.sampleHeight}`.replace(/\./g, '_')
  }
  get jpegSizeText() {
    return getSizeText(this.jpegSize)
  }
  get jpegDownloadText() {
    return `下载高清图 ${this.jpegWidth}×${this.jpegHeight} [${this.jpegSizeText}]`
  }
  get jpegDownloadSecondText() {
    return `${this.jpegWidth}×${this.jpegHeight} [${this.jpegSizeText}]`
  }
  get jpegDownloadName() {
    return `${location.hostname}.${this.id}.${this.jpegWidth}x${this.jpegHeight}`.replace(/\./g, '_')
  }
  get fileSizeText() {
    return getSizeText(this.fileSize)
  }
  get fileDownloadText() {
    return `下载原文件 ${this.width}×${this.height} [${this.fileSizeText}] ${this.fileExt.toUpperCase()}`
  }
  get fileDownloadSecondText() {
    return `${this.width}×${this.height} [${this.fileSizeText}] ${this.fileExt.toUpperCase()}`
  }
  get fileDownloadName() {
    return `${location.hostname}.${this.id}.${this.width}x${this.height}`.replace(/\./g, '_')
  }
  get createdTime() {
    const date = new Date(this.createdAt * 1000)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-DE')}`
  }
  get updatedTime() {
    const date = new Date(this.updatedAt * 1000)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-DE')}`
  }
  get sourceUrl() {
    // eslint-disable-next-line no-useless-escape, unicorn/better-regex
    if (/^https:\/\/i\.pximg\.net\/img-original\/img\/[\d\/]{19}\/([\d]{1,})_p[\d]{1,}\.(jpg|png)$/.test(this.source)) {
      const pid = RegExp.$1
      return `https://pixiv.net/artworks/${pid}`
    }
    return this.source
  }
}

export default Post
