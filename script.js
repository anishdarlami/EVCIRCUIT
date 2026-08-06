const correctEmail = "anish@gmail.com";
const correctPassword = "12345";

function login() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  if (!email || !pass) {
    alert("Please fill all fields");
  } 
  else if (email === correctEmail && pass === correctPassword) {
    alert("Login successful: " + email);
    window.location.href = "about.html";
  } 
  else {
    alert("Login failed: Incorrect email or password");
  }
}

function searchStation() {
  let query = document.getElementById("searchInput").value.trim();
  if (!query) {
    document.getElementById("searchResult").innerText = "Please enter a location.";
  } else {
    document.getElementById("searchResult").innerText =
      "Searching for EV stations near " + query + "...";
  }
}
