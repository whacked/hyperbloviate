import {
    CallbackCache,
    DispatcherMapping,
} from "./eventDispatch";

import {
    Const,
} from "./constant";

export function getWebview(maybeWebviewIndex = 0): any {
    if(maybeWebviewIndex != null
        && typeof maybeWebviewIndex == "object") {
        return maybeWebviewIndex;
    }
    var webviewIndex;
    if(!maybeWebviewIndex) {
        webviewIndex = 0;
    } else {
        webviewIndex = maybeWebviewIndex;
    }
    var wvs = document.querySelectorAll("webview");
    if (wvs.length == 0) {
        return null;
    }
    return wvs[webviewIndex];
}

export function execJs(wv, js, cb = null) {
    wv = getWebview(wv);
    if (!wv) { return; }
    if (wv.executeScript) {
        wv.executeScript({ code: js }, cb ? cb : function (res) {
            console.log(res[0])
        });
    } else if (wv.send) {
        if (cb) {
            CallbackCache.register(Const.WEBVIEW_EVENT_CHANNEL, cb);
        }
        wv.send("eval", js);
    }
}

export function execPlugin(wv, pluginName, cb = null) {
    wv = getWebview(wv);
    if(!wv) { return; }
    if(cb) {
        CallbackCache.register(Const.WEBVIEW_EVENT_CHANNEL, cb);
        wv.send("executePlugin", pluginName);
    }
}

export function getWebviewHtml(wv = null, cb = null) {
    wv = getWebview(wv);
    cb = cb || function (x) { console.log(x) };
    execJs(getWebview(wv), "document.body.innerHTML", cb);
}

export function clearWebviewEventListeners(wv = 0) {
    wv = getWebview(wv);
    execJs(getWebview(wv), "document.body.outerHTML = document.body.outerHTML");
}

export function attachWebviewEventListeners(wv = 0) {
    wv = getWebview(wv);
    execJs(getWebview(wv), "document.body.addEventListener('contextmenu', common.procRightClick, true)");
}

export function bindIpcEventListener(maybeWebview) {
    var wv;
    if(typeof maybeWebview == "number") {
        wv = getWebview(maybeWebview);
    } else {
        wv = maybeWebview;
    }

    wv.addEventListener(
        "ipc-message",
        DispatcherMapping.ipcEventDispatcher);
}
