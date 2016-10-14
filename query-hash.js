(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["QueryHash"] = factory();
	else
		root["QueryHash"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	var _QueryHash = __webpack_require__(1);

	var _QueryHash2 = _interopRequireDefault(_QueryHash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _QueryHash2.default;

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

	        this._items = {};

	        return this;
	    }

	    _createClass(QueryHash, [{
	        key: 'add',
	        value: function add(name, val) {
	            if (arguments.length !== 2) {
	                throw new Error('QueryHash.add expects 2 paramters, ' + arguments.length + ' given.');
	            }

	            if (this._items.hasOwnProperty(name)) {
	                throw new Error('Property "' + name + '" already exists in QueryHash instance');
	            }

	            this._items[name] = val;

	            return this;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(name) {
	            if (arguments.length !== 1) {
	                throw new Error('QueryHash.remove expects one parameter, ' + arguments.length + ' given.');
	            }
	            // do we really need to throw an error here? Or just skip the delete statement?
	            if (!this._items.hasOwnProperty(name)) {
	                throw new Error('Item "' + name + '" does not exist in instance of QueryHash');
	            }

	            delete this._items[name];

	            return this;
	        }
	    }, {
	        key: 'find',
	        value: function find(name) {
	            if (arguments.length !== 1) {
	                throw new Error('QueryHash.find expects one parameter, ' + arguments.length + ' given.');
	            }
	            if (!this._items.hasOwnProperty(name)) {
	                throw new Error('Item "' + name + '" does not exist in instance of QueryHash');
	            }

	            return this._items[name];
	        }
	    }, {
	        key: 'keys',
	        value: function keys() {
	            return Object.keys(this._items);
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

	            for (var key in this._items) {
	                var val = this._items[key];

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

	            this._items = this._fromInput(urlToken, true);

	            return this;
	        }
	    }, {
	        key: 'fromQueryString',
	        value: function fromQueryString(qs) {
	            if (arguments.length !== 1) {
	                throw new Error('QueryHash.fromQueryString expects 1 parameter. ' + arguments.length + ' given.');
	            }
	            if (typeof qs !== 'string') {
	                throw new Error('QueryHash.fromQueryString expects input to be of type string. Type ' + Object.prototype.toString.call(qs) + ' provided');
	            }

	            this._items = this._fromInput(qs, false);

	            return this;
	        }
	    }, {
	        key: '_fromInput',
	        value: function _fromInput(input, isBase64) {
	            var qs = isBase64 ? atob(input) : input;

	            if (qs.indexOf('?') === 0) {
	                qs = qs.slice(1);
	            }

	            var obj = {};
	            qs.split('&').forEach(function (kv) {
	                kv = kv.split('=');
	                obj[kv[0]] = decodeURIComponent(kv[1] || '').replace(/\+/g, ' ');
	            });

	            return JSON.parse(JSON.stringify(obj));
	        }
	    }]);

	    return QueryHash;
	}();

	exports.default = QueryHash;

/***/ }
/******/ ])
});
;