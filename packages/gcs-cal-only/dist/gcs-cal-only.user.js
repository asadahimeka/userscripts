// ==UserScript==
// @name              原神观测枢日历放大
// @version           0.0.1
// @description       原神观测枢素材活动日历放大到整屏（1920*1080）
// @author            asadahimeka
// @namespace         https://www.nanoka.top
// @license           MIT
// @match             https://bbs.mihoyo.com/ys/obc/?bbs_presentation_style=no_header&cal=1
// @source            https://github.com/asadahimeka/userscripts
// @supportURL        https://github.com/asadahimeka/userscripts/issues
// @run-at            document-start
// @grant             GM_addStyle
// ==/UserScript==

(function() {
  "use strict";
  GM_addStyle(`
.home__map--calendar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 1920px !important;
  height: 100%;
}
.cal-pc__head-item--active {
  background-color: #f4f4f4 !important;
}
  `);

  function run() {
    const cols = document.querySelectorAll(".cal-pc__row--event .cal-pc__col .cal-pc__col:not(.cal-pc__col--event)");
    for (const el of cols) {
      const w = parseFloat(el.style.width);
      if (w)
        el.style.width = `${w * 2.6041666666666665}px`;
    }
    const a = document.querySelector(".home-channel--calendar .home-channel__title a");
    a == null ? void 0 : a.addEventListener("click", (e) => {
      e.preventDefault();
      location.assign("https://bbs.mihoyo.com/ys/obc/");
    });
  }
  addEventListener("load", run);
})();
