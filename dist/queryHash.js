var QueryHash =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.__useDefault = undefined;

	var _QueryHash = __webpack_require__(1);

	var _QueryHash2 = _interopRequireDefault(_QueryHash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __useDefault = exports.__useDefault = true;

	exports.default = _QueryHash2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var QueryHash = function () {
	    function QueryHash() {
	        _classCallCheck(this, QueryHash);

	        this.items = {};

	        return this;
	    }

	    _createClass(QueryHash, [{
	        key: 'add',
	        value: function add(name, val) {
	            if (arguments.length !== 2) {
	                throw new Error('QueryHash.add expects 2 paramters, ' + arguments.length + ' given.');
	            }

	            if (this.items.hasOwnProperty(name)) {
	                throw new Error('Property already exists in QueryHash instance');
	            }

	            this.items[name] = val;

	            return this;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(name) {
	            if (name === void 0) {
	                throw new Error('QueryHash.remove expects one parameter.');
	            }

	            // do we really need to throw an error here? Or just skip the delete statement?
	            if (!this.items.hasOwnProperty(name)) {
	                throw new Error('Item does not exist in instance of QueryHash');
	            }

	            delete this.items[name];

	            return this;
	        }
	    }, {
	        key: 'toUrlToken',
	        value: function toUrlToken() {
	            return btoa(this.toString());
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var qs = '';

	            for (var key in this.items) {
	                var val = this.items[key];

	                if (!qs.length) {
	                    qs += encodeURIComponent(key) + '=' + encodeURIComponent(val || '');
	                } else {
	                    qs += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val || '');
	                }
	            }

	            return qs;
	        }
	    }, {
	        key: 'fromUrlToken',
	        value: function fromUrlToken(urlToken) {
	            if (arguments.length !== 1) {
	                throw new Error('QueryHash.fromUrlToken expects 1 parameter. ' + arguments.length + ' given.');
	            }
	            if (typeof urlToken !== 'string') {
	                throw new Error('QueryHash.fromUrlToken expects input to be of type string. Type ' + Object.prototype.toString.call(urlToken) + ' provided');
	            }

	            this.items = this.fromInput(urlToken, true);

	            return this;
	        }
	    }, {
	        key: 'fromQueryString',
	        value: function fromQueryString(qs) {
	            if (arguments.length !== 1) {
	                throw new Error('QueryHash.fromUrlToken expects 1 parameter. ' + arguments.length + ' given.');
	            }
	            if (typeof urlToken !== 'string') {
	                throw new Error('QueryHash.fromUrlToken expects input to be of type string. Type ' + Object.prototype.toString.call(urlToken) + ' provided');
	            }

	            this.items = this.fromInput(qs, false);

	            return this;
	        }
	    }, {
	        key: '_fromInput',
	        value: function _fromInput(input, isBase64) {
	            var qs = void 0;
	            if (isBase64) qs = btoa(input);else qs = input;

	            if (qs.indexOf('?') === 0) {
	                qs = qs.slice(1);
	            }

	            var obj = {};
	            qs.split('&').forEach(function (kv) {
	                kv = kv.split('=');
	                obj[pair[0]] = decodeURIComponent(pair[1] || '').replace(/\+/g, ' ');
	            });

	            return JSON.parse(JSON.stringify(obj));
	        }
	    }]);

	    return QueryHash;
	}();

	exports.default = { QueryHash: QueryHash };

/***/ }
/******/ ]);