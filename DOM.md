# Advanced DOM and Events in JavaScript

## How DOM Really Works

- DOM (Document Object Model) is a tree-like representation of the HTML document, where every element, attribute, and text is a node.

- The browser parses the HTML, building this tree in memory.

- DOM nodes can be accessed and manipulated via JavaScript in real-time, allowing dynamic changes.

- The DOM is an interface to HTML, defined by the W3C.

- Browsers expose this tree through the document object in JS.

- Reflows and Repaints: When the DOM changes (e.g., adding/removing elements), browsers may trigger layout recalculations (reflow) and repainting of pixels on the screen. These are costly, so minimizing DOM manipulation improves performance.

- Live vs Static: Methods like getElementsByTagName return live collections (update automatically), whereas querySelectorAll returns static NodeLists.


## Selecting, Creating, and Deleting Elements

`Selecting:`

- document.getElementById('id') — fast, unique ID
- document.getElementsByClassName('class') — live HTMLCollection
- document.getElementsByTagName('tag') — live HTMLCollection
- document.querySelector('selector') — first match
- document.querySelectorAll('selector') — static NodeList of all matches

`Creating Elements:`

- document.createElement('tagName')

    ```js
    const div = document.createElement('div'); // <div></div>
    ```

    - Set attributes, classes, styles on created element.

    ```js
    //Set Attributes
    div.setAttribute('id', 'myDiv');
    div.setAttribute('data-role', 'container');

    //Add Class
    div.classList.add('box', 'shadow');

    //Add inline styles
    div.style.backgroundColor = 'lightblue';
    div.style.padding = '20px';

    //Add text content
    div.textContent = 'I am a dynamically created div!';
    ```
 
- parent.appendChild(node)

    ```js
    document.body.appendChild(div);  // Adds div at the end of <body>
    ```
- parent.insertBefore(newNode, referenceNode)

    ```js
    const firstChild = document.body.firstChild;
    document.body.insertBefore(div, firstChild); // Inserts div before first child
    ```

- parent.replaceChild(newNode, oldNode)

    ```js
    const oldPara = document.querySelector('p');
    document.body.replaceChild(div, oldPara);
    ```

- element.insertAdjacentHTML(position, htmlString) — efficient for inserting HTML.

**Positions:**

`beforebegin` — before the element
`afterbegin` — inside, before first child
`beforeend` — inside, after last child
`afterend` — after the element

    ```js
    const container = document.querySelector('#container');

    container.insertAdjacentHTML('beforeend', `
    <div class="card">
        <h3>New Card</h3>
        <p>This was added using insertAdjacentHTML!</p>
    </div>
    `);
    ```

**NOTE** => No need to createElement, setAttribute, etc. — fastest way for inserting large HTML blocks.

`Deleting Elements:`

    - parent.removeChild(child)
    - element.remove() (modern, cleaner)

**removeChild()**

```html
<body>
    <ul id="fruits">
        <li id="apple">Apple</li>
        <li id="banana">Banana</li>
    </ul>

   <script>
        const ul = document.getElementById('fruits');
        const banana = document.getElementById('banana');

        ul.removeChild(banana); // Removes the <li>Banana</li>
    </script>
 </body>
 ```

**element.remove()**

```html
<body>
    <div id="notification">You have a new message!</div>
    <script>
        const notification = document.getElementById('notification');
        notification.remove(); // Instantly deletes the element
    </script>
</body>
```


## Styles, Attributes, and Classes

`Attributes:`

- Access via .getAttribute('attr') and .setAttribute('attr', value)

- Some attributes have corresponding properties (e.g., element.id vs element.getAttribute('id'))

- Boolean attributes behave differently (e.g., checked, disabled).

`Styles:`

- Inline styles via element.style.property = value

- Computed styles via getComputedStyle(element) (read-only)

- CSS classes via element.classList (preferred over manipulating className):

   - .add(), .remove(), .toggle(), .contains()


## Types of Events and Event Handlers

- JavaScript lets us respond to user interactions (clicks, key presses, scrolls, etc.) via events.

### I. Types of Events

- Events are signals that something has happened on the page (e.g., user clicks a button, submits a form, presses a key, etc.)

#### 1. UI Events

- These relate to the user interface of the browser/page.

| Event    | Triggered when...                           |
| -------- | ------------------------------------------- |
| `load`   | The whole page (images, CSS, JS) has loaded |
| `resize` | The browser window is resized               |
| `scroll` | The page or element is scrolled             |

```js
    window.addEventListener("load", () => {
    console.log("Page fully loaded!");
    });

    window.addEventListener("resize", () => {
    console.log("Window resized!");
    });
```

#### 2. Mouse Events

| Event       | Triggered when...               |
| ----------- | ------------------------------- |
| `click`     | Element is clicked              |
| `dblclick`  | Element is double-clicked       |
| `mousedown` | Mouse button is pressed         |
| `mouseup`   | Mouse button is released        |
| `mouseover` | Mouse enters the element        |
| `mouseout`  | Mouse leaves the element        |
| `mousemove` | Mouse is moved over the element |


```js
    document.querySelector("button").addEventListener("click", () => {
    alert("Button clicked!");
    });
```

#### 3. Keyboard Events

| Event      | Triggered when...           |
| ---------- | --------------------------- |
| `keydown`  | Any key is pressed          |
| `keypress` | Key is pressed (deprecated) |
| `keyup`    | Key is released             |


```js
    document.addEventListener("keydown", (e) => {
    console.log(`Key pressed: ${e.key}`);
    });
```

#### 4. Form Events

| Event    | Triggered when...                  |
| -------- | ---------------------------------- |
| `submit` | Form is submitted                  |
| `input`  | Value of input changes (real-time) |
| `change` | Value changes (after losing focus) |
| `focus`  | Field receives focus               |
| `blur`   | Field loses focus                  |


```js
    document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); // prevent form from reloading
    alert("Form submitted!");
    });
```

#### 5. Clipboard Events

| Event   | Description    |
| ------- | -------------- |
| `copy`  | Text is copied |
| `cut`   | Text is cut    |
| `paste` | Text is pasted |


```js
    document.addEventListener("copy", () => {
    console.log("Content copied!");
    });
```

#### 6. Touch Events (Mobile Devices)

| Event        | Description               |
| ------------ | ------------------------- |
| `touchstart` | Finger touches screen     |
| `touchend`   | Finger is lifted          |
| `touchmove`  | Finger is moved on screen |


```js
    document.addEventListener("touchstart", () => {
    console.log("Touched screen!");
    });
```


### II. Event Handlers: How to Attach Events

#### 1. ✅ Inline HTML (NOT recommended)

```html
<button onclick="alert('Hi')">Click Me</button>
```

- Simple, but not scalable or maintainable.
- Avoid in real-world projects.

#### 2. ✅ DOM Property (Less preferred)

```js
const btn = document.querySelector("button");
btn.onclick = function () {
  alert("Clicked!");
};
```

- You can only assign one handler this way.
- New assignments overwrite old ones.

#### 3. ✅✅ addEventListener() — Best practice

```js
element.addEventListener(eventType, handlerFunction, options);
```

🔹 Why is it better?

   - Supports multiple listeners
   - Supports event phases (capture vs bubble)
   - Allows one-time listeners and passive events

#### 4. Options in addEventListener

```js
    element.addEventListener("click", handler, {
    once: true,        // handler is called only once
    capture: true,     // use capture phase
    passive: true      // tells browser it won't call preventDefault()
    });
```

#### 5. Remove Event Listener

```js
    function logMessage() {
    console.log("clicked");
    }

    btn.addEventListener("click", logMessage);
    btn.removeEventListener("click", logMessage);

    `❗ Arrow functions can’t be removed this way because they're anonymous.`
```


## Event Propagation: Capturing, Target, and Bubbling

- Event Propagation is how events move through the DOM when triggered. Understanding it helps you manage how events behave when multiple elements are involved.

### Three Phases of Event Propagation

#### 📌 1. Capturing Phase (a.k.a. “trickling”)

- Event travels from window down to the target element.
- Listeners added with { capture: true } will be triggered on the way down.

#### 📌 2. Target Phase

- Event reaches the actual target (the element the user interacted with).
- Handlers on the target element will run here.

#### 📌 3. Bubbling Phase

- Event then bubbles up from the target back to the root (window).
- This is the default phase where listeners run.

#### 🎯 Visual Flow:

```js
    <div id="parent">
    <button id="child">Click Me</button>
    </div>
```

```js
    window → document → html → body → #parent → #child  ← Capturing (down)
    #child                            ← Target
    #child → #parent → body → html → document → window   ← Bubbling (up)
```

```js
    <div id="parent">
        <button id="child">Click Me</button>
    </div>

    <script>
        const parent = document.getElementById('parent');
        const child = document.getElementById('child');

        parent.addEventListener('click', () => {
            console.log('Parent clicked - Bubbling');
        });

        parent.addEventListener('click', () => {
            console.log('Parent clicked - Capturing');
        }, { capture: true });

        child.addEventListener('click', () => {
            console.log('Child clicked');
        });
    </script>
```


### Controlling Propagation

#### event.stopPropagation()

- Stops the event from going further in the bubbling/capturing chain.

```js
    child.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Child clicked — propagation stopped');
    });
```

- Other parent handlers won't be triggered.
- Other handlers on the same element still work.

#### event.stopImmediatePropagation()

- Stops other handlers on the same element from being called.

```js
    child.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    console.log('Only this handler runs!');
    });

    child.addEventListener('click', () => {
    console.log('This will NOT run');
    });
```

#### event.preventDefault()

- Stops the browser's default action.

```js
    <a href="https://google.com" id="link">Google</a>

    <script>
    document.getElementById("link").addEventListener("click", function (e) {
        e.preventDefault(); // Stop navigation
        alert("Link clicked, but not navigating.");
    });
    </script>
```

- Prevent a link from navigating
- Prevent form from submitting


## Closing a Dropdown Menu When Clicking Outside

```html
<body>
  <button id="toggle">Toggle Dropdown</button>
  <div id="dropdown" class="hidden">
    <p>This is a dropdown menu.</p>
  </div>
</body>
```

```js
<script>
  const toggleBtn = document.getElementById("toggle");
  const dropdown = document.getElementById("dropdown");

  // Toggle dropdown visibility
  toggleBtn.addEventListener("click", function (e) {
    dropdown.classList.toggle("hidden");
    e.stopPropagation(); // Prevent bubbling to window
  });

  // Prevent dropdown clicks from bubbling up
  dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Click outside anywhere => close dropdown
  window.addEventListener("click", function () {
    dropdown.classList.add("hidden");
  });
</script>
```


## Event Delegation

- Event Delegation is a pattern in JavaScript where you attach a single event listener to a parent element, and use it to handle events on its children.

- Instead of adding event listeners to every child individually, you delegate that responsibility to their parent.


### ✅ Why Use Event Delegation?

| Benefit               | Why it matters                                                |
| --------------------- | ------------------------------------------------------------- |
| **Performance**       | Fewer event listeners = better performance                    |
| **Dynamic Elements**  | Handles elements added to DOM *after* listener is attached    |
| **Less Memory Use**   | Especially important when working with large or dynamic lists |
| **Centralized Logic** | One place to manage all child interactions                    |


### How Does It Work?

- Because of event bubbling, when a child is clicked, the event bubbles up to the parent. You can use event.target to see which child triggered the event.

### 📦 Simple Example

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

```js
const list = document.getElementById('list');

list.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('Clicked:', event.target.textContent);
  }
});
```

- ✅ Works for current and future <li> elements added dynamically.

### How They Work Together

| Concept         | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| **Propagation** | Controls how the event travels through the DOM                          |
| **Delegation**  | Uses that travel (especially **bubbling**) to handle events efficiently |


- 🧠 Delegation depends on bubbling to "listen" for events that occurred on child elements.

`What if you stop propagation: Then delegation won’t work, because the event won’t reach the parent where the listener is attached.`


| Feature      | Event Propagation                                 | Event Delegation                           |
| ------------ | ------------------------------------------------- | ------------------------------------------ |
| What it is   | Natural flow of events through DOM                | Pattern to handle events using a parent    |
| How it works | Capturing → Target → Bubbling                     | Catches events during **bubbling**         |
| Used for     | Fine control of event flow                        | Efficient event handling for many elements |
| Key methods  | `stopPropagation()`, `stopImmediatePropagation()` | `event.target`, `matches()`, `closest()`   |


## DOM Traversing

- DOM traversing is all about navigating through the DOM tree — up to parents, down to children, or sideways to siblings — so you can read or manipulate elements in relation to others.

### 1. Parent Nodes

| Property        | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `parentNode`    | Returns the parent (can be any node)                                 |
| `parentElement` | Returns the parent only if it's an element (null for text, document) |

```js
const p = document.querySelector('.text');

console.log(p.parentNode);     // <div id="parent">
console.log(p.parentElement);  // <div id="parent">
```


### 2. Child Nodes

| Property            | Description                                        |
| ------------------- | -------------------------------------------------- |
| `childNodes`        | Returns **all nodes** (elements + text + comments) |
| `children`          | Returns only **element nodes**                     |
| `firstChild`        | First node (may be text, comment, etc.)            |
| `lastChild`         | Last node (may be text, comment, etc.)             |
| `firstElementChild` | First element node only                            |
| `lastElementChild`  | Last element node only                             |

```js
const parent = document.getElementById('parent');

console.log(parent.childNodes);        // NodeList (includes text, like whitespace)
console.log(parent.children);          // HTMLCollection [h2, p]

console.log(parent.firstChild);        // Might be a text node (whitespace)
console.log(parent.firstElementChild); // <h2>

console.log(parent.lastElementChild);  // <p class="text">
```

### 3. Sibling Nodes

| Property                 | Description                 |
| ------------------------ | --------------------------- |
| `nextSibling`            | Next node (may be text)     |
| `previousSibling`        | Previous node (may be text) |
| `nextElementSibling`     | Next **element** only       |
| `previousElementSibling` | Previous **element** only   |

```js
const h2 = document.querySelector('h2');

console.log(h2.nextSibling);           // Might be text node (like newline)
console.log(h2.nextElementSibling);    // <p class="text">
```

### 4. Checking Containment

- Use Node.contains() to check if an element is inside another.

```js
const parent = document.getElementById('parent');
const strong = document.querySelector('strong');

console.log(parent.contains(strong));  // true
```

## Intersection Observer API

- it’s a powerful and modern tool for efficiently detecting when an element enters or leaves the viewport (or any ancestor).

- The Intersection Observer API lets you asynchronously observe changes in the intersection (i.e., visibility) of a target element with a root element or the viewport.

- It replaces manual + performance-heavy techniques like:
  -  Repeatedly checking getBoundingClientRect()
  -  Handling scroll or resize events
  -  Throttling or debouncing scroll handlers


### Use Cases

| Use Case                          | Benefit                                             |
| --------------------------------- | --------------------------------------------------- |
| Lazy loading images               | Load images only when they enter the viewport       |
| Infinite scrolling                | Load more content when the user scrolls near bottom |
| Revealing animations on scroll    | Animate elements when they appear                   |
| Tracking ad viewability           | Log impressions when ad becomes visible             |
| Sticky headers or menu activation | Detect which section is in view and update UI       |


### Basic Syntax

```js
const observer = new IntersectionObserver(callback, options);
observer.observe(targetElement);
```

`callback`

```js
function callback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // element is visible
    } else {
      // element is out of view
    }
  });
}
```

`options`

```js
{
  root: null,          // null = viewport
  rootMargin: '0px',   // Margin around root (can be used to preload earlier)
  threshold: 0.5       // Percentage of target's visibility to trigger callback
}
```
- root: Element used as the viewport. null = actual browser viewport.

- rootMargin: Similar to CSS margin but applied to the root bounds(e.g., preload before fully visible).

- threshold: 0 to 1, or an array like [0, 0.5, 1]. Triggers when that % of target is visible.


### Step-by-Step Example

- Let’s reveal elements when they enter the viewport:

```html
<style>
  .box {
    width: 100%;
    height: 300px;
    margin: 50px 0;
    background: lightgray;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  .visible {
    opacity: 1;
    background: lightgreen;
  }
</style>

<div class="box">Box 1</div>
<div class="box">Box 2</div>
<div class="box">Box 3</div>
```

```js
const boxes = document.querySelectorAll('.box');

const options = {
  root: null,             // viewport
  threshold: 0.25,        // 25% of box visible
  rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // optional: observe only once
    }
  });
}, options);

// Observe each box
boxes.forEach(box => observer.observe(box));
```

`Explanation`
- We're observing .box elements.
- As soon as 25% or more of a box is visible, we:
   - Add a .visible class to show it.
   - Stop observing that element (unobserve).


## Lifecycle DOM Events

### Lifecycle Phases

| Phase              | Event Triggered    | Description                                                              |
| ------------------ | ------------------ | ------------------------------------------------------------------------ |
| HTML is parsed     | `DOMContentLoaded` | The HTML has been parsed, but styles/images/scripts may still be loading |
| All assets loaded  | `load`             | Page + all assets (images, CSS, JS, fonts) are fully loaded              |
| Before unload      | `beforeunload`     | Before the page is being closed/reloaded (can show a warning)            |
| Page is unloading  | `unload`           | Page is being unloaded (not reliable for saving data)                    |
| Visibility changes | `visibilitychange` | Triggered when tab becomes hidden or visible                             |


## Efficient Script Loading: defer and async

### Regular <script> 

- In Head Tag it gives the following problem(Worst)
- In Body tag it does not give any problem(Better)

```js
<script src="script.js"></script>
```

- The browser stops parsing HTML to fetch and execute the script.

`These two attributes change when and how scripts are fetched and executed.`

| Attribute | Downloads in Background  | Blocks HTML Parsing?  | Waits for DOM?  | Execution Order |
| --------- | ----------------------- -| --------------------- | --------------- | --------------- |
| *(none)*  | ❌ No                    | ✅ Yes                | ❌ No           | Top to bottom   |
| `defer`   | ✅ Yes                   | ❌ No                 | ✅ Yes          | In order        |
| `async`   | ✅ Yes                   | ❌ No                 | ❌ No           | First finished  |


### defer: The Safe Default 

```js
<script src="script.js" defer></script>
```

- Scripts are downloaded in parallel with HTML parsing
- Executed after HTML is parsed, but before DOMContentLoaded
- Preserves order if you use multiple scripts
- Safe to use with DOM-manipulating code


### async: Fire and Forget

```js
<script src="analytics.js" async></script>
```

- Script is downloaded in parallel
- Executes as soon as it’s ready (may interrupt HTML parsing)
- ❗Does not wait for DOM
- ❗Execution order is not guaranteed


| Attribute | Best For                  | DOM Ready? | Maintains Order? | Use Case                          |
| --------- | ------------------------- | ---------- | ---------------- | --------------------------------- |
| none      | Blocking critical JS      | ❌          | ✅                | jQuery before DOMContentLoaded    |
| defer     | Scripts that use DOM      | ✅          | ✅                | App logic, modules, DOM scripts   |
| async     | Independent, fast scripts | ❌          | ❌                | Analytics, ads, non-critical libs |


