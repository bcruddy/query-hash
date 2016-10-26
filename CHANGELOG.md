# query-hash changelog
Getting started late here, breaking changes in 2.0.0

### 2.0.0
* Keys can be reused (multi-value keys) - e.g. `?foo=bar&baz=red&foo=green` is a valid query string
* `QueryHash.find` returns an array of `QueryHashItem`s instead of a string|number|boolean value
* `QueryHash.fromObject`, `QueryHash.fromUrlToken` and `QueryHash.fromQueryString` no longer "reset" the internal data representation and instead append the new values to any existing values
