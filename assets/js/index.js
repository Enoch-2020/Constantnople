/* ==========================================================================
   CONSTANTNOPLE — HOME PAGE ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initDataAnimate();
  initViewportScrollReveal();
  initSection4CardsReveal();
  initApproachSlider();
});

/* ─── DATA-ANIMATE ENGINE ──────────────────────────────────────────────── */
/*
 * Watches all [data-animate] elements, adds "anim-done" when they enter
 * the viewport. Works alongside the legacy .scroll-reveal/.in-view system.
 */
function initDataAnimate() {
  const targets = document.querySelectorAll("[data-animate]");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("anim-done");
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { root: null, threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ─── LEGACY SCROLL-REVEAL (.scroll-reveal / .in-view) ────────────────── */
function initViewportScrollReveal() {
  const sections = document.querySelectorAll(".scroll-reveal");
  if (!sections.length) return;

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
    { root: null, threshold: 0.08, rootMargin: "-30px 0px -30px 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ─── CHALLENGE SECTION (flip cards) ──────────────────────────────────── */
function initSection4CardsReveal() {
  const challengeSection = document.querySelector(".challenge-section");
  if (!challengeSection) return;

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
    { root: null, threshold: 0.12, rootMargin: "0px" }
  );

  observer.observe(challengeSection);
}

/* ─── APPROACH SLIDER ──────────────────────────────────────────────────── */
function initApproachSlider() {
  const track    = document.querySelector(".approach-slider-track");
  const cards    = document.querySelectorAll(".approach-glass-card");
  const btnPrev  = document.querySelector(".arrow-prev");
  const btnNext  = document.querySelector(".arrow-next");
  const dotsWrap = document.getElementById("sliderDots");

  if (!track || !cards.length || !btnPrev || !btnNext) return;

  let currentIndex = 0;
  const totalCards  = cards.length;

  /* Build dot indicators */
  const dots = [];
  if (dotsWrap) {
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }
  }

  function cardsPerView() {
    if (window.innerWidth <= 600)  return 1;
    if (window.innerWidth <= 1100) return 1;
    return 2;
  }

  function maxIndex() {
    return Math.max(0, totalCards - cardsPerView());
  }

  function goTo(index) {
    currentIndex = Math.min(Math.max(index, 0), maxIndex());
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap       = 24;
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  btnNext.addEventListener("click", () => {
    goTo(currentIndex < maxIndex() ? currentIndex + 1 : 0);
  });

  btnPrev.addEventListener("click", () => {
    goTo(currentIndex > 0 ? currentIndex - 1 : maxIndex());
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(currentIndex), 80);
  });

  goTo(0);
}
