/* ============================================================
   Tafí Viejo English Academy — script.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    menu.hidden = !open;
  }
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true")
  );
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- Sticky header shadow ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll(".stat__num[data-count]");
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1500;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && counters.length) {
    const co = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix || "")));
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  function showError(name, msg) {
    const field = form.querySelector(`[name="${name}"]`).closest(".field");
    field.classList.add("field--invalid");
    field.querySelector(".field__error").textContent = msg;
  }
  function clearError(name) {
    const field = form.querySelector(`[name="${name}"]`).closest(".field");
    field.classList.remove("field--invalid");
    field.querySelector(".field__error").textContent = "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    success.hidden = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    ["name", "email", "message"].forEach(clearError);

    if (!name) { showError("name", "Please enter your name."); valid = false; }
    if (!email) { showError("email", "Please enter your email."); valid = false; }
    else if (!emailRe.test(email)) { showError("email", "Enter a valid email address."); valid = false; }
    if (!message) { showError("message", "Tell us a little about your goal."); valid = false; }

    if (valid) {
      success.hidden = false;
      form.reset();
      success.focus?.();
    }
  });

  ["name", "email", "message"].forEach((n) => {
    const input = form.querySelector(`[name="${n}"]`);
    input.addEventListener("input", () => clearError(n));
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
