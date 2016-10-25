'use strict';

class QueryHashItem {

    /**
     * A simple object with a unique id to keep track of key-value pairs
     * @param key
     * @param value
     * @returns {QueryHashItem}
     */
    constructor(key, value) {
        this.key = key;
        this.value = decodeURIComponent(value || '').replace(/\+/g, ' ');
        this.id = Date.now();

        return this;
    }

    /**
     * get a query string representation of the key-value data
     * @returns {string}
     */
    toString() {
        return `${this.key}=${encodeURIComponent(this.value)}`;
    }
}

export default QueryHashItem;