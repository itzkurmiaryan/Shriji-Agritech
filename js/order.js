document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const overlay = document.getElementById("thankyouOverlay") || document.getElementById("thankYouOverlay");
  const productSelect = document.getElementById("product");
  const otherBox = document.getElementById("otherProductBox");
  const otherInput = document.getElementById("otherProduct");

  if(otherBox) otherBox.style.display = "none";

  productSelect.addEventListener("change", function () {
    if (this.value === "Other") {
      otherBox.style.display = "block";
      otherInput.required = true;
    } else {
      otherBox.style.display = "none";
      otherInput.required = false;
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedProduct = productSelect.value === "Other" ? otherInput.value : productSelect.value;

    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      product: selectedProduct,
      quantity: form.quantity.value,
      address: form.address.value,
      district: form.district.value,
      state: form.state.value,
      message: form.message.value,
    };

    const button = form.querySelector("button");
    button.innerText = "Sending...";
    button.disabled = true;

    try {
      const res = await fetch('http://localhost:5000/order', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if(result.success){
        form.reset();
        otherBox.style.display = "none";
        overlay.classList.add("active");
        setTimeout(()=> overlay.classList.remove("active"), 3000);
      } else alert(result.message || "Order failed.");
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }

    button.innerText = "Place Order";
    button.disabled = false;
  });
});