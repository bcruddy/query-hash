'use strict';

class QueryHash {
    constructor(data) {
        if (arguments.length == 0)
            this._items = {};
        else if (arguments.length > 1)
            throw new Error('QueryHash constructor only accepts one optional parameter.');
        else if (typeof data === 'string')
            this._isBase64(data) ? this.fromUrlToken(data) : this.fromQueryString(data);
        else if (Object.prototype.toString.call(data) === '[object Object]')
            this.fromObject(data);
        else
            throw new Error('QueryHash constructor only accepts a query string, base64 string, or a plain object.');

        return this;
    }

    add(name, val) {
        if (arguments.length !== 2)
            throw new Error(`QueryHash.add expects 2 parameters, ${arguments.length} given.`);
        if (this.has(name))
            throw new Error(`Property "${name}" already exists in QueryHash instance`);

        this._items[name] = val;

        return this;
    }

    remove(name) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.remove expects one parameter, ${arguments.length} given.`);
        // do we really need to throw an error here? Or just skip the delete statement?
        if (!this.has(name))
            throw new Error(`Item "${name}" does not exist in instance of QueryHash`);

        delete this._items[name];

        return this;
    }

    find(name) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.find expects one parameter, ${arguments.length} given.`);
        if (!this.has(name))
            throw new Error(`Item "${name}" does not exist in instance of QueryHash`);

        return this._items[name];
    }

    keys() {
        return Object.keys(this._items);
    }

    has(key) {
        return this._items.hasOwnProperty(key);
    }

    toUrlToken() {
        let isLikelyNode = typeof window === 'undefined';

        return isLikelyNode ? new Buffer(this.toQueryString()).toString('base64') : btoa(this.toQueryString());
    }

    fromUrlToken(urlToken) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.fromUrlToken expects 1 parameter. ${arguments.length} given.`);
        if (typeof urlToken !== 'string')
            throw new Error(`QueryHash.fromUrlToken expects input to be of type string. Type ${Object.prototype.toString.call(urlToken)} provided`);

        this._items = this._fromInput(urlToken, true);

        return this;
    }

    toQueryString() {
        return this.keys()
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(this.find(k) || ''))
            .join('&');
    }

    fromQueryString(qs) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.fromQueryString expects 1 parameter. ${arguments.length} given.`);
        if (typeof qs !== 'string')
            throw new Error(`QueryHash.fromQueryString expects input to be of type string. Type ${Object.prototype.toString.call(qs)} provided`);

        this._items = this._fromInput(qs, false);

        return this;
    }

    fromObject(obj) {
        if (arguments.length !== 1)
            throw new Error(`QueryHash.fromObject expects one parameter, ${arguments.length} given.`);
        if (Object.prototype.toString.call(obj) !== '[object Object]')
            throw new Error('QueryHash.fromObject expects an object');

        this._items = Object.keys(obj)
            .reduce((p, key) => {
                if (typeof obj[key] !== 'object') { 
                    p[key] = obj[key]; 
                }

                return p;
            }, {});

        return this;
    }

    _fromInput(input, isBase64) {
        let isLikelyNode = typeof window === 'undefined';

        let qs = input;
        if (isBase64)
            qs = isLikelyNode ? new Buffer(input, 'base64').toString() : atob(input);

        if (qs.indexOf('?') === 0) {
            qs = qs.slice(1);
        }

        return qs.split('&')
            .map(kv => kv.split('='))
            .reduce((p, kv) => {
                p[kv[0]] = decodeURIComponent(kv[1] || '').replace(/\+/g, ' ');

                return p;
            }, {});
    }

    _isBase64(maybe64) {
        let regex = new RegExp(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);

        return regex.test(maybe64);
    }
}

export default QueryHash;
