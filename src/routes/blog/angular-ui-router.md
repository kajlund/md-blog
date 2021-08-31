---
title: Angular.js - Routing with ui-router
createdAt: 2015-09-29
description: Routing Angular apps using ui-router
---

# {title}

> {description}

UI-Router is a state based library as opposed to the default routing library that is URL-based. Using ngRoute a route is always associated with a particular URL. In UI-router states can exist without a URL. States can also be nested.

> A state is a combination of a controller and a view that can exist independently from any particular URL - A state is a “place” in an application.

## Preparation

### Installation

There are a couple of ways to install

- Install via package manager `bower install angular-ui-router` or `npm install angular-ui-router` or `jspm install angular-ui-router`
- Use a CDN like Cloudflare
- Download from the github project

### Setup UI_Router

Once you have access to the JavaScript file you need to add ui.router as a module dependency and add the ui-view dircetive to your html.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>UI-Router demo</title>
</head>
<body ng-app="app">
    <div ui-view>

    <script src="libs/angular.js/1.4.6/angular.min.js"></script>
    <script src="libs/angular-ui-router/0.2.15/angular-ui-router.min.js"></script>
</body>
</html>
```

```js
(function () {
	angular.module('app', ['ui.router']);
})();
```

## Configuring States

```js
angular.module('app').config(configRoutes);

function configRoutes($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeController',
		controllerAs: 'vm',
		templateUrl: 'app/home.html',
		resolve: {
			//allMyData will be injected into HomeController if promise resolved
			allMyData: function (dataService) {
				return dataService.getAllMyData();
				//throw 'Emulate state change failure'
			}
		}
	});
}
```

The command `$urlRouterProvider.otherwise('/')` defines a “catch all” route making sure that if a user enters an invalid URL (invalid state or invalid param value) he will be routed to ‘/’.

> Since the views are bound to states you don’t have to provide a URL (no change in address bar) to change the view but that might also be confusing in some cases.

### Activating States

In JavaScript code you would use `$state.go('home');` to change to the home state. In templates you can use both normal href links `<a href="/home">Home</a>` and the ui-sref directive `<a ui-sref="home">Home</a>`. If the state doesn’t have a particular URL you must obviously use the ui-sref directive.

## Using the $state Service

### Methods

```bash
$state.go()     - $state.go('statename', {id: 1, another: 'two'});
$state.reload() - reloads the current state
$state.get()    - retrieve a state object by name or all states
```

### Properties

- current - currently active state
- params - object containing params for current state

```js
function MyController($state, $log, allMyData) {
	var vm = this;
	vm.data = allMyData;
	$log.debug('Activated state ', $state.current);

	vm.refresh = function () {
		$log.debug('Reloaded state ', $state.current);
		$state.reload();
	};
}
```

### Events

- $stateChangeError
- $stateChangeStart
- $stateChangeSuccess
- $stateNotFound

```js
function runApp($rootScope, $log) {
	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		$log.debug('Successfully changed state: ');

		$log.debug('event', event);
		$log.debug('toState', toState);
		$log.debug('toParams', toParams);
		$log.debug('fromState', fromState);
		$log.debug('fromParams', fromParams);
	});

	$rootScope.$on('$stateNoFound', function (event, unfoundState, fromState, fromParams) {
		$log.debug('Requested state not found: ', unfoundState);
	});

	$rootScope.$on(
		'$stateChangeError',
		function (event, toState, toParams, fromState, fromParams, error) {
			$log.debug('An error occurred while changing state: ', error);

			$log.debug('event', event);
			$log.debug('toState', toState);
			$log.debug('toParams', toParams);
			$log.debug('fromState', fromState);
			$log.debug('fromParams', fromParams);
		}
	);
}
```

## State Parameters

You can declare state params in the url param of the route configuration:

```js
.state('tripdetail', {
   url: '/tripdetail/:id'
})
...

function TripDetailController ($stateParams) {
    var vm = this;
    vm.tripId = $stateParams.id;
    ...
}
```

With UI-Router there are also other options:

Using curly braces works the same way but allows you to enter a regex. The parameter will only be set if it matches the regex.

```js
.state('tripdetail', {
   url: '/tripdetail/{id:[0-9]}'
})
...
```

The third option is to use the params property on the state configuration object. This allows you to give default values to the params or to declare params that doesn’t exist in the URL.

```js
.state('tripdetail', {
    url: '/tripdetail/{id:[0-9]}',
    params: {
        secretMessage: {value: 'Shhh!'}
    }
})
...

function TripDetailController ($stateParams) {
    var vm = this;
    vm.tripId = $stateParams.id;
    vm.message = $stateParams.secretMessage; // cannot be passed via URL
    ...
}
```

In templates you pass route parameters in an object literal as a parameter to the ui-sref state value `<a ui-sref="tripdetail({id: 1234, secretMessage: 'New message'})">Detail</a>`

In code you pass an object literal as the second argument to the $state.go function `$state.go({id: 1234, secretMessage: 'New message'});`.

### Additional State Configuration Properties

Similar to the ngRoute resolve property you call a function returning a promise. The promise must be resolved before the state change will occur. The name of the resolve function is what you will inject to the controller.

```js
.state('triplist', {
    url: '/trips',
    resolve: {
        trips: function (dataService) {
            return dataService.getAllTrips();
        }
    }
})
...
```

You can also assign data to the states. You don’t need to call it data but it is a convention. State data is inherited by child-states:

```js
.state('triplist', {
    url: '/trips',
    data: {
        name: 'Trip List',
        desc: 'Whatever'
    }
})
...
$log.debug($state.current.data);
```

Templates can be assigned via a function to the templateUrl property which makes it easy to dynamically determine what template to use. You can also use the injectable templateProvider property. Controllers have similar options.

The onEnter and onExit properties can hold callback functions that will execute when a state is entered or exited.

```js
.state('triplist', {
    url: '/trips',
    onEnter: function ($log) {
        $log.debug('Entering triplist state');
    },
    onExit: function ($log) {
        $log.debug('Exiting triplist state');
    }
})
...
```

## Nested States and Views

Combined these features allow you to build complex views from simpler parts. nested states works a bit like inheritance where child states inherit from parent states.

For nested states, state properties including the URL is inherited to child states.

```js
.state('book', {
    abstract: true,
    url: '/book/:id',
    resolve: {},
    data: {},
    template: '<div ui-view>'
})
.state('book.summary', {
    url: '/summary',
    templateUrl: 'book.summary'
})
.state('bookDetail', {
    url: '/detail',
    parent: 'book', // or book state object
    templateUrl: 'book.detail.html'
});
```

To define a child state you either repeat the parent state name, followed by a dot, followed by the child state name like above. You can also instead add the property parent to the child state definition and give it a string or literal value of the parent state.

The view templates defined in child view definitions will be rendered in their parent’s view template’s ui-view directive, not in the ui-view directive defined for the app.

### Abstract States

A specialiced version of parent state that can’t be activated directly. They are implicitly activated by activating any of their child states. If an abstact state specifies a URL any child state’s URL will be prepended with it. It can be used as an abstraction for gathering resolves and data you wish to be available in all child states. You can also use it for sharing part of the view for all child states.

### Multiple Named Views

Allows you to define multiple views for a single state. This can be useful for separating views and controllers to keep them smaller and more maintainable and also if you need to reuse part of a view in different places throughout your app. You do this by defining a views object on the state configuration object.

```js
.state('book', {
    abstract: true,
    templateUrl: 'app/book.html',
    url: '/book/:id',
    resolve: {},
    data: {}
})
.state('book.summary', {
    url: '/summary',
    views: {
        'bookSummary': {
            templateUrl: 'app/book.summary.html'
        }
    }
})
.state('bookDetail', {
    url: '/detail',
    parent: 'book', // or book state object
    views: {
        'bookSummary': {
            templateUrl: 'app/book.summary.html'
        },
        'bookDetail': {
            templateUrl: 'app/book.detail.html'
        }
    }
});
```

and the template book.html

```html
<p>I will be here for all my children</p>

<div ui-view="bookSummary">

</div ui-view="bookDetail">
```
