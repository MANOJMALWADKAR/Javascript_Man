
# Part 4: Array Methods (Advanced)

## at(index)

- Returns element at the specified index. Supports negative indexing (-1 for last element).

- **Use case**: Getting elements from end of array without knowing length.

```js
const arr = [10, 20, 30, 40];
console.log(arr.at(1));   // 20
console.log(arr.at(-1));  // 40 (last element)
console.log(arr.at(-2));  // 30 (second last)
```

## concat()

- Merges two or more arrays into a new array without modifying original arrays.
- **Use case**: Combining arrays for displaying merged data or creating backups.

```js
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2, [5, 6]);
console.log(merged); // [1, 2, 3, 4, 5, 6]
```
## copyWithin()

- Copies part of array to another location within the same array, modifying it.
- **Use case**: Efficiently rearranging data without creating new arrays.

```js
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // Copy from index 3 to start
console.log(arr); // [4, 5, 3, 4, 5]
```

## entries()

- Returns an iterator with key-value pairs for each element.
- **Use case**: When you need both index and value during iteration.

```js
const arr = ['a', 'b', 'c'];
for (let [index, value] of arr.entries()) {
  console.log(index, value); // 0 'a', 1 'b', 2 'c'
}
```

## every()

- Tests if all elements pass a condition. Returns true/false.
- **Use case**: Validating all items meet criteria (form validation, data checks).

```js
const ages = [25, 30, 35];
const allAdults = ages.every(age => age >= 18);
console.log(allAdults); // true
```

## fill()

- Fills array with a static value from start to end index.
- **Use case**: Initializing arrays with default values.

```js
const arr = new Array(3).fill(0);
console.log(arr); // [0, 0, 0]
arr.fill('x', 1, 2); // [0, 'x', 0]
```

## filter()

- Creates new array with elements that pass a test condition.
- **Use case**: Getting subset of data (search results, filtering lists).

```js
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

## find()

- Returns first element that matches a condition, or undefined.
- **Use case**: Finding specific item in list (user by ID, product by name).

```js
const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
const user = users.find(u => u.id === 2);
console.log(user); // {id: 2, name: 'Jane'}
```

## findIndex()

- Returns index of first element that matches condition, or -1.
- **Use case**: Getting position of item for removal or replacement.

```js
const arr = [10, 20, 30];
const index = arr.findIndex(x => x > 15);
console.log(index); // 1
```

## findLast()

- Returns last element that matches a condition, or undefined.
- **Use case**: Finding most recent item matching criteria.

```js
const scores = [85, 90, 75, 95];
const lastHigh = scores.findLast(score => score > 80);
console.log(lastHigh); // 95
```

## findLastIndex()

- Returns index of last element that matches condition, or -1.
- **Use case**: Getting position of last matching item.

```js
const arr = [1, 2, 3, 2, 4];
const index = arr.findLastIndex(x => x === 2);
console.log(index); // 3
```

## flat()

- Flattens nested arrays by specified depth (default 1).
- **Use case**: Converting nested data structures to flat lists.

```js
const nested = [1, [2, [3, 4]]];
console.log(nested.flat());    // [1, 2, [3, 4]]
console.log(nested.flat(2));   // [1, 2, 3, 4]
```

## flatMap()

- Maps each element then flattens result by one level.
- **Use case**: Transform and flatten in one step (parsing comma-separated values).

```js
const arr = ['1,2', '3,4'];
const result = arr.flatMap(str => str.split(','));
console.log(result); // ['1', '2', '3', '4']
```

## forEach()

- Executes function for each array element. No return value.
- **Use case**: Side effects like DOM updates, logging, API calls.

```js
const items = ['apple', 'banana'];
items.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});
```

## includes()

- Checks if array contains a specific value. Returns true/false.
- **Use case**: Checking if item exists (permissions, feature flags).

```js
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape'));  // false
```

## indexOf()

- Returns first index of element, or -1 if not found.
- **Use case**: Finding position of element for manipulation.

```js
const colors = ['red', 'blue', 'green', 'blue'];
console.log(colors.indexOf('blue'));    // 1
console.log(colors.indexOf('yellow'));  // -1
```

## join()

- Joins array elements into a string with separator.
- **Use case**: Creating CSV, formatted lists, file paths.

```js
const words = ['Hello', 'World'];
console.log(words.join(' '));   // 'Hello World'
console.log(words.join(', '));  // 'Hello, World'
```

## keys()

- Returns iterator with array indices.
- **Use case**: When you only need indices for iteration.

```js
const arr = ['a', 'b', 'c'];
for (let key of arr.keys()) {
  console.log(key); // 0, 1, 2
}
```

## lastIndexOf()

- Returns last index of element, or -1 if not found.
- **Use case**: Finding last occurrence of duplicate values.

```js
const arr = [1, 2, 3, 2, 4];
console.log(arr.lastIndexOf(2)); // 3
```

## map()

- Creates new array by transforming each element.
- **Use case**: Data transformation (formatting, calculations).

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

## pop()

- Removes and returns last element from array.
- **Use case**: Stack operations, removing latest items.

```js
const stack = [1, 2, 3];
const last = stack.pop();
console.log(last);  // 3
console.log(stack); // [1, 2]
```

## push()

- Adds elements to end of array. Returns new length.
- **Use case**: Adding items to lists, building arrays dynamically.

```js
const arr = [1, 2];
const newLength = arr.push(3, 4);
console.log(arr);       // [1, 2, 3, 4]
console.log(newLength); // 4
```

## reduce()

- Reduces array to single value using accumulator function.
- **Use case**: Sum, count, object transformation, finding max/min.

```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

## reduceRight()

- Like reduce() but processes array from right to left.
- **Use case**: When order matters (string building, function composition).

```js
const arr = ['a', 'b', 'c'];
const result = arr.reduceRight((acc, curr) => acc + curr);
console.log(result); // 'cba'
```

## reverse()

- Reverses array in place. Modifies original array.
- **Use case**: Reversing order for display or processing.

```js
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

## shift()

- Removes and returns first element from array.
- **Use case**: Queue operations, processing items in order.

```js
const queue = [1, 2, 3];
const first = queue.shift();
console.log(first); // 1
console.log(queue); // [2, 3]
```

## slice()

- Returns shallow copy of portion of array. Doesn't modify original.
- **Use case**: Getting subset, pagination, creating copies.

```js
const arr = [1, 2, 3, 4, 5];
const subset = arr.slice(1, 4);
console.log(subset); // [2, 3, 4]
console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)
```

## some()

- Tests if at least one element passes condition. Returns true/false.
- **Use case**: Checking if any item meets criteria (validation, permissions).

```js
const ages = [15, 20, 25];
const hasAdult = ages.some(age => age >= 18);
console.log(hasAdult); // true
```

## sort()

- Sorts array in place. Default is alphabetical.
- **Use case**: Ordering data for display or processing.

```js
const fruits = ['banana', 'apple', 'cherry'];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'cherry']

const numbers = [3, 1, 4, 2];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 4]
```

## splice()

- Changes array by removing/adding elements at any position.
- **Use case**: Inserting, removing, or replacing elements anywhere.

```js
const arr = [1, 2, 3, 4];
arr.splice(1, 2, 'a', 'b'); // Remove 2 items at index 1, insert 'a', 'b'
console.log(arr); // [1, 'a', 'b', 4]
```

## toLocaleString()

- Returns localized string representation of array.
- **Use case**: Formatting numbers/dates for different regions.

```js
const numbers = [1234.5, 6789.1];
console.log(numbers.toLocaleString('en-US')); // "1,234.5,6,789.1"
```

## toReversed()

- Returns new reversed array without modifying original.
- **Use case**: Getting reversed copy while preserving original.

```js
const arr = [1, 2, 3];
const reversed = arr.toReversed();
console.log(reversed); // [3, 2, 1]
console.log(arr);      // [1, 2, 3] (unchanged)
```

## toSorted()

- Returns new sorted array without modifying original.
- **Use case**: Getting sorted copy while preserving original order.

```js
const arr = [3, 1, 2];
const sorted = arr.toSorted();
console.log(sorted); // [1, 2, 3]
console.log(arr);    // [3, 1, 2] (unchanged)
```

## toSpliced()

- Returns new array with splice operation, doesn't modify original.
- **Use case**: Creating modified copy without changing original.

```js
const arr = [1, 2, 3, 4];
const modified = arr.toSpliced(1, 2, 'a');
console.log(modified); // [1, 'a', 4]
console.log(arr);      // [1, 2, 3, 4] (unchanged)
```

## toString()

- Converts array to comma-separated string.
- **Use case**: Simple string conversion for display or logging.

```js
const arr = [1, 2, 3];
console.log(arr.toString()); // "1,2,3"
```

## unshift()

- Adds elements to beginning of array. Returns new length.
- **Use case**: Adding items to start of list, priority queues.

```js
const arr = [2, 3];
const newLength = arr.unshift(1);
console.log(arr);       // [1, 2, 3]
console.log(newLength); // 3
```

## values()

- Returns iterator with array values.
- **Use case**: When you only need values for iteration.

```js
const arr = ['a', 'b', 'c'];
for (let value of arr.values()) {
  console.log(value); // 'a', 'b', 'c'
}
```

## with()

- Returns new array with element at index replaced by value.
- **Use case**: Immutable updates without modifying original array.

```js
const arr = [1, 2, 3];
const newArr = arr.with(1, 'x');
console.log(newArr); // [1, 'x', 3]
console.log(arr);    // [1, 2, 3] (unchanged)
```

