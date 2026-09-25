/**
 * Subscription Logic
 */

// Subscription price: Configurable via window.BIDURS_CONFIG or localStorage ('subPrice').
// Defaults to null (To Be Confirmed) when not set by admin/config.
function getSubscriptionPrice() {
  if (typeof window.BIDURS_CONFIG !== 'undefined' && window.BIDURS_CONFIG.SUB_PRICE !== undefined) {
    return window.BIDURS_CONFIG.SUB_PRICE;
  }
  const stored = localStorage.getItem('subPrice');
  return stored !== null ? parseFloat(stored) : null;
}

function getFormattedPrice() {
  const price = getSubscriptionPrice();
  if (price === null || price === undefined || isNaN(price)) {
    return 'To Be Confirmed';
  }
  return window.utils && window.utils.formatCurrency ? window.utils.formatCurrency(price) : `₹${price}`;
}

const SUB_VALIDITY_DAYS = 30;

function getSubscriptionStatus() {
  return localStorage.getItem('subState') || 'NOT_SUBSCRIBED';
}

function getSubscriptionExpiry() {
  const expiry = localStorage.getItem('subExpiry');
  return expiry ? parseInt(expiry) : null;
}

function activateSubscription() {
  const now = new Date().getTime();
  const expiry = now + (SUB_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
  
  localStorage.setItem('subState', 'ACTIVE');
  localStorage.setItem('subStart', now.toString());
  localStorage.setItem('subExpiry', expiry.toString());
}

function calculateSubscriptionExpiry() {
  const expiry = getSubscriptionExpiry();
  if (!expiry) return null;
  
  const now = new Date().getTime();
  const distance = expiry - now;
  
  if (distance < 0) {
    localStorage.setItem('subState', 'EXPIRED');
    return { status: 'EXPIRED', days: 0 };
  }
  
  const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
  if (days <= 7) {
    // Keep it ACTIVE in state but flag for UI
    return { status: 'EXPIRING SOON', days };
  }
  
  return { status: 'ACTIVE', days };
}

window.subUtils = {
  getSubscriptionPrice,
  getFormattedPrice,
  getSubscriptionStatus,
  activateSubscription,
  calculateSubscriptionExpiry
};

