// Mock Product Data for PICKURS.in

// Helper to get dates relative to now
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
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip.',
    features: ['6.7-inch Super Retina XDR display', 'A17 Pro chip', 'Pro camera system'],
    marketPrice: 159900,
    startingBid: 80000,
    currentBid: 112500,
    bidders: 45,
    status: 'LIVE',
    startTime: subHours(2),
    endTime: addHours(2.25),
    sellerName: 'Apple India'
  },
  // 2. Samsung Galaxy S24
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Mobiles',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Galaxy AI is here. Welcome to the era of mobile AI.',
    description: 'With Galaxy S24 Ultra, unleash whole new levels of creativity and productivity.',
    features: ['Titanium exterior', '200MP camera', 'Snapdragon 8 Gen 3 for Galaxy'],
    marketPrice: 129999,
    startingBid: 60000,
    currentBid: 78500,
    bidders: 89,
    status: 'LIVE',
    startTime: subHours(1),
    endTime: addHours(1.5),
    sellerName: 'Samsung Official'
  },
  // 3. MacBook Air M3
  {
    id: 3,
    name: 'Apple MacBook Air M3',
    category: 'Laptops',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Supercharged by M3 chip for fast performance.',
    description: 'The MacBook Air blasts forward with the M3 chip, bringing massive performance.',
    features: ['M3 chip', '13.6-inch Liquid Retina display', 'Up to 18 hours battery life'],
    marketPrice: 114900,
    startingBid: 62000,
    currentBid: 76000,
    bidders: 28,
    status: 'UPCOMING',
    startTime: addHours(48),
    endTime: addHours(96),
    sellerName: 'Apple India'
  },
  // 4. Dell XPS 15
  {
    id: 4,
    name: 'Dell XPS 15 OLED Laptop',
    category: 'Laptops',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Premium Windows laptop with 4K OLED display.',
    description: 'Dell XPS 15 offers unmatched performance and a stunning OLED InfinityEdge display.',
    features: ['Intel Core i7 13th Gen', '16GB RAM', '1TB SSD', 'OLED Display'],
    marketPrice: 185000,
    startingBid: 85000,
    currentBid: 0,
    bidders: 0,
    status: 'UPCOMING',
    startTime: addHours(12),
    endTime: addHours(60),
    sellerName: 'Dell Exclusive'
  },
  // 5. Sony Alpha Camera
  {
    id: 5,
    name: 'Sony Alpha ILCE-7M4 Camera',
    category: 'Cameras',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'The next-generation hybrid full-frame camera.',
    description: 'With groundbreaking performance in both still and movie recording.',
    features: ['33.0 MP full-frame sensor', '4K 60p video', 'BIONZ XR processor'],
    marketPrice: 242990,
    startingBid: 120000,
    currentBid: 185000,
    bidders: 112,
    status: 'LIVE',
    startTime: subHours(10),
    endTime: addHours(5.5),
    sellerName: 'Sony Center'
  },
  // 6. Apple AirPods Pro
  {
    id: 6,
    name: 'Apple AirPods Pro (2nd Gen)',
    category: 'Accessories',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Pro-level active noise cancellation.',
    description: 'Re-engineered for richer audio, smarter noise cancellation, and a more custom fit.',
    features: ['H2 Apple Silicon', 'Adaptive Transparency', 'Personalized Spatial Audio'],
    marketPrice: 24900,
    startingBid: 10000,
    currentBid: 14500,
    bidders: 215,
    status: 'ENDING SOON',
    startTime: subHours(40),
    endTime: addHours(0.5),
    sellerName: 'Apple India'
  },
  // 7. iPad Pro
  {
    id: 7,
    name: 'Apple iPad Pro 11-inch M4',
    category: 'Tablets',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'The ultimate iPad experience with M4 chip.',
    description: 'iPad Pro delivers an astonishingly thin and light design, breakthrough Ultra Retina XDR display.',
    features: ['M4 chip', 'Ultra Retina XDR display', 'Face ID', 'ProMotion technology'],
    marketPrice: 99900,
    startingBid: 45000,
    currentBid: 68500,
    bidders: 65,
    status: 'LIVE',
    startTime: subHours(5),
    endTime: addHours(8.2),
    sellerName: 'Apple India'
  },
  // 8. Samsung 55-inch Smart TV
  {
    id: 8,
    name: 'Samsung 55-inch 4K QLED Smart TV',
    category: 'Electronics',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Vibrant colors and spectacular contrast with 4K QLED.',
    description: 'Samsung QLED TV offers an immersive viewing experience with Quantum Dot technology.',
    features: ['4K Ultra HD', 'Quantum HDR', 'Dual LED', 'Smart TV with Tizen'],
    marketPrice: 84990,
    startingBid: 35000,
    currentBid: 48000,
    bidders: 32,
    status: 'UPCOMING',
    startTime: addHours(72),
    endTime: addHours(120),
    sellerName: 'Samsung Electronics'
  },
  // 9. Lenovo Legion Laptop
  {
    id: 9,
    name: 'Lenovo Legion 5 Pro Gaming Laptop',
    category: 'Laptops',
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Pro-level gaming performance.',
    description: 'Engineered for gaming dominance with AMD Ryzen processors and NVIDIA RTX graphics.',
    features: ['AMD Ryzen 7 5800H', 'RTX 3070 8GB', '16GB RAM', '16-inch QHD 165Hz'],
    marketPrice: 135000,
    startingBid: 60000,
    currentBid: 89000,
    bidders: 54,
    status: 'ENDING SOON',
    startTime: subHours(47),
    endTime: addHours(0.8),
    sellerName: 'Lenovo India'
  },
  // 10. Apple Watch Series
  {
    id: 10,
    name: 'Apple Watch Series 9',
    category: 'Accessories',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Smarter. Brighter. Mightier.',
    description: 'Apple Watch Series 9 helps you stay connected, active, healthy, and safe.',
    features: ['S9 SiP', 'Double tap gesture', 'Blood Oxygen app', 'ECG app'],
    marketPrice: 41900,
    startingBid: 15000,
    currentBid: 32400,
    bidders: 84,
    status: 'LIVE',
    startTime: subHours(3),
    endTime: addHours(4),
    sellerName: 'Apple India'
  },
  // 11. Sony Headphones
  {
    id: 11,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Accessories',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Industry-leading noise cancellation.',
    description: 'The best noise cancellation with exceptional sound quality and a comfortable fit.',
    features: ['Auto NC Optimizer', 'Up to 30 hours battery life', 'Multi-point connection'],
    marketPrice: 32900,
    startingBid: 12000,
    currentBid: 21500,
    bidders: 112,
    status: 'ENDING SOON',
    startTime: subHours(40),
    endTime: addHours(0.75),
    sellerName: 'Sony Center'
  },
  // 12. DJI Drone
  {
    id: 12,
    name: 'DJI Mini 4 Pro Drone',
    category: 'Electronics',
    brand: 'DJI',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Mini to the Max.',
    description: 'DJI Mini 4 Pro is our most advanced mini camera drone to date.',
    features: ['Under 249 g', '4K/60fps HDR True Vertical Shooting', 'Omnidirectional Obstacle Sensing'],
    marketPrice: 89990,
    startingBid: 40000,
    currentBid: 46000,
    bidders: 21,
    status: 'UPCOMING',
    startTime: addHours(24),
    endTime: addHours(48),
    sellerName: 'DJI Official'
  }
];

// Ensure it can be accessed globally
window.mockProductsData = mockProducts;
