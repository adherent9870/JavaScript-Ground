window.onload = () => {
  function add(a, b) {
    return a + b;
  }

  const result = add.call(1, 2);
  console.log(result); //  NAN     - because 'this' is 1, not an object
  // 'this' is not used in the function, so it doesn't affect the result   function.call(thisArg, arg1, arg2, ...)

  console.log(add(1, 2));

  function showValue(a, b) {
    return this.x + a + b;
  }
  const obj = { x: 5 };
  console.log(showValue.apply(obj, [2, 3])); // 10

  // apply

  function addingMultipleValues(q, r, ...s) {
    let a = [...arguments];
    console.log(q, r, s);
  }
  addingMultipleValues(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  addingMultipleValues.apply(null, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  //bind
  function greet() {
    console.log(this.messag);
  }
  const obj2 = { message: "Hello, World!" };
  const value = greet.bind(obj2);
  value();
};
