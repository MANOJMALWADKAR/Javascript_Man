
# Part 10: TypedArrays - High-Performance Binary Data

## 🎯 What Are TypedArrays?

TypedArrays are **specialized array-like objects** designed for handling **binary data** with maximum performance. Think of them as **direct access to raw memory** - like working with arrays in C/C++.

### Simple Comparison:
```js
// Regular array - flexible but slower
const regular = [1, "hello", 3.14, {}, null];  // Can hold anything

// TypedArray - fixed type, super fast
const typed = new Int32Array([1, 2, 3, 4, 5]); // Only 32-bit integers
```

### Why TypedArrays Exist:
- **Performance**: 2-10x faster than regular arrays for numeric data
- **Memory Control**: Exact byte-level control over data
- **Web APIs**: Required for Canvas, WebGL, Web Audio, WebAssembly
- **Binary Data**: Perfect for files, network protocols, image processing

## 📊 Complete TypedArray Reference

| Type | Size | Range | Best For |
|------|------|-------|----------|
| `Int8Array` | 1 byte | -128 to 127 | Small integers, flags |
| `Uint8Array` | 1 byte | 0 to 255 | Bytes, raw data, text |
| `Uint8ClampedArray` | 1 byte | 0 to 255 (clamped) | Canvas pixels (RGBA) |
| `Int16Array` | 2 bytes | -32,768 to 32,767 | Audio samples, coordinates |
| `Uint16Array` | 2 bytes | 0 to 65,535 | Unicode, positive integers |
| `Int32Array` | 4 bytes | -2³¹ to 2³¹-1 | Large integers, IDs |
| `Uint32Array` | 4 bytes | 0 to 2³²-1 | Large positive integers |
| `Float32Array` | 4 bytes | ±1.2×10⁻³⁸ to ±3.4×10³⁸ | Graphics, games, 3D |
| `Float64Array` | 8 bytes | ±5.0×10⁻³²⁴ to ±1.8×10³⁰⁸ | Scientific computing |
| `BigInt64Array` | 8 bytes | -2⁶³ to 2⁶³-1 | Very large integers |
| `BigUint64Array` | 8 bytes | 0 to 2⁶⁴-1 | Huge positive integers |

## 🔧 Creating TypedArrays

### Method 1: From Length (Most Common)
```js
const numbers = new Int32Array(10);        // 10 elements, all zeros
const floats = new Float64Array(1000);     // 1000 elements, all zeros
const bytes = new Uint8Array(256);         // 256 bytes, all zeros

console.log(numbers); // Int32Array [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

### Method 2: From Regular Array
```js
const data = [1, 2, 3, 4, 5];
const typed = new Int32Array(data);
console.log(typed); // Int32Array [1, 2, 3, 4, 5]

// Works with any iterable
const fromSet = new Float32Array(new Set([1.1, 2.2, 3.3]));
```

### Method 3: From ArrayBuffer (Advanced)
```js
const buffer = new ArrayBuffer(16);        // 16 bytes of raw memory
const int32View = new Int32Array(buffer);  // View as 4 × 32-bit integers
const uint8View = new Uint8Array(buffer);  // View as 16 × 8-bit bytes

int32View[0] = 42;
console.log(uint8View.slice(0, 4)); // See the bytes that make up 42
```

### Method 4: Direct Values
```js
const coords = new Float32Array([1.5, 2.7, 3.2]);
const flags = new Uint8Array([1, 0, 1, 1, 0]);
```

## 🚀 Performance Comparison

```js
// Test: Sum 1 million numbers
const size = 1000000;

// Regular Array Test
const regular = new Array(size);
for (let i = 0; i < size; i++) regular[i] = i;

console.time('Regular Array');
let sum1 = 0;
for (let i = 0; i < regular.length; i++) {
  sum1 += regular[i];
}
console.timeEnd('Regular Array'); // ~50ms

// TypedArray Test
const typed = new Int32Array(size);
for (let i = 0; i < size; i++) typed[i] = i;

console.time('TypedArray');
let sum2 = 0;
for (let i = 0; i < typed.length; i++) {
  sum2 += typed[i];
}
console.timeEnd('TypedArray'); // ~15ms (3x faster!)

// Memory Usage
console.log('Regular array memory:', regular.length * 8, 'bytes (estimated)');
console.log('TypedArray memory:', typed.byteLength, 'bytes (exact)');
```

## 🎨 Real-World Examples

### 1. Image Processing (Canvas)
```js
function brightenImage(canvas, amount = 50) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data; // Uint8ClampedArray [R,G,B,A,R,G,B,A,...]

  // Increase brightness for all pixels
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] += amount;     // Red
    pixels[i + 1] += amount; // Green
    pixels[i + 2] += amount; // Blue
    // pixels[i + 3] is Alpha - keep unchanged
  }

  ctx.putImageData(imageData, 0, 0);
}

// Convert image to grayscale
function toGrayscale(canvas) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const gray = pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;
    pixels[i] = gray;     // Red
    pixels[i + 1] = gray; // Green
    pixels[i + 2] = gray; // Blue
  }

  ctx.putImageData(imageData, 0, 0);
}
```

### 2. Audio Processing (Web Audio API)
```js
// Create white noise
function generateWhiteNoise(duration, sampleRate = 44100) {
  const samples = duration * sampleRate;
  const buffer = new Float32Array(samples);

  for (let i = 0; i < samples; i++) {
    buffer[i] = (Math.random() * 2 - 1) * 0.1; // -0.1 to 0.1
  }

  return buffer;
}

// Apply low-pass filter
function lowPassFilter(audioData, cutoff = 0.1) {
  const filtered = new Float32Array(audioData.length);
  filtered[0] = audioData[0];

  for (let i = 1; i < audioData.length; i++) {
    filtered[i] = filtered[i - 1] + cutoff * (audioData[i] - filtered[i - 1]);
  }

  return filtered;
}

// Mix two audio channels
function mixAudio(channel1, channel2, mix = 0.5) {
  const result = new Float32Array(Math.max(channel1.length, channel2.length));

  for (let i = 0; i < result.length; i++) {
    const sample1 = i < channel1.length ? channel1[i] : 0;
    const sample2 = i < channel2.length ? channel2[i] : 0;
    result[i] = sample1 * (1 - mix) + sample2 * mix;
  }

  return result;
}
```

### 3. Mathematical Computations
```js
// Fast matrix multiplication
function multiplyMatrices(a, b, size) {
  const result = new Float64Array(size * size);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let sum = 0;
      for (let k = 0; k < size; k++) {
        sum += a[i * size + k] * b[k * size + j];
      }
      result[i * size + j] = sum;
    }
  }

  return result;
}

// Vector operations
class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.data = new Float32Array([x, y, z]);
  }

  get x() { return this.data[0]; }
  get y() { return this.data[1]; }
  get z() { return this.data[2]; }

  add(other) {
    return new Vector3(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    );
  }

  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}
```

### 4. Binary Data Parsing
```js
// Parse a binary file format
function parseBinaryFile(arrayBuffer) {
  // Header: 4 × 32-bit integers
  const header = new Uint32Array(arrayBuffer, 0, 4);

  // Data: rest as float values
  const dataOffset = 16; // 4 × 4 bytes
  const data = new Float32Array(arrayBuffer, dataOffset);

  return {
    version: header[0],
    length: header[1],
    checksum: header[2],
    flags: header[3],
    values: Array.from(data) // Convert to regular array if needed
  };
}

// Create binary data
function createBinaryFile(values) {
  const headerSize = 16; // 4 × 32-bit integers
  const dataSize = values.length * 4; // Float32 = 4 bytes each
  const buffer = new ArrayBuffer(headerSize + dataSize);

  // Write header
  const header = new Uint32Array(buffer, 0, 4);
  header[0] = 1; // version
  header[1] = values.length; // length
  header[2] = 0; // checksum (placeholder)
  header[3] = 0; // flags

  // Write data
  const data = new Float32Array(buffer, headerSize);
  for (let i = 0; i < values.length; i++) {
    data[i] = values[i];
  }

  return buffer;
}
```

### 5. Network Protocol Handling
```js
// Parse network packet
function parsePacket(buffer) {
  const view = new DataView(buffer);

  return {
    packetType: view.getUint8(0),
    length: view.getUint16(1, true), // true = little-endian
    timestamp: view.getUint32(3, true),
    data: new Uint8Array(buffer, 7) // Rest is payload
  };
}

// Create network packet
function createPacket(type, data) {
  const headerSize = 7;
  const buffer = new ArrayBuffer(headerSize + data.length);
  const view = new DataView(buffer);

  view.setUint8(0, type);
  view.setUint16(1, data.length, true);
  view.setUint32(3, Date.now(), true);

  const payload = new Uint8Array(buffer, headerSize);
  payload.set(data);

  return buffer;
}
```

## 🧠 ArrayBuffer: The Foundation

TypedArrays are **views** of an **ArrayBuffer** (raw memory):

```js
// Create 24 bytes of raw memory
const buffer = new ArrayBuffer(24);

console.log('Buffer size:', buffer.byteLength); // 24

// Different views of the same memory
const asInts = new Int32Array(buffer);      // 6 × 32-bit integers
const asFloats = new Float32Array(buffer);  // 6 × 32-bit floats
const asBytes = new Uint8Array(buffer);     // 24 × 8-bit bytes

// Modify through one view
asInts[0] = 1234567890;

// See the change in other views (same memory!)
console.log('As float:', asFloats[0]);     // Same bits as float
console.log('As bytes:', asBytes.slice(0, 4)); // The 4 bytes

// Multiple views can coexist
const first12Bytes = new Uint8Array(buffer, 0, 12);
const last12Bytes = new Uint8Array(buffer, 12, 12);
```

## 🔄 Converting Between Types

### Regular Array ↔ TypedArray
```js
const regular = [1, 2, 3, 4, 5];

// To TypedArray
const typed = new Int32Array(regular);
const typed2 = Int32Array.from(regular);

// Back to Regular Array
const backToRegular = Array.from(typed);
const backToRegular2 = [...typed];
```

### TypedArray ↔ TypedArray
```js
const ints = new Int32Array([1, 2, 3]);

// Copy data (creates new buffer)
const floats = new Float32Array(ints);

// Share buffer (same memory, different view)
const bytes = new Uint8Array(ints.buffer);

// Convert with transformation
const doubled = new Int32Array(ints.map(x => x * 2));
```

### String ↔ Uint8Array (Text Data)
```js
const text = "Hello, 世界! 🌍";

// String → Uint8Array (UTF-8)
const encoder = new TextEncoder();
const bytes = encoder.encode(text);
console.log(bytes); // Uint8Array with UTF-8 bytes

// Uint8Array → String
const decoder = new TextDecoder();
const decoded = decoder.decode(bytes);
console.log(decoded); // "Hello, 世界! 🌍"

// Manual conversion for ASCII only
function stringToBytes(str) {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
```

## ⚡ Performance Optimization Tips

### 1. Choose the Right Type
```js
// ✅ Use smallest type that fits your data
const pixels = new Uint8Array(imageData);       // 0-255 range
const audioSamples = new Float32Array(samples); // Need decimals
const userIds = new Uint32Array(ids);           // Large positive numbers
const coordinates = new Float64Array(coords);    // High precision needed
```

### 2. Preallocate Size
```js
// ✅ FAST - Preallocated
const data = new Float32Array(1000000);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.random();
}

// ❌ SLOW - Can't grow TypedArrays dynamically
// Must create new one if size changes
```

### 3. Batch Operations
```js
// ✅ Process in chunks for better cache performance
function processLargeArray(data, chunkSize = 1000) {
  for (let start = 0; start < data.length; start += chunkSize) {
    const end = Math.min(start + chunkSize, data.length);

    // Process chunk
    for (let i = start; i < end; i++) {
      data[i] = Math.sqrt(data[i] * data[i] + 1);
    }
  }
}
```

### 4. Use set() for Copying
```js
// ✅ FAST - Built-in copy method
const source = new Float32Array([1, 2, 3, 4, 5]);
const target = new Float32Array(10);

target.set(source, 2); // Copy source to target starting at index 2
console.log(target); // [0, 0, 1, 2, 3, 4, 5, 0, 0, 0]

// ✅ Copy part of array
const partial = source.subarray(1, 4); // [2, 3, 4] (view, not copy)
const copy = source.slice(1, 4);       // [2, 3, 4] (new array)
```

## 🎯 TypedArray Methods

### Basic Methods
```js
const arr = new Int32Array([10, 20, 30, 40, 50]);

// Length and indexing (like regular arrays)
console.log(arr.length);    // 5
console.log(arr[2]);        // 30
arr[2] = 35;               // Set value

// Array-like methods
arr.forEach((val, idx) => console.log(idx, val));
const doubled = arr.map(x => x * 2);                    // Returns regular Array!
const filtered = arr.filter(x => x > 25);               // Returns regular Array!
const sum = arr.reduce((acc, val) => acc + val, 0);

// TypedArray specific methods
const subset = arr.subarray(1, 4);      // Int32Array [20, 35, 40] (view)
const copy = arr.slice(1, 4);           // Int32Array [20, 35, 40] (copy)

// Filling and copying
arr.fill(99);                           // Fill with 99
arr.fill(0, 2, 4);                     // Fill indices 2-3 with 0

const source = new Int32Array([1, 2, 3]);
arr.set(source, 1);                    // Copy source to arr starting at index 1
```

### Buffer Information
```js
const arr = new Int32Array(10);

console.log(arr.buffer);               // The underlying ArrayBuffer
console.log(arr.byteLength);           // Total bytes (40 for 10 × 4-byte ints)
console.log(arr.byteOffset);           // Offset in buffer (0)
console.log(arr.BYTES_PER_ELEMENT);    // 4 (bytes per element)
```

## 🔍 Memory Layout Deep Dive

```js
// Understanding how different views share memory
const buffer = new ArrayBuffer(16);

const view1 = new Int32Array(buffer);    // 4 × 32-bit integers
const view2 = new Uint16Array(buffer);   // 8 × 16-bit integers
const view3 = new Uint8Array(buffer);    // 16 × 8-bit bytes

// Write a value
view1[0] = 0x12345678; // Hexadecimal number

// See how it appears in other views
console.log('32-bit view:', view1[0]);           // 305419896 (decimal)
console.log('16-bit view:', view2[0], view2[1]); // Shows high/low 16 bits
console.log('8-bit view:', view3.slice(0, 4));   // Shows individual bytes

// Endianness matters!
const dataView = new DataView(buffer);
dataView.setInt32(4, 0x12345678, true);  // Little-endian
dataView.setInt32(8, 0x12345678, false); // Big-endian

console.log('Little-endian bytes:', view3.slice(4, 8));
console.log('Big-endian bytes:', view3.slice(8, 12));
```

## 🚨 Common Pitfalls

### 1. Fixed Size
```js
// ❌ Can't resize TypedArrays
const arr = new Int32Array(5);
// arr.push(6); // Error! No push method
// arr.length = 10; // Error! Can't change length

// ✅ Create new array if you need different size
function resizeTypedArray(arr, newSize) {
  const newArr = new arr.constructor(newSize);
  newArr.set(arr.subarray(0, Math.min(arr.length, newSize)));
  return newArr;
}
```

### 2. Type Coercion
```js
const arr = new Uint8Array(5);

arr[0] = 300;        // Becomes 44 (300 % 256)
arr[1] = -10;        // Becomes 246 (256 - 10)
arr[2] = 3.14;       // Becomes 3 (truncated)

console.log(arr);    // [44, 246, 3, 0, 0]

// ✅ Clamped array prevents overflow
const clamped = new Uint8ClampedArray(5);
clamped[0] = 300;    // Becomes 255 (clamped)
clamped[1] = -10;    // Becomes 0 (clamped)
console.log(clamped); // [255, 0, 0, 0, 0]
```

### 3. Array Methods Return Regular Arrays
```js
const typed = new Int32Array([1, 2, 3, 4, 5]);

const mapped = typed.map(x => x * 2);      // Regular Array [2, 4, 6, 8, 10]
const filtered = typed.filter(x => x > 2); // Regular Array [3, 4, 5]

// ✅ To keep as TypedArray
const mappedTyped = new Int32Array(typed.map(x => x * 2));
```

## 🎯 When to Use TypedArrays

### ✅ **Perfect For:**
- **Binary data processing** (files, protocols)
- **Image manipulation** (Canvas, WebGL)
- **Audio processing** (Web Audio API)
- **Mathematical computations** (3D graphics, simulations)
- **Performance-critical numeric operations**
- **WebAssembly interfaces**
- **Large datasets** with consistent numeric types

### ❌ **Not Good For:**
- **Mixed data types** (strings, objects, different numbers)
- **Small datasets** (< 1000 elements)
- **Dynamic size requirements**
- **General application logic**
- **Data that changes type frequently**

## 💡 Key Takeaways

1. **TypedArrays provide direct memory access** - no V8 optimization needed
2. **Fixed size and type** - can't grow or hold mixed data
3. **2-10x faster** than regular arrays for numeric operations
4. **Essential for modern web APIs** - Canvas, WebGL, Web Audio, WebAssembly
5. **Memory efficient** - exact byte control, predictable usage
6. **Choose the right type** - use smallest that fits your data range
7. **Great for binary data** - files, network protocols, image/audio processing

**Bottom Line:** TypedArrays are your go-to tool when you need **maximum performance** for **numeric data** and **binary operations**!

# Part 11: What You Can Learn Next

    If you're excited about this, here's what you can explore next:
    V8 Source Code (learn how JavaScript is compiled to machine code)
    Benchmarking tools like Chrome DevTools, or Node.js --trace-opt
    JS engines comparison (SpiderMonkey vs V8 vs JavaScriptCore)
