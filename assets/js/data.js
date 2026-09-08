// Mock Data for PICKURS.in

const mockProducts = {
  liveAuctions: [
    {
      id: 'L001',
      title: 'Apple iPhone 15 Pro Max - 256GB',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
      category: 'Mobiles',
      retailPrice: '₹1,59,900',
      currentBid: '₹84,500',
      timeLeft: '02:45:10',
      bidders: 45
    },
    {
      id: 'L002',
      title: 'Sony PlayStation 5 Console',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop',
      category: 'Gaming',
      retailPrice: '₹54,990',
      currentBid: '₹28,200',
      timeLeft: '00:15:30',
      bidders: 112
    },
    {
      id: 'L003',
      title: 'MacBook Pro 14" M3 Pro',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
      category: 'Laptops',
      retailPrice: '₹1,99,900',
      currentBid: '₹1,15,000',
      timeLeft: '05:20:00',
      bidders: 28
    },
    {
      id: 'L004',
      title: 'Samsung Galaxy S24 Ultra',
      image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop',
      category: 'Mobiles',
      retailPrice: '₹1,29,999',
      currentBid: '₹65,000',
      timeLeft: '01:10:45',
      bidders: 89
    }
  ],
  
  upcomingAuctions: [
    {
      id: 'U001',
      title: 'Sony Alpha ILCE-7M4 Full-Frame Camera',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
      category: 'Electronics',
      retailPrice: '₹2,42,990',
      startingBid: '₹50,000',
      startDate: 'Starts in 2 Days',
      watchers: 245
    },
    {
      id: 'U002',
      title: 'DJI Mini 4 Pro Drone',
      image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=600&auto=format&fit=crop',
      category: 'Electronics',
      retailPrice: '₹89,990',
      startingBid: '₹20,000',
      startDate: 'Starts Tomorrow, 5 PM',
      watchers: 156
    },
    {
      id: 'U003',
      title: 'Asus ROG Strix G16 Gaming Laptop',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop',
      category: 'Laptops',
      retailPrice: '₹1,44,990',
      startingBid: '₹40,000',
      startDate: 'Starts Oct 15, 10 AM',
      watchers: 310
    },
    {
      id: 'U004',
      title: 'Apple Watch Series 9',
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop',
      category: 'Wearables',
      retailPrice: '₹41,900',
      startingBid: '₹10,000',
      startDate: 'Starts Oct 16, 2 PM',
      watchers: 189
    }
  ]
};

const mockCategories = [
  { id: 'c1', name: 'Mobiles', icon: 'bi-phone' },
  { id: 'c2', name: 'Laptops', icon: 'bi-laptop' },
  { id: 'c3', name: 'Electronics', icon: 'bi-camera' },
  { id: 'c4', name: 'Gaming', icon: 'bi-controller' },
  { id: 'c5', name: 'Wearables', icon: 'bi-smartwatch' },
  { id: 'c6', name: 'Accessories', icon: 'bi-headphones' }
];

const mockReviews = [
  {
    id: 'r1',
    user: 'Rahul S.',
    product: 'iPhone 15 Pro',
    winPrice: '₹75,000',
    rating: 5,
    comment: 'Unbelievable! I won a brand new iPhone for almost half the price. Smooth delivery process.',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: 'r2',
    user: 'Priya M.',
    product: 'Dyson Airwrap',
    winPrice: '₹18,500',
    rating: 5,
    comment: 'My first time bidding and I won! The product is 100% genuine and sealed. Highly recommended.',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 'r3',
    user: 'Amit K.',
    product: 'PS5 Console',
    winPrice: '₹29,000',
    rating: 4,
    comment: 'Thrilling experience. You need strategy but the savings are massive. Great platform.',
    avatar: 'https://i.pravatar.cc/150?img=33'
  }
];
