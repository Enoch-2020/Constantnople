/* ==========================================================================
   CONSTANTNOPLE ENGINE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initViewportScrollReveal();

  // SECTION 3 JAVASCRIPT START HERE
  initSection3CardsReveal();
  // SECTION 3 JAVASCRIPT END HERE

  // SECTION 4 JAVASCRIPT START HERE
  initSection4CardsReveal();
  // SECTION 4 JAVASCRIPT END HERE

  // SECTION 5/6 JAVASCRIPT START HERE
  initApproachSliderEngine();
  // SECTION 5/6 JAVASCRIPT END HERE
});

/**
 * Monitors viewports dynamically, applying entry classes to sections on scroll
 * and removing them when scrolled out of view.
 */
function initViewportScrollReveal() {
  const sectionsToReveal = document.querySelectorAll(".scroll-reveal");

  const revealSettings = {
    root: null,
    threshold: 0.08,
    rootMargin: "-30px 0px -30px 0px", // Balanced margins for top and bottom scroll-out tracking
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view"); // Disappears when scrolled out
      }
    });
  }, revealSettings);

  sectionsToReveal.forEach((section) => revealObserver.observe(section));
}

// SECTION 3 JAVASCRIPT START HERE
/**
 * Hooks into the white Section 3 layout grid, managing visible state
 * toggles dynamically as it enters and leaves the viewport.
 */
function initSection3CardsReveal() {
  const analyticsSection = document.querySelector(".analytics-section");

  if (!analyticsSection) return;

  const cardsSettings = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px",
  };

  const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view"); // Disappears when scrolled out
      }
    });
  }, cardsSettings);

  cardsObserver.observe(analyticsSection);
}
// SECTION 3 JAVASCRIPT END HERE

// SECTION 4 JAVASCRIPT START HERE
/**
 * Hooks into the Section 4 cards grid canvas, triggering the sequential 3D
 * flipping transitions whenever the section rolls in, and resetting them when it rolls out.
 */
function initSection4CardsReveal() {
  const challengeSection = document.querySelector(".challenge-section");

  if (!challengeSection) return;

  const flipSettings = {
    root: null,
    threshold: 0.12,
    rootMargin: "0px",
  };

  const flipObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view"); // Resets flip states when scrolled out
      }
    });
  }, flipSettings);

  flipObserver.observe(challengeSection);
}
// SECTION 4 JAVASCRIPT END HERE

// SECTION 5/6 JAVASCRIPT START HERE
/**
 * Executes interaction mechanics for the Glassmorphic Approach Slider,
 * advancing cards in steps based on responsive parameters and cleanly resetting at terminal boundaries.
 */
function initApproachSliderEngine() {
  const track = document.querySelector(".approach-slider-track");
  const cards = document.querySelectorAll(".approach-glass-card");
  const btnPrev = document.querySelector(".arrow-prev");
  const btnNext = document.querySelector(".arrow-next");
  const approachSection = document.querySelector(".approach-section");

  if (!track || cards.length === 0 || !btnPrev || !btnNext) return;

  let currentStepIndex = 0;

  function executeSlideAnimation() {
    const isMobile = window.innerWidth <= 992;
    const cardsPerView = isMobile ? 1 : 2;
    const gapPixelValue = 24; // Corresponds directly to --space-md

    // Calculates the true maximum index allowed to avoid empty trailing space
    const maximumAvailableSteps = cards.length - cardsPerView;

    // Loop boundary checks: Clamps index and forces an exact wrap-around
    if (currentStepIndex > maximumAvailableSteps) {
      if (currentStepIndex - (isMobile ? 1 : 2) === maximumAvailableSteps) {
        currentStepIndex = 0;
      } else {
        currentStepIndex = maximumAvailableSteps;
      }
    } else if (currentStepIndex < 0) {
      currentStepIndex = maximumAvailableSteps;
    }

    // Measure bounding calculations dynamically to ensure flawless fluid shifting positions
    const standardCardWidth = cards[0].getBoundingClientRect().width;
    const translationVectorOffset =
      currentStepIndex * (standardCardWidth + gapPixelValue);

    track.style.transform = `translateX(-${translationVectorOffset}px)`;
  }

  // Click Trigger Event Assignments
  btnNext.addEventListener("click", () => {
    const isMobile = window.innerWidth <= 992;
    currentStepIndex += isMobile ? 1 : 2;
    executeSlideAnimation();
  });

  btnPrev.addEventListener("click", () => {
    const isMobile = window.innerWidth <= 992;
    currentStepIndex -= isMobile ? 1 : 2;
    executeSlideAnimation();
  });

  // Re-calculate window measurements safely on fluid orientation resize transformations
  let structuralDebounceTimer;
  window.addEventListener("resize", () => {
    clearTimeout(structuralDebounceTimer);
    structuralDebounceTimer = setTimeout(() => {
      executeSlideAnimation();
    }, 100);
  });

  // Add observer loop to show/hide the approach section layout dynamically
  if (approachSection) {
    const approachSettings = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    };

    const approachObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view"); // Disappears when scrolled out
        }
      });
    }, approachSettings);

    approachObserver.observe(approachSection);
  }
}
// SECTION 5/6 JAVASCRIPT END HERE
