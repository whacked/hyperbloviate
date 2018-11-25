console.log("sibilant from compiled file");
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

  return (function() {
    var out = [];
    seq(coll).forEach((function(x) {
      /* universal.sibilant:103:6 */
    
      return (function() {
        if (fn(x)) {
          return out.push(x);
        }
      }).call(this);
    }));
    return out;
  }).call(this);
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
    var while$2 = undefined;
    while (beg < end) {
      while$2 = (function() {
        out.push(beg);
        return ((beg)++);
      }).call(this);
    };
    return while$2;
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

  return (function() {
    var out = [];
    seq(coll).forEach((function(x) {
      /* universal.sibilant:103:6 */
    
      return (function() {
        if (fn(x)) {
          return out.push(x);
        }
      }).call(this);
    }));
    return out;
  }).call(this);
});
const m = require("mithril"),
    mProp = require("mithril/stream"),
    $ = require("jquery");
var mMiccup = (function mMiccup$(miccup) {
  /* m-miccup miccup.sibilant:7:0 */

  return (function() {
    if (!(Array.isArray(miccup))) {
      return miccup;
    } else if (0 === miccup.length) {
      return miccup;
    } else if (Array.isArray(miccup[0])) {
      return (function() {
        /* miccup.sibilant:16:9 */
      
        var out = [];
        miccup.forEach((function(hh, i) {
          /* miccup.sibilant:18:10 */
        
          return (function() {
            if (0 < hh.length) {
              return out.push(mMiccup(hh));
            }
          }).call(this);
        }));
        return out;
      }).call(this);
    } else {
      return (function() {
        /* miccup.sibilant:23:9 */
      
        var tag = miccup[0],
            maybeAttr = miccup[1],
            hasAttr__QUERY = (typeof maybeAttr === "object" && !(Array.isArray(maybeAttr))),
            attr = (function() {
          if (hasAttr__QUERY) {
            return maybeAttr;
          } else {
            return {  };
          }
        }).call(this),
            remainderStart = (function() {
          if (hasAttr__QUERY) {
            return 2;
          } else {
            return 1;
          }
        }).call(this),
            out = [ tag, attr ];
        miccup.slice(remainderStart).forEach((function(hh, i) {
          /* miccup.sibilant:31:10 */
        
          return out.push(mMiccup(hh));
        }));
        return m.apply(this, out);
      }).call(this);
    }
  }).call(this);
});
var jqMiccup = (function jqMiccup$(miccup) {
  /* jq-miccup miccup.sibilant:35:0 */

  return (function() {
    if ((!(Array.isArray(miccup)) || 0 === miccup.length)) {
      return miccup;
    } else if (Array.isArray(miccup[0])) {
      return (function() {
        var out = [];
        miccup.forEach((function(hh, i) {
          /* miccup.sibilant:44:10 */
        
          return (function() {
            if (0 < hh.length) {
              return out.push(jqMiccup(hh));
            }
          }).call(this);
        }));
        return out;
      }).call(this);
    } else {
      return (function() {
        /* miccup.sibilant:49:9 */
      
        var tag = miccup[0],
            maybeAttr = miccup[1],
            hasAttr__QUERY = (typeof maybeAttr === "object" && !(Array.isArray(maybeAttr))),
            attr = (function() {
          if (hasAttr__QUERY) {
            return maybeAttr;
          } else {
            return {  };
          }
        }).call(this),
            style = (attr.style || {  });
        delete attr.style;
        var out = $((function() {
          if (attr.xmlns) {
            return document.createElementNS(attr.xmlns, tag);
          } else {
            return document.createElement(tag);
          }
        }).call(this)).attr(attr).css(style),
            i = (function() {
          if (hasAttr__QUERY) {
            return 2;
          } else {
            return 1;
          }
        }).call(this);
        (function() {
          var while$3 = undefined;
          while (i < miccup.length) {
            while$3 = (function() {
              var hh = miccup[i];
              ((i)++);
              return out.append(jqMiccup(hh));
            }).call(this);
          };
          return while$3;
        }).call(this);
        return out;
      }).call(this);
    }
  }).call(this);
});
var dom2miccup = (function dom2miccup$(el) {
  /* dom2miccup miccup.sibilant:70:0 */

  return (function() {
    if (!(el)) {
      return el;
    } else if (!(el.tagName)) {
      return el.textContent;
    } else if (true) {
      return (function() {
        /* miccup.sibilant:76:9 */
      
        var rtn = [ el.tagName.toLowerCase(), (function() {
          /* miccup.sibilant:78:20 */
        
          var style = style2object(el.style),
              attr = attr2object(el.attributes);
          (function() {
            if (0 < Object.keys(style).length) {
              return attr.style = style;
            }
          }).call(this);
          return attr;
        }).call(this) ];
        el.childNodes.forEach((function(node, i) {
          /* miccup.sibilant:86:10 */
        
          return rtn.push(dom2miccup(node));
        }));
        return rtn;
      }).call(this);
    }
  }).call(this);
});
exports.mMiccup = mMiccup;
exports.jqMiccup = jqMiccup;
exports.dom2miccup = dom2miccup;
const electron = require("electron"),
    fs = require("fs"),
    path = require("path"),
    sibilant = require("sibilant");
window.Datastore = require("nedb");
var DB = (new Datastore({
  filename: "store.db",
  autoload: true,
  timestampData: true
})),
    db = {
  _store: DB,
  load: (function() {
    /* compiled.sibilant:18:15 */
  
    return DB.findOne({ url: getWebviewUrl() }, (function(err, doc) {
      /* compiled.sibilant:21:17 */
    
      console.log("loaded", doc);
      return (function() {
        if (doc) {
          return doc.clickHistory;
        }
      }).call(this);
    }));
  }),
  save: (function() {
    /* compiled.sibilant:26:15 */
  
    return DB.insert({
      url: getWebviewUrl(),
      "clickHistory": []
    });
  })
},
    jsyaml = require("js-yaml");
var setWebviewUrl = (function setWebviewUrl$() {
  /* set-webview-url compiled.sibilant:33:0 */

  var arglist = Array.prototype.slice.call(arguments),
      wvIdx = (function() {
    if (1 === arglist.length) {
      return 0;
    } else {
      return arglist[0];
    }
  }).call(this),
      url = (function() {
    if (1 === arglist.length) {
      return arglist[0];
    } else {
      return arglist.slice(-1)[0];
    }
  }).call(this);
  return getWebview(wvIdx).setAttribute("src", url);
});
var getWebviewUrl = (function getWebviewUrl$(wvIdx) {
  /* get-webview-url compiled.sibilant:45:0 */

  return getWebview(wvIdx).getAttribute("src");
});
var style2object = (function style2object$(style) {
  /* style2object compiled.sibilant:49:0 */

  var rtn = {  };
  range(style.length).forEach((function(i) {
    /* compiled.sibilant:52:5 */
  
    var key = style[i],
        val = style[key];
    return (function() {
      if (val !== "initial") {
        return rtn[key] = val;
      }
    }).call(this);
  }));
  return rtn;
});
var attr2object = (function attr2object$(attr) {
  /* attr2object compiled.sibilant:59:0 */

  var rtn = {  };
  range(attr.length).forEach((function(i) {
    /* compiled.sibilant:62:5 */
  
    var key = attr[i].name,
        val = attr[key].value;
    return rtn[key] = val;
  }));
  return rtn;
});
var resolveAssetDir = (function resolveAssetDir$(dirname) {
  /* resolve-asset-dir compiled.sibilant:68:0 */

  return path.resolve(path.join(global.__dirname, dirname));
});
var jsyaml = require("js-yaml"),
    __sessionDirPath = resolveAssetDir("session"),
    __handlerDirPath = resolveAssetDir("handler"),
    __pluginDirPath = resolveAssetDir(Conf.PLUGIN_DIR_NAME);
(function() {
  if (!(fs.existsSync(__sessionDirPath))) {
    return fs.mkdirSync(__sessionDirPath);
  }
}).call(this);
var controlState = {
  sessionList: mProp([]),
  handlerMapping: mProp({  }),
  pluginMapping: mProp({  }),
  activeSession: mProp()
};
var WebViewDriver = { exec: (function(channel, arg) {
  /* compiled.sibilant:87:27 */

  var func = WebViewDriver[channel];
  return (function() {
    if (func) {
      return func(arg);
    }
  }).call(this);
}) };
WebViewDriver[Const.WEBVIEW_ELEMENT_CLICK] = (function(js) {
  /* compiled.sibilant:91:5 */

  var asess = controlState.activeSession();
  return (function() {
    if (!(asess)) {
      return alert("no active session");
    } else {
      var locater = JSON.parse(js);
      asess.history.push(locater);
      asess.isDirty = true;
      return controlState.activeSession(asess);
    }
  }).call(this);
});
window.WebViewDriver = WebViewDriver;
var loadAllSessions__BANG = (function loadAllSessions__BANG$() {
  /* load-all-sessions! compiled.sibilant:103:0 */

  return fs.readdir(__sessionDirPath, (function(err, fileList) {
    /* compiled.sibilant:106:6 */
  
    var reYml = (new RegExp("yml$", undefined));
    controlState.sessionList((fileList || []).filter((function(fname) {
      /* compiled.sibilant:110:22 */
    
      return fname.match(reYml);
    })).map((function(fname) {
      /* compiled.sibilant:112:19 */
    
      return (function() {
        /* src/macros/pipe.sibilant:66:9 */
      
        arguments[0].filename = fname;
        return arguments[0];
      })(jsyaml.safeLoad(fs.readFileSync(path.join(__sessionDirPath, fname), "utf-8")));
    })));
    return m.redraw();
  }));
});
var makePluginObject = (function makePluginObject$(desc, init) {
  /* make-plugin-object compiled.sibilant:119:0 */

  return {
    init: init,
    description: desc
  };
});
var compileSibilantPlugin__BANG = (function compileSibilantPlugin__BANG$(pluginSibilantPath) {
  /* compile-sibilant-plugin! compiled.sibilant:123:0 */

  return fs.writeFileSync(path.join(path.dirname(pluginSibilantPath), "index.js"), sibilant.sibilize(fs.readFileSync(pluginSibilantPath, "utf-8")));
});
var loadAllPlugins__BANG = (function loadAllPlugins__BANG$() {
  /* load-all-plugins! compiled.sibilant:133:0 */

  (function() {
    if (!(fs.existsSync(__pluginDirPath))) {
      return fs.mkdirSync(__pluginDirPath);
    }
  }).call(this);
  return fs.readdir(__pluginDirPath, (function(err, fileList) {
    /* compiled.sibilant:138:6 */
  
    var out = {  };
    (fileList || []).forEach((function(pluginName, i) {
      /* compiled.sibilant:140:8 */
    
      var spl = pluginName.split("."),
          getPluginFileRelpath = (function(pluginFile) {
        /* compiled.sibilant:142:43 */
      
        return path.join(__pluginDirPath, pluginName, pluginFile);
      }),
          maybeSibFile = [ "index.sib", "index.sibilant" ].map(getPluginFileRelpath).filter(fs.existsSync)[0],
          startPlugin__BANG = (function() {
        /* compiled.sibilant:152:33 */
      
        return alert(("[OVERRIDE] if you are seeing this message, " + "the plugin was NOT loaded properly"));
      });
      (function() {
        if (maybeSibFile) {
          eval(sibilant.sibilize(fs.readFileSync(maybeSibFile, "utf-8")));
          return out[pluginName] = makePluginObject(pluginInfo.description, startPlugin__BANG);
        }
      }).call(this);
      return (function() {
        if (out[pluginName]) {
          return console.warn(("already loaded: " + pluginName));
        } else if (fs.existsSync(getPluginFileRelpath("index.js"))) {
          var pluginModule = require(("../" + path.join(Conf.PLUGIN_DIR_NAME, pluginName)));
          return out[pluginName] = makePluginObject(pluginModule.info.description, pluginModule.start);
        }
      }).call(this);
    }));
    controlState.pluginMapping(out);
    return m.redraw();
  }));
});
var makeSession = (function makeSession$(url, name) {
  /* make-session compiled.sibilant:189:0 */

  return {
    url: url,
    name: name,
    history: []
  };
});
var uiState = {
  selectedTab: mProp("pluginList"),
  scratchView: mProp()
};
var renderSessionList = (function renderSessionList$(sessionList) {
  /* render-session-list compiled.sibilant:197:0 */

  var asess = controlState.activeSession(),
      tdStyle = {
    border: "1px solid gray",
    padding: "0.5em"
  },
      hdrList = [ [ "history", "# actions", (function(hist) {
    /* compiled.sibilant:207:21 */
  
    return ("" + hist.length + " actions");
  }) ], [ "name" ], [ "url" ], [ "filename" ] ];
  return [ "table", { style: {
    borderCollapse: "collapse",
    border: "1px solid black",
    width: "100%",
    padding: "0.5em"
  } }, [ "tr", mapcar((function(hdr) {
    /* compiled.sibilant:222:15 */
  
    return [ "th", (function() {
      if (typeof "string" === hdr[1]) {
        return hdr[1];
      } else {
        return hdr[0];
      }
    }).call(this) ];
  }), hdrList) ], mapcar((function(sess) {
    /* compiled.sibilant:227:14 */
  
    return [ "tr", {
      style: {
        border: "1px solid gray",
        background: (function() {
          if (sess.filename === maybeGet(asess, "filename")) {
            return "yellow";
          } else {
            return "";
          }
        }).call(this)
      },
      onclick: (function() {
        /* compiled.sibilant:234:27 */
      
        controlState.activeSession(sess);
        return uiState.selectedTab("actionList");
      })
    }, mapcar((function(hdr) {
      /* compiled.sibilant:239:18 */
    
      var key = hdr[0],
          maybeFunc = hdr.slice(-1)[0],
          renderer = (function() {
        if ("function" === typeof maybeFunc) {
          return maybeFunc;
        } else {
          return identity;
        }
      }).call(this);
      return [ "td", { style: tdStyle }, renderer(sess[key]) ];
    }), hdrList) ];
  }), sessionList) ];
});
var actionListItem = (function actionListItem$(locater, i) {
  /* action-list-item compiled.sibilant:251:0 */

  return [ "li", [ "div", (function() {
    /* compiled.sibilant:254:7 */
  
    var asess = controlState.activeSession(),
        curHist = asess.history;
    return [ "button", {
      style: {
        margin: "0.2em",
        width: "1.3em",
        height: "1.3em",
        lineHeight: "1.3em",
        color: "white",
        align: "center",
        textAlign: "center",
        verticalAlign: "middle",
        borderRadius: "3px",
        backgroundColor: "red"
      },
      onclick: (function() {
        /* compiled.sibilant:269:19 */
      
        var head = curHist.slice(0, i),
            tail = curHist.slice((1 + i));
        asess.history = head.concat(tail);
        asess.isDirty = true;
        return controlState.activeSession(asess);
      })
    }, [ "i", { class: "fa fa-times" } ] ];
  }).call(this), [ "button", { onclick: (function() {
    /* compiled.sibilant:277:18 */
  
    var execString = (function() {
      if ((locater.tag === "button" || locater.tag === "a" || (locater.tag === "input" && (locater.type === "submit" || locater.type === "button")))) {
        return ("common.clickSelector('" + locater.selector + "')");
      } else if (true) {
        return ("document.querySelector('" + locater.selector + "').scrollIntoView({behavior: \"smooth\"})");
      } else {
        return null;
      }
    }).call(this);
    return (function() {
      if (execString) {
        return execJs(getWebview(), execString);
      }
    }).call(this);
  }) }, JSON.stringify(locater) ] ] ];
});
var actionListView = (function actionListView$() {
  /* action-list-view compiled.sibilant:299:0 */

  var sess = controlState.activeSession();
  return (function() {
    if (sess) {
      return [ "div", (function() {
        if (sess.name) {
          return [ "h1", sess.name ];
        } else {
          return "";
        }
      }).call(this), [ "hr" ], [ "a", {
        style: {
          margin: "0.2em",
          padding: "0.1em",
          border: "1px solid blue",
          background: "lightblue",
          borderRadius: "4px",
          cursor: "pointer"
        },
        onclick: (function() {
          /* compiled.sibilant:314:21 */
        
          return setWebviewUrl(sess.url);
        })
      }, sess.url ], [ "hr" ], [ "ol", { style: {
        margin: "0.5em",
        padding: "0.5em"
      } }, mapcar(actionListItem, sess.history), (function() {
        if (sess.isDirty) {
          return [ [ "hr" ], [ "button", { onclick: (function() {
            /* compiled.sibilant:324:29 */
          
            delete sess.isDirty;
            var newSessionList = [];
            controlState.sessionList().forEach((function(iterSess) {
              /* compiled.sibilant:327:30 */
            
              return newSessionList.push((function() {
                if (iterSess.filename === sess.filename) {
                  return sess;
                } else {
                  return iterSess;
                }
              }).call(this));
            }));
            controlState.sessionList(newSessionList);
            controlState.activeSession(sess);
            var filepath = path.join(__sessionDirPath, sess.filename);
            return fs.writeFile(filepath, jsyaml.safeDump(sess), (function(err) {
              /* compiled.sibilant:339:31 */
            
              return (function() {
                if (err) {
                  return alert(("file write failed!\n" + err.toString()));
                } else {
                  return console.log(("wrote: " + filepath));
                }
              }).call(this);
            }));
          }) }, "save!" ] ];
        }
      }).call(this) ] ];
    }
  }).call(this);
});
var pluginListView = (function pluginListView$() {
  /* plugin-list-view compiled.sibilant:347:0 */

  var pluginMapping = controlState.pluginMapping(),
      controlElement = document.getElementById("panel-A"),
      viewElement = document.getElementById("panel-B");
  return [ "div", [ "table", { style: {
    margin: "0.5em",
    padding: "0.5em"
  } }, [ "tbody", [ "tr", [ "th", "name" ], [ "th", "description" ] ], mapcar((function(k) {
    /* compiled.sibilant:361:20 */
  
    var initialize__BANG = pluginMapping[k].init;
    return [ "tr", [ "td", [ "button", { onclick: (function() {
      /* compiled.sibilant:366:35 */
    
      initialize__BANG(controlElement, viewElement);
      return webviewControl.attachWebviewEventListeners(0);
    }) }, k ] ], [ "td", pluginMapping[k].description ] ];
  }), Object.keys(pluginMapping)) ] ] ];
});
var ui = {
  controller: (function() {
    /* compiled.sibilant:374:21 */
  
    console.info("in controller");
    return {  };
  }),
  tabDef: {
    savedUrls: {
      label: "saved urls",
      bareState: {
        name: null,
        url: null
      },
      state: mProp({
        name: null,
        url: null
      }),
      render: (function() {
        /* compiled.sibilant:384:40 */
      
        var self = this;
        return [ [ "b", "new session" ], [ "hr" ], [ "div", [ "div", [ "label", [ "input", {
          type: "text",
          placeholder: "url",
          size: 40,
          onchange: (function(evt) {
            /* compiled.sibilant:395:57 */
          
            var curState = self.state();
            curState.url = evt.target.value;
            return self.state(curState);
          })
        } ], "session url" ] ], [ "div", [ "label", [ "input", {
          type: "text",
          placeholder: "name",
          size: 40,
          onchange: (function(evt) {
            /* compiled.sibilant:407:57 */
          
            var curState = self.state();
            curState.name = evt.target.value;
            return self.state(curState);
          })
        } ], "session name (optional)" ] ], [ "div", [ "button", { onclick: (function() {
          /* compiled.sibilant:415:55 */
        
          var lstate = self.state(),
              url = lstate.url,
              name = lstate.name;
          return (function() {
            if ((url && name)) {
              var newSession = makeSession(url, name);
              newSession.filename = ((new Date()).toISOString().substring(0, 10) + "_" + newSession.url.replace((new RegExp("^(.+://)", undefined)), "") + ".yml");
              self.state(self.bareState);
              controlState.sessionList().push(newSession);
              return controlState.activeSession(newSession);
            }
          }).call(this);
        }) }, "start new session" ] ] ], [ "hr" ], [ "b", "sessions:" ], [ "hr" ], renderSessionList(controlState.sessionList()) ];
      })
    },
    actionList: {
      label: "action list",
      render: actionListView
    },
    pluginList: {
      label: "plugin list",
      render: pluginListView
    },
    scratch: {
      label: "scratch",
      render: (function() {
        /* compiled.sibilant:453:37 */
      
        return mMiccup(uiState.scratchView());
      })
    }
  },
  view: (function(ctrl) {
    /* compiled.sibilant:455:15 */
  
    var self = this,
        table = mMiccup([ "div", { style: {
      position: "relative",
      float: "left",
      background: "#444",
      color: "#fff",
      padding: "2px",
      margin: "2px",
      width: "100%",
      height: "100%"
    } }, [ "style", "ul.tab-list { list-style-type: none }", "ul.tab-list li { float: left; border: 1px solid red; margin: 2px; padding: 2px; width: 100px; }", "ul.tab-list li:hover { background: gray; color: black; }", "ul.tab-list li.active { background: white; color: black; }" ], (function() {
      /* compiled.sibilant:474:34 */
    
      return [ "ul.tab-list", {  }, mapcar((function(k, i) {
        /* compiled.sibilant:477:44 */
      
        return [ ("li" + (function() {
          if (k === uiState.selectedTab()) {
            return ".active";
          } else {
            return "";
          }
        }).call(this)), { onclick: (function() {
          /* compiled.sibilant:482:57 */
        
          return uiState.selectedTab(k);
        }) }, self.tabDef[k].label ];
      }), Object.keys(self.tabDef)) ];
    }).call(this), [ "div", { style: { clear: "both" } } ], [ "div", { style: {
      width: "100%",
      height: "100%",
      color: "black",
      background: "white"
    } }, self.tabDef[uiState.selectedTab()].render() ] ]);
    return table;
  })
};
var setupControlContainer__BANG = (function setupControlContainer__BANG$(element) {
  /* setup-control-container! compiled.sibilant:501:0 */

  m.mount(element, ui);
  loadAllSessions__BANG();
  return loadAllPlugins__BANG();
});
exports.setupControlContainer = setupControlContainer__BANG;
exports.db = db;