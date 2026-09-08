/**
 * Logic for Product Details Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-details-container');
  if (!container || !window.mockProductsData) return;

  const productId = parseInt(window.utils.getQueryParam('id'));
  
  const product = window.mockProductsData.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = `
      <div class="text-center py-5">
        <h2>Product Not Found</h2>
        <a href="products.html" class="btn btn-premium mt-3">Back to Products</a>
      </div>
    `;
    return;
  }

  // Populate data
  document.title = `${product.name} | PICKURS.in`;
  
  const isUpcoming = product.status === 'UPCOMING';
  const isEnded = product.status === 'ENDED';
  const targetTime = isUpcoming ? product.startTime : product.endTime;

  let actionButton = '';
  if (isUpcoming) {
    actionButton = `<button class="btn btn-outline-premium btn-lg w-100 mb-3"><i class="bi bi-bell"></i> Notify Me</button>`;
  } else if (isEnded) {
    actionButton = `<button class="btn btn-secondary btn-lg w-100 mb-3" disabled>Auction Ended</button>`;
  } else {
    actionButton = `<button class="btn btn-premium btn-lg w-100 mb-3 fs-5 py-3 shadow-lg">Place Bid Now</button>`;
  }

  const html = `
    <div class="row g-5">
      <!-- Left: Image Gallery -->
      <div class="col-lg-6">
        <div class="bg-white p-2 rounded-4 border mb-3 text-center position-relative">
          ${window.utils.getStatusBadge(product.status)}
          <img src="${product.image}" id="main-product-image" class="img-fluid rounded-3" alt="${product.name}" style="max-height: 500px; object-fit: contain;">
        </div>
        <div class="row g-2">
          ${product.thumbnailImages.map(img => `
            <div class="col-3">
              <div class="border rounded-3 p-1 cursor-pointer bg-white thumbnail-wrapper" onclick="document.getElementById('main-product-image').src='${img}'">
                <img src="${img}" class="img-fluid rounded" alt="Thumbnail" style="height: 80px; width: 100%; object-fit: cover; cursor: pointer;">
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: Details -->
      <div class="col-lg-6">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none text-navy">Home</a></li>
            <li class="breadcrumb-item"><a href="products.html" class="text-decoration-none text-navy">Products</a></li>
            <li class="breadcrumb-item active" aria-current="page">${product.category}</li>
          </ol>
        </nav>
        
        <h1 class="h2 fw-bold text-navy mb-2">${product.name}</h1>
        <p class="text-muted mb-4">By <span class="fw-semibold text-dark">${product.brand}</span> | Sold by ${product.sellerName}</p>
        
        <div class="card border-0 bg-light rounded-4 p-4 mb-4">
          <div class="row g-4">
            <div class="col-6 col-md-4 border-end">
              <div class="text-muted small mb-1">Market Price</div>
              <div class="fs-5 text-decoration-line-through">${window.utils.formatCurrency(product.marketPrice)}</div>
            </div>
            <div class="col-6 col-md-4 ${!isUpcoming ? 'border-end' : ''}">
              <div class="text-muted small mb-1">Starting Bid</div>
              <div class="fs-5">${window.utils.formatCurrency(product.startingBid)}</div>
            </div>
            ${!isUpcoming ? `
              <div class="col-12 col-md-4">
                <div class="text-muted small mb-1 fw-bold text-royal">Current Highest Bid</div>
                <div class="fs-3 fw-bold text-royal">${window.utils.formatCurrency(product.currentBid)}</div>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-between mb-4 p-3 border rounded-3 bg-white">
          <div>
            <div class="text-muted small text-uppercase fw-bold mb-1">
              ${isUpcoming ? 'Auction Starts In' : (isEnded ? 'Auction Status' : 'Auction Ends In')}
            </div>
            ${!isEnded ? `
              <div class="fs-4 fw-bold font-monospace text-navy" data-countdown="${targetTime}" data-status="${product.status}">Loading...</div>
            ` : `<div class="fs-4 fw-bold text-muted">Ended</div>`}
          </div>
          <div class="text-end">
            <div class="text-muted small text-uppercase fw-bold mb-1">Active Bidders</div>
            <div class="fs-4 fw-bold text-navy"><i class="bi bi-people-fill text-gold"></i> ${product.bidders}</div>
          </div>
        </div>

        ${actionButton}
        
        <div class="alert alert-secondary border-0 small mt-3">
          <i class="bi bi-info-circle me-2"></i> This is a simulated live auction platform. Actual bidding functionality will be available in Stage 3.
        </div>
      </div>
    </div>

    <!-- Description & Features Tabs -->
    <div class="row mt-5">
      <div class="col-12">
        <ul class="nav nav-tabs mb-4" id="productTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active fw-semibold text-navy" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" type="button" role="tab">Description</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-semibold text-navy" id="features-tab" data-bs-toggle="tab" data-bs-target="#features" type="button" role="tab">Key Features</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-semibold text-navy" id="terms-tab" data-bs-toggle="tab" data-bs-target="#terms" type="button" role="tab">Auction Terms</button>
          </li>
        </ul>
        <div class="tab-content p-3 bg-white border rounded-bottom" id="productTabsContent">
          <div class="tab-pane fade show active" id="desc" role="tabpanel">
            <p class="fs-5">${product.shortDescription}</p>
            <p class="text-muted">${product.description}</p>
          </div>
          <div class="tab-pane fade" id="features" role="tabpanel">
            <ul class="list-group list-group-flush">
              ${product.features.map(f => `<li class="list-group-item"><i class="bi bi-check-circle-fill text-success me-2"></i> ${f}</li>`).join('')}
            </ul>
          </div>
          <div class="tab-pane fade" id="terms" role="tabpanel">
            <p class="text-muted small">
              1. All bids are final and cannot be withdrawn.<br>
              2. The highest bidder at the end of the countdown wins the auction.<br>
              3. Payment must be completed within 24 hours of winning.<br>
              4. Products are 100% genuine and come with standard manufacturer warranty.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Initialize timer
  if (window.timerUtils) {
    window.timerUtils.initTimers();
  }
});
