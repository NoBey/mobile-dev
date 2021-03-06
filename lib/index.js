(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wrap = __webpack_require__(4);

var _wrap2 = _interopRequireDefault(_wrap);

var _navigation = __webpack_require__(11);

var _navigation2 = _interopRequireDefault(_navigation);

__webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(2);

window.oldLog = window.console;

var MDev = function (_React$Component) {
  _inherits(MDev, _React$Component);

  function MDev(props) {
    _classCallCheck(this, MDev);

    var _this = _possibleConstructorReturn(this, (MDev.__proto__ || Object.getPrototypeOf(MDev)).call(this, props));

    _this.state = {
      show: false,
      logList: {
        log: [],
        info: [],
        warn: []
      }
    };
    var logList = _this.state.logList;

    window.console = {
      log: function log(l) {
        logList.log.push(l);
        _this.setState({ logList: logList });
        return oldLog.log(l);
      },
      error: function error(l) {
        return oldLog.error(l);
      }
    };
    return _this;
  }

  _createClass(MDev, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          show = _state.show,
          logList = _state.logList;

      return React.createElement(
        'div',
        this.props,
        show ? React.createElement(_navigation2.default, { logList: logList, close: function close() {
            return _this2.setState({ show: false });
          } }) : React.createElement(_wrap2.default, { show: function show() {
            return _this2.setState({ show: true });
          } }),
        this.props.children
      );
    }
  }]);

  return MDev;
}(React.Component);

MDev.defaultProps = {
  // show  : true,
};

module.exports = MDev;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wrap = __webpack_require__(5);

var _wrap2 = _interopRequireDefault(_wrap);

var _svg = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(2);
// import fa from './font-awesome.css'
// import ReactSVG from 'react-svg';

var MDevWrap = function (_React$Component) {
    _inherits(MDevWrap, _React$Component);

    function MDevWrap(props) {
        _classCallCheck(this, MDevWrap);

        var _this = _possibleConstructorReturn(this, (MDevWrap.__proto__ || Object.getPrototypeOf(MDevWrap)).call(this, props));

        _this.state = {
            top: '0', //触摸按钮初始位置（距离左边顶部的位置）
            left: '0',
            startX: '', //触摸按钮初始的坐标
            startY: '',
            x: 0, //记录触摸按钮触摸后有无变化
            y: 0,
            height: document.documentElement.clientHeight, //屏幕可视宽高
            width: document.documentElement.clientWidth,
            px: 0,
            py: 0
        };
        return _this;
    }

    _createClass(MDevWrap, [{
        key: 'handleStart',
        value: function handleStart(e) {
            e.preventDefault();
            var _state = this.state,
                top = _state.top,
                left = _state.left; //取得初始坐标和屏幕可视宽高
            //前面原生js用的是touches,其实还有一个targetTouches，在这两个的输出结果是一致的。

            this.setState({ //当触摸开始时候，记录当时的坐标值，还有设置触摸变化的xy轴的变化为0，因为当新一轮触摸开始时候，必须重新设置，相当于初始化
                startX: e.targetTouches[0].clientX,
                startY: e.targetTouches[0].clientY,
                x: 0,
                y: 0,
                px: e.targetTouches[0].clientX - left,
                py: e.targetTouches[0].clientY - top
            });
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(e) {
            var _state2 = this.state,
                startX = _state2.startX,
                startY = _state2.startY,
                width = _state2.width,
                height = _state2.height,
                px = _state2.px,
                py = _state2.py; //取得初始坐标和屏幕可视宽高

            var left = parseInt(e.touches[0].clientX) - 48 <= 0 || parseInt(e.touches[0].clientX) >= width - 48 ? parseInt(e.touches[0].clientX) - 48 <= 0 ? 0 : width - 48 : parseInt(e.touches[0].clientX);
            var top = parseInt(e.touches[0].clientY) - 48 <= 0 || parseInt(e.touches[0].clientY) >= height - 48 ? parseInt(e.touches[0].clientY) - 48 <= 0 ? 0 : height - 48 : parseInt(e.touches[0].clientY);
            this.setState({
                //设置当前的坐标位置，思路和上面原生的一样，不过由于react有实时变化的状态机state，所以在此用touches，targetTouches
                //都可以来设置实时变化的值，不用用到changedTouches；
                x: e.touches[0].clientX - startX, //当前触摸点-初始坐标取得实时变化值
                y: e.touches[0].clientY - startY,
                left: left - px,
                top: top - py
            });
        }
    }, {
        key: 'handleTouchEnd',
        value: function handleTouchEnd(e) {
            var _state3 = this.state,
                x = _state3.x,
                y = _state3.y;

            if (x == 0 && y == 0) {//触摸结束后，判断实时变化值有没变化，没变化则视为点击事件。
                // window.location.href = '#';
                //  this.props.show()

            };
        }
    }, {
        key: 'open',
        value: function open(e) {
            e.preventDefault();
            this.refs.MDev.classList.toggle(_wrap2.default.open);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state4 = this.state,
                top = _state4.top,
                left = _state4.left,
                height = _state4.height,
                width = _state4.width; //取得实时状态机state的值

            var fa = {};
            return React.createElement(
                'div',
                { style: {
                        top: top,
                        left: left
                    }, ref: 'MDev', className: _wrap2.default.MDev, onTouchStart: this.handleStart.bind(this), onTouchMove: this.handleTouchMove.bind(this), onTouchEnd: this.handleTouchEnd.bind(this) },
                this.props.children,
                React.createElement(
                    'div',
                    { className: _wrap2.default.ring },
                    [_svg.about, _svg.device, _svg.log, _svg.wechat, _svg.about, _svg.device, _svg.log, _svg.wechat].map(function (svg, i) {
                        return React.createElement(
                            'a',
                            { href: '#', key: i, style: {
                                    left: (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / 8) * i * Math.PI)).toFixed(4) + "%",
                                    top: (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / 8) * i * Math.PI)).toFixed(4) + "%"
                                }, className: '' + _wrap2.default.menuItem },
                            svg
                        );
                    })
                ),
                React.createElement(
                    'div',
                    { ref: 'center', onTouchStart: this.open.bind(this), className: '' + _wrap2.default.center },
                    _svg.menu
                )
            );
        }
    }]);

    return MDevWrap;
}(React.Component);

module.exports = MDevWrap;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?modules!./wrap.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?modules!./wrap.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@charset \"utf-8\";\n\n/*.MDev{\n  width: 300px;\n  height: 300px;\n  background: red;\n  position: fixed;\n  border-radius: 9999px;\n  box-shadow: 0px 0px 30px #888888;\n  transition: all 1ms\n  transition: width,height 2s;\n}*/\n\n\na {\n    font-size: 14px;\n    text-decoration: none;\n    outline: 0;\n}\n\n._2vQ2T_SXgYqUVAB_fYbdNR, ._2xvENSOk7nOO_-ZAAwbKtv {\n    height: 256px;\n    position: relative;\n    width: 256px;\n}\n\n._2vQ2T_SXgYqUVAB_fYbdNR {\n    margin: 100px auto 0 auto;\n}\n\n._2xvENSOk7nOO_-ZAAwbKtv {\n    background-color: rgba(0, 0, 0, 0.5);\n    border-radius: 50%;\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n    -moz-transform-origin: 50% 50%;\n    transform-origin: 50% 50%;\n    -webkit-transform: scale(0.1) rotate(-270deg);\n    -moz-transform: scale(0.1) rotate(-270deg);\n    -transform: scale(0.1) rotate(-270deg);\n    -webkit-transition: all 0.4s ease-out;\n    -moz-transition: all 0.4s ease-out;\n    transition: all 0.4s ease-out;\n}\n\n._1hxv33GZAY7YepgqLTOveu ._2xvENSOk7nOO_-ZAAwbKtv {\n    opacity: 1;\n    -webkit-transform: scale(1) rotate(0);\n    -moz-transform: scale(1) rotate(0);\n    -transform: scale(1) rotate(0);\n    box-shadow: 0px 0px 10px #000;\n\n}\n\n._2F61kAQV9Q5TeJl0doZCcE {\n    background-color: rgba(255, 255, 255, 0.3);\n    border-radius: 50%;\n    border: 2px solid #ffffff;\n    bottom: 0;\n    color: white;\n    height: 80px;\n    left: 0;\n    line-height: 80px;\n    margin: auto;\n    position: absolute;\n    right: 0;\n    text-align: center;\n    top: 0;\n    width: 80px;\n    -webkit-transition: all 0.4s ease-out;\n    -moz-transition: all 0.4s ease-out;\n    transition: all 0.4s ease-out;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0px 0px 10px #000;\n}\n._1hxv33GZAY7YepgqLTOveu ._2F61kAQV9Q5TeJl0doZCcE {\n    border-color: #aaaaaa;\n    transition: all 0.6s;\n    transform:scale(0.8) rotate(-135deg);\n    /*scale(0.7);*/\n    box-shadow: none;\n\n}\n\n.fxnlv5fodeozETTDZmRyh {\n    border-radius: 50%;\n    color: #eeeeee;\n    display: block;\n    height: 40px;\n    line-height: 40px;\n    margin-left: -20px;\n    margin-top: -20px;\n    position: absolute;\n    text-align: center;\n    width: 40px;\n}\n", ""]);

// exports
exports.locals = {
	"MDev": "_2vQ2T_SXgYqUVAB_fYbdNR",
	"ring": "_2xvENSOk7nOO_-ZAAwbKtv",
	"open": "_1hxv33GZAY7YepgqLTOveu",
	"center": "_2F61kAQV9Q5TeJl0doZCcE",
	"menuItem": "fxnlv5fodeozETTDZmRyh"
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _svg = __webpack_require__(9);

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menu = _react2.default.createElement(
    'div',
    { className: _svg2.default.svg },
    _react2.default.createElement(
        'svg',
        { t: '1511513617429', viewBox: '0 0 1024 1024', width: '100%', height: '100%' },
        _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement('style', { type: 'text/css' })
        ),
        _react2.default.createElement('path', { d: 'M290.1 63.9H96.7c-16.6 0-30 13.4-30 30V290c0 16.6 13.4 30 30 30h193.4c16.6 0 30-13.4 30-30V93.9c0-16.6-13.5-30-30-30zM290.1 385.3H96.7c-16.6 0-30 13.4-30 30v196.1c0 16.6 13.4 30 30 30h193.4c16.6 0 30-13.4 30-30V415.3c0-16.6-13.5-30-30-30zM290.1 703.6H96.7c-16.6 0-30 13.4-30 30v196.1c0 16.6 13.4 30 30 30h193.4c16.6 0 30-13.4 30-30V733.6c0-16.5-13.5-30-30-30zM607 63.8H413.7c-16.6 0-30 13.4-30 30V290c0 16.6 13.4 30 30 30H607c16.6 0 30-13.4 30-30V93.8c0-16.5-13.4-30-30-30zM607 385.3H413.7c-16.6 0-30 13.4-30 30v196.1c0 16.6 13.4 30 30 30H607c16.6 0 30-13.4 30-30V415.3c0-16.6-13.4-30-30-30zM607 703.6H413.7c-16.6 0-30 13.4-30 30v196.1c0 16.6 13.4 30 30 30H607c16.6 0 30-13.4 30-30V733.6c0-16.5-13.4-30-30-30zM927.9 63.8H734.6c-16.6 0-30 13.4-30 30V290c0 16.6 13.4 30 30 30H928c16.6 0 30-13.4 30-30V93.8c-0.1-16.5-13.5-30-30.1-30zM927.9 385.3H734.6c-16.6 0-30 13.4-30 30v196.1c0 16.6 13.4 30 30 30H928c16.6 0 30-13.4 30-30V415.3c-0.1-16.6-13.5-30-30.1-30zM927.9 703.6H734.6c-16.6 0-30 13.4-30 30v196.1c0 16.6 13.4 30 30 30H928c16.6 0 30-13.4 30-30V733.6c-0.1-16.5-13.5-30-30.1-30z', 'p-id': '9193', fill: '#fff' })
    )
);

var about = _react2.default.createElement(
    'svg',
    { viewBox: '0 0 1024 1024' },
    _react2.default.createElement(
        'defs',
        null,
        _react2.default.createElement('style', { type: 'text/css' })
    ),
    _react2.default.createElement('path', { d: 'M505.889 53.862C252.887 57.244 50.48 265.126 53.863 518.193c3.382 252.894 211.264 455.364 464.266 451.964 253.004-3.38 455.409-211.264 452.029-464.334C966.818 252.886 758.893 50.479 505.889 53.862L505.889 53.862zM556.684 206.566c46.56 0 60.305 26.987 60.305 57.905 0 38.617-30.94 74.312-83.67 74.312-44.12 0-65.11-22.21-63.865-58.865C469.477 249.004 495.374 206.566 556.684 206.566zM437.249 798.383c-31.832 0-55.132-19.33-32.88-104.29l36.502-150.61c6.327-24.155 7.375-33.82 0-33.82-9.512 0-50.857 16.695-75.292 33.12l-15.885-26.05c77.455-64.647 166.495-102.59 204.654-102.59 31.81 0 37.09 37.66 21.205 95.565l-41.825 158.38c-7.375 27.99-4.19 37.655 3.185 37.655 9.515 0 40.845-11.565 71.605-35.76l17.98 24.155C551.249 769.388 469.127 798.383 437.249 798.383L437.249 798.383 437.249 798.383z', fill: '#fff' })
);

var log = _react2.default.createElement(
    'svg',
    { viewBox: '0 0 1024 1024' },
    _react2.default.createElement(
        'defs',
        null,
        _react2.default.createElement('style', { type: 'text/css' })
    ),
    _react2.default.createElement('path', {
        d: 'M921.122133 0H103.765333C67.9936 0 35.089067 28.672 35.089067 66.218667v885.828266c0 37.410133 29.832533 66.218667 68.608 66.218667h817.3568c38.775467 0 68.539733-28.808533 68.539733-66.218667V66.218667C989.7984 28.672 956.962133 0 921.122133 0zM255.863467 509.1328c-26.8288 0-50.7904-23.005867-50.7904-48.878933 0-25.941333 23.893333-48.878933 50.722133-48.878934s50.653867 23.005867 50.653867 48.878934a49.220267 49.220267 0 0 1-50.5856 48.878933z m0-230.126933c-26.8288 0-50.722133-23.005867-50.722134-48.878934 0-25.941333 23.893333-48.878933 50.722134-48.878933s50.653867 23.005867 50.653866 48.878933a49.3568 49.3568 0 0 1-50.653866 48.878934z m513.024 230.058666H425.984c-26.965333 0-50.7904-22.9376-50.7904-48.810666 0-25.941333 23.893333-48.878933 50.653867-48.878934h340.104533c26.8288 0 50.722133 23.005867 50.722133 48.878934a48.605867 48.605867 0 0 1-47.7184 48.878933z m0-230.058666H425.984c-26.897067 0-50.722133-23.005867-50.722133-48.878934 0-25.941333 23.893333-48.878933 50.722133-48.878933h340.036267c26.8288 0 50.722133 23.005867 50.722133 48.878933a48.7424 48.7424 0 0 1-47.786667 48.878934z',
        'p-id': '7136',
        fill: '#fff' })
);

var device = _react2.default.createElement(
    'svg',
    { viewBox: '0 0 1024 1024' },
    _react2.default.createElement(
        'defs',
        null,
        _react2.default.createElement('style', { type: 'text/css' })
    ),
    _react2.default.createElement('path', {
        d: 'M822.9888 1023.0272 198.9632 1023.0272c-20.9408 0-37.376-19.5072-37.376-44.4416L161.5872 44.4416C161.6384 19.5072 178.0224 0 198.9632 0l624.0256 0c20.9408 0 37.376 19.5072 37.376 44.4416l0 934.144C860.3136 1003.52 843.9296 1023.0272 822.9888 1023.0272zM210.2784 974.3872l601.1904 0 0.2048-925.696L210.4832 48.6912 210.2784 974.3872z',
        'p-id': '2955',
        fill: '#fff' }),
    _react2.default.createElement('path', { d: 'M755.5584 785.408 266.4448 785.408 266.4448 113.3568l489.1136 0L755.5584 785.408zM315.136 736.768l391.7824 0L706.9184 162.048 315.136 162.048 315.136 736.768z', 'p-id': '2956', fill: '#fff' }),
    _react2.default.createElement('path', {
        d: 'M511.0272 958.3616c-42.3936 0-76.9024-33.3824-76.9024-74.3424 0-41.0112 34.5088-74.3936 76.9024-74.3936s76.8512 33.3824 76.8512 74.3936C587.8272 924.9792 553.3696 958.3616 511.0272 958.3616zM511.0272 858.2656c-15.5648 0-28.2112 11.52-28.2112 25.7024 0 14.1824 12.6464 25.7024 28.2112 25.7024 15.5648 0 28.16-11.52 28.16-25.7024C539.1872 869.7856 526.5408 858.2656 511.0272 858.2656z',
        'p-id': '2957',
        fill: '#fff' })
);

var wechat = _react2.default.createElement(
    'svg',
    { viewBox: '0 0 1024 1024' },
    _react2.default.createElement(
        'defs',
        null,
        _react2.default.createElement('style', { type: 'text/css' })
    ),
    _react2.default.createElement('path', { fill: '#fff', d: 'M237.222 321.426c0 23.687 19.202 42.891 42.891 42.891s42.891-19.202 42.891-42.891c0 0 0 0 0 0 0-23.687-19.202-42.891-42.891-42.891-23.687 0-42.891 19.202-42.891 42.891 0 0 0 0 0 0z', 'p-id': '10120' }),
    _react2.default.createElement('path', { fill: '#fff', d: 'M571.27 543.222c0 18.544 15.033 33.575 33.575 33.575s33.575-15.033 33.575-33.575c0-18.544-15.033-33.575-33.575-33.575-18.544 0-33.575 15.033-33.575 33.575z', 'p-id': '10121' }),
    _react2.default.createElement('path', { fill: '#fff', d: 'M456.005 321.426c0 23.687 19.202 42.891 42.891 42.891s42.891-19.202 42.891-42.891c0 0 0 0 0 0 0-23.687-19.202-42.891-42.891-42.891-23.687 0-42.891 19.202-42.891 42.891 0 0 0 0 0 0z', 'p-id': '10122' }),
    _react2.default.createElement('path', {
        fill: '#fff',
        d: 'M855.585-0.445h-688.337c-91.135 0-165.018 74.124-165.018 165.561v687.481c0 91.437 73.883 165.561 165.018 165.561h688.337c91.136 0 165.018-74.124 165.018-165.561v-687.479c0.001-91.438-73.881-165.562-165.018-165.562zM384.389 681.985c-38.538 0-69.529-7.872-108.148-15.501l-107.929 54.116 30.877-92.875c-77.295-54.022-123.546-123.627-123.546-208.449 0-146.902 139.024-262.571 308.746-262.571 151.811 0 284.802 92.429 311.519 216.827-9.824-1.098-19.724-1.813-29.729-1.813-146.66 0-262.491 109.453-262.491 244.339 0 22.449 3.494 44.069 9.527 64.695-9.527 0.75-19.136 1.232-28.826 1.232zM839.821 790.134l23.223 77.159-84.691-46.388c-30.878 7.741-61.894 15.503-92.64 15.503-146.896 0-262.597-100.406-262.597-224.055 0-123.443 115.699-224.062 262.597-224.062 138.737 0 262.254 100.619 262.254 224.062 0 69.632-46.172 131.289-108.145 177.781z',
        'p-id': '10123' }),
    _react2.default.createElement('path', { fill: '#fff', d: 'M739.511 543.222c0 18.544 15.033 33.575 33.575 33.575s33.575-15.033 33.575-33.575c0-18.544-15.033-33.575-33.575-33.575-18.544 0-33.575 15.033-33.575 33.575z', 'p-id': '10124' })
);

module.exports = {
    menu: menu,
    about: about,
    device: device,
    log: log,
    wechat: wechat
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?modules!./svg.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?modules!./svg.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "._3Q8HmqcZDUt94rQd4EAkR{\n  height: 30vw;\n  width: 30vw;\n  padding: 5vw;\n}\n", ""]);

// exports
exports.locals = {
	"svg": "_3Q8HmqcZDUt94rQd4EAkR"
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _navigation = __webpack_require__(12);

var _navigation2 = _interopRequireDefault(_navigation);

var _console = __webpack_require__(14);

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(2);


var Title = function Title(props) {
  return React.createElement(
    'div',
    { className: _navigation2.default.title },
    React.createElement(
      'div',
      { className: _navigation2.default.name },
      'name'
    ),
    React.createElement(
      'div',
      { className: _navigation2.default.close, onClick: props.close },
      ' X '
    )
  );
};

var Navigation = function (_React$Component) {
  _inherits(Navigation, _React$Component);

  function Navigation(props) {
    _classCallCheck(this, Navigation);

    var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

    _this.state = {
      title: 'console'
    };
    return _this;
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          close = _props.close,
          logList = _props.logList;
      var title = this.state.title;

      return React.createElement(
        'div',
        { className: _navigation2.default.wrap },
        React.createElement(Title, { close: close }),
        React.createElement(
          'div',
          { className: _navigation2.default.ul },
          React.createElement(
            'div',
            { className: _navigation2.default.li, onClick: function onClick() {
                return _this2.setState({ title: 'console' });
              } },
            ' console '
          ),
          React.createElement('div', { className: _navigation2.default.li }),
          React.createElement('div', { className: _navigation2.default.li }),
          React.createElement('div', { className: _navigation2.default.li })
        ),
        title === 'console' ? React.createElement(_console2.default, { logList: logList, title: React.createElement(Title, { close: function close() {
              return _this2.setState({ title: '' });
            } }) }) : []
      );
    }
  }]);

  return Navigation;
}(React.Component);

module.exports = Navigation;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?modules!./navigation.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?modules!./navigation.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "._3tUU3teiG_Sn4BAHiTkEOi {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background: #f5f5f5;\n    display: flex;\n    flex-direction: column;\n}\n\n._3a6s9Y-4_K1OksP7nWN64v {\n    display: flex;\n    justify-content: space-between;\n    background: #e5e5e5;\n    flex-grow: 1;\n    max-height: 300px;\n}\n\n._2dr3LuLaln8H793nazlLZf {\n    text-align: center;\n    line-height: 100%;\n    background: red;\n    flex-grow: 1\n}\n\n._1Qnw30misketLe6Cx6TfVz {\n    flex-grow: 2\n}\n\n._2GGZwORRqEU0jt6lZN8QUv{\n  flex-grow: 4;\n  display: flex;\n  flex-direction: column;\n}\n\n._3B69QfYrMRMMsgjPaJ3MfW{\n  margin: 10px;\n  background: #c5c5c5;\n  height: 100px;\n}\n", ""]);

// exports
exports.locals = {
	"wrap": "_3tUU3teiG_Sn4BAHiTkEOi",
	"title": "_3a6s9Y-4_K1OksP7nWN64v",
	"close": "_2dr3LuLaln8H793nazlLZf",
	"name": "_1Qnw30misketLe6Cx6TfVz",
	"ul": "_2GGZwORRqEU0jt6lZN8QUv",
	"li": "_3B69QfYrMRMMsgjPaJ3MfW"
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _console = __webpack_require__(15);

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(2);

var Console = function (_React$Component) {
  _inherits(Console, _React$Component);

  function Console(props) {
    _classCallCheck(this, Console);

    var _this = _possibleConstructorReturn(this, (Console.__proto__ || Object.getPrototypeOf(Console)).call(this, props));

    console.log('===> log');
    _this.state = {
      dos: ''
    };
    return _this;
  }

  _createClass(Console, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dos = this.state.dos;


      return React.createElement(
        'div',
        { className: _console2.default.wrap },
        [this.props.title, React.createElement(
          'div',
          { className: _console2.default.logwrap },
          this.props.logList.log.map(function (a, i) {
            return React.createElement(
              'div',
              { className: _console2.default.log, key: a },
              i + '. ' + a
            );
          })
        )],
        React.createElement(
          'div',
          { className: _console2.default.input },
          React.createElement('input', { value: dos, onChange: function onChange(e) {
              return _this2.setState({ dos: e.target.value });
            }, className: _console2.default.text, type: 'text', name: 'firstname' }),
          React.createElement('input', { className: _console2.default.bt, onClick: function onClick() {
              return eval(dos);
            }, type: 'button', value: '\u6267\u884C' })
        )
      );
    }
  }]);

  return Console;
}(React.Component);

Console.defaultProps = {
  // show  : true,
};

module.exports = Console;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?modules!./console.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?modules!./console.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n._245Xb2HGh2sEbWrCusVRfj {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background: #f5f5f5;\n    display: flex;\n    flex-direction: column;\n}\n._1ugiWxBEGbRjCLPu2eORTi{\n  background: dodgerblue;\n    color: wheat;\n    font-size: 60px;\n    margin: 10px 0;\n}\n._2Yur_RU2AFpG01wS_2tQK8{\noverflow: scroll;\nflex-grow: 4;\n}\n.Q-ikrxT3giLfxhERrWnBQ{\n  flex-grow: 1;\n  max-height: 200px;\n  background: red;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n}\n._37cZrbTBCrYdxJYTII-qvp  {\n  flex-grow: 1;\n  font-size: 50px;\n}\n._2Wex4xzJjv3UUI0R7oAE9h{\n  flex-grow: 3;\n  font-size: 50px;\n\n}\n", ""]);

// exports
exports.locals = {
	"wrap": "_245Xb2HGh2sEbWrCusVRfj",
	"log": "_1ugiWxBEGbRjCLPu2eORTi",
	"logwrap": "_2Yur_RU2AFpG01wS_2tQK8",
	"input": "Q-ikrxT3giLfxhERrWnBQ",
	"bt": "_37cZrbTBCrYdxJYTII-qvp",
	"text": "_2Wex4xzJjv3UUI0R7oAE9h"
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?modules!./main.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?modules!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "html,body{\n  padding: 0;\n  margin: 0;\n}\n._20f3uXtTvkVfHJAAZU0Pse {\n   width: 1em; height: 1em;\n   vertical-align: -0.15em;\n   fill: currentColor;\n   overflow: hidden;\n}\n._3zSQKCNKZo4GLY96wo38rG{\n  height: 100px;\n  width: 100px;\n  background: #000;\n}\n", ""]);

// exports
exports.locals = {
	"icon": "_20f3uXtTvkVfHJAAZU0Pse",
	"svg": "_3zSQKCNKZo4GLY96wo38rG"
};

/***/ })
/******/ ]);
});