# query-hash
QueryHash is a simple class for handling/creating query strings and base64 query string tokens in the client or browser

* LICENSE: [MIT](https://github.com/bcruddy/query-hash/blob/master/LICENSE)
* VERSION: 1.4.0
* Repository: [https://github.com/bcruddy/query-hash](https://github.com/bcruddy/query-hash)
* Documentation: [Github pages](https://bcruddy.github.io/query-hash/)

node UMD module lives at `./query-hash.js` while the client side lib is exposed as the global `QueryHash` in the `dist` directory.
Typescript typing located in `./query-hash.d.ts`

## Install
bower or [npm](https://www.npmjs.com/package/query-hash):

`bower install --save query-hash` or `npm install --save query-hash`

## Usage

    var q = new QueryHash();
    q.add('test', 'passed');
    q.add('again', 'hooray');
    q.toQueryString(); // test=passed&again=hooray
    q.toUrlToken(); // dGVzdD1wYXNzZWQmYWdhaW49aG9vcmF5

    var q2 = new QueryHash('dGVzdD1wYXNzZWQmYWdhaW49aG9vcmF5');
    q2.keys(); // ['test', 'again'];
    q2.remove('test);
    q2.add('random', 'value');
    q2.toQueryString(); // again=hooray&random=value

## TODO
* Handle multiple parameters with the same key (e.g. example.com?foo=bar&foo=baz is a valid query string)

## API
Full docs available [here](https://bcruddy.github.io/query-hash/)

* `new QueryHash([data:string|object])` - Construct it empty or from: a query string, a base64 token, or a plain object.
* `fromUrlToken(token:string)` - Imports a base64 token to be manipulated/un-tokenized
* `fromQueryString(queryString:string)` - Imports a query string to be manipulated/tokenized
* `fromObject(obj:object)` - Imports an object to manipulated/tokenized *NOTE: objects should only have a "depth" of one, complex objects will not be stringified properly*
* `toUrlToken()` - Returns your querystring as a base64 encoded token
* `toQueryString()` - Returns a querystring from your added/removed values
* `add(key:string, value:string|boolean|number)` - Accepts a key and a value
* `remove(key:string)` - Accepts a key to remove
* `keys()` - Returns an array of the keys in your QueryHash object
* `find(key:string)` - Accepts a key, retrieves its corresponding value
* `has(key:string)` - Determine if an item with a given key exists
