// Fixed Auction Schedule (single source of truth for sequential auctions)
// Times are defined using ISO strings or YYYY-MM-DD + HH:mm format.

const auctionSchedule = [
  { productId: 1, date: '2026-09-23', startTime: '09:00', durationMinutes: 120 }, // iPhone 15 Pro Max (Currently Live for current time 10:43)
  { productId: 2, date: '2026-09-23', startTime: '11:30', durationMinutes: 60 },  // Samsung Galaxy S24 Ultra (Next Auction)
  { productId: 3, date: '2026-09-23', startTime: '13:00', durationMinutes: 60 },  // Apple MacBook Air M3
  { productId: 4, date: '2026-09-23', startTime: '14:30', durationMinutes: 60 },  // Dell XPS 15 OLED
  { productId: 5, date: '2026-09-23', startTime: '16:00', durationMinutes: 60 },  // Sony Alpha Camera
  { productId: 6, date: '2026-09-23', startTime: '17:30', durationMinutes: 60 },  // Apple AirPods Pro
  { productId: 7, date: '2026-09-23', startTime: '19:00', durationMinutes: 60 },  // Apple iPad Pro
  { productId: 8, date: '2026-09-23', startTime: '20:30', durationMinutes: 60 },  // Samsung 55-inch Smart TV
  { productId: 9, date: '2026-09-24', startTime: '10:00', durationMinutes: 60 },  // Lenovo Legion 5 Pro
  { productId: 10, date: '2026-09-24', startTime: '11:30', durationMinutes: 60 }, // Apple Watch Series 9
  { productId: 11, date: '2026-09-24', startTime: '13:00', durationMinutes: 60 }, // Sony WH-1000XM5
  { productId: 12, date: '2026-09-24', startTime: '14:30', durationMinutes: 60 }, // DJI Mini 4 Pro
  { productId: 13, date: '2026-09-23', startTime: '12:00', durationMinutes: 120 }, // Asus ROG Strix G16
  { productId: 14, date: '2026-09-23', startTime: '12:15', durationMinutes: 120 }, // Bose QuietComfort Ultra
  { productId: 15, date: '2026-09-23', startTime: '12:30', durationMinutes: 120 }, // LG OLED TV
  { productId: 16, date: '2026-09-23', startTime: '12:45', durationMinutes: 120 }, // Canon EOS R6
  { productId: 17, date: '2026-09-23', startTime: '13:00', durationMinutes: 120 }, // iPad Air M2
  { productId: 18, date: '2026-09-23', startTime: '13:15', durationMinutes: 120 }, // Pixel 8 Pro
  { productId: 19, date: '2026-09-23', startTime: '13:30', durationMinutes: 120 }, // PS5 Slim
  { productId: 20, date: '2026-09-23', startTime: '13:45', durationMinutes: 120 }  // Marshall Stanmore III
];

window.auctionSchedule = auctionSchedule;

