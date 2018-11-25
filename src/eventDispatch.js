"use strict";
exports.__esModule = true;
var CallbackCache;
(function (CallbackCache) {
    var store = {};
    function register(channel, func) {
        store[channel] = function (arg) {
            console.debug("removing callback ...");
            store[channel] = null;
            console.debug("calling callback ...");
            func(arg);
        };
    }
    CallbackCache.register = register;
    function hasCallback(channel) {
        return store[channel];
    }
    CallbackCache.hasCallback = hasCallback;
})(CallbackCache = exports.CallbackCache || (exports.CallbackCache = {}));
var DispatcherMapping;
(function (DispatcherMapping) {
    var store = {};
    function ipcEventDispatcher(evt) {
        console.debug("IPC EVENT: " + evt.channel, evt.args);
        var maybeCallback = CallbackCache.hasCallback(evt.channel);
        if (maybeCallback) {
            console.debug("dispatching to registered callback");
            maybeCallback.apply(null, evt.args);
        }
        var maybeDispatcher = store[evt.channel];
        if (maybeDispatcher) {
            maybeDispatcher.apply(null, evt.args);
        }
    }
    DispatcherMapping.ipcEventDispatcher = ipcEventDispatcher;
    function set(channel, dispatcher) {
        store[channel] = dispatcher;
    }
    DispatcherMapping.set = set;
})(DispatcherMapping = exports.DispatcherMapping || (exports.DispatcherMapping = {}));
