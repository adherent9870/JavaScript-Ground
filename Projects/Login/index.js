window.onload = function () {
  console.log("Login page loaded successfully");
  const LoginForm = document.forms["LoginForm"];

  const loginstatus = document.getElementById("Loginstatus");
  const registerstatus = document.getElementById("Registrationstatus");
  LoginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("Login form submitted");

    const email = LoginForm.email.value;
    const password = LoginForm.password.value;
    console.log("Email:", email);
    console.log("Password:", password);

    const data = { email, password };
    console.log("Data to be sent:", data);

    requestCall(data);
  });
  async function requestCall(data) {
    fetch("http://127.0.0.1:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          loginstatus.innerText = "👍Login successful...";
          loginstatus.style.color = "green";
        } else {
          loginstatus.innerHTML = `👎Login failed. Please try again.<br><b>Reason:</b> ${data.message}`;
          loginstatus.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        loginstatus.innerText = `👎Login failed. Please try again.<b>Reason:</b> ${error.message}`;
      });
  }

  const registerForm = document.forms["RegisterForm"];
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullname = registerForm.fullname.value;
    const email = registerForm.emaail.value;
    const password = registerForm.passwords.value;
    const confirmpassword = registerForm.confirmpasswords.value;

    const data = {
      name: fullname,
      email: email,
      password: password,
      passwordConfirm: confirmpassword,
    };
    console.log("Register form submitted", data);

    registerRequestCall(data);
  });

  async function registerRequestCall(data) {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Registration response:", result);
      if (result.status === "success") {
        registerstatus.innerText = "👍Registration successful...";
        registerstatus.style.color = "green";
      } else {
        registerstatus.innerHTML = `👎Registration failed. Please try again.<br><b>Reason:</b> ${result.message}`;
        registerstatus.style.color = "red";
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
};
