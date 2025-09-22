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

#### What are Static Methods?

  - Static methods are functions that belong to the class itself, not 
     to instances
  - Called on the class, not on instances
  - Cannot access instance properties or methods directly
  - Often used for utility functions, factory methods, or class-level 
     operations

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

# Inheritance

- **What is it?**
  **Inheritance** allows one class (child/subclass) to inherit properties and methods from another class (parent/superclass). It promotes code reusability and establishes a hierarchical relationship between classes.

- **When to use?**
  When you have classes that share common functionality but also have specific behaviors. Instead of duplicating code, create a base class with common features and extend it.

- **How does it work?**
  JavaScript uses the `extends` keyword for class inheritance and `super()` to access parent class functionality.

## Basic Inheritance Syntax

```js
class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  start() {
    console.log(`${this.brand} ${this.model} is starting...`);
  }

  stop() {
    console.log(`${this.brand} ${this.model} has stopped.`);
  }
}

class Car extends Vehicle {
  constructor(brand, model, doors) {
    super(brand, model); // Call parent constructor
    this.doors = doors;
  }

  honk() {
    console.log("Beep beep!");
  }
}

const myCar = new Car("Toyota", "Camry", 4);
myCar.start(); // Toyota Camry is starting...
myCar.honk();  // Beep beep!
```

## Method Overriding

```js
class Animal {
  speak() {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

class Cat extends Animal {
  speak() {
    super.speak(); // Call parent method first
    console.log("Cat meows");
  }
}

const dog = new Dog();
dog.speak(); // Dog barks

const cat = new Cat();
cat.speak();
// Animal makes a sound
// Cat meows
```

## Real-world Example: E-commerce System

```js
class Product {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }

  getInfo() {
    return `${this.name} - $${this.price}`;
  }

  calculateTax() {
    return this.price * 0.1; // 10% tax
  }
}

class DigitalProduct extends Product {
  constructor(name, price, downloadSize) {
    super(name, price, "Digital");
    this.downloadSize = downloadSize;
  }

  download() {
    console.log(`Downloading ${this.name} (${this.downloadSize}MB)`);
  }

  // Override tax calculation for digital products
  calculateTax() {
    return this.price * 0.05; // 5% tax for digital
  }
}

class PhysicalProduct extends Product {
  constructor(name, price, weight, dimensions) {
    super(name, price, "Physical");
    this.weight = weight;
    this.dimensions = dimensions;
  }

  calculateShipping() {
    return this.weight * 2; // $2 per kg
  }
}

// Usage
const ebook = new DigitalProduct("JavaScript Guide", 29.99, 15);
const laptop = new PhysicalProduct("Gaming Laptop", 1299.99, 2.5, "35x25x3");

console.log(ebook.getInfo());           // JavaScript Guide - $29.99
console.log(ebook.calculateTax());      // 1.4995 (5% tax)
ebook.download();                       // Downloading JavaScript Guide (15MB)

console.log(laptop.getInfo());          // Gaming Laptop - $1299.99
console.log(laptop.calculateTax());     // 129.999 (10% tax)
console.log(laptop.calculateShipping()); // 5 ($2 per kg)
```

# Polymorphism

- **What is it?**
  **Polymorphism** means "many forms" - the ability of different objects to respond to the same method call in their own specific way. In JavaScript, this is achieved through method overriding and duck typing.

- **Types of Polymorphism:**
  1. **Runtime Polymorphism** - Method overriding
  2. **Duck Typing** - "If it walks like a duck and quacks like a duck, it's a duck"

## Method Overriding Example

```js
class Shape {
  area() {
    throw new Error("area() method must be implemented");
  }

  perimeter() {
    throw new Error("perimeter() method must be implemented");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

// Polymorphic behavior
function calculateShapeInfo(shape) {
  console.log(`Area: ${shape.area()}`);
  console.log(`Perimeter: ${shape.perimeter()}`);
}

const rect = new Rectangle(5, 3);
const circle = new Circle(4);

calculateShapeInfo(rect);   // Area: 15, Perimeter: 16
calculateShapeInfo(circle); // Area: 50.26..., Perimeter: 25.13...
```

## Duck Typing in JavaScript

```js
// Different classes with same method signatures
class FileLogger {
  log(message) {
    console.log(`[FILE] ${new Date().toISOString()}: ${message}`);
  }
}

class DatabaseLogger {
  log(message) {
    console.log(`[DB] ${new Date().toISOString()}: ${message}`);
  }
}

class ConsoleLogger {
  log(message) {
    console.log(`[CONSOLE] ${message}`);
  }
}

// Function that works with any logger (duck typing)
function performOperation(logger) {
  logger.log("Operation started");
  // ... some operation
  logger.log("Operation completed");
}

// All work because they have log() method
performOperation(new FileLogger());
performOperation(new DatabaseLogger());
performOperation(new ConsoleLogger());
```

## Real-world Example: Payment Processing

```js
class Payment {
  process(amount) {
    throw new Error("process() method must be implemented");
  }
}

class CreditCardPayment extends Payment {
  constructor(cardNumber, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  process(amount) {
    console.log(`Processing $${amount} via Credit Card ending in ${this.cardNumber.slice(-4)}`);
    // Credit card specific logic
    return { success: true, transactionId: "CC" + Date.now() };
  }
}

class PayPalPayment extends Payment {
  constructor(email) {
    super();
    this.email = email;
  }

  process(amount) {
    console.log(`Processing $${amount} via PayPal for ${this.email}`);
    // PayPal specific logic
    return { success: true, transactionId: "PP" + Date.now() };
  }
}

class CryptoPayment extends Payment {
  constructor(walletAddress) {
    super();
    this.walletAddress = walletAddress;
  }

  process(amount) {
    console.log(`Processing $${amount} via Crypto to ${this.walletAddress}`);
    // Crypto specific logic
    return { success: true, transactionId: "CRYPTO" + Date.now() };
  }
}

// Polymorphic payment processor
class PaymentProcessor {
  static processPayment(paymentMethod, amount) {
    try {
      const result = paymentMethod.process(amount);
      console.log(`Payment successful: ${result.transactionId}`);
      return result;
    } catch (error) {
      console.log(`Payment failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}

// Usage - same method call, different behaviors
const creditCard = new CreditCardPayment("1234-5678-9012-3456", "123");
const paypal = new PayPalPayment("user@example.com");
const crypto = new CryptoPayment("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");

PaymentProcessor.processPayment(creditCard, 100);
PaymentProcessor.processPayment(paypal, 50);
PaymentProcessor.processPayment(crypto, 200);
```

# Encapsulation

- **What is it?**
  **Encapsulation** is the bundling of data (properties) and methods that operate on that data within a single unit (class), while restricting direct access to some components. It's about data hiding and controlled access.

- **Benefits:**
  - Data protection and validation
  - Controlled access through methods
  - Internal implementation can change without affecting external code
  - Reduces complexity for users of the class

## Private Fields and Methods (ES2022)

```js
class BankAccount {
  #balance = 0;           // Private field
  #accountNumber;
  #transactionHistory = [];

  constructor(accountNumber, initialDeposit = 0) {
    this.#accountNumber = accountNumber;
    this.#balance = initialDeposit;
    this.#addTransaction("Initial deposit", initialDeposit);
  }

  // Private method
  #addTransaction(type, amount) {
    this.#transactionHistory.push({
      type,
      amount,
      date: new Date(),
      balance: this.#balance
    });
  }

  // Public methods (controlled access)
  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.#balance += amount;
    this.#addTransaction("Deposit", amount);
    console.log(`Deposited $${amount}. New balance: $${this.#balance}`);
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
    this.#addTransaction("Withdrawal", -amount);
    console.log(`Withdrew $${amount}. New balance: $${this.#balance}`);
  }

  getBalance() {
    return this.#balance;
  }

  getAccountNumber() {
    return this.#accountNumber.replace(/\d(?=\d{4})/g, "*");
  }

  getTransactionHistory() {
    return this.#transactionHistory.slice(); // Return copy, not original
  }
}

const account = new BankAccount("123456789", 1000);
account.deposit(500);
account.withdraw(200);

console.log(account.getBalance());        // 1300
console.log(account.getAccountNumber());  // *****6789

// These will throw errors:
// console.log(account.#balance);         // SyntaxError
// account.#addTransaction("hack", 1000); // SyntaxError
```

## Getters and Setters

```js
class Temperature {
  #celsius = 0;

  constructor(celsius = 0) {
    this.celsius = celsius; // Uses setter for validation
  }

  // Getter for celsius
  get celsius() {
    return this.#celsius;
  }

  // Setter for celsius with validation
  set celsius(value) {
    if (typeof value !== 'number') {
      throw new Error("Temperature must be a number");
    }
    if (value < -273.15) {
      throw new Error("Temperature cannot be below absolute zero");
    }
    this.#celsius = value;
  }

  // Computed properties
  get fahrenheit() {
    return (this.#celsius * 9/5) + 32;
  }

  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9; // Uses celsius setter
  }

  get kelvin() {
    return this.#celsius + 273.15;
  }

  set kelvin(value) {
    this.celsius = value - 273.15; // Uses celsius setter
  }

  toString() {
    return `${this.#celsius}°C (${this.fahrenheit.toFixed(1)}°F, ${this.kelvin.toFixed(1)}K)`;
  }
}

const temp = new Temperature(25);
console.log(temp.toString()); // 25°C (77.0°F, 298.2K)

temp.fahrenheit = 100;
console.log(temp.toString()); // 37.8°C (100.0°F, 310.9K)

// This will throw an error:
// temp.celsius = -300; // Error: Temperature cannot be below absolute zero
```

## Real-world Example: User Management System

```js
class User {
  #password;
  #email;
  #loginAttempts = 0;
  #isLocked = false;
  #lastLogin = null;

  constructor(username, email, password) {
    this.username = username;
    this.email = email;        // Uses setter
    this.password = password;  // Uses setter
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error("Invalid email format");
    }
    this.#email = value;
  }

  set password(value) {
    if (value.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      throw new Error("Password must contain uppercase, lowercase, and number");
    }
    this.#password = this.#hashPassword(value);
  }

  #hashPassword(password) {
    // Simplified hash simulation
    return btoa(password + "salt");
  }

  authenticate(password) {
    if (this.#isLocked) {
      throw new Error("Account is locked due to too many failed attempts");
    }

    const hashedInput = this.#hashPassword(password);
    if (hashedInput === this.#password) {
      this.#loginAttempts = 0;
      this.#lastLogin = new Date();
      console.log("Login successful");
      return true;
    } else {
      this.#loginAttempts++;
      if (this.#loginAttempts >= 3) {
        this.#isLocked = true;
        console.log("Account locked due to too many failed attempts");
      }
      console.log("Invalid password");
      return false;
    }
  }

  getAccountInfo() {
    return {
      username: this.username,
      email: this.#email,
      lastLogin: this.#lastLogin,
      isLocked: this.#isLocked
    };
  }

  unlockAccount() {
    this.#isLocked = false;
    this.#loginAttempts = 0;
    console.log("Account unlocked");
  }
}

const user = new User("john_doe", "john@example.com", "SecurePass123");
console.log(user.getAccountInfo());

user.authenticate("wrongpass");  // Invalid password
user.authenticate("SecurePass123"); // Login successful
```

# Abstraction

- **What is it?**
  **Abstraction** is the concept of hiding complex implementation details while exposing only the essential features. It focuses on "what" an object does rather than "how" it does it.

- **Purpose:**
  - Simplify complex systems
  - Hide implementation details
  - Provide a clean interface
  - Reduce complexity for users

- **In JavaScript:**
  JavaScript doesn't have true abstract classes, but we can simulate abstraction using conventions and patterns.

## Abstract Class Simulation

```js
class Vehicle {
  constructor(brand) {
    if (new.target === Vehicle) {
      throw new Error("Cannot instantiate abstract class Vehicle directly");
    }
    this.brand = brand;
  }

  // Abstract method - must be implemented by subclasses
  start() {
    throw new Error("start() method must be implemented by subclass");
  }

  stop() {
    throw new Error("stop() method must be implemented by subclass");
  }

  // Concrete method - can be used by all subclasses
  displayBrand() {
    console.log(`Brand: ${this.brand}`);
  }
}

class Car extends Vehicle {
  start() {
    console.log("Car engine started with key");
  }

  stop() {
    console.log("Car engine stopped");
  }
}

class ElectricCar extends Vehicle {
  start() {
    console.log("Electric car started silently");
  }

  stop() {
    console.log("Electric car powered down");
  }
}

// Usage
// const vehicle = new Vehicle("Generic"); // ❌ Error: Cannot instantiate abstract class
const car = new Car("Toyota");
const electricCar = new ElectricCar("Tesla");

car.start();         // Car engine started with key
electricCar.start(); // Electric car started silently
```

## Interface Simulation with Documentation

```js
/**
 * Database Interface - All database implementations must provide these methods
 */
class DatabaseInterface {
  connect() {
    throw new Error("connect() must be implemented");
  }

  disconnect() {
    throw new Error("disconnect() must be implemented");
  }

  query(sql) {
    throw new Error("query() must be implemented");
  }

  insert(table, data) {
    throw new Error("insert() must be implemented");
  }
}

class MySQLDatabase extends DatabaseInterface {
  constructor(host, username, password) {
    super();
    this.host = host;
    this.username = username;
    this.password = password;
    this.connection = null;
  }

  connect() {
    console.log(`Connecting to MySQL at ${this.host}`);
    this.connection = { status: "connected", type: "mysql" };
    return this.connection;
  }

  disconnect() {
    console.log("Disconnecting from MySQL");
    this.connection = null;
  }

  query(sql) {
    if (!this.connection) {
      throw new Error("Database not connected");
    }
    console.log(`Executing MySQL query: ${sql}`);
    return { results: [], rowCount: 0 };
  }

  insert(table, data) {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data).map(v => `'${v}'`).join(", ");
    return this.query(`INSERT INTO ${table} (${columns}) VALUES (${values})`);
  }
}

class MongoDatabase extends DatabaseInterface {
  constructor(connectionString) {
    super();
    this.connectionString = connectionString;
    this.client = null;
  }

  connect() {
    console.log(`Connecting to MongoDB: ${this.connectionString}`);
    this.client = { status: "connected", type: "mongodb" };
    return this.client;
  }

  disconnect() {
    console.log("Disconnecting from MongoDB");
    this.client = null;
  }

  query(filter) {
    if (!this.client) {
      throw new Error("Database not connected");
    }
    console.log(`Executing MongoDB query:`, filter);
    return { documents: [] };
  }

  insert(collection, document) {
    console.log(`Inserting into ${collection}:`, document);
    return { insertedId: "objectId123" };
  }
}
```

## Real-world Example: Media Player System

```js
// Abstract Media Player
class MediaPlayer {
  constructor(name) {
    if (new.target === MediaPlayer) {
      throw new Error("MediaPlayer is abstract - cannot instantiate directly");
    }
    this.name = name;
    this.isPlaying = false;
    this.currentTime = 0;
  }

  // Abstract methods - must be implemented
  play() {
    throw new Error("play() must be implemented");
  }

  pause() {
    throw new Error("pause() must be implemented");
  }

  load(source) {
    throw new Error("load() must be implemented");
  }

  // Concrete methods - shared functionality
  getStatus() {
    return {
      name: this.name,
      isPlaying: this.isPlaying,
      currentTime: this.currentTime
    };
  }

  seek(time) {
    this.currentTime = time;
    console.log(`Seeking to ${time}s`);
  }
}

class AudioPlayer extends MediaPlayer {
  constructor() {
    super("Audio Player");
    this.volume = 0.5;
    this.audioFormat = null;
  }

  load(audioFile) {
    this.audioFormat = audioFile.split('.').pop();
    console.log(`Loading audio file: ${audioFile} (${this.audioFormat})`);
  }

  play() {
    if (!this.audioFormat) {
      throw new Error("No audio file loaded");
    }
    this.isPlaying = true;
    console.log(`Playing audio (${this.audioFormat}) at volume ${this.volume}`);
  }

  pause() {
    this.isPlaying = false;
    console.log("Audio paused");
  }

  setVolume(level) {
    this.volume = Math.max(0, Math.min(1, level));
    console.log(`Volume set to ${this.volume}`);
  }
}

class VideoPlayer extends MediaPlayer {
  constructor() {
    super("Video Player");
    this.resolution = "1080p";
    this.subtitles = false;
  }

  load(videoFile) {
    this.videoFormat = videoFile.split('.').pop();
    console.log(`Loading video file: ${videoFile} (${this.videoFormat})`);
  }

  play() {
    if (!this.videoFormat) {
      throw new Error("No video file loaded");
    }
    this.isPlaying = true;
    console.log(`Playing video (${this.videoFormat}) at ${this.resolution}`);
  }

  pause() {
    this.isPlaying = false;
    console.log("Video paused");
  }

  toggleSubtitles() {
    this.subtitles = !this.subtitles;
    console.log(`Subtitles ${this.subtitles ? 'enabled' : 'disabled'}`);
  }

  changeResolution(resolution) {
    this.resolution = resolution;
    console.log(`Resolution changed to ${resolution}`);
  }
}

// Media Controller - works with any MediaPlayer
class MediaController {
  constructor(player) {
    this.player = player;
  }

  loadAndPlay(file) {
    try {
      this.player.load(file);
      this.player.play();
      console.log("Media started successfully");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  togglePlayPause() {
    if (this.player.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  getPlayerInfo() {
    return this.player.getStatus();
  }
}

// Usage
const audioPlayer = new AudioPlayer();
const videoPlayer = new VideoPlayer();

const audioController = new MediaController(audioPlayer);
const videoController = new MediaController(videoPlayer);

audioController.loadAndPlay("song.mp3");
console.log(audioController.getPlayerInfo());

videoController.loadAndPlay("movie.mp4");
videoPlayer.toggleSubtitles();
console.log(videoController.getPlayerInfo());
```

## Function-based Abstraction Pattern

```js
// Factory pattern for abstraction
function createNotificationService(type) {
  const services = {
    email: {
      send(message, recipient) {
        console.log(`📧 Sending email to ${recipient}: ${message}`);
        // Complex email sending logic hidden
        return { sent: true, method: 'email' };
      }
    },

    sms: {
      send(message, recipient) {
        console.log(`📱 Sending SMS to ${recipient}: ${message}`);
        // Complex SMS sending logic hidden
        return { sent: true, method: 'sms' };
      }
    },

    push: {
      send(message, recipient) {
        console.log(`🔔 Sending push notification to ${recipient}: ${message}`);
        // Complex push notification logic hidden
        return { sent: true, method: 'push' };
      }
    }
  };

  if (!services[type]) {
    throw new Error(`Notification service '${type}' not supported`);
  }

  return services[type];
}

// Usage - user doesn't need to know implementation details
const emailService = createNotificationService('email');
const smsService = createNotificationService('sms');

emailService.send("Welcome to our app!", "user@example.com");
smsService.send("Your verification code is 123456", "+1234567890");
```

# Composition vs Inheritance

- **Composition:** "Has-a" relationship - building objects by combining other objects
- **Inheritance:** "Is-a" relationship - creating new classes based on existing ones

- **When to use Composition:**
  - When you need flexible, modular code
  - When objects have different capabilities that can be mixed and matched
  - When you want to avoid deep inheritance hierarchies

- **When to use Inheritance:**
  - When there's a clear "is-a" relationship
  - When you want to share common behavior across related classes
  - When you need polymorphism

## Inheritance Example (Can become complex)

```js
// Deep inheritance hierarchy - can get complicated
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  start() {
    console.log("Vehicle starting...");
  }
}

class MotorVehicle extends Vehicle {
  constructor(brand, engine) {
    super(brand);
    this.engine = engine;
  }

  startEngine() {
    console.log("Engine starting...");
  }
}

class Car extends MotorVehicle {
  constructor(brand, engine, doors) {
    super(brand, engine);
    this.doors = doors;
  }
}

class SportsCar extends Car {
  constructor(brand, engine, doors, turbocharged) {
    super(brand, engine, doors);
    this.turbocharged = turbocharged;
  }

  boost() {
    if (this.turbocharged) {
      console.log("Turbo boost activated!");
    }
  }
}

// Problem: What if we want a flying car? Or an electric sports car?
// We'd need complex multiple inheritance or lots of duplicate code
```

## Composition Example (More Flexible)

```js
// Composition - building objects with capabilities
class Engine {
  constructor(type, power) {
    this.type = type;
    this.power = power;
  }

  start() {
    console.log(`${this.type} engine started (${this.power}HP)`);
  }

  stop() {
    console.log(`${this.type} engine stopped`);
  }
}

class GPS {
  constructor() {
    this.currentLocation = { lat: 0, lng: 0 };
  }

  navigate(destination) {
    console.log(`Navigating to ${destination}`);
  }

  getCurrentLocation() {
    return this.currentLocation;
  }
}

class SoundSystem {
  constructor(brand) {
    this.brand = brand;
    this.volume = 0;
  }

  playMusic(song) {
    console.log(`Playing ${song} on ${this.brand} sound system`);
  }

  setVolume(level) {
    this.volume = level;
    console.log(`Volume set to ${level}`);
  }
}

class AutoPilot {
  constructor() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
    console.log("AutoPilot enabled - hands-free driving");
  }

  disable() {
    this.enabled = false;
    console.log("AutoPilot disabled - manual control");
  }
}

// Flexible Vehicle using Composition
class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    this.components = new Map();
  }

  addComponent(name, component) {
    this.components.set(name, component);
    return this;
  }

  getComponent(name) {
    return this.components.get(name);
  }

  hasComponent(name) {
    return this.components.has(name);
  }

  start() {
    console.log(`Starting ${this.brand} ${this.model}`);
    if (this.hasComponent('engine')) {
      this.getComponent('engine').start();
    }
  }

  stop() {
    console.log(`Stopping ${this.brand} ${this.model}`);
    if (this.hasComponent('engine')) {
      this.getComponent('engine').stop();
    }
  }
}

// Creating different vehicles with different capabilities
const regularCar = new Vehicle("Toyota", "Camry")
  .addComponent('engine', new Engine("V6", 268))
  .addComponent('gps', new GPS())
  .addComponent('sound', new SoundSystem("Pioneer"));

const luxuryCar = new Vehicle("BMW", "X7")
  .addComponent('engine', new Engine("V8", 523))
  .addComponent('gps', new GPS())
  .addComponent('sound', new SoundSystem("Harman Kardon"))
  .addComponent('autopilot', new AutoPilot());

const electricCar = new Vehicle("Tesla", "Model 3")
  .addComponent('engine', new Engine("Electric", 283))
  .addComponent('gps', new GPS())
  .addComponent('sound', new SoundSystem("Tesla Premium"))
  .addComponent('autopilot', new AutoPilot());

// Usage
regularCar.start();
regularCar.getComponent('sound').playMusic("Bohemian Rhapsody");

luxuryCar.start();
luxuryCar.getComponent('autopilot').enable();

electricCar.start();
electricCar.getComponent('gps').navigate("Supercharger Station");
```

## Real-world Example: Game Character System

```js
// Instead of complex inheritance (Warrior -> MagicWarrior -> PaladinWarrior)
// Use composition for flexible character abilities

class HealthSystem {
  constructor(maxHealth) {
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
  }

  takeDamage(amount) {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    console.log(`Health: ${this.currentHealth}/${this.maxHealth}`);
  }

  heal(amount) {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    console.log(`Healed! Health: ${this.currentHealth}/${this.maxHealth}`);
  }

  isDead() {
    return this.currentHealth <= 0;
  }
}

class ManaSystem {
  constructor(maxMana) {
    this.maxMana = maxMana;
    this.currentMana = maxMana;
  }

  useMana(amount) {
    if (this.currentMana >= amount) {
      this.currentMana -= amount;
      console.log(`Mana used: ${amount}. Remaining: ${this.currentMana}/${this.maxMana}`);
      return true;
    }
    console.log("Not enough mana!");
    return false;
  }

  restoreMana(amount) {
    this.currentMana = Math.min(this.maxMana, this.currentMana + amount);
    console.log(`Mana restored! Current: ${this.currentMana}/${this.maxMana}`);
  }
}

class CombatSystem {
  constructor(attackPower, defense) {
    this.attackPower = attackPower;
    this.defense = defense;
  }

  attack(target) {
    const damage = Math.max(1, this.attackPower - target.getDefense());
    console.log(`Attack deals ${damage} damage!`);
    target.takeDamage(damage);
    return damage;
  }

  getDefense() {
    return this.defense;
  }
}

class MagicSystem {
  constructor(magicPower) {
    this.magicPower = magicPower;
    this.spells = [];
  }

  learnSpell(spell) {
    this.spells.push(spell);
    console.log(`Learned spell: ${spell.name}`);
  }

  castSpell(spellName, target, manaSystem) {
    const spell = this.spells.find(s => s.name === spellName);
    if (!spell) {
      console.log("Spell not known!");
      return false;
    }

    if (manaSystem.useMana(spell.manaCost)) {
      console.log(`Casting ${spell.name}!`);
      spell.effect(target, this.magicPower);
      return true;
    }
    return false;
  }
}

// Spell definitions
const spells = {
  fireball: {
    name: "Fireball",
    manaCost: 20,
    effect: (target, magicPower) => {
      const damage = magicPower * 1.5;
      console.log(`Fireball hits for ${damage} damage!`);
      target.takeDamage(damage);
    }
  },
  heal: {
    name: "Heal",
    manaCost: 15,
    effect: (target, magicPower) => {
      const healing = magicPower * 1.2;
      console.log(`Healing for ${healing} points!`);
      target.heal(healing);
    }
  }
};

// Character class using composition
class Character {
  constructor(name, config) {
    this.name = name;
    this.systems = {};

    // Add systems based on configuration
    if (config.health) {
      this.systems.health = new HealthSystem(config.health);
    }

    if (config.mana) {
      this.systems.mana = new ManaSystem(config.mana);
    }

    if (config.combat) {
      this.systems.combat = new CombatSystem(config.combat.attack, config.combat.defense);
    }

    if (config.magic) {
      this.systems.magic = new MagicSystem(config.magic);
    }
  }

  // Delegate methods to appropriate systems
  takeDamage(amount) {
    return this.systems.health?.takeDamage(amount);
  }

  heal(amount) {
    return this.systems.health?.heal(amount);
  }

  attack(target) {
    return this.systems.combat?.attack(target);
  }

  getDefense() {
    return this.systems.combat?.getDefense() || 0;
  }

  castSpell(spellName, target) {
    return this.systems.magic?.castSpell(spellName, target, this.systems.mana);
  }

  learnSpell(spell) {
    return this.systems.magic?.learnSpell(spell);
  }

  getStatus() {
    console.log(`=== ${this.name} Status ===`);
    if (this.systems.health) {
      console.log(`Health: ${this.systems.health.currentHealth}/${this.systems.health.maxHealth}`);
    }
    if (this.systems.mana) {
      console.log(`Mana: ${this.systems.mana.currentMana}/${this.systems.mana.maxMana}`);
    }
  }
}

// Creating different character types
const warrior = new Character("Conan", {
  health: 150,
  combat: { attack: 25, defense: 20 }
});

const mage = new Character("Gandalf", {
  health: 80,
  mana: 120,
  combat: { attack: 10, defense: 5 },
  magic: 30
});

const paladin = new Character("Arthas", {
  health: 120,
  mana: 80,
  combat: { attack: 20, defense: 25 },
  magic: 20
});

// Setup spells
mage.learnSpell(spells.fireball);
mage.learnSpell(spells.heal);
paladin.learnSpell(spells.heal);

// Combat simulation
console.log("\n=== Combat Simulation ===");
warrior.getStatus();
mage.getStatus();

mage.castSpell("Fireball", warrior);
warrior.attack(mage);
paladin.castSpell("Heal", warrior);

console.log("\nAfter combat:");
warrior.getStatus();
mage.getStatus();
```

## Composition Benefits Summary

1. **Flexibility:** Easy to add/remove capabilities
2. **Reusability:** Components can be shared across different classes
3. **Maintainability:** Changes to one component don't affect others
4. **Testing:** Each component can be tested independently
5. **Avoid inheritance problems:** No deep hierarchies or diamond problems

## When to Choose What

```js
// Use Inheritance when:
// - Clear "is-a" relationship
// - Shared behavior across similar objects
// - Need polymorphism

class Animal {
  eat() { console.log("Eating..."); }
}

class Dog extends Animal {
  bark() { console.log("Woof!"); }
}

// Use Composition when:
// - "Has-a" relationship
// - Need flexible, modular design
// - Avoiding complex inheritance chains

class Dog {
  constructor() {
    this.digestiveSystem = new DigestiveSystem();
    this.soundSystem = new BarkingSystem();
  }
}
```

# Prototype-based OOP (JavaScript's Original Model)

- **What is it?**
  JavaScript's original object-oriented model before ES6 classes. Objects can inherit directly from other objects without needing classes. Every object has a prototype chain.

- **How it works:**
  - Objects have a hidden `[[Prototype]]` property (accessible via `__proto__` or `Object.getPrototypeOf()`)
  - When accessing a property, JavaScript looks up the prototype chain
  - Functions have a `prototype` property used for creating objects with `new`

- **Key Concepts:**
  - Prototype chain
  - Constructor functions
  - Object.create()
  - Prototypal inheritance

## Basic Prototype Example

```js
// Every object has a prototype
const obj = { name: "John" };
console.log(obj.__proto__ === Object.prototype); // true

// Objects inherit from their prototype
const person = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const john = Object.create(person);
john.name = "John";
john.greet(); // Hello, I'm John

// john doesn't have greet method, but inherits it from person
console.log(john.hasOwnProperty('greet')); // false
console.log('greet' in john); // true
```

## Constructor Functions (Pre-ES6)

```js
// Constructor function - like a class blueprint
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Methods go on the prototype to be shared
Person.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}, ${this.age} years old`);
};

Person.prototype.getAgeGroup = function() {
  if (this.age < 13) return "child";
  if (this.age < 20) return "teenager";
  if (this.age < 60) return "adult";
  return "senior";
};

// Creating instances
const alice = new Person("Alice", 25);
const bob = new Person("Bob", 15);

alice.greet(); // Hi, I'm Alice, 25 years old
console.log(bob.getAgeGroup()); // teenager

// All instances share the same prototype methods
console.log(alice.greet === bob.greet); // true
```

## Prototype Chain and Inheritance

```js
// Base constructor
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

Animal.prototype.sleep = function() {
  console.log(`${this.name} is sleeping`);
};

// Child constructor
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add dog-specific methods
Dog.prototype.bark = function() {
  console.log(`${this.name} barks: Woof woof!`);
};

Dog.prototype.speak = function() {
  this.bark(); // Override parent method
};

// Usage
const rex = new Dog("Rex", "German Shepherd");
rex.speak(); // Rex barks: Woof woof!
rex.sleep(); // Rex is sleeping (inherited from Animal)

console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true
```

## Object.create() for Direct Inheritance

```js
// Creating objects that inherit directly from other objects
const vehiclePrototype = {
  start() {
    console.log(`${this.brand} ${this.model} is starting`);
  },

  stop() {
    console.log(`${this.brand} ${this.model} has stopped`);
  },

  getInfo() {
    return `${this.brand} ${this.model} (${this.year})`;
  }
};

// Create objects using the prototype
const car = Object.create(vehiclePrototype);
car.brand = "Toyota";
car.model = "Camry";
car.year = 2023;
car.doors = 4;

const motorcycle = Object.create(vehiclePrototype);
motorcycle.brand = "Harley-Davidson";
motorcycle.model = "Sportster";
motorcycle.year = 2023;
motorcycle.wheels = 2;

car.start(); // Toyota Camry is starting
motorcycle.start(); // Harley-Davidson Sportster is starting

// Add specific methods to individual objects
car.honk = function() {
  console.log("Beep beep!");
};

motorcycle.rev = function() {
  console.log("Vroom vroom!");
};
```

## Advanced Prototype Patterns

```js
// Factory pattern with prototypes
function createUser(name, role) {
  const userPrototype = {
    getName() {
      return this.name;
    },

    getRole() {
      return this.role;
    },

    hasPermission(action) {
      return this.permissions.includes(action);
    }
  };

  const rolePermissions = {
    admin: ['read', 'write', 'delete', 'manage'],
    editor: ['read', 'write'],
    viewer: ['read']
  };

  const user = Object.create(userPrototype);
  user.name = name;
  user.role = role;
  user.permissions = rolePermissions[role] || [];

  return user;
}

const admin = createUser("Alice", "admin");
const editor = createUser("Bob", "editor");

console.log(admin.hasPermission("delete")); // true
console.log(editor.hasPermission("delete")); // false
```

## Mixin Pattern with Prototypes

```js
// Mixins for adding capabilities to objects
const flyMixin = {
  fly() {
    console.log(`${this.name} is flying!`);
  },

  land() {
    console.log(`${this.name} has landed.`);
  }
};

const swimMixin = {
  swim() {
    console.log(`${this.name} is swimming!`);
  },

  dive() {
    console.log(`${this.name} dives underwater.`);
  }
};

// Function to apply mixins
function mixin(target, ...mixins) {
  mixins.forEach(mixinObj => {
    Object.assign(target.prototype, mixinObj);
  });
}

// Bird constructor
function Bird(name) {
  this.name = name;
}

// Duck constructor
function Duck(name) {
  this.name = name;
}

// Apply different capabilities
mixin(Bird, flyMixin);
mixin(Duck, flyMixin, swimMixin);

const eagle = new Bird("Eagle");
const mallard = new Duck("Mallard");

eagle.fly(); // Eagle is flying!
mallard.fly(); // Mallard is flying!
mallard.swim(); // Mallard is swimming!
// eagle.swim(); // Error - not available
```

## Real-world Example: Plugin System

```js
// Base application object
const baseApp = {
  name: "MyApp",
  version: "1.0.0",
  plugins: [],

  init() {
    console.log(`Initializing ${this.name} v${this.version}`);
    this.loadPlugins();
  },

  loadPlugins() {
    this.plugins.forEach(plugin => {
      if (plugin.init) {
        plugin.init.call(this);
      }
    });
  },

  addPlugin(plugin) {
    this.plugins.push(plugin);
    // Add plugin methods to the app
    Object.assign(this, plugin.methods || {});
  }
};

// Plugin definitions
const loggerPlugin = {
  name: "Logger",
  init() {
    console.log(`${this.name}: Logger plugin loaded`);
  },
  methods: {
    log(message) {
      console.log(`[${new Date().toISOString()}] ${message}`);
    },
    error(message) {
      console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
    }
  }
};

const databasePlugin = {
  name: "Database",
  init() {
    this.log?.("Database plugin loaded");
    this.connection = { status: "connected" };
  },
  methods: {
    query(sql) {
      if (this.connection?.status === "connected") {
        this.log?.(`Executing query: ${sql}`);
        return { results: [] };
      } else {
        this.error?.("Database not connected");
      }
    },

    connect() {
      this.connection = { status: "connected" };
      this.log?.("Database connected");
    }
  }
};

// Create app instance
const app = Object.create(baseApp);
app.addPlugin(loggerPlugin);
app.addPlugin(databasePlugin);

// Initialize the app
app.init();
app.query("SELECT * FROM users");
```

## Prototype vs Class Comparison

```js
// Prototype approach
function PersonProto(name) {
  this.name = name;
}

PersonProto.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person1 = new PersonProto("Alice");

// Class approach (syntactic sugar over prototypes)
class PersonClass {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const person2 = new PersonClass("Bob");

// Both create the same prototype structure
console.log(typeof PersonProto); // function
console.log(typeof PersonClass); // function
console.log(PersonClass.prototype.greet); // function
console.log(person1.__proto__ === PersonProto.prototype); // true
console.log(person2.__proto__ === PersonClass.prototype); // true
```

## Benefits of Prototype-based OOP

1. **Memory Efficient:** Methods shared across instances
2. **Dynamic:** Can add methods to prototypes at runtime
3. **Flexible:** Objects can inherit directly from other objects
4. **No Classes Needed:** Direct object-to-object inheritance
5. **Runtime Modification:** Prototypes can be modified after creation

```js
// Runtime modification example
function Calculator() {
  this.result = 0;
}

Calculator.prototype.add = function(num) {
  this.result += num;
  return this;
};

const calc = new Calculator();

// Add new method to all Calculator instances
Calculator.prototype.multiply = function(num) {
  this.result *= num;
  return this;
};

calc.add(5).multiply(3); // Works even though multiply was added later
console.log(calc.result); // 15
```

# Design Patterns in JavaScript OOP

Design patterns are reusable solutions to common programming problems. They're like blueprints that show you how to solve problems that occur repeatedly in software development.

## 1. Factory Pattern

- **What is it?**
  A pattern that creates objects without specifying their exact classes. Instead of using `new` directly, you call a factory function that decides which type of object to create.

- **When to use?**
  - When you don't know which specific class to instantiate
  - When object creation logic is complex
  - When you need to create different types of similar objects

- **Behind the scenes:**
  The factory function contains the creation logic and returns the appropriate object based on input parameters.

## Simple Factory Example

```js
// Different types of vehicles
class Car {
  constructor(model) {
    this.type = "Car";
    this.model = model;
    this.wheels = 4;
  }

  start() {
    console.log(`${this.model} car engine started`);
  }
}

class Motorcycle {
  constructor(model) {
    this.type = "Motorcycle";
    this.model = model;
    this.wheels = 2;
  }

  start() {
    console.log(`${this.model} motorcycle engine started`);
  }
}

class Truck {
  constructor(model) {
    this.type = "Truck";
    this.model = model;
    this.wheels = 6;
  }

  start() {
    console.log(`${this.model} truck engine started`);
  }
}

// Factory function
function VehicleFactory(type, model) {
  switch(type.toLowerCase()) {
    case 'car':
      return new Car(model);
    case 'motorcycle':
      return new Motorcycle(model);
    case 'truck':
      return new Truck(model);
    default:
      throw new Error(`Vehicle type ${type} not supported`);
  }
}

// Usage - user doesn't need to know which class to instantiate
const myCar = VehicleFactory('car', 'Toyota Camry');
const myBike = VehicleFactory('motorcycle', 'Harley Davidson');
const myTruck = VehicleFactory('truck', 'Ford F-150');

myCar.start();   // Toyota Camry car engine started
myBike.start();  // Harley Davidson motorcycle engine started
myTruck.start(); // Ford F-150 truck engine started
```

## Real-world Example: UI Component Factory

```js
// Different UI components
class Button {
  constructor(text, style) {
    this.type = 'button';
    this.text = text;
    this.style = style;
  }

  render() {
    return `<button class="${this.style}">${this.text}</button>`;
  }
}

class Input {
  constructor(placeholder, type) {
    this.type = 'input';
    this.placeholder = placeholder;
    this.inputType = type;
  }

  render() {
    return `<input type="${this.inputType}" placeholder="${this.placeholder}">`;
  }
}

class Modal {
  constructor(title, content) {
    this.type = 'modal';
    this.title = title;
    this.content = content;
  }

  render() {
    return `
      <div class="modal">
        <h2>${this.title}</h2>
        <p>${this.content}</p>
      </div>
    `;
  }
}

// UI Factory
class UIFactory {
  static createElement(type, config) {
    switch(type) {
      case 'button':
        return new Button(config.text, config.style);
      case 'input':
        return new Input(config.placeholder, config.inputType);
      case 'modal':
        return new Modal(config.title, config.content);
      default:
        throw new Error(`Component type ${type} not supported`);
    }
  }
}

// Usage in a form builder
const loginForm = [
  UIFactory.createElement('input', { placeholder: 'Username', inputType: 'text' }),
  UIFactory.createElement('input', { placeholder: 'Password', inputType: 'password' }),
  UIFactory.createElement('button', { text: 'Login', style: 'primary' })
];

loginForm.forEach(component => {
  console.log(component.render());
});
```

## 2. Singleton Pattern

- **What is it?**
  A pattern that ensures only one instance of a class exists and provides global access to it. Like having only one CEO in a company.

- **When to use?**
  - Database connections
  - Application settings/configuration
  - Logging systems
  - Cache management

- **Behind the scenes:**
  The class keeps track of whether an instance already exists and returns the same instance every time.

## Basic Singleton Example

```js
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    this.host = 'localhost';
    this.port = 3306;
    this.connected = false;

    DatabaseConnection.instance = this;
    return this;
  }

  connect() {
    if (!this.connected) {
      console.log(`Connecting to database at ${this.host}:${this.port}`);
      this.connected = true;
    } else {
      console.log('Already connected to database');
    }
  }

  query(sql) {
    if (this.connected) {
      console.log(`Executing: ${sql}`);
      return { results: [] };
    } else {
      throw new Error('Not connected to database');
    }
  }
}

// Testing Singleton behavior
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();

console.log(db1 === db2); // true - same instance!

db1.connect();
db2.query('SELECT * FROM users'); // Works because db1 and db2 are the same
```

## Modern Singleton with Module

```js
// Better singleton implementation using module pattern
class Logger {
  constructor() {
    this.logs = [];
    this.level = 'info';
  }

  setLevel(level) {
    this.level = level;
    console.log(`Log level set to: ${level}`);
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message };

    this.logs.push(logEntry);

    if (this.shouldLog(level)) {
      console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
    }
  }

  shouldLog(level) {
    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    return levels[level] <= levels[this.level];
  }

  getLogs() {
    return this.logs.slice(); // Return copy
  }
}

// Create singleton instance
const logger = new Logger();

// Export singleton instance
export default logger;

// Usage anywhere in the app
logger.log('Application started');
logger.log('User logged in', 'info');
logger.log('Debug info', 'debug');
```

## Real-world Example: App Configuration

```js
class AppConfig {
  constructor() {
    if (AppConfig.instance) {
      return AppConfig.instance;
    }

    this.settings = {
      apiUrl: 'https://api.example.com',
      theme: 'light',
      language: 'en',
      cacheEnabled: true,
      debugMode: false
    };

    AppConfig.instance = this;
    return this;
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    console.log(`Config updated: ${key} = ${value}`);
    this.settings[key] = value;
  }

  loadFromServer() {
    // Simulate loading config from server
    console.log('Loading configuration from server...');
    this.settings = {
      ...this.settings,
      apiUrl: 'https://prod-api.example.com',
      theme: 'dark'
    };
  }

  getAll() {
    return { ...this.settings };
  }
}

// Usage across different parts of the application
const config = new AppConfig();
config.set('debugMode', true);

// In another module
const sameConfig = new AppConfig();
console.log(sameConfig.get('debugMode')); // true

// Both references point to the same instance
console.log(config === sameConfig); // true
```

## 3. Observer Pattern

- **What is it?**
  A pattern where objects (observers) can subscribe to be notified when another object (subject) changes. Like subscribing to a YouTube channel.

- **When to use?**
  - Event systems
  - Model-View architectures
  - Real-time notifications
  - State management

- **Behind the scenes:**
  The subject maintains a list of observers and notifies them when changes occur.

## Basic Observer Example

```js
class NewsAgency {
  constructor() {
    this.news = '';
    this.observers = [];
  }

  // Subscribe to news updates
  subscribe(observer) {
    this.observers.push(observer);
    console.log(`${observer.name} subscribed to news updates`);
  }

  // Unsubscribe from news updates
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
    console.log(`${observer.name} unsubscribed from news updates`);
  }

  // Notify all subscribers
  notify() {
    this.observers.forEach(observer => {
      observer.update(this.news);
    });
  }

  // Set news and notify observers
  setNews(news) {
    console.log(`\nBreaking News: ${news}`);
    this.news = news;
    this.notify();
  }
}

// Different types of news channels
class NewsChannel {
  constructor(name) {
    this.name = name;
  }

  update(news) {
    console.log(`${this.name} broadcasting: ${news}`);
  }
}

class NewsWebsite {
  constructor(name) {
    this.name = name;
  }

  update(news) {
    console.log(`${this.name} publishing online: ${news}`);
  }
}

// Usage
const agency = new NewsAgency();

const cnn = new NewsChannel('CNN');
const bbc = new NewsChannel('BBC');
const newsWebsite = new NewsWebsite('News.com');

// Subscribe to updates
agency.subscribe(cnn);
agency.subscribe(bbc);
agency.subscribe(newsWebsite);

// Breaking news - all subscribers get notified
agency.setNews('Major earthquake hits California');
agency.setNews('New technology breakthrough announced');

// Unsubscribe
agency.unsubscribe(bbc);
agency.setNews('Sports update: Championship finals tonight');
```

## Real-world Example: Shopping Cart System

```js
class ShoppingCart {
  constructor() {
    this.items = [];
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(event, data) {
    this.observers.forEach(observer => {
      if (observer[event]) {
        observer[event](data);
      }
    });
  }

  addItem(item) {
    this.items.push(item);
    console.log(`Added ${item.name} to cart`);
    this.notify('onItemAdded', { item, cart: this.getCartInfo() });
  }

  removeItem(itemId) {
    const item = this.items.find(item => item.id === itemId);
    this.items = this.items.filter(item => item.id !== itemId);
    console.log(`Removed ${item.name} from cart`);
    this.notify('onItemRemoved', { item, cart: this.getCartInfo() });
  }

  getCartInfo() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    return {
      itemCount: this.items.length,
      total: total,
      items: [...this.items]
    };
  }
}

// Different observers for cart events
class PriceCalculator {
  onItemAdded(data) {
    console.log(`💰 Total updated: $${data.cart.total}`);
  }

  onItemRemoved(data) {
    console.log(`💰 Total updated: $${data.cart.total}`);
  }
}

class InventoryManager {
  onItemAdded(data) {
    console.log(`📦 Stock check for ${data.item.name}`);
  }

  onItemRemoved(data) {
    console.log(`📦 Stock returned for ${data.item.name}`);
  }
}

class NotificationService {
  onItemAdded(data) {
    console.log(`🔔 Item added notification sent`);
  }

  onItemRemoved(data) {
    console.log(`🔔 Item removed notification sent`);
  }
}

// Usage
const cart = new ShoppingCart();
const priceCalc = new PriceCalculator();
const inventory = new InventoryManager();
const notifications = new NotificationService();

// Subscribe services to cart events
cart.subscribe(priceCalc);
cart.subscribe(inventory);
cart.subscribe(notifications);

// Shopping actions
cart.addItem({ id: 1, name: 'Laptop', price: 999 });
cart.addItem({ id: 2, name: 'Mouse', price: 25 });
cart.removeItem(1);
```

## 4. Strategy Pattern

- **What is it?**
  A pattern that lets you define a family of algorithms, put each in a separate class, and make them interchangeable. Like choosing different payment methods.

- **When to use?**
  - Multiple ways to perform the same task
  - Different algorithms for different situations
  - Avoiding large if-else chains

- **Behind the scenes:**
  The context class holds a reference to a strategy object and delegates the algorithm execution to it.

## Basic Strategy Example

```js
// Different sorting strategies
class BubbleSort {
  sort(data) {
    console.log('Using Bubble Sort');
    const arr = [...data];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSort {
  sort(data) {
    console.log('Using Quick Sort');
    const arr = [...data];

    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);

    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

class MergeSort {
  sort(data) {
    console.log('Using Merge Sort');
    const arr = [...data];

    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = this.sort(arr.slice(0, mid));
    const right = this.sort(arr.slice(mid));

    return this.merge(left, right);
  }

  merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}

// Context class that uses different strategies
class DataSorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(data) {
    return this.strategy.sort(data);
  }
}

// Usage
const data = [64, 34, 25, 12, 22, 11, 90];

const sorter = new DataSorter(new BubbleSort());
console.log('Result:', sorter.sort(data));

sorter.setStrategy(new QuickSort());
console.log('Result:', sorter.sort(data));

sorter.setStrategy(new MergeSort());
console.log('Result:', sorter.sort(data));
```

## Real-world Example: Payment Processing

```js
// Different payment strategies
class CreditCardPayment {
  constructor(cardNumber, cvv) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  pay(amount) {
    console.log(`Processing $${amount} via Credit Card`);
    console.log(`Card: ****${this.cardNumber.slice(-4)}`);

    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      return {
        success: true,
        transactionId: `CC_${Date.now()}`,
        method: 'Credit Card',
        amount: amount
      };
    } else {
      throw new Error('Credit card payment failed');
    }
  }
}

class PayPalPayment {
  constructor(email) {
    this.email = email;
  }

  pay(amount) {
    console.log(`Processing $${amount} via PayPal`);
    console.log(`Account: ${this.email}`);

    const success = Math.random() > 0.05; // 95% success rate

    if (success) {
      return {
        success: true,
        transactionId: `PP_${Date.now()}`,
        method: 'PayPal',
        amount: amount
      };
    } else {
      throw new Error('PayPal payment failed');
    }
  }
}

class CryptoPayment {
  constructor(walletAddress) {
    this.walletAddress = walletAddress;
  }

  pay(amount) {
    console.log(`Processing $${amount} via Cryptocurrency`);
    console.log(`Wallet: ${this.walletAddress.substring(0, 8)}...`);

    const success = Math.random() > 0.2; // 80% success rate

    if (success) {
      return {
        success: true,
        transactionId: `CRYPTO_${Date.now()}`,
        method: 'Cryptocurrency',
        amount: amount
      };
    } else {
      throw new Error('Crypto payment failed');
    }
  }
}

// Context class for payment processing
class PaymentProcessor {
  constructor(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentMethod(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  processPayment(amount) {
    try {
      console.log(`\n--- Processing Payment ---`);
      const result = this.paymentStrategy.pay(amount);
      console.log(`✅ Payment successful: ${result.transactionId}`);
      return result;
    } catch (error) {
      console.log(`❌ Payment failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}

// E-commerce checkout system
class ShoppingCheckout {
  constructor() {
    this.paymentProcessor = new PaymentProcessor(null);
    this.cart = [];
  }

  addItem(item) {
    this.cart.push(item);
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  checkout(paymentMethod) {
    const total = this.getTotal();
    console.log(`Cart Total: $${total}`);

    this.paymentProcessor.setPaymentMethod(paymentMethod);
    return this.paymentProcessor.processPayment(total);
  }
}

// Usage
const checkout = new ShoppingCheckout();
checkout.addItem({ name: 'Laptop', price: 999 });
checkout.addItem({ name: 'Mouse', price: 25 });

// Try different payment methods
const creditCard = new CreditCardPayment('1234-5678-9012-3456', '123');
const paypal = new PayPalPayment('user@example.com');
const crypto = new CryptoPayment('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

checkout.checkout(creditCard);
checkout.checkout(paypal);
checkout.checkout(crypto);
```

## 5. Decorator Pattern

- **What is it?**
  A pattern that lets you add new behaviors to objects by wrapping them in special wrapper objects. Like adding toppings to a pizza.

- **When to use?**
  - Adding features without modifying existing code
  - Extending functionality dynamically
  - Multiple combinations of features

- **Behind the scenes:**
  Decorators wrap the original object and add behavior while maintaining the same interface.

## Basic Decorator Example

```js
// Base coffee class
class SimpleCoffee {
  cost() {
    return 2;
  }

  description() {
    return 'Simple coffee';
  }
}

// Base decorator class
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }

  description() {
    return this.coffee.description();
  }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 0.5;
  }

  description() {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 0.25;
  }

  description() {
    return this.coffee.description() + ', sugar';
  }
}

class WhipDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 0.75;
  }

  description() {
    return this.coffee.description() + ', whipped cream';
  }
}

// Usage
let coffee = new SimpleCoffee();
console.log(`${coffee.description()} - $${coffee.cost()}`);

// Add decorators
coffee = new MilkDecorator(coffee);
console.log(`${coffee.description()} - $${coffee.cost()}`);

coffee = new SugarDecorator(coffee);
console.log(`${coffee.description()} - $${coffee.cost()}`);

coffee = new WhipDecorator(coffee);
console.log(`${coffee.description()} - $${coffee.cost()}`);
// Output: Simple coffee, milk, sugar, whipped cream - $3.5
```

## Real-world Example: Text Editor Features

```js
// Basic text editor
class TextEditor {
  constructor(content = '') {
    this.content = content;
  }

  write(text) {
    this.content += text;
  }

  getContent() {
    return this.content;
  }

  render() {
    return this.content;
  }
}

// Base decorator for text features
class TextDecorator {
  constructor(editor) {
    this.editor = editor;
  }

  write(text) {
    this.editor.write(text);
  }

  getContent() {
    return this.editor.getContent();
  }

  render() {
    return this.editor.render();
  }
}

// Bold text decorator
class BoldDecorator extends TextDecorator {
  render() {
    return `<strong>${this.editor.render()}</strong>`;
  }
}

// Italic text decorator
class ItalicDecorator extends TextDecorator {
  render() {
    return `<em>${this.editor.render()}</em>`;
  }
}

// Underline decorator
class UnderlineDecorator extends TextDecorator {
  render() {
    return `<u>${this.editor.render()}</u>`;
  }
}

// Color decorator
class ColorDecorator extends TextDecorator {
  constructor(editor, color) {
    super(editor);
    this.color = color;
  }

  render() {
    return `<span style="color: ${this.color}">${this.editor.render()}</span>`;
  }
}

// Auto-save decorator
class AutoSaveDecorator extends TextDecorator {
  constructor(editor, saveInterval = 5000) {
    super(editor);
    this.saveInterval = saveInterval;
    this.lastSaved = Date.now();
  }

  write(text) {
    super.write(text);
    this.checkAutoSave();
  }

  checkAutoSave() {
    if (Date.now() - this.lastSaved > this.saveInterval) {
      this.save();
    }
  }

  save() {
    console.log('Auto-saving document...');
    console.log('Content saved:', this.getContent());
    this.lastSaved = Date.now();
  }
}

// Usage
let editor = new TextEditor();
editor.write('Hello World!');

// Add styling decorators
editor = new BoldDecorator(editor);
editor = new ItalicDecorator(editor);
editor = new ColorDecorator(editor, 'blue');

console.log('Styled output:', editor.render());
// Output: <span style="color: blue"><em><strong>Hello World!</strong></em></span>

// Add auto-save functionality
editor = new AutoSaveDecorator(editor, 1000);
editor.write(' This is additional text.');
```

## Advanced Decorator: API Response Enhancement

```js
// Basic API client
class APIClient {
  async fetch(url) {
    console.log(`Fetching: ${url}`);
    // Simulate API call
    return {
      data: { message: 'Hello from API' },
      status: 200,
      timestamp: Date.now()
    };
  }
}

// Base decorator
class APIDecorator {
  constructor(client) {
    this.client = client;
  }

  async fetch(url) {
    return this.client.fetch(url);
  }
}

// Caching decorator
class CacheDecorator extends APIDecorator {
  constructor(client) {
    super(client);
    this.cache = new Map();
  }

  async fetch(url) {
    if (this.cache.has(url)) {
      console.log(`Cache hit for: ${url}`);
      return this.cache.get(url);
    }

    console.log(`Cache miss for: ${url}`);
    const response = await super.fetch(url);
    this.cache.set(url, response);
    return response;
  }
}

// Logging decorator
class LoggingDecorator extends APIDecorator {
  async fetch(url) {
    const startTime = Date.now();
    console.log(`[LOG] API request started: ${url}`);

    try {
      const response = await super.fetch(url);
      const duration = Date.now() - startTime;
      console.log(`[LOG] API request completed in ${duration}ms`);
      return response;
    } catch (error) {
      console.log(`[LOG] API request failed: ${error.message}`);
      throw error;
    }
  }
}

// Retry decorator
class RetryDecorator extends APIDecorator {
  constructor(client, maxRetries = 3) {
    super(client);
    this.maxRetries = maxRetries;
  }

  async fetch(url) {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${this.maxRetries}`);
        return await super.fetch(url);
      } catch (error) {
        lastError = error;
        if (attempt < this.maxRetries) {
          console.log(`Retrying in 1 second...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    throw lastError;
  }
}

// Usage - combining multiple decorators
let api = new APIClient();
api = new CacheDecorator(api);
api = new LoggingDecorator(api);
api = new RetryDecorator(api, 2);

// Make API calls
api.fetch('/users/1');
api.fetch('/users/1'); // Should hit cache
api.fetch('/posts/1');
```

# 

