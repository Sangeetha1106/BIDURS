// Mock Product Data for PICKURS.in

// Helper to get dates relative to now
const now = new Date().getTime();
const addHours = (h) => new Date(now + h * 60 * 60 * 1000).getTime();
const subHours = (h) => new Date(now - h * 60 * 60 * 1000).getTime();

const mockProducts = [
  // LIVE PRODUCTS
  {
    id: 1,
    name: 'Apple iPhone 15 Pro Max - 256GB Natural Titanium',
    category: 'Mobiles',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1697960334812-3f14065421eb?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Flagship Apple iPhone with A17 Pro chip and titanium design.',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    features: ['6.7-inch Super Retina XDR display', 'A17 Pro chip', 'Pro camera system (48MP Main)', 'Titanium with textured matte glass back'],
    marketPrice: 159900,
    startingBid: 80000,
    currentBid: 84500,
    bidders: 45,
    status: 'LIVE',
    startTime: subHours(2),
    endTime: addHours(3),
    sellerName: 'Apple India'
  },
  {
    id: 2,
    name: 'Sony PlayStation 5 Console',
    category: 'Gaming',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607453998774-a53665f24683?q=80&w=600&auto=format&fit=crop',
    ],
    shortDescription: 'Next-gen gaming console with ultra-high speed SSD.',
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.',
    features: ['Ultra-High Speed SSD', 'Ray Tracing', '4K-TV Gaming', 'Up to 120fps with 120Hz output'],
    marketPrice: 54990,
    startingBid: 20000,
    currentBid: 28200,
    bidders: 112,
    status: 'ENDING SOON',
    startTime: subHours(10),
    endTime: addHours(0.5), // 30 mins left
    sellerName: 'Sony Center'
  },
  {
    id: 3,
    name: 'MacBook Pro 14" M3 Pro',
    category: 'Laptops',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop',
    ],
    shortDescription: 'Supercharged by M3 Pro for pro performance.',
    description: 'The 14-inch MacBook Pro blasts forward with M3 Pro, a radically advanced chip that brings massive performance and capabilities for extreme workflows.',
    features: ['M3 Pro chip with 11-core CPU', '14-core GPU', '18GB Unified Memory', '512GB SSD Storage', '14.2-inch Liquid Retina XDR display'],
    marketPrice: 199900,
    startingBid: 100000,
    currentBid: 115000,
    bidders: 28,
    status: 'LIVE',
    startTime: subHours(5),
    endTime: addHours(5),
    sellerName: 'Apple India'
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Mobiles',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Galaxy AI is here. Welcome to the era of mobile AI.',
    description: 'With Galaxy S24 Ultra, you can unleash whole new levels of creativity, productivity and possibility — starting with the most important device in your life. Your smartphone.',
    features: ['Titanium exterior', '200MP camera', 'Snapdragon 8 Gen 3 for Galaxy', 'Built-in S Pen'],
    marketPrice: 129999,
    startingBid: 60000,
    currentBid: 65000,
    bidders: 89,
    status: 'LIVE',
    startTime: subHours(1),
    endTime: addHours(12),
    sellerName: 'Samsung Official'
  },

  // UPCOMING PRODUCTS
  {
    id: 5,
    name: 'Sony Alpha ILCE-7M4 Full-Frame Camera',
    category: 'Cameras',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Beyond basic. The next-generation hybrid camera.',
    description: 'With groundbreaking performance in both still and movie recording, the α7 IV is the ideal hybrid, providing breathtaking imagery along with on-the-spot delivery and distribution.',
    features: ['33.0 MP full-frame back-illuminated Exmor R CMOS sensor', 'BIONZ XR image processing engine', 'Up to 4K 60p 10-bit 4:2:2 video recording'],
    marketPrice: 242990,
    startingBid: 120000,
    currentBid: 0,
    bidders: 0,
    status: 'UPCOMING',
    startTime: addHours(48),
    endTime: addHours(72),
    sellerName: 'Sony Center'
  },
  {
    id: 6,
    name: 'DJI Mini 4 Pro Drone',
    category: 'Electronics',
    brand: 'DJI',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Mini to the Max.',
    description: 'DJI Mini 4 Pro is our most advanced mini camera drone to date. It integrates powerful imaging capabilities, omnidirectional obstacle sensing, and ActiveTrack 360° with the new Trace Mode.',
    features: ['Under 249 g', '4K/60fps HDR True Vertical Shooting', 'Omnidirectional Obstacle Sensing', 'Extended Battery Life'],
    marketPrice: 89990,
    startingBid: 40000,
    currentBid: 0,
    bidders: 0,
    status: 'UPCOMING',
    startTime: addHours(24),
    endTime: addHours(48),
    sellerName: 'DJI Official'
  },
  {
    id: 7,
    name: 'Asus ROG Strix G16 Gaming Laptop',
    category: 'Laptops',
    brand: 'Asus',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Raise your game. Play with style.',
    description: 'Draw more frames and win more games with the brand new ROG Strix G16. Powered by an Intel Core i7 processor and an NVIDIA GeForce RTX 4060 Laptop GPU.',
    features: ['Intel Core i7-13650HX', 'NVIDIA GeForce RTX 4060 8GB', '16GB DDR5 RAM', '1TB PCIe 4.0 NVMe M.2 SSD', '16" 165Hz FHD+ Display'],
    marketPrice: 144990,
    startingBid: 70000,
    currentBid: 0,
    bidders: 0,
    status: 'UPCOMING',
    startTime: addHours(120), // 5 days
    endTime: addHours(144),
    sellerName: 'Asus ROG Store'
  },
  {
    id: 8,
    name: 'Apple Watch Series 9',
    category: 'Accessories',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Smarter. Brighter. Mightier.',
    description: 'Apple Watch Series 9 helps you stay connected, active, healthy, and safe. Featuring double tap, a magical way to interact with Apple Watch, and an even brighter display.',
    features: ['S9 SiP', 'Double tap gesture', 'Blood Oxygen app', 'ECG app', 'Always-On Retina display up to 2000 nits'],
    marketPrice: 41900,
    startingBid: 15000,
    currentBid: 0,
    bidders: 0,
    status: 'UPCOMING',
    startTime: addHours(8),
    endTime: addHours(30),
    sellerName: 'Apple India'
  },

  // ENDED PRODUCTS
  {
    id: 9,
    name: 'Bose QuietComfort Ultra Headphones',
    category: 'Accessories',
    brand: 'Bose',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'World-class noise cancellation, quieter than ever before.',
    description: 'Breakthrough spatial audio for more immersive listening that makes your music feel more real than ever before.',
    features: ['Bose Immersive Audio', 'World-class noise cancellation', 'CustomTune technology', 'Up to 24 hours of battery life'],
    marketPrice: 35900,
    startingBid: 10000,
    currentBid: 21500,
    bidders: 156,
    status: 'ENDED',
    startTime: subHours(48),
    endTime: subHours(24),
    sellerName: 'Bose Store'
  },
  {
    id: 10,
    name: 'GoPro HERO12 Black',
    category: 'Cameras',
    brand: 'GoPro',
    image: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'The most capable GoPro ever.',
    description: 'Incredible image quality, even better HyperSmooth video stabilization and a huge boost in battery life come together in the latest and greatest GoPro.',
    features: ['5.3K60 + 4K120 resolution', 'HyperSmooth 6.0 video stabilization', 'HDR Video', 'Waterproof to 33ft (10m)'],
    marketPrice: 44990,
    startingBid: 15000,
    currentBid: 26000,
    bidders: 84,
    status: 'ENDED',
    startTime: subHours(30),
    endTime: subHours(6),
    sellerName: 'GoPro India'
  },

  // MORE LIVE PRODUCTS
  {
    id: 11,
    name: 'LG C3 55 inch 4K Smart OLED evo TV',
    category: 'Electronics',
    brand: 'LG',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Brilliant picture, powered by intelligence.',
    description: 'The LG OLED evo C-Series is powered by the a9 AI Processor Gen6—made exclusively for LG OLED—for beautiful picture and performance.',
    features: ['OLED evo', 'a9 AI Processor Gen6', 'WebOS 23', 'Dolby Vision & Dolby Atmos'],
    marketPrice: 169990,
    startingBid: 60000,
    currentBid: 92000,
    bidders: 67,
    status: 'LIVE',
    startTime: subHours(1),
    endTime: addHours(4),
    sellerName: 'LG Electronics'
  },
  {
    id: 12,
    name: 'Nintendo Switch OLED Model',
    category: 'Gaming',
    brand: 'Nintendo',
    image: 'https://images.unsplash.com/photo-1617201835175-aab7b138128e?q=80&w=600&auto=format&fit=crop',
    thumbnailImages: [
      'https://images.unsplash.com/photo-1617201835175-aab7b138128e?q=80&w=600&auto=format&fit=crop'
    ],
    shortDescription: 'Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen.',
    description: 'Meet the newest member of the Nintendo Switch family. The new system features a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, 64 GB of internal storage, and enhanced audio.',
    features: ['7-inch OLED screen', 'Wide, adjustable stand', 'Built-in wired LAN port', '64 GB internal storage'],
    marketPrice: 34990,
    startingBid: 12000,
    currentBid: 21500,
    bidders: 190,
    status: 'ENDING SOON',
    startTime: subHours(5),
    endTime: addHours(1),
    sellerName: 'Gaming Store'
  }
];

// Ensure it can be accessed globally
window.mockProductsData = mockProducts;
