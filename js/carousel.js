export default function initCarousel() {
  // Create a minimal accessible carousel for testimonials
  const carouselRoot = document.querySelector(".testimonials");
  if (!carouselRoot) return;

  const list = carouselRoot.querySelectorAll(".testimonial");
  if (list.length === 0) return;

  let index = 0;
  const prevBtn = carouselRoot.querySelector(".carousel-prev");
  const nextBtn = carouselRoot.querySelector(".carousel-next");
  const dots = carouselRoot.querySelector(".carousel-dots");

  function show(i) {
    list.forEach((el, idx) => {
      el.style.opacity = idx === i ? "1" : "0";
      el.style.transform = idx === i ? "none" : "translateY(12px)";
      el.setAttribute("aria-hidden", idx === i ? "false" : "true");
      el.tabIndex = idx === i ? 0 : -1;
    });
    if (dots) {
      Array.from(dots.children).forEach((d, idx) =>
        d.classList.toggle("active", idx === i)
      );
    }
    index = i;
  }

  function next() {
    show((index + 1) % list.length);
  }
  function prev() {
    show((index - 1 + list.length) % list.length);
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // build dots
  if (dots) {
    list.forEach((_, i) => {
      const but = document.createElement("button");
      but.className = "dot";
      but.setAttribute("aria-label", `Aller au témoignage ${i + 1}`);
      but.addEventListener("click", () => show(i));
      dots.appendChild(but);
    });
  }

  // auto rotate
  let timer = setInterval(next, 6000);
  carouselRoot.addEventListener("mouseenter", () => clearInterval(timer));
  carouselRoot.addEventListener(
    "mouseleave",
    () => (timer = setInterval(next, 6000))
  );

  // keyboard navigation for accessibility
  carouselRoot.addEventListener("keydown", (e) => {
    // allow navigation when focus is inside the carousel
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      show(0);
    } else if (e.key === "End") {
      e.preventDefault();
      show(list.length - 1);
    }
  });

  // ensure controls are keyboard-focusable
  if (prevBtn) prevBtn.tabIndex = 0;
  if (nextBtn) nextBtn.tabIndex = 0;
  if (dots) Array.from(dots.children).forEach((d) => (d.tabIndex = 0));

  // aria-live region for screen readers to announce slide changes
  let announcer = carouselRoot.querySelector(".carousel-announcer");
  if (!announcer) {
    announcer = document.createElement("div");
    announcer.className = "sr-only carousel-announcer";
    announcer.setAttribute("aria-live", "polite");
    carouselRoot.appendChild(announcer);
  }

  // update announcer inside show()
  const origShow = show;
  function showAndAnnounce(i) {
    origShow(i);
    const textEl = list[i].querySelector("p");
    const summary = textEl
      ? textEl.textContent.slice(0, 140)
      : `Témoignage ${i + 1}`;
    announcer.textContent = `Témoignage ${i + 1} — ${summary}`;
  }

  // touch / pointer swipe support
  let startX = 0;
  let isPointerDown = false;
  const threshold = 40; // px

  carouselRoot.addEventListener("pointerdown", (e) => {
    isPointerDown = true;
    startX = e.clientX;
    carouselRoot.setPointerCapture &&
      carouselRoot.setPointerCapture(e.pointerId);
    clearInterval(timer);
  });

  carouselRoot.addEventListener("pointermove", (e) => {
    if (!isPointerDown) return;
    // could implement drag visual feedback here
  });

  carouselRoot.addEventListener("pointerup", (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > threshold) {
      if (dx < 0) next();
      else prev();
    }
    timer = setInterval(next, 6000);
  });

  carouselRoot.addEventListener("pointercancel", () => {
    isPointerDown = false;
    timer = setInterval(next, 6000);
  });

  // swap to enhanced show
  showAndAnnounce(0);
}
