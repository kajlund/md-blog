---
title: An introduction to NoSQL databases
createdAt: 2018-05-01
description: A short introduction to the concepts of NoSQL databases
---

# {title}

> {description}

**NoSQL** has become a popular term but a more descriptive one would be **non-relational** for describing these kinds of database systems. Non-relational databases are not a new thing, they were commonly used in early mainframe computers.

* **Schemaless** - Fields are not enforced between records allowing storage of different data with each record. This makes the database easier to maintain if the data model changes frequently.
* **Complex data structures** - Allows storing nested values in a record (sub-arrays or -objects)
* Typically use a distributed architecture meaning there's no single point of failure
* **Web Scale** - Simple needs but huge volumes
* Typically provides redundant storage
* Easy to partition. For a small dataset partitioning only increases complexity.

### NoSQL Use Cases

* To entirely replace your SQL DB
* Use as a caching layer in front of a SQL DB
* Store binary files instead of using file system
* Serve full webapps (CouchDB)

## The CAP Theorem

The CAP theorem was proposed by Eric Brewer in 2000. It is often used to generalize tradeoffs between different types of databases. According to the CAP theorem you can *at most only guarantee 2 out of 3 desirable properties*:

* Available and Partition-tolerant (AP)
* Consistent and Partition-tolerant (CP)
* Consistent and Available (CA)

Available in the meaning always being able to read from and write to.  Relational Databases trend towards consistency and availability (CA) whereas NoSQL databases trend towards available and partition tolerance (AP).

> CAP tradeoffs may be somewhat irrelevant if you don't aim to serve a huge number of simultaneous clients. Non-relational databases do not automatically solve scalability issues but offer some flexibilities that typical relational DBMS lack.

## Types of NoSQL Databases

### Key-Value Store

* Query using key replies with the value of the key. Simplest, most common and serves as a basis for the other types
* Each row typically have a similar structure even though they don't have to but each row can have different key
* Very fast if you don't need to query by anything other than the key
* Some let you define more than one key to address this
* Sometimes used alongside RDBMS for caching
* Examples include riak, redis, Azure Table storage, Amazon simple DB, dynomite, Voldemort

### Document Stores

* Instead of rows you have documents, typically in the form of a JSON object
* Well suited for web applications in general
* Stores documents in structured format like XML or JSON
* Usually organised into "collections" and "databases"
* Individual documents can have unique structures.
* Each document typically has a unique key
* You can typically query on any contained field
* Examples include MongoDB and CouchDB

### Wide Column Stores

* Semi-schematic where you need to define column groups
* Examples include Apache Hbase and Cassandra

### Big Table/Tabular DBs

* Named after Google's "Big Table" implementation
* Each row can have a different set of columns
* Designed for handling a large number of columns per row
* Rows are typically versioned

### Graph Databases

* Relationship-focused
* Designed for data best represented as interconnected nodes.
* Great for social-media type apps
* Examples include Neo4j

### Object Databases

* Tightly integrated with oop languages
* Store objects directly
* Linking via pointers

## A Selection of NoSQL Databases

### CouchDB

* Available, Partition-tolerant
* Connections over HTTP
* Querying using MapReduce funtions written in JavaScript

### MongoDB

* Consistent and partition-tolerant
* Own protocol, drivers for each language
* Master/Slave replication. Only master can write data
* Partitioned using sharding
* Structured around databases, collections (similar records) and records
* JavaScript query language resembles SQL. You can define MapReduce functions.

### Cassandra

* Available and Partition-tolerant
* Own protocol, drivers for each language
* Cross between key/value and tabular database
* Hardware nodes can be added with no downtime
* Consistency can be adjusted at the cost of availability
* each key maps to one or more columns that can be grouped into column families
* Queries using Cassandra Query Language (CQL) similar to SQL

### Riak

* Available and Partition-tolerant
* Connections over HTTP
* Querying using MapReduce funtions written in JavaScript or Erlang
* Designed to run on *nix systems
* Structured around bucket/key/value
* Query syntax same as Lucene full-text search engine
* also have so called key filters

### Redis

* Consistent and Partition-tolerant
* Key/value store
* Own protocol, drivers for each language
* Designed to run on *nix systems
* Master/slave replication
* Querying primarely by key but specific values from hashes within records can be retrieved.
* The values stored does not have to be strings. lists sets and hashes of strings
