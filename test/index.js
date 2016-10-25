'use strict';

const QueryHash = require('../query-hash');
const expect = require('chai').expect;

describe('QueryHash Constructor', function () {
    it('Accept 0 parameters', () => {
        let q = new QueryHash();
        expect(q).to.be.an.instanceof(QueryHash);
    });

    it('Accept query string parameter', () => {
        let q = new QueryHash('test=passed&again=too');

        expect(q).to.be.an.instanceof(QueryHash);
        expect(q.find('test')).to.equal('passed');
    });

    it('Accept query string parameter with a trailing empty value', () => {
        let q = new QueryHash('test=passed&again=');

        expect(q).to.be.an.instanceof(QueryHash);
        expect(q.find('test')).to.equal('passed');
        expect(q.find('again')).to.equal('');
    });

    it('Accept base64 string parameter', () => {
        let q = new QueryHash('dGVzdD1wYXNzZWQ=');

        expect(q).to.be.an.instanceof(QueryHash);
        expect(q.toQueryString()).to.equal('test=passed');
    });

    it('Accept plain object parameter', () => {
        let data = {
            test: 'passed',
            again: 'too'
        };
        let q = new QueryHash(data);

        expect(q).to.be.an.instanceof(QueryHash);
        expect(q.toQueryString()).to.equal('test=passed&again=too');
    });

    it('Throw exception on more than 1 parameter', () => {
        let create = () => new QueryHash('test', 'fails');
        expect(create.bind(null)).to.throw('QueryHash constructor only accepts one optional parameter.')
    });

    it('Throw exception on invalid input', () => {
        let create = d => new QueryHash(d);
        expect(create.bind(null, [])).to.throw('QueryHash constructor only accepts a query string, base64 string, or a plain object.');
        expect(create.bind(null, null)).to.throw('QueryHash constructor only accepts a query string, base64 string, or a plain object.');
        expect(create.bind(null, false)).to.throw('QueryHash constructor only accepts a query string, base64 string, or a plain object.');
    });
});

describe('QueryHash.add method', function () {
    let q = new QueryHash();

    it('Add two key-values to the instance', () => {
        q.add('first', 'passed');
        q.add('second', 'also-passed');

        expect(q.keys()).to.have.lengthOf(2);
    });

    it('Throw an exception if 0 parameters are given', () => {
        expect(q.add.bind(q)).to.throw('QueryHash.add expects 2 parameters, 0 given');
    });

    it('Throw an exception if 1 parameter is given', () => {
        expect(q.add.bind(q, 'test')).to.throw('QueryHash.add expects 2 parameters, 1 given');
    });

});

describe('QueryHash.remove method', function () {
    let q = new QueryHash();
    q.add('remove', 'me');

    it('Remove a key-value by its key', () => {
        expect(q.keys()).to.have.lengthOf(1);

        q.remove('remove');

        expect(q.keys()).to.have.lengthOf(0);
    });

    it('Throw an exception if 0 parameters are given', () => {
        expect(q.remove.bind(q)).to.throw('QueryHash.remove expects one parameter, 0 given');
    });
});

describe('QueryHash.find method', function () {
    let q = new QueryHash(); 
    q.add('white', 'house');
    q.add('green', 'car');

    it('Find a value by its key', () => {
        expect(q.find('white')).to.equal('house');
    });

    it('Throw an exception if 0 parameters are given', () => {
        expect(q.find.bind(q)).to.throw('QueryHash.find expects one parameter, 0 given');
    });
});

describe('QueryHash.has method', function () {
    let q = new QueryHash();
    q.add('whoa', 'dude');
    q.add('what', 'bro');
    q.add('tight', 'huh');

    it('Return true when instance contains key', () => {
        expect(q.has('whoa')).to.equal(true);
    });

    it('Return false when instance does not contain key', () => {
        expect(q.has('nosir')).to.equal(false);
    });
});

describe('QueryHash.keys method', function () {
    let q = new QueryHash();
    q.fromQueryString('test=passed&again=hooray');

    it('Returns an array of query string keys', () => {
        expect(q.keys()).to.have.lengthOf(2);
        expect(q.keys()).to.deep.equal(['test', 'again']);
    });
});

describe('QueryHash.toQueryString method', function () {
    let q = new QueryHash();
    q.add('test', 'passed');
    q.add('again', 'hooray');

    it('Create a query string from instance key-values', () => {
        expect(q.toQueryString()).to.equal('test=passed&again=hooray');
    });
});

describe('QueryHash.fromQueryString method', function () {
    let q = new QueryHash();
    it('Accept a query string as input', () => {
        q.fromQueryString('test=passed&again=hooray');

        expect(q.keys()).to.deep.equal(['test', 'again']);
    });
});

describe('QueryHash.toUrlToken method', () => {
    let q = new QueryHash();
    q.add('test', 'passed');
    
    it('Return a base64 encoded string', () => {
        expect(q.toUrlToken()).to.equal('dGVzdD1wYXNzZWQ=');
    });
});

describe('QueryHash.fromUrlToken method', function () {
    let q = new QueryHash();

    it('Accept a base64 string', () => {
        q.fromUrlToken('dGVzdD1wYXNzZWQ=');

        expect(q.find('test')).to.equal('passed');
    });
});

describe('QueryHash.fromObject method', function () {
    let q = new QueryHash();

    let fakeData = {
        item: 'is',
        a: 'test object'
    };
    
    it('Throw an exception when no params passed', () => {
        expect(q.fromObject.bind(q)).to.throw('QueryHash.fromObject expects one parameter, 0 given');
    });

    it('Throw an exception if the argument passed isnt an object', () => {
        expect(q.fromObject.bind(q, null)).to.throw('QueryHash.fromObject expects an object');
        expect(q.fromObject.bind(q, '')).to.throw('QueryHash.fromObject expects an object');
        expect(q.fromObject.bind(q, false)).to.throw('QueryHash.fromObject expects an object');
    });

    it('Transforms fakeData from object to query string', () => {
        q.fromObject(fakeData);

        expect(q.toQueryString()).to.equal('item=is&a=test%20object');
    });
});
