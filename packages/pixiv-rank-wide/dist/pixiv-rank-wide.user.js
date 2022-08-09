// ==UserScript==
// @name              Pixiv 排行榜宽屏展示
// @version           0.0.1
// @description       Pixiv 排行榜页面图片列表加宽，图片紧凑展示
// @author            asadahimeka
// @namespace         https://www.nanoka.top
// @license           MIT
// @match             https://www.pixiv.net/ranking.php*
// @source            https://github.com/asadahimeka/userscripts
// @supportURL        https://github.com/asadahimeka/userscripts/issues
// @run-at            document-start
// @grant             GM_addStyle
// ==/UserScript==

(function() {
  "use strict";
  GM_addStyle(`
#wrapper {
  width: 90%;
}
.layout-body {
  width: 100%;
}
.premium-impression,
._premium-lead-function-banner {
  display: none;
}
._layout-thumbnail ._thumbnail {
  width: 100%;
  max-height: unset !important;
}
.ranking-items.adjust .ranking-item {
  width: 270px;
}
.following2 .follow-button {
  position: relative;
  width: 40px;
}
.following2 .follow-button:before {
  content: '已关注';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  background: #eee;
  line-height: 26px;
}
  `);

})();
