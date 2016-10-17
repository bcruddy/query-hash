'use strict';

const QueryHash = require('../query-hash');
const expect = require('chai').expect;

describe('QueryHash Constructor', function () {
    it('Should accept 0 parameters', function () {
        let q = new QueryHash();
        expect(q).to.be.an.instanceof(QueryHash);
    });

    it('Should accept querystring parameter', function () {
        let q = new QueryHash('test=passed&again=too');

        expect(q).to.be.an.instanceof(QueryHash);
        expect(q.find('test')).to.equal('passed');
    });

    it('Should accept querystring parameter with a trailing empty value', function () {
        let q = new QueryHash('test=passed&again=');

        expect(q).to.be.an.instanceof(QueryHash);
        expect(q.find('test')).to.equal('passed');
        expect(q.find('again')).to.equal('');
    });

    it('Should accept base64 string parameter', function () {
        let q = new QueryHash('dGVzdD1wYXNzZWQ=');

        expect(q).to.be.an.instanceof(QueryHash);
        expect(q.toQueryString()).to.equal('test=passed');
    });

    it('Should accept plain object parameter', function () {
        let data = {
            test: 'passed',
            again: 'too'
        };
        let q = new QueryHash(data);

        expect(q).to.be.an.instanceof(QueryHash);
        expect(q.toQueryString()).to.equal('test=passed&again=too');
    });

    it('Should reject more than 1 parameter', function () {
        let create = () => new QueryHash('test', 'fails');
        expect(create.bind(null)).to.throw('QueryHash constructor only accepts one optional parameter.')
    });

    it('Should reject invalid input', function () {
        let create = (d) => new QueryHash(d);
        expect(create.bind(null, [])).to.throw('QueryHash constructor only accepts a query string, base64 string, or a plain object.');
        expect(create.bind(null, null)).to.throw('QueryHash constructor only accepts a query string, base64 string, or a plain object.');
        expect(create.bind(null, false)).to.throw('QueryHash constructor only accepts a query string, base64 string, or a plain object.');
    });
});

describe('QueryHash.add method', function () {
    let q = new QueryHash();

    it('Should add two key-values to the query hash', function () {
        q.add('first', 'passed');
        q.add('second', 'also-passed');

        expect(q.keys()).to.have.lengthOf(2);
    });

    it('Should throw an expection if 0 parameters are given', function () {
        expect(q.add.bind(q)).to.throw('QueryHash.add expects 2 parameters, 0 given');
    });

    it('Should throw an expection if 1 parameter is given', function () {
        expect(q.add.bind(q, 'test')).to.throw('QueryHash.add expects 2 parameters, 1 given');
    });

});

describe('QueryHash.remove method', function () {
    let q = new QueryHash();
    q.add('remove', 'me');

    it('Should remove a key-value by its key', function () {
        expect(q.keys()).to.have.lengthOf(1);

        q.remove('remove');

        expect(q.keys()).to.have.lengthOf(0);
    });

    it('Should throw an expection if 0 parameters are given', function () {
        expect(q.remove.bind(q)).to.throw('QueryHash.remove expects one parameter, 0 given');
    });
});

describe('QueryHash.find method', function () {
    let q = new QueryHash(); 
    q.add('white', 'house');
    q.add('green', 'car');

    it('Should find a value by its key', function () {
        expect(q.find('white')).to.equal('house');
    });

    it('Should throw an expection if 0 parameters are given', function () {
        expect(q.find.bind(q)).to.throw('QueryHash.find expects one parameter, 0 given');
    });
});

describe('QueryHash.has method', function () {
    let q = new QueryHash();
    q.add('whoa', 'dude');
    q.add('what', 'bro');
    q.add('tight', 'huh');

    it('Should return a boolean indicating whether or not a given key exists', function () {
        expect(q.has('whoa')).to.equal(true);
        expect(q.has('nosir')).to.equal(false);
    });
});

describe('QueryHash.keys method', function () {
    let q = new QueryHash();
    q.fromQueryString('test=passed&again=hooray');

    it('Should return an array of query string keys', function () {
        expect(q.keys()).to.have.lengthOf(2);
        expect(q.keys()).to.deep.equal(['test', 'again']);
    });
});

describe('QueryHash.toString method', function () {
    let q = new QueryHash();
    q.add('test', 'passed');
    q.add('again', 'hooray');

    it('Should create a query string from added key-values', function () {
        expect(q.toQueryString()).to.equal('test=passed&again=hooray');
    });
});

describe('QueryHash.fromQueryString method', function () {
    let q = new QueryHash();
    it('Should accept a querystring correctly', function () {
        q.fromQueryString('test=passed&again=hooray');

        expect(q.keys()).to.deep.equal(['test', 'again']);
    });

    it('Should add a query string parameter', function () {
        q.add('another', 'one');

        expect(q.toQueryString()).to.equal('test=passed&again=hooray&another=one');
    });

    it('Should remove a query string parameter', function () {
        q.remove('test');

        expect(q.toQueryString()).to.equal('again=hooray&another=one');
    });
});

describe('QueryHash.toUrlToken method', function () {
    let q = new QueryHash();
    q.add('test', 'passed');
    
    it('Should output a base64 encoded string', function () {
        expect(q.toUrlToken()).to.equal('dGVzdD1wYXNzZWQ=');
    });
});

describe('QueryHash.fromUrlToken method', function () {
    let q = new QueryHash();

    it('Should accept a base64 string', function () {
        q.fromUrlToken('dGVzdD1wYXNzZWQ=');

        expect(q.find('test')).to.equal('passed');
    });
});

describe('QueryHas.fromObject method', function () {
    let q = new QueryHash();

    let fakeData = {
        item: 'is',
        a: 'test object'
    };
    
    it('Should throw an exception when no params passed', function () {
        expect(q.fromObject.bind(q)).to.throw('QueryHash.fromObject expects one parameter, 0 given');
    });

    it('Should throw an exception if the argument passed isnt an object', function () {
        expect(q.fromObject.bind(q, null)).to.throw('QueryHash.fromObject expects an object');
    });

    it('Should transform fakeData from object to query string', function () {
        q.fromObject(fakeData);

        expect(q.toQueryString()).to.equal('item=is&a=test%20object');
    });

});
