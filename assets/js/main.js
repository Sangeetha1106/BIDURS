// Main JavaScript for BIDURS Home Page

document.addEventListener('DOMContentLoaded', () => {
  renderLiveAuctions();
  renderUpcomingAuctions();
  renderCategories();
  renderReviews();
});

// ── Render Live Auctions ──
function renderLiveAuctions() {
  const container = document.getElementById('live-auctions-container');
  if (!container || !window.auctionEngine) return;

  const currentSlot = window.auctionEngine.getCurrentAuction();
  const nextSlot = window.auctionEngine.getNextAuction();

  let html = '';

  if (currentSlot && currentSlot.product) {
    const p = currentSlot.product;
    html += `
    <div class="col-12 col-lg-7">
      <div class="product-card h-100 p-3" style="background:#FFFFFF !important; border: 2px solid var(--badge-live); box-shadow: 0 0 25px rgba(230, 57, 70, 0.25);">
        <div class="row g-0 h-100 align-items-center">
          <div class="col-md-5">
            <div class="product-img-wrapper h-100" style="min-height: 220px;">
              ${window.utils.getStatusBadge(p.status)}
              <button class="wishlist-icon" aria-label="Add to watchlist"><i class="bi bi-heart"></i></button>
              <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/image.png';" style="object-fit: contain; width: 100%; height: 100%; max-height: 250px;">
            </div>
          </div>
          <div class="col-md-7">
            <div class="product-details ps-md-3">
              <div class="product-meta d-flex justify-content-between align-items-center mb-2">
                <span class="fw-bold" style="color:var(--royal-blue);font-size:0.85rem;">${p.category}</span>
                <span class="fw-bold small" style="color:var(--badge-live);">
                  <i class="bi bi-clock-fill"></i> Ends in: <span data-countdown="${p.endTime}" data-status="${p.status}">Loading...</span>
                </span>
              </div>
              <h3 class="product-title fs-5 fw-bold text-navy mb-2" title="${p.name}">${p.name}</h3>
              <p class="small text-muted mb-3 line-clamp-2">${p.shortDescription || p.description}</p>
              
              <div class="d-flex justify-content-between align-items-end mb-3 pb-2" style="border-bottom:1px solid var(--border-subtle);">
                <div>
                  <div class="small text-muted text-decoration-line-through">Retail: ${window.utils.formatCurrency(p.marketPrice)}</div>
                  <div class="bid-price fs-3 fw-bold" style="color:var(--royal-blue);">${window.utils.formatCurrency(p.currentBid)}</div>
                </div>
                <div class="text-end small fw-bold text-navy">
                  <i class="bi bi-people-fill text-warning me-1"></i> ${p.bidders} Bidders
                </div>
              </div>
              <div class="d-flex gap-2">
                <a href="pages/product-details.html?id=${p.id}" class="btn btn-outline-premium btn-sm flex-fill">Details</a>
                <a href="pages/live-auction.html?id=${p.id}" class="btn btn-premium btn-lg flex-fill fw-bold shadow">Bid Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  } else {
    // Gap state
    const nextTimeStr = nextSlot ? window.auctionEngine.formatAuctionTime(nextSlot.startMs) : 'Soon';
    html += `
    <div class="col-12 col-lg-7">
      <div class="product-card h-100 p-4 text-center d-flex flex-column justify-content-center align-items-center" style="background: #0B1B3D !important; border: 1px dashed var(--gold);">
        <i class="bi bi-pause-circle fs-1 text-warning mb-3"></i>
        <h4 class="text-white fw-bold mb-2">No Auction Live Right Now</h4>
        <p class="text-light mb-3" style="max-width: 400px;">Our live auctions run sequentially one after another. The next auction starts at <strong class="text-warning">${nextTimeStr}</strong>.</p>
        ${nextSlot ? `
          <div class="badge bg-navy border border-warning text-warning px-3 py-2 fs-6 mb-3 font-monospace">
            Starts in: <span data-countdown="${nextSlot.startMs}" data-status="UPCOMING">Loading...</span>
          </div>
        ` : ''}
      </div>
    </div>
    `;
  }

  // Render Next Auction Card beside/below it
  if (nextSlot && nextSlot.product) {
    const np = nextSlot.product;
    const timeDisplay = window.auctionEngine.formatAuctionTime(nextSlot.startMs);
    html += `
    <div class="col-12 col-lg-5">
      <div class="product-card h-100 p-3" style="background: #FFFFFF !important; border: 1px solid var(--border-light);">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge rounded-pill px-3 py-1 fw-bold bg-primary text-white" style="font-size:0.75rem;">
            <i class="bi bi-clock-history me-1"></i> NEXT AUCTION
          </span>
          <span class="small fw-semibold text-navy"><i class="bi bi-calendar-event me-1"></i>${timeDisplay}</span>
        </div>
        <div class="text-center py-2">
          <img src="${np.image}" alt="${np.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/image.png';" style="max-height: 140px; object-fit: contain;">
        </div>
        <div class="product-details pt-2">
          <h4 class="product-title fs-6 fw-bold text-navy text-truncate mb-1" title="${np.name}">${np.name}</h4>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span class="small text-muted d-block">Starting Bid</span>
              <span class="fw-bold text-navy">${window.utils.formatCurrency(np.startingBid)}</span>
            </div>
            <div class="text-end">
              <span class="small text-muted d-block">Starts In</span>
              <span class="fw-bold font-monospace text-royal" data-countdown="${nextSlot.startMs}" data-status="UPCOMING">Loading...</span>
            </div>
          </div>
          <div class="d-flex gap-2">
            <a href="pages/product-details.html?id=${np.id}" class="btn btn-outline-premium btn-sm flex-fill">Details</a>
            <button class="btn btn-secondary btn-sm flex-fill disabled" disabled><i class="bi bi-lock-fill me-1"></i> Starts at ${nextSlot.startTime}</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  container.innerHTML = html;
  if (window.timerUtils) {
    window.timerUtils.initTimers();
  }
}

// ── Render Upcoming Auctions ──
function renderUpcomingAuctions() {
  const container = document.getElementById('upcoming-auctions-container');
  if (!container || !window.auctionEngine) return;

  const currentSlot = window.auctionEngine.getCurrentAuction();
  const nextSlot = window.auctionEngine.getNextAuction();

  // Exclude current live and immediate next from general upcoming list
  const currentId = currentSlot ? currentSlot.productId : null;
  const nextId = nextSlot ? nextSlot.productId : null;

  const upcomingSlots = window.auctionEngine.getEnrichedSchedule()
    .filter(s => s.startMs > new Date().getTime() && s.productId !== nextId && s.productId !== currentId)
    .slice(0, 4);

  if (upcomingSlots.length === 0) {
    container.innerHTML = `<div class="col-12 text-center text-muted py-4">No additional upcoming auctions scheduled.</div>`;
    return;
  }

  const html = upcomingSlots.map(slot => {
    const p = slot.product;
    if (!p) return '';
    const timeDisplay = window.auctionEngine.formatAuctionTime(slot.startMs);

    return `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="product-card">
        <div class="product-img-wrapper">
          ${window.utils.getStatusBadge('UPCOMING')}
          <button class="wishlist-icon" aria-label="Add to watchlist"><i class="bi bi-heart"></i></button>
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/image.png';">
        </div>
        <div class="product-details">
          <div class="product-meta d-flex justify-content-between align-items-center">
            <span style="color:var(--bright-blue);font-size:0.78rem;font-weight:600;">${p.category}</span>
            <span class="fw-bold small" style="color:var(--gold);">
              <i class="bi bi-calendar-event"></i> ${timeDisplay}
            </span>
          </div>
          <h3 class="product-title text-truncate" title="${p.name}">${p.name}</h3>
          <div class="d-flex justify-content-between align-items-end mt-auto pb-3" style="border-bottom:1px solid var(--glass-border);">
            <div>
              <div class="small" style="color:var(--blue-gray);">Starting Bid</div>
              <div class="bid-price">${window.utils.formatCurrency(p.startingBid)}</div>
            </div>
            <div class="text-end small font-monospace" style="color:var(--blue-gray);">
              <span data-countdown="${slot.startMs}" data-status="UPCOMING">Loading...</span>
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-outline-royal btn-sm flex-fill">Details</a>
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-royal btn-sm flex-fill">Notify Me</a>
          </div>
        </div>
      </div>
    </div>
  `}).join('');

  container.innerHTML = html;
  if (window.timerUtils) {
    window.timerUtils.initTimers();
  }
}

// ── Render Categories ──
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  const html = mockCategories.map(category => `
    <div class="col-6 col-md-4 col-lg-2">
      <a href="pages/products.html?category=${encodeURIComponent(category.name)}" class="text-decoration-none">
        <div class="category-card">
          <i class="bi ${category.icon} category-icon"></i>
          <h4 class="category-title">${category.name}</h4>
        </div>
      </a>
    </div>
  `).join('');

  container.innerHTML = html;
}

// ── Render Reviews ──
function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  const html = mockReviews.map(review => {
    const stars = Array(5).fill(0).map((_, i) =>
      `<i class="bi bi-star-fill" style="color:${i < review.rating ? 'var(--gold-dark)' : '#CBD5E1'}"></i>`
    ).join('');

    return `
      <div class="col-12 col-md-4">
        <div class="review-card">
          <div class="d-flex align-items-center mb-3 position-relative z-1">
            <img src="${review.avatar}" class="review-avatar me-3" width="48" height="48" alt="${review.user}">
            <div>
              <h5 class="mb-0 text-navy fw-bold" style="font-size:1.05rem;font-family:var(--font-heading);">${review.user}</h5>
              <div class="mt-1">${stars}</div>
            </div>
          </div>
          <p class="fst-italic mb-3 position-relative z-1 fw-medium" style="color:#334155;font-size:0.95rem;line-height:1.6;">"${review.comment}"</p>
          <div class="d-flex justify-content-between align-items-center small position-relative z-1" style="border-top:1px solid var(--border-light);padding-top:0.75rem;">
            <span class="fw-bold text-navy">Won: ${review.product}</span>
            <span class="fw-bold fs-6" style="color:var(--royal-blue);">${review.winPrice}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}
