const edn = require("jsedn"),
    path = require("path"),
    m = require("mithril"),
    GoldenLayout = require("golden-layout");

function keywordizeKeys(jsEdnObject) {
    switch(jsEdnObject.constructor) {
        case edn.Keyword:
            return jsEdnObject.name.toString().substring(1);
        case edn.Map:
            return jsEdnObject.map(
                function(val, key) {
                    return new edn.Pair(
                        keywordizeKeys(key),
                        keywordizeKeys(val));
                }
            );
        case edn.Vector:
            return jsEdnObject.map(keywordizeKeys);
        default:
            return jsEdnObject;
    }
}

export function parseEdnConfig(ednConfigString: String) {
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
    return edn.toJS(
        keywordizeKeys(edn.parse(ednConfigString))
    );
}

export interface SimpleGoldenLayoutConfig {
    content?: SimpleGoldenLayoutConfig[],
    type?: 'row' | 'column',
    component?: String,
}

function GoldenLayoutAutoComponent(name) {
    return {
        type: "component",
        componentName: "auto-component",
        title: name,
        componentState: {
            id: name,
        },
    }
}

export function inflateGoldenLayoutConfig(simpleConfig: SimpleGoldenLayoutConfig): any {
    if (simpleConfig.component &&
        typeof simpleConfig.component == "string") {
        return GoldenLayoutAutoComponent(
            simpleConfig.component);
    }
    else if (simpleConfig.content) {
        var inflated = [];
        for (let subContent of simpleConfig.content) {
            inflated.push(
                inflateGoldenLayoutConfig(subContent)
            );
        }
        simpleConfig.content = inflated;
        return simpleConfig;
    }
}

export function setupUi(container: HTMLElement, config = null, onInitialized: Function = null) {
    if (!config) {
        var saved_state = localStorage.getItem("layout");
        if (saved_state != null) {
            config = JSON.parse(saved_state);
        }
    }

    const GL = new GoldenLayout(config, container);
    window.addEventListener("resize", function (e) {
        GL.updateSize();
    });

    GL.on("stateChanged", function () {
        var state = GL.toConfig();
        localStorage.setItem("layout", JSON.stringify(state));
    });

    GL.registerComponent("auto-component", function (container, componentState) {
        container.getElement()[0].setAttribute(
            "id", componentState.id);
        container.getElement().html("");
    });

    if (onInitialized) {
        GL.on("initialised", onInitialized);
    }

    GL.init();
    return GL;
}
