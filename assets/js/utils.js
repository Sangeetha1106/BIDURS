// Utility functions for PICKURS.in

/**
 * Formats a number to Indian Rupee currency string
 * @param {number} amount
 * @returns {string} Formatted currency e.g. "₹80,000"
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Returns the HTML for a status badge based on product status
 * @param {string} status 
 * @returns {string} HTML string
 */
function getStatusBadge(status) {
  switch(status) {
    case 'LIVE':
      return `<span class="auction-badge badge-live"><i class="bi bi-circle-fill small me-1"></i> LIVE</span>`;
    case 'ENDING SOON':
      return `<span class="auction-badge badge-live" style="background-color: #ff9800; animation: none;"><i class="bi bi-hourglass-split me-1"></i> ENDING SOON</span>`;
    case 'UPCOMING':
      return `<span class="auction-badge badge-upcoming"><i class="bi bi-calendar-event me-1"></i> UPCOMING</span>`;
    case 'ENDED':
      return `<span class="auction-badge badge-closed"><i class="bi bi-x-circle me-1"></i> ENDED</span>`;
    default:
      return '';
  }
}

/**
 * Get URL query parameter
 * @param {string} name 
 * @returns {string|null}
 */
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

window.utils = {
  formatCurrency,
  getStatusBadge,
  getQueryParam
};
