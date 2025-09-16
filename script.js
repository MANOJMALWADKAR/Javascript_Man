// 1. FIND MAX AND MIN FROM GIVEN ARRAY
// const arr = [1,2,3,4,5,6]

// let max = arr[0]
// let min = arr[0]

// for(i=1;i<arr.length;i++){
//     if(max < arr[i]){
//         max = arr[i]
//     }else{
//         min = arr[i]
//     }
// }

// console.log(max)
// console.log(min)

// 2. REMOVE THE DUPLICATES FROM THE ARRAY

// function removeDuplicates(sortedArray){

//     let uniqueArray = [sortedArray[0]]

//     for(let i=1; i<sortedArray.length; i++){
//         if(sortedArray[i] != sortedArray[i-1]){
//             uniqueArray.push(sortedArray[i])
//         }
//     }
//     return uniqueArray
// }

// const sortedArray = [1,2,2,3,3,3]
// const result = removeDuplicates(sortedArray)
// console.log(result)


// SORTED ARRAY

// let arr = [5,4,3,2,1]
// let swapped = true

// while(swapped){
//     swapped = false

//     for(i = 0; i < arr.length-1; i++){

//         if(arr[i] > arr[i+1]){

//             let temp = arr[i]
//             arr[i] = arr[i+1]
//             arr[i+1] = temp

//             swapped = true
//         }
//     }
// }
// console.log(arr)


// let num = 123456;

// while (num > 0) {
//     let digit = num % 10;
//     console.log(digit);
//     num = Math.floor(num / 10);
// }


// let num = 123456;
// let reversed = 0;

// while (num > 0) {
//     let digit = num % 10;
//     reversed = reversed * 10 + digit;
//     num = Math.floor(num / 10);
// }

// console.log(reversed);  // Output: 654321
 
// let num = 12345432;

// for (let digit of num.toString()) {
//     console.log(digit); // digit is a string
// }

// let num = 12345432;

// while (num > 0) {
//     let digit = num % 10;
//     console.log(digit); // prints digits in reverse order
//     num = Math.floor(num / 10);
// }
 

// const obj = '{"name": "Alice","age": 25,"isStudent": false,"courses": ["Math", "Science"],"address": {"city": "New York","zip": "10001"}}'

// const a = `{
//   "name": "Alice",
//   "age": 25,
//   "isStudent": false,
//   "courses": ["Math", "Science"],
//   "address": {
//     "city": "New York",
//     "zip": "10001"
//   }
// }
// `

// const stringify = JSON.parse(obj)
// console.log(stringify)
 
//  const b = stringify
// console.log(b)
//  const c = JSON.stringify(b)
//  console.log(c)


// const a=[1,2,3]
// const b = [...a];
// console.log(...b)


// const obj1 = { a: 1, b: 2 };
// const obj2 = { ...obj1 };  // { a:1, b:2, c:3 }

// console.log(...Object.values(obj2))
// console.log(...Object.keys(obj2))

// arr1 = [1,2,3,4,5]
// arr2 = [...arr1]   //shallow copy
// arr2[0] = 100

// console.log(arr1)
// console.log(arr2)


// let a = 10
// let b = a
// a= 5
// console.log(a)
// console.log(a==b)

// class MyClass {
//     constructor(name)  {
//         this.name = name
//     }

//     greet() {
//         console.log("hello " + this.name)
//     }
// }

// const a = new MyClass('manoj') 
//  a.greet()

// class MyClass {
     

//     greet(name) {
//         console.log("hello "+name )
//     }
// }

// const a = new MyClass() 
//  a.greet('manoj')