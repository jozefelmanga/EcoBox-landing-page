(function () {
  // Legacy non-module bundle (nomodule) - reproduces main module behavior for environments without ES modules
  function initMenu() {
    var navToggle = document.querySelector(".nav-toggle");
    var navList = document.querySelector(".nav-list");
    var navLinks = document.querySelectorAll(".nav-list a");
    var header = document.querySelector(".site-header");
    var lastScroll = window.scrollY;

    function onScroll() {
      var current = window.scrollY;
      if (!header) return;
      if (current > lastScroll && current > 80) {
        header.style.transform = "translateY(-110%)";
        header.setAttribute("aria-hidden", "true");
      } else {
        header.style.transform = "translateY(0)";
        header.setAttribute("aria-hidden", "false");
      }
      lastScroll = current;
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    if (navToggle && navList) {
      navToggle.addEventListener("click", function () {
        var expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!expanded));
        navList.classList.toggle("is-open");
        if (!expanded) {
          var first = navList.querySelector("a");
          if (first) first.focus();
        } else navToggle.focus();
      });
      Array.prototype.forEach.call(navLinks, function (a) {
        a.addEventListener("click", function () {
          navList.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && navList.classList.contains("is-open")) {
          navList.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.focus();
        }
      });
    }
  }

  function initCarousel() {
    var carouselRoot = document.querySelector(".testimonials");
    if (!carouselRoot) return;
    var list = carouselRoot.querySelectorAll(".testimonial");
    if (!list || list.length === 0) return;
    var index = 0;
    var prevBtn = carouselRoot.querySelector(".carousel-prev");
    var nextBtn = carouselRoot.querySelector(".carousel-next");
    var dots = carouselRoot.querySelector(".carousel-dots");

    function show(i) {
      Array.prototype.forEach.call(list, function (el, idx) {
        el.style.opacity = idx === i ? "1" : "0";
        el.style.transform = idx === i ? "none" : "translateY(12px)";
        el.setAttribute("aria-hidden", idx === i ? "false" : "true");
        try {
          el.tabIndex = idx === i ? 0 : -1;
        } catch (e) {}
      });
      if (dots) {
        Array.prototype.forEach.call(dots.children, function (d, idx) {
          if (idx === i) d.classList.add("active");
          else d.classList.remove("active");
        });
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

    if (dots) {
      Array.prototype.forEach.call(list, function (_, i) {
        var but = document.createElement("button");
        but.className = "dot";
        but.setAttribute("aria-label", "Aller au témoignage " + (i + 1));
        but.addEventListener("click", function () {
          show(i);
        });
        dots.appendChild(but);
      });
    }

    var timer = setInterval(next, 6000);
    carouselRoot.addEventListener("mouseenter", function () {
      clearInterval(timer);
    });
    carouselRoot.addEventListener("mouseleave", function () {
      timer = setInterval(next, 6000);
    });

    // keyboard
    carouselRoot.addEventListener("keydown", function (e) {
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

    if (prevBtn) prevBtn.tabIndex = 0;
    if (nextBtn) nextBtn.tabIndex = 0;
    if (dots)
      Array.prototype.forEach.call(dots.children, function (d) {
        d.tabIndex = 0;
      });

    // announcer
    var announcer = carouselRoot.querySelector(".carousel-announcer");
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.className = "sr-only carousel-announcer";
      announcer.setAttribute("aria-live", "polite");
      carouselRoot.appendChild(announcer);
    }
    function announce(i) {
      var textEl = list[i].querySelector("p");
      var summary = textEl
        ? (textEl.textContent || "").slice(0, 140)
        : "Témoignage " + (i + 1);
      announcer.textContent = "Témoignage " + (i + 1) + " — " + summary;
    }

    // pointer swipe
    var startX = 0,
      isDown = false,
      threshold = 40;
    carouselRoot.addEventListener("pointerdown", function (e) {
      isDown = true;
      startX = e.clientX;
      try {
        carouselRoot.setPointerCapture &&
          carouselRoot.setPointerCapture(e.pointerId);
      } catch (err) {}
      clearInterval(timer);
    });
    carouselRoot.addEventListener("pointerup", function (e) {
      if (!isDown) return;
      isDown = false;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > threshold) {
        if (dx < 0) next();
        else prev();
      }
      timer = setInterval(next, 6000);
    });
    carouselRoot.addEventListener("pointercancel", function () {
      isDown = false;
      timer = setInterval(next, 6000);
    });

    show(0);
    announce(0);
  }

  function initForm() {
    var form = document.querySelector(".contact-form");
    var feedback = document.querySelector(".form-feedback");
    if (!form || !feedback) return;
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
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
      feedback.textContent = "Envoi en cours...";
      feedback.style.color =
        getComputedStyle(document.documentElement).getPropertyValue(
          "--color-muted"
        ) || "#6b7280";
      setTimeout(function () {
        feedback.textContent =
          "Votre message a bien été envoyé. Nous revenons vers vous sous 24h.";
        feedback.style.color =
          getComputedStyle(document.documentElement).getPropertyValue(
            "--color-primary"
          ) || "#2f9b5d";
        form.reset();
      }, 800);
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) {
        el.classList.add("revealed");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    Array.prototype.forEach.call(els, function (el) {
      io.observe(el);
    });
  }

  function initCounters() {
    var counters = document.querySelectorAll(".count");
    if (!counters || counters.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(counters, function (c) {
        c.textContent = c.dataset.target || c.textContent;
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.dataset.target, 10) || 0;
          var duration = 1800;
          var start = performance.now();
          var initial =
            parseInt((el.textContent || "").replace(/\D/g, "")) || 0;
          function step(ts) {
            var progress = Math.min(1, (ts - start) / duration);
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
    Array.prototype.forEach.call(counters, function (c) {
      io.observe(c);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMenu();
    initCarousel();
    initForm();
    initReveal();
    initCounters();
    var currentYear = document.getElementById("current-year");
    if (currentYear) currentYear.textContent = new Date().getFullYear();
  });
})();
