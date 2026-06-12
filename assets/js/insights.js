/* ==========================================================================
   INSIGHTS PAGE ENGINE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
});

function initScrollReveal() {
  const sectionsToReveal = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      root: null,
      threshold: 0.08,
      rootMargin: "-30px 0px -30px 0px",
    }
  );

  sectionsToReveal.forEach((section) => revealObserver.observe(section));
}
