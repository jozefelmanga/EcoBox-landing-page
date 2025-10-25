const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list a");
const contactForm = document.querySelector(".contact-form");
const feedback = document.querySelector(".form-feedback");
const currentYear = document.getElementById("current-year");

// Update footer year without breaking caching
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Mobile navigation toggle logic
if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navList.classList.toggle("is-open");
  });

  // Close menu when a link is selected
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Lightweight form validation feedback
if (contactForm && feedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      feedback.textContent = "Merci de vérifier les informations requises.";
      feedback.style.color = "#e11d48";
      return;
    }

    feedback.textContent =
      "Votre message a bien été envoyé. Nous revenons vers vous sous 24h avec un devis personnalisé.";
    feedback.style.color = "var(--color-primary)";
    contactForm.reset();
  });
}
