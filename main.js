const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

if (app) {
    let mainWindow;

    app.on("window-all-closed", function () {
        app.quit();
    });

    app.on("ready", function () {
        mainWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                webviewTag: true,
                preload: path.resolve(path.join(__dirname, "electron-preload.js"))
            }
        });
        mainWindow.loadURL(`file://${__dirname}/index.html`);
        mainWindow.openDevTools();

        ipcMain.on("ipc", (event, arg) => {
            console.log("---- got event in ipc");
            console.log(event);
            console.log(arg);
        });
        ipcMain.on("test", (event, arg) => {
            console.log("---- got event in TEST");
            console.log(event);
            console.log(arg);
        });
    });
} else {
    // export namespace for package use
    exports.Hyperbloviate = require("./src/hyperbloviate");
    exports.JsonRpcServer = require("./src/jsonRpcServer.js");
    exports.WebviewControl = require("./src/webview");
}