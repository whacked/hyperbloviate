export namespace CallbackCache {
    var store = {};

    export function register(channel, func) {
        store[channel] = function (arg) {
            console.debug("removing callback ...");
            store[channel] = null;
            console.debug("calling callback ...");
            func(arg);
        }
    }

    export function hasCallback(channel) {
        return store[channel];
    }
}

export namespace DispatcherMapping {

    var store = {};

    export function ipcEventDispatcher(evt) {
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

    export function set(channel, dispatcher) {
        store[channel] = dispatcher;
    }
}
