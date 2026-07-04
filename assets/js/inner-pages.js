/* ==========================================================================
   CONSTANTNOPLE — INNER PAGES INTERACTION ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initDataAnimate();
  initScrollReveal();
  initTimelineReveal();
});

/* ─── DATA-ANIMATE ENGINE ──────────────────────────────────────────────── */
function initDataAnimate() {
  const targets = document.querySelectorAll("[data-animate]");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("anim-done");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ─── FADE-UP / FADE-LEFT / FADE-RIGHT REVEAL ─────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { root: null, threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ─── TIMELINE STAGGER REVEAL ──────────────────────────────────────────── */
function initTimelineReveal() {
  const items = document.querySelectorAll(".timeline-item");
  if (!items.length) return;

  items.forEach((item, index) => {
    item.style.opacity    = "0";
    item.style.transform  = "translateX(-30px)";
    item.style.transition = `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`;
    item.style.willChange = "transform, opacity";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translateX(0)";
        } else {
          el.style.opacity   = "0";
          el.style.transform = "translateX(-30px)";
        }
      });
    },
    { root: null, threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}
