---
title: Large Scale JS
createdAt: 2015-03-15
description: Looking at developing JavaScript applications at scale
---

# {title}

::: Warning!
Material from back in 2015
:::

> I watched a really interesting course by Shawn Wildermuth on [Pluralsight](http://www.pluralsight.com/training/Courses/TableOfContents/large-scale-javascript) recently and learned a thing or two about writing large scale JavaScript applications.

The material is very useful when applied to large applications, but can of course benefit small projects as well.

## What is large Scale JavaScript?

How to determine what is large (subjective)

* More than 10 000 lines of code
* More than 12 members in a team
* Complex application (many modules and/or areas of functionality)

### What's Wrong with JavaScript?

* JavaScript wasn't designed for scale (modularity, composition classes...)
* Among the key flawds are lack of packaging, too easy to pollute the global namespace, prototypical inheritance and immature tooling.
* Easily end up with big files containing a mix of business logic and UI logic using libraries like jQuery.
* Nested asynchronous calls can lead to what is known as callback-hell

> These flawds often lead to code that is hard to read and maintain.


### Frameworks and Libraries

* A library is a toolbox for a specific purpose. It doesn't imply structure
* A framework contains a set of libraries/tools for a specific purpose. They do imply structure.
* Popular frameworks are AngularJS, Ember, Durandal, Knockout, Backbone

> Scalable JavaScript is not a product of a framework but frameworks can make it simpler to build large scale apps.


### What's the Solution?

**The key is to have a codebase that is**:

* Maintainable - Modularized, Separation of concerns,
* Scalable - Compozeable, loosely coupled
* Testable - Encapsulate, test facades

> SPAs do not solve these problems but can make them worse. Apps should include as many pages as necessary. *Rich JavaScript applications* would be a better name.

SPAs have brought some goodness:

* Encourages loose coupling
* uses MV*
* Tend to have long lived pages
* Focuses on data binding + REST

> Good development practices can solve many of the problems with the JavaScript language

### Meta Languages

* ES6 - will add modules, classes and inheritance
* CoffeeScript, requires learning Rubyesque syntax
* TypeScript, requires mostly learning ES6 syntax, type safety
* Dart, requires mostly learning ES6 syntax, type safety

> Using a meta language can help but will need to be backed by good development practices to solve our problems building large scale apps.


## Maintainable JavaScript

* Avoid the global scope so you don't have to worry about name collisions
* Use strict mode to help find mistakes early
* Increase stability by structuring your code into separate modules
* Manage dependencies by using the dependency injection pattern
* Abandon nested callbacks in favor of promises and async patterns
* Use eventing and messaging for loose coupling of modules

### Application Frameworks

* Techniques for writing maintaiable code works with most frameworks
* Frameworks may encourage you to write more maintainable codebases, but it's ultimately up to the developers to do the right thing


### Avoid Polluting the Global Scope

* Easy to pollute - Too easy to create global vars in JavaScript
* Collision - Risk of overwriting existing vars
* Monolithic - Encourages large blocks of code instead of smaller pieces of structured code

> In JS there is no block scope. Instead we must use function scope to avoid global objects.

* **Self-Executing Anonymous Functions** (SEAF)
* Also called **Self-Invoking Anonymous Functions** (SIAF)
* And **Immediately Invoked Function Expressions** (IIFE)

```javascript
(function () {
    // Your Code Here
    var a = {}; // The a object is only global inside the function
})();
```

Enclosing a function inside parenteses creates a function object. The last two parenteses tells the parser to execute the function object. Any variable declared inside this function will not leak to the global scope. You can pass parameters between the last two parenteses to prevent global object lookup.

```javascript
(function ($) {
    // Your Code Here
    $.each(...)
})(jQuery);
```

### Strictness in JavaScript

Using strict mode improves code quality by providing early detection of problematic code.

* Prohibits automatic var declaration on first use
* Enforces type
* Enforces implemented read/write access to objects

In strict mode exceptions are raised when these bad practices are used in code. Using strict mode is not a replacement for JSLint.

```javascript
(function () {
    x = 0; // works
    var y = "";
    y = 123;    // works too
})();
```

```javascript
(function () {
    "use strict";

    x = 0;      // raises exception
    var y = "";
    y = 123;    // raises exception
})();
```

### Modular JavaScript

Small discrete units of work pieced together to make code base more maintainable

> each of a set of standardized parts or independent units that can be used to construct a more complex structure

* A module is a single unit of work horizontal (login) or vertical (logging).
* Small, reusable and individually testable
* Loosly coupled
* Discrete

Rules for Modules:

* No DOM manipulation outside a module
* No global declarations
* No Hard coupling to other modules
* No accessing of Global/Native objects (pass them in)

#### The Module Pattern

Returns a Singleton representing the module.

```javascript
var destinationsModule = function() {
    "use strict";

    var _cache = {};

    function _fillCache(callback) {
        //...
    }

    return {
        fillCache: _fillCache,
        cache: _cache
    };
})();
```

#### The JavaScript Class Pattern

Useful when you need multiple instances of objects.

```javascript
function Animal() {
    "use strict";

    this.cache = {};
}

Animal.prototype.walk = function () {
    //...
}
```

Framework    | Types of Modularity
-------------|-----------------------
JavaScript   | Namespaces, Module Pattern, Class Pattern
AngularJS    | Modules, Services, Factories, Controllers, Directives
Backbone     | Namespaces and Objects. More with extensions
EmberJS      | Extend built-in objects or use ES6
Durandal     | Asynchronous Module Definition
EcmaScript 6 | [CommonJS](http://en.wikipedia.org/wiki/CommonJS) Compatible

### Dependency Management

> The degree to which each program module relies on each one of the other modules

A system for handling dependencies across an application. Using the [dependency injection pattern](http://en.wikipedia.org/wiki/Dependency_injection) (a.k.a. inversion of control) is typical.

Allows passing dependencies without relying on global scope. Cascading dependencies are handled automatically

* RequireJS (e.g. AMD)
* CommonJS
* AngularJS


#### Asynchronous Module Definition (AMD)

Making a Module

```javascript
// someModule.js - default module name is file name if no name provided
// The array param is for dependencies required for this module
define("myModule", [], function () {

    function _init() {

    }

    return {
        init: _init
    }
});

```

**Using a Module**

```javascript
require(["myModule", "jQuery"],
    function (myModule, $) {
        //use the dependencies
    }
);
```

#### CommonJS Spec

The module must use the exports function to export the facade of the module.

```javascript
exports.getMeSomething = function () {
    ...
}

```

The code using the module requires the exported facade by assigning it to a variable that can then be used.

```javascript
var my = require('./myModule');
my.getMeSomething();

```

AngularJS Sample

```javascript
var myModule = angular.module("myModule", []);

myModule.factory("dataFactory", [],
    function () {
        var _myData = {};
        return {
            myData: _myData
        }
    });

myModule.controller("controller", ["dataFactory"],
    function (dataFactory) {
        //...
    });

```


### Smart Asynchrony

* Deeply nested callbacks become hard to maintain
* The two patterns commonly used to deal with this is *promises* and *async libraries*


```javascript
$(document).ready(function() {
    $.get("/api/destinations", function(result) {
        if (result.success) {
            if ($("#userName").length > 0) {
                $.get("/api/user/" + userId, function (result) {
                    if (result.success) {
                        ...
                    }
                });
            }
        } else {
            alert("Failed to get destinations");
        }
    });
});
```

#### Promises

```javascript
// using Q.js
someModule.makeAsyncCall()
    .then(function () { ... })     // runs first
    .then(function () { ... })     // runs second
    .fail(function () { ... })     //runs if something fails
    .finally(function () { ... })  //runs after either success or fail
    .done();                       //completes the promises chain

```

#### Async Library

* Used by node.js

```javascript
// using Async

async.parallel([
    function(cb) {
        ...
        cb(1);
    },
    function (cb) {
        ...
        cb(2);
    }
], function (err, results) {
    ...
    // results = [1,2]
});

```

### Loose Coupling

* don't maintain hard links between modules
* Avoid every module requiring references to every other module
* Enables testing
* The key to loose coupling is messaging by pub/sub or global events


#### jQuery Events

JQuery has a global event object on the jQuery object.

```javascript
//Publish event
$.event.trigger("our.event.name", ["some", "Context"]);

//Subscribe (requires DOM element)
$(document).on("our.event.name"),
    function (event, some, context) {
        //...
    });

```

#### AmplifyJS

```javascript
//Publish event
amplify.publish("our.event.name", "some", "context");

//Subscribe
amplify.subscribe("our.event.name"),
    function (some, cnx) {
        //...
    });

```

#### AngularJS

```javascript
//Publish event
app.controller("myCtrl", function ($rootScope) {
     $rootScope.$broadcast("our.event.name", "some", "context");
});

//Subscribe

app.controller("myCtrl", function ($scope) {
     $scope.$on("our.event.name", function(some, ctx { ... })
});

```



## Scalable JavaScript

JavaScript code can run on many different types of devices. You want your code to run on both high-end and low-end devices.

JavaScript typically has the following scalability problems:

* Runtime performance (Desktop/Mobile) - Improve code quality
* Parse time - Affects startup time. Optimize code.
* Download speeds - Compose your app so that not everything is loaded up front



### Improve Code Quality

Entails writing less code, improving your app architecture and smarter UI coding.

* Code size impacts performance - Parsing is a bottleneck not linear with code size
* Your code is not always cached or JITed
* Deferring operations until necessary is important
* Users are more inclined to wait as they go that wait up front
* Use a smart application architecture where you are able to compose a larger app into loadabled modules via a common facade and underlying framework. Don't make direct dependencies between modules.
* Smarter UI coding entails avoiding pre-drawing hidden UI if possible, do DOM manipulation off DOM (remove, edit, insert).


### Optimize

* Make your source as small as possible by minifying
* Automate by creating a build step
* Remove debug code sections using conditional compilation

#### Minification

> The process of removing all unnecessary characters from source code without changing its functionality

* To be able to minify your code needs to be planned for it. Relying on function parameter names is a typical problem.
* Automate minification with tools like Visual Studio, GruntJS etc.
* Parameter-, function- and variable names are shortened
* White space is removed.

GruntJS is a nodejs based JavaScript Task Runner. The Contrib-Uglify plugin allows you to do minification.

Minifying is helpful, but removing code that is only used for debugging is also crucial in delivering only required JavaScript to the browser.

#### Conditional Compilation

You can use [GruntJS](http://gruntjs.com/) and [UglifyJS](https://github.com/gruntjs/grunt-contrib-uglify) to accomplish conditional compiling:

```javascript
if (typeof DEBUG === undefined) DEBUG = true; //Force

DEBUG && console.log("some info");
if (DEBUG) {
    console.log("Other info");
}

function foo() {
    console.log("initial");
}
foo();

```


```javascript
//gruntfile.js
...
uglify: {
    options: {
        compress: {
            global_defs: {
                DEBUG: false
            },
            dead_code: true //remove code never called
        }
    },
    ...
}

```


### Composition

* Construct your JavaScrips as necessary instead of loading all that's available
* Concatenate and minify into logical code units
* You can use JavaScript loaders (combined with dependency injection) to do the heavy lifting

You can easily minify to separate JavaScript modules using GruntJS + UglifyJS.

[LazyLoadJS](https://github.com/rgrove/lazyload/) allows you to lazy load javascript. It works well with frameworks that already handle dependencies like AngularJS:

```javascript
// main.js
// include lazyload.js

$("#loadButton").on("click", function () {
    LazyLoad.js(["js/build/module1.min.js"], function () {
        // Now module is loaded
    });
});
```

[RequireJS](http://requirejs.org/) mixes script loading and dependency management. Scripts needed are defined in the html page as usual but will not be loaded until they are required.

```
// index.html
...
<script src="js/vendor.require.min.js"
    data-main="js/main"</script>

//main.js (or main.min.js)
require(["myModule"], function (myModule) {
    //use myModule
});

//myModule.js
define([], function () { //module pattern
    ...

    return {
        cache: _cache
    }
});
```




## Testable JavaScript

* Ad-hoc JavaScript fails to separate concerns and is simply impossible to test except for UI-centric testing.
*


### Why is testing JS hard?

* Nested anonymous functions
* Side effects because of globals or closures
* Business rules in event handlers
* Navigation mixed into other code

### Types of tests

* UI Tests - Testing expected bahavior of the DOM
* Unit Tests - Testing a single module
* Integration Tests - Testing that multiple modules work together

> Testability in JS is typically relative to the amount of effort you put into creating maintainable and scalable code. Good separation and modularization of your code makes it more testable.

If you can unit test it's a good indicator that you have a good structure or architecture in your project.

### Unit Testing

> A method by which individual units of source code together with associated control data, usage procedures, and operating procedures are tested to determine if they are fit for use.

* An atomic test that determines expected bahavior (for specific input, what is the expected output)

* [Mocha](http://visionmedia.github.io/mocha/), [Jasmine](http://pivotal.github.io/jasmine/), [QUnit](http://qunitjs.com/) etc.

### A few useful links

* [OSCon Slides](http://www.slideshare.net/briandemant/smarr-oscon-2007)
* [Web Essentials VS Plugin](http://visualstudiogallery.msdn.microsoft.com/6ed4c78f-a23e-49ad-b5fd-369af0c2107f)
