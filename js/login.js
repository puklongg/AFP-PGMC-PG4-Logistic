

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMessage = document.getElementById("error-message");

  if (username === "admin" && password === "password") {
    window.location.href = "dashboard.html";
  } else {
    errorMessage.textContent = "Invalid username or password.";
    errorMessage.style.display = "block";
  }
});

