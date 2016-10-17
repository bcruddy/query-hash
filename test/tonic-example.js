'use strict';

const QueryHash = require('query-hash');

let q = new QueryHash();
q.add('userId', '23412');
q.add('packageId', '10001');
q.add('couponCode', 'SWEETEXAMPLE120');
let token = q.toUrlToken();
console.log(token);

let q2 = new QueryHash(token);
console.log(q2.find('packageId'));
q2.remove('packageId');
let query = q2.toQueryString();
console.log(query);

let q3 = new QueryHash(query);
console.log(q3.keys());

let q4 = new QueryHash({
    from: 'an',
    object: 'this time'
});
console.log(q4.toQueryString());
