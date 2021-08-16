---
title: Client Application Technologies
createdAt: 2013-03-05
description: Some thoughts on different technologies available at present for building client side applications.
---

# {title}

::: Warning!
Material from back in 2013.
:::

I was pondering the options if you need to build some kind of client application these days. The two main categories seems to be *Native Clients* and *Web Clients*. Further, these categories could be split into subcategories by building for the *desktop* or for different kinds of *mobile devices*. A third category that seems to be increasingly popular these days is *hybrids* that usually consist of a native client using web technology.

* Native Clients
  * Desktop
  * Mobile
* Web clients
  * Desktop
  * Mobile
* Hybrids

## Things to consider when choosing an architecture

* Does it need to run on multiple platforms?
* Does it need to run on portable devices?
* Does it need to work disconnected?
* Does it have to be capable of being packaged as a native phone app?
* How rich must the widget library be? -> Limits mobile functionality


## Native Clients

* Gives right look and feel for targeted platform
* Not cross-platform
* Must be installed
* Strong language and tooling support

> Native clients are a good choice if you only intend to target a specific platform and you're not concerned with having to install clients. Tools and languages for building native clients are very mature.

### Tools for Building Native Clients

##### Desktop

* [Microsoft .NET](http://www.microsoft.com/net) Platform for Windows
* [XCode](https://developer.apple.com/xcode/) for Mac
* [Java](http://www.java.com/en/), [Ruby](http://www.ruby-lang.org/en/) and [Python](http://www.python.org/) for most platforms


##### Mobile

* [Android SDK](http://developer.android.com/sdk/index.html)
* [iOS](https://developer.apple.com/devcenter/ios/index.action)
* [Windows Phone](http://dev.windowsphone.com/en-us/home)
* [Appcelerator](http://www.appcelerator.com/)
* [MoSync](http://www.mosync.com/)
* [Antenna](http://www.antennasoftware.com/)


## Web Clients

* Look & feel according to tools used
* Cross-platform
* No installation issues
* Limited language and tooling support (depending on architecture)


### Desktop web clients

By Desktop Web Clients I refer to to an application running in a web browser with network connectivity.

Building a web client you could use two different strategies:

* Stand-alone JavaScript client
* Server-backed client

##### Stand-alone

* Limited language and tooling support (JavaScript, FireBug)
* Somewhat immature frameworks
* Less dependent on server availability


##### Server-backed

* Strong language and tooling support (Visual Studio, Eclipse, C#, Java...)
* Mature frameworks (ASP.Net MVC, Rails, Django...)
* More dependent on server availability

### Mobile web clients

These can be built the same way as desktop web clients, but in addition they can be packaged with tools for native application distribution like [Apache Cordova](http://incubator.apache.org/cordova/) a.k.a. PhoneGap. There are lot's of frameworks available for building mobile web apps.

> Web clients are a good choice if you want to be platform agnostic and don't want the trouble of traditional client installations. Tools and languages are less mature than native tools but are improving fast.

### Tools for Building Web Clients

##### Desktop

* [ExtJS](http://www.sencha.com/products/extjs/)
* [Kendo UI](http://www.kendoui.com/web.aspx) is a full-stack framework based on jQuery
* [jQuery](http://jquery.com/) is widely known but contains DOM manipulation only


##### Mobile

* [Sencha Touch](http://www.sencha.com/products/touch)
* [The M-Project](http://www.the-m-project.org/)
* [Kendo UI Mobile](http://www.kendoui.com/mobile.aspx)
* [iUI](http://www.iui-js.org/)
* [Jo](http://joapp.com/)
* [jQuery Mobile](http://jquerymobile.com/)
