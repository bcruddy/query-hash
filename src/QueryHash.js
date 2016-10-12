'use strict';

class QueryHash {
    constructor() {
        this._items = {};

        return this;
    }

    add(name, val) {
        if (arguments.length !== 2) {
            throw new Error(`QueryHash.add expects 2 paramters, ${arguments.length} given.`);
        }

        if (this._items.hasOwnProperty(name)) {
            throw new Error(`Property "${name}" already exists in QueryHash instance`);
        }

        this._items[name] = val;

        return this;
    }

    remove(name) {
        if (arguments.length !== 1) {
            throw new Error(`QueryHash.remove expects one parameter, ${arguments.length} given.`);
        }
        // do we really need to throw an error here? Or just skip the delete statement?
        if (!this._items.hasOwnProperty(name)) {
            throw new Error(`Item "${name}" does not exist in instance of QueryHash`);
        }

        delete this._items[name];

        return this;
    }

    find(name) {
        if (arguments.length !== 1) {
            throw new Error(`QueryHash.find expects one parameter, ${arguments.length} given.`);
        }
        if (!this._items.hasOwnProperty(name)) {
            throw new Error(`Item "${name}" does not exist in instance of QueryHash`);
        }

        return this._items[name];
    }

    keys() {
        return Object.keys(this._items);
    }

    toUrlToken() {
        return btoa(this.toString());
    }

    toString() {
        let qs = '';

        for (let key in this._items) {
            let val = this._items[key];

            if (!qs.length) {
                qs += encodeURIComponent(key) + '=' + encodeURIComponent(val || '');
            }
            else {
                qs += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val || '');
            }
        }

        return qs;
    }

    fromUrlToken(urlToken) {
        if (arguments.length !== 1) {
            throw new Error(`QueryHash.fromUrlToken expects 1 parameter. ${arguments.length} given.`);
        }
        if (typeof urlToken !== 'string') {
            throw new Error(`QueryHash.fromUrlToken expects input to be of type string. Type ${Object.prototype.toString.call(urlToken)} provided`);
        }

        this._items = this._fromInput(urlToken, true);

        return this;
    }

    fromQueryString(qs) {
        if (arguments.length !== 1) {
            throw new Error(`QueryHash.fromQueryString expects 1 parameter. ${arguments.length} given.`);
        }
        if (typeof qs !== 'string') {
            throw new Error(`QueryHash.fromQueryString expects input to be of type string. Type ${Object.prototype.toString.call(qs)} provided`);
        } 

        this._items = this._fromInput(qs, false);

        return this;
    }

    _fromInput(input, isBase64) {
        let qs = isBase64 ? atob(input) : input;

        if (qs.indexOf('?') === 0) {
            qs = qs.slice(1);
        }

        let obj = {};
        qs.split('&').forEach(function (kv) {
            kv = kv.split('=');
            obj[kv[0]] = decodeURIComponent(kv[1] || '').replace(/\+/g, ' ');
        });

        return JSON.parse(JSON.stringify(obj));
    }
}

export default QueryHash;
