/* ==========================================================================
   CONSTANTNOPLE CONTACT INTERFACE ENGINE SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initContactFormEngine();
  initFooterReveal();
});

/**
 * Handles continuous scrolling updates across viewport checkpoints
 */
function initContactScrollReveal() {
  const targetInterface = document.querySelector(".cpage-body");
  if (!targetInterface) return;

  const revealSettings = {
    root: null,
    threshold: 0.05,
    rootMargin: "0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }, revealSettings);

  revealObserver.observe(targetInterface);
}

function initFooterReveal() {
  const footer = document.querySelector(".main-footer.scroll-reveal");
  if (!footer) return;
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
    { root: null, threshold: 0.08 }
  );
  observer.observe(footer);
}

/**
 * Orchestrates verification handling loops on input controls, blocking action defaults
 * if rules fail, and appending loading elements on active execution.
 */
function initContactFormEngine() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !submitBtn) return;

  const labelText = submitBtn.querySelector(".btn-label-text");
  const spinner = submitBtn.querySelector(".btn-spinner-element");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Perform validation checks across native DOM rules
    if (!form.checkValidity()) {
      // Highlights structural validation misses natively inside supporting contexts
      form.reportValidity();
      return;
    }

    // Enter processing execution state
    submitBtn.disabled = true;
    if (spinner && labelText) {
      spinner.style.display = "inline-block";
      labelText.textContent = "Sending Inquiry...";
    }

    // Mock pipeline submission timeline simulating data delivery to servers
    setTimeout(() => {
      alert("Thank you! Your inquiry has been sent successfully.");

      // Reset layout interface values
      form.reset();
      submitBtn.disabled = false;

      if (spinner && labelText) {
        spinner.style.display = "none";
        labelText.textContent = "Send Inquiry";
      }
    }, 2000);
  });
}
