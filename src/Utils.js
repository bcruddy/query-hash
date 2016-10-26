'use strict';

class Utils {
    /**
     * Generate a unique id consisting of 4 groups of 4 Az chars separated by a '-'
     * @returns {string}
     */
    static genUuid() {
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

    /**
     * Trim excess whitespace and leading '?' from a query string
     * @private
     * @param {string} qs
     * @returns {string}
     */
    static trimStringEntry(qs) {
        let trimmed = qs.trim();

        return trimmed.indexOf('?') === 0 ? trimmed.slice(1) : trimmed;
    }

    /**
     * Test whether or not input is a base64 string
     * @private
     * @param {string} maybe64
     * @returns {boolean}
     */
    static isBase64(maybe64) {
        if (typeof maybe64 !== 'string') {
            return false;
        }
        //noinspection JSCheckFunctionSignatures
        let validBase64 = new RegExp(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);

        return validBase64.test(maybe64);
    }
}

export default Utils;
