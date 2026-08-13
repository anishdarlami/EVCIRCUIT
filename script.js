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

function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

function toggleResetFields() {
  const method = document.getElementById("reset-method").value;
  document.getElementById("emailField").classList.toggle("d-none", method !== "email");
  document.getElementById("phoneField").classList.toggle("d-none", method !== "phone");
}

function signup() {
  const email = document.getElementById("signup-email").value.trim();
  const pass = document.getElementById("signup-pass").value.trim();

  if (!email || !pass) return alert("Please fill all fields");

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPass", pass);

  alert("Account created! You can now log in.");
  showLogin();
  if (document.getElementById("email")) document.getElementById("email").value = email;
}

function login() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!email || !pass) return alert("Please fill all fields");

  const savedEmail = localStorage.getItem("userEmail");
  const savedPass = localStorage.getItem("userPass");

  if (!savedEmail) {
    alert("No account found. Please create an account first.");
  } else if (email === savedEmail && pass === savedPass) {
    alert("Login successful!");
    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password");
  }
}

function resetPassword() {
  const method = document.getElementById("reset-method").value;
  const inputVal = method === "email" 
    ? document.getElementById("reset-email").value.trim() 
    : document.getElementById("reset-phone").value.trim();
    
  const savedEmail = localStorage.getItem("userEmail");

  if (!inputVal) return alert("Please enter your email or phone number");
  if (!savedEmail) return alert("No registered account found on this browser");

  const code = Math.floor(1000 + Math.random() * 9000);
  alert(`Your reset code is: ${code}`);

  const userCode = prompt("Enter the 4-digit code:");
  if (userCode === String(code)) {
    const newPass = prompt("Enter new password:");
    if (newPass && newPass.trim() !== "") {
      localStorage.setItem("userPass", newPass.trim());
      alert("Password updated! Please log in.");
      showLogin();
    }
  } else {
    alert("Incorrect code");
  }
}

function findStation() {
  const place = document.getElementById("search").value.toLowerCase().trim();
  const box = document.getElementById("stationResult");

  const stations = {
    "dartford": "GreenPark EV Hub, DA1 1BP",
    "da1 1bp": "GreenPark EV Hub, DA1 1BP",
    "greenhithe": "RiverCharge Hub, DA9 9BT",
    "da9 9bt": "RiverCharge Hub, DA9 9BT",
    "erith": "EcoVolt Station, DA8 1QX",
    "da8 1qx": "EcoVolt Station, DA8 1QX"
  };

  if (box) {
    box.innerHTML = stations[place] ? "🔌 " + stations[place] : "❌ No station found.";
  }
}