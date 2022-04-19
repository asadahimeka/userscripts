// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      0.0.1
// @author       Coder Zhao coderzhaoziwei@outlook.com
// @description  中文标签 | 界面优化 | 高清大图 | 键盘翻页 | 流体布局
// @homepage     https://greasyfork.org/scripts/421970
// @license      MIT
// @match        https://yande.re/post*
// @match        https://konachan.com/post*
// @match        https://konachan.net/post*
// @supportURL   https://github.com/coderzhaoziwei/yande-re-chinese-patch/issues
// @grant        GM_addStyle
// @grant        GM_download
// ==/UserScript==

/* eslint-env es6 */
/* global Vue:readonly */
/* global Vuetify:readonly */
/* global VueMasonry:readonly */
/* eslint semi: ["warn", "always"] */

/* Fork From https://github.com/coderzhaoziwei/yande-re-chinese-patch */

(function () {
  main();
  function main() {
    addCSS();
    bindDbclick();
    initMasonryMode();
  }
  function addCSS() {
    GM_addStyle(/* css */`
      a.thumb {
        background: #232322;
        border: 2px solid;
        border-color: #232322;
      }
      a.thumb:visited {
        border-color: #ffaaae;
      }
      div.content {
        width: 79% !important;
      }
      ul#post-list-posts li {
        zoom: 1.69 !important
      }
      img {max-height: 100%;}
      #add-to-favs {
        zoom: 1.7;
        margin: 4px 0;
      }
      li.tag-type-artist a[href^="/post"]:not(.no-browser-link)::before {
        content: "[画师]";
      }
      li.tag-type-copyright a[href^="/post"]:not(.no-browser-link)::before {
        content: "[原作]";
      }
      li.tag-type-character a[href^="/post"]:not(.no-browser-link)::before {
        content: "[角色]";
      }
      .javascript-hide {
        display: block !important;
      }
    `);
    if (location.href.includes('konachan')) {
      GM_addStyle(/* css */`
        div.content {
          width: 80% !important;
        }
        a.thumb:visited {
          background-color:#ffaaae;
        }
      `);
    }
  }
  function q(sel, cb) {
    const el = document.querySelector(sel);
    if (el) cb && cb(el);
  }
  function nextPage() {
    q('a.next_page', el => el.click());
  }
  function previousPage() {
    q('a.previous_page', el => el.click());
  }
  function bindDbclick() {
    document.addEventListener('dblclick', e => {
      const w = document.documentElement.offsetWidth || document.body.offsetWidth;
      const clickX = e.clientX;
      clickX > w / 2 ? nextPage() : previousPage();
    });
  }
  class Post {
    constructor(data) {
      if (typeof data !== 'object') data = {};
      this.id = data.id || 0;
      this.score = data.score || 0;
      this.tags = data.tags || '';
      this.source = data.source || '';
      this.author = data.author || '';
      this.creatorId = data.creator_id || 0;
      this.createdAt = data.created_at || 0;
      this.updatedAt = data.updated_at || 0;
      this.rating = data.rating || 's';
      this.fileUrl = data.file_url || '';
      this.fileExt = data.file_ext || '';
      this.fileSize = data.file_size || 0;
      this.width = data.width || 0;
      this.height = data.height || 0;
      this.jpegUrl = data.jpeg_url || '';
      this.jpegSize = data.jpeg_file_size || 0;
      this.jpegWidth = data.jpeg_width || 0;
      this.jpegHeight = data.jpeg_height || 0;
      this.sampleUrl = data.sample_url;
      this.sampleSize = data.sample_file_size || 0;
      this.sampleWidth = data.sample_width || 0;
      this.sampleHeight = data.sample_height || 0;
      this.previewUrl = data.preview_url;
      this.previewWidth = data.actual_preview_width || 0;
      this.previewHeight = data.actual_preview_height || 0;
    }
    get isRatingS() {
      return this.rating === 's';
    }
    get isRatingQ() {
      return this.rating === 'q';
    }
    get isRatingE() {
      return this.rating === 'e';
    }
    get aspectRatio() {
      return this.width / this.height;
    }
    get tagsArr() {
      return this.tags.split(/\s+/);
    }
    getSizeText(size) {
      if (size > 1024 * 1024) {
        return (size / (1024 * 1024)).toFixed(2) + 'MB';
      }
      if (size > 1024) {
        return (size / 1024).toFixed(2) + 'KB';
      }
      return size.toFixed(2) + 'B';
    }
    get sampleSizeText() {
      return this.getSizeText(this.sampleSize);
    }
    get sampleDownloadText() {
      return `下载缩略图 ${this.sampleWidth}×${this.sampleHeight} [${this.sampleSizeText}]`;
    }
    get sampleDownloadSecondText() {
      return `${this.sampleWidth}×${this.sampleHeight} [${this.sampleSizeText}]`;
    }
    get sampleDownloadName() {
      return `${location.hostname}.${this.id}.${this.sampleWidth}x${this.sampleHeight}`.replace(/\./g, '_');
    }
    get jpegSizeText() {
      return this.getSizeText(this.jpegSize);
    }
    get jpegDownloadText() {
      return `下载高清图 ${this.jpegWidth}×${this.jpegHeight} [${this.jpegSizeText}]`;
    }
    get jpegDownloadSecondText() {
      return `${this.jpegWidth}×${this.jpegHeight} [${this.jpegSizeText}]`;
    }
    get jpegDownloadName() {
      return `${location.hostname}.${this.id}.${this.jpegWidth}x${this.jpegHeight}`.replace(/\./g, '_');
    }
    get fileSizeText() {
      return this.getSizeText(this.fileSize);
    }
    get fileDownloadText() {
      return `下载原文件 ${this.width}×${this.height} [${this.fileSizeText}] ${this.fileExt.toUpperCase()}`;
    }
    get fileDownloadSecondText() {
      return `${this.width}×${this.height} [${this.fileSizeText}] ${this.fileExt.toUpperCase()}`;
    }
    get fileDownloadName() {
      return `${location.hostname}.${this.id}.${this.width}x${this.height}`.replace(/\./g, '_');
    }
    get createdTime() {
      const date = new Date(this.createdAt * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-DE')}`;
    }
    get updatedTime() {
      const date = new Date(this.updatedAt * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-DE')}`;
    }
    get sourceUrl() {
      // eslint-disable-next-line no-useless-escape, unicorn/better-regex
      if (/^https:\/\/i\.pximg\.net\/img-original\/img\/[\d\/]{19}\/([\d]{1,})_p[\d]{1,}\.(jpg|png)$/.test(this.source)) {
        const pid = RegExp.$1;
        return `https://pixiv.net/artworks/${pid}`;
      }
      return this.source;
    }
  }
  function loadScript(src) {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => { resolve(); }, false);
      document.head.appendChild(script);
    });
  }
  async function initMasonryMode() {
    await Promise.all([
      loadScript('https://lib.baomitu.com/vue/2.6.14/vue.min.js'),
      loadScript('https://lib.baomitu.com/vuetify/2.5.0/vuetify.min.js'),
      loadScript('https://npm.elemecdn.com/vue-masonry-css@1.0.3/dist/vue-masonry.min.js')
    ]);
    document.head.innerHTML = /* html */`
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
      <meta name="referrer" content="no-referrer">
      <title>Yandere Masonry</title>
      <link rel="stylesheet" href="https://npm.elemecdn.com/normalize.css/normalize.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
      <link rel="stylesheet" href="https://npm.elemecdn.com/@mdi/font@5.9.55/css/materialdesignicons.min.css">
      <link rel="stylesheet" href="https://lib.baomitu.com/vuetify/2.5.0/vuetify.min.css">
      <style>::-webkit-scrollbar {display: none;width: 0px !important;}[v-cloak] {display: none;}</style>
    `;
    document.body.innerHTML = /* html */`
      <section id="konachan_app" v-cloak>
        <v-app>
          <v-app-bar app dense>
            <v-app-bar-nav-icon @click="showDrawer=!showDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="#ffffff" disabled>Rating Safe</v-btn>
            <v-progress-linear :active="requestState" :height="6" color="deep-purple accent-4" indeterminate absolute
              bottom></v-progress-linear>
          </v-app-bar>
          <v-navigation-drawer v-model="showDrawer" app temporary>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Konachan</v-list-item-title>
                <v-list-item-subtitle>Rating Safe</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense nav>
              <v-list-item-content>
                <v-list-item-title class="title">About</v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item link
                @click="window.open('https://github.com/coderzhaoziwei/yande-re-chinese-patch','_blank','noreferrer')">
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
          <v-main app>
            <v-container ref="vcont" class="pa-2" fluid>
              <masonry :cols="columnCount" gutter="8px">
                <v-card class="mb-2" v-for="(image, index) in imageList" :key="index">
                  <v-img transition="scroll-y-transition"
                    :src="image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE)?image.previewUrl:''"
                    :aspect-ratio="image.aspectRatio"
                    @click="if(image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE)){imageSelectedIndex=index;showImageSelected=true;}"
                    @click.middle="imageSelectedIndex=index;window.open('/post/show/' + imageSelected.id)">
                    <template v-slot:placeholder>
                      <v-row v-if="image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE)"
                        class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="#ee8888"></v-progress-circular>
                      </v-row>
                    </template>
                    <v-row
                      v-if="(image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE))===false"
                      class="fill-height ma-0 text-h5" align="center" justify="center" style="color:#ee8888;"
                      v-text="image.rating.toUpperCase()"></v-row>
                  </v-img>
                </v-card>
              </masonry>
              <div class="d-flex justify-center">
                <v-btn v-show="!requestState&&requestStop" color="#ee8888" text>下面没有了...</v-btn>
              </div>
              <v-fab-transition>
                <v-btn v-show="showFab" fab dark fixed bottom right color="pink" @click="refresh">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-fab-transition>
              <v-dialog v-model="showImageSelected" :width="imageSelectedWidth" :height="imageSelectedHeight"
                :overlay-opacity="0.7">
                <v-img v-if="showImageSelected" :src="imageSelected.sampleUrl" :lazy-src="imageSelected.previewUrl"
                  @click="showImageInfo=!showImageInfo;">
                  <v-toolbar v-show="showImageInfo" flat color="transparent">
                    <v-chip-group class="hidden-sm-and-down" column>
                      <v-chip v-for="tag in imageSelected.tagsArr" :key="tag" class="mr-1" small color="#ee8888" text-color="#ffffff"
                        v-text="tag" @click.stop="window.open('https://konachan.com/post?tags='+tag,'_blank','noreferrer')">
                      </v-chip>
                    </v-chip-group>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon color="#ee8888" v-bind="attrs" v-on="on"
                          @click.stop="window.open('https://konachan.net/post/show/' + imageSelected.id,'_blank','noreferrer')">
                          <v-icon>mdi-link-variant</v-icon>
                        </v-btn>
                      </template>
                      <span v-text="'本站链接 https://konachan.net/post/show/' + imageSelected.id"></span>
                    </v-tooltip>
                    <v-tooltip v-if="imageSelected.sourceUrl !== ''" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon color="#ee8888" v-bind="attrs" v-on="on"
                          @click.stop="window.open(imageSelected.sourceUrl,'_blank','noreferrer')">
                          <v-icon>mdi-launch</v-icon>
                        </v-btn>
                      </template>
                      <span v-text="'来源链接 ' + imageSelected.sourceUrl"></span>
                    </v-tooltip>
                    <v-menu dense open-on-hover offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon color="#ee8888" v-bind="attrs" v-on="on">
                          <v-icon>mdi-download</v-icon>
                        </v-btn>
                      </template>
                      <v-list dense flat>
                        <v-list-item two-line link dense>
                          <v-list-item-content
                            @click.stop="download(imageSelected.sampleUrl, imageSelected.sampleDownloadName)">
                            <v-list-item-title>下载缩略图</v-list-item-title>
                            <v-list-item-subtitle v-text="imageSelected.sampleDownloadSecondText"></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="imageSelected.jpegSize !== 0" two-line link dense>
                          <v-list-item-content
                            @click.stop="download(imageSelected.jpegUrl, imageSelected.jpegDownloadName)">
                            <v-list-item-title>下载高清图</v-list-item-title>
                            <v-list-item-subtitle v-text="imageSelected.jpegDownloadSecondText"></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item two-line link dense>
                          <v-list-item-content
                            @click.stop="download(imageSelected.fileUrl, imageSelected.fileDownloadName)">
                            <v-list-item-title>下载原文件</v-list-item-title>
                            <v-list-item-subtitle v-text="imageSelected.fileDownloadSecondText"></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon color="#ee8888" v-bind="attrs" v-on="on"
                          @click.stop="showImageSelected=false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                      <span>关闭</span>
                    </v-tooltip>
                  </v-toolbar>
                </v-img>
              </v-dialog>
            </v-container>
          </v-main>
        </v-app>
      </section>
    `;
    Vue.use(VueMasonry);
    new Vue({
      vuetify: new Vuetify({
        // theme: { dark: true }
      }),
      data: {
        showDrawer: false,
        showFab: false,
        showImageSelected: false,
        showImageInfo: true,
        showRatingQ: JSON.parse(localStorage.getItem('showRatingQ') || 'true'),
        showRatingE: JSON.parse(localStorage.getItem('showRatingE') || 'false'),
        imageList: [],
        imageSelectedIndex: 0,
        params: new URLSearchParams('?page=1'),
        requestState: false,
        requestStop: false,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        columnCount: {
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
      },
      computed: {
        title() {
          return `${this.imageList.length} Posts of Konachan`;
        },
        version() {
          return '2.0.106';
        },
        imageSelected() {
          return this.imageList[this.imageSelectedIndex] || new Post();
        },
        imageSelectedWidth() {
          const width = Number.parseInt(Math.min(this.innerWidth * 0.9, this.imageSelected.sampleWidth));
          const height = Math.min(this.innerHeight * 0.9, this.imageSelected.sampleHeight);
          const width2 = Number.parseInt(height * this.imageSelected.aspectRatio);
          return Math.min(width, width2);
        },
        imageSelectedHeight() {
          const width = Math.min(this.innerWidth * 0.9, this.imageSelected.sampleWidth);
          const height = Number.parseInt(Math.min(this.innerHeight * 0.9, this.imageSelected.sampleHeight));
          const height2 = Number.parseInt(width / this.imageSelected.aspectRatio);
          return Math.min(height, height2);
        }
      },
      watch: {
        showRatingQ(value) {
          localStorage.setItem('showRatingQ', JSON.stringify(value));
        },
        showRatingE(value) {
          localStorage.setItem('showRatingE', JSON.stringify(value));
        }
      },
      methods: {
        async request(url) {
          const resp = await fetch(url);
          if (!resp.ok) throw new Error('Resp not ok.');
          const results = await resp.json();
          return results;
        },
        async fetchData(refresh) {
          this.requestState = true;
          const url = '/post.json?' + this.params.toString();
          try {
            const results = await this.request(url);
            if (Array.isArray(results) && results.length > 0) {
              const posts = results.map(e => new Post(e));
              // eslint-disable-next-line unicorn/prefer-spread
              this.imageList = refresh ? posts : this.imageList.concat(posts);
              const page = Number(this.params.get('page')) || 1;
              this.params.set('page', page + 1);
            } else {
              this.requestStop = true;
            }
          } catch (error) {
            console.log('fetch error: ' + error);
          } finally {
            this.requestState = false;
          }
        },
        async initData(refresh) {
          this.params.set('page', 1);
          await this.fetchData(refresh);
          const times = this.calcFetchTimes();
          for (let index = 0; index < times; index++) {
            await this.fetchData();
          }
        },
        refresh() {
          this.$vuetify.goTo(0);
          this.initData(true);
        },
        download(url, name) {
          const a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.style.display = 'none';
          a.setAttribute('download', name);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        calcFetchTimes() {
          const cnth = this.$refs.vcont.clientHeight;
          const doch = document.documentElement.clientHeight;
          return Math.trunc(doch / cnth);
        },
        changeThemeDark() {
          try {
            const mode = localStorage.getItem('darken-mode');
            this.$vuetify.theme.dark = mode === 'dark';
          } catch (error) {
            console.log('error:', error);
          }
        }
      },
      async mounted() {
        this.changeThemeDark();
        window.addEventListener('storage', () => {
          this.changeThemeDark();
        });
        await this.initData();
        window.addEventListener('scroll', throttleScroll(scroll => {
          if (!this.showFab && scroll > 200) this.showFab = true;
          if (this.requestStop) return;
          if (this.requestState) return;
          isReachBottom() && this.fetchData();
        }, () => {
          if (this.showFab) this.showFab = false;
        }));
        window.addEventListener('resize', () => {
          this.innerWidth = window.innerWidth;
          this.innerHeight = window.innerHeight;
        });
      }
    }).$mount('#konachan_app');

    function isReachBottom() {
      const doc = document.documentElement;
      const clientHeight = doc.clientHeight;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight;
      return (clientHeight + scrollTop) >= scrollHeight;
    }

    function throttleScroll(downFn, upFn) {
      const doc = document.documentElement;
      let position = doc.scrollTop;
      let ticking = false;
      return function (arg) {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
          const scroll = doc.scrollTop;
          scroll > position ? downFn(scroll, arg) : upFn(scroll, arg);
          position = scroll;
          ticking = false;
        });
      };
    }
  }
}());
