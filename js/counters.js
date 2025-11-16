export default function initCounters() {
  const counters = document.querySelectorAll(".count");
  if (!counters || counters.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach(
      (c) => (c.textContent = c.dataset.target || c.textContent)
    );
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10) || 0;
        const duration = 1800;
        const start = performance.now();
        const initial = parseInt(el.textContent.replace(/\D/g, "")) || 0;

        function step(ts) {
          const progress = Math.min(1, (ts - start) / duration);
          el.textContent = Math.floor(
            initial + (target - initial) * progress
          ).toLocaleString();
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((c) => io.observe(c));
}
