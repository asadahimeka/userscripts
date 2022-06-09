// ==UserScript==
// @name              Ymail Clean
// @version           0.0.1
// @description       Y!メール 界面清理
// @author            asadahimeka
// @namespace         https://kanata.ml
// @license           MIT
// @require           https://lib.baomitu.com/arrive/2.4.1/arrive.min.js
// @source            https://github.com/asadahimeka/userscripts
// @supportURL        https://github.com/asadahimeka/userscripts/issues
// @match             https://mail.yahoo.co.jp/u/pc*
// @run-at            document-start
// @grant             GM_addStyle
// ==/UserScript==

(function() {
  "use strict";
  GM_addStyle(`
a[href="https://yahoo.jp/v4qcw7I"],
#mhHeadLine,
#mhPointArea {
  display: none !important;
}

#TEMPLA_MH_VDOM {
  min-height: unset !important;
}
  `);

  addEventListener("load", () => {
    document.arrive('div[data-cy="mailPreviewArea"]', function() {
      document.querySelector("#switchTab").parentElement.style.width = "255px";
      document.querySelector("#tagYadsListTop").parentElement.style.display = "none";
      this.arrive("iframe", function() {
        setTimeout(() => {
          var _a;
          const d = this.contentWindow.document;
          const avatar = d.querySelector('img[src^="https://pbs.twimg.com/profile_images"');
          if (!avatar)
            return;
          const tds = d.querySelectorAll('td[background^="https://pbs.twimg.com/media"]');
          for (const item of tds) {
            (_a = item.querySelector("img")) == null ? void 0 : _a.setAttribute("src", item.getAttribute("background").replace(":mosaic", ""));
          }
        }, 200);
      });
      document.unbindArrive('div[data-cy="mailPreviewArea"]');
    });
  });
})();
