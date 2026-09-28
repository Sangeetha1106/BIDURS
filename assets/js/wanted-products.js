document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wanted-list-container');
  if (!container) return; // Only run on wanted products page

  const searchInput = document.getElementById('wp-search-input');
  const categoryFilter = document.getElementById('wp-category-filter');
  const statusFilter = document.getElementById('wp-status-filter');
  const sortFilter = document.getElementById('wp-sort-filter');
  const filterBtn = document.getElementById('wp-filter-btn');
  const clearBtn = document.getElementById('wp-clear-btn');
  const form = document.getElementById('wanted-form');
  const activeCategoryBadge = document.getElementById('active-category-badge');
  const selectedCategoryName = document.getElementById('selected-category-name');
  const clearCategoryBadgeBtn = document.getElementById('clear-category-badge-btn');

  // Category normalizer to map category strings flexibly
  function matchCategory(catInput) {
    if (!catInput) return 'All Categories';
    const c = catInput.trim().toLowerCase();
    if (c === 'mobiles' || c === 'mobile' || c === 'mobile phones') return 'Mobiles';
    if (c === 'laptops' || c === 'laptop') return 'Laptops';
    if (c === 'electronics' || c === 'electronic' || c === 'cameras' || c === 'tablets') return 'Electronics';
    if (c === 'gaming' || c === 'games') return 'Gaming';
    if (c === 'wearables' || c === 'wearable' || c === 'smart devices') return 'Wearables';
    if (c === 'accessories' || c === 'accessory') return 'Accessories';
    return 'All Categories';
  }

  // URL query parameter reader
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Helper to parse pseudo dates for sorting
  function getTimestamp(p) {
    if (p.requestedDate === 'Today') return Date.now();
    if (p.requestedDate === 'Yesterday') return Date.now() - 86400000;
    const t = Date.parse(p.requestedDate);
    return isNaN(t) ? p.id : t;
  }

  // Load custom products from localStorage, combined with mock data
  function getAllWantedProducts() {
    const custom = JSON.parse(localStorage.getItem('customWantedProducts') || '[]');
    return [...custom, ...(window.wantedProductsData || [])];
  }

  const wpCategoryCardsContainer = document.getElementById('wp-category-cards-container');

  const mockCategoriesList = [
    { id: 'c1', name: 'Mobiles', icon: 'bi-phone' },
    { id: 'c2', name: 'Laptops', icon: 'bi-laptop' },
    { id: 'c3', name: 'Electronics', icon: 'bi-camera' },
    { id: 'c4', name: 'Gaming', icon: 'bi-controller' },
    { id: 'c5', name: 'Wearables', icon: 'bi-smartwatch' },
    { id: 'c6', name: 'Accessories', icon: 'bi-headphones' }
  ];

  function renderCategoryCards(activeCat) {
    if (!wpCategoryCardsContainer) return;
    const allWanted = getAllWantedProducts();

    function getCategoryCount(catName) {
      const c = catName.toLowerCase();
      return allWanted.filter(p => {
        const pCat = p.category ? p.category.toLowerCase() : '';
        if (c === 'mobiles') return pCat.includes('mobile');
        if (c === 'laptops') return pCat.includes('laptop');
        if (c === 'electronics') return pCat.includes('electronic') || pCat.includes('camera') || pCat.includes('tablet');
        if (c === 'gaming') return pCat.includes('gaming') || pCat.includes('game');
        if (c === 'wearables') return pCat.includes('wearable') || pCat.includes('smart') || pCat.includes('watch');
        if (c === 'accessories') return pCat.includes('accessory') || pCat.includes('accessories');
        return pCat === c;
      }).length;
    }

    const currentNormalized = matchCategory(activeCat);

    const html = mockCategoriesList.map(category => {
      const count = getCategoryCount(category.name);
      const isActive = currentNormalized === category.name;
      const activeStyle = isActive 
        ? 'border-color: #0052CC !important; box-shadow: 0 8px 24px rgba(0, 82, 204, 0.2) !important; background: #F0F7FF !important;' 
        : '';
      const iconStyle = isActive ? 'color: #D4AF37 !important;' : '';

      return `
        <div class="col-6 col-md-4 col-lg-2">
          <div class="category-card wp-cat-card ${isActive ? 'active' : ''}" data-category="${category.name}" style="${activeStyle}">
            <i class="bi ${category.icon} category-icon" style="${iconStyle}"></i>
            <h4 class="category-title mb-1">${category.name}</h4>
            <span class="badge bg-light text-navy border font-monospace mt-1" style="font-size:0.7rem; font-weight:600;">
              <i class="bi bi-box-seam me-1 text-primary"></i>${count} Request${count !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      `;
    }).join('');

    wpCategoryCardsContainer.innerHTML = html;

    wpCategoryCardsContainer.querySelectorAll('.wp-cat-card').forEach(card => {
      card.addEventListener('click', () => {
        const selectedCat = card.getAttribute('data-category');
        const targetCat = (matchCategory(categoryFilter ? categoryFilter.value : '') === selectedCat) ? 'All Categories' : selectedCat;
        if (categoryFilter) categoryFilter.value = targetCat;
        renderGrid({
          searchQuery: searchInput ? searchInput.value : '',
          category: targetCat,
          status: statusFilter ? statusFilter.value : 'All Statuses',
          sortBy: sortFilter ? sortFilter.value : 'Newest First'
        });
      });
    });
  }

  function updateCategoryBadge(cat) {
    const normalized = matchCategory(cat);
    if (activeCategoryBadge && selectedCategoryName) {
      if (normalized !== 'All Categories') {
        selectedCategoryName.textContent = normalized;
        activeCategoryBadge.classList.remove('d-none');
      } else {
        activeCategoryBadge.classList.add('d-none');
      }
    }
  }

  function renderGrid(filters = {}) {
    renderCategoryCards(filters.category);

    const normalizedCategory = matchCategory(filters.category);
    const hasSearch = filters.searchQuery && filters.searchQuery.trim().length > 0;

    // If no specific category selected and no search term entered, prompt user to pick a category
    if (normalizedCategory === 'All Categories' && !hasSearch) {
      updateCategoryBadge('All Categories');
      container.innerHTML = `
        <div class="col-12 text-center py-5 my-2">
          <div class="bg-white p-5 rounded-4 shadow-sm border" style="max-width: 620px; margin: 0 auto;">
            <i class="bi bi-hand-index-thumb fs-1 text-primary mb-3 d-block"></i>
            <h4 class="fw-bold text-navy mb-2">Select a Category Above</h4>
            <p class="text-muted mb-0">Click any category card above (Mobiles, Laptops, Electronics, Gaming, Wearables, Accessories) to view customer requested products for that category.</p>
          </div>
        </div>
      `;
      return;
    }

    let result = getAllWantedProducts();

    // 1. Filter by Search
    if (hasSearch) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.productName.toLowerCase().includes(q) || 
        (p.brand && p.brand.toLowerCase().includes(q)) || 
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Filter by Category
    if (normalizedCategory !== 'All Categories') {
      result = result.filter(p => matchCategory(p.category) === normalizedCategory);
    }

    updateCategoryBadge(filters.category);

    // 3. Filter by Status
    if (filters.status && filters.status !== 'All Statuses') {
      result = result.filter(p => p.status === filters.status);
    }

    // 4. Sort
    if (filters.sortBy) {
      result.sort((a, b) => {
        const budgetA = a.maxBudget || a.budget || 0;
        const budgetB = b.maxBudget || b.budget || 0;
        
        switch(filters.sortBy) {
          case 'Lowest Budget': return budgetA - budgetB;
          case 'Highest Budget': return budgetB - budgetA;
          case 'Oldest First': return getTimestamp(a) - getTimestamp(b);
          case 'Newest First': 
          default: 
            return getTimestamp(b) - getTimestamp(a);
        }
      });
    }

    // Render
    if (result.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
          <h4 class="text-navy fw-bold">No wanted products found</h4>
          <p class="text-muted">No wanted requests found in ${normalizedCategory !== 'All Categories' ? normalizedCategory : 'this category'}. Try changing your search or filters.</p>
          <button class="btn btn-outline-premium mt-3" id="reset-filters-btn">Clear Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn && clearBtn) {
        resetBtn.addEventListener('click', () => clearBtn.click());
      }
      return;
    }

    container.innerHTML = result.map(p => {
      let badge = 'bg-primary';
      if (p.status === 'Matched') badge = 'bg-success';
      if (p.status === 'Open') badge = 'bg-warning text-dark';
      if (p.status === 'Closed') badge = 'bg-secondary';
      
      const categoryDisplay = matchCategory(p.category) !== 'All Categories' ? matchCategory(p.category) : p.category;

      return `
        <div class="col-12 col-md-6 col-xl-4 mb-4">
          <div class="product-card h-100 d-flex flex-column">
            <div class="product-details p-4 d-flex flex-column h-100">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="auction-badge position-relative top-0 start-0 ${badge} px-3 py-1 rounded-pill" style="font-size:0.75rem; box-shadow:none;">${p.status}</span>
                <span class="text-muted small"><i class="bi bi-calendar3 me-1"></i>Requested on: ${p.requestedDate}</span>
              </div>
              
              <h5 class="product-title fw-bold mb-2 text-navy" title="${p.productName}">${p.productName}</h5>
              
              <div class="d-flex align-items-center gap-2 mb-3">
                <span class="badge bg-navy border border-secondary text-info fw-semibold" style="font-size:0.75rem;"><i class="bi bi-tag-fill me-1"></i>${categoryDisplay}</span>
                ${p.condition ? `<span class="badge bg-light text-dark border fw-normal" style="font-size:0.75rem;">${p.condition}</span>` : ''}
              </div>

              <div class="mb-3 p-2 px-3 rounded d-flex align-items-center justify-content-between" style="background: rgba(0, 82, 204, 0.05); border: 1px solid rgba(0, 82, 204, 0.15);">
                <span class="small fw-semibold text-navy"><i class="bi bi-person-circle me-1 text-primary"></i>Requested by:</span>
                <span class="small font-monospace fw-bold text-navy px-2 py-1 bg-white rounded border border-subtle">${p.requestedBy || 'CUST-2456'}</span>
              </div>
              
              <p class="text-secondary small mb-4 flex-grow-1" style="line-height: 1.6; word-break: break-word;">${p.description || ''}</p>
              
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top" style="border-color: rgba(255,255,255,0.08) !important;">
                <div>
                  <div class="small text-muted mb-0" style="font-size:0.75rem;">Max Budget</div>
                  <div class="bid-price fs-4 text-gold fw-bold">₹${(p.maxBudget || p.budget || 0).toLocaleString('en-IN')}</div>
                </div>
                <a href="wanted-product-details.html?id=${p.id}" class="btn btn-outline-premium btn-sm px-3 py-2 fw-semibold">View Request</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Real-time search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderGrid({
        searchQuery: searchInput.value,
        category: categoryFilter ? categoryFilter.value : 'All Categories',
        status: statusFilter ? statusFilter.value : 'All Statuses',
        sortBy: sortFilter ? sortFilter.value : 'Newest First'
      });
    });
  }

  // Filter Button Action
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      renderGrid({
        searchQuery: searchInput ? searchInput.value : '',
        category: categoryFilter ? categoryFilter.value : 'All Categories',
        status: statusFilter ? statusFilter.value : 'All Statuses',
        sortBy: sortFilter ? sortFilter.value : 'Newest First'
      });
    });
  }

  // Auto update on dropdown change
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      renderGrid({
        searchQuery: searchInput ? searchInput.value : '',
        category: categoryFilter.value,
        status: statusFilter ? statusFilter.value : 'All Statuses',
        sortBy: sortFilter ? sortFilter.value : 'Newest First'
      });
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener('change', () => {
      renderGrid({
        searchQuery: searchInput ? searchInput.value : '',
        category: categoryFilter ? categoryFilter.value : 'All Categories',
        status: statusFilter.value,
        sortBy: sortFilter ? sortFilter.value : 'Newest First'
      });
    });
  }
  
  if (sortFilter) {
    sortFilter.addEventListener('change', () => {
      renderGrid({
        searchQuery: searchInput ? searchInput.value : '',
        category: categoryFilter ? categoryFilter.value : 'All Categories',
        status: statusFilter ? statusFilter.value : 'All Statuses',
        sortBy: sortFilter.value
      });
    });
  }

  // Clear Filters
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (categoryFilter) categoryFilter.value = 'All Categories';
      if (statusFilter) statusFilter.value = 'All Statuses';
      if (sortFilter) sortFilter.value = 'Newest First';
      renderGrid({ category: 'All Categories', sortBy: 'Newest First' });
    });
  }

  if (clearCategoryBadgeBtn) {
    clearCategoryBadgeBtn.addEventListener('click', () => {
      if (categoryFilter) categoryFilter.value = 'All Categories';
      renderGrid({
        searchQuery: searchInput ? searchInput.value : '',
        category: 'All Categories',
        status: statusFilter ? statusFilter.value : 'All Statuses',
        sortBy: sortFilter ? sortFilter.value : 'Newest First'
      });
    });
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('wp-title').value;
      const budget = document.getElementById('wp-budget').value;
      
      if (!title || !budget) return;

      const currentUserId = localStorage.getItem('userId') || (localStorage.getItem('userEmail') ? localStorage.getItem('userEmail').split('@')[0] : 'CUST-2456');

      const newProduct = {
        id: 'PK-' + Math.floor(1000 + Math.random() * 9000),
        productName: title,
        brand: "Unknown",
        category: document.getElementById('wp-category').value,
        maxBudget: parseInt(budget),
        condition: document.getElementById('wp-condition').value,
        description: document.getElementById('wp-desc').value,
        requestedBy: currentUserId,
        requestedDate: "Today",
        status: 'Open'
      };

      const existing = JSON.parse(localStorage.getItem('customWantedProducts') || '[]');
      existing.unshift(newProduct);
      localStorage.setItem('customWantedProducts', JSON.stringify(existing));

      if (window.showDemoToast) {
        window.showDemoToast('Wanted Product request submitted successfully!');
      } else {
        alert('Wanted Product request submitted successfully!');
      }
      form.reset();
      
      // Close modal if exists
      const modalEl = document.getElementById('wantedModal');
      if (modalEl) {
        // eslint-disable-next-line no-undef
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
      
      renderGrid({
        searchQuery: searchInput ? searchInput.value : '',
        category: categoryFilter ? categoryFilter.value : 'All Categories',
        status: statusFilter ? statusFilter.value : 'All Statuses',
        sortBy: sortFilter ? sortFilter.value : 'Newest First'
      });
    });
  }

  // Read URL category query param on initial load
  const rawCatParam = getQueryParam('category');
  const initialCategory = matchCategory(rawCatParam);

  if (categoryFilter && initialCategory !== 'All Categories') {
    categoryFilter.value = initialCategory;
  }

  // Initial render
  renderGrid({
    category: initialCategory,
    sortBy: sortFilter ? sortFilter.value : 'Newest First'
  });
});
