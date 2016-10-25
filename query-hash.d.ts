// Type definitions for query-hash v1.4.0
// Project: https://github.com/bcruddy/query-hash
// Definitions by: Brian Ruddy <https://github.com/bcruddy>

declare module 'query-hash' {

  class QueryHash {
    constructor();
    constructor(data: string);
    constructor(data: {});

    add(key: string, val: string): QueryHash;
    add(key: string, val: boolean): QueryHash;
    add(key: string, val: number): QueryHash;

    remove(key: string): QueryHash;

    find(key: string): string;

    keys(): string[];

    has(key: string): boolean;

    toUrlToken(): string;

    fromUrlToken(token: string): QueryHash;

    toQueryString(): string;

    fromQueryString(queryString: string): QueryHash;

    fromObject(obj: {}): QueryHash;
  }
}