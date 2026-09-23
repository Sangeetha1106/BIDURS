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
      <li class="nav-item"><a class="nav-link" href="${basePath}dashboard.html">Dashboard</a></li>
      <li class="nav-item"><a class="nav-link" href="${basePath}my-bids.html">My Bids</a></li>
      <li class="nav-item"><a class="nav-link" href="${basePath}won-auctions.html">Won Auctions</a></li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">More</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="${basePath}subscription.html"><i class="bi bi-star me-2" style="color:var(--yellow);"></i>Subscription</a></li>
          <li><a class="dropdown-item" href="${basePath}chat.html"><i class="bi bi-chat-dots me-2" style="color:var(--bright-blue);"></i>Customer Chat</a></li>
          <li><a class="dropdown-item" href="${basePath}reviews.html"><i class="bi bi-trophy me-2" style="color:var(--yellow);"></i>Winner Reviews</a></li>
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

  footerContainer.innerHTML = `
    <footer class="footer mt-auto">
      <div class="container">
        <!-- Compact Subscription Banner -->
        <div class="footer-sub-cta py-3 px-4 mb-4">
          <div class="row align-items-center g-2">
            <div class="col-lg-8">
              <span class="fw-bold text-white fs-6 me-2"><i class="bi bi-bolt-fill text-gold me-1"></i>Ready to Bid?</span>
              <span style="color:var(--blue-gray);font-size:0.85rem;">Subscribe to participate in live e-Auctions on BIDURS.</span>
            </div>
            <div class="col-lg-4 text-lg-end">
              <a href="${basePath}subscription.html" class="btn btn-premium btn-sm px-3 py-1">Subscribe Now</a>
            </div>
          </div>
        </div>

        <div class="row g-3 py-2">
          <!-- Brand & Social -->
          <div class="col-12 col-md-4 col-lg-4">
            <span class="footer-brand-name mb-2" style="font-size:1.4rem;">BIDURS</span>
            <p class="mb-3 pe-lg-3" style="color:rgba(255,255,255,0.7);font-size:0.82rem;line-height:1.5;">India's premier live bidding platform. Win genuine products at unbeatable prices.</p>
            <div class="footer-social d-flex gap-2">
              <a href="#" title="Facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" title="Twitter X"><i class="bi bi-twitter-x"></i></a>
              <a href="#" title="Instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>

          <!-- Quick Navigation -->
          <div class="col-6 col-md-4 col-lg-4">
            <div class="footer-title mb-2" style="font-size:0.75rem;">Quick Navigation</div>
            <div class="d-flex flex-wrap gap-x-4 gap-y-1">
              <ul class="footer-links me-4">
                <li><a href="${rootPath}">Home</a></li>
                <li><a href="${basePath}products.html">All Products</a></li>
                <li><a href="${basePath}live-auctions.html">Live Auctions</a></li>
                <li><a href="${basePath}upcoming-auctions.html">Upcoming Auctions</a></li>
              </ul>
              <ul class="footer-links">
                <li><a href="${basePath}wanted-products.html">Wanted Products</a></li>
                <li><a href="${basePath}my-bids.html">My Bids</a></li>
                <li><a href="${basePath}won-auctions.html">Won Auctions</a></li>
                <li><a href="${basePath}reviews.html">Reviews</a></li>
              </ul>
            </div>
          </div>

          <!-- Support & Info -->
          <div class="col-6 col-md-4 col-lg-4">
            <div class="footer-title mb-2" style="font-size:0.75rem;">Support &amp; Contact</div>
            <ul class="footer-links mb-3">
              <li><a href="${basePath}how-it-works.html">How It Works</a></li>
              <li><a href="${basePath}faq.html">FAQ</a></li>
              <li><a href="${basePath}terms.html">Terms &amp; Conditions</a></li>
              <li><a href="${basePath}contact.html">Contact Us</a></li>
            </ul>
            <div class="small" style="color:var(--blue-gray);font-size:0.8rem;">
              <span class="me-3"><i class="bi bi-envelope text-gold me-1"></i>support@bidurs.in</span>
              <span><i class="bi bi-telephone text-gold me-1"></i>+91 XXXXX XXXXX</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom pt-3 mt-3">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p class="mb-1 mb-md-0 small" style="color:var(--blue-gray);font-size:0.8rem;">&copy; 2026 BIDURS. All Rights Reserved.</p>
            <div class="small fw-semibold" style="color:var(--gold);font-size:0.8rem;">India's Premier e-Auction Platform</div>
          </div>
        </div>
      </div>
    </footer>
  `;
}
