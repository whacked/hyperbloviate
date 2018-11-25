"use strict";
exports.__esModule = true;
var eventDispatch_1 = require("./eventDispatch");
var constant_1 = require("./constant");
function getWebview(maybeWebviewIndex) {
    if (maybeWebviewIndex === void 0) { maybeWebviewIndex = 0; }
    if (maybeWebviewIndex != null
        && typeof maybeWebviewIndex == "object") {
        return maybeWebviewIndex;
    }
    var webviewIndex;
    if (!maybeWebviewIndex) {
        webviewIndex = 0;
    }
    else {
        webviewIndex = maybeWebviewIndex;
    }
    var wvs = document.querySelectorAll("webview");
    if (wvs.length == 0) {
        return null;
    }
    return wvs[webviewIndex];
}
exports.getWebview = getWebview;
function execJs(wv, js, cb) {
    if (cb === void 0) { cb = null; }
    wv = getWebview(wv);
    if (!wv) {
        return;
    }
    if (wv.executeScript) {
        wv.executeScript({ code: js }, cb ? cb : function (res) {
            console.log(res[0]);
        });
    }
    else if (wv.send) {
        if (cb) {
            eventDispatch_1.CallbackCache.register(constant_1.Const.WEBVIEW_EVENT_CHANNEL, cb);
        }
        wv.send("eval", js);
    }
}
exports.execJs = execJs;
function execPlugin(wv, pluginName, cb) {
    if (cb === void 0) { cb = null; }
    wv = getWebview(wv);
    if (!wv) {
        return;
    }
    if (cb) {
        eventDispatch_1.CallbackCache.register(constant_1.Const.WEBVIEW_EVENT_CHANNEL, cb);
        wv.send("executePlugin", pluginName);
    }
}
exports.execPlugin = execPlugin;
function getWebviewHtml(wv, cb) {
    if (wv === void 0) { wv = null; }
    if (cb === void 0) { cb = null; }
    wv = getWebview(wv);
    cb = cb || function (x) { console.log(x); };
    execJs(getWebview(wv), "document.body.innerHTML", cb);
}
exports.getWebviewHtml = getWebviewHtml;
function clearWebviewEventListeners(wv) {
    if (wv === void 0) { wv = 0; }
    wv = getWebview(wv);
    execJs(getWebview(wv), "document.body.outerHTML = document.body.outerHTML");
}
exports.clearWebviewEventListeners = clearWebviewEventListeners;
function attachWebviewEventListeners(wv) {
    if (wv === void 0) { wv = 0; }
    wv = getWebview(wv);
    execJs(getWebview(wv), "document.body.addEventListener('contextmenu', common.procRightClick, true)");
}
exports.attachWebviewEventListeners = attachWebviewEventListeners;
function bindIpcEventListener(maybeWebview) {
    var wv;
    if (typeof maybeWebview == "number") {
        wv = getWebview(maybeWebview);
    }
    else {
        wv = maybeWebview;
    }
    wv.addEventListener("ipc-message", eventDispatch_1.DispatcherMapping.ipcEventDispatcher);
}
exports.bindIpcEventListener = bindIpcEventListener;
