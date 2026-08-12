const correctEmail = "circuitev@gmail.com";
const correctPassword = "12345";

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const forgetBox = document.getElementById("forgetBox");

function showLogin() {
  loginBox.classList.remove("d-none");
  signupBox.classList.add("d-none");
  forgetBox.classList.add("d-none");
}

function showSignup() {
  loginBox.classList.add("d-none");
  signupBox.classList.remove("d-none");
  forgetBox.classList.add("d-none");
}

function showForget() {
  loginBox.classList.add("d-none");
  signupBox.classList.add("d-none");
  forgetBox.classList.remove("d-none");
}

function toggleResetFields() {
  const method = document.getElementById("reset-method").value;
  document.getElementById("emailField").classList.toggle("d-none", method !== "email");
  document.getElementById("phoneField").classList.toggle("d-none", method !== "phone");
}

function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

function login() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember").checked;

  if (!email || !pass) return alert("Please fill all fields");

  const savedEmail = localStorage.getItem("signupEmail");
  const savedPass = localStorage.getItem("signupPass");

  if ((email === correctEmail && pass === correctPassword) ||
      (email === savedEmail && pass === savedPass)) {
    alert("Login successful!");
    if (remember) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPass", pass);
    }
    window.location.href = "home.html";
  } else alert("Incorrect email or password");
}

function signup() {
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const pass = document.getElementById("signup-pass").value.trim();

  if (!name || !email || !pass) return alert("Please fill all fields");

  localStorage.setItem("signupEmail", email);
  localStorage.setItem("signupPass", pass);
  alert("Account created successfully!");
  showLogin();
}

function resetPassword() {
  const method = document.getElementById("reset-method").value;
  if (!method) return alert("Please choose a reset method");
  alert(`Password reset via ${method === "email" ? "email" : "phone"} initiated.`);
  showLogin();
}

function calculate() {
  const p = Number(document.getElementById("points").value);

  if (isNaN(p) || p <= 0) {
    document.getElementById("result").innerHTML = "Please enter valid points.";
    return;
  }

  const value = (p * 0.10).toFixed(2);
  const trees = Math.floor(p / 10);
  const rewards = p >= 200 ? "Eligible for 10% charging discount" : "Keep collecting for rewards";

  document.getElementById("result").innerHTML = `
    <p><strong>Points:</strong> ${p}</p>
    <p><strong>Value:</strong> £${value}</p>
    <p><strong>Rewards:</strong> ${rewards}</p>
    <p><strong>Tree Contribution:</strong> ${trees} tree(s)</p>
  `;
}


function findStation() {
  let place = document.getElementById("search").value.toLowerCase();
  let box = document.getElementById("stationResult");

  const freeStations = {
    "dartford": "GreenPark EV Hub,DA1 1BP,Free Fast Charging",
    "da1 1bp": "GreenPark EV Hub,Free Fast Charging",

    "princes road": "EcoCharge Station,DA1 3HJ,Free Charging",
    "da1 3hj": "EcoCharge Station,Free Charging",

    "temple hill": "VoltFree Station,DA1 5LR,Free Fast Charging",
    "da1 5lr": "VoltFree Station,Free Fast Charging",

    "retail park": "BlueGrid EV Point,DA2 6QL,Free Slow Charging",
    "da2 6ql": "BlueGrid EV Point,Free Slow Charging",

    "stone": "ChargeGo Station,DA2 6FD,Free Standard Charging",
    "da2 6fd": "ChargeGo Station,Free Standard Charging",

    "greenhithe": "RiverCharge Hub,DA9 9BT,Free Fast Charging",
    "da9 9bt": "RiverCharge Hub,Free Fast Charging",

    "erith": "EcoVolt Station,DA8 1QX,Free Slow Charging",
    "da8 1qx": "EcoVolt Station,Free Slow Charging"
  };

  box.innerHTML = freeStations[place]
    ? "🔌 " + freeStations[place]
    : "❌ No free charging station found.";
}
