# Asynchronous JavaScript

## 1. Async JS
- Asynchronous JavaScript allows code to run without blocking other operations.

- JavaScript is single-threaded — it can only do one thing at a time.

- But some tasks (like fetching data from a server) take time.

- Asynchronous code allows the rest of your script to keep running while waiting for these tasks.


## 2. AJAX (Asynchronous JavaScript and XML)

- AJAX is a technique to send/receive data from a server without reloading the webpage.

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data); // handle data here
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

**NOTE**`Older method: XMLHttpRequest (still works, but less common now)`


## How the Web Works Request and Responses

1. Browser sends a request to the web server.
2. Server processes the request and prepares a response.
3. Browser receives the response and displays the webpage.

### The Process Step-by-Step

1. 🧭 You Enter a URL
```js
https://example.com/index.html
```

   - Https → Protocol (secure HTTP)
   - example.com → Domain name (resolved to IP using DNS)
   -  /index.html → Specific file requested

2. 🛰 DNS Lookup (Domain Name System)

    The browser asks:
    - "What is the IP address of example.com?"

    - DNS returns the IP address (e.g., 93.184.216.34)

3. 📤 Browser Sends an HTTP Request

Sent from your browser to the server at the IP address.

🔹 Request Includes:

    Method: GET, POST, etc.
    URL/path
    Headers (e.g., browser info, accepted types)
    Body (for methods like POST)

4. 🖥 Server Processes the Request

    - The web server receives the request.
    - It finds the requested resource (like index.html).
    - May involve back-end processing, database access, etc.
    - Then prepares a response.

5. 📥 Server Sends Back an HTTP Response

🔹 Response Includes:

    Status code (e.g., 200 OK, 404 Not Found)

    Headers (like content type)

    Body (actual content, like HTML, CSS, JSON)

6. 🧠 Browser Renders the Page

    - Browser parses the HTML.

    - Requests additional files: CSS, JS, images, etc.

    - Runs JavaScript, styles the page, builds the DOM.



## CallBack hell

`Callback:`

function that is passed as an argument to another function and is executed after the completion of that function's operation.

`Key points about callbacks:`

1. Function passed as an argument: A callback is just a function that gets passed into another function.

2. Asynchronous behavior: Callbacks are often used in situations where a task is done asynchronously (like reading a file, making a network request, or waiting for a timeout).

3. Executed after completion: The callback is typically executed after the task it's passed to is finished.


```js
// A simple function that accepts a callback
function greet(name, callback) {
  console.log('Hello, ' + name + '!');
  callback();  // Call the callback function after greeting
}

// A callback function
function afterGreeting() {
  console.log('The greeting is complete!');
}

// Calling the function with the callback
greet('Alice', afterGreeting);

// Hello, Alice!
// The greeting is complete!

```

##### JavaScript uses callbacks for handling tasks like API calls, file reading, or timers, ensuring that the program doesn't block while waiting for a task to complete.

##### JavaScript is single-threaded — it can do one thing at a time. So, to avoid freezing the app when waiting for long operations (like fetching data from the network), JS uses callbacks to continue running other code while waiting for a task to complete.


### Callback Hell

Callback Hell (also known as Pyramid of Doom) is a phenomenon that occurs when callbacks are nested within other callbacks.

This creates a situation where the code becomes difficult to read, understand, and maintain.

When multiple asynchronous tasks depend on each other, developers often nest callbacks inside callbacks, which can result in increasingly complex and indented code.

### Example => API Calls to Multiple Services

```js
fetchUserData(userId, (err, userData) => {
    if (err) {
        console.error('Error fetching user data', err);
        return;
    }
    fetchPosts(userData.id, (err, posts) => {
        if (err) {
            console.error('Error fetching posts', err);
            return;
        }
        fetchComments(posts[0].id, (err, comments) => {
            if (err) {
                console.error('Error fetching comments', err);
                return;
            }
            console.log(comments);
        });
    });
});
```

### Solutions to Callback Hell

1. Use Promises
2. Use async / await


## JavaScript Promises – In Depth

A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

### 🔧 Promise States:

`Pending` – Initial state; neither fulfilled nor rejected.

`Fulfilled` – Operation completed successfully.

`Rejected` – Operation failed.


```js
let getData = new Promise((resolve, reject) => {
  setTimeout(() => {
    let success = true;
    if (success) {
      resolve("Data received!");
    } else {
      reject("Error occurred.");
    }
  }, 2000);
});

getData
  .then(response => console.log("Success:", response))
  .catch(error => console.log("Failed:", error));
```

### Real-World Promise Scenario: Login System

```js
function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "123") {
        resolve("Login successful!");
      } else {
        reject("Invalid credentials");
      }
    }, 1000);
  });
}

login("admin", "123")
  .then(msg => console.log(msg))
  .catch(err => console.error(err));
```

### Fetch API

The Fetch API provides a modern, promise-based way to make HTTP requests in JavaScript — replacing older tools like XMLHttpRequest.

```js
fetch(url, options)
  .then(response => response.json())  // parse JSON
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then(data => console.log("Post:", data))
  .catch(error => console.error("Error:", error));
```

### Chaining with .then()

```js
doTask()
  .then(result1 => doNext(result1))
  .then(result2 => doAnother(result2))
  .then(finalResult => console.log(finalResult));
```

### Multiple Promises Together

1. Promise.all([])

- Waits for all promises to resolve, or rejects if any fail.
- Runs multiple Promises in parallel and waits for all of them to fulfill.
- ❗ If any promise rejects, Promise.all immediately rejects.

```js
Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
]).then(results => {
  const [user, posts, comments] = results;
  console.log(user, posts, comments);
}).catch(error => {
  console.error("One of the promises failed:", error);
});
```

2. Promise.allSettled([])

- Returns all results (both fulfilled and rejected).
- 

```js
Promise.allSettled([
  Promise.resolve(10),
  Promise.reject("Fail"),
  Promise.resolve(20)
]).then(results => {
  console.log(results);
});

Useful when you want all results regardless of failure.
```

3. Promise.race([])

Returns the first settled promise (resolved or rejected).

```js
Promise.race([
  slowNetwork(),
  timeout()
]).then(console.log).catch(console.error);
```

4. Promise.any([]) (ES2021)

Returns the first fulfilled promise; ignores rejections unless all fail.

```js
Promise.any([
  Promise.reject("A failed"),
  Promise.resolve("B succeeded"),
  Promise.resolve("C succeeded")
]).then(console.log);  // Outputs: B succeeded
```

## Consuming Promises

A function produces a promise when it returns one.

We consume that promise by using .then(), .catch(), .finally(), or async/await.

1. Consuming Promises with .then() / .catch()

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data loaded");
    }, 1000);
  });
}

// 🔽 Consuming the promise
fetchData()
  .then(result => {
    console.log("Success:", result);
  })
  .catch(error => {
    console.log("Error:", error);
  });
```

2. Consuming Promises with async/await (Modern Way)

```js
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("User fetched");
    }, 1000);
  });
}

// 🔽 Consuming with async/await
async function showUser() {
  try {
    const user = await getUser();  // await pauses until resolved
    console.log(user);
  } catch (error) {
    console.error("Error:", error);
  }
}

showUser();
```


## Async/await

### Consuming the promise with async/await:

```js
async function fetchData() {
  const result = await getData();  // wait for the promise to resolve
  console.log(result);             // Output: Here is your data
}

fetchData();
```

### Real-Time API Example

```js
async function fetchUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  console.log("User name:", user.name);
}

fetchUser();
```

### Handling Errors with try/catch

```js
async function fetchInvalidUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/9999");

    if (!response.ok) {
      throw new Error("User not found");
    }

    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchInvalidUser();
```

### Chaining Multiple Await Calls

```js
async function loadDashboard() {
  try {
    const userRes = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await userRes.json();

    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    const posts = await postsRes.json();

    console.log("User:", user.name);
    console.log("Posts:", posts.length);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

loadDashboard();
```

### Consuming Multiple Promises in Parallel (with Promise.all + await)

```js
async function loadParallel() {
  try {
    const [userRes, postRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1"),
      fetch("https://jsonplaceholder.typicode.com/posts/1")
    ]);

    const user = await userRes.json();
    const post = await postRes.json();

    console.log("User:", user.name);
    console.log("Post:", post.title);
  } catch (err) {
    console.error("Error:", err);
  }
}

loadParallel();
```

