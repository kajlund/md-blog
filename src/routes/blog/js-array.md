---
title: Array Object
createdAt: 2019-10-29
description: JavaScript arrays
---

# {title}

> {description}

## Methods

* [Find](#find)
* [Map](#map)
* Every
* Some
* [Reduce](#reduce)


### Find

Find works like filter but returns the first element found:

```js
const linus = employees.find((emp) => emp.name === "Linus");
```

### Map

The map function is used for returning a tranformed version of the original array's content. The iterator function expects you to return a new/transformed value on each iteration of the original array. The resulting array will have the same number of items but will typically contain different values.

Traditionally you would create a new list like this:

```js
var names = [];
for (var i = 0; i < employees.length; i++) {
    names.push(employees[i].name);
}
```

Using the map funtion you could do:

```js
const employees = [{ name: 'LuKa', title: 'Programmer' }, { name: 'Juha': title: 'Manager' }];
const names = employees.map(function (emp) {
    return emp.name;
});
console.log(employees); // => ['LuKa', 'Juha'];
```

Using ES6 syntax you would do:

```js
const names = employees.map((emp) => emp.name);
```


### Reduce

The swiss army knife of list transformations. You could use it to implement some of the more specialized list functions presented above.

Let's say we have a list of orders and want a total of the amount.

```js
const orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
];
```

Using a traditional approach we would use a loop:

```js
var totalAmount = 0;
for (var i = 0; i < orders.length; i++) {
    totalAmount += orders[i].amount;
}
console.log(`Total = ${totalAmount}`);
```

Using the reduce function we could do:

```js
const totalAmount = employees.reduce(function (sum, order) {
    return sum += order.amount;
}, 0);
console.log(`Total = ${totalAmount}`);
```
where the last param (0) is the starting value for the sum param.

Using more modern syntax it becomes a one-liner:

```js
const totalAmount = employees.reduce((sum, order) => sum += order.amount, 0);
console.log(`Total = ${totalAmount}`);
```

##### A more complex example

We have a .csv file with the following data:

```
Linus;Manager
Linus;Programmer
Linus;Architect
Hese;Programmer
Juha;Manager
Juha;Programmer
LuKa;Programmer
Ossi;Programmer
Eetu;Programmer
```
and we want to construct an array of objects containing the employee name and a list of positions the employee is holding:

```js
const fs = require("fs");

const data = fs.readFileSync("csvdata.csv", "utf8")
    .trim()
    .split("\r\n")
    .map(line => line.split(";"))
    .reduce((employees, line) => {
        let emp = employees.find((emp) => emp.name === line[0]);

        if (emp) {
            emp.positions.push(line[1]);
        } else {
            emp = {
                name: line[0],
                positions: [ line[1] ]
            };
            employees.push(emp);
        }

        return employees;
    }, []);

console.log("data:\n", JSON.stringify(data, null, 2));
```
It would produce the following output:

```json
data:
 [
  {
    "name": "Linus",
    "positions": [
      "Manager",
      "Programmer",
      "Architect"
    ]
  },
  {
    "name": "Hese",
    "positions": [
      "Programmer"
    ]
  },
  {
    "name": "Juha",
    "positions": [
      "Manager",
      "Programmer"
    ]
  },
  {
    "name": "LuKa",
    "positions": [
      "Programmer"
    ]
  },
  {
    "name": "Ossi",
    "positions": [
      "Programmer"
    ]
  },
  {
    "name": "Eetu",
    "positions": [
      "Programmer"
    ]
  }
]
```

We could implement a map() function using reduce() like this:

```js
const map = (collection, fn) => {
  return collection.reduce((acc, item) => {
    return acc.concat(fn(item));
  }, []);
}
```

and filter:

```js
const filter = (collection, fn) => {
  return collection.reduce((acc, item) => {
    if (fn(item)) {
      return acc.concat(item);
    }

    return acc;
  }, []);
}
```
