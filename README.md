A small library to simplify hashing query strings

See test/index.html for usage.


### API
After constructing your instance of QueryHash, the following methods are available:

* `add('key', 'value')` - Accepts a key and a value
* `remove('key')` - Accepts a key to remove
* `find('key')` - Accepts a key, retrieves its corresponding value
* `keys()` - Returns an array of the keys in your QueryHash object
* `toUrlToken()` - Returns your query string as a base64 encoded token
* `toString()` - Returns a query string from your added/removed values
* `fromUrlToken(token:string)` - Imports a base64 token to be manipulated/un-tokenized
* `fromQueryString(queryString:string)` - Imports a query string to be manipulated/tokenized