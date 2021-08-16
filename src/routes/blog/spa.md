---
title: Single Page Applications
createdAt: 2015-08-28T18:25:30
description: Some thoughts on Single Page Application (SPA) frameworks and components.
---

# {title}


::: warning
Written back in 2015.
:::

## Categories

You could broadly categorize frameworks for building SPA's into:

* JavaScript only frameworks
* Thin JavaScript Layer frameworks
* HTML Integration frameworks

### JavaScript only Frameworks

With this approach you do pretty much all work using a JavaScript framework. You get a high level
of abstraction and don't have to simultaneously have expert level knowledge on JavaScript, HTML
and CSS. On the other hand performance might suffer and your options in layout, widgets etc.
will be restricted by the framework used.

The Ext.js and Sencha Touch frameworks use this approach.

### Thin JavaScript Layer Frameworks

This approach combines the traditional techniques of HTML, CSS and JavaScript. You have less
abstraction but probably better performance.

This is perhaps the most common approach and it allows for great flexibility in choosing tools,
libraries, widgets etc. The downside of using this approach compared to JavaScript only frameworks
is that you apart from knowing JavaScript + libraries also need to know HTML and CSS.

Using this approach the first library to enter the toolbox is typically jQuery. Be aware that if
you are building something non-trivial you're going to want more than jQuery as the code base grows.
Typically you'd add some kind of client-side MVC framework for structure and maintainability.

### HTML Integration Frameworks

This approach in contrast to the JavaScript only Frameworks tries to extend the HTML syntax to better
suit building applications. Typically you bind to HTML elements using special syntax (html5 data
attributes) and lean on dependency injection.

AngularJS and jQuery Mobile use this approach.


## Components of a SPA Framework

There's no end to the amount of libraries, widgets and different levels of frameworks available
for building SPA's. Here's some categories of stuff you'd be looking for sooner or later depending
on the size of your project.

 * Languages
 * Structure
 * Routing
 * Data model
 * User Interface Handling
 * Generic Libraries
 * Tools
   *  Package Management
   *  Syntax Checking
   *  ALM Tools
   *  Profiling
* Testing

### Languages

To build an application you'll need a programming language. For client side web applications the only consistently available programming language in web browsers is JavaScript.

That said, new languages that can be compiled to JavaScript become available all the time. Maybe the major ones at the time I write this are:

* [CoffeeScript](http://coffeescript.org/)
* [Dart](http://www.dartlang.org/)
* [TypeScript](http://www.typescriptlang.org/)

I think that among the above mentioned TypeScript seems most interesting. The reason is that the philosophy is to provide what JS will eventually support plus optionally strong typing.

### Structure

If you intend to build something non trivial you'd need to organize your code for maintainability.
Many of the client side frameworks provide some form of MVC or MVVM pattern for keeping things
under control.

If you're not using any particular framework, you should have a look at module handling using
[AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition) like [Require.js](http://requirejs.org/)
or [CommonJS](http://en.wikipedia.org/wiki/CommonJS) like [Browserify](http://browserify.org/).

Most of the SPA frameworks like will provide their own ideas on how to structure your application.

### Routing

Routing is an important part of a SPA and concerns how to map URL changes in the browser to code in your
application.

Some of the more popular client side SPA frameworks like AngularJS and ember.js contain functionality for
route handling.

There are libraries that only do route handling that you could adapt as well.

### Data Model

Implementing client-side data models is one major thing that sets a library like jQuery apart from a
proper SPA framework like Angular.js and ember.js.

Using jQuery your client side data model is often in the DOM. This is usually OK for simple scenarios but
starts to break down when you build more complex applications.

Many frameworks allow you to define your objects and lists in your application and support data binding
for updates between UI and data model.

Model-Collection-Sync


### User Interface Handling

* Grid Systems
* Layout/Styling (Bootstrap et. al.)
* View Templating (handlebars, underscore)
* Data binding
* Preprocessors (LESS/SASS)

* Widgets (Typically based on jQuery)

The larger frameworks typically include routers and module handling capabilities as well. The functionality provided by the larger MVC frameworks can be pieced together using smaller frameworks like Backbone.js, Can.js, Knockout.js and many, many others.


### Generic Libraries
* jQuery, Zepto, underscore
* Polyfills (es5shim, modernizr)


### Tools

#### Package Management

* [Bower](https://github.com/bower/bower)

#### Syntax Checkers

* JsLint/JsHint

#### ALM tools

*  (Node.js + Grunt.js for minification, linting, concatenation and running tests)

#### Profiling

* YSlow


### Unit Testing

* QUnit
* Mocha
* Jasmine
