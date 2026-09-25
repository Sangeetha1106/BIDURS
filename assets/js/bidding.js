/**
 * Logic for Live Auction & Bidding Room
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('live-auction-container');
  if (!container || !window.mockProductsData) return;

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const rawIdParam = window.utils ? window.utils.getQueryParam('id') : new URLSearchParams(window.location.search).get('id');
  const fullPathWithQuery = 'live-auction.html' + (rawIdParam ? `?id=${rawIdParam}` : '');

  if (!isLoggedIn) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(fullPathWithQuery);
    return;
  }

  let product = (window.utils && window.utils.findProductById) 
    ? window.utils.findProductById(rawIdParam) 
    : (window.mockProductsData ? window.mockProductsData.find(p => String(p.id) === String(rawIdParam)) : null);

  // Fallback: If no ID specified, load current live auction product
  if (!product && (!rawIdParam || rawIdParam === 'null' || rawIdParam === 'undefined')) {
    const liveSlot = window.auctionEngine ? window.auctionEngine.getCurrentAuction() : null;
    product = (liveSlot && liveSlot.product) ? liveSlot.product : (window.mockProductsData ? window.mockProductsData[0] : null);
  }

  if (!product) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-exclamation-triangle fs-1 text-warning mb-3 d-block"></i>
        <h2 class="fw-bold text-navy mb-2">Auction Not Found</h2>
        <p class="text-muted mb-4">The auction product you requested does not exist or has been removed.</p>
        <a href="live-auctions.html" class="btn btn-premium px-4 py-2 fw-bold">Back to Live Auctions</a>
      </div>
    `;
    return;
  }

  // If opening live auction room for an UPCOMING product, redirect or show message
  if (product.status === 'UPCOMING') {
    const timeFormatted = window.auctionEngine ? window.auctionEngine.formatAuctionTime(product.startTime) : 'Soon';
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-clock-history fs-1 text-gold mb-3 d-block"></i>
        <h2 class="text-navy fw-bold mb-2">Auction Not Live Yet</h2>
        <p class="text-muted fs-5 mb-4">This product is scheduled for auction at <strong>${timeFormatted}</strong>.</p>
        <a href="product-details.html?id=${product.id}" class="btn btn-outline-premium me-2">View Details & Remind Me</a>
        <a href="live-auctions.html" class="btn btn-premium">Current Live Auction</a>
      </div>
    `;
    return;
  }

  // Set document title
  document.title = `Live: ${product.name} | BIDURS`;

  // State
  let currentBid = product.currentBid;
  let minimumNextBid = currentBid + getIncrementAmount(currentBid);
  let userBidInput = minimumNextBid;
  let bidderState = 'NOT_PARTICIPATING'; // 'LEADING', 'OUTBID', 'NOT_PARTICIPATING'
  let isEnded = product.status === 'ENDED';
  
  // Mock Bid History
  let bidHistory = [
    { bidderId: '2456', amount: currentBid, timeStr: 'Just now' },
    { bidderId: '7821', amount: currentBid - getIncrementAmount(currentBid), timeStr: '10 sec ago' },
    { bidderId: '1098', amount: currentBid - getIncrementAmount(currentBid) * 2, timeStr: '25 sec ago' }
  ];

  function getIncrementAmount(amount) {
    if (amount < 10000) return 100;
    if (amount < 50000) return 500;
    return 1000;
  }

  // Build UI
  function renderUI() {
    // If ended initially or dynamically changed
    const targetTime = product.endTime;
    
    // Status text based on state
    const subStatus = window.subUtils ? window.subUtils.getSubscriptionStatus() : (localStorage.getItem('subState') || 'NOT_SUBSCRIBED');
    let stateHtml = '';
    if (subStatus === 'SUSPENDED') {
      stateHtml = `<div class="alert alert-danger border-0 py-2 small fw-bold"><i class="bi bi-slash-circle-fill me-1"></i> Your subscription is SUSPENDED. Bidding is disabled per company rules.</div>`;
    } else if (subStatus === 'NOT_SUBSCRIBED') {
      stateHtml = `<div class="alert alert-warning border-0 py-2 small fw-bold"><i class="bi bi-star-fill text-gold me-1"></i> Subscription required to participate in live auctions. <a href="subscription.html" class="text-dark fw-bold text-decoration-underline ms-1">Subscribe Now</a></div>`;
    } else if (bidderState === 'LEADING') {
      stateHtml = `<div class="alert alert-success border-0 py-2 small fw-bold"><i class="bi bi-star-fill me-1"></i> You are currently the highest bidder.</div>`;
    } else if (bidderState === 'OUTBID') {
      stateHtml = `<div class="alert alert-danger border-0 py-2 small fw-bold"><i class="bi bi-exclamation-triangle-fill me-1"></i> Another bidder has placed a higher bid.</div>`;
    } else {
      stateHtml = `<div class="alert alert-secondary border-0 py-2 small"><i class="bi bi-info-circle me-1"></i> Place your first bid to participate.</div>`;
    }

    const html = `
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none text-navy">Home</a></li>
          <li class="breadcrumb-item"><a href="live-auctions.html" class="text-decoration-none text-navy">Live Auctions</a></li>
          <li class="breadcrumb-item active" aria-current="page">${product.name}</li>
        </ol>
      </nav>

      <div class="row g-4">
        <!-- Left: Image Gallery -->
        <div class="col-lg-5">
          <div class="bg-white p-3 rounded-4 border mb-3 text-center position-relative">
            <img src="${product.image}" id="main-product-image" class="img-fluid rounded-3" alt="${product.name}" style="max-height: 400px; object-fit: contain; transition: transform 0.3s ease;">
          </div>
          <div class="row g-2">
            ${product.thumbnailImages.map(img => `
              <div class="col-3">
                <div class="border rounded-3 p-1 cursor-pointer bg-white thumbnail-wrapper" onclick="document.getElementById('main-product-image').src='${img}'">
                  <img src="${img}" class="img-fluid rounded" alt="Thumbnail" style="height: 60px; width: 100%; object-fit: cover; cursor: pointer;">
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Auction Controls -->
        <div class="col-lg-7" id="auction-controls-container">
          <div class="d-flex align-items-center mb-2">
            <span class="live-indicator me-2"></span>
            <span class="text-danger fw-bold text-uppercase tracking-wide">Live Auction</span>
          </div>
          <h1 class="h3 fw-bold text-navy mb-1">${product.name}</h1>
          <p class="text-muted mb-4">${product.brand} | ${product.category}</p>

          <div class="row g-3 mb-4">
            <div class="col-6 col-md-4">
              <div class="text-muted small fw-bold">Market Price</div>
              <div class="fs-5 text-decoration-line-through">${window.utils.formatCurrency(product.marketPrice)}</div>
            </div>
            <div class="col-6 col-md-4">
              <div class="text-muted small fw-bold">Starting Bid</div>
              <div class="fs-5">${window.utils.formatCurrency(product.startingBid)}</div>
            </div>
            <div class="col-12 col-md-4 text-md-end">
              <div class="text-muted small fw-bold">Active Bidders</div>
              <div class="fs-5 text-navy fw-bold"><i class="bi bi-people-fill text-gold"></i> <span id="bidders-count">${product.bidders}</span></div>
            </div>
          </div>

          <!-- Bidding Area & Countdown container -->
          <div id="bidding-core-ui">
            <div class="bg-navy rounded-4 p-4 text-white mb-4 position-relative overflow-hidden shadow-lg">
              <div class="position-relative z-1">
                <div class="row align-items-center mb-4">
                  <div class="col-12 col-md-6 border-md-end border-light border-opacity-25">
                    <div class="text-gold text-uppercase fw-bold small mb-1">Current Highest Bid</div>
                    <div class="display-4 fw-bold mb-0" id="current-highest-bid">${window.utils.formatCurrency(currentBid)}</div>
                  </div>
                  <div class="col-12 col-md-6 text-md-center mt-4 mt-md-0">
                    <div class="text-white-50 text-uppercase fw-bold small mb-2">Auction Ends In</div>
                    <!-- Detailed Timer -->
                    <div class="d-flex justify-content-md-center gap-3 text-center" id="detailed-timer">
                      <div>
                        <div class="fs-2 fw-bold font-monospace bg-white bg-opacity-10 rounded px-2" id="timer-d">00</div>
                        <div class="small text-white-50 mt-1">Days</div>
                      </div>
                      <div class="fs-3 fw-bold">:</div>
                      <div>
                        <div class="fs-2 fw-bold font-monospace bg-white bg-opacity-10 rounded px-2" id="timer-h">00</div>
                        <div class="small text-white-50 mt-1">Hours</div>
                      </div>
                      <div class="fs-3 fw-bold">:</div>
                      <div>
                        <div class="fs-2 fw-bold font-monospace bg-white bg-opacity-10 rounded px-2" id="timer-m">00</div>
                        <div class="small text-white-50 mt-1">Mins</div>
                      </div>
                      <div class="fs-3 fw-bold text-gold">:</div>
                      <div>
                        <div class="fs-2 fw-bold font-monospace bg-white bg-opacity-10 rounded px-2 text-gold" id="timer-s">00</div>
                        <div class="small text-gold mt-1">Secs</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="bidding-action-area" class="bg-white bg-opacity-10 rounded-3 p-3">
                  <div class="text-white-50 small mb-2 d-flex justify-content-between">
                    <span>Your Bid Amount</span>
                    <span>Min next bid: <strong class="text-white" id="min-next-bid-label">${window.utils.formatCurrency(minimumNextBid)}</strong></span>
                  </div>
                  <div class="input-group input-group-lg mb-3">
                    <button class="btn btn-light text-navy fw-bold px-4" type="button" id="btn-decrease-bid"><i class="bi bi-dash-lg"></i></button>
                    <input type="number" class="form-control text-center fw-bold fs-4 bg-white text-navy" id="bid-input-val" value="${userBidInput}" min="${minimumNextBid}" readonly>
                    <button class="btn btn-light text-navy fw-bold px-4" type="button" id="btn-increase-bid"><i class="bi bi-plus-lg"></i></button>
                  </div>
                  <button id="btn-place-bid" class="btn btn-premium w-100 btn-lg fw-bold fs-5 shadow">PLACE BID</button>
                </div>
              </div>
            </div>

            <!-- User State -->
            <div id="user-bidding-state" class="mb-4">
              ${stateHtml}
            </div>
            
            <div id="bid-error-msg" class="text-danger small fw-bold mb-3 d-none"></div>

            <!-- Bid History Panel -->
            <div class="card border-0 shadow-sm rounded-4 mb-4">
              <div class="card-header bg-white border-bottom-0 pt-4 pb-2">
                <h6 class="mb-0 fw-bold text-navy"><i class="bi bi-clock-history me-2"></i>Live Bidding Activity</h6>
              </div>
              <div class="card-body p-0">
                <ul class="list-group list-group-flush bid-history-list" id="bid-history-container">
                  <!-- Rendered dynamically -->
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Ended State Container (Hidden by default) -->
          <div id="ended-state-ui" class="d-none">
             <div class="bg-navy rounded-4 p-5 text-center text-white mb-4 shadow-lg">
                <span class="badge bg-danger rounded-pill px-3 py-2 text-uppercase fw-bold mb-3" style="letter-spacing:1px;">
                  <i class="bi bi-flag-fill me-1"></i> Auction Ended
                </span>
                <h2 class="fw-bold mb-2" style="font-family:var(--font-heading);">AUCTION ENDED</h2>
                <p class="text-white-50 small mb-4">Bidding for this item has officially closed.</p>

                <hr class="border-secondary opacity-25 my-4">
                
                <div class="row g-3 mb-4">
                  <div class="col-6 text-center text-md-start">
                    <div class="text-white-50 text-uppercase small fw-bold mb-1">Highest Bidder / Winner</div>
                    <div class="fs-5 text-white fw-bold" id="winner-name"><i class="bi bi-person-check-fill text-gold me-1"></i> Bidder #2456</div>
                  </div>
                  <div class="col-6 text-center text-md-end">
                    <div class="text-white-50 text-uppercase small fw-bold mb-1">Winning Bid Amount</div>
                    <div class="fs-3 fw-bold text-gold" id="winner-bid">₹0</div>
                  </div>
                </div>

                <!-- Payment Deadline Section -->
                <div class="bg-white bg-opacity-10 rounded-3 p-4 mb-4 text-start">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-white fw-bold"><i class="bi bi-clock-history text-gold me-2"></i>Payment Deadline</span>
                    <span class="badge bg-warning text-dark fw-bold">Action Required</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-white-50 small">Time remaining to complete payment:</span>
                    <span class="fs-4 font-monospace text-gold fw-bold" id="payment-deadline-timer">23:59:59</span>
                  </div>
                </div>

                <!-- Pay Now Button -->
                <a href="payment-status.html?id=${product.id}" class="btn btn-premium btn-lg w-100 fw-bold py-3 mb-3 shadow" id="btn-pay-now">
                  <i class="bi bi-credit-card-2-front me-2"></i>PAY NOW
                </a>
                
                <a href="auction-result.html?id=${product.id}" class="btn btn-outline-light w-100 py-2">
                  <i class="bi bi-trophy me-1"></i> VIEW AUCTION RESULT
                </a>
             </div>
             
             <!-- Next Highest Fallback UI -->
             <div class="alert alert-warning border-warning border-opacity-50 bg-light rounded-4 p-4 shadow-sm">
                <h6 class="fw-bold text-dark"><i class="bi bi-exclamation-circle-fill text-warning me-2"></i>WINNER PAYMENT NOT COMPLETED</h6>
                <p class="small text-muted mb-3">If the highest bidder fails to pay within the deadline, the product will be offered to the next highest eligible bidder according to company rules.</p>
                <div class="d-flex justify-content-between align-items-center bg-white p-2 rounded border">
                  <div>
                    <span class="small text-muted d-block">Next Eligible Bidder</span>
                    <strong class="text-navy" id="fallback-bidder">Bidder #7821</strong>
                  </div>
                  <div class="text-end">
                    <span class="small text-muted d-block">Bid Amount</span>
                    <strong class="text-navy" id="fallback-amount">₹0</strong>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>

      <!-- Product Details Tabs -->
      <div class="row mt-5">
        <div class="col-12">
          <ul class="nav nav-tabs mb-4" id="productTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active fw-semibold text-navy" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" type="button" role="tab">Overview</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-semibold text-navy" id="features-tab" data-bs-toggle="tab" data-bs-target="#features" type="button" role="tab">Features & Specs</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-semibold text-navy" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab">Auction Info</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-semibold text-navy" id="terms-tab" data-bs-toggle="tab" data-bs-target="#terms" type="button" role="tab">Terms</button>
            </li>
          </ul>
          <div class="tab-content p-3 bg-white border rounded-bottom" id="productTabsContent">
            <div class="tab-pane fade show active" id="desc" role="tabpanel">
              <p class="fs-5 text-navy fw-semibold">${product.shortDescription}</p>
              <p class="text-muted">${product.description}</p>
            </div>
            <div class="tab-pane fade" id="features" role="tabpanel">
              <ul class="list-group list-group-flush mb-3">
                ${product.features.map(f => `<li class="list-group-item px-0 border-0"><i class="bi bi-check2 text-primary me-2"></i> ${f}</li>`).join('')}
              </ul>
            </div>
            <div class="tab-pane fade" id="info" role="tabpanel">
              <table class="table table-sm table-borderless">
                <tbody>
                  <tr><th class="text-muted w-25">Auction Start</th><td>${new Date(product.startTime).toLocaleString()}</td></tr>
                  <tr><th class="text-muted w-25">Auction End</th><td>${new Date(product.endTime).toLocaleString()}</td></tr>
                  <tr><th class="text-muted w-25">Starting Bid</th><td>${window.utils.formatCurrency(product.startingBid)}</td></tr>
                  <tr><th class="text-muted w-25">Seller</th><td>${product.sellerName}</td></tr>
                </tbody>
              </table>
            </div>
            <div class="tab-pane fade" id="terms" role="tabpanel">
              <ul class="text-muted small ps-3 lh-lg mb-0">
                <li>Technical problems may cause the auction to be stopped.</li>
                <li>Auction may be rescheduled if interrupted.</li>
                <li>Highest bidder must complete payment within the specified deadline.</li>
                <li>If payment is not completed, the product may be offered to the next eligible highest bidder.</li>
                <li>Auction may be cancelled or rescheduled if no eligible bidder completes payment.</li>
                <li>Company may make the final decision in cases of technical issues, payment failures or unforeseen problems.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    
    // Initial Render of dynamic components
    renderBidHistory();
    attachEventListeners();
    
    // Start specific timer
    if (!isEnded) {
      startAuctionTimer(targetTime);
    } else {
      transitionToEndedState();
    }
  }

  function renderBidHistory() {
    const list = document.getElementById('bid-history-container');
    if (!list) return;

    list.innerHTML = bidHistory.map((b, i) => `
      <li class="list-group-item d-flex justify-content-between align-items-center px-4 py-3 border-start-0 border-end-0 ${i === 0 ? 'bg-light bg-opacity-50' : ''}">
        <div>
          <span class="fw-bold text-navy d-block">Bidder #${b.bidderId} ${i === 0 ? '<span class="badge bg-gold text-navy ms-1 small">Highest</span>' : ''}</span>
          <small class="text-muted">${b.timeStr}</small>
        </div>
        <div class="fw-bold fs-5 text-navy">${window.utils.formatCurrency(b.amount)}</div>
      </li>
    `).join('');
  }

  function attachEventListeners() {
    const btnInc = document.getElementById('btn-increase-bid');
    const btnDec = document.getElementById('btn-decrease-bid');
    const btnPlace = document.getElementById('btn-place-bid');
    const inputVal = document.getElementById('bid-input-val');
    const errorMsg = document.getElementById('bid-error-msg');

    if (btnInc) {
      btnInc.addEventListener('click', () => {
        userBidInput += getIncrementAmount(currentBid);
        inputVal.value = userBidInput;
        errorMsg.classList.add('d-none');
      });
    }

    if (btnDec) {
      btnDec.addEventListener('click', () => {
        if (userBidInput - getIncrementAmount(currentBid) >= minimumNextBid) {
          userBidInput -= getIncrementAmount(currentBid);
          inputVal.value = userBidInput;
          errorMsg.classList.add('d-none');
        } else {
           errorMsg.textContent = "Your bid must be higher than the current highest bid.";
           errorMsg.classList.remove('d-none');
        }
      });
    }

    if (btnPlace) {
      btnPlace.addEventListener('click', () => {
        validateAndPlaceBid();
      });
    }
  }

  function validateAndPlaceBid() {
    const errorMsg = document.getElementById('bid-error-msg');
    
    const subStatus = window.subUtils ? window.subUtils.getSubscriptionStatus() : (localStorage.getItem('subState') || 'NOT_SUBSCRIBED');
    if (subStatus === 'SUSPENDED') {
      errorMsg.textContent = "Your subscription is SUSPENDED due to company rules or payment failures. Bidding disabled.";
      errorMsg.classList.remove('d-none');
      showToast("Subscription Suspended: Bidding Disabled.", 'danger');
      return;
    }

    if (subStatus === 'NOT_SUBSCRIBED') {
      errorMsg.textContent = "An active subscription is required to participate in live auctions. Please subscribe.";
      errorMsg.classList.remove('d-none');
      showToast("Subscription required to place bids.", 'warning');
      return;
    }

    if (userBidInput < minimumNextBid) {
      errorMsg.textContent = "Your bid must be higher than the current highest bid.";
      errorMsg.classList.remove('d-none');
      showToast("Please enter a valid bid amount.", 'danger');
      return;
    }

    errorMsg.classList.add('d-none');
    
    // Success flow
    updateCurrentBid(userBidInput);
    addBidHistory(userBidInput);
    updateBidderStatus('LEADING');
    
    // Increment bidders artificially
    const countEl = document.getElementById('bidders-count');
    if (countEl) countEl.textContent = parseInt(countEl.textContent) + 1;

    showToast(`Bid placed successfully! Your bid: ${window.utils.formatCurrency(userBidInput)}`, 'success');
  }

  function updateCurrentBid(amount) {
    currentBid = amount;
    minimumNextBid = currentBid + getIncrementAmount(currentBid);
    userBidInput = minimumNextBid;

    // Update UI
    document.getElementById('current-highest-bid').textContent = window.utils.formatCurrency(currentBid);
    document.getElementById('min-next-bid-label').textContent = window.utils.formatCurrency(minimumNextBid);
    document.getElementById('bid-input-val').value = userBidInput;
    document.getElementById('bid-input-val').min = minimumNextBid;
  }

  function addBidHistory(amount) {
    const currentUserId = localStorage.getItem('userId') || 'CUST-2456';
    
    bidHistory.unshift({
      bidderId: currentUserId + ' (You)',
      amount: amount,
      timeStr: 'Just now'
    });

    if (bidHistory.length > 1 && bidHistory[1].timeStr === 'Just now') {
      bidHistory[1].timeStr = 'Few seconds ago';
    }

    // Save bid to customer-specific localStorage storage
    const customerBidsKey = `bids_${currentUserId}`;
    let userBids = [];
    try {
      userBids = JSON.parse(localStorage.getItem(customerBidsKey)) || [];
    } catch (e) {
      userBids = [];
    }

    const newBidRecord = {
      id: 'BID-' + Date.now(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      bidAmount: amount,
      bidTime: new Date().toISOString(),
      timeStr: 'Just now',
      status: 'LEADING',
      currentBid: amount
    };

    // Remove older bid for same product if exists, or append
    userBids = userBids.filter(b => b.productId !== product.id);
    userBids.unshift(newBidRecord);
    localStorage.setItem(customerBidsKey, JSON.stringify(userBids));

    renderBidHistory();
  }

  function updateBidderStatus(state) {
    bidderState = state;
    const container = document.getElementById('user-bidding-state');
    if (!container) return;

    if (state === 'LEADING') {
      container.innerHTML = `<div class="alert alert-success border-0 py-2 small fw-bold shadow-sm animated-highlight"><i class="bi bi-star-fill me-1"></i> You are currently the highest bidder.</div>`;
    }
  }

  let timerInterval;
  function startAuctionTimer(endTime) {
    const dEl = document.getElementById('timer-d');
    const hEl = document.getElementById('timer-h');
    const mEl = document.getElementById('timer-m');
    const sEl = document.getElementById('timer-s');

    if (!dEl) return;

    timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timerInterval);
        transitionToEndedState();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const pad = (n) => n.toString().padStart(2, '0');

      dEl.textContent = pad(days);
      hEl.textContent = pad(hours);
      mEl.textContent = pad(minutes);
      sEl.textContent = pad(seconds);
    }, 1000);
  }

  function transitionToEndedState() {
    isEnded = true;
    
    const coreUI = document.getElementById('bidding-core-ui');
    const endedUI = document.getElementById('ended-state-ui');
    
    if (coreUI) coreUI.classList.add('d-none');
    if (endedUI) {
      endedUI.classList.remove('d-none');
      
      // Populate Winner Data based on final state
      document.getElementById('winner-bid').textContent = window.utils.formatCurrency(currentBid);
      document.getElementById('winner-name').textContent = bidHistory[0].bidderId;
      
      if (bidHistory.length > 1) {
        document.getElementById('fallback-bidder').textContent = 'Bidder #' + bidHistory[1].bidderId;
        document.getElementById('fallback-amount').textContent = window.utils.formatCurrency(bidHistory[1].amount);
      }

      // Start 24h Payment Deadline Countdown Timer
      startPaymentDeadlineTimer();
    }
  }

  function startPaymentDeadlineTimer() {
    const deadlineEl = document.getElementById('payment-deadline-timer');
    if (!deadlineEl) return;
    
    // Set 24 hours deadline from now for demo
    const deadlineTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const pInterval = setInterval(() => {
      const now = new Date().getTime();
      const dist = deadlineTime - now;
      if (dist <= 0) {
        clearInterval(pInterval);
        deadlineEl.textContent = "00:00:00 (EXPIRED)";
        return;
      }
      const hrs = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      const mins = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const secs = Math.floor((dist % (1000 * 60)) / 1000).toString().padStart(2, '0');
      deadlineEl.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

  function showToast(message, type = 'success') {
    // Create toast container if not exists
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1055';
      document.body.appendChild(toastContainer);
    }

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0 mb-2`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body fw-semibold">
          <i class="bi ${icon} me-2"></i> ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    
    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }

  // Start execution
  renderUI();
});
