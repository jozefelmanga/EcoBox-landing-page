export default function initMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  // sticky show/hide on scroll
  let lastScroll = window.scrollY;
  const header = document.querySelector(".site-header");

  function onScroll() {
    const current = window.scrollY;
    if (!header) return;
    if (current > lastScroll && current > 80) {
      // scrolling down -> hide
      header.style.transform = "translateY(-110%)";
      header.setAttribute("aria-hidden", "true");
    } else {
      // scrolling up -> show
      header.style.transform = "translateY(0)";
      header.setAttribute("aria-hidden", "false");
    }
    lastScroll = current;
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navList.classList.toggle("is-open");
      if (!expanded) {
        // move focus into the menu for accessibility
        const firstLink = navList.querySelector("a");
        if (firstLink) firstLink.focus();
      } else {
        navToggle.focus();
      }
    });

    // close on link click
    navList.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );

    // close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navList.classList.contains("is-open")) {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }
}
