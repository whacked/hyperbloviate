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
          var while$1 = undefined;
          while (i < miccup.length) {
            while$1 = (function() {
              var hh = miccup[i];
              ((i)++);
              return out.append(jqMiccup(hh));
            }).call(this);
          };
          return while$1;
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