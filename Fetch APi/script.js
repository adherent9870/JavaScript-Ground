// fetch API -

let btn = document.querySelector("#fetchData");
btn.addEventListener("click", () => {
  fetch("https://meowfacts.herokuapp.com/", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      let h1 = document.querySelector("#message");
      h1.textContent = data.data[0];
    })
    .catch((err) => console.error(err));
});

//
fetch("api likhenge", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
})
  .then((data) => {
    let a = data.json();
    return a;
  })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
