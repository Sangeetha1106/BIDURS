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
        <ul class="dropdown-menu border-0 shadow-sm">
          <li><a class="dropdown-item" href="${basePath}wanted-products.html">Wanted Products</a></li>
          <li><a class="dropdown-item" href="${basePath}chat.html">Customer Chat</a></li>
          <li><a class="dropdown-item" href="${basePath}reviews.html">Reviews</a></li>
        </ul>
      </li>
    `;

    authButtonsContainer.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-premium dropdown-toggle" type="button" data-bs-toggle="dropdown">
          <i class="bi bi-person-circle me-1"></i> Profile
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
          <li><a class="dropdown-item" href="${basePath}profile.html">My Profile</a></li>
          <li><a class="dropdown-item" href="${basePath}watchlist.html">Watchlist</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="mockLogout(event)">Logout</a></li>
        </ul>
      </div>
    `;
  } else {
    navLinksContainer.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="${rootPath}">Home</a></li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Auctions</a>
        <ul class="dropdown-menu border-0 shadow-sm">
          <li><a class="dropdown-item" href="${basePath}products.html">All Products</a></li>
          <li><a class="dropdown-item" href="${basePath}live-auctions.html">Live Auctions</a></li>
          <li><a class="dropdown-item" href="${basePath}upcoming-auctions.html">Upcoming Auctions</a></li>
          <li><a class="dropdown-item" href="${basePath}wanted-products.html">Wanted Products</a></li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">About</a>
        <ul class="dropdown-menu border-0 shadow-sm">
          <li><a class="dropdown-item" href="${basePath}how-it-works.html">How It Works</a></li>
          <li><a class="dropdown-item" href="${basePath}reviews.html">Winner Reviews</a></li>
          <li><a class="dropdown-item" href="${basePath}about.html">About Us</a></li>
          <li><a class="dropdown-item" href="${basePath}faq.html">FAQ</a></li>
          <li><a class="dropdown-item" href="${basePath}terms.html">Terms</a></li>
          <li><a class="dropdown-item" href="${basePath}contact.html">Contact Us</a></li>
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
    <footer class="footer mt-auto py-5 bg-navy text-white">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <h4 class="fw-bold text-white mb-3">PICKURS<span class="text-gold">.in</span></h4>
            <p class="text-white-50 small mb-4">India's premier product-based live e-auction platform. Experience transparent bidding on premium electronics and appliances.</p>
            <div class="d-flex gap-3">
              <a href="#" class="text-white-50 text-decoration-none"><i class="bi bi-facebook fs-5"></i></a>
              <a href="#" class="text-white-50 text-decoration-none"><i class="bi bi-twitter-x fs-5"></i></a>
              <a href="#" class="text-white-50 text-decoration-none"><i class="bi bi-instagram fs-5"></i></a>
            </div>
          </div>
          <div class="col-6 col-lg-2 offset-lg-1">
            <h6 class="fw-bold text-white mb-3">Quick Links</h6>
            <ul class="list-unstyled small">
              <li class="mb-2"><a href="${rootPath}" class="text-white-50 text-decoration-none">Home</a></li>
              <li class="mb-2"><a href="${basePath}about.html" class="text-white-50 text-decoration-none">About Us</a></li>
              <li class="mb-2"><a href="${basePath}how-it-works.html" class="text-white-50 text-decoration-none">How It Works</a></li>
              <li class="mb-2"><a href="${basePath}reviews.html" class="text-white-50 text-decoration-none">Winner Reviews</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2">
            <h6 class="fw-bold text-white mb-3">Auctions</h6>
            <ul class="list-unstyled small">
              <li class="mb-2"><a href="${basePath}products.html" class="text-white-50 text-decoration-none">All Products</a></li>
              <li class="mb-2"><a href="${basePath}live-auctions.html" class="text-white-50 text-decoration-none">Live Auctions</a></li>
              <li class="mb-2"><a href="${basePath}upcoming-auctions.html" class="text-white-50 text-decoration-none">Upcoming Auctions</a></li>
              <li class="mb-2"><a href="${basePath}wanted-products.html" class="text-white-50 text-decoration-none">Wanted Products</a></li>
            </ul>
          </div>
          <div class="col-lg-3">
            <h6 class="fw-bold text-white mb-3">Support</h6>
            <ul class="list-unstyled small">
              <li class="mb-2"><a href="${basePath}faq.html" class="text-white-50 text-decoration-none">FAQ</a></li>
              <li class="mb-2"><a href="${basePath}terms.html" class="text-white-50 text-decoration-none">Terms & Conditions</a></li>
              <li class="mb-2"><a href="${basePath}contact.html" class="text-white-50 text-decoration-none">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <hr class="border-secondary opacity-25 my-4">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0 small text-white-50">&copy; 2026 PICKURS.in. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div class="small text-white-50">Frontend Demo Project</div>
          </div>
        </div>
      </div>
    </footer>
  `;
}
