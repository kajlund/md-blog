---
title: Mocha
createdAt: 2015-08-31
description: Mocha unit testing framework for JavaScript.
---

# {title}

> {description}

<div class="custom-block warning">
  <p class="custom-block-title">Warning!</p>
  <p>Written back in Aug of 2015</p>
</div>

This doc assumes you are testing server-side code i.e. Node.js V8, not browser clients. Mocha can also run in browsers.

- Initially developed for NodeJS but has also gained popularity for client side JavaScript testing
- Open Source, Cross-Browser client and node.js server support
- Supports both TDD and BDD style testing
- Supports asynchronous testing
- Supports any JavaScript assertion library
- Integrates with CI tools
- Highlight slow tests
- Before, after, before each, after each
- Global variable leak detection

## Install

- Either get [source from github](https://github.com/visionmedia/mocha) for running in browser
- or `npm install --save-dev mocha` for command line support
- You can optionally also `npm install -g mocha` for convenience
- Mocha doesn't provide a default assertion library so typically you'd also install something like
  [chai](http://chaijs.com/) `npm install --save-dev chai`.

> When running command line you are testing against the v8 engine which is fine for node apps but might not suffice for testing client-side.

## Running Tests

There are a lot of different ways of setting up how to automatically test the code in browsers. A popular option that the AngularJS developer team uses is the [Karma](http://karma-runner.github.io/0.12/index.html) test runner. A simple option is to create an html-file for running the tests and open it in the different browsers you like to test your code in. For nodejs code you can run mocha from the command line, as an npm script or via the Gulp or Grunt task runners.

If you've installed mocha as a global node package you can run tests from the command line. `mocha mytests.js myothertest.js`.

Mocha by default can look for specific kinds of files. By default it will find a file called tests.js in the current dir. If you instead have all your test files under a directory called `test` mocha will find and run them all.

Mocha can also watch the files in your test directory and run whenever a file in the directory is changed. `mocha -w`.

Check the [mocha doc](https://mochajs.org/) Usage section for more info on params.

## Mocha Features

The typical structure of a test file can be found [here](https://gist.github.com/kajlund/81d4c2f432b4da5b8028)

### Setup and Teardown

The `beforeEach` function is used to reset whatever we are testing to a fixed state before running each test (it function). The `afterEach` is similarly runs after each test.

### Grouping

You can group tests together under a `describe` block as many levels as you want.

### Pending Tests

Specifications not yet implemented. Just add the `it` functions using the description but without implementing the actual test.

```javascript
it('should return NaN if passed 0 operands');
it('should return NaN if passed 1 operand');
```

### Skipping Tests

You can skip all but a certain suite or test by calling **.only** after **describe** or **it** calls.

```javascript
describe.only('Add', function () {
	it('should return the sum of both operands', function () {
		expect(calc.add(1, 1)).to.be(2);
	});
});

describe('Add', function () {
	it.only('should return the sum of both operands', function () {
		expect(calc.add(1, 1)).to.be(2);
	});
});
```

You can skip whole suites or certain tests in a suite by adding **.skip** after **describe** or **it** calls.

```javascript
describe.skip('Add', function () {
	it('should return the sum of both operands', function () {
		expect(calc.add(1, 1)).to.be(2);
	});
});

describe('Add', function () {
	it.skip('should return the sum of both operands', function () {
		expect(calc.add(1, 1)).to.be(2);
	});
});
```

## Assertion Libraries

- Mocha does not include any specific assertion libraries so you need to choose one.

There are many popular assertion libraries to choose from:

- Chai
- expect.js
- should.js
- many others

### The Chai Assertion Library

Chai js supports 3 popular assertion syntaxes:

- Assert
- Expect
- Should

```javascript
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should(); //Not IE friendly
```

#### Using The Expect Syntax

```javascript
expect(myVar).to.equal(3);
expect(myVar).to.be.a('string');
```

## Sinon

### Spies

### Stubs

### Mocks

## Resources

- Unit Testing with Node.js on Pluralsight
- Node.js Testing Strategies on Pluralsight
- [Mocha](https://mochajs.org/)
- [chai](http://chaijs.com/)
- [superagent](https://github.com/visionmedia/superagent)
- [Request http library](https://github.com/request/request)
- [Should.js assertion library](https://github.com/shouldjs/should.js)
- [Chakram](http://dareid.github.io/chakram/) REST API test framework
- [Testing node with Mocha, expect and noc](http://www.mikeball.us/blog/testing-node-with-mocha-expect-and-nock/)
