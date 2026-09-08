// Main JavaScript for PICKURS.in Home Page

document.addEventListener('DOMContentLoaded', () => {
  renderLiveAuctions();
  renderUpcomingAuctions();
  renderCategories();
  renderReviews();
});

// Render Live Auctions
function renderLiveAuctions() {
  const container = document.getElementById('live-auctions-container');
  if (!container || !window.mockProductsData) return;

  const liveItems = window.mockProductsData.filter(p => p.status === 'LIVE' || p.status === 'ENDING SOON').slice(0, 4);

  const html = liveItems.map(p => {
    const isEndingSoon = p.status === 'ENDING SOON';
    return `
    <div class="col-12 col-md-6 col-lg-3 mb-4">
      <div class="product-card">
        <div class="product-img-wrapper" style="height: 200px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
          ${window.utils.getStatusBadge(p.status)}
          <img src="${p.image}" alt="${p.name}" style="object-fit: contain; width: 100%; height: 100%; padding: 1rem;">
        </div>
        <div class="product-details d-flex flex-column" style="padding: 1.25rem;">
          <div class="product-meta mb-2 d-flex justify-content-between align-items-center">
            <span class="small text-muted">${p.category}</span>
            <span class="fw-bold small text-danger">
              <i class="bi bi-clock"></i> <span data-countdown="${p.endTime}" data-status="${p.status}">Loading...</span>
            </span>
          </div>
          <h3 class="product-title h6 mb-3 text-truncate" title="${p.name}">${p.name}</h3>
          <div class="d-flex justify-content-between align-items-end mt-auto pb-3 border-bottom">
            <div>
              <div class="text-muted small text-decoration-line-through">Retail: ${window.utils.formatCurrency(p.marketPrice)}</div>
              <div class="fw-bold text-royal fs-5">${window.utils.formatCurrency(p.currentBid)}</div>
            </div>
            <div class="text-end text-muted small">
              <i class="bi bi-people-fill"></i> ${p.bidders} Bidders
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-outline-royal btn-sm flex-fill">View Details</a>
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-royal btn-sm flex-fill">Join Auction</a>
          </div>
        </div>
      </div>
    </div>
  `}).join('');

  container.innerHTML = html;
}

// Render Upcoming Auctions
function renderUpcomingAuctions() {
  const container = document.getElementById('upcoming-auctions-container');
  if (!container || !window.mockProductsData) return;

  const upcomingItems = window.mockProductsData.filter(p => p.status === 'UPCOMING').slice(0, 4);

  const html = upcomingItems.map(p => `
    <div class="col-12 col-md-6 col-lg-3 mb-4">
      <div class="product-card">
        <div class="product-img-wrapper" style="height: 200px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
          ${window.utils.getStatusBadge(p.status)}
          <img src="${p.image}" alt="${p.name}" style="object-fit: contain; width: 100%; height: 100%; padding: 1rem;">
        </div>
        <div class="product-details d-flex flex-column" style="padding: 1.25rem;">
          <div class="product-meta mb-2 d-flex justify-content-between align-items-center">
            <span class="small text-muted">${p.category}</span>
            <span class="fw-bold small text-secondary">
              <i class="bi bi-calendar-event"></i> <span data-countdown="${p.startTime}" data-status="${p.status}">Loading...</span>
            </span>
          </div>
          <h3 class="product-title h6 mb-3 text-truncate" title="${p.name}">${p.name}</h3>
          <div class="d-flex justify-content-between align-items-end mt-auto pb-3 border-bottom">
            <div>
              <div class="text-muted small text-decoration-line-through">Retail: ${window.utils.formatCurrency(p.marketPrice)}</div>
              <div class="fw-bold text-royal fs-5">${window.utils.formatCurrency(p.startingBid)}</div>
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-outline-royal btn-sm flex-fill">View Details</a>
            <a href="pages/product-details.html?id=${p.id}" class="btn btn-royal btn-sm flex-fill">Place Bid</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

// Render Categories
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  const html = mockCategories.map(category => `
    <div class="col-6 col-md-4 col-lg-2 mb-4">
      <div class="category-card">
        <i class="bi ${category.icon} category-icon"></i>
        <h4 class="category-title h6">${category.name}</h4>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

// Render Reviews
function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  const html = mockReviews.map(review => {
    const stars = Array(5).fill(0).map((_, i) => 
      `<i class="bi bi-star-fill text-warning ${i >= review.rating ? 'opacity-25' : ''}"></i>`
    ).join('');

    return `
      <div class="col-12 col-md-4 mb-4">
        <div class="card h-100 border-0 shadow-sm rounded-4">
          <div class="card-body p-4">
            <div class="d-flex align-items-center mb-3">
              <img src="${review.avatar}" class="rounded-circle me-3" width="50" height="50" alt="${review.user}">
              <div>
                <h5 class="mb-0 fs-6 fw-bold text-navy">${review.user}</h5>
                <div class="text-warning small">${stars}</div>
              </div>
            </div>
            <p class="card-text text-muted fst-italic">"${review.comment}"</p>
            <hr class="text-muted">
            <div class="d-flex justify-content-between align-items-center small">
              <span class="text-navy fw-semibold">Won: ${review.product}</span>
              <span class="text-success fw-bold">For ${review.winPrice}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}
