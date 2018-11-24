const fs = require("fs"),
    path = require("path"),
    edn = require("jsedn"),
    sibilant = require("sibilant"),
    jsonrpc = require('multitransport-jsonrpc'),
    express = require('express'),
    bodyParser = require('body-parser');

const GoldenLayout = require("golden-layout");

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

interface SimpleGoldenLayoutConfig {
    content?: SimpleGoldenLayoutConfig[],
    type?: 'row' | 'column',
    component?: String,
}

function GoldenLayoutAutoComponent(name) {
    return {
        type: "component",
        componentName: "auto-component",
        componentState: {
            id: name,
        },
    }
}

function inflateGoldenLayoutConfig(simpleConfig: SimpleGoldenLayoutConfig): any {
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

function parseEdnConfig(ednConfigString: String) {
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

function execJs(wv, js, cb = null) {
    if (!wv) { return; }
    if (wv.executeScript) {
        wv.executeScript({ code: js }, cb ? cb : function (res) {
            console.log(res[0])
        });
    } else if (wv.send) {
        if (cb) {
            CallbackCache.register("chn-webview", cb);
        }
        wv.send("eval", js);
    }
}

