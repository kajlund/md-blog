---
title: Jasmine
createdAt: 2014-06-15
description: The Jasmine testing framework for JavaScript.
---

# {title}

> {description}

::: warning
Written back in mid June of 2014
:::

[Jasmine](http://jasmine.github.io/) is a popular Open Source BDD testing framework that supports both client-side and server-side testing.

## Setup

The easiest way to get started is to download a standalone [Jasmine release](https://github.com/jasmine/jasmine/releases), unzip it, copy into your project and start testing. It contains a SpecRunner.html that you open for running your tests. For automated test running you can use your favorite IDE or Karma

## Describe Blocks

```js
describe('User', function() {
  /* tests */
});
```

```js
describe('User', function() {
  describe('when new', function() {
    /* tests */
  });
});
```

## Writing Tests

* `it()`
* `beforeEach` and `afterEach`
* Matchers and Custom Matchers

```js
describe('User', function() {
  var sut;

  beforeEach(function() {
    sut = new SUT();
  });

  afterEach(function() {
    /* cleanup code */
  });

  it('should be able to play a song', function() {
    /* code and assertions */
  });
});
```

## Matchers

* `expect(x).toEqual(y);`
* `expect(x).toBe(y); // ===`
* `expect(x).toMatch(pattern); //regex`
* `expect(x).toBeDefined();`
* `expect(x).toBeUndefined();`
* `expect(x).toBeNull();`
* `expect(x).toBeTruthy();`
* `expect(x).toBeFalsy();`
* `expect(x).toContain(y);`
* `expect(x).toBeLessThan(y);`
* `expect(x).toBeGreaterThan(y);`
* `expect(function() {fn();}).toThrow(ex);`

You can negate these matchers by expressing `expect(x).not.toBe`...

## Custom Matchers

```js
beforeEach(function() {
  this.addMatchers({
    toBeFive: function() {
      return this.actual === 5;
    }
  });
});
```

Example:

```js
var Calculator = function() {

};

Calculator.prototype.add = function (a, b) {
  return a + b;
}

Calculator.prototype.divide = function (a, b) {
  return a / b;
}
```

```js
describe("Calculator", function () {
  var calc;

  beforeEach(function () {
    calc = new Calculator();
    this.addMatchers({
      toBeBetween: function(a, b) {
        return this.actual >= a && this.actual <= b;
      }
    });
  });

  it("should be able to add 1 and 1", function () {
    expect(calc.add(1, 1)).toBe(2);
  });

  it("should be able to divide 6 and 2", function () {
    expect(calc.divide(6, 2)).toBe(3);
  });

  it("should be able to divide a rational number", function () {
    //expect(calc.divide(1, 3)).toBeGreaterThan(0.3);
    //expect(calc.divide(1, 3)).toBeLessThan(0.4);
    expect(calc.divide(1, 3)).toBeBetween(0.3, 0.34);
  });
});
```

## Running Tests

- Runs in the browser
- Passed and skipped tests are hidden by default
- Tests can be filtered by describe block or individual test
- To skip a test add an `x` in front of the `describe` or `it` declaration

```js
xit('should be skipped', function () {
  /* this test should be skipped */
});
```

```js
xdescribe('MyClass', function () {
  /* all tests inside are skipped */
});
```

## Jasmine Spies

- Mostly represents a subset of the functionality provided by sinon.
- Built for mocking single functions
- Supports both replacement and pass-through mocking
- Has many built in matchers
