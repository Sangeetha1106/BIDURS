/**
 * Main logic for rendering product grids on listing pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('products-grid');
  
  if (!gridContainer || !window.mockProductsData) return;

  // Read initial configuration from data attributes on the body/container
  const pageType = document.body.getAttribute('data-page-type') || 'all'; 
  
  if (pageType === 'live') {
    window.filterUtils.FilterState.status = 'LIVE'; // LIVE also includes ENDING SOON in our filter logic
  } else if (pageType === 'upcoming') {
    window.filterUtils.FilterState.status = 'UPCOMING';
  }

  // DOM Elements for filters
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const statusFilter = document.getElementById('status-filter');
  const sortFilter = document.getElementById('sort-filter');
  const countEl = document.getElementById('product-count');
  const clearBtn = document.getElementById('clear-filters-btn');

  function renderGrid() {
    const searchQuery = window.filterUtils.FilterState.searchQuery || '';

    // Search-first behavior for All Products page
    if (pageType === 'all' && searchQuery.trim() === '') {
      if (countEl) countEl.textContent = '';
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
          <h4>Search for a product to get started</h4>
        </div>
      `;
      return;
    }

    const filtered = window.filterUtils.applyFilters(window.mockProductsData, window.filterUtils.FilterState);
    
    if (countEl) {
      countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
          <h4>No products found</h4>
          <p class="text-muted">Try searching with a different product name or brand.</p>
          <button class="btn btn-outline-premium mt-3" onclick="resetFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map(p => {
      const isUpcoming = p.status === 'UPCOMING';
      const isEnded = p.status === 'ENDED';
      const targetTime = isUpcoming ? p.startTime : p.endTime;
      
      const priceLabel = isUpcoming ? 'Starting Bid' : 'Current Bid';
      const priceValue = isUpcoming ? p.startingBid : p.currentBid;
      
      return `
        <div class="col-12 col-md-6 col-lg-3 mb-4">
          <div class="product-card">
            <div class="product-img-wrapper">
              ${window.utils.getStatusBadge(p.status)}
              <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-details">
              <div class="product-meta">
                <span>${p.category}</span>
                ${!isEnded ? `
                  <span class="${isUpcoming ? 'text-primary' : 'text-danger'} fw-bold" style="font-size:0.8rem;">
                    <i class="bi ${isUpcoming ? 'bi-calendar-event' : 'bi-clock'}"></i> 
                    <span data-countdown="${targetTime}" data-status="${p.status}">Loading...</span>
                  </span>
                ` : '<span class="text-muted fw-bold">Ended</span>'}
              </div>
              <h3 class="product-title" style="font-size:1rem;">${p.name}</h3>
              <div class="d-flex justify-content-between align-items-end mt-auto pt-3">
                <div>
                  <div class="text-muted small text-decoration-line-through">Retail: ${window.utils.formatCurrency(p.marketPrice)}</div>
                  <div class="text-muted small">${priceLabel}</div>
                  <div class="bid-price">${window.utils.formatCurrency(priceValue)}</div>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-2">
                 <div class="text-muted small">
                  <i class="bi bi-people-fill"></i> ${p.bidders} Bidders
                 </div>
                 <a href="${(p.status === 'LIVE' || p.status === 'ENDING SOON') ? 'live-auction.html' : 'product-details.html'}?id=${p.id}" class="btn btn-premium btn-sm">${(p.status === 'LIVE' || p.status === 'ENDING SOON') ? 'View Auction' : 'View Details'}</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Re-initialize timers for newly rendered elements
    if (window.timerUtils) {
      // Clear previous interval if needed, or just let it handle elements dynamically
      // A more robust timer.js would track the interval. Here we just re-call it.
      // We will modify timer.js to run once globally, but since we recreate DOM, 
      // the global interval will just pick up new elements on next tick.
    }
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      window.filterUtils.FilterState.searchQuery = e.target.value;
      renderGrid();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      window.filterUtils.FilterState.category = e.target.value;
      renderGrid();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      window.filterUtils.FilterState.status = e.target.value;
      renderGrid();
    });
  }

  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      window.filterUtils.FilterState.sortBy = e.target.value;
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
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'All';
    if (sortFilter) sortFilter.value = 'Newest';
    
    renderGrid();
  };

  // Initial Render
  renderGrid();
  if (window.timerUtils) {
    window.timerUtils.initTimers();
  }
});
