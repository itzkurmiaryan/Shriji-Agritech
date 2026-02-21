// ===============================
// NAVBAR
// ===============================
const toggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (toggle && navbar) {
  toggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}


// ===============================
// COUNTER
// ===============================
const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}


// ===============================
// FAQ
// ===============================
const faqBtns = document.querySelectorAll(".faq-question");

if (faqBtns.length > 0) {
  faqBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.nextElementSibling.classList.toggle("active");
    });
  });
}


// ===============================
// PRODUCT SLIDER
// ===============================
const slider = document.getElementById("productSlider");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (slider) {

  slider.innerHTML += slider.innerHTML;

  let scrollAmount = 0;
  const speed = 0.5;

  function autoScroll() {
    scrollAmount += speed;
    slider.scrollLeft = scrollAmount;

    if (scrollAmount >= slider.scrollWidth / 2) {
      scrollAmount = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      scrollAmount += 300;
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      scrollAmount -= 300;
    });
  }
}

