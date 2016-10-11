'use strict';

class QueryHash {
    constructor() {
        this.items = {};

        return this;
    }

    add(name, val) {
        if (arguments.length !== 2) {
            throw new Error('QueryHash.add expects 2 paramters, ' + arguments.length + ' given.');
        }

        if (this.items.hasOwnProperty(name)) {
            throw new Error('Property already exists in QueryHash instance');
        }

        this.items[name] = val;

        return this;
    }

    remove(name) {
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

    toUrlToken() {
        return btoa(this.toString());
    }

    toString() {
        let qs = '';

        for (let key in this.items) {
            let val = this.items[key];

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
            throw new Error('QueryHash.fromUrlToken expects 1 parameter. ' + arguments.length + ' given.');
        }
        if (typeof urlToken !== 'string') {
            throw new Error('QueryHash.fromUrlToken expects input to be of type string. Type ' + Object.prototype.toString.call(urlToken) + ' provided');
        }

        this.items = this.fromInput(urlToken, true);

        return this;
    }

    fromQueryString(qs) {
        if (arguments.length !== 1) {
            throw new Error('QueryHash.fromUrlToken expects 1 parameter. ' + arguments.length + ' given.');
        }
        if (typeof urlToken !== 'string') {
            throw new Error('QueryHash.fromUrlToken expects input to be of type string. Type ' + Object.prototype.toString.call(urlToken) + ' provided');
        } 

        this.items = this.fromInput(qs, false);

        return this;
    }

    _fromInput(input, isBase64) {
        let qs;
        if (isBase64)
            qs = btoa(input);
        else
            qs = input;

        if (qs.indexOf('?') === 0) {
            qs = qs.slice(1);
        }

        let obj = {};
        qs.split('&').forEach(function (kv) {
            kv = kv.split('=');
            obj[pair[0]] = decodeURIComponent(pair[1] || '').replace(/\+/g, ' ');
        });

        return JSON.parse(JSON.stringify(obj));
    }
}

export default QueryHash;
