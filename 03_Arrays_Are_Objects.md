
# Part 3: Arrays Are Objects(Intermediate Concepts)

## 🔍 Arrays Are Objects

- Arrays in JavaScript are actually a special kind of **object**.

- They have **numeric keys** (called **indices**) to store and access values in order.
- Arrays come with **special behaviors and built-in methods** tailored for managing ordered collections.

### Example:
```js
let arr = [10, 20, 30];

console.log(typeof arr);  // "object"
```

### Arrays have properties like objects

```js
arr.customProperty = "hello";
console.log(arr.customProperty); // "hello"
```

### Indices are actually keys (strings that look like numbers)

- Behind the scenes, the indices are keys on the array object:
```js
console.log(arr["0"]); // 10
```

### Arrays have special behaviors & methods

- Arrays have built-in methods like .push(), .pop(), .map(), etc., which are designed to work on the indexed data.

### Arrays have a .length property that updates automatically

- This length property tracks the number of elements, unlike regular objects.

