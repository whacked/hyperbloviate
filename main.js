const  {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

let mainWindow;

app.on("window-all-closed", function() {
    app.quit();
});

app.on("ready", function() {
    mainWindow = new BrowserWindow({
        webPreferences: {
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
