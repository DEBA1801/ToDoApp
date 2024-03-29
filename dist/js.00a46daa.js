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
})({"js/storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveToStore = exports.getFromStore = void 0;
const saveToStore = function ({
  shoppingList,
  completedList
}) {
  window.localStorage.setItem("shoppingApp_active", JSON.stringify(shoppingList));
  window.localStorage.setItem("shoppingApp_completed", JSON.stringify(completedList));
};
exports.saveToStore = saveToStore;
const getFromStore = function () {
  const getActive = window.localStorage.getItem("shoppingApp_active");
  const getCompleted = window.localStorage.getItem("shoppingApp_completed");
  console.log(getActive, getCompleted);
  return {
    active: getActive ? JSON.parse(getActive) : [],
    completed: getCompleted ? JSON.parse(getCompleted) : []
  };
};
exports.getFromStore = getFromStore;
},{}],"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPriority = exports.removeItem = exports.getShoppingList = exports.getCompletedList = exports.clearCompleted = exports.bootUp = exports.addToShoppingList = exports.addToCompletedList = void 0;
var _storage = require("./storage");
let shoppingList = [];
let completedList = [];
const addToShoppingList = item => {
  const itemID = `${parseInt(Math.random() * 100000000)} - ${new Date().getTime()}`;
  shoppingList.push({
    id: itemID,
    item,
    priority: "normal"
  });
  (0, _storage.saveToStore)({
    shoppingList,
    completedList
  });
};
exports.addToShoppingList = addToShoppingList;
const setPriority = (itemID, priority) => {
  shoppingList = shoppingList.map(item => {
    if (item.id === itemID) {
      return {
        ...item,
        priority
      };
    }
    return item;
  });
  (0, _storage.saveToStore)({
    shoppingList,
    completedList
  });
};
exports.setPriority = setPriority;
const removeItem = itemID => {
  shoppingList = shoppingList.filter(({
    id
  }) => id !== itemID);
  (0, _storage.saveToStore)({
    shoppingList,
    completedList
  });
};
exports.removeItem = removeItem;
const getShoppingList = () => shoppingList;
exports.getShoppingList = getShoppingList;
const addToCompletedList = itemID => {
  const getItem = shoppingList.find(({
    id
  }) => id === itemID);
  shoppingList = shoppingList.filter(({
    id
  }) => id !== itemID);
  completedList = [getItem, ...completedList];
  (0, _storage.saveToStore)({
    shoppingList,
    completedList
  });
};
exports.addToCompletedList = addToCompletedList;
const getCompletedList = () => completedList;
exports.getCompletedList = getCompletedList;
const clearCompleted = () => {
  completedList = [];
  (0, _storage.saveToStore)({
    shoppingList,
    completedList
  });
};
exports.clearCompleted = clearCompleted;
const bootUp = () => {
  const {
    active,
    completed
  } = (0, _storage.getFromStore)();
  shoppingList = active;
  completedList = completed;
};
exports.bootUp = bootUp;
},{"./storage":"js/storage.js"}],"js/item.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Item = (title, priority = normal, id) => {
  return `<div class="item ${priority}" data-id="${id}" draggable="true">
    <div class="task">${title}</div>
    <div class="priority-control">
      <span class="high"></span>
      <span class="normal"></span>
      <span class="low"></span>
    </div>
    <div class="remove-btn">REMOVE</div>
  </div>`;
};
var _default = exports.default = Item;
},{}],"js/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderShoppingList = exports.renderCompletedList = void 0;
var _item = _interopRequireDefault(require("./item"));
var _model = require("./model");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const shoppingListDiv = document.querySelector(".shopping-list");
const completedListDiv = document.querySelector(".completed");
const renderShoppingList = () => {
  const domNodes = (0, _model.getShoppingList)().map(({
    item,
    priority,
    id
  }) => {
    return (0, _item.default)(item, priority, id);
  });
  shoppingListDiv.innerHTML = domNodes.join("");
};
exports.renderShoppingList = renderShoppingList;
const renderCompletedList = () => {
  const domNodes = (0, _model.getCompletedList)().map(({
    item,
    priority,
    id
  }) => {
    return (0, _item.default)(item, priority, id);
  });
  completedListDiv.innerHTML = domNodes.join("");
};
exports.renderCompletedList = renderCompletedList;
},{"./item":"js/item.js","./model":"js/model.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _model = require("./model");
var _view = require("./view");
const itemInput = document.querySelector("input[name='itemInput']");
const shoppingListDiv = document.querySelector(".shopping-list");
const completedDiv = document.querySelector(".completed");
const clearCompletedBtn = document.querySelector("#clear-completed");
itemInput.addEventListener("keyup", function (evt) {
  if (evt.key === "Enter") {
    // Add to shopping list
    (0, _model.addToShoppingList)(this.value);
    // Update the view
    (0, _view.renderShoppingList)();
    //clear input field on pressing enter
    this.value = "";
  }
});
shoppingListDiv.addEventListener("click", function (evt) {
  //priority
  if (evt.target.parentElement.classList.contains("priority-control")) {
    const priority = evt.target.classList.value;
    const itemID = evt.target.parentElement.parentElement.getAttribute("data-id");

    //Set Priority
    (0, _model.setPriority)(itemID, priority);

    //Render View
    (0, _view.renderShoppingList)();
  }
  if (evt.target.classList.contains("remove-btn")) {
    const itemID = evt.target.parentElement.getAttribute("data-id");
    const confirm = window.confirm("Do you really want to delete this item?");
    if (confirm) {
      (0, _model.removeItem)(itemID);
      (0, _view.renderShoppingList)();
    }
  }

  // Remove button
  if (evt.target.classList.contains("remove-btn")) {
    const itemID = evt.target.parentElement.getAttribute("data-id");
    //if the item is deleted, update the view
    if ((0, _model.removeItem)(itemID)) {
      (0, _view.renderShoppingList)();
    }
  }
});
shoppingListDiv.addEventListener("dragstart", function (evt) {
  if (evt.target.classList.contains("item")) {
    const getId = evt.target.getAttribute("data-id");
    evt.dataTransfer.setData("text/plain", getId);
  }
});
completedDiv.addEventListener("drop", function (evt) {
  const itemID = evt.dataTransfer.getData("text/plain");
  if (itemID) {
    //Add to completed list
    (0, _model.addToCompletedList)(itemID);
    //update shopping list
    (0, _view.renderShoppingList)();
    //update completed task list
    (0, _view.renderCompletedList)();
  }
});
completedDiv.addEventListener("dragover", function (evt) {
  evt.preventDefault();
});
clearCompletedBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  (0, _model.clearCompleted)();
  (0, _view.renderCompletedList)();
});

//Immediately invoked function expressions (IIFE)
(() => {
  (0, _model.bootUp)();
  (0, _view.renderShoppingList)();
  (0, _view.renderCompletedList)();
})();
},{"./model":"js/model.js","./view":"js/view.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55604" + '/');
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map