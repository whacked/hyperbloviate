"use strict";
exports.__esModule = true;
var edn = require("jsedn"), GoldenLayout = require("golden-layout");
function keywordizeKeys(jsEdnObject) {
    switch (jsEdnObject.constructor) {
        case edn.Keyword:
            return jsEdnObject.name.toString().substring(1);
        case edn.Map:
            return jsEdnObject.map(function (val, key) {
                return new edn.Pair(keywordizeKeys(key), keywordizeKeys(val));
            });
        case edn.Vector:
            return jsEdnObject.map(keywordizeKeys);
        default:
            return jsEdnObject;
    }
}
function parseEdnConfig(ednConfigString) {
    /*
    const defaultConfigEdn = `
    {:content
        [{:type "row"
          :content
          [{:type "column"
            :content
            [{:react-component "A"}
             {:react-component "B"}
             {:react-component "F"}
             ]}
           {:react-component "C"}
           {:type "column"
            :content
            [{:react-component "D"}
             {:react-component "E"}]}]}]}
    `;

    var defaultConfig = parseEdnConfig(defaultConfigEdn);
    */
    return edn.toJS(keywordizeKeys(edn.parse(ednConfigString)));
}
exports.parseEdnConfig = parseEdnConfig;
function GoldenLayoutAutoComponent(name) {
    return {
        type: "component",
        componentName: "auto-component",
        title: name,
        componentState: {
            id: name
        }
    };
}
function inflateGoldenLayoutConfig(simpleConfig) {
    if (simpleConfig.component &&
        typeof simpleConfig.component == "string") {
        return GoldenLayoutAutoComponent(simpleConfig.component);
    }
    else if (simpleConfig.content) {
        var inflated = [];
        for (var _i = 0, _a = simpleConfig.content; _i < _a.length; _i++) {
            var subContent = _a[_i];
            inflated.push(inflateGoldenLayoutConfig(subContent));
        }
        simpleConfig.content = inflated;
        return simpleConfig;
    }
}
exports.inflateGoldenLayoutConfig = inflateGoldenLayoutConfig;
function setupUi(container, config, onInitialized) {
    if (config === void 0) { config = null; }
    if (onInitialized === void 0) { onInitialized = null; }
    if (!config) {
        var saved_state = localStorage.getItem("layout");
        if (saved_state != null) {
            config = JSON.parse(saved_state);
        }
    }
    var GL = new GoldenLayout(config, container);
    window.addEventListener("resize", function (e) {
        GL.updateSize();
    });
    GL.on("stateChanged", function () {
        var state = GL.toConfig();
        localStorage.setItem("layout", JSON.stringify(state));
    });
    GL.registerComponent("auto-component", function (container, componentState) {
        container.getElement()[0].setAttribute("id", componentState.id);
        container.getElement().html("");
    });
    if (onInitialized) {
        GL.on("initialised", onInitialized);
    }
    GL.init();
    return GL;
}
exports.setupUi = setupUi;
