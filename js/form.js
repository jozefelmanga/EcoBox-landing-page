export default function initForm() {
  const form = document.querySelector(".contact-form");
  const feedback = document.querySelector(".form-feedback");
  if (!form || !feedback) return;

  // Additional validation rules
  function validateEmail(email) {
    // simple but effective regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    if (!name.value.trim()) {
      feedback.textContent = "Veuillez indiquer votre nom.";
      feedback.style.color = "#e11d48";
      name.focus();
      return;
    }

    if (!validateEmail(email.value)) {
      feedback.textContent = "L'email semble invalide.";
      feedback.style.color = "#e11d48";
      email.focus();
      return;
    }

    if (message.value.trim().length < 10) {
      feedback.textContent =
        "Merci de laisser un message plus détaillé (au moins 10 caractères).";
      feedback.style.color = "#e11d48";
      message.focus();
      return;
    }

    // Simulate async submit
    feedback.textContent = "Envoi en cours...";
    feedback.style.color = "var(--color-muted)";

    setTimeout(() => {
      feedback.textContent =
        "Votre message a bien été envoyé. Nous revenons vers vous sous 24h.";
      feedback.style.color = "var(--color-primary)";
      form.reset();
    }, 800);
  });
}
