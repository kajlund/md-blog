---
title: About The Redis DB
createdAt: 2018-09-05
description: A short intro to the Redis NoSQL database
---

# {title}

> {description}

> Having looked at various ways of doing sync between Attracs and some webapps using node.js I came across the Redis DB. Most libraries implementing some sort of queuing system seemed to mainly support Redis for persistence. As I had no prior knowledge apart from having heard the name I decided to spend some time looking into the how of Redis.

[[toc]]

## Redis What?

* [Redis](https://redis.io/) in No-SQL terms is considered to be an open source advanced key-value store.
* Redis is schemaless. It stores and serves different types of well known data structures like strings, hashes, lists, sets, sorted sets, bitmaps, hyperlogs and Geospatial data types. It does not store and serve raw data with relations like a SQL DB. - Redis was created for explicit reading, not ad-hoc querying.
* Redis has no internal query engine, you need to figure out how to store and retrieve your data from the get go.
* Redis is memory-based. Data stored in live memory. It can be considered an in-memory data structure Server/Store. It is somewhat similar to [Memcached](https://memcached.org/) but can persist data. - Store only data you KNOW you will use.
* In memory databases are best suited for storing data you need quick access to like caches or message brokers.
* It's strength is in it's performance and simplicity and wide support for different [languages](https://redis.io/clients).
* It's weaknesses lies in scaling and security. More on security below.
* Partitioning means splitting data among multiple Redis instances.

## Security

Redis was designed to be accessed by trusted clients inside trusted environments. Directly exposing to WWW is not a good idea. Simple authentication can be used but Redis should be accessed via a server layer.

### Network Security

* Deny access to main Redis port (6379) via firewall.
* Bind to single interface in **redis.conf** `Bind 127.0.0.1`

### Authentication

* Tiny layer of authentication can be enabled in **redis.conf**.
* Refuse  all queries from unauthenticated users
* Users must send the **AUTH** command along with the password.
* Password is stored in plain text in the **redis.conf** file.

### Data Encryption

* Redis does NOT support data encryption
* If open to WWW, use additional protection layer.
* SSL Proxy - [Spiped](https://github.com/Tarsnap/spiped).

You can disable and rename commands as a further security measure.

* Specific commands can be disabled (rename to emty string) or renamed in **redis.conf**
* Normal users should be prevented from running **CONFIG** and **FLUSHALL** commands

```
rename-command CONFIG kj4h5894634567hkjyh5789e
rename-command CONFIG ""
```

> Even with only trusted clients connecting a potential treat would be via data inserts like causing a DoS via a web form or similar.

## Data Persistence

See also: [Redis manual](https://redis.io/topics/persistence) on persistence

* Two basic types of persistence
* RDB persistence performs point-in-time snapshots at specified intervals
  * Compact and allows fast restarts
  * Expensive (takes time) for large amouts of data
  * Typically results in some amount data loss
* AOF (Append-Only File) persistence logs all write operations so they can be played back at startup
  * No essential data loss
  * Produces extra files
* It's possible to use both of the above
* Settings in redis.cnf where persistense can be enabled or disabled.

### Persistence Process

1. Client sends write command to DB (Client Memory)
2. DB receives write (Server Memory)
3. DB writes data to disk (Kernel Buffer)
4. The OS transfers write buffer to disk controller (Disk cache)
5. disk controller writes to physical media (Physical Disk)

### Pools

Multiple Redis servers running on the same machine using different ports.

### Replication

Simple master-slave replication allows slave Redis servers to be copies of master servers.
You can have multiple slaves replicating in the background. Slaves can be read only

Replication is none-blocking

## Install

Check the [Redis downloads page](https://redis.io/download).

On Ubuntu:

```
sudo apt-get update
sudo apt-get upgrade
apt-get install redis-server
redis-server
redis-cli
```

Redis isn't ready built for Windows but you can find old installers [here](https://github.com/MicrosoftArchive/redis/releases).

> If you installed on Windows using the installer it should already run as a service. If you need to change some settings you should modify `C:\Program Files\Redis\redis.windows-service.conf` and restart the Redis service.

After installation open an admin command prompt and go to redis folder under Program Files.

```
redis-server redis.windows.conf # start server
redis-cli # log in
127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```

Check out DaveJ's Guide for [more details on configuration](http://thisdavej.com/guides/redis-node/configuration.html).

## Redis-CLI

To start the redis client run `redis-cli`. To quit type `exit`.

You can pipe command outputs to text files:

```
redis-cli INCR foo > commands.txt
```

If you want to monitor DB activity type the `monitor`command.

## CLI Commands

> The commands are NOT case-sensitive. Uppercase is used for syntax here only.

### Basic

| CMD      | Description             | Example                                |
|----------|-------------------------|----------------------------------------|
| PING     | Test if server up       | `PING -> PONG`                         |
| SET      | Sets a string variable  | `SET foo 100 -> OK`                    |
|          |                         | `SET server:name atalfa -> OK`         |
|          |                         | `SET server:port 1234 -> OK`           |
|          |                         | `GET server:name -> atalfa`            |
| GET      | Gets value of a variable| `GET foo -> "100"`                     |
| DEL      | Deletes a variable      | `DEL bar -> (integer 0)|(integer 1)`   |
| EXISTS   | Check for existance     | `EXISTS foo -> (integer 0)|(integer 1)`|
| INCR     | Increments by 1         | `INCR foo -> (integer) 101`            |
| INCRBY   | Increments by specified | `INCRBR foo 10 -> (integer) 111`       |
| DECR     | Decrements by 1         | `DECR foo -> (integer) 110`            |
| DECRBY   | Decrements by specified | `DECRBY foo 10 -> (integer) 100`       |
| FLUSHALL | Clears DB               |                                        |
| EXPIRE   | Expire value in sec.    | `EXPIRE foo 1 -> (integer 1)`          |
|          |                         | `GET foo -> (nil)`                     |
| TTL      | Check expiry in sec     | `TTL foo -> (integer 55)`              |


### Key/Value Pair Commands

| CMD      | Description                                                                               | Example                                |
|----------|-------------------------------------------------------------------------------------------|----------------------------------------|
| MSET     |Sets multiple keys to respective values replacing existing                                 |`MSET key1 "value1" key2 "Value2"`      |
| MSETNX   |Sets multiple keys to respective values only of none of the keys exist. Will not overwrite.|`MSETNX key1 "value1" key2 "Value2"`    |
| MGET     |Returns values for all specified keys. Nill if key doesn't have value                      |`MGET key1 key2 -> "value1" "value2"`   |
| APPEND   |Given the key exists and is string the value will be appended otherwise SETs key.          |`APPEND mykey "Kaj "`                   |
|          |                                                                                           |`APPEND mykey "Lund"`                   |
|          |                                                                                           |`GET mykey -> "Kaj Lund"`               |
| GETRANGE |Returns substring of a String. Determined by offset (start/end). -offset to start from end.|`GETRANGE mykey 0 5 -> "Kaj Lu"`        |
|          |                                                                                           |`GETRANGE mykey 0 -3 -> "Kaj Lu"`       |
| RENAME   |Renames a key. Returns error if non valid key. Overwrites existing key                     |`RENAME mykey myrenamedkey`             |
| RENAMENX |Renames a key. Returns error if non valid key. Does not overwrite existing key             |`RENAMENX mykey myrenamedkey`           |
| GETSET   |Returns old value when setting new value                                                   |`SET foo bar -> OK`                     |
|          | Can be used with INCR to return last val of counter before reset                          |`GETSET foo baz -> bar`                 |
|          |                                                                                           |`GET foo -> "baz"`                      |
| SETX     | Set key value with timeout. Short for SET + EXPIRE                                        |`SETX mykey 10 "hello"`                 |
| PSETX    | Same as SETEX but using milliseconds as param                                             |`PSETX mykey 10000 "hello"`             |
| PTTL     | Check expiry in milliseconds                                                              |`PTTL mykey -> (integer 8000)`          |
| PERSIST  | Remove key timeout                                                                        |`PERSIST mykey`                         |
| SETNX    | SET for non existing key, skips if key exists                                             |`SETNX mykey "value"`                   |

### Scan & Match

Used for looping/iterating through keys in DB

* Scan iterates the set of keys in the DB and returns a small amout per call. It takes a cursor or position as parameter and also returns one to be used for further calls. You start with the command `scan 0` and the server returns a cursor + key-value pairs. You then call scan with the returned cursor as param until server returns 0.
* Scan is reliable - It does NOT return elements that wasn't in the DB for the duration of the scan.
* Use the **COUNT** param to tell Redis the page size. The default is 10.
* Use the **MATCH** option to only iterate elements matching a certain  pattern. `SCAN 0 MATCH k*`.
* Use **SSCAN** with sets **HSCAN** for hashes and **ZSCAN** with sorted sets.
* The keys pattern returns keys that matches a pattern. Should be avoided in production. Supports common glob patterns.
* Use **RANDOMKEY** to return a random key from the DB.


## Data Types

### Lists

* One dimensional array of strings
* Elements can be pushed to head or tail of list
* Often used for producer/consumer queries (Messaging, Event Queues, Notification systems etc)
* A new list is created when LPUSH or RPUSH is run on an empty key. Key is removed from keyspace if a list operation empties the list.


| CMD      | Description                                               | Example                                 |
|----------|-----------------------------------------------------------|-----------------------------------------|
| LPUSH    | Insert a new element on the head (left)                   | LPUSH mylist a -> "a"                   |
|          |                                                           | LPUSH mylist b -> "b", "a"              |
| RPUSH    | Insert a new element on the tail (right)                  | RPUSH mylist c -> "b", "a", "c"         |
| LRANGE   | Returns specified range of elements. Zero based. Offset can be negative| LRANGE mylist 0 2, all 0 -1|
| LLEN     | Returns list length. 0 for empty list.                    | LLEN mylist -> 3                        |
| LINSERT  | Inserts an element before given element                   | LINSERT mylist BEFORE "a" "aa"          |
| LPOP     | Return and remove first list element.                     | LPOP mylist -> b                        |
| RPOP     | Return and remove last list element.                      | RPOP mylist -> c                        |


### Sets

* Unordered collections of strings
* Can add, remove and test for existance
* Does NOT allow duplicates
* Supports server side commands to compute sets from existing sets (Quick unions, intersects and diffs)

| CMD      | Description                                               | Example                                |
|----------|-----------------------------------------------------------|----------------------------------------|
| SADD     | Adds values to a set if not already exists                | SADD carmakes "Toyota"                 |
| SREM     | Removes values from a set                                 | SREM carmakes "Honda"                  |
| SISMEMBER| Test if a value is in the set. Returns 1 or 0             | SISMEMBER "Honda" -> 0                 |
| SMEMBERS | Returns list of all members in a set                      | SMEMBERS carmakes -> "Toyota"          |
| SCARD    | Returns count of members in a set or 0                    | SCARD carmakes -> 1                    |
| SMOVE    | Moves a value from one set to another                     | SMOVE carmakes makes "Toyota"          |
| SUNION   | Combines two or more sets into one and returns members    | SUNION carmakes makes                  |
| SDIFF    | Difference between first and successive sets              | SDIFF carmakes cars                    |
| SRANDMEMBER| Returns random key or keys from given set               | SRANDMEMBER carmakes 2                 |
| SPOP       | Returns and removes random key or keys from given set   | SPOP carmakes 2                        |


### Sorted Sets

* Like sets but every member is associated with a "score" for sorting and quick access.
* Scores are required and must be a number (float 500 = 500.0)
* Scores unlike values do not need to be unique

| CMD      | Description                                               | Example                                |
|----------|-----------------------------------------------------------|----------------------------------------|
| ZADD     | Adds value to a sorted set if not already exists          | ZADD people 1960 "John Doe"            |
| ZREM     | Removes values from a sorted set                          | ZREM people "John Doe"                 |
| ZRANGE   | Works like LRANGE for lists. Ordered low to high by score | ZRANGE people 0 -1                     |
| ZREVRANGE| Works like ZRANGE but ordered high to low by score        | ZREVRANGE people 0 -1                  |
| ZREVRANGEBYSCORE| Works like ZRANGE but with range on score          | ZREVRANGEBYSCORE people 1950 1990      |
| ZRANK    | Return member rank  (sorted index)                        | ZRANK people "John Doe" -> 0           |
| ZREVRANK | Like ZRANK but reversed sort order                        | ZREVRANK people "John Doe" -> 0        |
| ZCARD    | Return the number of items                                | ZCARD people -> 1 |
| ZCOUNT   | Number of items with score between min and max            | ZCOUNT people 1950  1970 -> 1          |
| ZINCRBY  | Inc member score by count or add if missing. Negatives allowed| ZINCRBY people 1 "John Doe" -> 1961|
| ZSCORE   | Returns member score or nil                               | ZSCORE people "John Doe" -> "1961"     |


### Hashes

* A map between a string fields and string values making them perfect for representing objects
* Compact. Good for holding lots of data in a small amout of space

| CMD      | Description                                               | Example                                |
|----------|-----------------------------------------------------------|----------------------------------------|
| HSET     | Sets a field in hash. Sets (1) or updates existing (0)    | HSET user1 name "John" -> 1            |
| HMSET    | Like HSET but for adding multiple fields       | HMSET user2 name "luka" email "k@l.com"|
| HGET     | Gets value for given field in a hash or nil    | HGET user2 name -> "luka" |
| HMGET    | Like HGET but for multiple fields | HMGET user2 name email age -> "luka" "k@l.com" (nil)|
| HGETALL  | Gets all fiels-value pairs for given hash | HGETALL user2 -> "name" "luka" "email" "k@l.com" |
| HDEL     | Removes specified fiels(s) from hash. Returns numfields removed | HDEL user2 email|
| HEXISTS  | Check if fiels exists in a hash. Returns 1 or 0 | HEXISTS user2 name -> 1|
| HINCRBY  | Incr a number stored in hash. Adds not exists. |HINCRBY user2 age 1 |
| HKEYS    | Returns all field names in the hash. | HKEYS user2 -> "name" "email"|
| HLEN     | Returns the number of fields in a hash | HLEN user2 -> 2|
| HVALS    | Returns all values in the hash. | HVALS user2 -> "luka" "k@l.com"|
| HSTRLEN  | Returns string length of value associated with a field or 0 | HSTRLEN user2 name -> 4|

