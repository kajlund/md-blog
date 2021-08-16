---
title: The Mobile Web
createdAt: 2014-03-15
description: An intro to the mobile web. Different style mobile web applications and tools of the trade.
---

#{title}

::: warning
Written back in March of 2014
:::

The Mobile Web refers to browser-based applications created for mobile devices, like smartphones and tablets, wirelessly connected to the internet.

Think of the mobile web as a usage scenario instead of just a form factor. Using an application in a totally different environment than the typical desktop application is used in changes the way users access and consume websites.

Mobile device characteristics are important but there's more to it than just screen size.

### Mobile compared to desktop platforms:

* Lots of different browsers with varying support for modern web technologies

* Have less available resources than desktop machines, both hardware and network bandwidth

* Form factor. Screens are smaller, interactions and expectations are different.

* Might not have good keyboards and pointing devices

* Typically used in an unpredictable environment instead of a fixed location

* Mobile devices have features unavailable on a desktop computer like GPS, accelerometer, camera etc.

### Things to consider:

* What kinds personas do you want to target? Knowing this helps you identify desirable features.

* What do these personas want to do on the site?

* Where, when and why is the site being accessed?


### Why do we need mobile sites/WebApps now?

* Mobile web usage will exceed desktop web usage in the near future
* The web is the only true cross-platform technology.
* Web technology is alone in reaching pretty much every available platform
* I.e. the web is the future platform.
* Modern devices pretty much all have browsers with desktop-like capabilities


## Defining some commonly used terminology

### Web Apps?

There is no clear definition of what a web app really is, but it usually involves a program running in a web browser window with interactivity and similar characteristics that are well suited for technologies commonly referred to as HTML5.

Apps have an emphasis on interactivity and accomplishing tasks, as opposed to serving content. Also, apps have layouts that fits single screens and actions that don't need to rebuild the whole UI.

### HTML 5

By saying HTML5, people can mean a number of things but usually it is the combination of the evolving HTML5 and CSS3 standards plus JavaScript and the likewise evolving standards for device APIs (geolocation, offline storage etc).

The above standards are the core pieces for building modern, interactive web applications.

### Responsive Web Design (RWD)

A set of techniques used to make a web site adapt its layout according to the user's browser window. This is usually done by switching the style sheets depending on consumer.

A responsive web design, built with HTML5 and CSS3, allows a website to work across multiple devices and screens.

RWD is perhaps the simplest and quickest ways to make a website built for desktop work on a lot of devices using the skills you already have.

## Application Categories

Three Categories:

* Native Applications
* Web Apps/Sites
* Hybrids that are built with web technology and can be packaged for native distribution. I call these WebApps.

## Native Applications

Applications built using the provided SDK for the designated platform. A subcategory of native applications is the Cross-Platform Native Frameworks (CPNF) that aim to use a single codebase and generate native code for multiple platforms.


* Not cross-platform
* Need to create separate apps for every targeted platform will be expensive
* Huge learning curve for new platforms
* Fast changing landscape could make your selected platform irrelevant in a few years.
* Not linkable
* Discoverable via App Stores
* Can use all device APIs. App can do anything the device is capable of
* Apps are faster and gets the right look and feel

For the CPNF's most of the cons listed goes away while the pros should mostly apply.

### Tools

* iOS - Xcode
* Android - Android SDK + Eclipse
* Windows - Visual Studio (C# + XAML)
* iOS + Android → Appcelerator Studio (JavaScript/CoffeeScript)
* Most clients → RhoMobile Suite (Ruby/Html)

> By building native apps you’ll be able to build a very responsive app with access to all device APIs and the proper look & feel. This is also usually the by far most expensive and risky option. Can be the best option for complex client-side logic.

## Web Apps/Sites

You can either build a single adaptable site using [responsive web design](http://www.alistapart.com/articles/responsive-web-design/) techniques or build separate
sites for mobile devices.

The web site strategy would mainly be suitable for a traditional site serving content and not so much when you need to build something that can take advantage of mobile device functionality.

* Cross-platform
* Traditionally building a separate mobile site but using responsive web design (RWD) techniques we can target different device sizes with CSS.
* Linkable
* Not discoverable via App Stores
* Limited access to device APIs. More coming through evolving Web standards.
* No presence in app stores (for monetizing go native)
* No access to some native APIs/functionality

### Tools

* HTML, CSS + JavaScript
* Libraries like jQuery etc.
* Frameworks like ExtJS, Ember.js (SproutCore) etc.

> Well suited for providing traditional site content to the largest possible audience. Less well suited for applications targeted to specific audiences.

## Web Apps

* Native-like look & feel, but not quite and not as fast
* Cross-platform in general
* Linkable
* Discoverable via App Stores
* Can use most device APIs

### Tools

* Same tools as for building Web Sites +
* Native container and native API provider like PhoneGap (Apache Cordova)

> Well suited for getting native-like functionality across platforms. Should often be the most suitable alternative as long as the client isn’t too complex. Lot’s of apps currently across App Stores are built like this.

You can use a full-stack framework like Sencha Touch or a “Glue framework” by picking together parts from smaller libraries and frameworks like jQuery Mobile.
