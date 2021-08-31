---
title: Node.js Basics
createdAt: 2015-09-19
description: Basics of Node.js Server-Side Development
---

# {title}

> {description}

<div class="custom-block warning">
  <p class="custom-block-title">Warning!</p>
  <p>Material from first node course 2015. Badly needs a revision.</p>
</div>

An intro to nodejs picked up from Sovelto course plus [Introduction to Node.js](http://beta.pluralsight.com/courses/node-intro) and [Node.js for .NET Developers](http://beta.pluralsight.com/courses/nodejs-dotnet-developers)

Node.js is a server-side JavaScript platform introduced by Ryan Dahl at JSConf in 2009.

The Node.js platform consists of:

- libuv - High performance, cross-platform evented I/O library
- V8 - Google's JavaScript engine
- libraries built in C++ and JS

Node.js binaries and installers are available at http://nodejs.org/download

There is also a multiple versions manager called **nvm** available at https://github.com/creationix/nvm.

You can develop node apps using pretty much any text editor or use an online IDE like [Cloud9](https://c9.io/).

##### A Hello World Web Server

```js
var http = require('http');
http
	.createServer(function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('hello world\n');
	})
	.listen(8000, '127.0.0.1');
```

To run it enter: `node server.js` and open the [web browser](http://127.0.0.1:8000/) to view it.

## The Event Loop

Node.js uses a non-blocking, event loop that constantly listens for events like internal events, timers or external events like tcp or http events.

## Node's Programming Model

Node depends on using asynchronous code which is a bit different to the synchronous model that most programmers are more familiar with.

Since most calls in node are asynchronous execution often uses the _callback_ pattern but you can also use the _publish-subscribe_ pattern.

### Callbacks

- Callbacks use the [request-response](http://en.wikipedia.org/wiki/Request-response) communication pattern and returns an error or the result
- Does not return anything until all done.
- This method is often used because it is simpler compared to the options.
- By convention the callback is the last fuction param

```js
var handleResults = function(err, results) {
  //Check for error
  //Handle result returned in results var
}
doStuff(param, handleResults);

doStuff(param, function (err, items) {
  //Check for error
  //Handle result returned in items var
}
```

- The callback function can be a named function or an anonymous function
- In node.js the function parameters generally look like:

```js
function(arguments, callback);
```

- The callback gererally consists of: `callback(err, returnvalues);`
- The callback function can be defined separately or inline as an anonymous function.

Using lots of callback tend to create the so called christmas tree problem resulting in code that is hard to debug and maintain.

### Publish/Subscribe

- Using the [Publish/Subscribe](http://en.wikipedia.org/wiki/Publish/subscribe) pattern you get the result in chunks and can start processing the result faster.
- You might end up with getting some OK data before an error occurs.
- The publish/subscribe model uses events for communicating results.

```js
var result = doStuff(param);
results.on('item', function (i) {
	//Handle chunk of data sent
});
results.on('done', function () {
	//Done, no more data
});
results.on('error', function (err) {
	//Handle error
});
```

## The Module System

You use modules to bring in external functionality to your application. You use the `require` function to load a module and assign it to a variable for use. Modules can explicitly export functionality (variables, functions, objects) for use in other modules. You can also import a single function from a library.

```js
var foo = require('foo');
var Bar = require('bar'); //Initial capital meant to be instantiated
var one = require('library').one;

var f = 2 + foo.someValue;
var b = new Bar();
console.log(one());
```

### Types of Modules

- [Built-in Modules](http://nodejs.org/api) (no need to require)
- pre-packaged modules (must use require like fs, http...)

## Event Emitters

In the Publish/Subscribe scenario you have the subscriber (sample above) that subscribes and reacts to emitted events by the publisher.

The publisher is the part that emits events to the subscriber. The events are represented by strings. You can also send an arbitrary number of parameters with the event as needed.

A typical event emitter is an object that extends the [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter) class and publishes needed events.

## Streams

A [stream](http://nodejs.org/api/stream.html) is an EventEmitter with an abstract interface. It is used throughout node for handling data flow scenarios like:

- Networking (http request/response, tcp socket)
- File I/O
- stdin/stdout/stderr

A stream can be read-only (stream.Readable), write-only (stream.Writable) or both

## The Process Object

- [API Documentation](http://nodejs.org/api/process.html)

##### Streams

- process.stdin
- process.stdout
- process.stderr

##### Event Emitters

- event 'exit'
- event 'uncaughtException'
- POSIX signal events ('SIGINT', etc )

##### Process Info like

- process.env
- process.pid
- process.title
- process.uptime()
- process.memoryUsage

##### Process Commands Like

- process.kill()

## File System

- The [File System](http://nodejs.org/api/fs.html) support is based on POSIX functionality, both async and sync versions of functions available
- Streams
  - fs.createReadStream()
  - fs.createWriteStream()
- File events - fs.FSWatcher
  - watcher.close()
  - Event: 'change'
  - Event: 'error'

## Buffer

- Traditionally JavaScript has not been good at handling binary data but it is needed by fileSystem and communication classes in node.
- Buffer enables handling of binary data for these
- A buffer can be converted to/from strings using different encodings like ascii, utf8 (default), utf16le, ucs2, base64, binary and hex.
- Buffer thus also supports encoding and decoding strings to/from base64.

## Web

### Http Request

The http protocol is supported by the [http module](http://nodejs.org/api/http.html).

```js
var http = require('http');
var req = http.request('http://www.google.fi', function (resp) {
	console.log(resp.statusCode);
	console.log('headers: ', resp.headers);
	resp.pipe(process.stdout);
});
req.end();
```

- The req variable will contain a http.ClientRequest object
- The resp variable will contain a http.ClientResponse object (ReadableStream)
- The request method can be called with a url string or with an options object as parameter
- Redirects will not be followed (use follow-redirects package)
- Get requests can be simplified by using the get verb

### A Simple Web Server

```js
var http = require('http'),
	host = process.env.IP || '127.0.0.1',
	port = process.env.PORT || 8080;

http
	.createServer(function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Hello World\n');
	})
	.listen(port, host);
console.log('Server running at ' + host + ':' + port);
```

- The req variable contains http.ServerRequest (ReadableStream)
- The res variable contains http.ServerResponse (WritableStream)
- The request can be handled in a callback as above or or using events
- You can also use https instead of using http

### WebSocket

- Two-way real time communication protocol
- Part of html5 W3C & IETF standard
- Low latency
- Low bandwidth

Supported on Windows for IE10+ .NET4.5, Win 8 Metro, Windows Server 2012. For .NET developers there is the SignalR framework.

Browser support [here](http://caniuse.com/websockets)

- Node supports it via **socket.io**

#### WebSocket Sample

##### Server

```js
var io = require('socket.io').listen(80);

io.sockets.on('connection'), function (socket) {
  socket.emit('data', { hello: 'World' });

  socket.on('clientData', function(data) {
    console.log(data);
  });
});
```

##### Client

```html
<script src="socket.io.js"></script>
<script>
	var s = io.connect('http://.');
	s.on('data', function (data) {
		console.log(data);
		s.emit('clientData', { my: 'Data' });
	});
</script>
```

### Frameworks

- Most commonly used node web framework is [express](http://expressjs.com/)
- For ORM there is [Sequelize](http://sequelizejs.com)
- Using node with [Windows Azure Database](http://www.windowsazure.com/en-us/develop/nodejs/tutorials/web-site-with-sql-database/)

## Testing Node.js

- Basic unit testing is built in using the assert module
- For BDD style testing you can use [should.js](https://github.com/visionmedia/should.js/) and [Mocha](http://visionmedia.github.io/mocha/)

### The assert Module

- A built-in module for unit testing
- Test for (in)equality between expected and actual values
- Test whether a block of code throws (or doesn't throw) an exception `throw new Error()`
- Test for the "truthiness" of a value
- Test whether the "error" parameter was passed to a callback
- Each assertion can contain an output message on failure

##### Equality

- `assert.equal()` : shallow i.e. coercive equality(==)
- `assert.strictEqual()` : strict equality (===)
- `assert.deepEqual()` :
  - coercive equality
  - Non-Objects are coercively tested
  - Date objects must have same date/time
  - Other objects (incl. Array). Same amount of properties, checking keys & values plus that prototypes match.

### BDD style testing

For BDD style testing you can use the should.js library and the [Mocha](http://visionmedia.github.io/mocha/) testrunner.

- Can run tests in specified order, both synch and asynch
- You can group tests into suites
- Tests are run using Mocha from the command line. You can run only a specified suite

### should.js

should.js extends the assert module with [BDD](http://en.wikipedia.org/wiki/Behavior-driven_development) style testing

```js
var should = require('should'),
	user = { name: 'tj', pets: ['tobi', 'loki', 'jane', 'bandit'] };

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4);
// or without Object.prototype, for guys how did Object.create(null)
should(user).have.property('name', 'tj');
should(true).ok;
someAsyncTask(foo, function (err, result) {
	should.not.exist(err);
	should.exist(result);
	result.bar.should.equal(foo);
});
```

## Deployment Environments

Node.js runs in a single thread so multiple processor cores typically does not help. The solution is to use multiple node processes.

- The `spawn` command starts a new process
- The `exec` command runs in a command shell and takes callback
- execFile is like exec but for running a specific file
- In IIS use [iisnode](https://github.com/tjanczuk/iisnode)

### iisnode

iisnode is a native IIS module that allows hosting of node.js applications in IIS on Windows.

- **Process management**. The iisnode module takes care of lifetime management
  of node.exe processes making it simple to improve overall reliability. You don’t
  have to implement infrastructure to start, stop, and monitor the processes.
- **Side by side with other content types**. The iisnode module integrates with IIS in
  a way that allows a single web site to contain a variety of content types. For
  example, a single site can contain a node.js application, static HTML and
  JavaScript files, PHP applications, and ASP.NET applications. This enables
  choosing the best tools for the job at hand as well progressive migration of
  existing applications.

- **Scalability on multi-core servers**. Since node.exe is a single threaded process, it
  only scales to one CPU core. The iisnode module allows creation of multiple
  node.exe processes per application and load balances the HTTP traffic between
  them, therefore enabling full utilization of a server’s CPU capacity without
  requiring additional infrastructure code from an application developer.

- **Integrated debugging**. With iisnode integrated debugging you can debug
  your node.js application deployed to IIS from a browser running on
  Windows, Mac, or Linux. You get this support out of the box, no extra
  configuration or installation is necessary. The solution is designed in a
  way that is shared hosting, firewall, and proxy friendly. The integrated
  debugging in iisnode uses node-inspector by Danny Coates.

- **Auto-update**. The iisnode module ensures that whenever the node.js
  application is updated (i.e. the script file has changed), the node.exe
  processes are recycled. Ongoing requests are allowed to gracefully finish
  execution using the old version of the application, while all new requests
  are dispatched to the new version of the app.

- **Access to logs over HTTP**. The iisnode module provides access the
  output of the node.exe process (e.g. generated by console.log calls) via
  HTTP. This facility is key in helping you debug node.js applications
  deployed to remote servers.

- **Minimal changes to node.js application code**. The iisnode module
  enables hosting of existing HTTP node.js applications with very minimal
  changes. Typically all that is required is to change the listed address of
  the HTTP server to one provided by the iisnode module via the
  process.env.PORT environment variable.

- **Integrated management experience**. The issnode module is fully
  integrated with IIS configuration system and uses the same tools and
  mechanism as other IIS components for configuration and maintenance.

- **Other IIS benefits**. Port sharing, security, URL rewriting, compression,
  caching, logging
