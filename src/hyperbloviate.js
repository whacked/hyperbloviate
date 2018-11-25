"use strict";
exports.__esModule = true;
var electron = require("electron"), app = electron.remote.app, m = require("mithril"), mProp = require("mithril/stream");
var common_1 = require("./common");
var eventDispatch_1 = require("./eventDispatch");
var webview_1 = require("./webview");
var uiSetup_1 = require("./uiSetup");
var miccup_1 = require("./miccup");
var compiled_1 = require("./compiled");
var fs = require("fs"), path = require("path"), sibilant = require("sibilant");
function bindWebviewInterop(webviewIndex) {
    webview_1.bindIpcEventListener(webviewIndex);
}
exports.bindWebviewInterop = bindWebviewInterop;
var checkjq = setInterval(function () {
    var $ = window["$"];
    if (!$) {
        console.log('non');
        return;
    }
    console.info("CHECKING JQ...");
    clearInterval(checkjq);
    $(function () {
        // sibilant preprocessor
        $("script[type$='text/sibilant']").each(function (i, el) {
            if (el.src) {
                var baselen = path.dirname(document.baseURI).length + 1;
                var filepath = el.src.substring(baselen);
                console.log("loading: " + "%c" + filepath, "color:blue");
                fs.readFile(filepath, "utf8", function (err, sibcode) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    eval(sibilant.sibilize(sibcode));
                });
            }
            else {
                eval(sibilant.sibilize(el.innerText));
            }
        });
        eventDispatch_1.DispatcherMapping.set(common_1.Const.WEBVIEW_ELEMENT_CLICK, function (arg) {
            WebViewDriver.exec(common_1.Const.WEBVIEW_ELEMENT_CLICK, arg);
        });
        // injection test
        eventDispatch_1.DispatcherMapping.set("test-message-host", function (arg) {
            console.warn("received", arg);
        });
        $("#test-button").on("click", function () {
            console.log("clicked test button. sending to wv");
            webview_1.getWebview().send("test-message", "a b c");
        });
    });
}, 50);
function demoPanelA() {
    return miccup_1.mMiccup(["div",
        {
            id: "inject-container",
            "class": "to-inject"
        },
        ["h3", "temp"],
        ["fieldset",
            ["legend", "data stuff"],
            ["button", {
                    onclick: function () {
                        console.log(compiled_1.db);
                        compiled_1.db.load();
                    }
                },
                "load from db"],
            ["button", {
                    onclick: function () {
                        console.log(compiled_1.db);
                        compiled_1.db.save();
                    }
                },
                "save to db",
            ],
        ],
        ["fieldset",
            ["legend", "webview stuff"],
            ["button", {
                    onclick: function () {
                        webview_1.getWebview().openDevTools();
                    }
                },
                "openDevTools",
            ],
            ["button", {
                    onclick: function () {
                        webview_1.getWebview().closeDevTools();
                    }
                },
                "closeDevTools",
            ],
            ["button", {
                    onclick: function () {
                        webview_1.attachWebviewEventListeners(0);
                        webview_1.bindIpcEventListener(0);
                    }
                }, "inject to webview interop functions"],
        ]
    ]);
}
function demoPanelB() {
    var user_agent = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko";
    return miccup_1.mMiccup(["webview",
        {
            useragent: user_agent,
            autosize: "on",
            src: "https://ddg.gg",
            preload: path.join(app.getAppPath(), "webview_preload.js")
        }
    ]);
}
function setupDefaultUi(container) {
    var defaultConfig = {
        content: [{
                type: 'row',
                content: [
                    {
                        type: 'column',
                        content: [{
                                component: "panel-A"
                            }, {
                                component: "panel-B"
                            }]
                    },
                    {
                        component: "panel-C"
                    }
                ]
            }]
    };
    return uiSetup_1.setupUi(container, uiSetup_1.inflateGoldenLayoutConfig(defaultConfig), function () {
        m.render(document.getElementById("panel-A"), m({
            view: demoPanelA
        }));
        m.render(document.getElementById("panel-B"), m({
            view: demoPanelB
        }));
        compiled_1.setupControlContainer(document.getElementById("panel-C"));
    });
}
exports.setupDefaultUi = setupDefaultUi;
