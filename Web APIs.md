# AbortController API

The AbortController API in JavaScript is a powerful tool used to abort asynchronous operations such as fetch() requests. It provides a way to signal that an operation should be canceled.

## 🔧 Basic Usage of AbortController

1. Create an AbortController instance
```js
const controller = new AbortController();
```

2. Access its signal

This signal is passed to the API you want to cancel:
```js
const signal = controller.signal;
```

3. Use the signal with fetch
```js
fetch('https://example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', err);
    }
  });
```

4. Abort the request
```js
controller.abort();
```
      
Once abort() is called, any ongoing operation using that signal will be terminated with an AbortError.


## Example: Timeout for Fetch

```js
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000); // abort after 5 seconds

fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal })
  .then(response => response.json())
  .then(data => {
    clearTimeout(timeoutId);
    console.log(data);
  })
  .catch(err => {
    if (err.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Fetch failed:', err);
    }
  });
```

## Use Cases

Canceling long-running fetch() calls (e.g. when a user navigates away).

Aborting tasks in event listeners or component unmounts in frameworks like React.

Controlling multiple async operations via a single controller.

 
