document.addEventListener('DOMContentLoaded', () => {
  const loadingState = document.getElementById('loading-state');
  const errorState = document.getElementById('error-state');
  const detailsContainer = document.getElementById('product-details');

  // Helper function to get query params
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Load custom products from localStorage, combined with mock data
  function getAllWantedProducts() {
    const custom = JSON.parse(localStorage.getItem('customWantedProducts') || '[]');
    return [...custom, ...(window.wantedProductsData || [])];
  }

  const productId = getQueryParam('id');
  const allProducts = getAllWantedProducts();
  
  // Find product
  const product = allProducts.find(p => p.id.toString() === productId);

  // Hide loading
  if (loadingState) loadingState.classList.add('d-none');

  if (!product) {
    // Show error
    if (errorState) errorState.classList.remove('d-none');
    return;
  }

  // Render product details
  if (detailsContainer) {
    detailsContainer.classList.remove('d-none');
    
    let badge = 'bg-primary';
    if (product.status === 'Matched') badge = 'bg-success';
    if (product.status === 'Open') badge = 'bg-warning text-dark';
    if (product.status === 'Closed') badge = 'bg-secondary';
    
    const budget = (product.maxBudget || product.budget || 0).toLocaleString('en-IN');

    detailsContainer.innerHTML = `
      <div class="col-lg-8">
        <div class="bg-white p-5 rounded-4 shadow-sm border mb-4">
          <div class="d-flex align-items-center mb-4 gap-3">
            <span class="badge ${badge} px-3 py-2 fs-6 rounded-pill">${product.status.toUpperCase()}</span>
            <span class="text-muted"><i class="bi bi-calendar-event me-1"></i> Requested: ${product.requestedDate}</span>
          </div>
          
          <h1 class="display-6 fw-bold text-navy mb-2">${product.productName}</h1>
          <p class="text-muted fs-5 mb-4">
            <i class="bi bi-tag-fill me-2"></i>${product.category}
            <span class="mx-2">•</span>
            <span class="fw-semibold text-dark">Brand:</span> ${product.brand || 'Not specified'}
          </p>
          
          <hr class="mb-4">
          
          <h4 class="fw-bold mb-3">Request Details</h4>
          <p class="text-secondary mb-4" style="line-height: 1.8;">${product.description}</p>
          
          <div class="row g-4 mt-2">
            <div class="col-md-6">
              <div class="p-3 bg-light rounded-3 border">
                <span class="d-block text-muted small fw-bold mb-1">CONDITION</span>
                <span class="fs-5 fw-semibold">${product.condition}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 bg-light rounded-3 border">
                <span class="d-block text-muted small fw-bold mb-1">REQUESTED BY</span>
                <span class="fs-5 fw-semibold"><i class="bi bi-person-circle me-2"></i>${product.requestedBy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 sticky-top" style="top: 100px;">
          <div class="card-body p-4 text-center">
            <h5 class="text-muted fw-bold mb-2">EXPECTED BUDGET</h5>
            <h2 class="text-gold fw-bold mb-4 display-5">₹${budget}</h2>
            
            <button class="btn btn-premium w-100 py-3 fw-bold mb-3" ${product.status === 'Closed' ? 'disabled' : ''}>
              <i class="bi bi-chat-dots me-2"></i> CONTACT / ENQUIRE
            </button>
            
            <a href="wanted-products.html" class="btn btn-outline-secondary w-100 py-2">
              <i class="bi bi-arrow-left me-2"></i> Back to Wanted Products
            </a>
            
            ${product.status === 'Closed' ? '<div class="alert alert-secondary mt-3 mb-0 small">This request is no longer active.</div>' : ''}
          </div>
        </div>
      </div>
    `;
  }
});
