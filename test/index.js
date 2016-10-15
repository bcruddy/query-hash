'use strict';

const QueryHash = require('../query-hash');
const expect = require('chai').expect;

describe('QueryHash Constructor', function () {
    it('Should construct without throwing an exception', function () {
        let hasError = false;
        let q;
        try {
            q = new QueryHash();
        }
        catch (ex) {
            hasError = true;
        }

        expect(hasError).to.equal(false);
        expect(q).to.be.an.instanceof(QueryHash);
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
    q.add('tight', 'huh?');

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
        expect(q.toString()).to.equal('test=passed&again=hooray');
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

        expect(q.toString()).to.equal('test=passed&again=hooray&another=one');
    });

    it('Should remove a query string parameter', function () {
        q.remove('test');

        expect(q.toString()).to.equal('again=hooray&another=one');
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
