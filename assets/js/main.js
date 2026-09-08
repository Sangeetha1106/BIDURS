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
  if (!container) return;

  const html = mockProducts.liveAuctions.map(product => `
    <div class="col-12 col-md-6 col-lg-3 mb-4">
      <div class="product-card">
        <div class="product-img-wrapper">
          <span class="auction-badge badge-live"><i class="bi bi-circle-fill small me-1"></i> Live</span>
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-details">
          <div class="product-meta">
            <span>${product.category}</span>
            <span class="text-danger fw-bold"><i class="bi bi-clock"></i> ${product.timeLeft}</span>
          </div>
          <h3 class="product-title">${product.title}</h3>
          <div class="d-flex justify-content-between align-items-end mt-auto pt-3">
            <div>
              <div class="text-muted small text-decoration-line-through">Retail: ${product.retailPrice}</div>
              <div class="bid-price">${product.currentBid}</div>
            </div>
            <button class="btn btn-premium btn-sm">Bid Now</button>
          </div>
          <div class="text-muted small mt-2">
            <i class="bi bi-people-fill"></i> ${product.bidders} Active Bidders
          </div>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

// Render Upcoming Auctions
function renderUpcomingAuctions() {
  const container = document.getElementById('upcoming-auctions-container');
  if (!container) return;

  const html = mockProducts.upcomingAuctions.map(product => `
    <div class="col-12 col-md-6 col-lg-3 mb-4">
      <div class="product-card">
        <div class="product-img-wrapper">
          <span class="auction-badge badge-upcoming">Upcoming</span>
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-details">
          <div class="product-meta">
            <span>${product.category}</span>
            <span class="text-primary fw-bold"><i class="bi bi-calendar-event"></i> ${product.startDate}</span>
          </div>
          <h3 class="product-title">${product.title}</h3>
          <div class="d-flex justify-content-between align-items-end mt-auto pt-3">
            <div>
              <div class="text-muted small">Starting Bid</div>
              <div class="bid-price">${product.startingBid}</div>
            </div>
            <button class="btn btn-outline-premium btn-sm">Remind Me</button>
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
