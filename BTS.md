# JavaScript Behind The Scenes

## 1. JavaScript a High-Level Language

- A high-level programming language is designed to be easy for humans to read and write. It abstracts away most of the complex details about how the computer's hardware works.

# Reasons JavaScript is High-Level

1. **Abstraction from Hardware**  
   JavaScript does not require you to manage memory manually (no pointers, no manual allocation).  
   You write code in familiar terms like variables, functions, objects, not CPU instructions.  
   The JS engine handles translating your code to machine operations behind the scenes.

2. **Automatic Memory Management**  
   JS has garbage collection — it automatically frees memory no longer in use.  
   You don’t need to allocate or deallocate memory explicitly.

3. **Dynamic Typing**  
   You don’t declare explicit types like in low-level languages (C, Assembly).  
   Types are checked and determined at runtime, so the code is more flexible.

4. **Built-in Data Structures**  
   JavaScript has arrays, objects, strings, maps, sets, etc., all ready to use.  
   You don’t have to build these from scratch or manage their internal details.

5. **Easy Syntax and Rich APIs**  
   The language syntax is simple and expressive.  
   It comes with many built-in functions and APIs to work with strings, numbers, dates, networking, and more.
   

# Why is Being High-Level a Good Thing?

- **Faster development:** Write less code to do more.
- **Readability and maintainability:** Easier to understand and share code.
- **Cross-platform:** Code runs on any device with a JavaScript engine.
- **Safety:** Less risk of bugs related to memory management.



# Memory Management: Premitive and object

### 1. Primitive Types

**What are they?**

Number, String, Boolean, Null, Undefined, Symbol, BigInt

Simple data values.

**How are they stored?**

- Stored directly in the call stack.
- Variables hold the actual value.

**Example:**

```js
let x = 10;
let y = x;  // y gets a copy of the value 10
x = 20;
console.log(y); // 10 (unchanged)
```

### 2. Object Types

**What are they?**

Objects, Arrays, Functions (reference types)

Complex, can be large and mutable.

**How are they stored?**

- The reference (pointer) to the object is stored in the call stack.
- The actual object lives in the heap.

**Example:**

```js
let obj1 = { name: "Alice" };
let obj2 = obj1;   // obj2 points to the same object as obj1
obj1.name = "Bob";
console.log(obj2.name); // "Bob" (both point to same object)`
```

### Memory Management Notes

- Objects are created in the heap, which has more flexible and larger memory space.
- JavaScript uses Garbage Collection (GC) to automatically free memory when objects are no longer referenced.
- If an object is still referenced anywhere (e.g., variables, closures, event listeners), it won't be garbage collected.
- Objects can cause memory leaks if references aren’t properly removed.

### 3. Garbage Collection (GC)

- JS engines run GC periodically.
- GC identifies unreachable objects (no references to them).
- These objects are removed from the heap freeing memory.
- GC algorithms include mark-and-sweep, reference counting (simplified explanation).



## 2. Garbage Collection

# What is Garbage Collection?

- Garbage Collection is the process by which JavaScript automatically frees up memory that is no longer needed.

- When your code creates objects, arrays, functions, etc., memory is allocated to store them.

- If these objects are no longer accessible or needed, the garbage collector cleans them up so memory isn’t wasted.

## Points To Remember

- Memory Freed up from **CALL STACK & HEAP** after we no longer need a value.

- **CALL STACK** => variable environment is simply deleted when execution context pops off stack.

- **NOTE** => Global variables declared with var, let and const at the top level live in the Global Execution as long as the program runs and cannot be deleted.

- "The Garbage Collection process is employed by the JavaScript engine to remove unused variables. Developers do not have direct control over this process."
 
 ```js
let user = { age: 25 };

- the user is stored in call stack
- its value is reference(pointer) to the actual object in heap memory
- the real object {age:25} is stored in heap.

```
**MARK & SWEEP ALGORITHM**

- Mark all objects that are reachable from the roots as alive.
- Sweep delete un-marked(unreachable objects and reclaim memory for future allocations)

- when objects that are no longer needed are incorrectly still reachable. and therefore not being garbage collected.


### Summary Table

| Concept               | Lives In        | Managed By           | Memory Usage                 |
|-----------------------|-----------------|----------------------|------------------------------|
| Variables (let/const) | Call Stack      | JS Engine            | Freed after function ends    |
| Objects/Functions     | Heap            | JS Engine + GC       | Lives until unreferenced     |
| Closures              | Heap            | JS Engine            | Can persist memory           |
| Event Listeners       | Heap + Web API  | Browser runtime      | Manual cleanup needed        |
| Web APIs              | Outside JS      | Browser / Node       | Not part of JS spec          |
| Event Loop            | JS Runtime      | Moves async code     | No memory, just logic        |
| Callback Queue        | JS Runtime      | Queue of functions   | Cleared after run            |


---

## Why Garbage Collection is Important

- Prevents memory leaks where unused memory accumulates.
- Helps keep your program efficient and fast.
- Saves developers from manually managing memory (which is hard and error-prone).

---

## How Does JavaScript Garbage Collection Work?

### 1. Reachability

- JavaScript engines track which values are reachable — meaning they can be accessed or referenced from roots like:

- Global variables
- Local variables in currently executing functions
- Function parameters
- Objects referenced from other reachable objects

Anything not reachable is considered garbage and eligible for collection.

### 2. Mark-and-Sweep Algorithm (Most Common)

- The garbage collector “marks” all reachable objects by starting from root references.
- Then it “sweeps” through memory to clean up objects not marked.
- Those unreachable objects are removed, and memory is reclaimed.


# IMP => Things That Can Cause Memory Leaks in JavaScript 

### 1. Global Variables

- Variables declared without `let`, `const`, or `var` become global.

- Globals stay alive throughout the lifetime of the app, so memory can pile up.

```js
foo = "I’m global";  // Avoid this!
```

### 2. Closures Holding References

Functions that close over variables keep those variables in memory.

If closures outlive their useful life, they keep objects alive unintentionally.

```js
function outer() {
  const largeData = new Array(1000000).fill('*');
  return function inner() {
    console.log(largeData[0]);
  };
}
const fn = outer();
// `largeData` stays in memory because `fn` references it
```

### 3. Forgotten Timers or Intervals

`setInterval` or `setTimeout` callbacks that keep running or are never cleared can hold references.

```js
const id = setInterval(() => {
  // some code
}, 1000);

// If never cleared, this callback stays in memory forever
// clearInterval(id);
```

### 4. Detached DOM Nodes

Removing DOM elements without properly cleaning event listeners or references causes leaks.

The JS object remains in memory because references still exist.

```js
const el = document.getElementById("myDiv");
el.addEventListener("click", () => { /* handler */ });
// Later...
el.remove(); // DOM node removed, but the event listener still holds reference
```

### 5. Closures in Loops

Closures created inside loops might hold unintended references, especially with variables declared using `var`.

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints 5 five times, but closures keep reference to single i
```

### 6. Out-of-Scope References

Keeping references to large objects or data in long-lived structures (arrays, maps) unintentionally.

```js
const cache = new Map();
function fetchData(key) {
  if (cache.has(key)) return cache.get(key);
  const data = /* fetch */;
  cache.set(key, data);
  return data;
}

// If cache keeps growing with no eviction, memory leaks
```

### 7. Event Listeners Not Removed

Adding event listeners to DOM or objects and never removing them can keep objects alive.

```js
element.addEventListener('scroll', handler);
// If element is removed but handler is not removed, leak occurs
```

# JavaScript: Interpreted and Just-In-Time (JIT) Compiled

### 1. JavaScript is Traditionally Interpreted

- Originally, JavaScript was interpreted, meaning the engine read and executed code line-by-line, directly.

- No separate compilation step like in C or Java — the source code was parsed and immediately run.

- This made development fast and dynamic but not very optimized or fast in execution.

---

### 2. Modern JS Engines Use JIT Compilation

- Today, engines like V8 (Chrome/Node.js), SpiderMonkey (Firefox), JavaScriptCore (Safari) use a hybrid approach.

- They parse JavaScript code into an Abstract Syntax Tree (AST).

- Then, instead of running the code line-by-line, they compile parts of the code into machine code "just in time" — i.e., right before execution.

- This compilation happens during runtime (not before), optimizing frequently executed code for better performance.

---

### Why Combine Interpretation and JIT?

- Interpretation helps with fast startup and flexibility.  
- JIT compilation improves performance by turning hot (frequently run) code into optimized machine instructions.  
- The engine can recompile, optimize, or even de-optimize code based on runtime behavior.

---

### How It Works — Simplified Flow

1. **Parsing:** JS source → Abstract Syntax Tree (AST).  
2. **Interpreter:** Executes the code initially to get results quickly.  
3. **Profiler:** Tracks which parts of code are run often ("hot code").  
4. **JIT Compiler:** Compiles hot code sections into optimized machine code.  
5. **Execution:** Runs optimized code for speed.  
6. **Deoptimization:** If assumptions break (like types change), falls back to interpreter or recompiles.


### JavaScript Engines: Hybrid Interpretation & JIT Compilation

- **JavaScript engines use a combination of both interpretation and Just-In-Time (JIT) compilation. It’s neither purely interpreted nor purely compiled ahead of time — instead, it’s a hybrid approach optimized for performance and flexibility.**

---

### How It Works Right Now:

- When you run JS code, the engine first **interprets** it quickly to get results fast.  
- Meanwhile, it **profiles** which parts of the code run often (called “hot code”).  
- The engine then **JIT-compiles** these hot parts into optimized machine code for faster execution.  
- If assumptions about types or behavior change, the engine can **de-optimize** and revert back to interpreted code or recompile.


# JavaScript is Multi-Paradigm

JavaScript supports multiple programming paradigms, making it a versatile language:

- **Procedural Programming:** Writing sequences of instructions (e.g., loops, conditionals).
- **Object-Oriented Programming (OOP):** Using objects, prototypes, and classes.
- **Functional Programming:** First-class functions, higher-order functions, closures, immutability.
- **Event-Driven Programming:** Handling asynchronous events via callbacks, promises, async/await.

This flexibility allows developers to choose the best style or mix paradigms to suit their needs.

# Prototype-Based Object-Oriented Programming in JavaScript

- JavaScript uses **prototype-based** inheritance rather than classical class-based inheritance (like Java or C++).

- Every object has a hidden link to a **prototype** object.
- When accessing a property or method, JavaScript looks up the prototype chain if it’s not found on the object itself.
- Objects can inherit properties and methods directly from other objects via prototypes.

Example:

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise.`);
};

const dog = new Animal("Rex");
dog.speak(); // Rex makes a noise.
```

# First-Class Functions in JavaScript

- In JavaScript, functions are **first-class citizens**, meaning they can be treated like any other value:

- **Assigned** to variables or properties
- **Passed** as arguments to other functions
- **Returned** from functions
- Stored in **data structures** like arrays or objects

This enables powerful programming patterns like callbacks, higher-order functions, and functional programming.

Example:

```js
// Assign function to variable
const greet = function(name) {
  console.log("Hello, " + name);
};

// Pass function as argument
function callTwice(fn) {
  fn("Alice");
  fn("Bob");
}
callTwice(greet);

// Return function from another function
function makeMultiplier(x) {
  return function(y) {
    return x * y;
  };
}
const double = makeMultiplier(2);
console.log(double(5)); // 10
```

# Dynamic Typing in JavaScript

JavaScript is a **dynamically typed** language, meaning:

- You **do not** need to declare variable types explicitly.
- Variable types are determined **at runtime** based on the assigned value.
- Variables can hold values of **any type**, and their type can **change** during execution.

Example:

```js
let data = 42;         // data is a number
data = "hello world";  // now data is a string
data = true;           // now data is a boolean
```

# Single-Threaded and Non-Blocking Event Loop in JavaScript

- **Single-threaded** means JavaScript has **one call stack** and executes code **one thing at a time**.
- Despite this, JavaScript is **non-blocking** due to the **event loop**, allowing asynchronous operations without freezing the main thread.

#### How it works:
1. JavaScript runs synchronous code on the **call stack**.
2. When it encounters async tasks (e.g., timers, I/O, network requests), it offloads them to **web APIs** or the environment.
3. Once async tasks complete, their callbacks are pushed to the **task queue**.
4. The **event loop** continuously checks if the call stack is empty and moves tasks from the queue to the stack for execution.

#### Benefits:
- UI remains responsive.
- Can handle many concurrent operations without multithreading.

#### Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Async task finished");
}, 1000);

console.log("End");

// Output:
// Start
// End
// Async task finished
```

# JavaScript Engine vs JavaScript Runtime

## 1. What is a JavaScript Engine?

The JavaScript Engine is the program responsible for parsing, compiling, and executing JavaScript code.

It takes your JS source code and turns it into machine code the CPU can execute.

Modern engines use Just-In-Time (JIT) compilation for speed.

**Examples of JS engines:**

- V8 (Chrome, Node.js)
- SpiderMonkey (Firefox)
- JavaScriptCore (Safari)

**Engine Tasks:**

- Parsing source code to AST (Abstract Syntax Tree).
- Compiling code (JIT compilation).
- Executing the compiled code.
- Managing memory (garbage collection).

---

## 2. What is a JavaScript Runtime?

The JavaScript Runtime is the environment in which JavaScript code runs.

It includes the JS Engine plus additional APIs and features provided by the host environment (browser, Node.js).

The runtime provides things that JS itself doesn’t have natively, like:

- Web APIs (DOM manipulation, fetch, setTimeout, event handling) in browsers.
- Node.js APIs (filesystem access, networking, timers) on the server.

It also handles the event loop, enabling async behavior.


# In-Depth JavaScript Execution Flow

## 1. Loading the JavaScript Code

- Your JavaScript code is loaded into the environment.
- In a browser, this happens when the browser encounters a `<script>` tag or imports a JS module.
- In Node.js, it happens when the JS file is read and passed to the V8 engine.
- The engine receives the raw source code as text.

## 2. Parsing

- The JavaScript Engine starts by lexical analysis (tokenization):
  - Splits the code into tokens (keywords, operators, literals, identifiers).
- Then it performs syntax analysis:
  - Constructs the Abstract Syntax Tree (AST) — a tree-like structure representing the program’s syntax.
- If there are syntax errors, parsing fails and execution stops.

## 3. Compilation

- The engine compiles the AST into an intermediate representation:
  - Modern engines often compile to bytecode or machine code using Just-In-Time (JIT) compilation.
  - Initially, the engine may interpret the bytecode for faster startup.
  - As the code runs, the engine identifies "hot" (frequently executed) parts to optimize.
  - Hot code is then recompiled into optimized machine code for better performance.
  - If assumptions (e.g., variable types) change, the engine can deoptimize and fall back to interpreted code.

## 4. Execution — The Call Stack

- The engine uses the call stack to manage function execution.
- When a function is called:
  - Its execution context (variables, scope) is pushed onto the stack.
- When the function completes:
  - Its context is popped off the stack.
- Synchronous code executes here directly, top-to-bottom.

## 5. Interaction with JavaScript Runtime Environment

- The runtime environment extends the engine by providing APIs and features outside the JS language spec.
- Examples:
  - Browser: DOM APIs (`document`, `window`), AJAX (`fetch`), timers (`setTimeout`), event listeners.
  - Node.js: File system access (`fs`), networking (`net`), process management (`process`).
- These APIs are not part of the engine, but the engine can call them because the runtime exposes them globally.

## 6. Handling Asynchronous Operations — The Event Loop

- When async functions like `setTimeout`, `fetch`, or event handlers are called, the runtime:
  - Sends the async task to the Web APIs (browser) or equivalent in Node.js.
  - Continues executing synchronous code without waiting.
- When async tasks complete, their callback functions are placed into the task queue (macrotask queue) or microtask queue.
- The event loop continuously monitors the call stack:
  - If the call stack is empty, the event loop dequeues the next task from the microtask queue first (e.g., Promises).
  - If the microtask queue is empty, it dequeues the next task from the task queue (e.g., `setTimeout` callbacks).
- The event loop then pushes these callbacks onto the call stack for execution.
- This mechanism enables non-blocking concurrency in JavaScript.

## 7. Memory Management and Garbage Collection

- The engine allocates memory when objects, functions, variables, etc., are created.
- It tracks reachability — objects that can be accessed through references from roots like global variables or currently running functions.
- When objects become unreachable (no references), they become eligible for garbage collection.
- The Garbage Collector periodically runs (often using mark-and-sweep):
  - Marks reachable objects.
  - Sweeps (frees) unmarked, unreachable objects.
- This frees memory automatically, preventing leaks.

## 8. Program Continues or Ends

- The engine keeps running as long as:
  - There is synchronous code in the call stack.
  - There are pending tasks or microtasks in the queues.
  - There are event listeners waiting for events.
- When all code executes and queues are empty:
  - The program may terminate (Node.js) or idle and wait for new events (browser).


[Load JS code from file or <script>]
              ↓
        [Parsing (Tokenize & AST)]
              ↓
     [JIT Compilation to Bytecode/Machine code]
              ↓
        [Execution on Call Stack]
              ↓
  ┌─────────────────────────────────────────┐
  │     Calls Runtime APIs (e.g., timers)   │
  └─────────────────────────────────────────┘
              ↓
       [Async tasks sent to Web APIs / Node APIs]
              ↓
       [Async tasks complete → Callbacks queued]
              ↓
          [Event Loop monitors Call Stack]
              ↓
    ┌──────────────────────────────┐
    │ If Call Stack empty:          │
    │  → Move tasks from queue to  │
    │    Call Stack for execution  │
    └──────────────────────────────┘
              ↓
      [Garbage Collector runs periodically]
              ↓
   [Program runs, idles, or terminates based on tasks]

[END]


# Execution Context and Call Stack in JavaScript

## 1. What is an Execution Context?

An **Execution Context (EC)** is a conceptual environment where the JavaScript code is evaluated and executed.

Every time JS runs code, it creates an execution context.

It contains:
- **Variable Environment:** Where variables, functions, and parameters live.
- **Scope Chain:** Links to outer scopes for variable resolution.
- **this value:** Context for how `this` behaves inside the context.

### Types of Execution Contexts

| Type                           | Description                                                        | Example                                |
|---------------------------     |--------------------------------------------------------------------|--------------------------------------|
| Global Execution Context (GEC) | Created by default when JS starts running. It represents the global environment (`window` in browsers, `global` in Node). | Your top-level code outside any function |
| Function Execution Context (FEC) | Created whenever a function is invoked. Each function call gets its own context. | Calling `foo()` creates a new FEC     |
| Eval Execution Context     | Created inside `eval()` (rarely used, not recommended).             | `eval("console.log('hi')")`           |

## 2. What is the Call Stack?

The **Call Stack** is a stack data structure that keeps track of execution contexts in the order they are created.

It follows **LIFO** (Last In, First Out):
- The last context added is the first to be completed and removed.
- The engine uses it to know which function is currently running and where to return after a function finishes.

## 3. How They Work Together — Step by Step

1. When the program starts, the **Global Execution Context (GEC)** is created and pushed onto the call stack.
2. JS executes the global code.
3. When a function is called:
   - A new **Function Execution Context (FEC)** is created.
   - The new FEC is pushed on top of the call stack.
   - The function’s code runs inside this FEC.
4. When the function finishes:
   - Its execution context is popped off the stack.
   - Control returns to the previous execution context (the one below it in the stack).
5. The process continues until the call stack is empty (all code executed).

## 4. Why Execution Context & Call Stack Matter

- They explain how JS keeps track of where it is in your code, especially with nested or recursive function calls.
- They help clarify scope, closure, and asynchronous behavior.
- Understanding them is key to debugging stack overflow errors, and how call order works.



# 