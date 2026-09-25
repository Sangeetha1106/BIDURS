/**
 * Dashboard & Protected Pages Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  renderDashboardSidebar();
  
  const pageType = document.body.getAttribute('data-dashboard-page');
  if (!pageType) return;

  if (pageType === 'dashboard') {
    populateDashboardStats();
  } else if (pageType === 'my-bids') {
    renderMyBids();
  } else if (pageType === 'won-auctions') {
    renderWonAuctions();
  } else if (pageType === 'watchlist') {
    renderWatchlist();
  }
});

function renderDashboardSidebar() {
  const sidebarContainer = document.getElementById('dashboard-sidebar');
  if (!sidebarContainer) return;

  const currentPath = window.location.pathname.split('/').pop();
  
  const userName = localStorage.getItem('userName') || 'Customer';
  const userId = localStorage.getItem('userId') || 'CUST-2456';
  const initials = userName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CU';

  const links = [
    { name: 'Dashboard', url: 'dashboard.html', icon: 'bi-grid-1x2' },
    { name: 'My Bids', url: 'my-bids.html', icon: 'bi-gavel' },
    { name: 'Won Auctions', url: 'won-auctions.html', icon: 'bi-trophy' },
    { name: 'Watchlist', url: 'watchlist.html', icon: 'bi-heart' },
    { name: 'Subscription', url: 'subscription.html', icon: 'bi-star' },
    { name: 'Profile', url: 'profile.html', icon: 'bi-person' },
  ];

  const html = `
    <div class="dashboard-sidebar-card shadow-sm sticky-top" style="top:90px;border-radius:var(--radius-lg);background:#FFFFFF;overflow:hidden;">
      <div class="dash-sidebar-header">
        <div class="dash-avatar">${initials}</div>
        <h5 class="mb-0 fw-bold text-white text-truncate" style="font-family:var(--font-heading);" title="${userName}">${userName}</h5>
        <p class="small mb-1 font-monospace" style="color:#FFDF00!important;font-weight:700;">ID: ${userId}</p>
        <span class="badge" style="background:rgba(34,197,94,0.2);border:1px solid rgba(34,197,94,0.4);color:#86efac;font-size:0.72rem;">Customer Account</span>
      </div>
      <div class="py-2">
        ${links.map(link => `
          <a href="${link.url}" class="list-group-item list-group-item-action border-0 px-4 py-3 d-flex align-items-center gap-3 ${currentPath === link.url ? 'active' : ''}">
            <i class="bi ${link.icon} fs-6"></i>
            <span style="font-size:0.92rem;font-weight:600;">${link.name}</span>
          </a>
        `).join('')}
        <a href="#" onclick="window.mockLogout(event)" class="list-group-item list-group-item-action border-0 px-4 py-3 d-flex align-items-center gap-3 mt-1" style="color:#DC2626!important;border-top:1px solid var(--glass-border)!important;">
          <i class="bi bi-box-arrow-right fs-6" style="color:#DC2626!important;"></i>
          <span style="font-size:0.92rem;font-weight:600;">Logout</span>
        </a>
      </div>
    </div>
  `;

  sidebarContainer.innerHTML = html;
}

function populateDashboardStats() {
  const currentUserId = localStorage.getItem('userId') || 'CUST-2456';
  const currentUserName = localStorage.getItem('userName') || 'Customer';
  const currentUserEmail = localStorage.getItem('userEmail') || 'customer@bidurs.in';

  const nameEl = document.getElementById('dash-user-name-display');
  const idEl = document.getElementById('dash-user-id-display');
  const emailEl = document.getElementById('dash-user-email-display');

  if (nameEl) nameEl.textContent = currentUserName;
  if (idEl) idEl.textContent = currentUserId;
  if (emailEl) emailEl.textContent = currentUserEmail;
  
  // Update counts
  let userBids = [];
  try {
    userBids = JSON.parse(localStorage.getItem(`bids_${currentUserId}`)) || [];
  } catch(e) { userBids = []; }

  let userWon = [];
  try {
    userWon = JSON.parse(localStorage.getItem(`won_${currentUserId}`)) || [];
  } catch(e) { userWon = []; }

  let userWatchlistIds = [];
  try {
    userWatchlistIds = JSON.parse(localStorage.getItem(`watchlist_${currentUserId}`)) || [];
  } catch(e) { userWatchlistIds = []; }

  // Update summary stat boxes if present (Target explicit IDs or card selectors)
  const statBidsEl = document.getElementById('stat-active-bids') || document.querySelector('.col-6:nth-child(1) .fs-1');
  const statWonEl = document.getElementById('stat-auctions-won') || document.querySelector('.col-6:nth-child(2) .fs-1');
  const statWatchEl = document.getElementById('stat-watchlist') || document.querySelector('.col-6:nth-child(4) .fs-1');

  if (statBidsEl) statBidsEl.textContent = String(userBids.length).padStart(2, '0');
  if (statWonEl) statWonEl.textContent = String(userWon.length).padStart(2, '0');
  if (statWatchEl) statWatchEl.textContent = String(userWatchlistIds.length).padStart(2, '0');

  // Populate Subscription Card dynamically based on STAGE 5 subUtils
  const subCard = document.getElementById('dash-sub-card');
  if (subCard && window.subUtils) {
    const status = window.subUtils.getSubscriptionStatus();
    if (status === 'ACTIVE') {
      const expiry = window.subUtils.calculateSubscriptionExpiry();
      subCard.innerHTML = `
        <div class="card border-0 shadow-sm rounded-4 h-100 bg-navy text-white">
          <div class="card-body p-4 position-relative overflow-hidden">
            <i class="bi bi-star-fill text-gold position-absolute opacity-25" style="font-size: 8rem; right: -20px; top: -20px;"></i>
            <h6 class="text-white-50 text-uppercase fw-bold mb-3">BIDURS Membership</h6>
            <div class="d-flex justify-content-between align-items-end mb-4 position-relative z-1">
              <div>
                <span class="badge bg-success mb-2 px-3 py-2">ACTIVE</span>
                <div class="fs-4 fw-bold">${expiry.days} Days Remaining</div>
              </div>
            </div>
            <a href="subscription.html" class="btn btn-outline-light btn-sm px-4">Manage</a>
          </div>
        </div>
      `;
    } else if (status === 'SUSPENDED') {
      subCard.innerHTML = `
        <div class="card border-0 shadow-sm rounded-4 h-100 bg-danger bg-opacity-10 text-white">
          <div class="card-body p-4">
            <i class="bi bi-exclamation-triangle text-danger fs-1 mb-2"></i>
            <h6 class="text-white text-uppercase fw-bold mb-2">BIDURS Membership</h6>
            <span class="badge bg-danger mb-3">SUSPENDED</span>
            <p class="small text-white-50 mb-3">Your subscription is currently suspended per company rules.</p>
            <a href="subscription.html" class="btn btn-outline-danger btn-sm w-100">Review Status</a>
          </div>
        </div>
      `;
    } else {
      subCard.innerHTML = `
        <div class="card border-0 shadow-sm rounded-4 h-100 bg-light text-navy">
          <div class="card-body p-4 text-center">
            <i class="bi bi-star text-muted fs-1 mb-2"></i>
            <h6 class="text-navy text-uppercase fw-bold mb-2">BIDURS Membership</h6>
            <span class="badge bg-secondary mb-3">NOT SUBSCRIBED</span>
            <p class="small text-muted mb-3">Subscribe to participate in exclusive live auctions.</p>
            <a href="subscription.html" class="btn btn-premium btn-sm w-100">Subscribe Now</a>
          </div>
        </div>
      `;
    }
  }

  // Active Bids Table in Dashboard Overview
  const activeBidsTbody = document.getElementById('dash-active-bids');
  if (activeBidsTbody) {
    if (userBids.length === 0) {
      activeBidsTbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-3 d-block mb-2 text-white-50"></i>
            You haven't placed any bids yet.
            <div class="mt-2"><a href="live-auctions.html" class="btn btn-sm btn-outline-premium">Browse Live Auctions</a></div>
          </td>
        </tr>
      `;
    } else {
      activeBidsTbody.innerHTML = userBids.slice(0, 5).map(b => `
        <tr>
          <td class="align-middle">
            <div class="d-flex align-items-center">
              <img src="${b.productImage}" class="rounded me-3 border" width="40" height="40" style="object-fit:cover;">
              <span class="fw-semibold text-white">${b.productName}</span>
            </div>
          </td>
          <td class="align-middle text-gold fw-bold">${window.utils.formatCurrency(b.bidAmount)}</td>
          <td class="align-middle fw-bold text-white">${window.utils.formatCurrency(b.currentBid)}</td>
          <td class="align-middle"><span class="badge bg-success">${b.status}</span></td>
          <td class="align-middle text-end">
            <a href="live-auction.html?id=${b.productId}" class="btn btn-outline-premium btn-sm">View</a>
          </td>
        </tr>
      `).join('');
    }
  }
}

function renderMyBids() {
  const container = document.getElementById('my-bids-container');
  if (!container) return;

  const currentUserId = localStorage.getItem('userId') || 'CUST-2456';
  let userBids = [];
  try {
    userBids = JSON.parse(localStorage.getItem(`bids_${currentUserId}`)) || [];
  } catch (e) {
    userBids = [];
  }

  if (userBids.length === 0) {
    container.innerHTML = `
      <div class="p-5 text-center bg-navy rounded-4 border text-white shadow-sm">
        <i class="bi bi-inbox fs-1 d-block mb-3 text-gold"></i>
        <h4 class="fw-bold mb-2">You haven't placed any bids yet.</h4>
        <p class="text-white-50 mb-4">Explore our active live auctions and start bidding to win genuine products.</p>
        <a href="live-auctions.html" class="btn btn-premium px-4 py-2 fw-bold">Explore Live Auctions</a>
      </div>
    `;
    return;
  }

  container.innerHTML = userBids.map(b => {
    const isWinner = b.status === 'WON';
    const badgeClass = isWinner ? 'bg-warning text-dark' : 'bg-success';

    return `
      <div class="card border-0 shadow-sm rounded-4 mb-3 bg-white">
        <div class="card-body p-3 p-md-4">
          <div class="row align-items-center g-3">
            <div class="col-12 col-md-4 d-flex align-items-center">
              <img src="${b.productImage}" class="rounded me-3 border" width="60" height="60" style="object-fit:cover;">
              <div>
                <h6 class="mb-1 fw-bold text-navy">${b.productName}</h6>
                <span class="badge ${badgeClass}">${b.status}</span>
              </div>
            </div>
            <div class="col-6 col-md-2">
              <div class="small text-muted mb-1">Your Bid</div>
              <div class="fw-bold text-royal">${window.utils.formatCurrency(b.bidAmount)}</div>
            </div>
            <div class="col-6 col-md-2">
              <div class="small text-muted mb-1">Current Highest</div>
              <div class="fw-bold text-navy">${window.utils.formatCurrency(b.currentBid)}</div>
            </div>
            <div class="col-12 col-md-2">
              <div class="small text-muted mb-1">Bid Time</div>
              <div class="small fw-semibold text-muted">${new Date(b.bidTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
            <div class="col-12 col-md-2 text-md-end mt-3 mt-md-0">
              <a href="live-auction.html?id=${b.productId}" class="btn btn-outline-premium btn-sm w-100">Live Room</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderWonAuctions() {
  const container = document.getElementById('won-auctions-container');
  if (!container) return;
  
  const currentUserId = localStorage.getItem('userId') || 'CUST-2456';
  let wonProducts = [];
  try {
    wonProducts = JSON.parse(localStorage.getItem(`won_${currentUserId}`)) || [];
  } catch (e) {
    wonProducts = [];
  }

  if (wonProducts.length === 0) {
    container.innerHTML = `
      <div class="p-5 text-center bg-navy rounded-4 border text-white shadow-sm">
        <i class="bi bi-trophy fs-1 d-block mb-3 text-gold opacity-75"></i>
        <h4 class="fw-bold mb-2">You haven't won any auctions yet.</h4>
        <p class="text-white-50 mb-4">Keep participating in live bidding rooms to win premium products at incredible prices.</p>
        <a href="live-auctions.html" class="btn btn-premium px-4 py-2 fw-bold">View Live Auctions</a>
      </div>
    `;
    return;
  }

  container.innerHTML = wonProducts.map((p) => {
    const payStatus = p.paymentStatus || 'PENDING';
    const payClass = payStatus === 'PENDING' ? 'warning text-dark' : 'success';

    return `
      <div class="card border-0 shadow-sm rounded-4 mb-3 bg-white">
        <div class="card-body p-3 p-md-4">
          <div class="row align-items-center g-3">
            <div class="col-12 col-md-4 d-flex align-items-center">
              <img src="${p.productImage || p.image}" class="rounded me-3 border" width="60" height="60" style="object-fit:cover;">
              <div>
                <h6 class="mb-1 fw-bold text-navy">${p.productName || p.name}</h6>
                <div class="small text-muted">Winner: <strong>${currentUserId}</strong></div>
              </div>
            </div>
            <div class="col-6 col-md-2">
              <div class="small text-muted mb-1">Winning Bid</div>
              <div class="fw-bold text-gold fs-5">${window.utils.formatCurrency(p.winningAmount || p.currentBid)}</div>
            </div>
            <div class="col-6 col-md-3">
              <div class="small text-muted mb-1">Payment Status</div>
              <span class="badge bg-${payClass} mb-1">${payStatus}</span>
              ${payStatus === 'PENDING' ? '<div class="small text-danger fw-bold"><i class="bi bi-clock"></i> 24h Window Active</div>' : ''}
            </div>
            <div class="col-12 col-md-3 text-md-end mt-3 mt-md-0 d-flex flex-column gap-2">
              <a href="payment-status.html?id=${p.productId || p.id}" class="btn ${payStatus === 'PENDING' ? 'btn-premium' : 'btn-outline-secondary'} btn-sm w-100">${payStatus === 'PENDING' ? 'Complete Payment' : 'Payment Receipt'}</a>
              <a href="auction-result.html?id=${p.productId || p.id}" class="btn btn-outline-premium btn-sm w-100">View Result</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderWatchlist() {
  const container = document.getElementById('watchlist-container');
  if (!container || !window.mockProductsData) return;

  const currentUserId = localStorage.getItem('userId') || 'CUST-2456';
  let watchlistIds = [];
  try {
    watchlistIds = JSON.parse(localStorage.getItem(`watchlist_${currentUserId}`)) || [];
  } catch (e) {
    watchlistIds = [];
  }

  const savedProducts = window.mockProductsData.filter(p => watchlistIds.includes(p.id));

  if (savedProducts.length === 0) {
    container.innerHTML = `
      <div class="col-12 p-5 text-center bg-navy rounded-4 border text-white shadow-sm">
        <i class="bi bi-heart fs-1 d-block mb-3 text-gold opacity-75"></i>
        <h4 class="fw-bold mb-2">Your watchlist is empty.</h4>
        <p class="text-white-50 mb-4">Click the heart icon on any product to save it here for quick tracking.</p>
        <a href="products.html" class="btn btn-premium px-4 py-2 fw-bold">Browse All Products</a>
      </div>
    `;
    return;
  }

  container.innerHTML = savedProducts.map(p => `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="product-card h-100 position-relative bg-white border rounded-4 p-3 shadow-sm">
        <button class="btn btn-light rounded-circle position-absolute text-danger shadow-sm" style="top:15px; right:15px; z-index:2; width:35px; height:35px; padding:0;" title="Remove from watchlist" onclick="window.toggleWatchlist(event, ${p.id}); renderWatchlist();">
          <i class="bi bi-heart-fill"></i>
        </button>
        <div class="product-img-wrapper text-center mb-3">
          ${window.utils.getStatusBadge(p.status)}
          <img src="${p.image}" alt="${p.name}" class="img-fluid rounded-3" style="max-height:160px; object-fit:contain;">
        </div>
        <div class="product-details">
          <h5 class="product-title text-navy fw-bold fs-6 text-truncate mb-2" title="${p.name}">${p.name}</h5>
          <div class="d-flex justify-content-between align-items-end mt-auto pt-2 border-top">
            <div>
              <div class="text-muted small">${p.status === 'UPCOMING' ? 'Starting Bid' : 'Current Bid'}</div>
              <div class="bid-price fs-5 text-royal fw-bold">${window.utils.formatCurrency(p.status === 'UPCOMING' ? p.startingBid : p.currentBid)}</div>
            </div>
          </div>
          <a href="${(p.status === 'LIVE' || p.status === 'ENDING SOON') ? 'live-auction.html' : 'product-details.html'}?id=${p.id}" class="btn btn-outline-premium btn-sm w-100 mt-3 fw-bold">View Product</a>
        </div>
      </div>
    </div>
  `).join('');
}
