---
title: About ES6
createdAt: 2019-09-29
description: Introduction to es6 JavaScript
---

# {title}

> {description}

- [{title}](#title)
  - [Variables](#variables)
  - [Variable scoping](#variable-scoping)
  - [String Literals](#string-literals)
  - [The Spread Operator](#the-spread-operator)
  - [Destructuring Assignments](#destructuring-assignments)
  - [Arrow Functions](#arrow-functions)
    - [Aside on the `this`keyword](#aside-on-the-thiskeyword)
  - [Modules](#modules)
  - [Classes](#classes)

ES stands for ECMAScript which is the language specification standards for JavaScript upheld by an open group within the ECMA international organization since 1996. ECMA is short for European Computer Manufacturers Association. ECMA something or other is thus referring to a language specification standard whereas JavaScript in general may refer to one of many different implementations of this standard.

ES6, or ECMAScript 2015, or ES2015 for short, the 6th generation of the JavaScript language spec, was released in mid-2015. The name was changed from ES6 to ES2015 in the hope of releasing new specifications annually from now on.

Full ES6 support was for instance implemented in the V8 engine (powering Google Chrome) about a year after the spec was released.

## Variables

In addition to the `var` keyword you can (and should) use `const` and `let` for declaring variables.

The difference between `const` and `let` is that you cannot reassign a value to a const variable. It however only prevents reassigning the variable, not changing the contents of it.

```javascript
const a = 2;
a = 3; // Not allowed

const b = [];
b = [1,2,3]; //Not allowed
b.push("item"); //OK

const c = {};
c = null; // Not allowed
c.name = "LuKa"; // OK
```

So as a rule of thumb use const whenever you can to avoid accidentally reassigning a variable.


## Variable scoping

If using `let` and `const` to declare variables they will be valid in a certain scope as opposed to ES5 where all variables have function scope. You can then declare a new variable with the same name inside a function as log as it is in a different scope as in the standalone block of code below:

```javascript
let a = "Hello";

console.log(a);

{
    let a = "Goodbye";
    console.log("a inside scope", a);
}
```

## String Literals

String literals or template strings are strings containing variables/expressions that will be evaluated and the result inserted (interpolated) into the string. They are denoted by backticks instead of quotation marks.

```javascript
const name = "LuKa";
console.log(`Your name is ${name}`);
```

## The Spread Operator

```javascript
let a = [7, 8, 9];
let b = [6, ...a, 10];
console.log(b);
```
The result of b will be [6, 7, 8, 9, 10]. In ES5 you would have used the concat() function to concatenate the two arrays.

```javascript
function print(a, b, c) {
    console.log(a, b, c);
}

let z = [1, 2, 3];
print(z[0], z[1], z[2]); // ES5 syntax
print(...z); // ES6 syntax
```

```javascript
// Gather into array
function print(...z) {
    console.log(z);
}

print(1, 2, 3);
```


## Destructuring Assignments

Allows you to assign data from objects or arrays into variables. This is mainly for making the code easier to read.

Grab elements per position and assign them to variables a and b:

```javascript
let c = [100, 200];
let [a, b] = c;
console.log(a, b);
```
You can also use the spread operator:

```javascript
let c = [100, 200, 300, 400, 500];
let [a, ...b] = c;
console.log(a, b);
```
The output shows `a` to contain 100 and `b` the array [200, 300, 400, 500].

The common use case is for dealing with option objects passed to functions where you only need part of the properties of the options object in the function.

```javascript
const animal = {
    species: "Dog",
    weight: 23,
    sound: "Woof!"
};

const {species, sound } = animal;
console.log(`The ${species} says ${sound}`);
```

The destructuring assigns the animal properties species and sound to the variables species and sound which are then logged to the console.

You can also do it in the function header and assign default values:

```javascript
function makeSound({ species = 'animal', sound }) {
    // Considers species an optional param with
    // default value 'animal'
    console.log('The ' + species + ' says ' + sound + '!');
}

makeSound({
    weight: 23,
    sound: "woof"
});

makeSound({
    species: 'dog',
    weight: 23,
    sound: "woof"
});
```

You can also destructure nested properties.

## Arrow Functions

```
function () {}
() => {}

```

Basically works like ES5 functions but has shorter syntax. The major difference aside from being shorter in syntax is that arrow functions does not create a new context like ES5 functions do. That means that the `this` keyword is lexically scoped as opposed to being function scoped as in ES5. See aside below.

Also note that ES6 functions can only be named by assigning them to a variable. The functions will not be hoisted with the variable like ES5 functions so the variable need to be defined before the function is called.

```

// Works in ES5 because deliverTo function is hoisted to top
deliverTo("home");

var deliverTo = function (location) {

};

// Works in ES6 where function body isn't hoisted
const deliverTo = (location) => {

};

deliverTo("home");
```

Example:

```javascript
//Named function ES5 style
function blastoff () {
    console.log("3...2...1... blastoff!");
}

blastoff();

// Anonymous function ES5 style
setTimeout(function () {
    console.log("3...2...1... blastoff!");
}, 1000);

// Anonymous function ES6 style
setTimeout(() => {
    console.log("3...2...1... blastoff!");
}, 1000);

// Named function ES6 style
const blastoff = () => {
    console.log("3...2...1... blastoff!");
}

blastoff();
```

If the arrow function takes exactly one parameter you don't have to put it inside parens. Also if it only contains one expression the result will be returned by default so you can skip the curly braces and the return keyword.

```javascript
const getbirthYear = age => year - age;
```

### Aside on the `this`keyword

Unlike normal JavaScript functions, arrow functions do **not** bind the `this` object to their function scope. That means that `this` is the global scope or the wrapping function whereas ES5 functions always binds it to the function.

```javascript
this.a = 25;

let print = function () {
    console.log(this.a); // => undefined
    this.a = 5;
    console.log(this.a); // => 5
}

print();

let arrowPrint = () => {
    console.log(this.a); // => 25
    this.a = 5;
    console.log(this.a); // => 5
}

arrowPrint();

console.log(this.a); // => 5
```

## Modules

* Modules refer to reusable pieces of code that often exist independently in their own separate files.
* Export in es6 sends functions, objects, or primitive values from one module to another.
* Import in es6 receives functions, objects, or primitive values from another module.
* The **default export** represents a fallback or "main" value/function for a module.
* You cannot write the export default syntax and declare variables on the same line.

Exporting data:

```javascript
// File: students.js
export const students = ["Harry", "Ron", "Hermoine"];
export const total = 505;

// File: index.js
import { students, total } from "./students";
console.log(students, total);

```

Exporting functions:

```javascript
// File: calculator.js
const add = (x, y) => {
    return x + y;
}

// File: index.js
const multiply = (x, y) => {
    return x * y;
}

export {add, multiply};

import { add, multiply } from "./calculator";

console.log(add(5, 3));
console.log(multiply(5, 3));
```

Exporting a default function:

```javascript
// File: calculator.js
const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

export {add, multiply};
export default multiply; // fallback

// File: index.js
import calc from "./calculator";

console.log(calc(5, 3)); // will multiply
```

## Classes

A ES6 class can have only one constructor function. When extending (inheriting from) a class the constructor implementation can call super() instead of re-implementing the iherited part. Adding a function with the same name overrides an inherited function.

Simple example with inheritance

```javascript
// File: entity.js
class Entity {
    constructor(name, height) {
        this.name = name;
        this.height = height;
    }

    greet () {
        console.log(`Hi! I'm ${this.name} from middle earth`);
    }
}

export default Entity;


// File: index.js
import Entity from "./entity";

class Hobbit extends Entity {
    constructor(name, height) {
        super(name, height);
    }

    greet () {
        console.log(`Hi! I'm ${this.name} from the Shire`);
    }
}

const Frodo = new Hobbit("Frodo", 4.5);
Frodo.greet();
```
