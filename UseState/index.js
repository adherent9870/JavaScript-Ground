window.onload = () => {
  const [state, setCount] = useState(3);
  console.log(
    `count value is ${state.value} and setCount value is ${setCount}`
  );

  setCount(4);
  console.log(
    `count value is ${state.value} and setCount value is ${setCount}`
  );
};

/**
 * useState is a simple state management function that returns a state object and a setter function.
 * Limitations:
 * - State updates are synchronous and do not trigger re-renders.
 * - Intended for demonstration purposes, not for use in real React applications.
 */
function useState(initialValue) {
  const state = { value: initialValue };

  const setState = (newVal) => {
    state.value = newVal;
  };

  return [state, setState];
}
