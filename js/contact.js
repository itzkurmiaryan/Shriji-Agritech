document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const overlay = document.getElementById("thankYouOverlay");
  const button = document.getElementById("submitBtn");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    button.innerText = "Sending...";
    button.disabled = true;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        form.reset();
        overlay.classList.add("active");

        setTimeout(() => {
          overlay.classList.remove("active");
        }, 3000);
      } else {
        alert(result.message || "Message failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error. Try again.");
    }

    button.innerText = "Send Message";
    button.disabled = false;
  });

});