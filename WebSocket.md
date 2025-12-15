# WebSocket

## What Is a WebSocket?

WebSocket is a bidirectional, full-duplex communication channel over a single TCP connection, designed to allow real-time data transfer between clients and servers with low overhead.

- Initial connection: Begins with an HTTP handshake (called the WebSocket handshake).

- Protocol upgrade: Once accepted, the protocol is upgraded to WebSocket, and the TCP connection stays open.

## WebSocket VS HTTP VS SSE

| Feature         | HTTP            | WebSocket     | SSE             |
| --------------- | --------------- | ------------- | --------------- |
| Connection      | Short-lived     | Persistent    | Persistent      |
| Direction       | Client → Server | Bidirectional | Server → Client |
| Real-time       | ❌               | ✅             | ⚠️ Limited       |
| Browser support | ✅               | ✅             | ✅               |
| Binary data     | ❌               | ✅             | ❌               |


## How WebSocket Works (Under the Hood)

### Handshake(upgrade from http)

The client sends a special HTTP GET request

```js
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

Upgrade: websocket → Client wants to switch protocols.

Sec-WebSocket-Key → Random base64-encoded key used for verification.

### Server Response

```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

If all checks pass, the server responds with HTTP 101 Switching Protocols.

After this, the HTTP connection becomes a WebSocket connection.

## WebSocket Web API

### Creating a WebSocket

```js
const socket = new WebSocket("wss://example.com/socket");
```

- *ws:// → insecure WebSocket*
- wss:// → secure WebSocket (like HTTPS)

### WebSocket Events

```js
socket.onopen = function(event) {
  console.log("Connected");
  socket.send("Hello Server!");
};

socket.onmessage = function(event) {
  console.log("Message from server:", event.data);
};

socket.onerror = function(error) {
  console.error("WebSocket error:", error);
};

socket.onclose = function(event) {
  console.log("WebSocket closed:", event.code, event.reason);
};
```

### Sending and Receiving

- socket.send(data) → Send string, Blob, ArrayBuffer, or ArrayBufferView.

```js
socket.send("Hello World")         // string
```

```js
socket.send(JSON.stringify({      // JSON Object
    type: "chat", 
    text: "Hi" 
}))
```

```js
socket.send(new Blob([data],                // Blob
    { type: 'application/octet-stream' }    //MIME type for binary data 
))
```

```js
socket.send(new Uint8Array([0x01, 0x02]))       //Typed Array
```

```js
socket.send(new DataView(buffer))           // ArrayBufferView (TypedArray views)
```

- Incoming messages are delivered via onmessage.

### Closing the Connection

```js
socket.close(code, reason);
```

- code is optional (e.g., 1000 for normal closure).

- reason is a human-readable string (max 123 bytes UTF-8).


## Connection States

| State        | Value | Description                   | Why Useful                                |
| ------------ | ----- | ----------------------------- | ----------------------------------------- |
| `CONNECTING` | 0     | Socket is trying to connect   | Avoid sending messages until open.        |
| `OPEN`       | 1     | Connection established        | Safe to `send()` messages.                |
| `CLOSING`    | 2     | Closing handshake in progress | Do not send new messages; wait for close. |
| `CLOSED`     | 3     | Connection closed or failed   | Can attempt reconnect.                    |

```js
if(socket.readState === Websokcet.CONNECTING){
    console.log("Socket is connecting... please wait.")
}
```

```js
if (socket.readyState === WebSocket.OPEN) {
  socket.send("Hello Server!");
} else {
  console.warn("Socket not ready yet");
}
```
```js
if(socket.readyState === Websocket.CLOSING){
    console.log("Socket is closing, cannot send new messages.");
}
```

```js
if(socket.readyState === WebSocket.CLOSED){
    console.log("Socket is closed. Attempting reconnect...");
    // Example: reconnect logic
    // socket = new WebSocket("ws://example.com");
}
```


# socket.addEventListener vs socket.onopen/onmessage/onerror/onclose(single handler)

## 1. Single Handler (onmessage) – Simple & focused apps
**Use case:** Small chat app or real-time notification system where all messages are handled together.

**Scenario:**

You have a dashboard that only needs to log all messages or display them in a single panel.

Messages may have different types, but routing can be done inside one central handler.

## 2. Multiple Handlers (addEventListener) – Modular & scalable apps

**Use case:** Large apps where different modules need to respond independently to messages.

**Scenario:**

You have a real-time dashboard with **chat**, **notifications**, **analytics**, and **activity logs**.

Each module should react independently to WebSocket messages.

You might dynamically load/unload modules, e.g., popups or tabs.

## Protocol Framing (Under the Hood)

After upgrade:

- Each message is sent as a WebSocket frame.

- A frame contains:

    - FIN bit (end of message)

    - Opcode (text, binary, ping/pong, close)

    - Masking key (client messages are masked)

    - Payload length + actual payload

## WebSocket Advanced Topics

### 1. 🧵 Subprotocols

`NOTE: Many don’t realize subprotocols exist; they are only needed if server expects a specific protocol.`

`mqtt:` IOT messaging via websocket

`wamp.2.json:` Remote procedure calls, PubSub

`graphql-ws:` Real-time GraphQL subscriptions

`soap:` SOAP over WebSocket

`chat:` Custom chat messaging format

`json:` Generic JSON message format

WebSocket subprotocols are application-level protocols layered over WebSocket. They are negotiated during the handshake. **Based on the which subprotocol is backend setup is accepting.**

Default: If no subprotocol provided, no protocol is used (empty string ""). Most browsers just use plain WebSocket.

Only one subprotocol is active per connection.

If the server does not support any of the proposed subprotocols, it may reject the connection or accept it without a subprotocol.

```js
const socket = new WebSocket("wss://example.com/ws", "chat");
```

We can offer multiple subprotocols on a single WebSocket URL — but only one will be selected during the connection handshake from the list that it supports.

##### Why allow multiple subprotocols?

- Flexibility: Clients can work with multiple server versions.

- Versioning: Offer chat.v1, chat.v2, chat.v3 and let server choose.

- Fallbacks: If server doesn’t support the first one, maybe it supports the second.

### 2. 📦 Binary Data (Blobs & ArrayBuffers)

WebSocket can transmit binary data directly — more efficient than encoding everything as JSON.

#### Sending Binary:

```js
const buffer = new ArrayBuffer(1024); // or new Uint8Array([1,2,3])
socket.send(buffer);
```

#### Binary Data in WebSockets?

WebSocket messages can be either:

   - Text (UTF-8 encoded strings)

   - Binary (raw data)

Binary data can be:

   - ArrayBuffer

   - Blob (in browsers)


**Sending Binary Data (Client-side example)**

```js
// Create WebSocket
const socket = new WebSocket("ws://example.com/socket");

// Wait until connection opens
socket.addEventListener("open", () => {
  // Create some binary data - Uint8Array with bytes 1,2,3
  const binaryData = new Uint8Array([1, 2, 3]);

  // Send binary data
  socket.send(binaryData);
});
```

**Receiving Binary Data**

```js
socket.binaryType = "arraybuffer"; // Default is "blob" in browsers

socket.addEventListener("message", (event) => {
  if (event.data instanceof ArrayBuffer) {
    const bytes = new Uint8Array(event.data);
    console.log("Received binary data:", bytes);
  } else {
    console.log("Received text message:", event.data);
  }
});
```

`binaryType:` The binaryType property controls how binary messages received from the server are exposed to your JavaScript code.

`Blob:` is useful if you want to work with files, images, or use APIs like FileReader, or create object URLs.

`ArrayBuffer:` is lower-level, allowing you to manipulate raw bytes directly (useful for parsing protocols, binary formats, etc.).

```js
const socket = new WebSocket("ws://example.com");

// By default, binary messages come as Blob (in browsers)
console.log(socket.binaryType); // "blob"

// Change to ArrayBuffer
socket.binaryType = "arraybuffer";

socket.onmessage = (event) => {
  if (event.data instanceof ArrayBuffer) {
    // You get raw bytes here
    const bytes = new Uint8Array(event.data);
    console.log("Received binary data:", bytes);
  } else {
    // Probably text message
    console.log("Received text:", event.data);
  }
};
```

**Points**

- By default, binaryType is "blob" in browsers.

- If you want to work with raw bytes (low-level), set binaryType to "arraybuffer".

- binaryType only affects how received binary data is delivered to your JavaScript code.

- It does not affect sending — when you send binary data with .send(), you just pass whatever binary data you want (like ArrayBuffer, Blob, or typed arrays).


### 3. 🎈 Ping/Pong and Keep-alive

WebSockets define two special control frames:

- Ping: A small message sent from one peer to the other (usually from the server).

- Pong: An automatic reply to a Ping, sent by the receiving peer.

It refers to any mechanism that keeps the connection from being closed due to inactivity.

browsers cannot send low-level Ping frames, the frontend typically sends a JSON "ping" message (or some other heartbeat message) every X seconds to tell the backend:

- "Hey, I'm still here, don't close this connection."


### Common reasons why a WebSocket connection gets closed:

1. Normal Clousre

    - One side (client or server) calls .close() intentionally.

    - Example: User navigates away, logs out, or app shuts down gracefully.

2. Idle Timeout / Keep-Alive Failure

    - If neither side sends any data (including pings or heartbeats), intermediaries may silently drop the TCP connection.

    - Server may also close connection if it suspects the client is dead (no pongs received).

3. Network Issues

    - Lost internet connectivity.

    - Wi-Fi or cellular network drops.

    - NAT or firewall resets connection.

    - Temporary outages.

4. Security Reasons

    - Authentication expired.

    - Unauthorized access detected.

    - Suspicious activity or rate limiting.

### detect why connection closed

```js
socket.onclose = (event) => {
  console.log("WebSocket closed:", event.code, event.reason);
};
```

| Common Close Codes | Meaning                                |
| ------------------ | -------------------------------------- |
| 1000               | Normal closure                         |
| 1001               | Going away (server or client shutdown) |
| 1006               | Abnormal closure (no close frame)      |
| 1008               | Policy violation                       |
| 1011               | Internal server error                  |


### 3. Backpressure Handling

Backpressure occurs when the data producer (sender) generates data faster than the data consumer (receiver) can process or receive it. This causes a buildup of unprocessed data, potentially leading to:

Increased memory usage (buffer bloat)

Delays or lag in data delivery

Dropped connections or crashes if buffers overflow

#### Backpressure Techniques

1. Flow Control with Buffering

    Buffering is the most common way to handle backpressure. The receiver can store incoming messages in an internal buffer and process them at a rate it can handle.

    `Advantages`: Simple to implement; the sender is unaware of the backpressure.

    `Challenges`: Can lead to increased memory usage if the buffer grows too large.

    `Implementation Example:` When a client sends data, the server can add it to a buffer.

      The server processes the buffer at its own pace and can reject further incoming data once the buffer is full.

      In JavaScript, the buffer size and processing frequency can be controlled using setInterval, setTimeout, or by monitoring memory usage.

2. Pausing and Resuming the Stream

    The sender can be instructed to pause sending data when the receiver is overwhelmed and resume when it is able to process more data.

    `Advantages:` This allows the system to adapt dynamically without dropping messages.

    `Challenges:` The sender and receiver need to negotiate and handle "paused" states gracefully.

3. Rate Limiting

    Rate limiting controls how frequently data is sent over the WebSocket connection. By limiting the rate at which data is sent, the system can prevent overwhelming the consumer.

    `Advantages:` Helps to prevent spikes in message frequency and smoothens out data flow.

    `Challenges:` The sender has to respect the rate limit, and the receiver may still lag if the limit is too high.

    `Implementation Example:` Using token bucket or leaky bucket algorithms to control the sending rate.

    WebSocket server implementations often allow for rate-limited messages using libraries like socket.io, ws (for Node.js), or custom flow-control mechanisms.

**NOTE =>**
Most WebSocket libraries allow you to customize how you want to handle backpressure. Some libraries, like socket.io (for Node.js), provide built-in backpressure mechanisms, but for others, you may need to implement your own mechanisms.

### 4.🔐 Security Concerns

#### Anyone can try to connect

Because WebSockets don’t enforce CORS, any website can try to open a WebSocket connection to your server from a user’s browser.

This means your server needs to check who’s connecting and whether to allow it.

#### Origin header check is important

Browsers send the Origin header automatically when opening a WebSocket.

Your server should look at this header and only accept connections from trusted websites.

If you don’t check this, bad websites can connect and maybe misuse your service.

#### Use Secure WebSockets (WSS)

Just like HTTPS, use WSS (WebSocket Secure) so the connection is encrypted.

This keeps data private and safe from eavesdroppers or man-in-the-middle attacks.

# Authentication and Authorization

WebSockets don’t have built-in login or permission checks.

You need to implement your own way to make sure the user is allowed to use the connection (e.g., tokens, cookies).

Otherwise, anyone who knows the URL could connect.

Here’s a **clear, concise summary of WebSocket authentication**, especially in browser vs backend contexts:

`REST APIs → safe to send auth headers because browser enforces CORS.`

`WebSocket in browsers → cannot send headers because it’s persistent and bypassing headers could leak credentials or allow cross-site attacks.`

## **1. Why Authentication is Needed**

* WebSockets are **stateful and long-lived**, so the server must verify the client before processing messages.
* Unauthenticated connections can lead to **data leaks, unauthorized actions, or abuse**.

---

## **2. Browser Clients**

* **Cannot set custom headers** (`Authorization`) due to **security restrictions** (prevent CSRF and credential leaks).
* Recommended methods:

 **Send token in the first message after connection** (preferred):

     ```js
     socket.onopen = () => {
       socket.send(JSON.stringify({ type: "auth", token: "YOUR_JWT" }));
     };
     ```

  2. **Use cookies/session tokens** (if same origin)
  3. **Short-lived query parameters** (`wss://example.com/socket?token=XYZ`) — less secure

 


### 5. ♻️ Reconnection Strategies

Due to network interruptions, server restarts, proxies, or mobile switching networks — WebSocket connections can drop unexpectedly.

1. Basic Reconnection Logic

```js
let socket;
let reconnectDelay = 1000; // start with 1 second

function connect() {
  socket = new WebSocket("wss://example.com/socket");

  socket.onopen = () => {
    console.log("Connected!");
    reconnectDelay = 1000; // reset delay
  };

  socket.onmessage = (event) => {
    console.log("Message:", event.data);
  };

  socket.onclose = (event) => {
    console.log("Disconnected. Trying to reconnect...");
    setTimeout(connect, reconnectDelay);                  // calling connect for reconnection
    reconnectDelay = Math.min(reconnectDelay * 2, 30000); // Exponential backoff (max 30 sec)
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
    socket.close(); // Trigger onclose
  };
}

connect();
```

2. Keepalive and Heartbeats

Send small messages (e.g., ping) every few seconds

If no reply is received, assume connection is dead and reconnect

```js
let heartbeatInterval;

socket.onopen = () => {
  heartbeatInterval = setInterval(() => {
    socket.send(JSON.stringify({ type: "ping" }));
  }, 10000); // every 10s
};

socket.onclose = () => {
  clearInterval(heartbeatInterval);
  // Try reconnecting
};
```

3. Session Resumption (Optional)

Store some session state (like auth tokens or IDs)

On reconnect, resume where the user left off

Prevents losing messages or user context

Example:
```js
socket.onopen = () => {
  socket.send(JSON.stringify({ type: "resume", sessionId }));
};
```

### 6. 🧱 Multiplexing / Message Routing

Multiplexing refers to using a single WebSocket connection to handle multiple logical communication channels or topics (like rooms, services, streams, etc.).

**Concept:** Single WebSocket Connection with Multiplexing

**Problem:** Opening multiple WebSocket connections (e.g., one for chat, one for notifications, one for analytics) is resource-heavy and can hit browser or server limits.

**Solution:** Open one WebSocket connection and send messages with a channel/module/type identifier.

Each message carries metadata to indicate which “logical socket” it belongs to.

```json
{
  "type": "subscribe",
  "channel": "stocks",
  "payload": {
    "symbol": "AAPL"
  }
}
//OR
{
  "channel": "chat",
  "event": "newMessage",
  "data": { "user": "Alice", "message": "Hello!" }
}

```

```js
const socket = new WebSocket("ws://example.com");

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  switch (msg.channel) {
    case "chat":
      handleChat(msg.data);
      break;
    case "notifications":
      handleNotification(msg.data);
      break;
    case "analytics":
      handleAnalytics(msg.data);
      break;
    default:
      console.warn("Unknown channel:", msg.channel);
  }
};
```

```js
// To publish a message
socket.send(JSON.stringify({
  type: 'publish',
  channel: 'stocks',
  payload: { symbol: 'AAPL', price: 178.4 }
}));
```


### 7. 📊 Compression Extensions(Backend Part)(browser handles by default)

#### How It works?

WebSocket messages can contain a lot of repetitive or large data (e.g., JSON, binary, chat messages). To save bandwidth and improve performance, the WebSocket protocol supports compression using an extension called:

`permessage-deflate`

This allows the individual messages (not the whole stream) to be compressed before being sent and decompressed on the receiving end.

`Benefits:`

Reduces message size dramatically (especially for text/JSON).

Saves bandwidth.

Faster transmission over slow or mobile networks.


### 8. 🧩 Using WebSocket with Authentication

1. Authenticate during handshake (best way)

Send a token (e.g., JWT) as a query parameter or header when opening the WebSocket.

Server reads and verifies this token before accepting the connection.

2. Use WSS (secure WebSocket)

Always use encrypted connections to protect tokens from being intercepted.

3. Don’t trust client data blindly

Always validate tokens or sessions on the server side.


