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
})({"js/jquery.slidey.js":[function(require,module,exports) {
/* global jQuery: false, console: false */
/* jshint undef: true, unused: false */
/*! jQuery Bootstrap Slidey - v0.0.1 - 2016-01-11
 * http://www.tahapaksu.com
 * Copyright (c) 2016 Taha PAKSU; Licensed  */
(function ($) {
  $.slidey = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    // Add a reverse reference to the DOM object
    base.$el.data("slidey", base);
    // define slider specific variables
    base.slides = [];
    base.layout = {};
    base.activeSlideIndex = -1;
    base.timer = 0;
    base.hfr = 0;
    base.init = function () {
      base.options = $.extend({}, $.slidey.defaultOptions, options);
      // Put your initialization code here
      base.fetchSlides();
      base.constructLayout();
      base.showLoading();
      base.hideLoading();
      base.gotoSlide(2);
      base.startSliding();
    };
    base.fetchSlides = function () {
      if (base.$el.find("ul").size() > 0) {
        base.$el.find("ul").first().children("li").each(function () {
          var slide = {},
            $this = $(this);
          slide.image = $this.find("img").size() > 0 ? $this.find("img").first().attr("src") : -1;
          if (slide.image === -1) {
            throw "Structure error: item has no img tag.";
          }
          slide.title = $this.find("p.title").size() > 0 ? $this.find("p.title").first().html() : "";
          slide.description = $this.find("p.description").size() > 0 ? $this.find("p.description").first().html() : "";
          base.slides.push(slide);
        });
      }
    };
    base.constructLayout = function () {
      // hide the container first.
      base.$el.hide();
      // build new structure
      var domdocument = "";
      if (base.options.showList) {
        domdocument += "<div class='slidey-row row'><div class='slidey-image col-md-8'><div class='slidey-overlay'>";
      } else {
        domdocument += "<div class='slidey-row row'><div class='slidey-image col-md-12'><div class='slidey-overlay'>";
      }
      domdocument += "<p class='slidey-overlay-title'></p><p class='slidey-overlay-description'></p>";
      domdocument += "<span class='slidey-progress'></span>";
      domdocument += "</div></div><div class='slidey-list col-md-4'></div></div>";
      // append new structure
      base.$el.empty().append(domdocument);
      // set dom node links
      base.layout.$row = base.$el.find(".slidey-row").first();
      base.layout.$image = base.$el.find(".slidey-image").first();
      base.layout.$list = base.$el.find(".slidey-list").first();
      base.layout.overlay = {};
      base.layout.overlay.progressWidth = -1;
      base.layout.$overlay = base.$el.find(".slidey-overlay").first();
      base.layout.overlay.$title = base.$el.find(".slidey-overlay-title").first();
      base.layout.overlay.$description = base.$el.find(".slidey-overlay-description").first();
      base.layout.overlay.$progress = base.$el.find(".slidey-progress").first();

      // create controls
      var controls = "<div class='slidey-controls slidey-controls-previous'><i class='fa fa-chevron-left'></i></div>";
      controls += "<div class='slidey-controls slidey-controls-next'><i class='fa fa-chevron-right'></i></div>";
      base.layout.$image.append(controls);

      // create list items
      var $list = $("<ul></ul>");
      base.layout.$list.append($list);
      for (var slideIndex = 0; slideIndex < base.slides.length; slideIndex++) {
        var $li = $("<li></li>");
        var elements = "<table class='slidey-list-table'><tr>";
        elements += "<td rowspan='2' class='slidey-list-thumbnail-container'>";
        elements += "<div class='slidey-list-thumbnail' style='background-image: url(\"" + base.slides[slideIndex].image + "\")'>";
        elements += "</td><td class='slidey-list-title'>" + base.slides[slideIndex].title + "</td>";
        elements += "</tr><tr>";
        elements += "<td class='slidey-list-description'>" + base.slides[slideIndex].description + "</td>";
        elements += "</tr></table>";
        $li.append(elements);
        $list.append($li);
      }
      // hide list when defined as not to show
      if (base.options.showList === false) {
        base.layout.$list.hide();
      }
      // show the slidey
      base.$el.show();

      // calculate list item heights
      var sliderHeight = base.layout.$image.innerHeight();
      var oneSlideListItemHeight = parseInt(sliderHeight) / base.options.listCount;

      // set list item thumbnail dimensions
      var thumbWidth = oneSlideListItemHeight - 9;
      base.layout.$list.find(".slidey-list-thumbnail").css("width", thumbWidth).css("height", thumbWidth);
      base.addEventListeners();

      // set list item heights
      base.layout.$list.find("li").each(function () {
        var $this = $(this);
        var spaceBetweenSlides = $this.outerHeight() - $this.innerHeight();
        $this.height(oneSlideListItemHeight - spaceBetweenSlides);
        var $description = $(".slidey-list-description", $this);
        $description.width($this.innerWidth() - $(".slidey-list-thumbnail-container", $this).width());
        $description.height($this.height() - $(".slidey-list-title").height());
        $description.css("display", "block");
      });

      // add nodes if required
      base.prepareNodes();
    };
    base.addEventListeners = function () {
      base.layout.$list.on("click", "li", function () {
        base.gotoSlide(base.layout.$list.find("li").index($(this)));
      });
      base.layout.$image.on("click", ".slidey-controls-previous", function () {
        base.stopTimer();
        base.slidePrevious();
      });
      base.layout.$image.on("click", ".slidey-controls-next", function () {
        base.stopTimer();
        base.slideNext();
      });
    };
    base.showLoading = function () {};
    base.hideLoading = function () {};
    base.startSliding = function () {
      base.gotoSlide(0);
    };
    base.startTimer = function () {
      base.timer = setTimeout(base.slideNext, base.options.interval);
      base.layout.overlay.$progress.stop(true, true).css("width", "0");
      base.layout.overlay.$progress.animate({
        width: base.layout.overlay.progressWidth + "px"
      }, base.options.interval);
    };
    base.stopTimer = function () {
      clearTimeout(base.timer);
      base.layout.overlay.$progress.stop();
      base.layout.$overlay.stop();
      if (base.layout.overlay.progressWidth === -1) {
        base.layout.overlay.progressWidth = base.layout.overlay.$progress.originalWidth();
      }
    };
    base.slideNext = function () {
      base.gotoSlide(base.activeSlideIndex + 1);
    };
    base.slidePrevious = function () {
      base.gotoSlide(base.activeSlideIndex - 1);
    };
    base.gotoSlide = function (slideIndex) {
      if (slideIndex < 0) {
        slideIndex = base.slides.length - 1;
      } else if (slideIndex >= base.slides.length) {
        slideIndex = 0;
      }
      base.activeSlideIndex = slideIndex;
      base.stopTimer();
      if (base.options.showList) {
        base.layout.$list.find("li").eq(slideIndex).scrollToView(".slidey-list", base.options.listCount);
      }
      base.layout.$overlay.fadeOut("fast", function () {
        if (base.options.showList) {
          base.layout.$list.find("li").removeClass("slidey-active");
          base.layout.$list.find("li").eq(slideIndex).addClass("slidey-active");
        }
        base.layout.$image.css("background-image", "url(" + base.slides[slideIndex].image + ")");
        base.layout.overlay.$title.empty().append(base.slides[slideIndex].title);
        base.layout.overlay.$description.empty().append(base.slides[slideIndex].description);
        base.layout.$overlay.fadeIn("fast");
        base.selectNode(slideIndex);
        base.startTimer();
      });
    };
    base.prepareNodes = function () {
      if (base.options.showNodes) {
        if (base.options.nodeContainer !== "" && $(base.options.nodeContainer).size() > 0) {
          base.layout.$nodeContainer = $(base.options.nodeContainer);
          var $nodebase = $("<div class='slidey-node-container'></ul>");
          for (var slideIndex = 0; slideIndex < base.slides.length; slideIndex++) {
            var node = "<div class='slidey-node' style='background-image: url(\"" + base.slides[slideIndex].image + "\");'></div>";
            $nodebase.append(node);
          }
          base.layout.$nodeContainer.empty().append($nodebase);
          $(".slidey-node", base.layout.$nodeContainer).on("click", function () {
            base.gotoSlide(base.layout.$nodeContainer.find(".slidey-node").index($(this)));
          });
        }
      }
    };
    base.selectNode = function (nodeIndex) {
      if (base.options.showNodes) {
        if (base.options.nodeContainer !== "" && $(base.options.nodeContainer).size() > 0) {
          var $nodes = base.layout.$nodeContainer.find(".slidey-node");
          $nodes.removeClass("active");
          $nodes.eq(nodeIndex).addClass("active");
        }
      }
    };
    // Run initializer
    base.init();
  };
  $.slidey.defaultOptions = {
    interval: 3000,
    listCount: 5,
    showList: true,
    showNodes: false,
    nodeContainer: ""
  };
  $.fn.slidey = function (options) {
    return this.each(function () {
      new $.slidey(this, options);
    });
  };
  $.fn.scrollToView = function (parentSelector, listCount) {
    var $this = $(this);
    var $parent = $this.parents(parentSelector).first();
    var itemIndex = $this.parent().find("li").index($this.get(0));
    if ($parent) {
      if (itemIndex >= listCount) {
        var $itemToHide = $this.parent().find("li").eq(itemIndex - listCount);
        $parent.stop().animate({
          scrollTop: $itemToHide.position().top + $itemToHide.originalHeight() + 2
        }, '300', 'swing');
      } else {
        $parent.stop().animate({
          scrollTop: 0
        }, '300', 'swing');
      }
    }
  };
  $.fn.originalWidth = function () {
    var domElement = $(this)[0];
    if (typeof domElement !== "undefined") {
      return domElement.getBoundingClientRect().width;
    } else {
      return null;
    }
  };
  $.fn.originalHeight = function () {
    var domElement = $(this)[0];
    if (typeof domElement !== "undefined") {
      return domElement.getBoundingClientRect().height;
    } else {
      return null;
    }
  };
})(jQuery);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50357" + '/');
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
},{}]},{},["../../../Users/ahchj/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/jquery.slidey.js"], null)
//# sourceMappingURL=/jquery.slidey.a29d2d7d.js.map