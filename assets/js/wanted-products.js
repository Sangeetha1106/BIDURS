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

  // Helper to parse pseudo dates for sorting if needed, but ID is a good proxy for Newest/Oldest in mock data
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

  function renderGrid(filters = {}) {
    let result = getAllWantedProducts();

    // 1. Filter by Search
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.productName.toLowerCase().includes(q) || 
        (p.brand && p.brand.toLowerCase().includes(q)) || 
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Filter by Category
    if (filters.category && filters.category !== 'All Categories') {
      result = result.filter(p => p.category === filters.category);
    }

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
          <h4>No wanted products found</h4>
          <p class="text-muted">Try changing your filters or search criteria.</p>
          <button class="btn btn-outline-premium mt-3" onclick="document.getElementById('wp-clear-btn').click()">Clear Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = result.map(p => {
      let badge = 'bg-primary';
      if (p.status === 'Matched') badge = 'bg-success';
      if (p.status === 'Open') badge = 'bg-warning text-dark';
      if (p.status === 'Closed') badge = 'bg-secondary';
      
      return `
        <div class="col-12 col-md-6 col-xl-4">
          <div class="card border-0 shadow-sm rounded-4 h-100">
            <div class="card-body p-4 d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <span class="badge ${badge} px-2 py-1">${p.status}</span>
                <span class="text-muted small">${p.requestedDate}</span>
              </div>
              <h5 class="fw-bold text-navy mb-1 text-truncate" title="${p.productName}">${p.productName}</h5>
              <p class="small text-muted mb-3"><i class="bi bi-tag-fill me-1"></i> ${p.category} | ${p.condition}</p>
              <p class="text-secondary small mb-4 flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${p.description}</p>
              
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                <div>
                  <div class="small text-muted">Max Budget</div>
                  <div class="fw-bold text-gold fs-5">₹${(p.maxBudget || p.budget || 0).toLocaleString('en-IN')}</div>
                </div>
                <a href="wanted-product-details.html?id=${p.id}" class="btn btn-outline-premium btn-sm">View Request</a>
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
      renderGrid({ sortBy: 'Newest First' });
    });
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('wp-title').value;
      const budget = document.getElementById('wp-budget').value;
      
      if (!title || !budget) return;

      const newProduct = {
        id: 'PK-' + Math.floor(1000 + Math.random() * 9000),
        productName: title,
        brand: "Unknown", // Can be added to form if needed
        category: document.getElementById('wp-category').value,
        maxBudget: parseInt(budget),
        condition: document.getElementById('wp-condition').value,
        description: document.getElementById('wp-desc').value,
        requestedBy: "You (Customer)",
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

  // Initial render
  renderGrid({ sortBy: sortFilter ? sortFilter.value : 'Newest First' });
});
