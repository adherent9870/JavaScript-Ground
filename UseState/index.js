window.onload = () => {
  let [count, setCount] = useState(3);
  console.log(`count value is ${count} and setcount value is ${setCount}`);

  setCount(4);
  console.log(`count value is ${count} and setcount value is ${setCount}`);
};

function useState(initialValue) {
  let val = initialValue;

  let setval = (newVal) => {
    val = newVal;
  };

  return [val, setval];
}
