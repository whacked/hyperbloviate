"use strict";
exports.__esModule = true;
// DEBUG
var Conf = {
    outputEval: false
};
var jsonrpc = require('multitransport-jsonrpc'), express = require('express'), bodyParser = require('body-parser'), sibilant = require("sibilant");
function javascriptHandler(obj, callback) {
    console.log("%c GOT JAVASCRIPT ", "color:yellow;background:gray;");
    if (Conf.outputEval) {
        console.log('=============================');
        console.log(obj);
        console.log('=============================');
    }
    var rtn = eval.apply(null, [obj]);
    try {
        callback(undefined, rtn);
    }
    catch (err) {
        console.warn(err);
        callback(undefined, ["there was an error in the return"]);
    }
}
function sibilantHandler(obj, callback) {
    console.log("%c GOT SIBILANT ", "color:lime;background:black;");
    if (Conf.outputEval) {
        console.log('=============================');
        console.log(obj);
        console.log('=============================');
    }
    var rtn = eval.apply(null, [sibilant.sibilize(obj)]);
    try {
        callback(undefined, rtn);
    }
    catch (err) {
        console.warn(err);
        callback(undefined, ["there was an error in the return"]);
    }
}
var Server;
(function (Server) {
    var JRPC_PORT;
    var _server_object;
    function stop() {
        this._server_object.close();
        this._server_object = null;
    }
    Server.stop = stop;
    function start(jrpc_port) {
        if (jrpc_port === void 0) { jrpc_port = 8002; }
        this.JRPC_PORT = jrpc_port;
        if (this._server_object) {
            console.warn("SERVER ALREADY STARTED");
            return;
        }
        console.log("%c starting server on port " + this.JRPC_PORT + " ", "color:lime;font-weight:bold;background:black;");
        var JrpcServer = jsonrpc.server;
        var ServerMiddleware = jsonrpc.transports.server.middleware;
        var app = express();
        app.use(bodyParser.json());
        var jsonRpcMiddlewareServer = new JrpcServer(new ServerMiddleware(), {
            javascript: javascriptHandler,
            sibilant: sibilantHandler
        });
        app.use('/rpc', jsonRpcMiddlewareServer.transport.middleware);
        this._server_object = app.listen(JRPC_PORT);
    }
    Server.start = start;
})(Server = exports.Server || (exports.Server = {}));
