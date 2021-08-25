---
title: About Web Components
createdAt: 2019-01-01
description: Introduction to Web Components
---
# {title}

>{description}

> The W3C standards way of creating reusable building blocks for app development. Basically Web Components are just custom HTML elements used to compose web apps.

* [Web Components](https://www.webcomponents.org/)
* [Polymer 2.0](https://www.polymer-project.org/) and [Polymer CLI](https://www.polymer-project.org/1.0/docs/tools/polymer-cli)

custom html elements composed to build web apps using W3C standards standard html, javascript and css

* [WebComponents.org](http://webcomponents.org/)
* [W3C intro](https://www.w3.org/TR/components-intro/)
* [Custom Elements](https://customelements.io/)
* [Polymer Project](https://www.polymer-project.org)
* [Pluralsight Course](http://www.pluralsight.com/courses/web-components-shadow-dom)
* [Google I/O 2015 - Polymer and modern web APIs: In production at Google scale](https://www.youtube.com/watch?v=fD2As5RmM8Q)
* [Material Web Components Catalog](https://material-components.github.io/material-components-web-components/demos/index.html)
* [Microsoft Graph](https://github.com/microsoftgraph/microsoft-graph-toolkit)
* [Polymer Talk](https://angularu.com/VideoSession/2015sf/componentize-your-app-with-polymer-elements)
* [Pluralsight - Vanilla Web Components...](https://app.pluralsight.com/library/courses/vanilla-web-components-practical-guide/table-of-contents)
* [Lynda.com course](https://www.lynda.com/Web-Development-tutorials/Welcome/540537/614347-4.html)

Web Components embrace evolving browser capabilities that allow us to tackle complexity by providing true encapsulation and reuse.


allows encancing built-in elements

Simplify process of building complex web apps by hiding complexity in component implementation.
Allows for reuse
provides encapsulation of appearance and behavior by keeping css and script separate from other components
frameworks do this but webcomponents use the platform/standards.

The standards needed for web components can all be used on their own:

## Web Components Standards

* HTML Templates - Defines how to declare fragments of markup that go unused at page load but can be instantiated later at runtime useing the `<template>`-tag
* HTML Imports - allows for HTML markup to be defined in files and imported into documents using the `<link>`-tag.
* Custom Elements - Specifies how to create extend current or define new types of DOM elements along with custom properties, behavior and attributes
* Shadow DOM - Encapsuling and isolating element and their style from the page as a whole.


## HTML Templates

Provides a standard/native way to declare template markup using the `<template>`-tag. It's content is said to be inert (inactive) until instantiated. Templates can basically be inserted wherever a child node is allowed. Supported by major modern browsers.

