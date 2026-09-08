/**
 * STAGE 6 Features: Wanted Products, Chat, Reviews, Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  initWantedProducts();
  initChat();
  initReviews();
  initContactForm();
});

function getToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '1055';
    document.body.appendChild(container);
  }
  return container;
}

function showDemoToast(message, type = 'success') {
  const container = getToastContainer();
  const toastEl = document.createElement('div');
  toastEl.className = `toast align-items-center text-white bg-${type} border-0 mb-2`;
  const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body fw-semibold">
        <i class="bi ${icon} me-2"></i> ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  container.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

// -----------------------------------------
// WANTED PRODUCTS LOGIC
// -----------------------------------------
function initWantedProducts() {
  const container = document.getElementById('wanted-list-container');
  const form = document.getElementById('wanted-form');
  
  if (container) {
    renderWantedProducts();
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('wp-title').value;
      const budget = document.getElementById('wp-budget').value;
      
      if (!title || !budget) return;

      const newProduct = {
        title,
        category: document.getElementById('wp-category').value,
        budget: parseInt(budget),
        condition: document.getElementById('wp-condition').value,
        desc: document.getElementById('wp-desc').value,
        date: new Date().toLocaleDateString(),
        status: 'Under Review',
        id: 'PK-' + Math.floor(1000 + Math.random() * 9000)
      };

      const existing = JSON.parse(localStorage.getItem('wantedProducts') || '[]');
      existing.unshift(newProduct);
      localStorage.setItem('wantedProducts', JSON.stringify(existing));

      showDemoToast('Wanted Product request submitted successfully!');
      form.reset();
      
      // Close modal if exists
      const modalEl = document.getElementById('wantedModal');
      if (modalEl) {
        bootstrap.Modal.getInstance(modalEl).hide();
      }
      
      renderWantedProducts();
    });
  }
}

function renderWantedProducts() {
  const container = document.getElementById('wanted-list-container');
  if (!container) return;

  const defaultMock = [
    { title: 'Sony A7IV Camera Body Only', category: 'Cameras', budget: 180000, condition: 'Like New', desc: 'Looking for a gently used Sony A7IV for wedding photography.', date: 'Today', status: 'Open', id: 'CUST-8821' },
    { title: 'MacBook Pro M3 Max 64GB', category: 'Laptops', budget: 320000, condition: 'Brand New', desc: 'Need maximum specs for video editing. Sealed box preferred.', date: 'Yesterday', status: 'Matched', id: 'CUST-1092' },
    { title: 'Samsung Galaxy S24 Ultra', category: 'Mobile Phones', budget: 95000, condition: 'Any', desc: 'Titanium grey, minimum 512GB storage.', date: '02 Sep 2026', status: 'Open', id: 'CUST-4410' }
  ];

  const custom = JSON.parse(localStorage.getItem('wantedProducts') || '[]');
  const combined = [...custom, ...defaultMock];

  container.innerHTML = combined.map(p => {
    let badge = 'bg-primary';
    if (p.status === 'Matched') badge = 'bg-success';
    if (p.status === 'Under Review') badge = 'bg-warning text-dark';
    if (p.status === 'Closed') badge = 'bg-secondary';
    
    return `
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <span class="badge ${badge} px-2 py-1">${p.status}</span>
              <span class="text-muted small">${p.date}</span>
            </div>
            <h5 class="fw-bold text-navy mb-1">${p.title}</h5>
            <p class="small text-muted mb-3"><i class="bi bi-tag-fill me-1"></i> ${p.category} | ${p.condition}</p>
            <p class="text-secondary small mb-4 line-clamp-2">${p.desc}</p>
            
            <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
              <div>
                <div class="small text-muted">Max Budget</div>
                <div class="fw-bold text-gold fs-5">₹${p.budget.toLocaleString('en-IN')}</div>
              </div>
              <button class="btn btn-outline-premium btn-sm">View Request</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// -----------------------------------------
// CHAT LOGIC
// -----------------------------------------
function initChat() {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');

  if (chatForm && chatInput && chatBody) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = chatInput.value.trim();
      if (!msg) return;

      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Append my message
      const html = `
        <div class="d-flex justify-content-end mb-3">
          <div class="text-end">
            <div class="bg-navy text-white rounded-4 px-4 py-2 d-inline-block shadow-sm">
              ${msg}
            </div>
            <div class="small text-muted mt-1">${time}</div>
          </div>
        </div>
      `;
      chatBody.insertAdjacentHTML('beforeend', html);
      chatInput.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;

      // Mock auto reply
      setTimeout(() => {
        const replyHtml = `
          <div class="d-flex justify-content-start mb-3">
            <div>
              <div class="bg-light text-dark border rounded-4 px-4 py-2 d-inline-block shadow-sm">
                Thank you for your message. An agent will review this shortly. (Demo Auto-Reply)
              </div>
              <div class="small text-muted mt-1">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        `;
        chatBody.insertAdjacentHTML('beforeend', replyHtml);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 1500);
    });
  }
}

// -----------------------------------------
// REVIEWS LOGIC
// -----------------------------------------
function initReviews() {
  const form = document.getElementById('review-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showDemoToast('Thank you! Your review has been submitted for moderation.');
      form.reset();
      
      const modalEl = document.getElementById('reviewModal');
      if (modalEl) {
        bootstrap.Modal.getInstance(modalEl).hide();
      }
    });
  }
}

// -----------------------------------------
// CONTACT LOGIC
// -----------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showDemoToast('Your message has been sent successfully. We will get back to you soon!');
      form.reset();
    });
  }
}
