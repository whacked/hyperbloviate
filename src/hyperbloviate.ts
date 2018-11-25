
const electron = require("electron"),
    app = electron.remote.app,
    m = require("mithril"),
    mProp = require("mithril/stream");

import {
    Const,
} from "./constant";

import {
    clickSelector,
    fireEventOn,
    procRightClick,
} from "./common";

import {
    DispatcherMapping,
    CallbackCache,
} from "./eventDispatch";

import {
    getWebview,
    attachWebviewEventListeners,
    bindIpcEventListener,
} from "./webview";

import {
    setupUi,
    SimpleGoldenLayoutConfig,
    inflateGoldenLayoutConfig,
} from "./uiSetup";

import {
    mMiccup,
} from "./miccup";

import {
    setupControlContainer,
    db,
} from "./compiled";

declare const ipcRenderer: any;

declare const WebViewDriver: any;

const fs = require("fs"),
    path = require("path"),
    sibilant = require("sibilant");

export function bindWebviewInterop(webviewIndex) {
    bindIpcEventListener(webviewIndex);
}

var checkjq = setInterval(function () {
    var $ = window["$"];
    if (!$) {
        console.log('non');
        return;
    }
    console.info("CHECKING JQ...")
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
            } else {
                eval(sibilant.sibilize(el.innerText));
            }
        });

        DispatcherMapping.set(
            Const.WEBVIEW_ELEMENT_CLICK,
            function (arg) {
                WebViewDriver.exec(
                    Const.WEBVIEW_ELEMENT_CLICK, arg);
            });

        // injection test
        DispatcherMapping.set(
            "test-message-host",
            function (arg) {
                console.warn("received", arg);
            });

        $("#test-button").on("click", function () {
            console.log("clicked test button. sending to wv");
            getWebview().send("test-message", "a b c");
        });
    });
}, 50);

function demoPanelA() {
    return mMiccup(
        ["div",
            {
                id: "inject-container",
                class: "to-inject"
            },
            ["h3", "temp"],
            ["fieldset",
                ["legend", "data stuff"],
                ["button", {
                    onclick: function () {
                        console.log(db);
                        db.load();
                    }
                },
                    "load from db"],
                ["button", {
                    onclick: function () {
                        console.log(db);
                        db.save();
                    }
                },
                    "save to db",
                ],
            ],
            ["fieldset",
                ["legend", "webview stuff"],
                ["button", {
                    onclick: function () {
                        getWebview().openDevTools();
                    }
                },
                    "openDevTools",
                ],
                ["button", {
                    onclick: function () {
                        getWebview().closeDevTools();
                    },
                },
                    "closeDevTools",
                ],
                ["button", {
                    onclick: function () {
                        attachWebviewEventListeners(0);
                        bindIpcEventListener(0);
                    },
                }, "inject to webview interop functions"],
            ]
        ]
    )
}

function demoPanelB() {
    var user_agent = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko";
    return mMiccup(
        ["webview",
            {
                useragent: user_agent,
                autosize: "on",
                src: "https://ddg.gg",
                preload: path.join(app.getAppPath(), "webview_preload.js"),
            }
        ]);
}

export function setupDefaultUi(container: HTMLElement) {
    var defaultConfig: SimpleGoldenLayoutConfig = {
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

    return setupUi(container,
        inflateGoldenLayoutConfig(defaultConfig),
        function () {
            m.render(document.getElementById("panel-A"), m({
                view: demoPanelA
            }));
            m.render(document.getElementById("panel-B"), m({
                view: demoPanelB
            }));
            setupControlContainer(document.getElementById("panel-C"));
        });
}
