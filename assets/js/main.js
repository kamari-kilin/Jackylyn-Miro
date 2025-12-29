(function () {
  const body = document.body;
  const THEME_KEY = "jm-theme";

  const themeToggle = document.getElementById("theme-toggle");
  const navToggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const contactForm = document.getElementById("contact-form");
  const yearSpan = document.getElementById("year");

  // Set current year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Theme handling
  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.add("theme-light");
      body.classList.remove("theme-dark");
      if (themeToggle) themeToggle.textContent = "Light mode";
    } else {
      body.classList.add("theme-dark");
      body.classList.remove("theme-light");
      if (themeToggle) themeToggle.textContent = "Dark mode";
    }
  }

  const storedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "dark");

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isCurrentlyDark = body.classList.contains("theme-dark");
      const nextTheme = isCurrentlyDark ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    });
  }

  // Mobile navigation toggle
  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (header.classList.contains("nav-open")) {
          header.classList.remove("nav-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Contact form simple handler
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");

      alert(
        `Thank you${name ? `, ${name}` : ""}! Your message has been recorded locally. Implement a backend or email service to fully enable this form.`
      );

      contactForm.reset();
    });
  }
})();
