// Main JavaScript for BidURS Home Page

document.addEventListener('DOMContentLoaded', () => {
  renderLiveAuctions();
  renderUpcomingAuctions();
  renderCategories();
  renderReviews();
});

// ── Render Live Auctions ──
function renderLiveAuctions() {
  const container = document.getElementById('live-auctions-container');
  if (!container || !window.mockProductsData) return;

  const liveItems = window.mockProductsData.filter(p => p.status === 'LIVE' || p.status === 'ENDING SOON').slice(0, 4);

  const html = liveItems.map(p => {
    return `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="product-card">
        <div class="product-img-wrapper">
          ${window.utils.getStatusBadge(p.status)}
          <button class="wishlist-icon" aria-label="Add to watchlist"><i class="bi bi-heart"></i></button>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-details">
          <div class="product-meta d-flex justify-content-between align-items-center">
            <span style="color:var(--bright-blue);font-size:0.78rem;font-weight:600;">${p.category}</span>
            <span class="fw-bold small" style="color:var(--live-red);">
              <i class="bi bi-clock"></i> <span data-countdown="${p.endTime}" data-status="${p.status}">Loading...</span>
            </span>
          </div>
          <h3 class="product-title text-truncate" title="${p.name}">${p.name}</h3>
          <div class="d-flex justify-content-between align-items-end mt-auto pb-3" style="border-bottom:1px solid var(--glass-border);">
            <div>
              <div class="small text-decoration-line-through" style="color:var(--blue-gray);">Retail: ${window.utils.formatCurrency(p.marketPrice)}</div>
              <div class="bid-price">${window.utils.formatCurrency(p.currentBid)}</div>
            </div>
            <div class="text-end small" style="color:var(--blue-gray);">
              <i class="bi bi-people-fill"></i> ${p.bidders}
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-outline-royal btn-sm flex-fill">Details</a>
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-premium btn-sm flex-fill">Bid Now</a>
          </div>
        </div>
      </div>
    </div>
  `}).join('');

  container.innerHTML = html;
}

// ── Render Upcoming Auctions ──
function renderUpcomingAuctions() {
  const container = document.getElementById('upcoming-auctions-container');
  if (!container || !window.mockProductsData) return;

  const upcomingItems = window.mockProductsData.filter(p => p.status === 'UPCOMING').slice(0, 4);

  const html = upcomingItems.map(p => `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="product-card">
        <div class="product-img-wrapper">
          ${window.utils.getStatusBadge(p.status)}
          <button class="wishlist-icon" aria-label="Add to watchlist"><i class="bi bi-heart"></i></button>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-details">
          <div class="product-meta d-flex justify-content-between align-items-center">
            <span style="color:var(--bright-blue);font-size:0.78rem;font-weight:600;">${p.category}</span>
            <span class="fw-bold small" style="color:var(--blue-gray);">
              <i class="bi bi-calendar-event"></i> <span data-countdown="${p.startTime}" data-status="${p.status}">Loading...</span>
            </span>
          </div>
          <h3 class="product-title text-truncate" title="${p.name}">${p.name}</h3>
          <div class="d-flex justify-content-between align-items-end mt-auto pb-3" style="border-bottom:1px solid var(--glass-border);">
            <div>
              <div class="small" style="color:var(--blue-gray);">Starting Bid</div>
              <div class="bid-price">${window.utils.formatCurrency(p.startingBid)}</div>
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-outline-royal btn-sm flex-fill">Details</a>
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-royal btn-sm flex-fill">Remind Me</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

// ── Render Categories ──
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  const html = mockCategories.map(category => `
    <div class="col-6 col-md-4 col-lg-2">
      <a href="pages/products.html" class="text-decoration-none">
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
      `<i class="bi bi-star-fill" style="color:${i < review.rating ? 'var(--yellow)' : 'rgba(255,255,255,0.15)'}"></i>`
    ).join('');

    return `
      <div class="col-12 col-md-4">
        <div class="review-card">
          <div class="d-flex align-items-center mb-3 position-relative z-1">
            <img src="${review.avatar}" class="review-avatar me-3" width="48" height="48" alt="${review.user}">
            <div>
              <h5 class="mb-0 text-white fw-bold" style="font-size:0.95rem;font-family:var(--font-heading);">${review.user}</h5>
              <div class="mt-1">${stars}</div>
            </div>
          </div>
          <p class="fst-italic mb-3 position-relative z-1" style="color:var(--blue-gray-lt);font-size:0.9rem;">"${review.comment}"</p>
          <div class="d-flex justify-content-between align-items-center small position-relative z-1" style="border-top:1px solid var(--glass-border);padding-top:0.75rem;">
            <span class="fw-semibold text-white">Won: ${review.product}</span>
            <span class="fw-bold" style="color:var(--success);">${review.winPrice}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}
