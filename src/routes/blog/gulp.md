---
title: Gulp
createdAt: 2014-05-10
description: A short intro on how to use Gulp, a node.js automation tool.
---

# {title}

::: Warning!
Written back in May of 2014
:::

[Gulp](http://gulpjs.com/) is a task runner that can be used as an alternative to *Grunt*. Whereas Grunt is more declarative, Gulp might feel more natural to a Node.js programmer. It is a nodejs module that can help you automate and enhance your workflow in the areas of development, testing and Continuous Integration. Grunt is configuration over code and file based. Gulp is code over configuration, stream/memory-based, and it's easier to use your own nodejs code directly.


With Gulp you can automate things like:

* Lint sorce code (eslint, jshint, jscs...)
* Run unit tests
* Source Transpiling, Concatenation and Minification. Own or 3rd party
* Build distributables by minifying css/js
* CSS compilation like LESS to CSS including vendor prefix handling
* Copy/move files.
* Inject html files
* Angular Template Cache, ngAnnotate
* Bump package versions for npm and bower
* File revisions and versioning, Cache Busting
* Push git tags
* Watch your source to automatically trigger tasks when anything changes
* etc etc

By default, Gulp tasks run asynchronously.

> Using gulp you can ensure code quality, automatically run tests and have an automated build pipeline. Develop - Analyze - Test - Build - Deploy


## Resources

* [Gulp homepage](http://gulpjs.com/)
* [Gulp Github page](https://github.com/gulpjs/gulp)
* [Gulp Recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes)
* [Gulp Plugins](http://gulpjs.com/plugins/)
* [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [API Documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md)
* [Laracasts video tutorial](https://laracasts.com/lessons/gulp-this)
* [Pony Foo Blog Post](https://ponyfoo.com/articles/my-first-gulp-adventure)
* JavaScript Build Automation @ PluralSight - [Github repo](https://github.com/johnpapa/pluralsight-gulp)


## Installation

Like with Grunt you need to install Gulp globally once, and also locally in each project folder:

```
npm install -g gulp
npm install gulp --save-dev
```

The second command will add Gulp to the `node_modules` folder in your project directory and also add an entry in `package.json` in the `devDependencies` object.


## The Gulpfile

You add a file in the project directory called `gulpfile.js`. This is where you instruct Gulp what to do. The so called **default** task is the task that will be run if you run Gulp without parameters. To actually do much you need to install a plugin for the task at hand.


```js
var gulp = require('gulp');

gulp.task('default', function () {

});
```

## Running Gulp

From the command line either just type `Gulp` to run the default task or add a task name as a parameter to run a specific task.

```
gulp       #runs the task named default
gulp build #runs the task named build
```

## The Gulp API

Gulp uses node streams for gathering a source set of files as input and then pipe the input stream through a pipeline of different processes/functions and finally save the altered files to a destination.

Only 4 APIs:

* gulp.task
* gulp.src
* gulp.dest
* gulp.watch

### gulp.task(name, [,dep], fn)

For defining a new task. Common task types are testing and linting code, optimizing files and running a server. Dependencies run **in parallel before** the task is run. The function always returns the stream.

### gulp.src(glob [, options])

For reading in the files to work with. Takes a file system glob (set of files).
Emits files that match. Any file you need to operate on need to be included in the src stream.
Optionally specify options to apply to the glob. Options.base defines how much of the path to retain.

### gulp.dest(folder [,options])

You use `gulp.dest` when you want to write files from the input stream back to disk. You can write back to the same files or to new files.

### gulp.watch(glob [, options], tasks|cb)

To watch a set of files. Can be useful for restarting a server, running tests, doing code linting or comiling CSS.

Watch files in glob pattern for any changes and call upon defined task(s) or alternatively call a callback function.


## Process

* Install gulp as a global package for convenience `npm install -g gulp`.
* Install gulp locally in your project `npm install --save-dev gulp`
* Install other dependent packages
* Code your tasks
* Run your tasks

We want to save the dependencies to the `devDependencies` section in `package.json`.

## Plugins

Plugins are node gulp packages containing functionality ready to be used by gulp tasks. We’re not limited to just using plugins though. We can also write our own node functions and call them from our gulp tasks.

To reduce the long list of required plugins you can also load them as you need them using a plugin called [gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins).

```js
var gulp = require('gulp'),
    plug = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function () {
    return gulp
        .src('app/**/*.js')
        .pipe(plug.if(args.verbose, plug.print()))
        .pipe(plug.jscs())
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(plug.jshint.reporter('fail'));
});
```

## Callbacks

When not returning a stream from a function use callbacks to end the stream:

```js
gulp.task('styles', ['clean-styles'], function () {
    log('Compiling LESS --> CSS');
...

gulp.task('clean-styles', function (done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

function clean(path, done) {
    log('Cleaning: ' + plug.util.colors.blue(path));
    del(path, done);
}
```

## Gulp Watch

The watch function is used to monitor file changes and trigger tasks as changes occur.

```js
gulp.task('less-watcher', function () {
    gulp.watch([config.lessFiles], ['styles']);
});
```

## Handling Errors

All compilation can of course fail because of syntax errors. To gracefully handle errors in a watch pipeline you can either handle an on error event or use something like gulp-plumber which will print a nice error message and end the watch. `npm install --save-dev gulp-plumber`.

```js
gulp.task('styles', ['clean-styles'], function () {
    log('Compiling LESS --> CSS');

    return gulp
        .src(conf.lessFiles)
        .pipe(plug.plumber())
        .pipe(plug.less())
        //.on('error', errorLogger)
        .pipe(plug.autoprefixer({browsers: ['last 2 versions', '> 5%'] }))
        .pipe(gulp.dest(conf.tempFolder));
});

function errorLogger (error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error');
    this.emit('end'); //end the pipe
}
```
## Generic Tasks

### Cleaning Folders

```javascript
gulp.task('clean', function (done) {
    var delFiles = [].concat(config.buildFolder, config.tempFolder);
    log('Cleaning: ' + plug.utils.color.blue(delFiles));
    del(delFiles, done);
});

gulp.task('clean-fonts', function (done) {
    clean('./build/fonts/**/*.*', done);
});

gulp.task('clean-images', function (done) {
    clean('./build/img/**/*.*', done);
});

gulp.task('clean-styles', function (done) {
    clean('./build/css/**/*.css', done);
});

gulp.task('fonts', ['clean-fonts'], function () {...
gulp.task('images', ['clean-images'], function () {...
gulp.task('styles', ['clean-styles'], function () {...
```

```javascript
function clean(path, done) {
    log('Cleaning: ' + plug.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    var item;

    if (typeof (msg) === 'object') {
        for (item in msg) {
            if (msg.hasOwnProperty(item)) {
                plug.util.log(plug.util.colors.blue(msg[item]));
            }
        }
    } else {
        plug.util.log(plug.util.colors.blue(msg));
    }
}
```



## Automatic Page Reloads

### Server

* Prepare CSS and HTML
* Restart on node server changes

[Nodemon](https://github.com/remy/nodemon) can restart, watch for changes and handle different events. The
 gulp plugin is called gulp-nodemon. It adds supports for calling other gulp tasks on different events.

     npm install --save-dev gulp-nodemon

```javascript
gulp.task('server', function () {
    return plug.nodemon({
            script: 'server.js',
            delayTime: 1,
            watch: config.serverSourceFiles
        })
        .on('restart', ['vet'], function (ev) {
            log('*** nodemon restarted server');
            log('files changed on restart:\n' + ev);
        })
        .on('start', function () {
            log('*** nodemon started monitoring');
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
});
```
Before restarting we'll call the vet task to verify code.

### Client

* Launch server
* Launch browser
* Restart/refresh on changes

[BrowserSync](http://www.browsersync.io) can watch client-side files and
automatically inject changes (using sockets.io) into the browser(s).

It can also synchronize actions across browsers. This functionality is referred
to as ghost-mode and it can sync clicks, forms, locations and scrolling across
multiple browsers. Install with command `npm install --save-dev browser-sync`

```javascript
.on('restart', ['vet'], function (ev) {
    log('*** nodemon restarted server');
    log('files changed on restart:\n' + ev);
    setTimeout(function () {
        browserSync.notify('reloading now...');
        browserSync.reload({stream:false});
     }, 1000);
})
.on('start', function () {
    log('*** nodemon started monitoring');
    startBrowserSync();
})
...

function startBrowserSync () {
    if (browserSync.active) {
        return;
    }

    log('Starting browser-sync on port 3001');
    gulp.watch(conf.lessFiles, ['styles']);

    browserSync.init({
        proxy: 'localhost:3000',
        port: 3001,
        files: [
            './**/*.*',
            '!./**/*.less'
        ],
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'SYNC',
        notify: true,
        reloadDelay: 1000
    });
}
```


## Code Analysis a.k.a. Linting

>As of summer 2016 I've dropped JSHint and JSCS in favor of eslint.

These are 3 popular tools for code analysis:

* [eslint](http://eslint.org/)
* [JSHint](http://jshint.com/) - [docs](http://jshint.com/docs/)
* [JSCS](http://jscs.info/) - [Github](https://github.com/jscs-dev/node-jscs)

JSHint is a popular code analysis tool that can detect syntax errors and other potential problems in your source code. Define your rules in a file called `.jshintrc`

    npm install --save-dev gulp-jshint jshint-stylish

JSCS is a JavaScript Code Style Checker. You can use it to define a style guide for code consistency and enforce it using JSCS. Define your rules in a file called `.jscsrc`

    npm install --save-dev gulp-jscs gulp-jscs-stylish

```javascript
var gulp = require('gulp'),
    plug = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function () {
    return gulp
        .src('./app/**/*.js')
        .pipe(plug.jshint())
        .pipe(plug.jscs())
        .on('error', noop)
        .pipe(plug.jscsStylish.combineWithHintResults())
        .pipe(plug.jshint.reporter('jshint-stylish', {verbose: true}));
});

var noop = function () {};
```

## Transpile CSS


If you want to use LESS or SASS you need to transpile your files to CSS.

You can use [AutoPrefixer](https://github.com/postcss/autoprefixer) to add vendor browser prefixes automatically. AutoPrefixer is kept in sync with [Can I Use](http://caniuse.com)

    npm install --save-dev gulp-less gulp-autoprefixer

```javascript
gulp.task('styles', ['clean-styles'], function () {
    log('Compiling LESS --> CSS');

    return gulp
        .src('./styles/*.less')
        .pipe(plug.less())
        .pipe(plug.autoprefixer({browsers: ['last 2 versions', '> 5%'] }))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('clean-styles', function (done) {
    clean('./tmp/**/*.css', done);
});

function clean(path, done) {
    log('Cleaning: ' + plug.util.colors.blue(path));
    del(path, done);
}
```

```less
.style-test {
    transform-origin: center bottom;
}
```

```css
.style-test {
  -webkit-transform-origin: center bottom;
          transform-origin: center bottom;
}
```

The 'clean' is not a gulp plugin and thus doesn't return a stream. In these cases we declare a callback and call it after we're finished so that things are executed in the right order.

## Angular Template Cache

AngularJS apps use view templates for routes and directives. These can either be loaded dynamically via AJAX calls or added to the AngularJS $templateCache service to avoid http traffic when loading them. You would add a template by calling `$templateCache.$put('url', 'template');`. When a route or directive needs to load an html template, Angular will check the template cache before doing an http call.

Instead of using the $templateCache service manually we can use a gulp plugin like [gulp-angular-templatecache](https://github.com/miickel/gulp-angular-templatecache). This plugin can gather all templates and add them to the $templateCache service. We can also minify the html if we want to save space. The plugin will compile our html templates to a single file and can generate an angular module to be included in our app.

```javascript
// clean build and temp folders
gulp.task('clean-build', function (done) {
    var delFiles = [].concat('./temp/**/*.js', './build/**/*.html', './build/**/*.js');
    clean(delFiles, done);
});

gulp.task('templatecache', ['clean-build'], function (done) {
    log('Creating AngularJS $templateCache');
    // SAMPLE config object
    var config = {
        htmlTemplates: './app/**/*.html', // avoid index.html
        templateCache = {
       			file: 'templates.js',
          	options: {
       		      module: 'app',
          		  standAlone: false,
          		  root: 'app/'
            }
        }

    return gulp.src(config.htmlTemplates)
    		.pipe(plug.minifyHtml({empty: true}))
    		.pipe(plug.angularTemplateCache(config.templateCache.file, config.templateCache.options))
        .pipe(gulp.dest(config.tempFolder));
});
```

## Image Minification

You can use [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) for image minification.

```javascript
gulp.task('imagemin', function () {
    log('Compress images and copy to build folder');

    return gulp.src(config.images)
        .pipe(plug.imagemin({optimizationLevel: 3}))
        .pipe('./build/img')
})
```


## html injection

Automating adding the needed dependencies to the html file. For 3rd party dependencies you can use [Wiredep](https://github.com/taptapship/wiredep) to inject bower dependencies into HTML.

You would use HTML comments as placeholders. The type should be either `css` or `js`.

```
<!-- bower:type -->
```

For custom code use you can use [gulp-inject](https://github.com/klei/gulp-inject)

```
<!-- inject:type -->
```

Separating between 3rd party CSS/JS and our own

```html
<!DOCTYPE html>
<html ng-app="app">
<head>
    <!-- bower:css -->
    <!-- endbower -->

    <!-- inject:css -->
    <!-- endinject -->
</head>
<body>
    <div ng-include="'app/layout/shell.html'">
    </div>
    <!-- bower:js -->
    <!-- endbower -->

    <!-- inject:js -->
    <!-- endinject -->
</body>
</html>
```

wiredep injects the runtime css dependencies at `<!-- bower:css -->` and the javascript dependencies at `<!-- bower:js -->`. Wiredep uses the bower.json files of the 3rd party packages to figure out the dependencies i.e. what to load and loading order.

gulp-inject injects the runtime css dependencies at `<!-- inject:css -->` and the javascript dependencies at `<!-- inject:js -->`.
