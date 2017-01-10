const {ipcRenderer} = require("electron");
const {CssSelectorGenerator} = require("css-selector-generator");

ipcRenderer.on("get-html", function(evt, arg) {
    ipcRenderer.sendToHost("chn-webview", "naka kara " + arg, 1, 2, 3);
});

ipcRenderer.on("eval", function(evt, arg) {
    var res = eval(arg);
    ipcRenderer.sendToHost("chn-webview", res);
});

