// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/jquery.dotdotdot.min.js":[function(require,module,exports) {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*
 *	jQuery dotdotdot 1.7.4
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */
!function (t, e) {
  function n(t, e, n) {
    var r = t.children(),
      o = !1;
    t.empty();
    for (var i = 0, d = r.length; d > i; i++) {
      var l = r.eq(i);
      if (t.append(l), n && t.append(n), a(t, e)) {
        l.remove(), o = !0;
        break;
      }
      n && n.detach();
    }
    return o;
  }
  function r(e, n, i, d, l) {
    var s = !1,
      c = "a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",
      u = "script, .dotdotdot-keep";
    return e.contents().detach().each(function () {
      var h = this,
        f = t(h);
      if ("undefined" == typeof h) return !0;
      if (f.is(u)) e.append(f);else {
        if (s) return !0;
        e.append(f), !l || f.is(d.after) || f.find(d.after).length || e[e.is(c) ? "after" : "append"](l), a(i, d) && (s = 3 == h.nodeType ? o(f, n, i, d, l) : r(f, n, i, d, l)), s || l && l.detach();
      }
    }), n.addClass("is-truncated"), s;
  }
  function o(e, n, r, o, d) {
    var c = e[0];
    if (!c) return !1;
    var h = s(c),
      f = -1 !== h.indexOf(" ") ? " " : "　",
      p = "letter" == o.wrap ? "" : f,
      g = h.split(p),
      v = -1,
      w = -1,
      b = 0,
      y = g.length - 1;
    for (o.fallbackToLetter && 0 == b && 0 == y && (p = "", g = h.split(p), y = g.length - 1); y >= b && (0 != b || 0 != y);) {
      var m = Math.floor((b + y) / 2);
      if (m == w) break;
      w = m, l(c, g.slice(0, w + 1).join(p) + o.ellipsis), r.children().each(function () {
        t(this).toggle().toggle();
      }), a(r, o) ? (y = w, o.fallbackToLetter && 0 == b && 0 == y && (p = "", g = g[0].split(p), v = -1, w = -1, b = 0, y = g.length - 1)) : (v = w, b = w);
    }
    if (-1 == v || 1 == g.length && 0 == g[0].length) {
      var x = e.parent();
      e.detach();
      var T = d && d.closest(x).length ? d.length : 0;
      x.contents().length > T ? c = u(x.contents().eq(-1 - T), n) : (c = u(x, n, !0), T || x.detach()), c && (h = i(s(c), o), l(c, h), T && d && t(c).parent().append(d));
    } else h = i(g.slice(0, v + 1).join(p), o), l(c, h);
    return !0;
  }
  function a(t, e) {
    return t.innerHeight() > e.maxHeight;
  }
  function i(e, n) {
    for (; t.inArray(e.slice(-1), n.lastCharacter.remove) > -1;) e = e.slice(0, -1);
    return t.inArray(e.slice(-1), n.lastCharacter.noEllipsis) < 0 && (e += n.ellipsis), e;
  }
  function d(t) {
    return {
      width: t.innerWidth(),
      height: t.innerHeight()
    };
  }
  function l(t, e) {
    t.innerText ? t.innerText = e : t.nodeValue ? t.nodeValue = e : t.textContent && (t.textContent = e);
  }
  function s(t) {
    return t.innerText ? t.innerText : t.nodeValue ? t.nodeValue : t.textContent ? t.textContent : "";
  }
  function c(t) {
    do t = t.previousSibling; while (t && 1 !== t.nodeType && 3 !== t.nodeType);
    return t;
  }
  function u(e, n, r) {
    var o,
      a = e && e[0];
    if (a) {
      if (!r) {
        if (3 === a.nodeType) return a;
        if (t.trim(e.text())) return u(e.contents().last(), n);
      }
      for (o = c(a); !o;) {
        if (e = e.parent(), e.is(n) || !e.length) return !1;
        o = c(e[0]);
      }
      if (o) return u(t(o), n);
    }
    return !1;
  }
  function h(e, n) {
    return e ? "string" == typeof e ? (e = t(e, n), e.length ? e : !1) : e.jquery ? e : !1 : !1;
  }
  function f(t) {
    for (var e = t.innerHeight(), n = ["paddingTop", "paddingBottom"], r = 0, o = n.length; o > r; r++) {
      var a = parseInt(t.css(n[r]), 10);
      isNaN(a) && (a = 0), e -= a;
    }
    return e;
  }
  if (!t.fn.dotdotdot) {
    t.fn.dotdotdot = function (e) {
      if (0 == this.length) return t.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;
      if (this.length > 1) return this.each(function () {
        t(this).dotdotdot(e);
      });
      var o = this,
        i = o.contents();
      o.data("dotdotdot") && o.trigger("destroy.dot"), o.data("dotdotdot-style", o.attr("style") || ""), o.css("word-wrap", "break-word"), "nowrap" === o.css("white-space") && o.css("white-space", "normal"), o.bind_events = function () {
        return o.bind("update.dot", function (e, d) {
          switch (o.removeClass("is-truncated"), e.preventDefault(), e.stopPropagation(), _typeof(l.height)) {
            case "number":
              l.maxHeight = l.height;
              break;
            case "function":
              l.maxHeight = l.height.call(o[0]);
              break;
            default:
              l.maxHeight = f(o);
          }
          l.maxHeight += l.tolerance, "undefined" != typeof d && (("string" == typeof d || "nodeType" in d && 1 === d.nodeType) && (d = t("<div />").append(d).contents()), d instanceof t && (i = d)), g = o.wrapInner('<div class="dotdotdot" />').children(), g.contents().detach().end().append(i.clone(!0)).find("br").replaceWith("  <br />  ").end().css({
            height: "auto",
            width: "auto",
            border: "none",
            padding: 0,
            margin: 0
          });
          var c = !1,
            u = !1;
          return s.afterElement && (c = s.afterElement.clone(!0), c.show(), s.afterElement.detach()), a(g, l) && (u = "children" == l.wrap ? n(g, l, c) : r(g, o, g, l, c)), g.replaceWith(g.contents()), g = null, t.isFunction(l.callback) && l.callback.call(o[0], u, i), s.isTruncated = u, u;
        }).bind("isTruncated.dot", function (t, e) {
          return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], s.isTruncated), s.isTruncated;
        }).bind("originalContent.dot", function (t, e) {
          return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], i), i;
        }).bind("destroy.dot", function (t) {
          t.preventDefault(), t.stopPropagation(), o.unwatch().unbind_events().contents().detach().end().append(i).attr("style", o.data("dotdotdot-style") || "").data("dotdotdot", !1);
        }), o;
      }, o.unbind_events = function () {
        return o.unbind(".dot"), o;
      }, o.watch = function () {
        if (o.unwatch(), "window" == l.watch) {
          var e = t(window),
            n = e.width(),
            r = e.height();
          e.bind("resize.dot" + s.dotId, function () {
            n == e.width() && r == e.height() && l.windowResizeFix || (n = e.width(), r = e.height(), u && clearInterval(u), u = setTimeout(function () {
              o.trigger("update.dot");
            }, 100));
          });
        } else c = d(o), u = setInterval(function () {
          if (o.is(":visible")) {
            var t = d(o);
            (c.width != t.width || c.height != t.height) && (o.trigger("update.dot"), c = t);
          }
        }, 500);
        return o;
      }, o.unwatch = function () {
        return t(window).unbind("resize.dot" + s.dotId), u && clearInterval(u), o;
      };
      var l = t.extend(!0, {}, t.fn.dotdotdot.defaults, e),
        s = {},
        c = {},
        u = null,
        g = null;
      return l.lastCharacter.remove instanceof Array || (l.lastCharacter.remove = t.fn.dotdotdot.defaultArrays.lastCharacter.remove), l.lastCharacter.noEllipsis instanceof Array || (l.lastCharacter.noEllipsis = t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), s.afterElement = h(l.after, o), s.isTruncated = !1, s.dotId = p++, o.data("dotdotdot", !0).bind_events().trigger("update.dot"), l.watch && o.watch(), o;
    }, t.fn.dotdotdot.defaults = {
      ellipsis: "... ",
      wrap: "word",
      fallbackToLetter: !0,
      lastCharacter: {},
      tolerance: 0,
      callback: null,
      after: null,
      height: null,
      watch: !1,
      windowResizeFix: !0
    }, t.fn.dotdotdot.defaultArrays = {
      lastCharacter: {
        remove: [" ", "　", ",", ";", ".", "!", "?"],
        noEllipsis: []
      }
    }, t.fn.dotdotdot.debug = function (t) {};
    var p = 1,
      g = t.fn.html;
    t.fn.html = function (n) {
      return n != e && !t.isFunction(n) && this.data("dotdotdot") ? this.trigger("update", [n]) : g.apply(this, arguments);
    };
    var v = t.fn.text;
    t.fn.text = function (n) {
      return n != e && !t.isFunction(n) && this.data("dotdotdot") ? (n = t("<div />").text(n).html(), this.trigger("update", [n])) : v.apply(this, arguments);
    };
  }
}(jQuery);
},{}],"../../../Users/ahchj/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51463" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../Users/ahchj/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/jquery.dotdotdot.min.js"], null)
//# sourceMappingURL=/jquery.dotdotdot.min.499735e5.js.map