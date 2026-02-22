document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const overlay = document.getElementById("thankyouOverlay");
  const productSelect = document.getElementById("product");
  const otherBox = document.getElementById("otherProductBox");
  const otherInput = document.getElementById("otherProduct");

  // Hide Other box initially
  otherBox.style.display = "none";

  // Show Other product input
  productSelect.addEventListener("change", function () {
    if (this.value === "Other") {
      otherBox.style.display = "block";
      otherInput.required = true;
    } else {
      otherBox.style.display = "none";
      otherInput.required = false;
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const selectedProduct =
      productSelect.value === "Other"
        ? otherInput.value
        : productSelect.value;

    const data = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      product: selectedProduct,
      quantity: document.getElementById("quantity").value,
      address: document.getElementById("address").value,
      district: document.getElementById("district").value,
      state: document.getElementById("state").value,
      message: document.getElementById("message").value,
    };

    const button = form.querySelector("button");
    button.innerText = "Sending...";
    button.disabled = true;

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        form.reset();
        otherBox.style.display = "none";
        overlay.classList.add("active");

        setTimeout(() => {
          overlay.classList.remove("active");
        }, 3000);
      } else {
        alert(result.message || "Order failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error. Try again.");
    }

    button.innerText = "Place Order";
    button.disabled = false;
  });

});