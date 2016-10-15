# query-hash
A simple isomorphic library for handling querystrings, tokens, and translating between the two.

node UMD module lives at `./query-string.js` while the client side lib is exposed as the global `QueryHash` in the `dist` directory.

## Usage
Install with bower and it's plug and play on client and server
    var q = new QueryHash();
    q.add('test', 'item');
    q.add('second', 'widget');
    q.toString(); // test=item&second=widget



## API
After constructing your instance of QueryHash, the following methods are available:

* `fromUrlToken(token:string)` - Imports a base64 token to be manipulated/un-tokenized
* `fromQueryString(queryString:string)` - Imports a query string to be manipulated/tokenized
* `toUrlToken()` - Returns your querystring as a base64 encoded token
* `toString()` - Returns a querystring from your added/removed values
* `add(key:string, value:string|boolean|number)` - Accepts a key and a value
* `remove(key:string)` - Accepts a key to remove
* `keys()` - Returns an array of the keys in your QueryHash object
* `find(key:string)` - Accepts a key, retrieves its corresponding value
* `has(key:string)` - Determine if an item with a given key exists
