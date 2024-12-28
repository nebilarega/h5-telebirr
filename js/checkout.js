document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const merch_order_id = localStorage.getItem("merch_order_id");
  async function checkPayment() {
    try {
      const headers = new Headers();

      console.log("merch_order_id", merch_order_id);

      if (!token || !merch_order_id) {
        console.error("Token or merch_order_id not found in localStorage.");
        alert("Session expired or invalid. Redirecting to payment page.");
        window.location.href = "pay.html";
        return;
      }

      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(
        `${window.APP_CONFIG.BASE_URL}/api/payment/checkPayment`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ merch_order_id }),
        }
      );

      if (response.status === 403) {
        console.error("Token expired. Redirecting to payment page.");
        alert("Session expired. Please log in again.");
        window.location.href = "pay.html";
        return;
      }

      console.log(response);

      if (!response.ok) {
        console.error("Error with payment check:", response.statusText);
        alert("Something went wrong. Please reopen the page and try again.");
        return;
      }

      const data = await response.json();

      if (data.payment_token) {
        localStorage.setItem("payment_token", data.payment_token);
        console.log({ data });
        const loader = document.getElementsByClassName("loader")[0];
        loader.style.display = "none";

        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML = `
          <h1>Payment Successful</h1>
          <p>Merchant Order ID: <strong>${data.merch_order_id}</strong></p>
          <p>Amount Paid: <strong>${data.total_amount} Birr payed</strong></p>
          <p>Ride bought: <strong>${data.total_amount / 10} mins</strong></p>
        `;

        // Create the "Start Ride" button
        const startRideButton = document.createElement("button");
        startRideButton.textContent = "Start Ride";
        startRideButton.className = "start-ride-btn";
        startRideButton.addEventListener("click", () => {
          window.location.href = "ride.html";
        });

        successMessage.appendChild(startRideButton);
        document.body.appendChild(successMessage);
      } else {
        alert("Something went wrong. Please reopen the page and try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert(
        "An error occurred while checking payment. Please try again later."
      );
    }
  }
  checkPayment();
});
