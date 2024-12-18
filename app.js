document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://your-backend-api.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "ride.html";
  } else {
    alert("Login failed. Please check your credentials.");
  }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const response = await fetch("http://your-backend-api.com/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.message === "User created") {
    alert("Account created successfully! Please log in.");
    window.location.href = "index.html";
  } else {
    alert("Sign up failed. Please try again.");
  }
});

if (window.location.pathname === "/ride.html") {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
  }
}
