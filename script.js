
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav-links");
  if (menu && nav) {
    menu.setAttribute("aria-expanded", "false");
    menu.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(isOpen));
      menu.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menu.textContent = isOpen ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Open navigation");
        menu.textContent = "☰";
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Open navigation");
        menu.textContent = "☰";
      }
    });
  }

  const year = document.querySelectorAll("[data-year]");
  year.forEach(el => el.textContent = new Date().getFullYear());

  // Consultation form: replace the endpoint below with your preferred form service.
  // Example: Formspree, Web3Forms, a Wix form endpoint, or your own backend.
  const form = document.querySelector("#consultation-form");
  const notice = document.querySelector("#form-notice");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const endpoint = form.dataset.endpoint;
      const data = new FormData(form);

      if (!endpoint || endpoint.includes("YOUR_FORM_ENDPOINT")) {
        notice.textContent = "Your form is ready. Add your form endpoint in script.js before launching so enquiries are sent to your team.";
        notice.classList.add("show");
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" }
        });
        if (response.ok) {
          form.reset();
          notice.textContent = "Thank you — your details have been sent. Please use the booking calendar below to choose your free 15-minute consultation time.";
          notice.classList.add("show");
        } else {
          throw new Error("Submission failed");
        }
      } catch {
        notice.textContent = "We couldn't send the form just now. Please try again or contact Trojan Tutoring directly.";
        notice.classList.add("show");
      }
    });
  }

  // Direct legal-policy links: open the exact terms/policy panel and scroll to it.
  const openHashTarget = () => {
    const id = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "";
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    if (target.tagName && target.tagName.toLowerCase() === "details") target.open = true;
    target.classList.add("hash-target-active");
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  openHashTarget();
  window.addEventListener("hashchange", openHashTarget);

  // Allow the whole offer/referral card to take visitors straight to the matching T&Cs.
  document.querySelectorAll("[data-terms-link]").forEach(card => {
    const go = () => { window.location.href = card.dataset.termsLink; };
    card.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      go();
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  });

});


