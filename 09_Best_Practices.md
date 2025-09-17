
# Part 9: Best Practices

## 🏆 The Golden Rules of High-Performance Arrays

Based on everything we've learned about V8 internals, here are the **essential best practices** for writing blazing-fast array code:

## 1. 🎯 Keep Arrays Homogeneous (Same Types)

### ✅ DO: Group Similar Data Types
```js
// EXCELLENT - All same type
const userIds = [101, 102, 103, 104];           // All SMI integers
const userNames = ["Alice", "Bob", "Charlie"];  // All strings
const userObjects = [{id: 1}, {id: 2}];         // All objects with same shape

// GOOD - Consistent within context
const coordinates = [1.5, 2.7, 3.2, 4.8];      // All floats
const flags = [true, false, true, false];       // All booleans
```

### ❌ DON'T: Mix Types Randomly
```js
// TERRIBLE - Mixed types kill optimization
const mixedData = [
  1,                    // number
  "hello",              // string
  { key: "value" },     // object
  true,                 // boolean
  null,                 // null
  [1, 2, 3]            // array
];
```

### 🔧 Refactoring Strategy:
```js
// ❌ BEFORE - Mixed array
const userData = [
  "John",      // name
  25,          // age
  true,        // isActive
  "Manager"    // role
];

// ✅ AFTER - Structured approach
const user = {
  name: "John",
  age: 25,
  isActive: true,
  role: "Manager"
};

// Or separate arrays by type
const names = ["John", "Jane", "Bob"];
const ages = [25, 30, 35];
const roles = ["Manager", "Developer", "Designer"];
```

## 2. 🕳️ Never Create Holes (The #1 Rule)

### ✅ DO: Use Array Methods for Removal
```js
// EXCELLENT - Remove elements properly
let items = [1, 2, 3, 4, 5];

// Remove by index
items.splice(2, 1);           // Removes index 2, no hole
console.log(items);           // [1, 2, 4, 5]

// Remove by value
const index = items.indexOf(4);
if (index > -1) {
  items.splice(index, 1);     // Safe removal
}

// Filter out unwanted items
items = items.filter(x => x !== 2);  // Creates new array, no holes
```

### ❌ DON'T: Use delete or Create Gaps
```js
// TERRIBLE - Creates permanent holes
let arr = [1, 2, 3, 4, 5];
delete arr[2];                // NEVER DO THIS!
console.log(arr);             // [1, 2, empty, 4, 5]

// TERRIBLE - Large index gaps
let sparse = [];
sparse[0] = "first";
sparse[10000] = "last";       // Creates 9,999 holes!
```

### 🔧 Safe Array Operations:
```js
// ✅ Safe ways to modify arrays
const original = [1, 2, 3, 4, 5];

// Create new array without element
const without3 = original.filter(x => x !== 3);

// Replace element (no holes)
const replaced = original.map(x => x === 3 ? 99 : x);

// Insert elements
const inserted = [...original.slice(0, 2), 99, ...original.slice(2)];

// Safe clearing
original.length = 0;          // Clear array without holes
```

## 3. 📏 Preallocate When You Know the Size

### ✅ DO: Allocate Upfront
```js
// EXCELLENT - Preallocated array
function createMatrix(width, height, defaultValue = 0) {
  const matrix = new Array(height);

  for (let i = 0; i < height; i++) {
    matrix[i] = new Array(width).fill(defaultValue);
  }

  return matrix;
}

// EXCELLENT - Known size processing
function processItems(count) {
  const results = new Array(count);    // Allocate exact size

  for (let i = 0; i < count; i++) {
    results[i] = processItem(i);       // Direct assignment
  }

  return results;
}
```

### ❌ DON'T: Grow Dynamically If Avoidable
```js
// POOR - Frequent reallocations
function buildArray() {
  let result = [];               // Starts with size 0

  for (let i = 0; i < 1000000; i++) {
    result.push(i);              // Causes many reallocations
  }

  return result;
}
```

### 🔧 Smart Preallocation Patterns:
```js
// ✅ Pattern 1: Known size
function createRange(start, end) {
  const size = end - start + 1;
  const result = new Array(size);

  for (let i = 0; i < size; i++) {
    result[i] = start + i;
  }

  return result;
}

// ✅ Pattern 2: Reasonable initial capacity
function buildDynamicArray() {
  let result = new Array(1000);   // Start with reasonable size
  let length = 0;

  // Add items as needed
  while (hasMoreItems()) {
    if (length >= result.length) {
      // Manually resize when needed
      const newSize = result.length * 1.5;
      const newArray = new Array(newSize);
      for (let i = 0; i < length; i++) {
        newArray[i] = result[i];
      }
      result = newArray;
    }

    result[length++] = getNextItem();
  }

  result.length = length;         // Trim to actual size
  return result;
}
```

## 4. 🔄 Choose the Right Loop for the Job

### ✅ DO: Use Traditional for Loops for Performance
```js
// FASTEST - Traditional for loop
function sumArray(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// FAST - for...of for simplicity (when performance isn't critical)
function simpleProcessing(items) {
  for (const item of items) {
    console.log(item);
  }
}
```

### ⚠️ CAREFUL: Array Methods Have Overhead
```js
// SLOWER - forEach (function call overhead)
function sumWithForEach(numbers) {
  let sum = 0;
  numbers.forEach(num => {       // Function call per element
    sum += num;
  });
  return sum;
}

// USE WHEN: Readability matters more than raw performance
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const total = numbers.reduce((sum, x) => sum + x, 0);
```

### 🎯 Loop Selection Guide:
```js
// Performance-critical code
for (let i = 0; i < array.length; i++) { /* fastest */ }

// Clean, readable code
for (const item of array) { /* good balance */ }

// Functional transformations
array.map(transform).filter(predicate)  /* readable, chainable */

// Complex reductions
array.reduce((acc, item) => { /* complex logic */ }, initial)
```

## 5. 🏗️ Use the Right Array Type

### ✅ DO: Choose Specialized Arrays for Specific Use Cases
```js
// NUMERICAL COMPUTATIONS - Use Typed Arrays
const floatData = new Float64Array(1000000);
const intData = new Int32Array(1000000);
const byteData = new Uint8Array(1000000);

// IMAGE/BINARY DATA - Use Clamped Arrays
const imageData = new Uint8ClampedArray(width * height * 4); // RGBA

// GENERAL PURPOSE - Use Regular Arrays
const userList = [];
const todoItems = [];
const configOptions = [];
```

### 🎯 Array Type Selection:
```js
// ✅ Typed Arrays - When you need raw performance
function processAudioData(samples) {
  const buffer = new Float32Array(samples.length);

  for (let i = 0; i < samples.length; i++) {
    buffer[i] = samples[i] * 0.5; // Volume reduction
  }

  return buffer;
}

// ✅ Regular Arrays - When you need flexibility
function manageUsers(users) {
  return users
    .filter(user => user.isActive)
    .map(user => ({ ...user, lastSeen: Date.now() }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
```

## 6. 🧹 Keep Arrays Clean

### ✅ DO: Separate Data from Metadata
```js
// EXCELLENT - Clean separation
class UserManager {
  constructor() {
    this.users = [];              // Pure array for users
    this.metadata = {             // Separate metadata object
      lastUpdate: null,
      totalCount: 0,
      filters: {}
    };
  }

  addUser(user) {
    this.users.push(user);
    this.metadata.totalCount++;
    this.metadata.lastUpdate = Date.now();
  }
}

// EXCELLENT - Using WeakMap for associations
const arrayMetadata = new WeakMap();

function processArray(arr) {
  arrayMetadata.set(arr, {
    processedAt: Date.now(),
    version: 1
  });

  // Process array without polluting it
  return arr.map(processItem);
}
```

### ❌ DON'T: Add Properties to Arrays
```js
// TERRIBLE - Pollutes array with properties
function badProcessing(arr) {
  arr.processedAt = Date.now();   // DON'T DO THIS!
  arr.metadata = { version: 1 };  // DON'T DO THIS!
  arr.cache = new Map();          // DON'T DO THIS!

  // Now the array is slow for all operations
  return arr.map(item => item * 2);
}
```

## 7. 🎨 Optimization Patterns

### Pattern 1: Hot Path Optimization
```js
// ✅ Optimize the most frequently called code
class DataProcessor {
  constructor() {
    this.cache = new Map();
  }

  // HOT PATH - Called millions of times
  processItem(item) {
    // Keep this simple and optimizable
    return item * 2 + 1;
  }

  // COLD PATH - Called rarely
  validateAndProcess(items) {
    // Complex logic is OK here
    if (!Array.isArray(items)) {
      throw new Error('Expected array');
    }

    return items.map(item => this.processItem(item));
  }
}
```

### Pattern 2: Batch Operations
```js
// ✅ Process in batches to maintain optimization
function processLargeDataset(data, batchSize = 10000) {
  const results = new Array(data.length);

  for (let start = 0; start < data.length; start += batchSize) {
    const end = Math.min(start + batchSize, data.length);

    // Process batch with consistent patterns
    for (let i = start; i < end; i++) {
      results[i] = processItem(data[i]);
    }
  }

  return results;
}
```

### Pattern 3: Type Guards for Mixed Data
```js
// ✅ When you must handle mixed types, separate them first
function processMixedData(mixedArray) {
  const numbers = [];
  const strings = [];
  const objects = [];

  // Separate by type first
  for (const item of mixedArray) {
    if (typeof item === 'number') {
      numbers.push(item);
    } else if (typeof item === 'string') {
      strings.push(item);
    } else if (typeof item === 'object' && item !== null) {
      objects.push(item);
    }
  }

  // Process each type optimally
  const processedNumbers = numbers.map(n => n * 2);
  const processedStrings = strings.map(s => s.toUpperCase());
  const processedObjects = objects.map(obj => ({ ...obj, processed: true }));

  return { numbers: processedNumbers, strings: processedStrings, objects: processedObjects };
}
```

## 8. 🚨 Code Review Checklist

### Before Submitting Array Code, Check:

**✅ Type Consistency**
- [ ] Are all elements in each array the same type?
- [ ] Can mixed-type arrays be refactored into separate arrays?

**✅ No Holes**
- [ ] Did I use `delete` anywhere? (Replace with `splice`)
- [ ] Are there large gaps between indices?
- [ ] Am I assigning to very large indices?

**✅ Performance**
- [ ] Can I preallocate arrays with known sizes?
- [ ] Am I using the most appropriate loop type?
- [ ] Would typed arrays be better for numerical data?

**✅ Cleanliness**
- [ ] Did I add any custom properties to arrays?
- [ ] Is metadata stored separately from array data?
- [ ] Are array operations predictable and consistent?

**✅ Memory Efficiency**
- [ ] Am I creating unnecessary intermediate arrays?
- [ ] Can operations be done in-place when appropriate?
- [ ] Are arrays properly cleaned up when no longer needed?

## 💡 The Ultimate Array Performance Mantra

> **"Keep arrays dense, clean, and consistent. V8 will reward you with blazing speed."**

Remember: V8 is incredibly smart, but it needs **predictable patterns** to work its optimization magic. Follow these practices, and your arrays will run at near-native speed!
