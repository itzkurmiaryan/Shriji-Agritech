document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const overlay = document.getElementById("thankYouOverlay");
  const button = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.innerText = "Sending...";
    button.disabled = true;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        form.reset();
        overlay.classList.add("active");
        setTimeout(() => overlay.classList.remove("active"), 3000);
      } else alert("Failed to send.");
    } catch (err) {
      alert("Server error!");
      console.error(err);
    }

    button.innerText = "Send Message";
    button.disabled = false;
  });
});