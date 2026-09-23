// Centralized Mock Product Data for BIDURS (15 Products)

const now = new Date().getTime();
const addHours = (h) => new Date(now + h * 60 * 60 * 1000).getTime();
const subHours = (h) => new Date(now - h * 60 * 60 * 1000).getTime();

const mockProducts = [
  // 1. iPhone 15 Pro
  {
    id: 1,
    name: 'Apple iPhone 15 Pro Max - 256GB Natural Titanium',
    category: 'Mobiles',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Flagship Apple iPhone with A17 Pro chip and titanium design.',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    features: ['6.7-inch Super Retina XDR display', 'A17 Pro chip with 6-core GPU', '48MP Main camera with 5x Telephoto', 'Titanium design with Ceramic Shield'],
    marketPrice: 159900,
    startingBid: 80000,
    currentBid: 112500,
    bidders: 45,
    highestBidder: 'Vikram S. (#8842)',
    bidHistory: [
      { name: 'Vikram S. (#8842)', amount: 112500, time: '2 mins ago', status: 'Highest Bidder' },
      { name: 'Amit V. (#5103)', amount: 110000, time: '10 mins ago', status: 'Outbid' },
      { name: 'Rohan D. (#9481)', amount: 105000, time: '25 mins ago', status: 'Outbid' }
    ],
    status: 'LIVE',
    startTime: subHours(2),
    endTime: addHours(2.5),
    sellerName: 'Apple Official Store'
  },
  // 2. Samsung Galaxy S24 Ultra
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra 512GB Titanium Black',
    category: 'Mobiles',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Galaxy AI is here. Welcome to the era of mobile AI.',
    description: 'Titanium frame with built-in S Pen, 200MP camera with AI photo assist, and Snapdragon 8 Gen 3 for Galaxy processor.',
    features: ['Titanium frame & S Pen', '200MP AI Camera System', 'Snapdragon 8 Gen 3 for Galaxy', '6.8-inch QHD+ Dynamic AMOLED 2X'],
    marketPrice: 139999,
    startingBid: 65000,
    currentBid: 88500,
    bidders: 89,
    highestBidder: 'Ananya R. (#3319)',
    bidHistory: [
      { name: 'Ananya R. (#3319)', amount: 88500, time: '4 mins ago', status: 'Highest Bidder' },
      { name: 'Deepak T. (#2049)', amount: 86000, time: '15 mins ago', status: 'Outbid' }
    ],
    status: 'LIVE',
    startTime: subHours(1),
    endTime: addHours(1.5),
    sellerName: 'Samsung Flagship Store'
  },
  // 3. MacBook Air M3
  {
    id: 3,
    name: 'Apple MacBook Air M3 15-inch 16GB/512GB Midnight',
    category: 'Laptops',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Supercharged by M3 chip for fast portable performance.',
    description: 'Lean, mean M3 machine. Ultra-lightweight laptop with up to 18 hours of battery life and Liquid Retina display.',
    features: ['Apple M3 chip processor', '15.3-inch Liquid Retina Display', '16GB Unified Memory & 512GB SSD', 'Up to 18 hours battery life'],
    marketPrice: 134900,
    startingBid: 70000,
    currentBid: 0,
    bidders: 18,
    highestBidder: 'Scheduled Start',
    bidHistory: [],
    status: 'UPCOMING',
    startTime: addHours(24),
    endTime: addHours(72),
    sellerName: 'Apple India'
  },
  // 4. Dell XPS 15
  {
    id: 4,
    name: 'Dell XPS 15 OLED Laptop (i7 13th Gen/16GB/1TB SSD)',
    category: 'Laptops',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Premium Windows creator laptop with 3.5K OLED touch display.',
    description: 'Stunning 3.5K OLED InfinityEdge touchscreen powered by Intel Core i7 13th Gen processor and NVIDIA RTX graphics.',
    features: ['Intel Core i7-13700H', '3.5K OLED Touch Display', '16GB DDR5 & 1TB NVMe SSD', 'NVIDIA GeForce RTX 4050 6GB'],
    marketPrice: 185000,
    startingBid: 85000,
    currentBid: 115000,
    bidders: 34,
    highestBidder: 'Siddharth M. (#1984)',
    bidHistory: [
      { name: 'Siddharth M. (#1984)', amount: 115000, time: '8 mins ago', status: 'Highest Bidder' }
    ],
    status: 'LIVE',
    startTime: subHours(4),
    endTime: addHours(3.0),
    sellerName: 'Dell Authorized Dealer'
  },
  // 5. Sony Alpha A7 IV Camera
  {
    id: 5,
    name: 'Sony Alpha A7 IV Full-Frame Mirrorless Camera Body',
    category: 'Cameras',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'The next-generation hybrid full-frame camera for photos & video.',
    description: '33MP Exmor R sensor with BIONZ XR engine, 4K 60p 10-bit recording, and real-time subject tracking AF.',
    features: ['33.0 MP Full-Frame Exmor R Sensor', '4K 60p 10-bit 4:2:2 video', '759 point phase-detection AF', '5-axis optical in-body stabilization'],
    marketPrice: 242990,
    startingBid: 120000,
    currentBid: 185000,
    bidders: 112,
    highestBidder: 'Karthik N. (#6612)',
    bidHistory: [
      { name: 'Karthik N. (#6612)', amount: 185000, time: '1 min ago', status: 'Highest Bidder' }
    ],
    status: 'LIVE',
    startTime: subHours(8),
    endTime: addHours(4.0),
    sellerName: 'Sony Center India'
  },
  // 6. iPad Pro M4
  {
    id: 6,
    name: 'Apple iPad Pro 11-inch M4 256GB Space Black',
    category: 'Tablets',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Breakthrough Ultra Retina XDR Tandem OLED display with M4 speed.',
    description: 'Unbelievably thin 5.1mm design, groundbreaking Tandem OLED display, and next-generation M4 Neural Engine for AI workloads.',
    features: ['Apple M4 Chip Processor', 'Ultra Retina XDR Tandem OLED Display', '12MP Wide Camera + LiDAR Scanner', 'Thunderbolt / USB 4 Port'],
    marketPrice: 99900,
    startingBid: 45000,
    currentBid: 68500,
    bidders: 65,
    highestBidder: 'Priya K. (#7204)',
    bidHistory: [
      { name: 'Priya K. (#7204)', amount: 68500, time: '5 mins ago', status: 'Highest Bidder' }
    ],
    status: 'LIVE',
    startTime: subHours(3),
    endTime: addHours(5.0),
    sellerName: 'Apple India'
  },
  // 7. Apple AirPods Pro
  {
    id: 7,
    name: 'Apple AirPods Pro (2nd Gen) with MagSafe USB-C Case',
    category: 'Accessories',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Up to 2x more Active Noise Cancellation and Adaptive Audio.',
    description: 'H2 chip driver delivers deeper bass and crystal clear high frequencies. Personalized Spatial Audio with dynamic head tracking.',
    features: ['Apple H2 Chip', 'Adaptive Audio & Transparency Mode', 'USB-C MagSafe Charging Case', 'Up to 30 hours total listening time'],
    marketPrice: 24900,
    startingBid: 10000,
    currentBid: 16500,
    bidders: 215,
    highestBidder: 'Amit V. (#5103)',
    bidHistory: [
      { name: 'Amit V. (#5103)', amount: 16500, time: '3 mins ago', status: 'Highest Bidder' }
    ],
    status: 'LIVE',
    startTime: subHours(5),
    endTime: addHours(1.2),
    sellerName: 'Apple India'
  },
  // 8. Samsung 55" Smart TV
  {
    id: 8,
    name: 'Samsung 55" 4K QLED Smart TV (QA55Q60C)',
    category: 'Smart Devices',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: '100% Color Volume with Quantum Dot technology and Quantum HDR.',
    description: 'Dual LED backlighting technology for bolder contrast and Tizen OS with all major streaming applications built-in.',
    features: ['55-inch 4K QLED Panel', 'Quantum Processor 4K Lite', 'Object Tracking Sound Lite', 'AirSlim Design'],
    marketPrice: 84990,
    startingBid: 38000,
    currentBid: 0,
    bidders: 12,
    highestBidder: 'Scheduled Start',
    bidHistory: [],
    status: 'UPCOMING',
    startTime: addHours(18),
    endTime: addHours(66),
    sellerName: 'Samsung Electronics'
  },
  // 9. Lenovo Legion 5
  {
    id: 9,
    name: 'Lenovo Legion 5 Pro Gaming Laptop (Ryzen 7/RTX 3070)',
    category: 'Laptops',
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'High-performance 16-inch QHD 165Hz gaming laptop.',
    description: 'AMD Ryzen 7 5800H octa-core processor combined with NVIDIA RTX 3070 8GB graphics and Coldfront 3.0 thermal cooling.',
    features: ['AMD Ryzen 7 5800H', 'NVIDIA GeForce RTX 3070 8GB', '16-inch QHD 165Hz IPS Display', 'Legion TrueStrike RGB Keyboard'],
    marketPrice: 135000,
    startingBid: 60000,
    currentBid: 92000,
    bidders: 54,
    highestBidder: 'Rohan D. (#9481)',
    bidHistory: [
      { name: 'Rohan D. (#9481)', amount: 92000, time: 'Auction Ended', status: 'Winning Bidder' }
    ],
    status: 'ENDED',
    startTime: subHours(48),
    endTime: subHours(2),
    sellerName: 'Lenovo Store'
  },
  // 10. Apple Watch Series 9
  {
    id: 10,
    name: 'Apple Watch Series 9 GPS + Cellular 45mm Midnight',
    category: 'Smart Devices',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'S9 SiP chip with double tap gesture interaction.',
    description: 'Advanced health sensors for ECG, heart rate, blood oxygen tracking, and Emergency SOS with Crash Detection.',
    features: ['S9 SiP Chip with 4-Core Neural Engine', '2000 nits Always-On Retina Display', 'Double Tap Gesture Control', 'Water resistant to 50m'],
    marketPrice: 41900,
    startingBid: 15000,
    currentBid: 32400,
    bidders: 84,
    highestBidder: 'Deepak T. (#2049)',
    bidHistory: [
      { name: 'Deepak T. (#2049)', amount: 32400, time: '6 mins ago', status: 'Highest Bidder' }
    ],
    status: 'LIVE',
    startTime: subHours(4),
    endTime: addHours(2.8),
    sellerName: 'Apple India'
  },
  // 11. Sony WH-1000XM5
  {
    id: 11,
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    category: 'Accessories',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Industry-leading noise cancellation with 8 microphones.',
    description: 'Integrated Processor V1 controls 8 microphones to deliver unprecedented noise cancellation and crystal clear call quality.',
    features: ['Dual Processor Noise Cancellation', '30-hour Battery Life', 'Speak-to-Chat Technology', 'Ultra Comfort Leatherette Earcups'],
    marketPrice: 32900,
    startingBid: 12000,
    currentBid: 21500,
    bidders: 112,
    highestBidder: 'Suresh P. (#8190)',
    bidHistory: [
      { name: 'Suresh P. (#8190)', amount: 21500, time: '2 mins ago', status: 'Highest Bidder' }
    ],
    status: 'LIVE',
    startTime: subHours(6),
    endTime: addHours(1.5),
    sellerName: 'Sony Center'
  },
  // 12. Canon EOS R6
  {
    id: 12,
    name: 'Canon EOS R6 Mark II Mirrorless Camera Body',
    category: 'Cameras',
    brand: 'Canon',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Full-frame 24.2MP sensor with 40fps electronic shutter.',
    description: 'High-speed hybrid camera with Dual Pixel CMOS AF II, 4K 60p uncropped video, and 8-stop In-Body Image Stabilizer.',
    features: ['24.2MP Full-Frame CMOS Sensor', '4K 60p Oversampled Video', 'Up to 40 fps Electronic Shutter', 'In-Body Image Stabilizer (IBIS)'],
    marketPrice: 215995,
    startingBid: 105000,
    currentBid: 0,
    bidders: 8,
    highestBidder: 'Scheduled Start',
    bidHistory: [],
    status: 'UPCOMING',
    startTime: addHours(12),
    endTime: addHours(60),
    sellerName: 'Canon Store India'
  },
  // 13. ASUS ROG Laptop
  {
    id: 13,
    name: 'ASUS ROG Strix G16 Gaming Laptop (i9/RTX 4070)',
    category: 'Laptops',
    brand: 'ASUS',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Intel Core i9 13th Gen processor with RTX 4070 GPU.',
    description: '16-inch ROG Nebula QHD+ 240Hz display powered by 13th Gen Intel Core i9 processor and 140W TGP RTX 4070 GPU.',
    features: ['Intel Core i9-13980HX', 'NVIDIA GeForce RTX 4070 8GB', '16" QHD+ 240Hz Nebula Display', '16GB DDR5 & 1TB PCIe 4.0 SSD'],
    marketPrice: 179990,
    startingBid: 90000,
    currentBid: 124500,
    bidders: 68,
    highestBidder: 'Rajesh K. (#3921)',
    bidHistory: [
      { name: 'Rajesh K. (#3921)', amount: 124500, time: '9 mins ago', status: 'Highest Bidder' }
    ],
    status: 'LIVE',
    startTime: subHours(1.5),
    endTime: addHours(3.5),
    sellerName: 'ASUS Official Store'
  },
  // 14. OnePlus 12
  {
    id: 14,
    name: 'OnePlus 12 5G 512GB Silky Black',
    category: 'Mobiles',
    brand: 'OnePlus',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: '4th Gen Hasselblad Camera System with 100W SUPERVOOC.',
    description: 'Snapdragon 8 Gen 3 flagship with 2K 120Hz ProXDR display, 5400mAh battery, and 50W AIRVOOC wireless charging.',
    features: ['Snapdragon 8 Gen 3 & 16GB RAM', '2K 120Hz ProXDR Display', '50MP Hasselblad Camera System', '5400mAh Battery with 100W Fast Charge'],
    marketPrice: 69999,
    startingBid: 32000,
    currentBid: 0,
    bidders: 25,
    highestBidder: 'Scheduled Start',
    bidHistory: [],
    status: 'UPCOMING',
    startTime: addHours(8),
    endTime: addHours(56),
    sellerName: 'OnePlus Official'
  },
  // 15. JBL PartyBox Speaker
  {
    id: 15,
    name: 'JBL PartyBox Stage 320 Portable Party Speaker',
    category: 'Electronics',
    brand: 'JBL',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Powerful 240W JBL Pro Sound with dynamic light show.',
    description: 'Dual 6.5" woofers deliver deep bass while telescopic handle and wide sturdy wheels make it easy to transport anywhere.',
    features: ['240W RMS JBL Original Pro Sound', 'Futuristic Dynamic Light Show', 'Up to 18 hours playtime with replaceable battery', 'IPX4 splashproof rating'],
    marketPrice: 54999,
    startingBid: 25000,
    currentBid: 38500,
    bidders: 41,
    highestBidder: 'Manish R. (#1209)',
    bidHistory: [
      { name: 'Manish R. (#1209)', amount: 38500, time: 'Auction Ended', status: 'Winning Bidder' }
    ],
    status: 'ENDED',
    startTime: subHours(72),
    endTime: subHours(6),
    sellerName: 'JBL Store'
  }
];

// Ensure it can be accessed globally
window.mockProductsData = mockProducts;
