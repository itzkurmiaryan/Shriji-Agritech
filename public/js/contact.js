document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const overlay = document.getElementById("thankYouOverlay");
  const button = document.getElementById("submitBtn");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    button.innerText = "Sending...";
    button.disabled = true;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {
        form.reset();
        overlay.classList.add("active");
        setTimeout(() => overlay.classList.remove("active"), 3000);
      } else {
        alert(result.message || "Failed to send message.");
      }
    } catch (err) {
      console.error("Contact Error:", err);
      alert("Server error! Make sure backend is running on port 5000.");
    }

    button.innerText = "Send Message";
    button.disabled = false;
  });
});