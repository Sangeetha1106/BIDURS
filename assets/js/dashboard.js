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
  
  const links = [
    { name: 'Dashboard', url: 'dashboard.html', icon: 'bi-grid-1x2' },
    { name: 'My Bids', url: 'my-bids.html', icon: 'bi-gavel' },
    { name: 'Won Auctions', url: 'won-auctions.html', icon: 'bi-trophy' },
    { name: 'Watchlist', url: 'watchlist.html', icon: 'bi-heart' },
    { name: 'Subscription', url: 'subscription.html', icon: 'bi-star' },
    { name: 'Profile', url: 'profile.html', icon: 'bi-person' },
  ];

  const html = `
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 sticky-md-top" style="top: 100px;">
      <div class="bg-navy p-4 text-center text-white">
        <div class="bg-white text-navy rounded-circle d-inline-flex align-items-center justify-content-center mb-3 fw-bold fs-3" style="width: 70px; height: 70px;">
          JD
        </div>
        <h5 class="mb-0 fw-bold">John Doe</h5>
        <p class="small text-white-50 mb-0">ID: PK-2456</p>
      </div>
      <div class="list-group list-group-flush py-2">
        ${links.map(link => `
          <a href="${link.url}" class="list-group-item list-group-item-action border-0 px-4 py-3 ${currentPath === link.url ? 'active bg-light text-navy fw-bold border-start border-4 border-gold' : 'text-secondary'}">
            <i class="bi ${link.icon} me-3 ${currentPath === link.url ? 'text-gold' : ''}"></i> ${link.name}
          </a>
        `).join('')}
        <a href="#" onclick="window.mockLogout(event)" class="list-group-item list-group-item-action border-0 px-4 py-3 text-danger mt-3">
          <i class="bi bi-box-arrow-right me-3"></i> Logout
        </a>
      </div>
    </div>
  `;

  sidebarContainer.innerHTML = html;
}

function populateDashboardStats() {
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
            <h6 class="text-white-50 text-uppercase fw-bold mb-3">PICKURS Membership</h6>
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
    } else {
      subCard.innerHTML = `
        <div class="card border-0 shadow-sm rounded-4 h-100 bg-light">
          <div class="card-body p-4 text-center">
            <i class="bi bi-star text-muted fs-1 mb-2"></i>
            <h6 class="text-navy text-uppercase fw-bold mb-2">PICKURS Membership</h6>
            <span class="badge bg-secondary mb-3">NOT SUBSCRIBED</span>
            <p class="small text-muted mb-3">Subscribe to participate in exclusive live auctions.</p>
            <a href="subscription.html" class="btn btn-premium btn-sm w-100">Subscribe Now</a>
          </div>
        </div>
      `;
    }
  }

  // Populate active bids table from mock data (just a dummy representation)
  const activeBidsTbody = document.getElementById('dash-active-bids');
  if (activeBidsTbody && window.mockProductsData) {
    const activeProducts = window.mockProductsData.slice(0, 2); // just grab first two as mock
    activeBidsTbody.innerHTML = activeProducts.map((p, idx) => `
      <tr>
        <td class="align-middle">
          <div class="d-flex align-items-center">
            <img src="${p.image}" class="rounded me-3 border" width="40" height="40" style="object-fit:cover;">
            <span class="fw-semibold text-navy">${p.name}</span>
          </div>
        </td>
        <td class="align-middle">${window.utils.formatCurrency(p.currentBid - 500)}</td>
        <td class="align-middle fw-bold">${window.utils.formatCurrency(p.currentBid)}</td>
        <td class="align-middle"><span class="badge bg-${idx===0 ? 'danger' : 'success'}">${idx===0 ? 'OUTBID' : 'LEADING'}</span></td>
        <td class="align-middle text-end">
          <a href="live-auction.html?id=${p.id}" class="btn btn-outline-premium btn-sm">View</a>
        </td>
      </tr>
    `).join('');
  }
}

function renderMyBids() {
  const container = document.getElementById('my-bids-container');
  if (!container || !window.mockProductsData) return;

  const bidsList = window.mockProductsData.slice(0, 4);
  
  if (bidsList.length === 0) {
    container.innerHTML = `<div class="p-5 text-center text-muted"><i class="bi bi-inbox fs-1 d-block mb-3"></i>You have no active or past bids.</div>`;
    return;
  }

  container.innerHTML = bidsList.map((p, idx) => {
    let status, badgeClass, myBid;
    if (idx === 0) { status = 'OUTBID'; badgeClass = 'danger'; myBid = p.currentBid - 500; }
    else if (idx === 1) { status = 'LEADING'; badgeClass = 'success'; myBid = p.currentBid; }
    else if (idx === 2) { status = 'ENDED (LOST)'; badgeClass = 'secondary'; myBid = p.currentBid - 2000; }
    else { status = 'WON'; badgeClass = 'gold text-navy'; myBid = p.currentBid; }
    
    return `
      <div class="card border-0 shadow-sm rounded-4 mb-3">
        <div class="card-body p-3 p-md-4">
          <div class="row align-items-center g-3">
            <div class="col-12 col-md-4 d-flex align-items-center">
              <img src="${p.image}" class="rounded me-3 border" width="60" height="60" style="object-fit:cover;">
              <div>
                <h6 class="mb-1 fw-bold text-navy">${p.name}</h6>
                <span class="badge bg-${badgeClass}">${status}</span>
              </div>
            </div>
            <div class="col-6 col-md-2">
              <div class="small text-muted mb-1">My Bid</div>
              <div class="fw-semibold">${window.utils.formatCurrency(myBid)}</div>
            </div>
            <div class="col-6 col-md-2">
              <div class="small text-muted mb-1">Current Bid</div>
              <div class="fw-bold text-navy">${window.utils.formatCurrency(p.currentBid)}</div>
            </div>
            <div class="col-12 col-md-2">
              <div class="small text-muted mb-1">Time</div>
              <div class="small fw-semibold ${status.includes('ENDED') || status === 'WON' ? 'text-muted' : 'text-danger'}">
                ${status.includes('ENDED') || status === 'WON' ? 'Finished' : '<i class="bi bi-clock"></i> 00:15:30'}
              </div>
            </div>
            <div class="col-12 col-md-2 text-md-end mt-3 mt-md-0">
              <a href="${status === 'WON' ? 'auction-result.html' : 'live-auction.html'}?id=${p.id}" class="btn btn-outline-premium btn-sm w-100">View Action</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = bidsList;
}

function renderWonAuctions() {
  const container = document.getElementById('won-auctions-container');
  if (!container || !window.mockProductsData) return;
  
  // Pick a couple of ended items to mock as WON
  const wonProducts = window.mockProductsData.filter(p => p.status === 'ENDED').slice(0,2);
  
  if (wonProducts.length === 0) {
    container.innerHTML = `<div class="p-5 text-center text-muted"><i class="bi bi-trophy fs-1 d-block mb-3 opacity-50"></i>You haven't won any auctions yet.</div>`;
    return;
  }

  container.innerHTML = wonProducts.map((p, idx) => {
    const payStatus = idx === 0 ? 'PENDING' : 'COMPLETED';
    const payClass = idx === 0 ? 'warning text-dark' : 'success';
    
    return `
      <div class="card border-0 shadow-sm rounded-4 mb-3">
        <div class="card-body p-3 p-md-4">
          <div class="row align-items-center g-3">
            <div class="col-12 col-md-4 d-flex align-items-center">
              <img src="${p.image}" class="rounded me-3 border" width="60" height="60" style="object-fit:cover;">
              <div>
                <h6 class="mb-1 fw-bold text-navy">${p.name}</h6>
                <div class="small text-muted">Ended: ${new Date(p.endTime).toLocaleDateString()}</div>
              </div>
            </div>
            <div class="col-6 col-md-2">
              <div class="small text-muted mb-1">Winning Bid</div>
              <div class="fw-bold text-gold fs-5">${window.utils.formatCurrency(p.currentBid)}</div>
            </div>
            <div class="col-6 col-md-3">
              <div class="small text-muted mb-1">Payment Status</div>
              <span class="badge bg-${payClass} mb-1">${payStatus}</span>
              ${payStatus === 'PENDING' ? '<div class="small text-danger fw-bold"><i class="bi bi-clock"></i> 23:15:00</div>' : ''}
            </div>
            <div class="col-12 col-md-3 text-md-end mt-3 mt-md-0 d-flex flex-column gap-2">
              <a href="payment-status.html" class="btn ${payStatus === 'PENDING' ? 'btn-premium' : 'btn-outline-secondary'} btn-sm w-100">${payStatus === 'PENDING' ? 'Complete Payment' : 'Payment Receipt'}</a>
              <a href="auction-result.html?id=${p.id}" class="btn btn-outline-premium btn-sm w-100">View Result</a>
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

  const watchlistItems = window.mockProductsData.slice(4, 7);
  
  if (watchlistItems.length === 0) {
    container.innerHTML = `<div class="col-12 p-5 text-center text-muted"><i class="bi bi-heart fs-1 d-block mb-3 opacity-50"></i>Your watchlist is empty.</div>`;
    return;
  }

  container.innerHTML = watchlistItems.map(p => `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="product-card h-100 position-relative">
        <button class="btn btn-light rounded-circle position-absolute text-danger shadow-sm" style="top:10px; right:10px; z-index:2; width:35px; height:35px; padding:0;" title="Remove from watchlist" onclick="this.closest('.col-12').remove()">
          <i class="bi bi-heart-fill"></i>
        </button>
        <div class="product-img-wrapper">
          ${window.utils.getStatusBadge(p.status)}
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="product-details">
          <h3 class="product-title fs-6">${p.name}</h3>
          <div class="d-flex justify-content-between align-items-end mt-auto pt-2">
            <div>
              <div class="text-muted small">${p.status === 'UPCOMING' ? 'Starting Bid' : 'Current Bid'}</div>
              <div class="bid-price fs-5">${window.utils.formatCurrency(p.status === 'UPCOMING' ? p.startingBid : p.currentBid)}</div>
            </div>
          </div>
          <a href="${(p.status === 'LIVE' || p.status === 'ENDING SOON') ? 'live-auction.html' : 'product-details.html'}?id=${p.id}" class="btn btn-outline-premium btn-sm w-100 mt-3">View</a>
        </div>
      </div>
    </div>
  `).join('');
}
