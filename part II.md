# Numbers, Dates And Timers in JavaScript

## Converting and Checking Numbers 

- JavaScript provides several ways to convert and check numbers. These methods are essential when handling user input or performing arithmetic operations.

**Number()**

- The Number() function is used to convert a value to a number. This can be applied to strings, booleans, arrays, etc.

```js
Number("123");  // 123
Number("123.45");  // 123.45
Number("abc");  // NaN
Number(true);  // 1
Number(false);  // 0
```

**`parseInt()` vs `parseFloat()`**

- **parseInt()** converts a string to an integer, parsing it until it hits a non-digit character.

- **parseFloat()** converts a string to a floating-point number.

### Syntax:
```javascript
parseInt(string, radix);
```

```js
parseInt("123px");  // 123
parseInt("1011", 2);  // 11 (binary to decimal)
```

**isNaN()**

- isNaN() checks whether a value is NaN (Not-a-Number). It can be used to validate input and prevent errors during computations.

```js
isNaN("hello");  // true
isNaN(123);  // false
```

**Number.isNaN()**

- Number.isNaN() is more strict than isNaN(), as it checks if the value is exactly NaN, not if it is coercible to a number.

```js
Number.isNaN(NaN);  // true
Number.isNaN("123");  // false
```


## Math And Rounding

### Basic Math Operations

```js
Math.abs(-5);  // 5
Math.pow(2, 3);  // 8
Math.sqrt(16);  // 4
Math.random();  // Random number between 0 and 1
```

### Rounding Methods

- Math.round() rounds to the nearest integer.
- Math.floor() rounds down (toward negative infinity).
- Math.ceil() rounds up (toward positive infinity).
- Math.trunc() removes the decimal part.

```js
Math.round(2.5);  // 3
Math.floor(2.5);  // 2
Math.ceil(2.1);  // 3
Math.trunc(2.5);  // 2
```

### Rounding TO Specific Decimal Places

```js
let num = 3.14159;

console.log(num.toFixed(2)); // "3.14"
console.log(num.toFixed(0)); // "3"
console.log(num.toFixed(4)); // "3.1416"
```


## Working With BigInt

- A BigInt is a built-in object in JavaScript that allows you to represent numbers larger than Number.MAX_SAFE_INTEGER (2^53 - 1).

### Why do we need BigInt?

```js                      
Number.MAX_SAFE_INTEGER === 9007199254740991 // 2^53 - 1
```

```js
let a = 123n;
let b = 456n;
let sum = a + b;  // 579n
```

```js
let a = 123n;
let b = 456;  // Number
let sum = a + BigInt(b);  // Convert b to BigInt
```

- This is the largest integer that can be safely represented using the regular Number type (which is based on IEEE-754 double-precision floating-point format).

- It has only 16 digits, If you try to go above this, you may lose precision.


### Why we Cant go above that limit

#### How numbers are stored in JavaScript

- All numbers in JavaScript (except BigInt) are stored as 64-bit floating point numbers, based on the IEEE 754 standard.

- The IEEE 754 standard is a widely adopted standard for floating-point arithmetic used in computers and programming languages.

- It defines how real numbers (i.e., non-integers) are represented and manipulated in binary format.

- In JavaScript, all numbers — whether integers or decimals — are stored using the IEEE 754(standard) double-precision (64-bit) floating-point format.

`Integers like 42 under the hood is floating-point Number`


- JavaScript uses floating-point for all numbers instead of separate integer types


#### why all numbers as floating point

- Simplicity of the Language Design
- Wide Range and Flexibility => So with one type, you can handle both whole numbers and fractions without needing multiple numeric types.
- Performance and Hardware Support => 
    - Modern CPUs and JavaScript engines are highly optimized for double-precision floating-point arithmetic.
    - Having a single numeric type allows for efficient memory usage and fast operations.
    - This was especially important when JavaScript was first designed, aiming to be fast and lightweight.


## Creating Dates

### Creating a Date Object

- new Date() creates a Date object with the current date and time.

- new Date(milliseconds) creates a Date object representing the number of milliseconds since the Unix Epoch (January 1, 1970).

- new Date("YYYY-MM-DD") creates a Date object for a specific date.

```js
let currentDate = new Date();  // Current date and time
let specificDate = new Date(2023, 9, 18);  // October 18, 2023 (Note: month is 0-indexed)
let parsedDate = new Date("2023-10-18");  // October 18, 2023
```

### Getting Date Components

```js
let date = new Date();
date.getFullYear();  // 2023
date.getMonth();  // 9 (October, 0-indexed)
date.getDate();  // 18
date.getDay();  // 3 (Wednesday)
date.getHours();  // 12
```

## Operations with Dates

- perform arithmetic operations with Date objects, like adding or subtracting days, or comparing two dates.

### Date Arithmetic

```js
let today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);  // Add one day

let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);  // Subtract one day
```

### Comparing Dates

```js
let date1 = new Date("2023-10-18");
let date2 = new Date("2023-10-19");

if (date1 < date2) {
  console.log("date1 is earlier than date2");
}
```

## Internationalizing Dates and Numbers

### Intl.NumberFormat

- The Intl.NumberFormat object allows you to format numbers in a specific locale.

```js
let number = 1234567.89;
let formattedNumber = new Intl.NumberFormat('en-US').format(number);  // "1,234,567.89"
let formattedCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);  // "$1,234,567.89"
```

### Intl.DateTimeFormat

- The Intl.DateTimeFormat object allows you to format dates and times according to local conventions.

```js
let date = new Date();
let formattedDate = new Intl.DateTimeFormat('en-US').format(date);  // "10/18/2023"
let formattedDateFR = new Intl.DateTimeFormat('fr-FR').format(date);  // "18/10/2023"
```

## Timers: setTimeout and setInterval

- JavaScript provides functions to schedule code execution with setTimeout() and setInterval().

### setTimeout()

`setTimeout() runs a function once after a specified delay.`

```js
setTimeout(() => {
  console.log("This runs once after 2 seconds");
}, 2000);
```

### setInterval()

`setInterval() runs a function repeatedly, with a specified time interval between each call.`

```js
let interval = setInterval(() => {
  console.log("This runs every 2 seconds");
}, 2000);

// To stop the interval
clearInterval(interval);
```

### Clearing Timeouts and Intervals

`You can stop both setTimeout() and setInterval() using clearTimeout() and clearInterval() respectively, by passing in the returned ID.`

```js
let timeoutId = setTimeout(() => {
  console.log("This won't run");
}, 5000);

clearTimeout(timeoutId);  // Stops the timeout
```

### Real-Time Example of SetInterval

#### Use-Case: Real-Time Clock that updates every seconds

```js
function showTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  console.log("Current Time:", timeString);
}

// Start clock
const clockInterval = setInterval(showTime, 1000);

// Stop after 10 seconds (optional)
setTimeout(() => {
  clearInterval(clockInterval);
  console.log("Clock stopped after 10 seconds");
}, 10000);

```
### Bonus Tip: Recursive setTimeout (alternative to setInterval)

```js
function runEverySecond() {
  console.log("1 second passed");
  setTimeout(runEverySecond, 1000); // Schedule the next run
}

runEverySecond();  // Start the recursive loop
```

### Self-Scheduling Timer

```js
let count = 0;
let timeoutId;

function runEverySecond() {
  console.log("1 second passed");
  count++;

  if (count === 10) {
    console.log("Stopped after 10 seconds");
    return; // Exit the function without scheduling another timeout
  }

  timeoutId = setTimeout(runEverySecond, 1000); // Schedule the next run
}

runEverySecond();
```

