/**
 * STAGE 6 Features: Wanted Products, Chat, Reviews, Forms
 */

document.addEventListener('DOMContentLoaded', () => {
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
