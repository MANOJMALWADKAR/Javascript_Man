# Everything You Need TO Know About: `Array`

## Part 1: What is an Array in JavaScript?

An **array** is a list-like object in JavaScript used to store **ordered collections** of items.

### Example:

```js
let fruits = ['apple', 'banana', 'cherry'];

console.log(fruits[0]); // 'apple'
console.log(fruits[1]); // 'banana'

let mixed = [42, "hello", { key: "value" }, [1, 2, 3]]; //Mixed
```

### 🔑 Key Points about Arrays

- ✅ **Zero-Indexed**: The first element is at index `0`, the second at `1`, and so on.

- ✅ **Bracket Notation**: Access elements using `array[index]`.

### Why Use Arrays?

- Arrays are useful because they help you manage and work with collections of data efficiently. Here’s why you might want to use them:

### 1. Store Multiple Values in One Variable 
### 2. Organize Data Efficiently
### 3. Access Elements Easily
### 4. Manipulate Groups of Data
### 5. Iterate Through Data
### 6. Dynamic Size

### Basic Array Features

```js
let colors = ['red', 'green', 'blue'];

console.log(colors.length);   // 3
console.log(colors[2]);       // "blue"

colors[1] = 'yellow';         // update element
colors.push('purple');        // add to end
colors.pop();                 // remove from end
```
