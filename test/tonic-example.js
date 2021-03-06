'use strict';

const QueryHash = require('query-hash');

let q = new QueryHash();
q.add('userId', '23412');
q.add('packageId', '10001');
q.add('couponCode', 'SWEETEXAMPLE120');
console.log(q.toUrlToken());

let q2 = new QueryHash(q.toUrlToken());
console.log(q2.has('packageId'));
console.log(q2.find('packageId'));
q2.remove('packageId');
console.log(q2.has('packageId'));

let q3 = new QueryHash(q2.toQueryString());
console.log(q3.keys());

let q4 = new QueryHash({
    from: 'an',
    object: 'this time'
});
console.log(q4.toQueryString());