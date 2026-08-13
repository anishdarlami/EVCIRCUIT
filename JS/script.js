function showLogin() {
  document.getElementById("loginBox").classList.remove("d-none");
  document.getElementById("signupBox").classList.add("d-none");
  document.getElementById("forgetBox").classList.add("d-none");
}

function showSignup() {
  document.getElementById("loginBox").classList.add("d-none");
  document.getElementById("signupBox").classList.remove("d-none");
  document.getElementById("forgetBox").classList.add("d-none");
}

function showForget() {
  document.getElementById("loginBox").classList.add("d-none");
  document.getElementById("signupBox").classList.add("d-none");
  document.getElementById("forgetBox").classList.remove("d-none");
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
  if (document.getElementById("email")) {
    document.getElementById("email").value = email;
  }
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

function calculate() {
  const pointsInput = document.getElementById("points");
  const resultBox = document.getElementById("result");

  if (!pointsInput || !resultBox) return;

  const points = parseFloat(pointsInput.value);

  if (isNaN(points) || points <= 0) {
    resultBox.innerHTML = "<span style='color: #ff4d4d;'>⚠️ Please enter a valid number of points.</span>";
    return;
  }

  const discount = (points / 1000).toFixed(2);
  const trees = Math.floor(points / 10);    

  resultBox.innerHTML = `
    <p style="margin: 5px 0; color: #00eaff;">💰 Point worth: <strong>£${discount}</strong></p>
    <p style="margin: 5px 0; color: #a1ff42;">🌱 Trees Planted: <strong>${trees} trees</strong></p>
  `;
}

function findStation() {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  const place = searchInput.value.toLowerCase().trim();
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