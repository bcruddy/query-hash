'use strict';

import Utils from './Utils';

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
        this.id = Utils.genUuid();

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
}

export default QueryHashItem;
