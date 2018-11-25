console.log("preloader");

const electron = require('electron');
const shell = electron.shell;
const ipc = electron.ipcRenderer;

window.addEventListener('load', ()  => {
  // required for golden layout to function
  window.$ = require("./node_modules/jquery/dist/jquery.min.js");

  const common = require("./sib/common"),
        Const = common.Const,
        Immutable = require("./node_modules/immutable/dist/immutable.min.js"),
        m = require("./node_modules/mithril/mithril.min.js"),
        sibilant = require("./node_modules/sibilant/lib/browser.js").sibilant,
        Hyperbloviate = require("./sib/hyperbloviate.js"),
        JsonRpcServer = require("./sib/jsonRpcServer.js").Server,
        {ipcRenderer} = require("electron");

  JsonRpcServer.start();

  Hyperbloviate.setupDefaultUi(document.body);
  
  window.Hyperbloviate = Hyperbloviate;
  window.ipcRenderer = ipcRenderer;

  // for plugin interaction
  const WebviewControl = require("./sib/webview");
  window.webviewControl = WebviewControl;
  window.execJs = WebviewControl.execJs;
  window.getWebview = WebviewControl.getWebview;
  window.getWebviewHtml = WebviewControl.getWebviewHtml;
  window.m = m;
  window.Immutable = Immutable;
  window.sibilant = sibilant;
});
