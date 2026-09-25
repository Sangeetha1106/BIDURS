// Auction Schedule Engine Data (Single source of truth for sequential & live auctions)
// Dynamic relative schedule helper to ensure valid LIVE, UPCOMING, and ENDED demo auctions at any clock time.

(function() {
  function createRelativeSlot(productId, minutesOffset, durationMinutes) {
    const t = new Date(Date.now() + minutesOffset * 60 * 1000);
    const year = t.getFullYear();
    const month = String(t.getMonth() + 1).padStart(2, '0');
    const day = String(t.getDate()).padStart(2, '0');
    const hours = String(t.getHours()).padStart(2, '0');
    const minutes = String(t.getMinutes()).padStart(2, '0');

    return {
      productId: productId,
      date: `${year}-${month}-${day}`,
      startTime: `${hours}:${minutes}`,
      durationMinutes: durationMinutes
    };
  }

  const auctionSchedule = [
    // ── LIVE AUCTIONS (Currently running now) ──
    createRelativeSlot(1, -30, 180),   // iPhone 15 Pro Max (LIVE, ~2.5 hours remaining)
    createRelativeSlot(2, -45, 240),   // Sony PS5 Console (LIVE, ~3.25 hours remaining)
    createRelativeSlot(3, -20, 150),   // MacBook Pro M3 (LIVE, ~2 hours remaining)
    createRelativeSlot(4, -105, 120),  // Dell XPS 15 OLED (ENDING SOON, ~15 mins remaining)
    createRelativeSlot(5, -15, 120),   // Sony Alpha Camera (LIVE, ~1.75 hours remaining)

    // ── UPCOMING AUCTIONS (Scheduled for future) ──
    createRelativeSlot(6, 60, 120),    // AirPods Pro 2 (Starts in 1 hour)
    createRelativeSlot(7, 180, 120),   // iPad Pro M2 (Starts in 3 hours)
    createRelativeSlot(8, 360, 120),   // Samsung 55" TV (Starts in 6 hours)
    createRelativeSlot(9, 1440, 120),  // Lenovo Legion 5 Pro (Starts Tomorrow)
    createRelativeSlot(10, 2880, 120), // Apple Watch Series 9 (Starts in 2 Days)

    // ── ENDED AUCTIONS (Past completed auctions) ──
    createRelativeSlot(11, -300, 120), // Sony WH-1000XM5 (Ended)
    createRelativeSlot(12, -450, 120), // DJI Mini 4 Pro (Ended)
    createRelativeSlot(13, -600, 120), // Asus ROG Strix G16 (Ended)
    createRelativeSlot(14, -750, 120), // Bose QuietComfort Ultra (Ended)
    createRelativeSlot(15, -900, 120), // LG OLED TV (Ended)
    createRelativeSlot(16, -1050, 120),// Canon EOS R6 (Ended)
    createRelativeSlot(17, -1200, 120),// iPad Air M2 (Ended)
    createRelativeSlot(18, -1350, 120),// Pixel 8 Pro (Ended)
    createRelativeSlot(19, -1500, 120),// PS5 Slim Digital (Ended)
    createRelativeSlot(20, -1650, 120) // Marshall Stanmore III (Ended)
  ];

  window.auctionSchedule = auctionSchedule;
})();

