// Sample function for demonstrations
function introduce(greeting, punctuation) {
  return `${greeting}, my name is ${this.name} and I am ${this.age} years old${punctuation}`;
}

function calculateAverage() {
  const scores = Array.from(arguments);
  const sum = scores.reduce((total, score) => total + score, 0);
  const average = sum / scores.length;
  return `Hello, my name is ${
    this.name
  } and my average score is ${average.toFixed(2)}`;
}

// Demo for call()
function demoCall() {
  const name = document.getElementById("call-name").value || "John";
  const age = document.getElementById("call-age").value || 25;

  const person = { name, age };
  const result = introduce.call(person, "Hello", "!");

  document.getElementById("call-output").textContent = result;
}

// Demo for apply()
function demoApply() {
  const name = document.getElementById("apply-name").value || "Jane";
  const scoresInput =
    document.getElementById("apply-scores").value || "85,92,78";
  const scores = scoresInput.split(",").map((score) => parseInt(score.trim()));

  const person = { name };
  const result = calculateAverage.apply(person, scores);

  document.getElementById("apply-output").textContent = result;
}

// Demo for bind()
let boundFunction = null;

function demoBind() {
  const name = document.getElementById("bind-name").value || "Bob";
  const age = document.getElementById("bind-age").value || 30;

  const person = { name, age };
  boundFunction = introduce.bind(person, "Hi", "!");

  document.getElementById("bind-output").textContent =
    'Bound function created. Click "Execute bound function" to run it.';
}

function executeBound() {
  if (boundFunction) {
    const result = boundFunction();
    document.getElementById("bind-output").textContent = result;
  } else {
    document.getElementById("bind-output").textContent =
      "Please create a bound function first.";
  }
}

// Initialize with some examples
window.onload = function () {
  demoCall();
  demoApply();
  demoBind();

  let a = [1, 1, 1, 1, 1, 1, 1, 1];
  let v = a;
};
