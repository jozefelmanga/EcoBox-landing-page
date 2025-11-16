export default function initReveal() {
  // Simple IntersectionObserver-based reveal animations
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    // fallback: show all
    els.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}
