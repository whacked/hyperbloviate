const fs = require("fs"),
    path = require("path"),
    edn = require("jsedn"),
    sibilant = require("sibilant"),
    jsonrpc = require('multitransport-jsonrpc'),
    express = require('express'),
    bodyParser = require('body-parser');
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

