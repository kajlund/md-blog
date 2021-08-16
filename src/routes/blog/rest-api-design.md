---
title: REST API Design
createdAt: 2015-09-07T18:25:30
description: The basics of API design picked up by watching the PluralSight API Design Course by Shawn Wildermuth.
---

# {title}

#### Resources

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free Fake REST API

**See also**: HTTP Response Codes are defined in [W3C RFC2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). [jsonapi.org](http://jsonapi.org/) has info on standard ways of representing data.

The way APIs are designed is important because:

* APIs are the UI layer to developers
* Easy to use APIs are more readily adopted
* Picking the right level of API is crucial to success
* Don’t surprise your users
* Balance what is good for the user with what is good for the server
* Ultimately, users are what make a successful API

> There is no real right or wrong way. Just avoid dogma and be pragmatic.

## URIs

* Nouns are good, verbs are bad.
* URIs should point at nouns (e.g. resources)
* Prefer plural form

```
http://api/Customers
http://api/Invoices
```

Use identifiers to locate individual items in URIs. Doesn’t have to be internal key as long as it is unique.

```
http://api/Customers/123
http://api/Games/halo-3
http://api/Invoices/2014-01-01
```

## HTTP Verbs

Resource       | GET     | POST      | PUT          | DELETE
---------------|---------|-----------|--------------|---------
/customers     |Get list |Create item| Update batch | Error
/customers/123 |Get item |Error	     | Update item  | Delete item

**What to Return**

Resource       | GET    | POST      | PUT          | DELETE
---------------|--------|-----------|--------------|---------------
/customers     | List   | New item  | Status code  |Error code
/customers/123 | Item   | Error code| Updated item |Status code


## Status Codes

The HTTP specification defines the status codes. Below are some common ones:

Code | Description
-----|--------------
200  | OK
201  | Created
202  | Accepted
302  | Found
304  | Not Modified
307  | Temp Redirect
308	 | Perm Redirect
400  | Bad Request
401	 | Not Authorized
403	 | Forbidden
404  | Not Found
405  | Method Not Allowed
409  | Conflict
500  | Internal Error

Limit the number of returned status codes to keep the API simple. **Consider these as a bare minimum**:

Code  | Description    | Real Story
------|----------------|-----------
200   | OK             | It Worked
400   | Bad Request    | Your Bad
500   | Internal Error | Our Bad

**The following could be useful for clients**:

Code | Description
-----|--------------
201  | Created
304  | Not Modified
401  | Unauthorized
403  | Forbidden
404  | Not Found

**Sample of Sensible Defaults:**

Code   | Description
-------|--------------
200 OK | Successful request
204    | No Content	File contains no data
301    | Moved Permanently	The requested resource has permanently moved to another address
401    | Not Authorized	Athorization needed to access resource
403    | Forbidden
404    | Not Found	The requested resource cannot be found
408    | Request Timeout. The Request timed out
500    | Server Error


## Associations

Using URIs

```html
http://api/Customers/123/Invoices
http://api/Games/halo-3/Ratings
http://api/Invoices/2014-01-01/Payments
```

Returns single object or list of objects. The format should be the same as when loading associated objects as when loading them as main resources. A resource may include multiple associations:

```html
http://api/Customers/123/Invoices
http://api/Customers/123/Payments
http://api/Customers/123/Shipments
```

**For more complex needs use query params**

```html
http://api/Customers/123/Invoices?date=2014-0101&type=credit
```

## Formatting the Results

* Single Results should be simple objects
* Member names should not expose server details and be camelCased or at least be consistent.
* Collections typically use an object wrapping a simple collection to hold information about the collection and not just the items.


```json
{
    "total": 120,
    "results": [
        {"id": 1,...}, ...
    ]
}
```

### Response Formats

* See [JSend](https://github.com/omniti-labs/jsend) format.
* Content negotiation is a best practice. Use Accept header to determine format. `Accept: application/json, text/xml`
* Can use URIs to specify format but not recommended. Use only if you need to use clients that cannot use headers.

```html
http://api/Customers?format=json
http://api/Customers.json
http://api/Customers?format=json&callback=foo
```
* Not necessary to support lots of formats. Use a sane default, usually JSON.

Type   | MIME Type
-------|------------------
JSON   | application/json
XML    | text/xml
JSONP  | application/javascript
RSS    | application/xml+rss
ATOM   | application/xml+atom


### Entity Tags (ETags)

* ETags are used to support smart server caching
* Supports both strong and weak caching and are typically returned in the response header
* The ETag represents a version of the results returned
* Weak ETags means results are semantically the same whereas strong ETag suggests they are byte by byte identical. Weak ETags are prefixed with W/.

```bash
HTTP/1.1 200 OK
Content-Type:application/json; charset=utf-8
Date: 20-01-2014 16:46:52 GMT
ETag: "8934675928367085"
Content-Length: 1024
```

```bash
HTTP/1.1 200 OK
Content-Type:application/json; charset=utf-8
Date: 20-01-2014 16:46:52 GMT
ETag: W/"8934675928367085"
Content-Length: 1024
```
* Client sends along ETag with request to check for new data.

```bash
GET /api/customers/123 HTTP/1.1
Accept: application/json
Host: localhost:8863
If-None-Match: "8934675928367085"
```
* If the above request would result in the same object the server returns a 304 Not Modified with an empty body.

```bash
HTTP/1.1 304 Not Modified
```
* For PUTs you can use If-Match to check that the object you want to save hasn’t been modified.

```bash
PUT /api/customers/123 HTTP/1.1
Accept: application/json
Host: localhost:8863
If-Match: "8934675928367085"
...
```
* If server has matching ETag for object then PUT should be allowed otherwise the PUT should return `412 Precondition Failed` and client needs to GET a more recent version before trying to PUT again.


### Paging

* Lists should always support paging for restricting the amount of data sent over the network to the client and for reducing the amount of work the server does for a single request.
* Use query string parameters for paging information. For instance pageSize is typical for allowing the client to determine how many he wants/call.
* Commonly use the list object wrapper for next/prev links
* Return totalSize of the dataset so that the client can calculate how many pages there would be.

```bash
http://api/games/?page=2&pageSize=50

{
    "total": 1598,
    "next": "http://api/Invoices/?page=3",
    "prev": "http://api/Invoices/?page=1",
    "results": [...]
}
```
* Set an upper limit for pageSize to something reasonable for the server to process at any one time.

### Partials

* APIs should allow for requesting partial items. This can significantly reduce data traffic.
* Allowing the client to specify what fields it needs in a particular case.
* Using the query string is a common pattern `http://api/invoices/123?fields=id,invoiceDate,totalAmount`
* Updating of partial items could be supported with the PATCH verb
* Updating partials would be safer if you implement ETag support


## Non-Resource APIs

* Handling of the functional parts of the API that cannot easily be solved by using resources and HTTP verbs.
* Be pragmatic and document these parts properly
* API user should be able to distingguish these types of operations from the normal usage of resources
* Usually handled by calling get requests and functional, not resource based
* Don’t use an an excuse to build RPC API

```
http:/&/api/calculateTax?state=GA&total=149.90
```

## API Versioning

* A published API is a contract and should not be changed. Client rely on a fix API or they will break.
* Versioning is a way of evolving the API without breaking existing clients
* Don’t tie API versioning to product versions
* No best way of versioning APIs but we can learn from existing ones


### Versioning Styles

* Using URI path `http://api.tumblr.com/v2/user/` like Tumblr.
* Using a Query param `http://api.netflix.com/catalog/titles/series/70023522?v=1.5` like Netflix
* Using content negotiation: `Content-Type: application/vnd.github.1.param+json` like GitHub
* Using a request header: `x-ms-version:2011-08-18` like Windows Azure

### Versioning using the URI path

* Everything after the version number is open to change
* Allows for drastic changes
* Simple to segregate old APIs for backwards compatibility
* Could require lots of client changes as you version
* Increases the size of the URI surface area you have to support
* Can expand reach but also icrease technical debt

```
http://api.attracs.com/v1/Customers?type=Current&id=123
http://api.attracs.com/v2/CurrentCustomers/123
```

### Versioning using Query Param

* Version can be an optional parameter. Latest version by default
* Doesn’t impose huge client changes as versions mature.
* You can surprise developers with unexpected changes and break clients

```
http://api.attracs.com/Customers
http://api.attracs.com/Customers?v=2.1
```

### Versioning using Content Negotiation

* Becoming increasingly popular because the versioning is separated from the API surface area.
* Packages API and Resource Versioning together. Versioning can be tied to specific resources
* Client don’t have to change URIs
* Adds complexity. Some clients may not be able to use headers
* Can encourage increased versioning and overall complexity

Use custom MIME types in header. Standard indicates you should use “vnd.” (meaning vendor) as prefix to the MIME type


```
GET /Customers/123
HOST:http://api.attracs.com
Accept: application/vnd.amc.v1.customer

Accept: application/vnd.amc.v1.customer.json
```


### Versioning using Custom Header

* Use a header value that is only recognised by the API
* Common to use date instead of a version number
* Separates versioning from API call signatures
* Not tied to resource versioning
* Adds complexity. Some clients may not be able to use headers

```
GET /Customers/123
HOST:http://api.attracs.com
x-AMC-Version: 2.1

x-AMC-Version: 2014-01-01
```

It’s hard to generally say which style is best. Content Negotiation and Custom Header styles are popular but adds some complexity. Versioning with URI components are still more common. These are typically easier to implement but can add more technical debt.

The API should support versioning from the first release.

### Resource Versioning

* Versioning API calls isn’t enough. The resources themselves should be versioned too because structures and constraints change over time.
* Versioning resources is easier using custom content types
* Including versioning data in the resource body is an option, but it pollutes the data


## Securing the API

* Security should be part of the original design. don’t patch it on as an afterthought.
* Should be secure by default. Don’t return sensitive information before authorized

**You need to secure the API if:**

* You’re using personalized or private data
* Sending sensitive data across the wire
* Using credentials of any kind
* Protecting against overuse of servers

**Threats:**

* Eavesdroppers (packet sniffers etc)
* Hackers or even personnel (Intrusion and physical security)
* Users/Hackers looking at source for accessing the API

Securing the server infrastructure is another topic

Secure In-Transit (protecting data when it goes across the wire). Using SSL is typically worth the expense

Securing the API consists of Cross-Origin Security and Authorization/Authentication.

### Cross Domain Security

Should you allow calls from separate domains? If internal, probably not. If public facing you might need to support cross-domain.

Two Approaches:

* Support JSONP format
* Enable Cross-Origin Resource Sharing (CORS)

##### JSONP

```javascript
function updateUser(data) {
    //use Data
}


GET /api/games?callback=updateGames HTTP/1.1
Accept: application/javascript
Host: localhost:8863

-> updateUser({total=1, results=[...]});
```
The data sent back from the server will be the same. It will just be wrapped in a function call.

##### CORS

* Allows Cross Site support from browser but requires handshake
* Implementing can be difficult but many platforms support it
* Rules implemented on server


### Authentication

Who is calling the API?

* Server-to-Server Authentication using API keys and shared secrets
* User Proxy Authenticaton using OAuth and similar
* Direct User Authentication using cookies or tokens. Common for private APIs
* Credential: A fact that can describe an identity like username and password

> Authentication: Validate a set of credentials to identify an entity (whether virtual or actual).

> Authorization: Verification that an entity has right to access a resource or action.

#### API Keys

* For non-user specific API usage like AWS, Google maps for monitoring usage
* Sign up for API key
* System returns API key and shared secret (usually for encryption)
* Developer creates a request providing the API key.
* A Signature is created for the requestusing the shared secret
* Request + Signature is sent to service
* Server looks up shared secret for user via API key and signs the request with it
* Server verifies same signatures and within timeout
* If all valid server executes request and returns data

#### User Security/Authenticating Users

If your system has users, how do you verify which user is calling the API?

* For 1st party solutions you could use what the web server provides like using Windows Authentication or ASP.NET forms authentications.
* For 3rd party API developers don’t ask them to collect credentials, use OAuth

#### OAuth

For allowing developer to act as a user in your system but allows you to keep control of accepting credentials

Then trust a 3rd party with a token that represents the API developer. The developer will never receive the user credentials.

## Hypermedia

Hypermedia is links for APIs helping developers to know how to use the API Links helps APIs become self-describing Links become the application state

* Hypermedia As The Engine of Application State (HATEOAS)
* HATEOAS add links on top of REST-ful HTTP

### Links

What kinds of links to provide:

* Paging
* Creating New Items
* Retrieving Associations
* Actions


```javascript
{
    totalResults: 1000,
    links: [
        {"href": "/api/v1/games?page=1", "rel": "prevPage" },
        {"href": "/api/v1/games?page=3", "rel": "nextPage" },
        {"href": "/api/v1/games", "rel": "insert" }
    ],
    "results": []
}
```

```javascript
{
    links: [
        {"href": "/api/v1/games/2", "rel": "self" },
        {"href": "/api/v1/games/2/rating", "rel": "rating" }
    ],
    "id": 2,
    "name": "Final Fantasy XIII",
    ...
}
```

Profile Media Types

* Profiles are descriptions of data returned
* Alternative to using custom MIME types in versioning
* Should be included in the Accept header
* Server can return profile for client


```javascript
GET /api/order/123
HOST: http://..
Accept: appliaction/json;profile=http://api.attracs.com/orders
```

### Hypermedia Standards

The standards are emerging None are final

* HAL
* Collection+JSON

Based on content types with profile media type Content type defines data formatting Profile media type defines the structure of the data Keeps the format and structure/version separated

#### HAL

* Hypertext Application Language strives to be a lean hypermedia type
* Supports standard formats like JSON and XML for including resources and links


```
content type application/hal+json
content type application/hal+xml
content type application/hal+json;profile=http://api.attracs.com/orders
```

Resources contains state and links plus embedded resources containing state and links


```json
{
    "_links":{
    "self": {"href": "/games"},
    "next": {"href": "/games?page=2"},
    "find": {"href": "/games{?query}", "templated": true},
    "totalCount": 100,
    "_embedded": {
        "results": [
            {
                "_links": {
                    "self": {"href": "/games/123"},
                    ...
                },
                "price": 30.00,
                "currency": "USD",
                "name": "Halo 3"
            },
            ...
        ]
    }
}
```

Template Links: Used when URI includes a template (e.g. RFC6570)


#### Collection + JSON

* A standard for reading and writing collections
* Communicating lists and individual items
* Includes UI elements in messages
* Good for simple machine driven lists but a bit verbose for data-driven REST
* Including UI elements sets scene for automating code

```
content type application/vnd.collection+json
content type application/vnd.collection+json;profile=http://foo.com/bar
```

```javascript
{
    "collection": {
        "version": "1.0",
        "href": "http://api.attracs.com/Orders",
        "links": [
            { "rel": "feed", "href": "http://api.attracs.com/Orders/rss" }
        ],
        "items": [
            {
                "href": "http://api.attracs.com/Orders/1",
                "data": [
                    { "Id": 1, "Date": "2014-01-01"},
                    ...
                ],
                "links": [
                    {
                        "rel": "customer",
                        "href": "http://api.attracs.com/Orders/1/customer",
                        "prompt": "Show Customer"
                    },
                    ...
                ]
            }
        ]
    }
}
```

It also includes queries and templates for UI building:

```javascript
{
    "collection": {
        ...
        "queries": [
            {
                "rel": "search",
                "href": "http://api.attracs.com/Orders/search",
                "prompt": "Find Order",
                "data": [
                    {"name": "search", "value": ""}
                ]
            }
        ],
        "template": {
            "data": [
                {"name": "id", "value": "", "prompt": "Order Id"},
                {"name": "date", "value": "", "prompt": "Order Date"},
                ...
            ]
        }
    }
}
```
