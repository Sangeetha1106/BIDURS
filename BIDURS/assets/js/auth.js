/**
 * Mock Authentication & Subscription Logic
 */

const PROTECTED_PAGES = [
  'dashboard.html',
  'my-bids.html',
  'won-auctions.html',
  'watchlist.html',
  'profile.html',
  'subscription.html',
  'payment-status.html'
];

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  updateNavbar();
  updateFooter();
});

function initAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentPage = window.location.pathname.split('/').pop();

  if (!isLoggedIn && PROTECTED_PAGES.includes(currentPage)) {
    // Redirect to login if on protected page
    window.location.href = 'login.html?redirect=' + currentPage;
  }
}

function updateNavbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navLinksContainer = document.querySelector('.navbar-nav');
  const authButtonsContainer = document.querySelector('.navbar .d-flex.gap-2');
  
  if (!navLinksContainer || !authButtonsContainer) return;

  const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  const rootPath = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';

  if (isLoggedIn) {
    navLinksContainer.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="${basePath}dashboard.html">Dashboard</a></li>
      <li class="nav-item"><a class="nav-link" href="${basePath}my-bids.html">My Bids</a></li>
      <li class="nav-item"><a class="nav-link" href="${basePath}won-auctions.html">Won Auctions</a></li>
      <li class="nav-item"><a class="nav-link" href="${basePath}subscription.html">Subscription</a></li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">More</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="${basePath}wanted-products.html"><i class="bi bi-box-seam me-2" style="color:var(--bright-blue);"></i>Wanted Products</a></li>
          <li><a class="dropdown-item" href="${basePath}chat.html"><i class="bi bi-chat-dots me-2" style="color:var(--bright-blue);"></i>Customer Chat</a></li>
          <li><a class="dropdown-item" href="${basePath}reviews.html"><i class="bi bi-star me-2" style="color:var(--bright-blue);"></i>Reviews</a></li>
        </ul>
      </li>
    `;

    authButtonsContainer.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-premium dropdown-toggle" type="button" data-bs-toggle="dropdown">
          <i class="bi bi-person-circle me-1"></i> My Account
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="${basePath}profile.html"><i class="bi bi-person me-2" style="color:var(--bright-blue);"></i>My Profile</a></li>
          <li><a class="dropdown-item" href="${basePath}watchlist.html"><i class="bi bi-heart me-2" style="color:var(--bright-blue);"></i>Watchlist</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#" onclick="mockLogout(event)" style="color:#fca5a5;"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
        </ul>
      </div>
    `;
  } else {
    navLinksContainer.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="${rootPath}">Home</a></li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Auctions</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="${basePath}products.html"><i class="bi bi-grid me-2" style="color:var(--bright-blue);"></i>All Products</a></li>
          <li><a class="dropdown-item" href="${basePath}live-auctions.html"><i class="bi bi-broadcast me-2" style="color:#ef4444;"></i>Live Auctions</a></li>
          <li><a class="dropdown-item" href="${basePath}upcoming-auctions.html"><i class="bi bi-calendar-event me-2" style="color:var(--bright-blue);"></i>Upcoming Auctions</a></li>
          <li><a class="dropdown-item" href="${basePath}wanted-products.html"><i class="bi bi-box-seam me-2" style="color:var(--bright-blue);"></i>Wanted Products</a></li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">About</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="${basePath}how-it-works.html"><i class="bi bi-lightbulb me-2" style="color:var(--bright-blue);"></i>How It Works</a></li>
          <li><a class="dropdown-item" href="${basePath}reviews.html"><i class="bi bi-trophy me-2" style="color:var(--yellow);"></i>Winner Reviews</a></li>
          <li><a class="dropdown-item" href="${basePath}about.html"><i class="bi bi-info-circle me-2" style="color:var(--bright-blue);"></i>About Us</a></li>
          <li><a class="dropdown-item" href="${basePath}faq.html"><i class="bi bi-question-circle me-2" style="color:var(--bright-blue);"></i>FAQ</a></li>
          <li><a class="dropdown-item" href="${basePath}terms.html"><i class="bi bi-file-text me-2" style="color:var(--bright-blue);"></i>Terms</a></li>
          <li><a class="dropdown-item" href="${basePath}contact.html"><i class="bi bi-envelope me-2" style="color:var(--bright-blue);"></i>Contact Us</a></li>
        </ul>
      </li>
    `;

    authButtonsContainer.innerHTML = `
      <a href="${basePath}login.html" class="btn btn-outline-premium">Login</a>
      <a href="${basePath}register.html" class="btn btn-premium">Register</a>
    `;
  }
}

window.mockLogin = function(e) {
  if(e) e.preventDefault();
  localStorage.setItem('isLoggedIn', 'true');
  
  // Create a default subscription state if it doesn't exist
  if (!localStorage.getItem('subState')) {
    localStorage.setItem('subState', 'NOT_SUBSCRIBED');
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect') || 'dashboard.html';
  window.location.href = redirect;
};

window.mockLogout = function(e) {
  if(e) e.preventDefault();
  localStorage.removeItem('isLoggedIn');
  const rootPath = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
  window.location.href = rootPath;
};

function updateFooter() {
  const footerContainer = document.getElementById('global-footer');
  if (!footerContainer) return;
  
  const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  const rootPath = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
  const assetPath = window.location.pathname.includes('/pages/') ? '../' : '';

  footerContainer.innerHTML = `
    <footer class="footer mt-auto">
      <div class="container">
        <!-- Subscription CTA -->
        <div class="footer-sub-cta">
          <div class="row align-items-center">
            <div class="col-lg-8 mb-3 mb-lg-0">
              <h5 class="fw-bold text-white mb-1" style="font-family:var(--font-heading);"><i class="bi bi-bolt-fill me-2" style="color:var(--orange);"></i>Ready to participate in auctions?</h5>
              <p class="mb-0" style="color:var(--blue-gray);font-size:0.9rem;">Subscribe and join upcoming e-Auctions on BidURS.</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <a href="${basePath}subscription.html" class="btn btn-premium px-4 py-2 fw-semibold">View Subscription</a>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <!-- Brand -->
          <div class="col-12 col-md-6 col-lg-3">
            <span class="footer-brand-name mb-3 d-flex align-items-center gap-2"><img src="${assetPath}assets/images/logo-icon.png" alt="BidURS logo" style="height:32px;width:auto;">BidURS<span>.in</span></span>
            <p class="mb-4 pe-lg-3" style="color:rgba(255,255,255,0.75);font-size:0.88rem;line-height:1.7;">India's premier online e-Auction and live bidding platform. Discover premium products and win at unbeatable prices.</p>
            <div class="footer-social d-flex gap-2 flex-wrap">
              <a href="#" title="Facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" title="Twitter X"><i class="bi bi-twitter-x"></i></a>
              <a href="#" title="Instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-12 col-md-6 col-lg-3">
            <div class="footer-title">Quick Links</div>
            <ul class="footer-links">
              <li><a href="${rootPath}">Home</a></li>
              <li><a href="${basePath}about.html">About Us</a></li>
              <li><a href="${basePath}how-it-works.html">How It Works</a></li>
              <li><a href="${basePath}products.html">All Products</a></li>
              <li><a href="${basePath}live-auctions.html">Live Auctions</a></li>
              <li><a href="${basePath}upcoming-auctions.html">Upcoming Auctions</a></li>
              <li><a href="${basePath}wanted-products.html">Wanted Products</a></li>
            </ul>
          </div>

          <!-- Auction -->
          <div class="col-12 col-md-6 col-lg-3">
            <div class="footer-title">My Account</div>
            <ul class="footer-links">
              <li><a href="${basePath}live-auctions.html">Live Auctions</a></li>
              <li><a href="${basePath}upcoming-auctions.html">Upcoming Auctions</a></li>
              <li><a href="${basePath}my-bids.html">My Bids</a></li>
              <li><a href="${basePath}won-auctions.html">Won Auctions</a></li>
              <li><a href="${basePath}watchlist.html">Watchlist</a></li>
              <li><a href="${basePath}subscription.html">Subscription</a></li>
              <li><a href="${basePath}reviews.html">Winner Reviews</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="col-12 col-md-6 col-lg-3">
            <div class="footer-title">Support</div>
            <ul class="footer-links mb-4">
              <li><a href="${basePath}faq.html">FAQ</a></li>
              <li><a href="${basePath}contact.html">Contact Us</a></li>
              <li><a href="${basePath}terms.html">Terms &amp; Conditions</a></li>
              <li><span style="color:var(--blue-gray);cursor:default;">Privacy Policy</span></li>
            </ul>
            <div class="footer-title">Contact</div>
            <ul class="list-unstyled" style="font-size:0.85rem;color:var(--blue-gray);">
              <li class="mb-2 d-flex align-items-center gap-2"><i class="bi bi-envelope" style="color:var(--bright-blue);"></i> support@bidurs.in</li>
              <li class="mb-2 d-flex align-items-center gap-2"><i class="bi bi-telephone" style="color:var(--bright-blue);"></i> +91 XXXXX XXXXX</li>
              <li class="d-flex align-items-center gap-2"><i class="bi bi-geo-alt" style="color:var(--bright-blue);"></i> India</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="small fst-italic mb-3 text-center" style="color:var(--blue-gray);">
            * Auction schedules, availability and bidding status may be subject to change due to technical issues or unforeseen circumstances.
          </p>
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p class="mb-2 mb-md-0 small" style="color:var(--blue-gray);">&copy; 2026 BidURS. All Rights Reserved.</p>
            <div class="small fw-semibold" style="color:var(--orange);">e-Auction &amp; Bidding Platform</div>
          </div>
        </div>
      </div>
    </footer>
  `;
}
