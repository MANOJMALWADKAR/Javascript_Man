# JavaScript Classes

- **What is it?**  
  A **class** in JavaScript is a blueprint for creating objects that share properties and methods. It provides a clear, structured syntax for working with objects.

- **When introduced?**  
  Classes were introduced in **ES6 (2015)** to make working with prototypes easier and more readable.

- **How does it work under the hood?**  
  Despite the familiar `class` syntax, JavaScript classes are essentially **syntactic sugar** over the existing **prototype-based inheritance** system.

## Basic Syntax of a Class

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const p1 = new Person("Alice", 30);
p1.greet();  // Hello, my name is Alice

- constructor() is a special method used for creating and initializing objects.

- greet() is an instance method; its shared across all instances.
```

### Constructor

- Special function **used to create and initialize objects** when using classes or function constructors.

1. Constructor in a Class

- When you use the class syntax, the constructor method is a special method for creating and initializing an object created with that class.

## JavaScript Class Example with Explanation

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person1 = new Person('Alice', 30);
person1.greet();  // Output: Hello, my name is Alice and I am 30 years old.

- The constructor method is called automatically when you create a new instance of the class using new.

- Inside the constructor, this refers to the newly created object.

- You set properties on this to define instance-specific data (name, age).

- Methods like greet() are shared on the prototype and can access instance properties via this.

```


2. Constructor in Function (Pre-ES6)

## Function Constructor (Pre-ES6 way)

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

const person1 = new Person('Bob', 25);
person1.greet();  // Output: Hello, my name is Bob and I am 25 years old.
```

## Structure of a JavaScript Class

### Constructor Method

- Initializes object properties.
- Called automatically when new ClassName() is used.

```js
constructor(param1, param2) {
  this.prop1 = param1;
  this.prop2 = param2;
}
```

### Instance Fields and Methods

- These are tied to individual instances of the class.

```js
class Animal {
  sound = "Generic Sound"; // instance field

  speak() {                // instance method
    console.log(this.sound);
  }
}
```

### Static Properties and Methods

- These belong to the class itself, not to instances.

```js
class MathUtil {
  static PI = 3.14;

  static square(x) {
    return x * x;
  }
}

console.log(MathUtil.square(5)); // 25
console.log(MathUtil.PI);        // 3.14

```

**Instance methods cannot directly access static fields or static methods using this because this refers to the instance, not the class But they can access them via the class name or this.constructor.**


### PRivate Fields and methods

- Using # makes properties/methods private — not accessible outside the class.

```js
class Counter {
  #count = 0;

  increment() {
    this.#count++;
    console.log(this.#count);
  }
}

const c = new Counter();
c.increment(); // 1
// console.log(c.#count); // ❌ SyntaxError
```

### Inheritance: extends and super

- You can create a new class based on another.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // calls Animal's constructor
  }

  speak() {
    super.speak(); // calls Animal's speak
    console.log(`${this.name} barks`);
  }
}

const d = new Dog("Rex");
d.speak();
// Output:
// Rex makes a noise
// Rex barks
```

### Class Expression

- You can also define classes in expressions, not just declarations.

```js
const MyClass = class {
  sayHi() {
    console.log("Hi");
  }
};

const obj = new MyClass();
obj.sayHi(); // Hi
```

# features and concepts related to classes in modern JavaScript (ES6+):

## Class Declaration

```js
class Person {
  constructor(name) {
    this.name = name
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`)
  }
}
```

## Constructor Method

- Special method called when a new instance is created.
- Only one constructor() allowed per class.
- Used to initialize properties.
```js
const p = new Person("Alice")
```

## Instance Properties

- Set in the constructor() or directly in the class body:
```js
class Person {
  name = "Default" // public instance property

  constructor(name,age) {
    this.name = name
    this.age = age
  }
}
```
**if we do this name = "Default" then where it belongs to class or instance that we are going to create from class**

- name is a public instance field. It is not static; each instance of Person will have its own name property.

- At the time an instance is constructed, after super() in subclass or at beginning of constructor, this name field is initialized to "Default" unless you override it.

```js
class Person {
  name = "Default";
}

const p1 = new Person();
console.log(p1.name); // "Default"
p1.name = "Alice";
console.log(p1.name); // "Alice"

const p2 = new Person();
console.log(p2.name); // still "Default" (different instance)

So name = "Default" belongs to instances, not to the class. If you wanted it to belong to the class, you'd use static.
```

## Instance Methods

- Methods available on instances of the class:

```js
class Person {
  greet() {
    console.log("Hello")
  }
}

Call With
const p = new Person()
p.greet()

```

## Static Properties and Methods

- Belong to the class, not instances.
- Declared with static.
```js
class MathUtil {
  static PI = 3.14159

  static square(n) {
    return n * n
  }
}

MathUtil.square(5) // 25
MathUtil.PI        // 3.14159
```


**Static properties and methods: can instances use them?**

- Static methods / fields are declared with static. They belong to the class itself, not to the instances.

```js
class Utils {
  static version = "1.0";

  static hello() {
    console.log("Hello from Utils");
  }
}

console.log(Utils.version);       // "1.0"
Utils.hello();                   // works

const u = new Utils();
console.log(u.version);          // undefined
console.log(typeof u.hello);     // "undefined"

- Instances do not automatically have static members. They can access them only if you explicitly reference the class (e.g. Utils.version), not via the instance.
```

## Private Fields and Methods (ES2022)

- Use # to declare private members.
- Not accessible outside the class.
```js
class Person {
  #secret = "hidden"

  #whisper() {
    return "shhh"
  }

  reveal() {
    console.log(this.#secret)
    console.log(this.#whisper())
  }
}

const p = new Person()
p.reveal()       // ✅ Works
// p.#secret     // ❌ SyntaxError
```

**Private members and inheritance: can subclasses access them?**

- Private elements are declared inside a class with #, e.g. #secret, #doSomething().

- They are accessible only from within the class that defines them, not from outside, and not from subclasses. If a subclass tries to access #secret of its parent, it’s a syntax error.

```js
class Parent {
  #secret = 42;

  getSecret() {
    return this.#secret;
  }
}

class Child extends Parent {
  revealParentSecret() {
    // return this.#secret; // SyntaxError! Cannot access private field declared in Parent
  }
}

const p = new Parent();
console.log(p.getSecret());  // 42

const c = new Child();
console.log(c.getSecret());  // also 42 via parent method

- So private members belong only to the class where they are declared; subclasses inherit the data (they “exist” in the object) but cannot reference them directly in code.

```

## Inheritance (Extending Classes)

- Use extends and super() to inherit behavior from another class:
```js
class Animal {
  speak() {
    console.log("Generic sound")
  }
}

class Dog extends Animal {
  speak() {
    super.speak()
    console.log("Bark")
  }
}

const d = new Dog()
d.speak()
// Output:
// Generic sound
// Bark
```

**Using super, what it can do, what superclass can do**

- super is used in class inheritance in JavaScript. It has two main uses:

### In Constructors: 

- If you have a subclass, you must call super(...) before using this. super(...) invokes the constructor of the superclass.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Employee extends Person {
  constructor(name, salary) {
    super(name);
    this.salary = salary;
  }
}
```

### Calling superclass methods / accessing superclass methods / fields:

- methods of the subclass, you can call super.methodName(...). This calls the method from the superclass.

```js
class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  speak() {
    super.speak();   // calls Animal.speak()
    console.log("Dog barks");
  }
}

new Dog().speak();
// Output:
// Animal speaks
// Dog barks
```

**Instance methods: this refers to the instance on which the method is called.**

**Static methods: this refers to the class (the constructor function itself), not to instances.**

## Class Expressions

- Classes can also be declared as expressions:
```js
const MyClass = class {
  sayHi() {
    console.log("Hi")
  }
}
```

## Abstract-like Behavior (via convention)

- JavaScript doesn't have true abstract classes, but you can simulate them:
```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("Cannot instantiate abstract class")
    }
  }

  draw() {
    throw new Error("Must override method")
  }
}

class Circle extends Shape {
  draw() {
    console.log("Drawing circle")
  }
}
```

## Mixins (Multiple Behavior Sharing)

- JavaScript doesn't support multiple inheritance, but you can use mixins:
```js
const WalkMixin = Base => class extends Base {
  walk() {
    console.log("Walking")
  }
}

class Animal {}
class Human extends WalkMixin(Animal) {}

const h = new Human()
h.walk() // Walking
```

## Binding this

- Class methods are not automatically bound:
```js
class Button {
  constructor() {
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log("Clicked", this)
  }
}
```






































































































































































































































































































































































