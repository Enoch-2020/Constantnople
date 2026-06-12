/* ==========================================================================
   SHARED PAGE COMPONENTS — Header, Pre-Footer CTA, Footer
   Inject via data-page attribute on <body>
   ========================================================================== */

(function () {
  const NAV_ITEMS = [
    { href: "index.html", label: "Home", id: "home" },
    { href: "insights.html", label: "Insights", id: "insights" },
    { href: "about.html", label: "About", id: "about" },
    { href: "contact.html", label: "Contact us", id: "contact" },
  ];

  function buildNavLinks(activePage) {
    return NAV_ITEMS.map(
      (item) =>
        `<li><a href="${item.href}" class="header-nav-link${
          activePage === item.id ? " active" : ""
        }">${item.label}</a></li>`
    ).join("");
  }

  function buildHeaderInner(activePage) {
    return `
      <div class="header-container">
        <a href="index.html" class="header-brand-block">
          <img src="assets/imgs/logo.jpg" alt="Constantnople Logo" class="header-logo" />
          <span class="header-brand-name">Constantnople</span>
        </a>
        <nav class="header-nav-container">
          <div class="nav-drawer-header">
            <a href="index.html" class="nav-drawer-brand">
              <img src="assets/imgs/logo.jpg" alt="Logo" class="nav-drawer-logo" />
              <span>Constantnople</span>
            </a>
          </div>
          <ul class="header-nav-list">
            ${buildNavLinks(activePage)}
          </ul>
          <div class="nav-drawer-footer">
            <p class="nav-drawer-tagline">Empowering fish farmers across Africa.</p>
            <a href="contact.html" class="nav-drawer-cta">Get in Touch</a>
          </div>
        </nav>
        <div class="nav-backdrop"></div>
        <button class="mobile-nav-toggle" aria-label="Toggle Navigation Menu">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </div>`;
  }

  function buildPreFooterCTA() {
    return `
      <div class="container">
        <div class="pre-footer-cta-inner">
          <div class="pre-footer-cta-content">
            <h2>Ready to transform your fish farm?</h2>
            <p>
              Join the growing network of farmers using Constantnople's HDPE cage
              systems to increase yields, reduce losses, and farm sustainably.
            </p>
          </div>
          <div class="pre-footer-cta-actions">
            <a href="contact.html" class="btn-cta-primary">Get Started</a>
            <a href="index.html" class="btn-cta-secondary">View Solutions</a>
          </div>
        </div>
      </div>`;
  }

  function buildFooterInner() {
    return `
      <div class="footer-container">
        <div class="footer-area footer-brand-block">
          <div class="footer-logo-identity">
            <img src="assets/imgs/logo.jpg" alt="Constantnople Logo" class="footer-brand-logo" />
            <span class="footer-brand-name">Constantnople</span>
          </div>
          <p class="footer-brand-tagline">Empowering fish farmers across Africa.</p>
        </div>
        <div class="footer-area footer-links-block">
          <h3 class="footer-heading">Quick Links</h3>
          <ul class="footer-links-list">
            <li><a href="index.html" class="footer-interactive-link">Home</a></li>
            <li><a href="insights.html" class="footer-interactive-link">Insights</a></li>
            <li><a href="about.html" class="footer-interactive-link">About Us</a></li>
            <li><a href="contact.html" class="footer-interactive-link">Contact Support</a></li>
          </ul>
        </div>
        <div class="footer-area footer-contact-block">
          <h3 class="footer-heading">Contact us</h3>
          <div class="footer-contact-matrix">
            <div class="footer-contact-item">
              <span class="contact-label">Email:</span>
              <a href="mailto:sales@constantnople.co.ke" class="footer-interactive-link">
                sales@constantnople.co.ke
              </a>
            </div>
            <div class="footer-contact-item">
              <span class="contact-label">Call us:</span>
              <a href="tel:0728483950" class="footer-interactive-link">0728483950</a>
            </div>
            <div class="footer-contact-item">
              <span class="contact-label">Our Location:</span>
              <p class="contact-plain-text">Chandaria Business Innovation Center</p>
              <p class="contact-sub-text">Serving clients across the region.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom-bar">
        <div class="footer-bottom-container">
          <p>&copy; 2026 Constantnople Enterprise. All rights reserved.</p>
        </div>
      </div>`;
  }

  /* ---- Inject into placeholders ---- */
  const activePage = document.body.dataset.page || "home";

  const headerEl = document.getElementById("main-header");
  if (headerEl) headerEl.innerHTML = buildHeaderInner(activePage);

  const ctaEl = document.getElementById("pre-footer-cta");
  if (ctaEl) ctaEl.innerHTML = buildPreFooterCTA();

  const footerEl = document.getElementById("main-footer");
  if (footerEl) footerEl.innerHTML = buildFooterInner();
})();
