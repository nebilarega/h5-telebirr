const baseUrl = "http://apps.cybertribs.com";

document.addEventListener("DOMContentLoaded", () => {
  async function loginRandom() {
    const response = await fetch(`${baseUrl}/api/users/loginRandom`, {});
    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      window.location.href = "scanner.html";
    } else {
      alert("Something went wrong. Please reopen the page and try again.");
    }
  }
  loginRandom();
  if (
    window.location.pathname === "/ride.html" ||
    window.location.pathname === "/scanner.html"
  ) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "index.html";
    }
  }
});
