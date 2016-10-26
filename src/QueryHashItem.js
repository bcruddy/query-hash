'use strict';

class QueryHashItem {

    /**
     * A simple object with a unique id to keep track of key-value pairs
     * @param {string} key
     * @param {string|number|boolean} value
     * @returns {QueryHashItem}
     */
    constructor(key, value) {
        this.key = key;
        this.value = decodeURIComponent(value || '').replace(/\+/g, ' ');
        this.id = this._genUuid();

        return this;
    }

    /**
     * get a query string representation of the key-value data
     * @param {string} [delimiter="="] -
     * @returns {string}
     */
    toString(delimiter = '=') {
        return [this.key, encodeURIComponent(this.value)].join(delimiter);
    }

    _genUuid() {
        let id = '';
        while (id.length < 20) {
            if (id.length === 4 || (id.length && id.length % 5 === 0)) {
                id += '-';
            }

            let capOffset = Math.random() < .5 ? 65 : 97;
            id += String.fromCharCode(((Date.now() * Math.round(Math.random() * 100000)) % 26) + capOffset);
        }

        return id;
    }
}

export default QueryHashItem;