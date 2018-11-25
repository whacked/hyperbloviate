var identity = (function identity$(x) {
  /* identity universal.sibilant:2:0 */

  return x;
});
var maybeGet = (function maybeGet$(obj, attr) {
  /* maybe-get universal.sibilant:4:0 */

  return (function() {
    if (obj) {
      return obj[attr];
    } else {
      return null;
    }
  }).call(this);
});
var mapcar = (function mapcar$(func, list) {
  /* mapcar universal.sibilant:9:0 */

  var rtn = [];
  list.forEach((function(o, i) {
    /* universal.sibilant:11:5 */
  
    return rtn.push(func(o, i));
  }));
  return rtn;
});
var merge = (function merge$() {
  /* merge universal.sibilant:15:0 */

  return Object.assign.apply(null, (function() {
    /* src/macros/pipe.sibilant:66:9 */
  
    arguments[0].unshift({  });
    return arguments[0];
  })(Array.prototype.slice.call(arguments)));
});
var range = (function range$() {
  /* range universal.sibilant:20:0 */

  var arglist = Array.prototype.slice.call(arguments),
      beg = (function() {
    if (2 === arglist.length) {
      return arglist[0];
    } else {
      return 0;
    }
  }).call(this),
      end = (function() {
    if (2 === arglist.length) {
      return arglist[1];
    } else {
      return arglist[0];
    }
  }).call(this),
      out = [];
  (function() {
    var while$1 = undefined;
    while (beg < end) {
      while$1 = (function() {
        out.push(beg);
        return ((beg)++);
      }).call(this);
    };
    return while$1;
  }).call(this);
  return out;
});
var seq = (function seq$(x) {
  /* seq universal.sibilant:36:0 */

  return Array.prototype.slice.call(x);
});
var trim = (function trim$(s) {
  /* trim universal.sibilant:39:0 */

  return s.replace((new RegExp((new RegExp("^\\s*", undefined)), undefined)), "").replace((new RegExp((new RegExp("\\s*$", undefined)), undefined)), "");
});
var deepCopy = (function deepCopy$(obj) {
  /* deep-copy universal.sibilant:44:0 */

  return JSON.parse(JSON.stringify(obj));
});
var drillGet = (function drillGet$(gettable, path) {
  /* drill-get universal.sibilant:49:0 */

  return (function() {
    if (0 === path.length) {
      return gettable;
    } else {
      return (function() {
        /* universal.sibilant:51:9 */
      
        var key = path[0],
            remain = path.slice(1);
        return (function() {
          if ((gettable && "object" === typeof gettable && "Array" === gettable.constructor.name)) {
            return (function() {
              if ((key && "object" === typeof key && "Array" === key.constructor.name)) {
                return (function() {
                  /* universal.sibilant:56:18 */
                
                  var out = [];
                  (function() {
                    if (0 === key.length) {
                      return range(gettable.length);
                    } else {
                      return key;
                    }
                  }).call(this).forEach((function(i) {
                    /* universal.sibilant:58:19 */
                  
                    return out.push(drillGet(gettable[i], remain));
                  }));
                  return out;
                }).call(this);
              } else {
                return drillGet(gettable[key], remain);
              }
            }).call(this);
          } else if (("object" === typeof gettable && gettable !== null && gettable.constructor.name !== "Array")) {
            return (function() {
              if ((key && "object" === typeof key && "Array" === key.constructor.name)) {
                return (function() {
                  /* universal.sibilant:68:18 */
                
                  var out = {  };
                  (function() {
                    if (0 === key.length) {
                      return Object.keys(gettable);
                    } else {
                      return key;
                    }
                  }).call(this).forEach((function(k) {
                    /* universal.sibilant:70:19 */
                  
                    return out[k] = drillGet(gettable[k], remain);
                  }));
                  return out;
                }).call(this);
              } else {
                return drillGet(gettable[key], remain);
              }
            }).call(this);
          } else {
            return gettable;
          }
        }).call(this);
      }).call(this);
    }
  }).call(this);
});
var deEmptify = (function deEmptify$(arr) {
  /* de-emptify universal.sibilant:85:0 */

  return (function() {
    if (!((arr && "object" === typeof arr && "Array" === arr.constructor.name))) {
      return arr;
    } else {
      return (function() {
        /* universal.sibilant:90:9 */
      
        var out = [];
        arr.forEach((function(el) {
          /* universal.sibilant:92:10 */
        
          var processedEl = deEmptify(el);
          return (function() {
            if (!(0 === processedEl.length)) {
              return out.push(processedEl);
            }
          }).call(this);
        }));
        return (function() {
          if (1 === out.length) {
            return out[0];
          } else {
            return out;
          }
        }).call(this);
      }).call(this);
    }
  }).call(this);
});
var filter = (function filter$(fn, coll) {
  /* filter universal.sibilant:100:0 */

  return withReturnVar(out, [], seq(coll).forEach((function(x) {
    /* universal.sibilant:103:6 */
  
    return (function() {
      if (fn(x)) {
        return out.push(x);
      }
    }).call(this);
  })));
});
var Const = {
  "WEBVIEW_ELEMENT_CLICK": "webview-element-click",
  "WEBVIEW_EVENT_CHANNEL": "chn-webview"
};
var Conf = {
  "OUTPUT_EVAL": true,
  "PLUGIN_DIR_NAME": "plugin"
};
exports.Const = Const;
exports.Conf = Conf;
var require_CssSelectorGenerator = require("css-selector-generator"),
    CssSelectorGenerator = require_CssSelectorGenerator.CssSelectorGenerator,
    requireElectron = require("electron"),
    ipcRenderer = requireElectron.ipcRenderer;
var exports = {  };
module.exports = exports;
var resolveAssetDir = (function resolveAssetDir$(dirname) {
  /* resolve-asset-dir common.sibilant:14:0 */

  return path.resolve(path.join(global.__dirname, dirname));
});
var flashElement = (function flashElement$(el, duration, interval) {
  /* flash-element common.sibilant:18:0 */

  var overlay = document.createElement("div"),
      elBbox = el.getBoundingClientRect(),
      borderSize = 2,
      paddingSize = 2,
      x = (elBbox.left - paddingSize),
      y = (elBbox.top - paddingSize),
      w = ((elBbox.right - elBbox.left) + (2 * paddingSize)),
      h = ((elBbox.bottom - elBbox.top) + (2 * paddingSize));
  overlay.setAttribute("style", ("position:absolute;" + "z-index:9999;" + "left:" + x + "px;" + "top:" + y + "px;" + "width:" + w + "px;" + "height:" + h + "px;" + "outline:" + "blue" + " dashed " + borderSize + "px;" + "background: #ccf;" + "opacity: 0.5;" + "filter: alpha(opacity=0.5);"));
  document.body.appendChild(overlay);
  var hlOutline = "#f00 solid 4px",
      origOutline = el.style.outline,
      t0 = (new Date()),
      toggleCounter = 0;
  var tid = setInterval((function() {
    /* common.sibilant:47:15 */
  
    (function() {
      if (duration < ((new Date()) - t0)) {
        return (function() {
          /* common.sibilant:49:20 */
        
          clearInterval(tid);
          el.style.outline = origOutline;
          return document.body.removeChild(overlay);
        }).call(this);
      } else {
        return (function() {
          /* common.sibilant:53:20 */
        
          return el.style.outline = (function() {
            if (0 === (toggleCounter % 2)) {
              return origOutline;
            } else {
              return hlOutline;
            }
          }).call(this);
        }).call(this);
      }
    }).call(this);
    return ((toggleCounter)++);
  }), interval);
  return tid;
});
exports.clickSelector = (function(selector) {
  /* common.sibilant:62:20 */

  var el = document.querySelector(selector);
  return (function() {
    if ((el && el.click)) {
      flashElement(el, 500, 100);
      return setTimeout((function() {
        /* common.sibilant:67:29 */
      
        return console.log("CLICKY...", el.click());
      }), 3000);
    }
  }).call(this);
});
exports.fireEventOn = (function(selector, etype) {
  /* common.sibilant:72:18 */

  var el = document.querySelector(selector);
  return (function() {
    if (el.fireEvent) {
      return el.fireEvent(("on" + etype));
    } else {
      return (function() {
        /* common.sibilant:76:24 */
      
        return el.dispatchEvent((function() {
          /* src/macros/pipe.sibilant:66:9 */
        
          arguments[0].initEvent(etype, true, false);
          return arguments[0];
        })(document.createEvent("Events")));
      }).call(this);
    }
  }).call(this);
});
exports.procRightClick = (function(evt) {
  /* common.sibilant:80:21 */

  var csg = (new CssSelectorGenerator()),
      tgt = evt.target;
  flashElement(tgt, 600, 100);
  return ipcRenderer.sendToHost(Const.WEBVIEW_ELEMENT_CLICK, JSON.stringify({
    x: evt.clientX,
    y: evt.clientY,
    tag: evt.target.tagName.toLowerCase(),
    type: (function() {
      /* common.sibilant:90:32 */
    
      var type = maybeGet(evt.target, "type");
      return (function() {
        if (type) {
          return type.toLowerCase();
        }
      }).call(this);
    }).call(this),
    selector: csg.getSelector(tgt)
  }));
});