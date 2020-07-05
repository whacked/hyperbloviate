console.log("preloader");

const electron = require('electron');

window.addEventListener('load', ()  => {
  // required for golden layout to function
  window.$ = require("./node_modules/jquery/dist/jquery.min.js");

  const Immutable = require("./node_modules/immutable/dist/immutable.min.js"),
        m = require("./node_modules/mithril/mithril.min.js"),
        sibilant = require("./node_modules/sibilant/lib/browser.js").sibilant,
        // Hyperbloviate = require("./src/hyperbloviate.js"),
        Hyperbloviate = require("./compiled/hyperbloviate.js"),
        JsonRpcServer = require("./src/jsonRpcServer.js").Server,
        WebviewControl = require("./src/webview");

  JsonRpcServer.start();

  Hyperbloviate.setupDefaultUi(document.body);
  
  window.Hyperbloviate = Hyperbloviate;
  window.JsonRpcServer = JsonRpcServer;
  window.ipcRenderer = electron.ipcRenderer;

  // for plugin interaction
  window.webviewControl = WebviewControl;
  window.execJs = WebviewControl.execJs;
  window.getWebview = WebviewControl.getWebview;
  window.getWebviewHtml = WebviewControl.getWebviewHtml;
  window.m = m;
  window.Immutable = Immutable;
  window.sibilant = sibilant;
});
