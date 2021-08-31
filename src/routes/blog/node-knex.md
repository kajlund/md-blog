---
title: Knex - The Node.js Data Access Library
createdAt: 2019-07-01
description: Data Access in Node using Knex.
---

# {title}

> {description}

[Knex](http://knexjs.org/) is a "batteries included" data access library (DAL)/Query Builder for relational databases.

DALs are typically used as a way of abstracting the differences between different dialects of SQL provided by DB vendors. Knex provides standardized responses between different query clients and dialects.

**Postgres**

```
CREATE TABLE items(
    id SERIAL
);
```

**MySQL**

```
CREATE TABLE items(
    id INT NOT NULL AUTO_INCREMENT
);
```

**Knex**

```
knex.schema.createTable('items', function (tbl) {
    tbl.increments();
});
```

## Features

- [Query Builder](https://knexjs.org/#Builder)
- [Schema Builder](https://knexjs.org/#Schema)
- [Connection pooling](https://knexjs.org/#Installation-pooling)
- [Migrations](https://knexjs.org/#Migrations)
- [Data seeding](https://knexjs.org/#Seeds-API)
- Automatic SQL injection protection
- [Transaction support](https://knexjs.org/#Transactions)
- Supports both callbacks and promises
- It's strength lies in friendly jQuery-like query syntax

> Knex currently supports Postgres, MSSQL, SQLite3, MySQL/MariaDB, Oracle and Amazon Redshift.

## Installation

```
npm i knex
```

Also install needed db drivers:

```
npm install pg mssql sqlite3
```

## Knex CLI

knex init -> creates db config (knexfile.js)
knex migrate
knex seed

## Selecting Data

The order of chained methods is not significant.

```
from('book').select('title') = select('title').from('book')
knex('book') = knex.from('book') = knex.table('book')
```

#### select

Specify column names as strings or array. Defaults to selecting all columns

#### first

returns firs record of query

## Schema Building

Install knex-cli by running `npm install -g knex`.

run knex to list commands. knex init creates a file knexfile.js holding your db config.

knex migrate:make **name**

Run migration: knex migrate:latest

To rollback run knex migrate:rollback

Migrations and rollbacks are per batch and not necessarily per individual migration.

## Seeding Data

Seed files are run in alphabetical order
knex seed:make **name**
Run seed: knex seed:run
