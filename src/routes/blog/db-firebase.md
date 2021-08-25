---
title: About Firebase
createdAt: 2016-07-16
description: An introduction to using the Firebase DBAAS
---

# {title}

> {description}


1.  Allows you to access data directly in the client - serverless
2. The accessed data is updated realtime
3. Makes it easy to build offline experiences


Firebase is a DBAAS that contains a suite of backend services built on top the Google Cloud Platform targeted at the mobile web and native apps.

Features:

* Real-time database that syncs instantly to all connected clients.
* Push Notifications
* Analytics
* Cloud Messaging
* Binary Storage
* Application Hosting
* Android Test Lab
* Crash Reporting
* Performance Monitoring
* Administrative access
* Advertising
* and more ...

Some of the services are targeting native apps only.

Has support for JavaScript as well as many other languages and SDKs for Android and iOS. It also provides a REST API if you prefer to use that. Firebase is affordable, scalable and higly accessible. Firebase is aimed at mobile and web applications.

Firebase is an integrated part of the Google Cloud Platform (GCP). You can for instance provide advanced features like cloud functions for your Firebase app via the GCP console. Both GCP and Firebase are managed via your Google account login.

Features that are irrelevant to web apps and thus are exclusive for native mobile apps:

* Analytics - Mobile  web can use standard google analytics
* Android Test Lab
* Crash Reporting
* Performance Monitoring
* Advertising
* App Indexing
* Remote Configuration
* Dynamic links


## JavaScript SDK

Provides, Authentication, Database, Storage and Messaging. The REST API provides Authentication and the Database only.

[The JavaScript SDK Documentation](https://firebase.google.com/docs/reference/js/)

### Setup

* Install the Firebase CLI `npm install -g firebase-tools`
* Create a Firebase project in the [Firebase console](https://console.firebase.google.com)
* Create a project directory and open a CLI in the project root folder
* Login to firebase using your Google account: `firebase login`. Opens a browser window where you are asked some questions before given a key. Copy the key and enter it as password for login in terminal.
* Initialize the new project `firebase init`. After answering some questions and selecting a Firebase app your configuration is stored and youre ready to start using Firebase.

.firebaserc, database.rules.json, firebase.json

From the Overview page for your project in the Firebase Console you can click the "Add Firebase to your Webapp" button where you can copy the scripts to include to start working with your firebase project.

```js

var config = {
    apiKey: "Public API key to authorize client for specific app. ",
    autDomain: "Where our firebase app lives.",
    databaseURL: "Specifies database location",
    projectId: "Firebase project Id",
    storageBucket: "GCP endpoint for storing binary data",
    messagingSenderId: "Google Messaging identity"
}
```

## Authentication

From the Overview page for your project in the Firebase Console you can use the Authentication tab to set up different authentication schemes or manage users/rights.


Run: firebase serve [--host 0.0.0.0 --port 8080]


## Real-Time DB

## Cloud Functions

Serverless backend processing on GCP is used for things the client cannot do. Cloud functions are typically triggered by HTTP requests but can also be triggered by logon, uploads etc. These are stored in the functions folder of a project. They can be created by the firebase init command.


## Cloud Messaging

## Additional Features


##### Resources

* [Creating a Web App From Scratch Using AngularJS and Firebase](http://code.tutsplus.com/tutorials/creating-a-web-app-from-scratch-using-angularjs-and-firebase--cms-22391)
* [Building a Designer News Clone with AngularJS and Firebase](http://bitsofco.de/building-a-designer-news-clone/)
* [Designer News Clone (Part 2) - Implementing Firebase Security](http://bitsofco.de/designer-news-clone-part-2-implementing-firebase-security/)
* [Angular Web Platform Doc](https://www.firebase.com/docs/web/)
* [Angularfire Doc](https://www.firebase.com/docs/web/libraries/angular/api.html)
* [Reactfire](https://github.com/firebase/reactfire)
