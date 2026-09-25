/**
 * Logic for Product Details Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-details-container');
  if (!container || !window.mockProductsData) return;

  const rawIdParam = window.utils ? window.utils.getQueryParam('id') : new URLSearchParams(window.location.search).get('id');
  const product = (window.utils && window.utils.findProductById) 
    ? window.utils.findProductById(rawIdParam) 
    : (window.mockProductsData ? window.mockProductsData.find(p => String(p.id) === String(rawIdParam)) : null);

  if (!product) {
    container.innerHTML = `
      <div class="text-center py-5">
        <h2 class="fw-bold text-navy mb-3">Product Not Found</h2>
        <p class="text-muted fs-5 mb-4">Please return to Auctions</p>
        <a href="live-auctions.html" class="btn btn-premium px-4 py-2">BACK TO AUCTIONS</a>
      </div>
    `;
    return;
  }

  // Populate data
  document.title = `${product.name} | BIDURS`;
  
  const isUpcoming = product.status === 'UPCOMING';
  const isEnded = product.status === 'ENDED';
  const isLive = product.status === 'LIVE' || product.status === 'ENDING SOON';
  const targetTime = isUpcoming ? product.startTime : product.endTime;

  // Dummy Bid History Generation for details view
  const dummyBidders = [
    { name: product.highestBidder || 'Vikram S. (#8842)', amount: product.currentBid, time: '3 mins ago', status: 'Highest Bidder' },
    { name: 'Ananya R. (#3319)', amount: Math.max(product.startingBid, product.currentBid - 2000), time: '12 mins ago', status: 'Outbid' },
    { name: 'Karthik N. (#6612)', amount: Math.max(product.startingBid, product.currentBid - 5000), time: '28 mins ago', status: 'Outbid' },
    { name: 'Priya K. (#7204)', amount: Math.max(product.startingBid, product.currentBid - 8000), time: '45 mins ago', status: 'Outbid' }
  ];

  let actionButton = '';
  if (isUpcoming) {
    const timeFormatted = window.auctionEngine ? window.auctionEngine.formatAuctionTime(product.startTime) : new Date(product.startTime).toLocaleString();
    actionButton = `
      <div class="alert alert-info border-0 rounded-3 mb-3 text-navy fw-semibold">
        <i class="bi bi-calendar-event me-2 text-primary fs-5"></i> Scheduled to start at: <strong>${timeFormatted}</strong>
      </div>
      <button class="btn btn-outline-premium btn-lg w-100 mb-3" onclick="alert('Notification set! We will remind you when this auction starts.')"><i class="bi bi-bell"></i> Set Auction Reminder</button>
      <button class="btn btn-secondary btn-lg w-100 mb-3 disabled" disabled>Bidding Begins at ${timeFormatted}</button>
    `;
  } else if (isEnded) {
    actionButton = `
      <div class="alert alert-warning border-0 rounded-3 mb-3 text-navy">
        <i class="bi bi-trophy-fill me-2 text-warning fs-5"></i> Auction Completed on ${new Date(product.endTime).toLocaleDateString()}
        <div class="mt-2 small text-muted"><strong>Payment Deadline:</strong> Winner has 24 hours to complete payment. If unpaid, item goes to runner-up bidder.</div>
      </div>
      <button class="btn btn-secondary btn-lg w-100 mb-3 disabled" disabled>Auction Ended (Winning Bid: ${window.utils.formatCurrency(product.currentBid)})</button>
    `;
  } else {
    actionButton = `<a href="live-auction.html?id=${product.id}" class="btn btn-premium btn-lg w-100 mb-3 fs-5 py-3 shadow-lg fw-bold">Enter Live Bidding Room</a>`;
  }

  const html = `
    <div class="row g-5">
      <!-- Left: Image Gallery -->
      <div class="col-lg-6">
        <div class="bg-white p-3 rounded-4 border mb-3 text-center position-relative shadow-sm">
          ${window.utils.getStatusBadge(product.status)}
          <img src="${product.image}" id="main-product-image" class="img-fluid rounded-3" alt="${product.name}" style="max-height: 460px; object-fit: contain;" onerror="this.onerror=null;this.src='../assets/images/image.png';">
        </div>
        <div class="row g-2">
          ${(product.thumbnailImages || [product.image]).map(img => `
            <div class="col-3">
              <div class="border rounded-3 p-1 cursor-pointer bg-white thumbnail-wrapper" onclick="document.getElementById('main-product-image').src='${img}'">
                <img src="${img}" class="img-fluid rounded" alt="Thumbnail" style="height: 75px; width: 100%; object-fit: cover; cursor: pointer;" onerror="this.onerror=null;this.src='../assets/images/image.png';">
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: Details -->
      <div class="col-lg-6">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="../index.html" class="text-decoration-none text-navy fw-semibold">Home</a></li>
            <li class="breadcrumb-item"><a href="live-auctions.html" class="text-decoration-none text-navy fw-semibold">Live Auctions</a></li>
            <li class="breadcrumb-item active" aria-current="page">${product.category}</li>
          </ol>
        </nav>
        
        <h1 class="h2 fw-bold text-navy mb-2">${product.name}</h1>
        <p class="text-muted mb-4">Brand: <span class="fw-bold text-navy">${product.brand}</span> | Authorized Seller: <span class="fw-bold text-navy">${product.sellerName || 'BIDURS Premium'}</span></p>
        
        <div class="card border-0 bg-white shadow-sm rounded-4 p-4 mb-4">
          <div class="row g-4">
            <div class="col-6 col-md-4 border-end">
              <div class="text-muted small mb-1 fw-semibold">Market Price</div>
              <div class="fs-5 text-decoration-line-through text-secondary">${window.utils.formatCurrency(product.marketPrice)}</div>
            </div>
            <div class="col-6 col-md-4 ${!isUpcoming ? 'border-end' : ''}">
              <div class="text-muted small mb-1 fw-semibold">Starting Bid</div>
              <div class="fs-5 text-navy fw-bold">${window.utils.formatCurrency(product.startingBid)}</div>
            </div>
            ${!isUpcoming ? `
              <div class="col-12 col-md-4">
                <div class="text-muted small mb-1 fw-bold text-royal">Current Highest Bid</div>
                <div class="fs-3 fw-bold text-royal">${window.utils.formatCurrency(product.currentBid)}</div>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-between mb-4 p-3 border rounded-3 bg-white shadow-sm">
          <div>
            <div class="text-muted small text-uppercase fw-bold mb-1">
              ${isUpcoming ? 'Auction Starts In' : (isEnded ? 'Auction Status' : 'Remaining Auction Time')}
            </div>
            ${!isEnded ? `
              <div class="fs-4 fw-bold font-monospace text-danger" data-countdown="${targetTime}" data-status="${product.status}">Loading...</div>
            ` : `<div class="fs-4 fw-bold text-muted">Auction Ended</div>`}
          </div>
          <div class="text-end">
            <div class="text-muted small text-uppercase fw-bold mb-1">Active Bidders</div>
            <div class="fs-4 fw-bold text-navy"><i class="bi bi-people-fill text-warning me-1"></i> ${product.bidders || 15} Bidders</div>
          </div>
        </div>

        ${actionButton}
        
        <div class="alert alert-secondary border-0 small mt-3 text-navy">
          <i class="bi bi-shield-check text-success me-2 fs-6"></i> <strong>BIDURS Guarantee:</strong> Verified authentic products with manufacturer warranty and 24h winner payment window.
        </div>
      </div>
    </div>

    <!-- Description & Features Tabs -->
    <div class="row mt-5">
      <div class="col-12">
        <ul class="nav nav-tabs mb-4" id="productTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active fw-bold text-navy" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" type="button" role="tab">Description</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold text-navy" id="features-tab" data-bs-toggle="tab" data-bs-target="#features" type="button" role="tab">Product Features</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold text-navy" id="bidders-tab" data-bs-toggle="tab" data-bs-target="#bidders" type="button" role="tab">Bid Activity (${product.bidders || 15})</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold text-navy" id="terms-tab" data-bs-toggle="tab" data-bs-target="#terms" type="button" role="tab">Auction Rules & Payment</button>
          </li>
        </ul>
        <div class="tab-content p-4 bg-white border rounded-bottom shadow-sm" id="productTabsContent">
          <div class="tab-pane fade show active" id="desc" role="tabpanel">
            <h5 class="fw-bold text-navy mb-2">${product.shortDescription || ''}</h5>
            <p class="text-body fs-6 leading-relaxed">${product.description || ''}</p>
          </div>
          <div class="tab-pane fade" id="features" role="tabpanel">
            <ul class="list-group list-group-flush">
              ${(product.features || []).map(f => `<li class="list-group-item px-0 py-2 border-bottom"><i class="bi bi-check-circle-fill text-success me-2"></i> <span class="text-navy fw-semibold">${f}</span></li>`).join('')}
            </ul>
          </div>
          <div class="tab-pane fade" id="bidders" role="tabpanel">
            <h6 class="fw-bold text-navy mb-3"><i class="bi bi-clock-history text-royal me-2"></i>Recent Bid Activity</h6>
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Bidder Info</th>
                    <th>Bid Amount</th>
                    <th>Bid Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${dummyBidders.map((b, idx) => `
                    <tr>
                      <td class="fw-bold text-navy"><i class="bi bi-person-circle text-primary me-2"></i>${b.name}</td>
                      <td class="fw-bold text-royal">${window.utils.formatCurrency(b.amount)}</td>
                      <td class="text-muted small">${b.time}</td>
                      <td><span class="badge ${idx === 0 ? 'bg-success text-white' : 'bg-light text-muted border'}">${b.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade" id="terms" role="tabpanel">
            <div class="text-navy leading-relaxed">
              <h6 class="fw-bold mb-2">Auction & Payment Policy</h6>
              <ol class="ps-3 mb-0 text-body">
                <li class="mb-2"><strong>Binding Bids:</strong> All live bids placed are final and binding.</li>
                <li class="mb-2"><strong>Winner Determination:</strong> The highest eligible bid recorded when countdown reaches zero wins.</li>
                <li class="mb-2"><strong>Payment Deadline:</strong> The winner must complete payment within 24 hours after auction conclusion.</li>
                <li class="mb-2"><strong>Fallback Policy:</strong> If the primary winner fails to pay within 24 hours, the offer automatically extends to the next highest bidder.</li>
              </ol>
            </div>
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
