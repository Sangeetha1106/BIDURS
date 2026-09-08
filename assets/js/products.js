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
  const sortFilterRight = document.getElementById('sort-filter-right');
  const countEl = document.getElementById('product-count');
  const clearBtn = document.getElementById('clear-filters-btn');

  function renderGrid() {
    const filtered = window.filterUtils.applyFilters(window.mockProductsData, window.filterUtils.FilterState);
    
    if (countEl) {
      countEl.textContent = `${filtered.length} products found`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
          <h4>No products found</h4>
          <p class="text-muted">Try changing your filters or search criteria.</p>
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
      const primaryAction = isUpcoming ? 'Place Bid' : 'Join Auction';
      
      let badgeClass = 'badge-closed';
      if (p.status === 'LIVE') badgeClass = 'badge-live bg-danger text-white border-0';
      if (p.status === 'UPCOMING') badgeClass = 'badge-upcoming bg-warning text-dark border-0';
      if (p.status === 'ENDING SOON') badgeClass = 'badge-ending text-white border-0';

      let catIcon = 'bi-box';
      if (p.category === 'Mobiles') catIcon = 'bi-phone';
      if (p.category === 'Laptops') catIcon = 'bi-laptop';
      if (p.category === 'Cameras') catIcon = 'bi-camera';
      if (p.category === 'Gaming') catIcon = 'bi-controller';
      if (p.category === 'Tablets') catIcon = 'bi-tablet';
      if (p.category === 'Accessories') catIcon = 'bi-headphones';
      if (p.category === 'Smart Watches') catIcon = 'bi-smartwatch';
      
      const timerIconClass = isUpcoming ? 'bi-calendar-event' : 'bi-clock';
      const timerColorClass = isUpcoming ? 'text-secondary' : 'text-danger';

      return `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 d-flex align-items-stretch">
          <div class="product-card w-100 border rounded-3 bg-white d-flex flex-column" style="overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s;">
            <div class="product-img-wrapper position-relative bg-light" style="height: 200px; display: flex; align-items: center; justify-content: center; padding: 1rem;">
              <span class="badge ${badgeClass} position-absolute" style="top: 12px; left: 12px; font-size: 0.75rem; padding: 0.4rem 0.6rem; border-radius: 4px;">${p.status}</span>
              <button class="wishlist-icon position-absolute bg-transparent border-0 text-muted" title="Add to Wishlist" style="top: 12px; right: 12px; font-size: 1.2rem;"><i class="bi bi-heart"></i></button>
              <img src="${p.image}" alt="${p.name}" style="object-fit: contain; width: 100%; height: 100%;">
            </div>
            <div class="product-details d-flex flex-column p-3 flex-grow-1">
              <h3 class="product-title text-truncate fw-bold text-dark mb-1" title="${p.name}" style="font-size:1rem;">${p.name}</h3>
              <div class="product-meta mb-3 text-muted" style="font-size:0.85rem;">
                <span><i class="bi ${catIcon} me-1"></i> ${p.category}</span>
              </div>
              
              <div class="mb-1 text-muted small">
                Market Price: <span class="text-decoration-line-through">${window.utils.formatCurrency(p.marketPrice)}</span>
              </div>
              <div class="mb-3 small">
                ${priceLabel}: <span class="fw-bold text-primary" style="font-size:1.1rem;">${window.utils.formatCurrency(priceValue)}</span>
              </div>
              
              <div class="mb-4">
                ${!isEnded ? `
                  <span class="fw-bold small ${timerColorClass}">
                    <i class="bi ${timerIconClass} me-1"></i> 
                    ${isUpcoming ? 'Starts on: ' : 'Ends in: '}
                    <span data-countdown="${targetTime}" data-status="${p.status}">Loading...</span>
                  </span>
                ` : '<span class="text-muted fw-bold small"><i class="bi bi-clock-history me-1"></i> Ended</span>'}
              </div>
              
              <div class="d-flex gap-2 mt-auto pt-2">
                 <a href="product-details.html?id=${p.id}" class="btn btn-outline-primary btn-sm flex-fill fw-semibold py-2">View Details</a>
                 <a href="product-details.html?id=${p.id}" class="btn btn-primary btn-sm flex-fill fw-semibold py-2 ${isEnded ? 'disabled' : ''}">${primaryAction}</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Re-initialize timers for newly rendered elements
    if (window.timerUtils) {
      window.timerUtils.initTimers();
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
});
