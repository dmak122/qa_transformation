var num = 'twenty three';   
let num2 = 42;                              
const num3 = 3.14;      
let num4 = true;                       

console.log("Value:" + (num2 - num3));


// conditions

let age = 15;

if (age >= 18) {
  console.log("overage");
} else {
  console.log("underage");
}

// arrays

let words = ["apples", "bananas", "oranges"];

console.log("words:", words);
console.log("1st:", words[0]);
console.log("lenght:", words.length);


// loops

for (let i = 0; i < 3; i++) {
  console.log("i =", i);
}
console.log("while:");
let count = 0;
while (count < 3) {
  console.log("  count =", count);
  count++;


// functions

function sum(a, b) {
  return a + b;
}
console.log("sum(a, b):", sum(11, 4));

//errors handling

try {
  let result = non_exist + 1;  
} catch (error) {
  console.log("error catch:", error.message);
}
}