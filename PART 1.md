# JavaScript Data Types: Mutable vs Immutable

## Immutable Data Types (Cannot be changed after creation)

Primitive data types in JavaScript are **immutable**, which means their value cannot be changed once assigned. When you try to modify the value, a new value is created instead of changing the original one.

### List of Immutable Data Types:

| Data Type    | Example     | Immutability |
|--------------|-------------|--------------|
| **Number**   | `let a = 42; a = 50;` | Immutable |
| **String**   | `let str = "hello"; str = "world";` | Immutable |
| **Boolean**  | `let isActive = true; isActive = false;` | Immutable |
| **Undefined**| `let x = undefined;` | Immutable |
| **Null**     | `let y = null;` | Immutable |
| **Symbol**   | `let sym1 = Symbol(); sym1 = Symbol();` | Immutable |
| **BigInt**   | `let big = 123n; big = 456n;` | Immutable |

#### Explanation:
If you try to change a primitive value (like a number or string), JavaScript doesn't change the original value—it creates a new one. This is why primitives are immutable.

---

## Mutable Data Types (Can be changed after creation)

Non-primitive data types (reference types) are **mutable**, meaning their value can be changed after they're created. When you modify an object or an array, you're modifying the data in memory, and the reference stays the same.

### List of Mutable Data Types:

| Data Type   | Example                              | Mutability    |
|-------------|--------------------------------------|---------------|
| **Object**  | `let obj = {a: 1, b: 2}; obj.a = 3;` | Mutable       |
| **Array**   | `let arr = [1, 2, 3]; arr[0] = 10;`  | Mutable       |
| **Function**| `function greet() { return "Hi"; }`  | Mutable       |
| **Date**    | `let date = new Date(); date.setFullYear(2025);` | Mutable |
| **RegExp**  | `let regex = /abc/; regex.lastIndex = 5;` | Mutable |
| **Map**     | `let map = new Map(); map.set('key', 'value');` | Mutable |
| **Set**     | `let set = new Set(); set.add(1);`   | Mutable       |

#### Explanation:
For non-primitive types like objects and arrays, the **value** is stored in memory. When you modify the contents (e.g., adding a new key to an object, changing an element in an array), the reference to that data doesn't change. You're modifying the original data structure.

---

## Example Comparison

### Primitive (Immutable):

```js
let x = 10;     // x points to value 10
x = 20;         // x now points to a new value, 20
console.log(x); // 20

```

==============================================================================================================================================================================


# JavaScript Variable Declarations: var, let, and const

## 1. var (Old School)

**Characteristics:**

-   **Scope:** Function-scoped, meaning it's accessible throughout the
    entire function (or globally if declared outside a function). It is
    not block-scoped.
-   **Hoisting:** `var` declarations are hoisted to the top of their
    scope, but only the declaration part (not the assignment).
-   **Reassignable:** Variables declared with `var` can be reassigned
    and redeclared within the same scope.

**Example:**

``` js
var x = 5;   // Declaration and assignment
console.log(x); // 5

var x = 10;  // Redeclaration is allowed
console.log(x); // 10

if (true) {
  var y = 20; // Accessible outside this block
}

console.log(y); // 20
```

**Hoisting Example:**

``` js
console.log(a);  // undefined (hoisted)
var a = 5;
console.log(a);  // 5
```

Here, the `var` declaration is hoisted, but the assignment (`a = 5`)
isn't.

------------------------------------------------------------------------

## 2. let (Block-scoped)

**Characteristics:**

-   **Scope:** Block-scoped, meaning it's only accessible within the
    block (enclosed by `{}`). Commonly used for loops, conditionals, and
    other block-level structures.
-   **Hoisting:** `let` declarations are hoisted, but unlike `var`, they
    are not initialized until the execution reaches the line of code.
    This leads to a "temporal dead zone".
-   **Reassignable:** Variables declared with `let` can be reassigned
    but cannot be redeclared within the same block.

**Example:**

``` js
let x = 5;
console.log(x); // 5

x = 10; // Reassigned
console.log(x); // 10

if (true) {
  let y = 20; // Block-scoped, not accessible outside the block
  console.log(y); // 20
}

console.log(y); // ReferenceError: y is not defined
```

**Hoisting Example:**

``` js
console.log(a);  // ReferenceError: Cannot access 'a' before initialization
let a = 5;
console.log(a);  // 5
```

------------------------------------------------------------------------

## 3. const (Constant value)

**Characteristics:**

-   **Scope:** Like `let`, `const` is block-scoped.
-   **Hoisting:** `const` declarations are hoisted but also suffer from
    the temporal dead zone.
-   **Reassignable:** Variables declared with `const` must be assigned a
    value at the time of declaration. They cannot be reassigned or
    redeclared. However, objects/arrays can still be mutated.

**Example:**

``` js
const x = 5;
console.log(x); // 5

// x = 10; // TypeError: Assignment to constant variable.

if (true) {
  const y = 20; // Block-scoped
  console.log(y); // 20
}

console.log(y); // ReferenceError: y is not defined
```

**Object and Array with const:**

``` js
const arr = [1, 2, 3];
arr.push(4);  // Allowed: mutating the contents of the array
console.log(arr); // [1, 2, 3, 4]

arr = [10, 20]; // TypeError: Assignment to constant variable.
```

Here, the array itself can be modified (e.g., adding elements), but you
cannot reassign `arr` to a new array.

------------------------------------------------------------------------

## 🔑 Key Differences at a Glance

  -----------------------------------------------------------------------------------
  Feature                           var               let             const
  --------------------------------- ----------------- --------------- ---------------
  **Scope**                         Function-scoped   Block-scoped    Block-scoped

  **Hoisting**                      Hoisted           Hoisted         Hoisted
                                    (initialized as   (temporal dead  (temporal dead
                                    undefined)        zone)           zone)

  **Reassignment**                  Reassignable and  Reassignable,   Not
                                    redeclarable      not             reassignable or
                                                      redeclarable    redeclarable

  **Initialization**                Can be declared   Must be         Must be
                                    without           declared before declared with
                                    assignment        usage           assignment
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

## ✅ Practical Use Cases

-   **Use `var`** (less common in modern JS):
    -   Older codebases
    -   Functions that require function scope
-   **Use `let`:**
    -   When you need a variable that might change value (e.g., loop
        counters, temporary values).
    -   Block-level scoping in loops and conditionals.
-   **Use `const`:**
    -   When you don't plan to reassign the variable, ensuring value
        integrity.
    -   Default choice in most modern JavaScript code.

==============================================================================================================================================================================

# JavaScript Template Literals

Template literals provide a way to embed expressions within strings using backticks (`` ` ``).

## Syntax

```javascript
`string text ${expression} string text`
```

==============================================================================================================================================================================

# Type Coercion and Conversion in JavaScript

JavaScript deals with changing data types in two ways: **type coercion** and **type conversion**. Although they are related, they happen differently.

---

## 1. Type Conversion (Explicit Conversion)

This is when you **manually convert** a value from one type to another using built-in functions or methods.

### Examples:

```js
// Convert string to number
let str = "123";
let num = Number(str); // 123 (number)

// Convert number to string
let n = 456;
let s = String(n); // "456" (string)

// Convert value to boolean
let truthy = Boolean(1); // true
let falsy = Boolean(0); // false
```

## General Tips

- Use **`===`** instead of `==` to avoid unexpected coercion.
- Be **explicit** when converting types — don’t rely on automatic coercion.
- Know JavaScript’s **falsy values**: `false`, `0`, `""`, `null`, `undefined`, `NaN`.


## 2. Type Coercion in JavaScript

**Type coercion** is the automatic or implicit conversion of values from one data type to another by the JavaScript engine, usually happening during operations or comparisons.

---

## How Type Coercion Works

JavaScript tries to make sense of expressions involving different types by converting one or more operands to a common type.

---

## Common Examples of Type Coercion

```js
// String + number: number is converted to string, then concatenated
console.log("5" + 1); // "51"

// Number + boolean: boolean is converted to number (true → 1, false → 0)
console.log(5 + true); // 6

// Loose equality comparison (==) causes coercion
console.log("5" == 5); // true (string "5" coerced to number 5)

// Subtraction operator coerces string to number
console.log("10" - 2); // 8

// Logical NOT coerces value to boolean
console.log(!0); // true (0 is falsy)
console.log(!"hello"); // false (non-empty string is truthy)
```

## Type Conversion Tips

- Use `Number()` or `parseInt()` to convert strings to numbers.
- Use `String()` or template literals (`` `${value}` ``) to convert to strings.
- Use `Boolean()` to convert values to true/false explicitly.
- Avoid mixing strings and numbers in arithmetic to prevent unexpected results.


==============================================================================================================================================================================

# Truthy and Falsy Values in JavaScript

In JavaScript, values are evaluated in a Boolean context (like inside `if` statements) as either **truthy** or **falsy**.

---

## Falsy Values

These values evaluate to `false` in a Boolean context:

- `false`
- `0` (zero)
- `-0` (negative zero)
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

Example:

```js
if (0) {
  console.log("Won't run because 0 is falsy");
}

```

============================================================================================================================================================================

# JavaScript Strict Mode and ES6 Modules

## 1. Strict Mode and ES6 Modules

Modern JavaScript modules (ES6+) are always in strict mode by default.  
So if your project uses ES modules (`import`/`export`), strict mode is already active without needing `'use strict';`.

For legacy scripts or files not using modules, it's best practice to add `'use strict';` at the top.  
This helps catch errors early and prevents subtle bugs.

---

## 2. Why Should You Use Strict Mode?

- It makes debugging easier by turning silent errors into thrown exceptions.  
- It prevents common mistakes (like accidental globals).  
- It improves code safety and maintainability.  
- It helps your code stay compatible with future JavaScript versions.

---

## 3. When Might You Not Use Strict Mode?

- If you’re working on old legacy code that relies on behaviors strict mode forbids, converting to strict mode can break it.  
- If you're working with third-party libraries that are not strict mode compatible.

But generally, you can refactor legacy code gradually to adopt strict mode safely.

---

## 4. Best Practices in Real Projects

- Use ES6 modules to get strict mode automatically.  
- For legacy or script files, place `'use strict';` at the top.  
- Use linting tools (like ESLint) configured to enforce strict mode rules.  
- Write clean and modern JavaScript, so your code naturally aligns with strict mode.


============================================================================================================================================================================

# Important Points to Keep in Mind While Working with Functions in JavaScript

## 1. Function Hoisting
- Function declarations are hoisted, meaning you can call them **before** they are defined.
```javascript
sayHi();

function sayHi() {
  console.log("Hi!");
}

- Function expressions and arrow functions are not hoisted like this. Calling them before definition will cause an error:

greet(); // Error: greet is not defined

const greet = function() {
  console.log("Hello!");
};
```

## 2. Parameters and Arguments

JavaScript functions are flexible with the number of arguments passed:

- You can pass fewer or more arguments than parameters defined.
- Extra arguments are ignored by default.
- Missing arguments are `undefined`.

To handle variable numbers of arguments, use:

- The `arguments` object (not available in arrow functions).
- Rest parameters (`...args`):

```js
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // Output: 10
```

## 3. Return Statement

- A function without a `return` statement returns `undefined` by default.
- Use `return` to send back a result.
- Once `return` executes, the function stops running:

```js
function checkNumber(num) {
  if (num > 10) {
    return "Greater than 10";
  }
  return "10 or less";
}
```

## 4. Scope and Closures

- Functions create their own local scope for variables.
- Variables declared inside a function are not accessible outside the function.
- Functions can access variables from their outer scope (closure):

```js
function outer() {
  let count = 0;
  function inner() {
    count++;
    console.log(count);
  }
  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
```

## 5. First-Class Functions

Functions are first-class citizens in JavaScript:

- Can be assigned to variables.
- Passed as arguments to other functions.
- Returned from functions.

```js
function greet() {
  return function(name) {
    console.log("Hello, " + name);
  };
}

const sayHello = greet();
sayHello("Alice");
```

## 6. Arrow Functions and `this`

- Arrow functions do **not** have their own `this` context.
- They inherit `this` from the surrounding (lexical) context.
- Regular functions have their own `this` based on how they are called:

```js
const obj = {
  value: 42,
  regularFunc: function() {
    console.log(this.value);
  },
  arrowFunc: () => {
    console.log(this.value);
  }
};

obj.regularFunc(); // 42
obj.arrowFunc();   // undefined (or window/global value)
```

## 7. Default Parameters

Use default parameters to avoid `undefined` when arguments are missing:

```js
function greet(name = "Guest") {
  console.log("Hello, " + name + "!");
}

greet();       // Hello, Guest!
greet("Eve");  // Hello, Eve!
```

## 8. Anonymous Functions

- Functions without a name are called anonymous functions.
- Commonly used as arguments or assigned to variables:

```js
setTimeout(function() {
  console.log("Executed after 1 second");
}, 1000);

const multiply = function(a, b) {
  return a * b;
};
```

## 9. Pure vs Impure Functions

**Pure functions:**

- No side effects (don’t change external state).
- Always return the same output for the same input.

**Impure functions:**

- May modify external variables, cause side effects, or produce different outputs for the same inputs.

```js
// Pure function
function add(a, b) {
  return a + b;
}

// Impure function
let count = 0;
function increment() {
  count++;
}
```

## 10. Asynchronous Functions

Functions can be asynchronous using:

- **Callbacks:**

```js
setTimeout(() => {
  console.log("Async callback");
}, 1000);

** Promises:

fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data));


** async/await:

async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
}
fetchData();
```

# ARRAY

## 1. What is an Array?

- An array is an ordered collection of elements.
- Elements can be any type: numbers, strings, objects, other arrays, functions, etc.
- Arrays are **zero-indexed** (first element is at index `0`).
- Arrays in JavaScript are **dynamic** (they can grow or shrink in size).

```js
let arr = [1, 'hello', true, { name: 'John' }, [1, 2, 3]];
```

## 2. Creating Arrays

You can create arrays in multiple ways:

```js
let arr1 = [];           // Empty array
let arr2 = [1, 2, 3];    // Array with elements
let arr3 = new Array(5); // Creates an array with length 5 (empty slots)
```

## 3. Destructuring Arrays

```js
let [a, b, ...rest] = [10, 20, 30, 40];
console.log(a, b);  // 10 20
console.log(rest);  // [30, 40]
```

## 4. Important Array Concepts

- **Mutability**:  
  Methods like `push`, `pop`, `splice`, `sort`, and `reverse` **mutate** the original array.

- **Immutability**:  
  Methods like `slice`, `map`, `filter`, and `concat` return **new arrays** without modifying the original.

- **Sparse Arrays**:  
  Arrays can have “holes” — missing or undefined elements at certain indexes.

- **Performance**:  
  Avoid heavy use of `splice` on large arrays; prefer non-mutating methods for better performance and predictability.

- **Equality**:  
  Arrays are objects. Use deep comparison or `JSON.stringify()` to compare contents:

```js
const a = [1, 2];
const b = [1, 2];

console.log(a === b); // false (different references)
console.log(JSON.stringify(a) === JSON.stringify(b)); // true
```

## 5. Iteration Methods

JavaScript provides several built-in methods to iterate over arrays:

| Method               | Description                                     | Example |
|----------------------|-------------------------------------------------|---------|
| `forEach(callback)`  | Executes callback for each element              | `arr.forEach(el => console.log(el));` |
| `map(callback)`      | Returns new array of transformed elements       | `let doubled = arr.map(x => x * 2);` |
| `filter(callback)`   | Returns new array with elements that pass test  | `let evens = arr.filter(x => x % 2 === 0);` |
| `reduce(callback, initialValue)` | Accumulate values into single value          | `let sum = arr.reduce((acc, x) => acc + x, 0);` |
| `some(callback)`     | Returns `true` if any element passes test       | `arr.some(x => x > 10);` |
| `every(callback)`    | Returns `true` if all elements pass test        | `arr.every(x => x > 0);` |
| `find(callback)`     | Returns first element that passes test          | `arr.find(x => x > 5);` |
| `findIndex(callback)`| Returns index of first element that passes test | `arr.findIndex(x => x === 3);` |



## 6. Common Array Methods

Frequently used array methods in JavaScript:

| Method                              | Description                                          | Example                          |
|-------------------------------------|------------------------------------------------------|----------------------------------|
| `push(...items)`                   | Add items to the **end** of the array                | `arr.push(4);`                   |
| `pop()`                            | Remove and return the **last** element               | `let last = arr.pop();`          |
| `unshift(...items)`               | Add items to the **start** of the array              | `arr.unshift(0);`                |
| `shift()`                          | Remove and return the **first** element              | `let first = arr.shift();`       |
| `slice(start, end)`               | Return a shallow copy from `start` to `end` (not inclusive) | `arr.slice(1, 3);`        |
| `splice(start, deleteCount, ...items)` | Add/remove items in place                      | `arr.splice(2, 1, 'a', 'b');`    |
| `indexOf(value)`                  | Return first index of value or `-1` if not found     | `arr.indexOf(2);`                |
| `includes(value)`                 | Check if value exists in the array                   | `arr.includes(3);`               |
| `join(separator)`                 | Join elements into a string                          | `arr.join(', ');`                |
| `concat(...arrays)`              | Merge arrays, returns a **new** array                | `arr.concat([4, 5]);`            |
| `reverse()`                       | Reverse the array **in place**                       | `arr.reverse();`                 |
| `sort()`                          | Sort the array (lexicographically by default)        | `arr.sort();`                    |6


==============================================================================================================================================================================

# What is an Object in JavaScript?

- In JavaScript, an **object** is a collection of key-value pairs (also called properties). It's one of the core building blocks of the language.

```js
const person = {
  name: "Alice",
  age: 30,
  isStudent: false
};
```

### 1. Object Literal (Most Common)

```js
const car = {
  brand: "Toyota",
  year: 2021
};
```

### 2. Using new Object()
```JS
    const car = new Object();
    car.brand = "Toyota";
```

### 3. Constructor Function
```JS
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const john = new Person("John", 25);
```

### 4. Object.create()
```JS
const proto = { greet() { console.log("Hello"); } };
const obj = Object.create(proto);
```

### 2. 🔑 Accessing & Modifying Properties

1. Dot Notation
```JS
console.log(person.name); // Alice
person.age = 31;
```

2. Bracket Notation (for dynamic keys or invalid identifiers)
```JS
console.log(person["age"]);
person["isStudent"] = true;
```

3. Adding & Deleting Properties
```JS
person.height = 170;       // Add
delete person.isStudent;   // Delete
```

4. Iterating Over Object Properties

for...in loop
```JS
for (let key in person) {
  console.log(key, person[key]);
}

Object.keys(), Object.values(), Object.entries()

Object.keys(person);     // ['name', 'age']
Object.values(person);   // ['Alice', 30]
Object.entries(person);  // [['name', 'Alice'], ['age', 30]]
```
5. 🧱 Nested Objects
```JS
const user = {
  name: "Bob",
  address: {
    city: "Paris",
    zip: "75000"
  }
};
console.log(user.address.city); // Paris
```

6. Object Methods

Objects can contain functions (methods):
```JS
const dog = {
  name: "Rex",
  bark() {
    console.log(`${this.name} says woof!`);
  }
};
dog.bark(); // Rex says woof!
```

## Built-in Object Methods

| Method                      | Description                        |
|-----------------------------|----------------------------------|
| `Object.keys(obj)`           | Returns an array of keys          |
| `Object.values(obj)`         | Returns an array of values        |
| `Object.entries(obj)`        | Returns an array of `[key, value]` pairs |
| `Object.assign(target, source)` | Copies properties from source to target |
| `Object.freeze(obj)`         | Makes object immutable            |
| `Object.seal(obj)`           | Prevents adding/removing properties |
| `Object.hasOwn(obj, key)`    | Checks if object has the property |


## Spread Operator and Object Rest

- **Spread (copying properties):**

```js
const newPerson = { ...person, age: 35 };
```

- **Rest (excluding properties):**
```JS
const { age, ...rest } = person;
```

- **Object Destructuring:**
```JS
const { name, age } = person;
console.log(name); // Alice
```

## Object Comparison

Objects are compared by **reference**, not by value:

```js
const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false (different references)
```

## Cloning Objects

- **Shallow Copy:**

```js
const copy = { ...a };
```

- **Deep Copy (basic way):**
```js
const deepCopy = JSON.parse(JSON.stringify(a));
```

## Prototypes and Inheritance

- Every object in JavaScript has a **prototype**.
- Prototypes allow objects to inherit properties and methods from other objects.

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
};

const dog = new Animal("Rex");
dog.speak(); // Rex makes a noise.
```

## Getters & Setters

Getters and setters allow you to define methods that behave like properties.

```js
const user = {
  firstName: "John",
  lastName: "Doe",
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
};

console.log(user.fullName); // John Doe

user.fullName = "Alice Smith";
console.log(user.firstName); // Alice
console.log(user.lastName);  // Smith
```

## Immutable Objects

Use `Object.freeze()` to make an object immutable — meaning its properties cannot be changed, added, or removed.

```js
const frozen = Object.freeze({ a: 1 });

frozen.a = 2; // No effect
console.log(frozen.a); // 1

## Advanced: Optional Chaining & Nullish Coalescing

- **Optional Chaining (`?.`)**: Safely access deeply nested properties without throwing an error if something is `undefined` or `null`.


const person = { address: { city: "NYC" } };
console.log(person?.address?.city); // "NYC"
console.log(person?.contact?.email); // undefined (no error)
```

```js

- **Nullish Coalescing (??): Provides a default value only if the left-hand side is null or undefined (not 0, false, or "").

const val = person.age ?? 25; // 25 if person.age is null or undefined
```


# Why Are Object and Array Comparisons Done by Reference, Not Value in JavaScript?

- Because objects (and arrays) can be complex, mutable structures with potentially infinite depth and circular references, and comparing them by value would be slow, unpredictable, and expensive.

- Because objects and arrays are stored in memory, and when you use them, you're just pointing to their location, not copying their content.

- Why not compare by value?
    Because:
    Objects can be big or nested.
    Comparing all properties would be slow.
    It’s simpler and faster to check:
    👉 “Do they point to the same object?”

- JavaScript compares objects and arrays by reference because they are complex and it's faster and safer to check if they're the same object, not if they just look the same.


# Object References, Shallow Copy vs Deep Copy (In Practice)

### 1. Object References

When you assign or pass an object, you’re copying its reference, not the actual object.

```js
let obj1 = { a: 1 };
let obj2 = obj1;  // obj2 points to the *same* object as obj1

obj2.a = 99;
console.log(obj1.a);  // 99 — changed because both point to the same object

❗ This is not a real copy — copy and original refer to the same object in memory.

- Key Point: Modifying obj2 changes obj1 because they reference the same object in memory.
```

### 2. Shallow Copy

A **shallow copy** creates a new object but copies only the first-level properties.  
If properties are objects themselves, their **references are copied**, not the actual nested objects.

**Common ways to make shallow copies:**

```js
let original = { a: 1, b: { c: 2 } };

// Using Object.assign()
let shallow1 = Object.assign({}, original);

// Using spread operator
let shallow2 = { ...original };

shallow1.b.c = 99;
console.log(original.b.c);  // 99 — nested object is shared!

shallow2.a = 42;
console.log(original.a);    // 1 — primitive property is copied separately

✅ Changing top-level values is safe
❌ Changing nested values affects the original
```

### 3. Deep Copy

A **deep copy** creates a completely independent clone, including all nested objects and arrays.  
Changes in the copy do **not** affect the original.

**Simple way** (only works if no functions, `undefined`, symbols, or circular references):

```js
let deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.b.c = 100;
console.log(original.b.c);  // 99 — unchanged, because deepCopy has its own nested objects

✅ Deep copy creates a completely new object, with its own nested values
🔥 Changes to the copy do not reflect on the original
```



# 🔁 Standard Loops

### 1. `for` loop – Printing Numbers

Use a `for` loop when you know how many times you want to iterate.

```js
// Print numbers 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### 2. `while` loop – Countdown Timer

Use a `while` loop when the number of iterations depends on a condition.

```js
// Countdown from 5 to 1
let seconds = 5;
while (seconds > 0) {
  console.log(`Countdown: ${seconds}`);
  seconds--;
}
```

### 3. `do...while` loop – Ask for Password at Least Once

The `do...while` loop executes the block **at least once** before checking the condition.

```js
let password;
do {
  password = prompt("Enter password:");
} while (password !== "1234");
```

## 🔁 Looping Through Collections

### 4. `for...of` – Loop Through Shopping Cart

The `for...of` loop iterates over iterable collections like arrays.

```js
const cart = ["apple", "banana", "orange"];

for (let item of cart) {
  console.log(`You bought: ${item}`);
}
```

### 5. `for...in` – Loop Through User Object

The `for...in` loop iterates over the **enumerable keys** of an object.

```js
const user = { name: "Alice", age: 30, city: "Paris" };

for (let key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

### 6. `forEach()` – Send Message to Users

The `forEach()` method executes a provided function once for each array element.

```js
const users = ["Alice", "Bob", "Charlie"];

users.forEach(user => {
  console.log(`Hello, ${user}!`);
});
```

## 🧠 Functional (Array) Loops

### 7. `.map()` – Convert Prices to Include Tax

The `.map()` method creates a new array by transforming each element of the original array.

```js
const prices = [10, 20, 30];
const withTax = prices.map(price => price * 1.1);
console.log(withTax); // [11, 22, 33]
```

### 8. `.filter()` – Filter Adults

The `.filter()` method creates a new array with elements that pass the given test.

```js
const ages = [15, 22, 17, 30];
const adults = ages.filter(age => age >= 18);
console.log(adults); // [22, 30]
```

### 9. `.reduce()` – Calculate Total Bill

The `.reduce()` method accumulates array elements into a single value.

```js
const bills = [10, 15, 25];
const total = bills.reduce((sum, bill) => sum + bill, 0);
console.log(total); // 50
```

### 10. `.some()` – Check If Any Product Is Free

The `.some()` method tests whether **at least one** element in the array passes the provided test.

```js
const prices = [10, 0, 20];
const hasFree = prices.some(price => price === 0);
console.log(hasFree); // true
```

### 11. `.every()` – Check If All Seats Are Booked

The `.every()` method tests whether **all** elements in the array pass the provided test.

```js
const seats = [true, true, true];
const allBooked = seats.every(seat => seat === true);
console.log(allBooked); // true
```

### 12. `.find()` – Find User by Name

The `.find()` method returns the **first** element in the array that satisfies the provided testing function.

```js
const users = [{ name: "Tom" }, { name: "Sara" }];
const user = users.find(u => u.name === "Sara");
console.log(user); // { name: "Sara" }
```

### 13. `.findIndex()` – Find Index of Failed Test

The `.findIndex()` method returns the **index** of the first element that satisfies the provided testing function. Returns `-1` if no match is found.

```js
const scores = [80, 90, 45, 70];
const failedIndex = scores.findIndex(score => score < 50);
console.log(failedIndex); // 2
```

## 🔄 Special/Advanced Loops

### 14. Labeled Loop – Exit Nested Loop Early

Labeled loops let you break or continue outer loops from inside nested loops.

```js
outer: for (let floor = 1; floor <= 3; floor++) {
  for (let room = 1; room <= 3; room++) {
    if (floor === 2 && room === 2) break outer;
    console.log(`Floor ${floor}, Room ${room}`);
  }
}
```

### 15. `for await...of` – Fetch Data from Multiple APIs

The `for await...of` loop allows iterating over async iterables, useful for handling multiple asynchronous operations sequentially.

```js
const urls = [
  "https://api.example.com/user1",
  "https://api.example.com/user2"
];

async function fetchUsers() {
  for await (let url of urls) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  }
}

fetchUsers();
```

## ⚠️ Legacy / Extra

### 16. Looping Through `arguments` (Legacy)

The `arguments` object is an array-like object available in regular functions that holds all passed arguments.

```js
function logAll() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

logAll("apple", "banana", "cherry");
```

### Object.keys() + forEach() — Loop Through Keys

You can use `Object.keys()` to get an array of an object's keys, then loop through them with `forEach()`:

```js
Object.keys(person).forEach(key => {
  console.log(key, person[key]);
});
```

### Object.values() — Loop Through Values

You can use `Object.values()` to get an array of an object's values, then loop through them with `forEach()`:

```js
Object.values(person).forEach(value => {
  console.log(value);
});
```

### Object.entries() — Loop Through Key-Value Pairs

You can use `Object.entries()` to get an array of `[key, value]` pairs from an object, then loop through them with `forEach()`:

```js
Object.entries(person).forEach(([key, value]) => {
  console.log(key, value);
});
```

### `for...of` with `Object.entries()` — More Modern

Using `for...of` with `Object.entries()` provides a clean way to iterate over an object’s key-value pairs:

```js
for (let [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
```

============================================================================================================================================

# Scope, Scope Chain, and Lexical Scoping in JavaScript

## 1. What is Scope?

Scope defines where variables and functions are accessible in your code.

It determines the visibility and lifetime of variables.

JavaScript has two main types of scope:

- **Global Scope:** Variables declared outside any function or block. Accessible anywhere.
- **Local Scope:** Variables declared inside a function (function scope) or block (block scope with `let`/`const`).

## 2. Types of Scope in JavaScript

| Scope Type      | Description                           | Example                          |
|-----------------|-----------------------------------|---------------------------------|
| Global Scope    | Variables available anywhere in the code | `var x = 10;` accessible anywhere |
| Function Scope  | Variables accessible inside a function | `function foo() { var y = 20; }` y only inside `foo` |
| Block Scope     | Variables accessible inside a block `{}` | `if (true) { let z = 30; }` z only inside block |

## 3. What is the Scope Chain?

When JavaScript looks up a variable, it starts from the current scope and moves outwards to parent scopes until it finds the variable or reaches the global scope.

This chain of scopes linked together is called the **scope chain**.

It allows nested functions to access variables from their outer scopes.

## How Scope Chain Works — Example

```javascript
const a = 1;  // Global scope

function outer() {
  const b = 2; // outer function scope

  function inner() {
    const c = 3;  // inner function scope
    console.log(a, b, c);
  }

  inner();
}

outer();  // Logs: 1 2 3
```

## 4. What is Lexical Scoping?

Lexical Scoping means the scope of a variable is determined by its location in the source code (the "lexical" structure).

The scope chain is fixed at the time of writing the code, not at runtime.

Functions remember the scope in which they were defined, not where they were called.

## Lexical Scoping Example

```javascript
const x = 10;

function foo() {
  console.log(x);  // Looks for x in lexical environment where foo was defined
}

function bar() {
  const x = 20;
  foo();  // Even though bar has its own x, foo uses global x = 10
}

bar();  // Logs 10, not 20
```
============================================================================================================================================

# Variable Environment, Hoisting, and Temporal Dead Zone (TDZ)

### 1. Variable Environment

The **Variable Environment** is the part of the execution context where all variables, functions, and parameters are stored and managed.

- It keeps track of all variable bindings (names and values).
- It supports **hoisting**, meaning declarations are processed before code execution.

### 2. Hoisting

Hoisting is JavaScript’s default behavior of moving **declarations** (not initializations) to the top of their containing scope during the compilation phase.

- Variables declared with `var` are hoisted and initialized with `undefined`.
- Function declarations are hoisted completely (both name and body).
- Variables declared with `let` and `const` are hoisted but **not initialized**.

Example:

```javascript
console.log(a); // undefined (due to var hoisting)
var a = 10;

foo(); // "Hello" (function declaration hoisted)

function foo() {
  console.log("Hello");
}

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

### 3. Temporal Dead Zone (TDZ)

The **Temporal Dead Zone** (TDZ) is the time between entering a scope and the point where a `let` or `const` variable is declared.

- During the TDZ, accessing the variable results in a **ReferenceError**.
- This behavior prevents using variables before their declaration, unlike `var`.

#### Example:

```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;
```

============================================================================================================================================


# The `this` Keyword in JavaScript

### 1. What is `this`?

`this` is a special keyword that refers to the **context object** in which the current code is executing.

It allows functions and methods to access the object that owns or calls them.

`this` is not static — its value is determined at runtime, based on how a function is called, not where it's defined.

It can be different even inside the same function, depending on the call context.

### We use this so that our code is reusable, flexible, and works even when we don’t know the object’s name ahead of time.

```js
Imagine This Scenario
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

user.greet(); // Hi, I'm Alice


Now imagine you wrote:

const user = {
  name: 'Alice',
  greet() {
    console.log(`Hi, I'm ${user.name}`); //  hardcoded "user"
  }
};

const anotherUser = user;
anotherUser.name = 'Bob';
anotherUser.greet(); // Hi, I'm Alice WRONG

**NOTE** Because inside the method, you’re hardcoding user.name. Even if the object is copied or used under a different name, it still points to user.
```


### Why this is better 

- When you use this, the method doesn't care what the object is called — it just uses the object that called it:
```js
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

const anotherUser = user;
anotherUser.name = 'Bob';
anotherUser.greet(); // ✅ Hi, I'm Bob

- Now this refers to anotherUser when greet() is called from anotherUser.
```

### Real Benefit: Reusability

- Using this allows the same function to work for any object:
```js
function greet() {
  console.log(`Hello, I'm ${this.name}`);
}

const user1 = { name: 'Alice', greet };
const user2 = { name: 'Bob', greet };

user1.greet(); // Hello, I'm Alice
user2.greet(); // Hello, I'm Bob

If you had hardcoded user1.name, this wouldn't work for user2.
```


> The value of `this` **varies depending on how a function is called**, not where it’s defined.


## 2. How is `this` Determined? (Main Rules)

| Call Type                         | `this` refers to                                         | Example                                         |
|-----------------------------------|---------------------------------------------------------|-------------------------------------------------|
| **Global Context**                | Global object (`window` in browsers, `global` in Node)  | `console.log(this);` → `window`                  |
| **Function Context (non-strict)** | Global object (`window` or `global`)                      | `function foo() { console.log(this); } foo();` → `window`  |
| **Function Context (strict mode)** | `undefined`                                             | `"use strict"; function foo() { console.log(this); } foo();` → `undefined`  |
| **Method Call**                    | The object before the dot (owner object)                 | `obj.method()` → `this` is `obj`                  |
| **Constructor Call (with `new`)** | The newly created object                                   | `new Person()` → `this` is new instance           |
| **Explicit Binding**               | Set by `.call()`, `.apply()`, or `.bind()`               | `fn.call(obj)` → `this` is `obj`                   |
| **Arrow Functions**               | Lexically inherited from the surrounding scope           | `const arrow = () => console.log(this);`           |


### 3. Examples for Each Case

**Global Context**

```js
console.log(this); // window (in browser)
```

### Function Call (Non-strict mode)

```js
function foo() {
  console.log(this);
}
foo();  // window (browser)
```

### Function Call (Strict mode)

```js
"use strict";
function foo() {
  console.log(this);
}
foo();  // undefined
```

### Method Call

```js
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};
obj.greet();  // "Alice"
```

### Constructor Function

```js
function Person(name) {
  this.name = name;
}
const p = new Person("Bob");
console.log(p.name);  // "Bob"
```

### Explicit Binding

```js
function sayHello() {
  console.log(this.name);
}
const user = { name: "Charlie" };
sayHello.call(user); // "Charlie"
```

### Arrow Functions

```js
const obj = {
  name: "Dave",
  greet: () => {
    console.log(this.name);
  }
};
obj.greet();  // undefined (arrow does NOT have its own this)
```
### 4. this in Event Handlers

In event listeners attached via `.addEventListener`, `this` refers to the element receiving the event.

```js
button.addEventListener("click", function () {
  console.log(this); // button element
});
```


# Destructuring in JavaScript

- Destructuring lets you unpack values from arrays or extract properties from objects into individual variables.

---

## 1. Object Destructuring

✅ **Basic Example:**

```js
const user = {
  name: "Alice",
  age: 25,
  city: "New York"
};

const { name, age } = user;

console.log(name); // "Alice"
console.log(age);  // 25
```

#### ✅ Rename Variables:

You can rename the extracted variables using the `key: newName` syntax.

```js
const user = {
  name: "Alice",
  age: 25,
  city: "New York"
};

const { name: userName, city: userCity } = user;

console.log(userName); // "Alice"
console.log(userCity); // "New York"
```

#### ✅ Default Values:

You can assign default values to properties that might be `undefined` or missing.

```js
const user = {
  name: "Alice",
  age: 25,
  city: "New York"
};

const { email = "Not Provided" } = user;

console.log(email); // "Not Provided"
```

#### ✅ Nested Destructuring:

You can destructure nested objects directly to access inner properties.

```js
const employee = {
  id: 101,
  profile: {
    name: "John",
    department: "Engineering"
  }
};

const {
  profile: { name, department }
} = employee;

console.log(name);       // "John"
console.log(department); // "Engineering"
```


## 2. Array Destructuring

✅ **Basic Example:**

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;

console.log(first);  // "red"
console.log(second); // "green"
```

#### ✅ Skipping Items:

You can skip elements by leaving blanks between commas.

```js
const colors = ["red", "green", "blue"];

const [ , , third ] = colors;

console.log(third); // "blue"
```

#### ✅ Default Values:

You can assign default values to array elements when they are missing or `undefined`.

```js
const [a = 1, b = 2, c = 3] = [10];

console.log(a); // 10
console.log(b); // 2 (default)
console.log(c); // 3 (default)
```

### Swapping Variables

You can swap values easily with array destructuring.

```js
let x = 1;
let y = 2;

[x, y] = [y, x];

console.log(x); // 2
console.log(y); // 1
```

### Combined Destructuring (Objects in Arrays)

You can destructure objects inside arrays directly.

```js
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

const [{ name: firstName }, { age: secondAge }] = users;

console.log(firstName); // "Alice"
console.log(secondAge); // 30
```


# Spread, Rest, and Parameters in JavaScript

### 1. Spread Operator (...)

**What?**  
It expands an iterable (like an array or object) into individual elements.

**Where?**  
Used in arrays, objects, and function calls.

---

🔹 **Examples:**

**Arrays**

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]
```

🔹 **Objects**

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  // { a:1, b:2, c:3 }

console.log(...Object.values(obj2))
console.log(...Object.keys(obj2))
```
 
🔹 **Function Calls**

```js
const nums = [1, 2, 3];
Math.max(...nums);  // same as Math.max(1, 2, 3)
```


### 2. Rest Operator (...)

**What?**  
It collects multiple elements into a single array or object.

**Where?**  
Used in function parameters or destructuring assignments.

---

🔹 **Examples:**

**Function Parameters**

```js
function sum(...numbers) {
  return numbers.reduce((acc, val) => acc + val, 0);
}

sum(1, 2, 3);  // 6
```

#### Rest in Array Destructuring

```js
const [first, ...rest] = [10, 20, 30, 40];

console.log(first); // 10
console.log(rest);  // [20, 30, 40]
```

#### Rest in Object Destructuring

```js
const { a, ...others } = { a: 1, b: 2, c: 3 };

console.log(a);      // 1
console.log(others); // { b: 2, c: 3 }
```

### 3. Parameters in Functions

**Types:**

- **Regular parameters:** fixed number of arguments
- **Rest parameters:** variable number of arguments collected into an array

**Example:**

```js
function greet(greeting, name) {
  console.log(`${greeting}, ${name}!`);
}

greet("Hello", "Alice");  // Hello, Alice!

With Rest Parameters:

function greetAll(greeting, ...names) {
  names.forEach(name => console.log(`${greeting}, ${name}!`));
}

greetAll("Hi", "Alice", "Bob", "Charlie");
// Hi, Alice!
// Hi, Bob!
// Hi, Charlie!

```

# Short Circuit, Nullish Coalescing & Logical Assignment Operators

### 1. Short Circuiting (`||` and `&&`)

**How it works:**

- `||` (OR): Returns the first truthy value or the last value if none are truthy.
- `&&` (AND): Returns the first falsy value or the last value if none are falsy.

**Examples:**

```js
const a = null || "default";    // "default" (null is falsy)
const b = "Hello" || "default"; // "Hello" (first truthy)

const c = 0 && "yes";           // 0 (first falsy)
const d = "Hi" && "there";      // "there" (both truthy, returns last)
```

### 2. Nullish Coalescing (`??`)

- The nullish coalescing operator (??) in JavaScript is used to provide a fallback value only when the left-hand side is either null or undefined.

- Like `||` but only treats `null` and `undefined` as “nullish.”
- Useful when `0`, `false`, or `""` are valid values and you don’t want them replaced.

**Example:**

```js
const count = 0;
const value = count ?? 10;      // 0 (0 is NOT nullish, so kept)
const name = null ?? "Guest";   // "Guest" (nullish, so fallback used)
```


# Sets and Maps in JavaScript

### 1. Set

- A **Set** is a collection of unique values (no duplicates).
- Values can be of any type: primitives or objects.
- Order of insertion is preserved.
- Useful when you want to store unique items.

**Create a Set:**

```js
const mySet = new Set([1, 2, 3, 3, 4]);
console.log(mySet); // Set {1, 2, 3, 4} — duplicates removed
```

| Method           | Description             | Example               |

| ---------------- | ----------------------- | --------------------- |
| `.add(value)`    | Add a value to the set  | `mySet.add(5)`        |
| `.has(value)`    | Check if value exists   | `mySet.has(3)` → true |
| `.delete(value)` | Remove a value          | `mySet.delete(2)`     |
| `.size`          | Number of unique values | `mySet.size`          |
| `.clear()`       | Remove all values       | `mySet.clear()`       |


### 2. Map

- A **Map** is a collection of key-value pairs.
- Keys can be any type (objects, functions, primitives).
- Maintains insertion order.
- Useful when you need a dictionary-like structure with flexible key types.

**Create a Map:**

```js
const myMap = new Map();

myMap.set('name', 'Alice');
myMap.set(1, 'one');
myMap.set({}, 'empty object');

console.log(myMap.get('name')); // "Alice"
```

| Method             | Description                        | Example                   |
| ---------------- --| ------------------------- ---------| --------------------------|
| `.set(key, value)` | Add or update a key-value pair     | `myMap.set('age', 25)`    |
| `.get(key)`        | Get value by key                   | `myMap.get('age')` → 25   |
| `.has(key)`        | Check if key exists                | `myMap.has(1)` → true     |
| `.delete(key)`     | Remove key-value pair              | `myMap.delete('name')`    |
| `.size`            | Number of entries                  | `myMap.size`              |
| `.clear()`         | Remove all entries                 | `myMap.clear()`           |



# Working with Strings in JavaScript

### 1. Creating Strings

```js
let str1 = "Hello";
let str2 = 'World';
let str3 = `Hello World`; // Template literals
```

### 2. String Length

```js
console.log(str1.length); // 5
```

### 3. Access Characters

```js
console.log(str1[0]);      // "H"
console.log(str1.charAt(1)); // "e"
```

### 4. Common String Methods

| Method                            | Description                                           | Example                        | Result            |
| --------------------------------- | ----------------------------------------------------- | ------------------------------ | ----------------- |
| `toUpperCase()`                   | Converts to uppercase                                 | `"hello".toUpperCase()`        | `"HELLO"`         |
| `toLowerCase()`                   | Converts to lowercase                                 | `"HELLO".toLowerCase()`        | `"hello"`         |
| `includes()`                      | Checks if string contains substring                   | `"hello".includes("ll")`       | `true`            |
| `indexOf()`                       | Finds first index of substring                        | `"hello".indexOf("l")`         | `2`               |
| `lastIndexOf()`                   | Finds last index of substring                         | `"hello".lastIndexOf("l")`     | `3`               |
| `slice(start, end)`               | Extracts substring                                    | `"hello".slice(1, 4)`          | `"ell"`           |
| `substring(start, end)`           | Similar to slice, but doesn't accept negative indices | `"hello".substring(1, 4)`      | `"ell"`           |
| `split(separator)`                | Splits string into array                              | `"a,b,c".split(",")`           | `["a", "b", "c"]` |
| `trim()`                          | Removes whitespace from both ends                     | `"  hello  ".trim()`           | `"hello"`         |
| `replace(search, replaceWith)`    | Replaces first match                                  | `"hello".replace("l", "L")`    | `"heLlo"`         |
| `replaceAll(search, replaceWith)` | Replaces all matches                                  | `"hello".replaceAll("l", "L")` | `"heLLo"`         |


### 5. Template Literals

Use backticks `` ` `` to embed expressions easily using `${...}` syntax.

```js
const name = "Alice";
const greeting = `Hello, ${name}!`;  

console.log(greeting); // "Hello, Alice!"
```

### 6. Multiline Strings

Template literals allow for easy multiline strings using backticks:

```js
const multiLine = `This is line 1
This is line 2
This is line 3`;

console.log(multiLine);
/*
This is line 1
This is line 2
This is line 3
*/
```

### 7. String Comparison

- Strings in JavaScript are compared **lexicographically** (i.e., dictionary order, based on Unicode values).

```js
console.log("apple" < "banana"); // true
console.log("2" > "12");         // true (because "2" comes after "1" in Unicode)
```

### 8. Useful String Checks

Use `.startsWith()` and `.endsWith()` to check the beginning or end of a string.

```js
console.log("hello".startsWith("he"));  // true
console.log("hello".endsWith("lo"));    // true
```

### 9. Converting Other Types to Strings

You can convert numbers, booleans, or other types to strings using `String()` or `.toString()`.

```js
String(123);        // "123"
(123).toString();   // "123"
```


# Closer Look at Functions

## 1. First-Class Functions

💡 **Definition:**  
In JavaScript, functions are **first-class citizens**, meaning they can be:

- Stored in variables
- Passed as arguments to other functions
- Returned from functions
- Assigned to object properties

---

🧪 **Examples:**

```js
// ✅ Store function in a variable
const greet = function() {
  console.log("Hello!");
};

// ✅ Pass function as an argument
function callTwice(fn) {
  fn();
  fn();
}
callTwice(greet);  // Hello! Hello!

// ✅ Return function from another function
function createMultiplier(x) {
  return function(y) {
    return x * y;
  };
}

const double = createMultiplier(2);
console.log(double(5));  // 10

This flexibility proves that functions are values — just like numbers or strings.
```

## 2. Higher-Order Functions

💡 **Definition:**  
A higher-order function is a function that:

- Takes one or more functions as arguments  
**OR**  
- Returns a function

---

🧪 **Examples:**

### A. Takes function as argument:

```js
function transform(array, fn) {
  return array.map(fn);
}

const nums = [1, 2, 3];
const squares = transform(nums, x => x * x);

console.log(squares); // [1, 4, 9]
```

### B. Returns another function:

```js
function greeter(greeting) {
  return function(name) {
    console.log(`${greeting}, ${name}`);
  };
}

const sayHi = greeter("Hi");
sayHi("Alice"); // "Hi, Alice"
```

| Concept                   | Description                                  | Example                             |
| ------------------------- | -------------------------------------------- | ----------------------------------- |
| **First-Class Function**  | Functions are treated like any value         | Assign, pass, return functions      |
| **Higher-Order Function** | Function that takes/returns another function | `map`, `filter`, `reduce`, `setTimeout`, etc. |



# Detailed Guide: call(), apply(), and bind() in JavaScript

## 1. `call()`

### What is it?

- Invokes a function immediately, specifying the `this` value.
- Passes arguments **individually**.

### Why use it?

- To explicitly set what `this` refers to inside a function.
- Useful when borrowing methods from other objects.
- Useful when you want to invoke a function with a different context.

### Behavior:

- `thisArg`: the object to bind as `this` inside the function.
- If `thisArg` is `null` or `undefined`:
  - In **non-strict mode**, defaults to the global object (`window` in browsers).
  - In **strict mode**, remains `null` or `undefined`.
- Arguments are passed one by one.

---

🧪 **Example:**

```js
const person1 = {
  name: "Alice",
  greet: function(greeting) {
    console.log(`${greeting}, ${this.name}`);
  }
};

const person2 = { name: "Bob" };

// Borrow greet method from person1 for person2
person1.greet.call(person2, "Hello");  // Hello, Bob
```

## 2. `apply()`

### What is it?

- Similar to `call()`, but arguments are passed as an **array** or array-like object.
- Invokes the function immediately with the given `this` value.

### Why use it?

- When you have arguments in an array or don’t know the number of arguments beforehand.
- Useful for spreading arguments dynamically before ES6 spread operator (`...`).

---

🧪 **Example:**

```js
1. function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];

console.log(sum.apply(null, numbers)); // 6

2. const nums = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, nums);
console.log(max);  // 7
```

## 3. `bind()`

### What is it?

- Returns a **new function** with the specified `this` value and optional preset arguments.
- **Does not invoke immediately** — you call the returned function later.

### Why use it?

- To create a new function with fixed `this` value (e.g., for callbacks, event handlers).
- To preset some arguments (partial application).
- To avoid losing `this` context when passing methods as callbacks.

---

🧪 **Example — fixing `this`:**

```js
const person = {
  name: "Alice",
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};

const greetFunc = person.greet;
greetFunc();  // undefined or error, `this` lost

const boundGreet = person.greet.bind(person);
boundGreet(); // Hello, Alice
```


# IIFE (Immediately Invoked Function Expression)

## What is an IIFE?

An **IIFE** (Immediately Invoked Function Expression) is a JavaScript function that runs **immediately after it’s defined**.

- It’s an **anonymous function** wrapped in parentheses to treat it as an expression.
- Followed immediately by `()` to invoke it right away.

### Why use IIFE?

- To create a **new scope** and avoid polluting the global namespace.
- To **execute code immediately** while keeping variables private.
- Commonly used **before `let`/`const` existed** to simulate block scope.
- Useful for **module patterns** and avoiding conflicts in code.

```js
(function() {
  // Code here runs immediately
  console.log("IIFE running!");
})();

```



# JavaScript Closures: In-Depth Guide

## What is a Closure?

A **closure** is created when a function **“remembers”** the variables from its **lexical scope** even when that function is executed outside that scope.

In other words, a closure gives you access to an outer function’s variables from an inner function, **even after the outer function has finished executing**.

## Simple Explanation

Imagine:

- You have a function inside another function.
- The inner function uses variables from the outer function.
- When you call the inner function later, it still **“remembers”** those variables.

## Why are Closures Important?

- They enable **data privacy** (encapsulation).
- Allow **function factories** (functions that generate other functions).
- They’re the foundation of many advanced JavaScript patterns.

```js
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const counter = outer();

counter(); // 1
counter(); // 2
counter(); // 3
```

## How Closures Work — Behind the Scenes

- When a function is created, it keeps a **reference to its lexical environment** (the scope where it was declared).
- The lexical environment contains any local variables in scope at the time of function creation.
- Even after the outer function returns, the inner function retains access to this environment.
- This allows variables to live beyond their usual lifetime.

## Closures — Key Points to Remember

- **Definition:**  
  A closure is a function that remembers and accesses variables from its outer (enclosing) lexical scope, even after the outer function has finished executing.

- **Functions + Scope:**  
  Closures combine a function and its lexical environment (variables in scope when the function was created).

- **Access to Outer Variables:**  
  Inner functions can access and manipulate variables declared in their outer functions.

- **Variables Are Captured by Reference:**  
  Closures hold references to outer variables, not copies — so changes to those variables affect the closure.

- **Used for Data Privacy:**  
  Closures allow creating private variables that can't be accessed directly from outside, only via privileged methods.

- **Common Use Cases:**  
  - Function factories  
  - Event handlers and callbacks  
  - Module pattern for encapsulation  
  - Memoization and caching  

- **Closures Keep Variables Alive:**  
  Variables referenced inside closures persist in memory even after the outer function has returned.

- **Can Cause Memory Leaks:**  
  Holding onto large scopes unnecessarily inside closures may increase memory usage.

- **Closures Are Created Every Time a Function is Created:**  
  Each time a function is defined inside another, a new closure with its own scope is formed.

- **Closures Work with Both Function Declarations and Expressions:**  
  Anywhere you have a nested function, a closure can form.

- **Closures Are Different From Scope Chain:**  
  The scope chain defines variable resolution; closures are the preserved environment when functions outlive their scope.

- **Closures Are Fundamental to JavaScript:**  
  Many core features and design patterns in JS rely on closures.

# 
















































































































