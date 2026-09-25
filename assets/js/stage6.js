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

  if (!chatForm || !chatInput || !chatBody) return;

  const currentUserId = localStorage.getItem('userId') || 'CUST-2456';

  // Load chat history from localStorage if available
  const getChatHistory = () => {
    try {
      return JSON.parse(localStorage.getItem('bidurs_chat_history')) || [
        { sender: 'agent', text: 'Welcome to BIDURS support! How can I assist you with your recent auction or wanted product request?', time: '10:42 AM' }
      ];
    } catch(e) {
      return [{ sender: 'agent', text: 'Welcome to BIDURS support! How can I assist you with your recent auction or wanted product request?', time: '10:42 AM' }];
    }
  };

  const renderMessages = () => {
    const history = getChatHistory();
    chatBody.innerHTML = `<div class="text-center mb-4"><span class="badge bg-secondary opacity-50">Demo Customer Chat • Logged in as: ${currentUserId}</span></div>` +
      history.map(m => {
        if (m.sender === 'user') {
          return `
            <div class="d-flex justify-content-end mb-3">
              <div class="text-end">
                <div class="bg-navy text-white rounded-4 px-4 py-2 d-inline-block shadow-sm">
                  ${m.text}
                </div>
                <div class="small text-muted mt-1"><i class="bi bi-person me-1"></i>${currentUserId} • ${m.time}</div>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="d-flex justify-content-start mb-3">
              <div>
                <div class="bg-light text-dark border rounded-4 px-4 py-2 d-inline-block shadow-sm">
                  ${m.text}
                </div>
                <div class="small text-muted mt-1"><i class="bi bi-headset me-1"></i>Support Agent • ${m.time}</div>
              </div>
            </div>
          `;
        }
      }).join('');
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  renderMessages();

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if (!msg) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const history = getChatHistory();
    
    // Add user message
    history.push({ sender: 'user', text: msg, time: timeStr });
    localStorage.setItem('bidurs_chat_history', JSON.stringify(history));
    chatInput.value = '';
    renderMessages();

    // Mock agent auto-reply
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const currentHistory = getChatHistory();
      currentHistory.push({
        sender: 'agent',
        text: `Thank you, ${currentUserId}! We have received your query: "${msg}". Our support team will respond shortly. (Demo Chat Response)`,
        time: replyTime
      });
      localStorage.setItem('bidurs_chat_history', JSON.stringify(currentHistory));
      renderMessages();
    }, 1400);
  });
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
