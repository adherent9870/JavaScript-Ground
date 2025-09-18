window.onload = () => {
  // basic debouncer
  //   let counter = 0;
  //   let timer;
  //   const field = document.querySelector("#input-field");
  //   field.addEventListener("keyup", (e) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       console.log("clicked...", counter++);
  //     }, 500);
  //   });

  let counter = 0;
  let field = document.querySelector("#input-field");
  let timer;
  //   field.addEventListener("keyup", debouncer(doit(), 400));
  //   function debouncer(fn, delay) {
  //     clearTimeout(timer);
  //     timer = setTimeout(fn(), delay);
  //   }
  //   function doit() {
  //     console.log("clicked...", counter++);
  //   }

  field.addEventListener("keyup", () => {
    debouncer(doit, 400);
  });
  function debouncer(fn, delay) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  }

  function doit() {
    console.log("clicked...", counter++);
  }
};
