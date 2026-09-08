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
    <style>
      .footer-link:hover { color: #ffd700 !important; text-decoration: underline !important; }
      .bg-navy-darker { background-color: #0a1128 !important; }
    </style>
    <footer class="footer mt-auto pt-5 pb-2 bg-navy text-white">
      <div class="container">
        
        <!-- Subscription CTA -->
        <div class="row bg-navy-darker rounded-4 p-4 align-items-center mb-5 mx-0 border border-secondary border-opacity-25 shadow-sm">
          <div class="col-lg-8 mb-3 mb-lg-0 text-center text-lg-start">
            <h5 class="fw-bold text-white mb-1">Ready to participate in auctions?</h5>
            <p class="text-white-50 small mb-0">Subscribe and participate in upcoming e-Auctions.</p>
          </div>
          <div class="col-lg-4 text-center text-lg-end">
            <a href="${basePath}subscription.html" class="btn btn-premium px-4 py-2 fw-semibold">View Subscription</a>
          </div>
        </div>

        <!-- 4-Column Layout -->
        <div class="row g-4">
          <!-- Column 1: Brand -->
          <div class="col-12 col-md-6 col-lg-3">
            <h5 class="fw-bold text-white mb-1">FIXURs</h5>
            <h4 class="fw-bold text-white mb-3">PICKURS<span class="text-gold">.in</span></h4>
            <p class="text-white-50 small mb-4 pe-lg-3">An online e-Auction and bidding platform where customers can discover products, participate in auctions, place bids and win products.</p>
            <div class="d-flex gap-3">
              <a href="#" class="text-white-50 footer-link"><i class="bi bi-facebook fs-5"></i></a>
              <a href="#" class="text-white-50 footer-link"><i class="bi bi-twitter-x fs-5"></i></a>
              <a href="#" class="text-white-50 footer-link"><i class="bi bi-instagram fs-5"></i></a>
              <a href="#" class="text-white-50 footer-link"><i class="bi bi-linkedin fs-5"></i></a>
            </div>
          </div>
          
          <!-- Column 2: Quick Links -->
          <div class="col-12 col-md-6 col-lg-3">
            <h6 class="fw-bold text-gold mb-4 text-uppercase">Quick Links</h6>
            <ul class="list-unstyled small">
              <li class="mb-3"><a href="${rootPath}" class="text-white-50 text-decoration-none footer-link">Home</a></li>
              <li class="mb-3"><a href="${basePath}about.html" class="text-white-50 text-decoration-none footer-link">About Us</a></li>
              <li class="mb-3"><a href="${basePath}how-it-works.html" class="text-white-50 text-decoration-none footer-link">How It Works</a></li>
              <li class="mb-3"><a href="${basePath}products.html" class="text-white-50 text-decoration-none footer-link">Products</a></li>
              <li class="mb-3"><a href="${basePath}live-auctions.html" class="text-white-50 text-decoration-none footer-link">Live Auctions</a></li>
              <li class="mb-3"><a href="${basePath}upcoming-auctions.html" class="text-white-50 text-decoration-none footer-link">Upcoming Auctions</a></li>
              <li class="mb-3"><a href="${basePath}wanted-products.html" class="text-white-50 text-decoration-none footer-link">Wanted Products</a></li>
            </ul>
          </div>
          
          <!-- Column 3: Auction -->
          <div class="col-12 col-md-6 col-lg-3">
            <h6 class="fw-bold text-gold mb-4 text-uppercase">Auction</h6>
            <ul class="list-unstyled small">
              <li class="mb-3"><a href="${basePath}live-auctions.html" class="text-white-50 text-decoration-none footer-link">Live Auctions</a></li>
              <li class="mb-3"><a href="${basePath}upcoming-auctions.html" class="text-white-50 text-decoration-none footer-link">Upcoming Auctions</a></li>
              <li class="mb-3"><a href="${basePath}my-bids.html" class="text-white-50 text-decoration-none footer-link">My Bids</a></li>
              <li class="mb-3"><a href="${basePath}won-auctions.html" class="text-white-50 text-decoration-none footer-link">Won Auctions</a></li>
              <li class="mb-3"><a href="${basePath}watchlist.html" class="text-white-50 text-decoration-none footer-link">Watchlist</a></li>
              <li class="mb-3"><a href="${basePath}subscription.html" class="text-white-50 text-decoration-none footer-link">Subscription</a></li>
              <li class="mb-3"><a href="${basePath}reviews.html" class="text-white-50 text-decoration-none footer-link">Reviews</a></li>
            </ul>
          </div>
          
          <!-- Column 4: Support & Contact -->
          <div class="col-12 col-md-6 col-lg-3">
            <h6 class="fw-bold text-gold mb-4 text-uppercase">Support</h6>
            <ul class="list-unstyled small mb-4">
              <li class="mb-3"><a href="${basePath}faq.html" class="text-white-50 text-decoration-none footer-link">FAQ</a></li>
              <li class="mb-3"><a href="${basePath}contact.html" class="text-white-50 text-decoration-none footer-link">Contact Us</a></li>
              <li class="mb-3"><a href="${basePath}terms.html" class="text-white-50 text-decoration-none footer-link">Terms & Conditions</a></li>
              <li class="mb-3"><span class="text-secondary" style="cursor: not-allowed;" title="Placeholder">Privacy Policy</span></li>
            </ul>
            
            <h6 class="fw-bold text-gold mb-3 text-uppercase">Contact Us</h6>
            <ul class="list-unstyled small text-white-50">
              <li class="mb-2 d-flex align-items-center"><i class="bi bi-envelope text-primary me-2"></i> support@yourdomain.com</li>
              <li class="mb-2 d-flex align-items-center"><i class="bi bi-telephone text-primary me-2"></i> +91 XXXXX XXXXX</li>
              <li class="mb-2 d-flex align-items-center"><i class="bi bi-geo-alt text-primary me-2"></i> India</li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom: Note & Copyright -->
        <div class="mt-5 pt-4 border-top border-secondary border-opacity-25">
          <p class="small text-white-50 fst-italic mb-3 text-center">
            * Auction schedules, availability and bidding status may be subject to change due to technical issues or unforeseen circumstances.
          </p>
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3">
            <p class="mb-2 mb-md-0 small text-white-50">&copy; 2026 FIXURs / PICKURS.in. All Rights Reserved.</p>
            <div class="small text-gold fw-semibold">e-Auction & Bidding Platform</div>
          </div>
        </div>
        
      </div>
    </footer>
  `;
}

