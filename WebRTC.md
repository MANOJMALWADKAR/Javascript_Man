# What is WebRTC?

WebRTC is an open web standard enabling real-time peer-to-peer communication directly between browsers and devices. It supports:
   
   - Audio calls
   - Video calls
   - Arbitrary data channels (file sharing, gaming, messaging)

Key point: WebRTC enables direct communication without relaying media through central servers, reducing latency and bandwidth costs.

## Core Componenets of WebRTC

| Component             | Purpose                                                                               |
| --------------------- | ------------------------------------------------------------------------------------- |
| **getUserMedia**      | Access local media devices (camera, mic)                                              |
| **RTCPeerConnection** | Establish and maintain peer-to-peer connection                                        |
| **RTCDataChannel**    | Send arbitrary data directly between peers                                            |
| **Signaling**         | Exchange metadata (SDP, ICE candidates) to establish connection (outside WebRTC spec) |


## How WebRTC Works: The Signaling Process

WebRTC itself does NOT specify signaling. The signaling channel (usually via WebSocket, HTTP, or any real-time transport) is used for peers to exchange connection setup information:

1. Offer/Answer (SDP - Session Description Protocol)

    One peer creates an offer describing its capabilities and sends it.

    The other responds with an answer.

2. ICE Candidates

    Both peers gather network addresses (IP + port combos) they can use to connect.

    Exchange these ICE candidates via signaling channel.

3. NAT Traversal

    STUN servers help discover public IPs behind NAT/firewalls.

    TURN servers relay traffic when direct peer-to-peer fails.

## Key WebRTC APIs

1. `getUserMedia()` Request to access camera/microphone

```js
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    document.querySelector('video#localVideo').srcObject = stream;
  })
  .catch(err => console.error('Media error:', err));
```

2. `RTCPeerConnection` Core API for managing the peer connection

```js
const peerConnection = new RTCPeerConnection(configuration);
```

Configuration includes ICE servers (STUN/TURN).

3. `RTCDataChannel` Enables arbitrary bidirectional data transfer over the same peer connection.

```js
const dataChannel = peerConnection.createDataChannel('chat');
dataChannel.onmessage = (event) => {
  console.log('Received:', event.data);
};
```

## . ICE (Interactive Connectivity Establishment)

Mechanism to find the best path between peers.

Works with:

    STUN servers: Help discover public IP and port.

    TURN servers: Relay data if direct connection fails.


## NAT Traversal

Most users are behind NAT (private IP addresses). WebRTC must:

    Discover public-facing IP and port.

    Connect through firewalls.

    Use TURN as fallback relay.


## Security

    All WebRTC connections are encrypted by design (DTLS for data, SRTP for media).

    Permissions required for camera/microphone access.

    Origin and user consent protect from unauthorized spying.

    ICE candidates are exchanged securely via signaling.


## Use Cases Beyond Video Chat

    File sharing (using RTCDataChannel)

    Real-time gaming

    Live collaboration tools

    Remote desktop sharing

    IoT device communication


## Code For WebRTC COnnection

`Signaling`
```js
const socket = new WebSocket('ws://' + location.host);
```

`PEER CONNECTION`
```js
const peer = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' } // Public STUN server
  ]
});
```

`Get Media`
```js
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localVideo.srcObject = stream;

    // Add tracks to connection
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
  })
  .catch(err => console.error("Error getting media:", err));
```

`Ice Candidate Handling`
```js
peer.onicecandidate = ({ candidate }) => {
  if (candidate) {
    socket.send(JSON.stringify({ type: 'ice', candidate }));
  }
};
```

`Receive Remote Media`
```js
peer.ontrack = ({ streams: [stream] }) => {
  remoteVideo.srcObject = stream;
};
```

`Handle Incoming WebSocket Messages`
```js
socket.onmessage = async ({ data }) => {
  const msg = JSON.parse(data);

  if (msg.type === 'offer') {
    await peer.setRemoteDescription(new RTCSessionDescription(msg.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    socket.send(JSON.stringify({ type: 'answer', answer }));

  } else if (msg.type === 'answer') {
    await peer.setRemoteDescription(new RTCSessionDescription(msg.answer));

  } else if (msg.type === 'ice') {
    try {
      await peer.addIceCandidate(new RTCIceCandidate(msg.candidate));
    } catch (e) {
      console.warn("Error adding ICE candidate:", e);
    }

  } else if (msg.type === 'message') {
    showMessage(`Peer: ${msg.text}`);
  }
};
```

`Create Offer if Caller`
```js
socket.onopen = async () => {
  if (location.hash === '#caller') {
    // Create data channel before creating offer
    setupDataChannel(peer.createDataChannel("chat"));

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.send(JSON.stringify({ type: 'offer', offer }));
  }
};
```

`Receive Data Channel from Callee`
```js
peer.ondatachannel = (event) => {
  setupDataChannel(event.channel);
};
```

`Data Channel Setup`
```js
let dataChannel;

function setupDataChannel(channel) {
  dataChannel = channel;

  dataChannel.onopen = () => {
    console.log("Data channel is open");
  };

  dataChannel.onmessage = (event) => {
    showMessage(`Peer: ${event.data}`);
  };
}
```

`Send Message`
```js
function sendMessage() {
  const text = messageInput.value;
  if (dataChannel && dataChannel.readyState === "open") {
    dataChannel.send(text);
    showMessage(`You: ${text}`);
    messageInput.value = '';
  }
}
```

`Display Chat Messages`
```js
function showMessage(msg) {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
}
```


## WebRTC Key Terms and Operations

### 1. Signalling

Signaling is the process of exchanging connection information between peers before a WebRTC connection is established.

What is exchanged?

    SDP (Session Description Protocol): Describes media capabilities (audio/video codecs, etc.).

    ICE candidates: Network info to help peers find the best way to connect.

Signaling is not built into WebRTC — you have to implement it yourself, usually using:

    WebSocket (most common)

    HTTP

### 2. Peer Connection

A RTCPeerConnection is the core WebRTC object that manages a direct P2P connection between two browsers/devices.

What it does:

    Handles media tracks (audio/video)

    Manages ICE negotiation

    Supports RTCDataChannel

    Securely transmits real-time data


### 3. ICE Candidate Handling

ICE (Interactive Connectivity Establishment) is a method used to find the best route to connect two peers, even behind NATs or firewalls.

📦 ICE candidates are:

    IP addresses + ports (local, public, relay)

    Sent during the connection negotiation

Why needed?

    Because peers may be behind routers/firewalls. ICE tries:

        Local IP

        STUN (public IP)

        TURN (relay server) — fallback

### 4. Receive Remote Media

When the remote peer adds their media (camera/mic) to the connection, you receive it via ontrack event.

This is how you display the other person’s video/audio in your UI.

### 5. Handling Incoming WebSocket Messages

When the other peer sends signaling data (offer, answer, or ICE candidate), you receive it as a WebSocket message.

### 6. Create Offer

The first peer (the caller) creates an SDP offer to start the connection.

```js
const offer = await peer.createOffer();
await peer.setLocalDescription(offer);
socket.send(JSON.stringify({ type: 'offer', offer }));
```

Why it matters:

The offer tells the other peer:

    I want to connect

    Here's my media & connection details


### 7. Receive Data Channel

The callee (non-caller) receives the RTCDataChannel when the caller creates it.

```js
peer.ondatachannel = (event) => {
  const channel = event.channel;
  channel.onmessage = (e) => console.log("Peer sent:", e.data);
};
```

Only the initiator creates the channel — the other side waits to receive it.

### 8. Data Channel Setup

The RTCDataChannel lets you send text, JSON, files, etc. directly between peers (P2P).

```js
const channel = peer.createDataChannel("chat");
channel.onopen = () => console.log("Ready to send messages");
channel.onmessage = (e) => console.log("Message:", e.data);
```

It allows real-time messaging or file sharing with no server (after connection is established)

### 9. Send Message

Use the data channel to send messages to the connected peer.

```js
channel.send("Hello!");
```

dataChannel.readyState must be "open" before sending.

You can send:

    Strings

    Blobs

    ArrayBuffers

