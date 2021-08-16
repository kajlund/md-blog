---
title: Rhomobile
createdAt: 2014-02-14
description: Overview of RhoMobile Suite of tools for web/mobile developers.
---

# {title}

::: Warning!
Written back in Feb of 2014
:::

We recently had a need for building a simple WebApp that must be made available on the Motorola MC65 device. When I did the usual Google search I stumbled upon the [RhoMobile](https://www.zebra.com/us/en/products/software/mobile-computers/rhomobile-suite.html) framework.

I’ve heard about it before but haven’t paid much attention as it looks very “enterprisy” and not very “open source”, which is what I’d often prefer these days.

This time, because we had this old Motorola device requirement, I decided to take a closer look and started reading a book called **RhoMobile Beginner’s Guide** by Abhishek Nalwaya (Packt Publishing 2011).

What follows is a short summary of what RhoMobile Suite contains:

## Rhomobile Suite

RhoMobile offers an open source, Ruby-based mobile development framework for business mobility solutions through four major products:

* Rhodes
* RhoSync
* RhoHub
* RhoGallery

## Rhodes

* Open Source framework for building device independent native clients using Ruby
* Supports iOS, Windows Mobile, Windows Phone, Google Android, and BlackBerry
* Can handle device APIs like GPS, Contacts, Calendar, Camera, Maps, Push, Barcode, Signatures and Bluetooth
* Is opinionated, MVC based and contains an ORM called Rhom
* Uses HTML templating for view generation

## RhoSync

* Sync Server that can push changes using native phone SDK and monitor clients
* Is highly scalable - Uses Redis key/value store for data caching


## RhoHub

* Cloud deployment on Heroku
* Hosted development environment for Rhodes and RhoSync
* One-click builds
* Version control with Git and Collaborator Management


## RhoGallery

* Administrators can manage application exposure to end users
* Can provide central launching place for apps to different users
* Management console for “app galleries” on RhoHub
* Automatic provisioning of appropriate apps for end users. Handles invites and provides downloads for app installation

## Why Rhomobile?

* Model View Controller: Similar to Rails produces code that is well structured and easy to understand and thus maintain.
* The same codebase supports most devices and even desktop support is coming soon.
* Good offline capabilities with good synch options via RhoSync.
* DB independent Active Record-like ORM called Rhom
* Productive via constraints on structure and organization and also code generators and scaffolding
* Highly scalable sync server
* Hosted builds via RhoHub

## Architecture

The application can consist of 3 separate layers:

* Rhodes Client Application
  * Ruby executor with ORM and MVC layers and device APIs
  * A RhoSync Client if need access to server data
* RhoSync Server
  * Source Adapters
* Backend Application
  * REST, SOAP etc

## Licensing

Rhodes is free and Open Source. RhoSync is only free for Open Source projects. Support is available for Rhodes Enterprice or Rhodes Commercial Licenses.

## Conclusions

Browsing the Motorola website I noted that they have renamed the parts that make up the RhoMobile suite. They now have RhoElements, RhoConnect and RhoStudio. RhoStudio gives you a nice Eclipse-based IDE and emulators for testing what you build. The latest version seems to support building desktop clients too.

All in all the RhoMobile suite seems to be a very complete solution for building client UIs that you should either embrace totally or ignore totally. I’m sure there’s a bit of a learning curve to master all the pieces in this suite. On the other hand, if you embrace it I can imagine it could take care of most UI scenarios you could dream up from a single code base.
