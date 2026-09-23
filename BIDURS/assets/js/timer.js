/**
 * Timer functionality for count downs
 */

/**
 * Formats time remaining into a readable string
 * @param {number} distance in milliseconds
 * @returns {string} formatted string e.g. "00d : 05h : 32m : 18s"
 */
function formatTimeRemaining(distance) {
  if (distance < 0) return "00d : 00h : 00m : 00s";
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const pad = (n) => n.toString().padStart(2, '0');

  return `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
}

/**
 * Starts all countdowns on the page for elements with data-countdown attribute
 */
function initTimers() {
  const countdownElements = document.querySelectorAll('[data-countdown]');
  
  // If no elements, no need to run interval
  if(countdownElements.length === 0) return;

  setInterval(() => {
    const now = new Date().getTime();

    countdownElements.forEach(el => {
      const targetTime = parseInt(el.getAttribute('data-countdown'));
      const status = el.getAttribute('data-status');
      
      const distance = targetTime - now;

      if (distance < 0) {
        if (status === 'UPCOMING') {
          el.innerHTML = "Auction Started";
        } else {
          el.innerHTML = "Auction Ended";
        }
      } else {
        el.innerHTML = formatTimeRemaining(distance);
      }
    });
  }, 1000);
}

window.timerUtils = {
  initTimers,
  formatTimeRemaining
};
