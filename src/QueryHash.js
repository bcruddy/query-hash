'use strict';

import Utils from './Utils';
import QueryHashItem from './QueryHashItem';

class QueryHash {
    /**
     * Create an instance of QueryHash
     * @Constructor
     * @public
     * @param {string|object} [data] - base to create key-value items; base64 string, query string, or plain object
     * @throws Error
     * @returns {QueryHash} this, chainable
     */
    constructor(data) {
        this._items = [];

        if (arguments.length > 1)
            throw new Error('QueryHash constructor only accepts one optional parameter.');
        else if (typeof data === 'string')
            this._fromString(data);
        else if (Object.prototype.toString.call(data) === '[object Object]')
            this.fromObject(data);
        else if (arguments.length !== 0)
            throw new Error('QueryHash constructor only accepts a query string, base64 string, or a plain object.');

        return this;
    }

    /**
     * Add a key-value pair
     * @public
     * @param {string} key - item key to add
     * @param {string|number|boolean} val - item value
     * @throws Error
     * @returns {QueryHash} this, chainable
     */
    add(key, val) {
        if (arguments.length !== 2)
            throw new Error(`QueryHash.add expects 2 parameters, ${arguments.length} given.`);

        this._items.push(new QueryHashItem(key, val));

        return this;
    }

    /**
     * Remove items matching the given key
     * @public
     * @param {string} key - Item key to remove
     * @throws Error
     * @returns {QueryHash} this, chainable
     */
    remove(key) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.remove expects one parameter, ${arguments.length} given.`);
        // do we really need to throw an error here? Or just skip the delete statement?
        if (!this.has(key))
            throw new Error(`Item "${key}" does not exist in instance of QueryHash`);

        this._items = this._items.filter(item => item.key !== key);

        return this;
    }

    /**
     * Find items with a given key
     * @public
     * @param {string} key - Item key to find
     * @throws Error
     * @returns {QueryHashItem[]}
     */
    find(key) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.find expects one parameter, ${arguments.length} given.`);
        if (!this.has(key))
            throw new Error(`Item "${key}" does not exist in instance of QueryHash`);

        return this._items.filter(item => item.key === key);
    }

    /**
     * Return the first value found matching the given key. Useful when keys are unique.
     * @param {string} key - Return the item value with this key
     * @returns {string|null}
     */
    first(key) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.first expects one parameter, ${arguments.length} given.`);

        if (!this.has(key))
            return null;

        let item = this.find(key)[0];

        return item ? item.value : null;
    }

    /**
     * Return an array of unique item keys
     * @public
     * @returns {Array}
     */
    keys() {
        let seen = {};
        return this._items
            .map(item => item.key)
            .filter(item => seen.hasOwnProperty(item) ? false : (seen[item] = true));
    }

    /**
     * Test whether or not an item exists by its key
     * @public
     * @param {string} key - Item key to test
     * @returns {boolean}
     */
    has(key) {
        return this.keys().some(k => k === key);
    }

    /**
     * Return a base64 encoded query string
     * @public
     * @returns {string}
     */
    toUrlToken() {
        return Buffer.from(this.toQueryString()).toString('base64');
    }

    /**
     * Add items to instance from base64 query string
     * @public
     * @param {string} urlToken - a base64 encoded query string
     * @throws Error
     * @returns {QueryHash} this, chainable
     */
    fromUrlToken(urlToken) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.fromUrlToken expects 1 parameter. ${arguments.length} given.`);
        if (typeof urlToken !== 'string')
            throw new Error(`QueryHash.fromUrlToken expects input to be of type string. Type ${Object.prototype.toString.call(urlToken)} provided`);

        this._fromString(urlToken, true);

        return this;
    }

    /**
     * Return a valid query string composed of instance items
     * @public
     * @returns {string}
     */
    toQueryString() {
        return this._items.map(item => item.toString()).join('&');
    }

    /**
     * Add items to instance from a query string
     * @public
     * @param {string} qs - a valid query string
     * @throws Error
     * @returns {QueryHash} this, chainable
     */
    fromQueryString(qs) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.fromQueryString expects 1 parameter. ${arguments.length} given.`);
        if (typeof qs !== 'string')
            throw new Error(`QueryHash.fromQueryString expects input to be of type string. Type ${Object.prototype.toString.call(qs)} provided`);

        this._fromString(qs, false);

        return this;
    }

    /**
     * Add items to instance, only keys with primitive values will be added
     * @public
     * @param {object} obj - A plain object with no nested/reference values
     * @throws Error
     * @returns {QueryHash} this, chainable
     */
    fromObject(obj) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.fromObject expects one parameter, ${arguments.length} given.`);
        if (Object.prototype.toString.call(obj) !== '[object Object]')
            throw new Error('QueryHash.fromObject expects an object');

        Object.keys(obj)
            .filter(key => typeof obj[key] !== 'object')
            .forEach(key => this.add(key, obj[key]));

        return this;
    }

    /**
     * Store string input internally in instance._items
     * @private
     * @param {string} input - Query string (can be base64 encoded)
     * @param {boolean} [isBase64] - Indicates whether or not the string is base64 encoded
     * @returns {QueryHashItem[]}
     */
    _fromString(input, isBase64) {
        if (isBase64 === void 0) {
            isBase64 = Utils.isBase64(input);
        }

        let qs = isBase64 ? Buffer.from(input, 'base64').toString() : input;
        let clean = Utils.trimStringEntry(qs);

        clean.split('&')
            .map(kv => kv.split('='))
            .forEach(p => this.add(p[0], p[1]));
    }
}

export default QueryHash;
