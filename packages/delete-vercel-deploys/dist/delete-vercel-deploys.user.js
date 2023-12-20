// ==UserScript==
// @name              Delete Vercel Non-Current Deployments
// @version           0.1.0
// @description       删除 Vercel 项目里多余的 Deployments
// @author            asadahimeka
// @namespace         https://www.nanoka.top
// @license           MIT
// @match             https://vercel.com/*/*/deployments
// @source            https://github.com/asadahimeka/userscripts
// @supportURL        https://github.com/asadahimeka/userscripts/issues
// @run-at            document-end
// @grant             GM_addElement
// @grant             GM_registerMenuCommand
// ==/UserScript==

(function() {
  "use strict";
  ;
  GM_addElement("link", { rel: "stylesheet", href: "https://unpkg.com/notyf@3.10.0/notyf.min.css" });
  GM_addElement("script", { src: "https://unpkg.com/notyf@3.10.0/notyf.min.js" });
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let notyf;
  const deleteDeploys = async function(id) {
    try {
      return fetch(`https://vercel.com/api/v2/deployments/dpl_${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include"
      });
    } catch (e) {
      notyf.open({ type: "error", message: `Delete error: ${e}`, duration: 0 });
    }
  };
  GM_registerMenuCommand("Delete deploys", async () => {
    var _a;
    const answer = confirm("Confirm delete?");
    if (!answer)
      return;
    notyf = new Notyf({
      duration: 0,
      position: { x: "right", y: "top" },
      types: [{ type: "info", background: "blueviolet", icon: false }]
    });
    const arr = document.querySelectorAll(".deployment-entity");
    if (!arr)
      return;
    for (const it of arr) {
      const h = it.innerHTML;
      if (h.includes("Current"))
        continue;
      const id = (_a = h.match(/<a.*href=".*\/(\w+)">.*<\/a>/)) == null ? void 0 : _a[1];
      notyf.open({ type: "info", message: `Deleting ${id}` });
      if (id)
        await deleteDeploys(id);
      await sleep(1e3);
      notyf.dismissAll();
    }
    notyf.open({ type: "success", message: "Delete finished.", duration: 1e3 });
    setTimeout(() => {
      location.reload();
    }, 1e3);
  });
})();
