/**
 * Sequential Single-Live-Auction Engine
 * Computes live, next, upcoming, and past auctions based on fixed auctionSchedule and real clock time.
 */

(function () {
  /**
   * Helper to parse schedule date and startTime string into a JavaScript Date object.
   * @param {string} dateStr 'YYYY-MM-DD'
   * @param {string} timeStr 'HH:mm'
   * @returns {Date}
   */
  function parseScheduleDateTime(dateStr, timeStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, 0, 0);
  }

  /**
   * Enriches schedule items with calculated start/end dates and matching product data.
   * @returns {Array} List of enriched auction items sorted by start time
   */
  function getEnrichedSchedule() {
    const schedule = window.auctionSchedule || [];
    const products = window.mockProductsData || [];

    return schedule
      .map((slot) => {
        const product = products.find((p) => parseInt(p.id, 10) === parseInt(slot.productId, 10)) || null;
        const startMs = parseScheduleDateTime(slot.date, slot.startTime).getTime();
        const endMs = startMs + slot.durationMinutes * 60 * 1000;

        return {
          ...slot,
          startMs,
          endMs,
          product
        };
      })
      .sort((a, b) => a.startMs - b.startMs);
  }

  /**
   * Dynamically syncs the status, startTime, and endTime properties of items in `window.mockProductsData`
   * based on current time and `auctionSchedule`.
   */
  function syncProductsDataWithSchedule() {
    if (!window.mockProductsData || !window.auctionSchedule) return;

    const enriched = getEnrichedSchedule();
    const now = new Date().getTime();

    // Reset status on all products first
    window.mockProductsData.forEach((product) => {
      const slot = enriched.find((s) => s.productId === product.id);
      if (slot) {
        product.startTime = slot.startMs;
        product.endTime = slot.endMs;
        product.scheduleDate = slot.date;
        product.scheduleStartTimeStr = slot.startTime;
        product.durationMinutes = slot.durationMinutes;

        if (now >= slot.startMs && now <= slot.endMs) {
          const remainingMs = slot.endMs - now;
          // Ending soon if less than 15 mins remaining
          product.status = remainingMs <= 15 * 60 * 1000 ? 'ENDING SOON' : 'LIVE';
        } else if (now < slot.startMs) {
          product.status = 'UPCOMING';
        } else {
          product.status = 'ENDED';
        }
      }
    });
  }

  /**
   * Returns the ONE auction currently running (now between start and end time).
   * Returns null if no auction is currently live (e.g. gap between slots).
   */
  function getCurrentAuction() {
    const enriched = getEnrichedSchedule();
    const now = new Date().getTime();
    return enriched.find((slot) => now >= slot.startMs && now <= slot.endMs) || null;
  }

  /**
   * Returns the immediate next upcoming auction (startMs > now).
   */
  function getNextAuction() {
    const enriched = getEnrichedSchedule();
    const now = new Date().getTime();
    return enriched.find((slot) => slot.startMs > now) || null;
  }

  /**
   * Returns all completed auctions (endMs < now).
   */
  function getPastAuctions() {
    const enriched = getEnrichedSchedule();
    const now = new Date().getTime();
    return enriched.filter((slot) => slot.endMs < now);
  }

  /**
   * Format date & time nicely for UI displays (e.g. "Today, 2:00 PM" or "23 Sep, 11:00 AM")
   */
  function formatAuctionTime(dateMs) {
    const d = new Date(dateMs);
    const now = new Date();
    
    const isToday = d.toDateString() === now.toDateString();
    
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = d.toDateString() === tomorrow.toDateString();

    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) return `Today, ${timeStr}`;
    if (isTomorrow) return `Tomorrow, ${timeStr}`;

    const dateStr = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    return `${dateStr}, ${timeStr}`;
  }

  // Initial Sync
  syncProductsDataWithSchedule();

  // Re-run sync every 1 second
  setInterval(() => {
    syncProductsDataWithSchedule();
  }, 1000);

  window.auctionEngine = {
    getCurrentAuction,
    getNextAuction,
    getPastAuctions,
    getEnrichedSchedule,
    syncProductsDataWithSchedule,
    formatAuctionTime
  };
})();
