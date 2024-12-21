const baseUrl = "http://196.188.63.43:3000";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("loginForm")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "ride.html";
      } else {
        alert("Login failed. Please check your credentials.");
      }
    });

  document
    .getElementById("signupForm")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      const response = await fetch(`${baseUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("Account created successfully! Please log in.");
        window.location.href = "index.html";
      }
    });

  if (window.location.pathname === "/ride.html") {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "index.html";
    }
  }

  if (window.location.pathname === "/login.html") {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "ride.html";
    }
  }
});
