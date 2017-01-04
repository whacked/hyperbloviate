console.log("preloader");

const electron = require('electron');
const shell = electron.shell;
const ipc = electron.ipcRenderer;

window.addEventListener('load', ()  => {
  // not clear if this is needed using the direct require in html <script></script>
  //inject jquery to page
  window.$ = window.jQuery = require("./node_modules/jquery/dist/jquery.min.js");
});
