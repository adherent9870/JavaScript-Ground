//example 1->
// basic closure example

function xyz() {
  let a = 10;
  return function inner() {
    console.log(a);
  };
}
let res = xyz();

console.log("example 1: output");
res();

// output mein 10 aa rha hai check kro

//play with example with
function abc() {
  let b = 20;
  return function inner() {
    b++;
    console.log(b);
  };
}
let res2 = abc();

console.log("example 2: output");
res2();
res2();
// output mein 22 aa rha hai check kro
let res3 = abc();
res3();
res3();
res3();
res3();
// first time call hone pr hume function milegi, then next time we can calll the fucntion to run as many time
