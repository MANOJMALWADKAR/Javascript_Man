
## Part 2: Array Methods(Beginner Level)

### 📦 Adding/Removing Elements in Arrays

| Method     | What it does                          | Example               |

|------------|---------------------------------------|-----------------------|
| `push()`   | Adds an element at the end            | `arr.push('item')`    |
| `pop()`    | Removes an element from the end       | `arr.pop()`           |
| `unshift()`| Adds an element at the beginning      | `arr.unshift('item')` |
| `shift()`  | Removes an element from the beginning | `arr.shift()`         |

### Example:
```js
let animals = ['dog', 'cat'];
animals.push('bird');     // ['dog', 'cat', 'bird']
animals.shift();          // ['cat', 'bird']

animals.pop();            // ['bird']
animals.unshift('lion')   // ['lion', 'bird']
```

