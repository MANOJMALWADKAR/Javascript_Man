# JavaScript does not support method overloading, Why?

In JavaScript, when multiple methods have the same name, the last one defined 
overwrites all previous ones. This happens because JavaScript objects store
properties (including methods) as key-value pairs, and each key can only have one value.

`Why This Happens`

  - JavaScript objects are essentially hash maps
  - Each property name is a unique key
  - Assigning to the same key replaces the previous value
  - No error is thrown - it's silent replacement

Objects behave like hash maps (or dictionaries) under the hood.

The keys are strings (or symbols), and the values can be anything (functions, numbers, objects, etc.).

When you add a property or method to an object, it’s stored as a key-value pair.

Accessing a property is like looking up the value by key — similar to how a hash map works.

Keys must be unique; if you add a property with the same key again, it overwrites the old value.


**NOTE=>** `Map is a better and more consistent hash map.`


## 1. JavaScript is dynamically typed

- Functions do not declare types for their parameters.

- You don’t specify the number or types of arguments a function must accept.

- This flexibility means there’s no built-in mechanism to differentiate functions based on parameter types or count.

```js
function sayHello(name) {
    console.log("Hello " + name);
}
```

- In Java or C++, the compiler uses the method signature (name + parameters' types/count) to decide which method to call. But in JavaScript, function signatures are not strictly defined or enforced.


## 2. 📌 Function names must be unique in a scope

If you declare two functions with the same name, the later one will overwrite the earlier one.

```js
function add(a, b) {
    return a + b;
}

function add(a, b, c) {
    return a + b + c;
}

console.log(add(1, 2));       // 3? ❌ Nope — Output: NaN
```

### Why?

Only the last add() function remains in memory. The previous definition is completely overwritten. There's no way for JavaScript to track both.


## 3. 🧠 JavaScript functions are objects (first-class citizens)

In JavaScript, functions are just objects stored in variables.

```js
function add(a, b) {
    return a + b;
}

add = function(a, b, c) {
    return a + b + c;
};
```

You can reassign functions like variables, meaning you can't have two functions with the same name in a given scope — it always replaces the previous one.


## 4. 🚫 No compile-time method resolution

Languages like Java and C++ are compiled languages. The compiler resolves which method to call based on the number and types of arguments at compile time.

JavaScript is interpreted at runtime, and it doesn’t do type-checking or overload resolution before running the code. That makes traditional overloading impossible.

## How Does JavaScript Handle It Then?

### Option 1: Using arguments object

```js
function greet() {
    if (arguments.length === 1) {
        console.log("Hello, " + arguments[0]);
    } else if (arguments.length === 2) {
        console.log("Hello, " + arguments[0] + ". You are " + arguments[1] + " years old.");
    }
}

greet("Alice");           // Hello, Alice
greet("Bob", 30);         // Hello, Bob. You are 30 years old.
```

### Option 2: Using rest parameters

```js
function greet(...args) {
    if (args.length === 1) {
        console.log(`Hello, ${args[0]}`);
    } else if (args.length === 2) {
        console.log(`Hello, ${args[0]}. You are ${args[1]} years old.`);
    }
}
```

### Option 3: Using parameter checks and defaults

```js
function greet(name, age) {
    if (age === undefined) {
        console.log(`Hello, ${name}`);
    } else {
        console.log(`Hello, ${name}. You are ${age} years old.`);
    }
}
```




# Hash Maps in JavaScript

## JavaScript Objects as Hash Maps

JavaScript objects are indeed hash maps (dictionaries) under the hood. They store key-value pairs where:
- Keys are strings (or symbols)
- Values can be any data type
- Lookup time is O(1) on average

```js
// Object as hash map
const userCache = {};
userCache['user123'] = { name: 'John', age: 30 };
userCache['user456'] = { name: 'Jane', age: 25 };

console.log(userCache['user123']); // { name: 'John', age: 30 }
```

## Map vs Object

While objects work as hash maps, the `Map` object is a better choice for pure hash map functionality:

```js
// Using Map (recommended for hash maps)
const userMap = new Map();
userMap.set('user123', { name: 'John', age: 30 });
userMap.set('user456', { name: 'Jane', age: 25 });

console.log(userMap.get('user123')); // { name: 'John', age: 30 }
console.log(userMap.size); // 2
```

### Key Differences:

| Feature | Object | Map |
|---------|---------|-----|
| Key types | Strings/Symbols only | Any type |
| Size | `Object.keys(obj).length` | `map.size` |
| Iteration | `for...in` or `Object.keys()` | `for...of` or `.forEach()` |
| Prototype | Has default keys | No default keys |

## Real-Time Example: User Session Cache

```js
class UserSessionManager {
    constructor() {
        this.sessions = new Map(); // Hash map for O(1) lookups
    }

    // Store user session
    createSession(userId, sessionData) {
        const sessionId = this.generateSessionId();
        this.sessions.set(sessionId, {
            userId,
            loginTime: Date.now(),
            ...sessionData
        });
        return sessionId;
    }

    // Retrieve session (O(1) lookup)
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }

    // Remove expired sessions
    cleanupExpiredSessions(maxAge = 3600000) { // 1 hour
        const now = Date.now();
        for (const [sessionId, session] of this.sessions) {
            if (now - session.loginTime > maxAge) {
                this.sessions.delete(sessionId);
            }
        }
    }

    generateSessionId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// Usage
const sessionManager = new UserSessionManager();

// Create sessions
const session1 = sessionManager.createSession('user123', { role: 'admin' });
const session2 = sessionManager.createSession('user456', { role: 'user' });

// Fast lookups
console.log(sessionManager.getSession(session1));
// { userId: 'user123', loginTime: 1695123456789, role: 'admin' }
```

## Real-Time Example: Frequency Counter

```js
// Count word frequency in a document
function countWordFrequency(text) {
    const wordCount = new Map();
    const words = text.toLowerCase().split(/\W+/).filter(word => word);

    for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    return wordCount;
}

// Usage
const document = "The quick brown fox jumps over the lazy dog. The dog was lazy.";
const frequency = countWordFrequency(document);

console.log(frequency.get('the')); // 3
console.log(frequency.get('lazy')); // 2

// Get most frequent words
const sortedWords = [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

console.log(sortedWords); // [['the', 3], ['lazy', 2], ['dog', 2]]
```

## When to Use Hash Maps

1. **Caching**: Store computed results for fast retrieval
2. **Indexing**: Quick lookups by unique identifiers
3. **Counting**: Frequency counters, vote tallies
4. **Grouping**: Group data by categories
5. **Memoization**: Cache function results to avoid recomputation

```js
// Memoization example
function memoize(fn) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key); // O(1) cache hit
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Expensive fibonacci function
const fibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(50)); // Fast due to memoization
```

# What is SSL/TLS?
# WHat is SSH


