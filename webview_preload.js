const constant = require("./src/constant"),
    Const = constant.Const,
    Conf = constant.Conf;
const common = require("./src/common");

const path = require("path"),
    fs = require("fs");
const {ipcRenderer} = require("electron");
const {CssSelectorGenerator} = require("css-selector-generator");

// cache plugin map
var PluginMap = {};
fs.readdirSync(Conf.PLUGIN_DIR_NAME).forEach(function(pluginName) {
    console.log(pluginName)
    const pluginPath = "./" + Conf.PLUGIN_DIR_NAME + "/" + pluginName;
    try {
        PluginMap[pluginName] = require(pluginPath);
    } catch(e) {
        console.info("failed to load plugin " + pluginName);
        console.warn(e);
    }
});

ipcRenderer.on("eval", function(evt, arg) {
    var res = eval(arg);
    ipcRenderer.sendToHost(Const.WEBVIEW_EVENT_CHANNEL, res);
});

ipcRenderer.on("executePlugin", function(evt, pluginName) {
    var maybePlugin = PluginMap[pluginName];
    if(!maybePlugin) {
        console.warn("no such plugin: " + pluginName);
        return;
    }
    var res = maybePlugin.execute();
    ipcRenderer.sendToHost(Const.WEBVIEW_EVENT_CHANNEL, res);
});

ipcRenderer.on("test-message", function(evt, arg) {
    console.log("hi from webview")
    ipcRenderer.sendToHost("test-message-host", ["client", arg]);
});

window.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("contextmenu", common.procRightClick, true);
});
