## What is Binary Data in WebSockets?

In the context of **WebSockets**, **binary data** refers to data that is transmitted over a WebSocket connection in a format other than plain text (UTF-8). Binary data is often used for sending more complex types of data, such as:

- Images
- Audio
- Video
- Files
- Other non-textual content

This data can be exchanged efficiently between the client and server.

### Types of Binary Data Supported by WebSockets

WebSockets support two types of binary data transmission:

1. **Blob (Binary Large Object)**  
   - Primarily used in browsers  
   - Suitable for handling large binary objects like files or media

2. **ArrayBuffer**  
   - A low-level binary data buffer  
   - Used for handling raw binary data in JavaScript

Both **Blob** and **ArrayBuffer** can be sent via WebSockets in the same way as text messages.


## How Binary Data Works in WebSockets

WebSocket messages can be transmitted as **text** (UTF-8 encoded) or **binary data**. When a message is binary, the WebSocket protocol allows it to be represented using either **Blob** or **ArrayBuffer** types.

### WebSocket Message Formats

When sending data over a WebSocket connection, messages can be in the following formats:

- **Text Data**  
  - UTF-8 encoded text (string)

- **Binary Data**  
  Binary data can be sent in one of two forms:
  - **ArrayBuffer**  
    - A low-level array of raw binary data
  - **Blob**  
    - A binary object (such as a file or image) capable of holding large amounts of binary data

### Specifying Binary Data Type

The WebSocket API allows you to define how binary data is handled by setting the `binaryType` property on the WebSocket instance. This property specifies whether the binary data should be treated as a **Blob** or an **ArrayBuffer**.


## Sending Binary Data via WebSocket (JavaScript)

You can send binary data through a WebSocket connection using either **ArrayBuffer** or **Blob**.

### Example 1: Sending an ArrayBuffer

In JavaScript, you can create an **ArrayBuffer** to store raw binary data and send it through a WebSocket connection.

```js
let socket = new WebSocket('ws://example.com/socket');

// Event: WebSocket is open
socket.onopen = function(event) {
  console.log('WebSocket is open now.');

  // Create a buffer to hold some binary data (e.g., an image or file)
  let buffer = new ArrayBuffer(8);  // Creating a buffer with 8 bytes
  let view = new DataView(buffer);  // View into the buffer (e.g., to write data)

  // Writing some data to the buffer
  view.setInt32(0, 42);  // Storing the value 42 at the start of the buffer
  
  // Send the buffer via WebSocket
  socket.send(buffer);
};

// Event: Message from the server
socket.onmessage = function(event) {
  console.log('Received from server: ', event.data);
};
```

### Example 2: Sending a Blob

A **Blob** can be used to represent binary data such as images, files, or any non-textual content.  
Blobs can also be sent directly over WebSocket connections.

```js
let socket = new WebSocket('ws://example.com/socket');

// Event: WebSocket is open
socket.onopen = function(event) {
  console.log('WebSocket is open now.');

  // Create a Blob object from binary data (e.g., an image or audio file)
  let data = new Uint8Array([65, 66, 67, 68]); // Example binary data (ASCII values of 'A', 'B', 'C', 'D')
  let blob = new Blob([data]);

  // Send the blob via WebSocket
  socket.send(blob);
};

// Event: Message from the server
socket.onmessage = function(event) {
  console.log('Received from server: ', event.data);
};
```

## Receiving Binary Data in WebSocket

To receive binary data from the server, you can inspect the `binaryType` property to determine whether the incoming message is a **Blob** or an **ArrayBuffer**.

### Example: Handling Binary Data (ArrayBuffer and Blob)

```js
let socket = new WebSocket('ws://example.com/socket');

// Set binaryType to handle ArrayBuffer
socket.binaryType = 'arraybuffer'; // or 'blob'

// Event: WebSocket is open
socket.onopen = function(event) {
  console.log('WebSocket is open now.');
};

// Event: Receiving a message
socket.onmessage = function(event) {
  let data = event.data;

  if (data instanceof ArrayBuffer) {
    console.log('Received ArrayBuffer data:', new Uint8Array(data));
  } else if (data instanceof Blob) {
    console.log('Received Blob data:', data);
    
    // To read the Blob as text or binary data, use FileReader
    let reader = new FileReader();
    reader.onload = function() {
      console.log('Blob data as text:', reader.result);
    };
    reader.readAsText(data);  // You could also use `readAsArrayBuffer` depending on the data type.
  }
};
```

## `binaryType` Property

The `binaryType` property defines how a WebSocket instance handles incoming binary data.

- **`binaryType = 'arraybuffer'`**  
  When set to `arraybuffer`, the WebSocket treats all incoming binary data as an **ArrayBuffer**.  
  This option is preferred for low-level binary data manipulation.

- **`binaryType = 'blob'`**  
  When set to `blob`, the WebSocket treats all incoming binary data as a **Blob** object.  
  This is typically used for large binary objects such as images or files.


# Blob and ArrayBuffer

## 1. Big Picture (Mental Model)

WebSocket binary messages are simply **bytes on the wire**.  

In JavaScript, these bytes can be represented as:

| Type        | What it is              | Best for                         |
|------------|------------------------|---------------------------------|
| ArrayBuffer | Raw memory buffer       | Fast processing, protocols, games |
| Blob        | File-like binary object | Large files, media, streaming    |

- 👉 The WebSocket protocol does **not** care whether you use **Blob** or **ArrayBuffer**.  
- 👉 This choice is purely a **JavaScript API** decision.


## 2. ArrayBuffer (Low-level Binary)

### What is ArrayBuffer?

An **ArrayBuffer** is:

- A **fixed-length** chunk of raw memory  
- Contains **no format or type**, just bytes  
- **Cannot be resized** once created  
- Must be accessed via **TypedArrays** or **DataView**

```js
const buffer = new ArrayBuffer(8); // 8 bytes
```

### Accessing Data in an ArrayBuffer

You can access the data in an **ArrayBuffer** using **TypedArrays** or **DataView**:

#### TypedArray (fast, simple)
```javascript
const uint8 = new Uint8Array(buffer);
uint8[0] = 255;
```

#### DataView (precise control)
```js
const view = new DataView(buffer);
view.setInt32(0, 42, true); // little-endian
```

#### Sending ArrayBuffer over WebSocket
```js
socket.send(buffer);
```
✔ Sent as binary frame
✔ Zero conversion overhead
✔ Very fast

### Receiving ArrayBuffer

```js
socket.binaryType = "arraybuffer";

socket.onmessage = (event) => {
  const buffer = event.data; // ArrayBuffer
  const data = new Uint8Array(buffer);
  console.log(data);
};
```

### Why ArrayBuffer is Fast

**ArrayBuffer** is fast because:

- No file abstraction  
- No streaming logic  
- Direct memory access  

#### Ideal for:

- Multiplayer games  
- Custom binary protocols  
- Real-time telemetry  
- Financial data  
- Sensors / IoT


## 3. Blob (High-level Binary)

### What is Blob?

A **Blob** is:

- A **binary file-like object**  
- Can be **very large** (GBs)  
- **Immutable**  
- Can be **streamed, sliced, saved, or downloaded**  

```javascript
const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
```

### Sending Blob over WebSocket
```js
socket.send(blob);
```
✔ Browser streams internally
✔ Good for large payloads
✔ Less memory pressure

### Receiving Blob
```js
socket.binaryType = "blob";

socket.onmessage = async (event) => {
  const blob = event.data;
  console.log(blob.size, blob.type);
};
```

### Reading Blob Data

You can convert a **Blob** into an **ArrayBuffer** for processing:

```javascript
const buffer = await blob.arrayBuffer();
```

### Stream Blob (Modern Browsers)

In modern browsers, a **Blob** can be streamed directly:

```javascript
const stream = blob.stream();
```

### Read Blob as Text

You can read the contents of a **Blob** as text:

```javascript
const text = await blob.text();
```

### Blob Slicing (Huge Advantage)

You can create smaller chunks of a **Blob** using `slice()`:

```javascript
const chunk = blob.slice(0, 1024); // first 1KB
```

### Perfect For

- File uploads  
- Chunked transfers  
- Video/audio streaming


### Why Blob is Slower (But Safer)

**Blob** is slower because:

- Requires **async reads**  
- Abstracts **memory access**  
- Adds **file semantics**  

**Advantages:**

- ✔ Better for large data  
- ✔ Safer for memory  
- ✔ Works naturally with files & media


## 4. `binaryType` (Critical Setting)

The **receiver** controls how binary data arrives.

```javascript
socket.binaryType = "arraybuffer"; // default is "blob"
```

## Real-World Use Cases

### Use **ArrayBuffer** when:

- Game state synchronization  
- Custom binary protocols  
- High-frequency messages  
- Low latency matters  

### Use **Blob** when:

- Uploading/downloading files  
- Video/audio streaming  
- Large payloads  
- Memory safety matters


## Why Blob is Slower Than ArrayBuffer

**Blob** is slower than **ArrayBuffer** for WebSocket (and general binary handling) due to several reasons rooted in how browsers handle memory, abstraction, and I/O.


### 1. Blob is a High-Level Abstraction

- A **Blob** is not raw memory—it’s a **file-like object**.  
- When you create or send a Blob, the browser treats it as an **immutable object with metadata** (size, type) and often manages it in a **separate memory space** outside the JS heap.  
- Accessing its contents requires **asynchronous operations** (`.arrayBuffer()`, `.text()`, `FileReader`), unlike **ArrayBuffer**, which is synchronous.  

**Impact:** Every read/write operation involves extra internal steps, making Blob inherently slower than working with raw memory.


#### 2. Async Processing

Reading data from a **Blob** requires asynchronous operations:

```javascript
const buffer = await blob.arrayBuffer();
```

**Impact of Async Processing:**  

- The browser must **copy data** from its internal storage to an **ArrayBuffer** before it can be manipulated.  
- **ArrayBuffer**, in contrast, resides in JavaScript-accessible memory, allowing **instant read/write** without copying.  
- **Result:** Extra memory copying and asynchronous scheduling introduce **latency**.


#### 3. Immutable Nature

- **Blobs are immutable**, meaning once created, they cannot be changed.  
- Any operation that modifies a Blob (like slicing or concatenation) creates a **new Blob** in memory.  
- **ArrayBuffer** can be accessed and modified **in place**.  

**Impact:** Extra memory allocation and copying overhead.

---

#### 4. Memory Management / GC Pressure

- Blobs are optimized for **large binary objects**, often stored in **browser-native memory** outside the JS heap.  
- Transferring or reading Blobs involves bridging between this memory and the JS heap (ArrayBuffer or TypedArray), which is costly for **small or frequent messages**.  

**Impact:** Garbage collection, copying, and memory management slow down performance.

---

#### 5. Streaming vs Direct Access

- Blobs support **streaming and slicing**, which is excellent for large files, but requires **internal bookkeeping and chunking**, adding overhead.  
- ArrayBuffers are **contiguous blocks of memory**, ready for immediate use without bookkeeping.  

**Impact:** Extra abstraction layers introduce latency.



