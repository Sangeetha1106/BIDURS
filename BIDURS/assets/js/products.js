/**
 * Main logic for rendering product grids on listing pages.
 */

function initProductsPage() {
  const gridContainer = document.getElementById('products-grid');
  
  if (!gridContainer) return;

  // Centralized dataset fallback
  const products = (window.mockProductsData && window.mockProductsData.length) ? window.mockProductsData : [];

  // Read initial configuration from data attributes on body
  const pageType = document.body.getAttribute('data-page-type') || 'all'; 

  // Parse URL parameters (e.g. ?category=Mobiles&status=LIVE&search=iphone)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const statusParam = urlParams.get('status');
  const searchParam = urlParams.get('search');

  // Display all 15 products automatically on initial load
  let visibleCount = 15;

  // Ensure filterUtils exists
  if (!window.filterUtils) {
    window.filterUtils = {
      FilterState: { searchQuery: '', category: 'All', status: 'All', sortBy: 'Newest' },
      applyFilters: (list, state) => list
    };
  }

  // Reset & sync FilterState for the current page
  window.filterUtils.FilterState = {
    searchQuery: searchParam || '',
    category: categoryParam || 'All',
    status: pageType === 'live' ? 'LIVE' : (pageType === 'upcoming' ? 'UPCOMING' : (statusParam || 'All')),
    sortBy: 'Newest'
  };

  // DOM Elements for filters & pagination
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const statusFilter = document.getElementById('status-filter');
  const sortFilter = document.getElementById('sort-filter');
  const sortFilterRight = document.getElementById('sort-filter-right');
  const countEl = document.getElementById('product-count');
  const clearBtn = document.getElementById('clear-filters-btn');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadMoreContainer = document.getElementById('load-more-container');

  // Sync DOM form controls with FilterState
  if (searchInput) searchInput.value = window.filterUtils.FilterState.searchQuery;
  if (categoryFilter) categoryFilter.value = window.filterUtils.FilterState.category;
  if (statusFilter && pageType === 'all') statusFilter.value = window.filterUtils.FilterState.status;
  if (sortFilter) sortFilter.value = window.filterUtils.FilterState.sortBy;
  if (sortFilterRight) sortFilterRight.value = window.filterUtils.FilterState.sortBy;

  function renderGrid() {
    const activeProducts = (window.mockProductsData && window.mockProductsData.length) ? window.mockProductsData : products;
    const filtered = window.filterUtils.applyFilters(activeProducts, window.filterUtils.FilterState);
    
    if (countEl) {
      countEl.textContent = `${filtered.length} ${pageType === 'live' ? 'Live ' : ''}Auctions Available`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
          <h4 class="text-navy fw-bold">No products found</h4>
          <p class="text-muted">Try adjusting your filters or search criteria.</p>
          <button class="btn btn-outline-premium mt-3" onclick="resetFilters()">Clear Filters</button>
        </div>
      `;
      if (loadMoreContainer) loadMoreContainer.classList.add('d-none');
      return;
    }

    const itemsToDisplay = filtered.slice(0, visibleCount);

    const isPagesSubdir = window.location.pathname.includes('/pages/');
    const fallbackImg = isPagesSubdir ? '../assets/images/image.png' : 'assets/images/image.png';

    gridContainer.innerHTML = itemsToDisplay.map(p => {
      const isUpcoming = p.status === 'UPCOMING';
      const isEnded = p.status === 'ENDED';
      const isLive = p.status === 'LIVE' || p.status === 'ENDING SOON';
      const targetTime = isUpcoming ? p.startTime : p.endTime;
      
      const priceLabel = isUpcoming ? 'Starting Bid' : 'Current Bid';
      const priceValue = isUpcoming ? p.startingBid : (p.currentBid || p.startingBid);
      const topBidderName = p.highestBidder || 'No bids yet';

      let primaryActionBtn = '';
      if (isLive) {
        primaryActionBtn = `<button class="btn btn-premium flex-fill fw-bold" onclick="window.location.href='live-auction.html?id=${p.id}'"><i class="bi bi-broadcast me-1"></i> Join Auction</button>`;
      } else if (isUpcoming) {
        const timeFormatted = window.auctionEngine ? window.auctionEngine.formatAuctionTime(p.startTime) : 'Soon';
        primaryActionBtn = `<button class="btn btn-outline-royal flex-fill" onclick="window.location.href='product-details.html?id=${p.id}'"><i class="bi bi-clock me-1"></i> Starts ${timeFormatted}</button>`;
      } else {
        primaryActionBtn = `<button class="btn btn-secondary flex-fill disabled" disabled>Ended</button>`;
      }

      let badgeClass = 'badge-closed';
      if (p.status === 'LIVE') badgeClass = 'badge-live bg-danger text-white border-0';
      if (p.status === 'UPCOMING') badgeClass = 'badge-upcoming bg-warning text-dark border-0';
      if (p.status === 'ENDING SOON') badgeClass = 'badge-ending text-white border-0';

      const timerIconClass = isUpcoming ? 'bi-calendar-event' : 'bi-clock-fill';
      const timerColorClass = isUpcoming ? 'text-navy' : (isEnded ? 'text-muted' : 'text-danger');

      return `
        <div class="col-12 col-md-6 col-xl-4 mb-4">
          <div class="product-card" style="background:#FFFFFF !important; border:1.5px solid var(--border-light); border-radius:16px;">
            <div class="product-img-wrapper" style="height:210px; background:#F8FCFF;">
              <span class="auction-badge ${badgeClass}">${p.status}</span>
              <button class="wishlist-icon" aria-label="Add to watchlist"><i class="bi bi-heart"></i></button>
              <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}';">
            </div>
            <div class="product-details p-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="badge bg-light text-navy border fw-semibold" style="font-size:0.75rem;">${p.brand}</span>
                <span class="fw-semibold text-royal small"><i class="bi bi-tag-fill me-1"></i> ${p.category}</span>
              </div>

              <h5 class="product-title text-navy text-truncate fw-bold mb-1" title="${p.name}">${p.name}</h5>
              <p class="text-muted small text-truncate mb-2" style="font-size:0.82rem;">${p.shortDescription || ''}</p>
              
              <!-- Bidder Information Bar -->
              <div class="d-flex justify-content-between align-items-center mb-2 px-2 py-1 rounded bg-light border border-subtle small">
                <span class="text-navy fw-bold"><i class="bi bi-people-fill text-warning me-1"></i> ${p.bidders || 0} Bidders</span>
                <span class="text-muted text-truncate" style="max-width:130px;">Highest: <strong class="text-navy">${topBidderName}</strong></span>
              </div>
              
              <!-- Dynamic Timer -->
              <div class="mb-3 d-flex align-items-center ${timerColorClass} bg-light px-3 py-1.5 rounded-3 border">
                <i class="bi ${timerIconClass} me-2 fs-6"></i>
                <div class="small fw-bold text-navy">
                  ${!isEnded ? `
                    ${isUpcoming ? 'Starts in: ' : 'Ends in: '}
                    <span data-countdown="${targetTime}" data-status="${p.status}" class="font-monospace text-danger fs-6 fw-bold">Loading...</span>
                  ` : '<span class="text-muted">Auction Ended</span>'}
                </div>
              </div>

              <!-- Price Section -->
              <div class="d-flex justify-content-between align-items-end mt-auto pt-2 border-top mb-3">
                <div>
                  <div class="small text-muted mb-0 fw-semibold">${priceLabel}</div>
                  <div class="bid-price fs-4 fw-bold text-royal">₹${priceValue.toLocaleString('en-IN')}</div>
                </div>
                <div class="text-end">
                  <div class="small text-muted mb-0">Market Price</div>
                  <div class="text-muted text-decoration-line-through small">₹${p.marketPrice.toLocaleString('en-IN')}</div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="d-flex gap-2">
                <button class="btn btn-outline-premium flex-fill py-2" onclick="window.location.href='product-details.html?id=${p.id}'">View Details</button>
                ${primaryActionBtn}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Manage Load More button visibility
    if (loadMoreContainer) {
      if (filtered.length > visibleCount) {
        loadMoreContainer.classList.remove('d-none');
      } else {
        loadMoreContainer.classList.add('d-none');
      }
    }

    // Re-initialize timers for newly rendered elements
    if (window.timerUtils) {
      window.timerUtils.initTimers();
    }
  }

  // Load More Button Event Handler
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 6;
      renderGrid();
    });
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      window.filterUtils.FilterState.searchQuery = e.target.value;
      visibleCount = 15;
      renderGrid();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      window.filterUtils.FilterState.category = e.target.value;
      visibleCount = 15;
      renderGrid();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      window.filterUtils.FilterState.status = e.target.value;
      visibleCount = 15;
      renderGrid();
    });
  }

  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      window.filterUtils.FilterState.sortBy = e.target.value;
      if (sortFilterRight) sortFilterRight.value = e.target.value;
      renderGrid();
    });
  }
  
  if (sortFilterRight) {
    sortFilterRight.addEventListener('change', (e) => {
      window.filterUtils.FilterState.sortBy = e.target.value;
      if (sortFilter) sortFilter.value = e.target.value;
      renderGrid();
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', resetFilters);
  }

  window.resetFilters = function() {
    window.filterUtils.FilterState.searchQuery = '';
    window.filterUtils.FilterState.category = 'All';
    if (pageType === 'all') {
      window.filterUtils.FilterState.status = 'All';
      if (statusFilter) statusFilter.value = 'All';
    }
    window.filterUtils.FilterState.sortBy = 'Newest';
    visibleCount = 15;
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'All';
    if (sortFilter) sortFilter.value = 'Newest';
    if (sortFilterRight) sortFilterRight.value = 'Newest';
    
    renderGrid();
  };

  // Initial Render
  renderGrid();
  if (window.timerUtils) {
    window.timerUtils.initTimers();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductsPage);
} else {
  initProductsPage();
}
