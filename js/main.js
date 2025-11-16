// Entry point to initialize modules
import initMenu from "./menu.js";
import initCarousel from "./carousel.js";
import initForm from "./form.js";
import initReveal from "./reveal.js";
import initCounters from "./counters.js";

// Init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initCarousel();
  initForm();
  initReveal();
  initCounters();

  // update footer year (migrated from legacy script.js)
  const currentYear = document.getElementById("current-year");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
});
