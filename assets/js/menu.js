/* ==========================================================================
   CONSTANTNOPLE GLOBAL INTERACTION ENGINE (HEADER & FOOTER)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Structural Constants
  const SCROLL_THRESHOLD = 50;

  // Initialize Components
  initHeaderScrollTransition(SCROLL_THRESHOLD);
  initMobileNavigationDrawer();
  initFooterScrollRevealEngine();
});

/**
 * Manages the header transparency transition based on vertical scroll depth.
 * @param {number} threshold - Vertical pixel travel before flipping state.
 */
function initHeaderScrollTransition(threshold) {
  const headerNode = document.querySelector(".main-header");
  if (!headerNode) return;

  const handleScroll = () => {
    if (window.scrollY > threshold) {
      headerNode.classList.add("scrolled");
    } else {
      headerNode.classList.remove("scrolled");
    }
  };

  // Immediate check to handle active page reloads smoothly
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
}

/**
 * Handles the smartphone hamburger mechanics and fullscreen menu drawer slide overlays.
 */
function initMobileNavigationDrawer() {
  const mobileToggleBtn = document.querySelector(".mobile-nav-toggle");
  const navigationContainer = document.querySelector(".header-nav-container");
  const navigationLinks = document.querySelectorAll(".header-nav-link");
  const backdrop = document.querySelector(".nav-backdrop");

  if (!mobileToggleBtn || !navigationContainer) return;

  function openMenu() {
    mobileToggleBtn.classList.add("open");
    navigationContainer.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileToggleBtn.classList.remove("open");
    navigationContainer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  mobileToggleBtn.addEventListener("click", () => {
    navigationContainer.classList.contains("open") ? closeMenu() : openMenu();
  });

  if (backdrop) backdrop.addEventListener("click", closeMenu);

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/**
 * Uses an Intersection Observer to fade sections into focus when scrolling down the page.
 */
function initFooterScrollRevealEngine() {
  const footerElement = document.querySelector(".main-footer");
  if (!footerElement) return;

  const observerSettings = {
    root: null,
    threshold: 0.02,
    rootMargin: "0px",
  };

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }, observerSettings);

  footerObserver.observe(footerElement);
}
