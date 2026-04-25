export const MOCK_CATEGORIES = [
  { id: '1', name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Home & Living', slug: 'home-living', image: 'https://images.unsplash.com/photo-1484101403033-571067250931?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Beauty', slug: 'beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=400' },
];

export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: 'Nebula Pro Gen 3',
    description: 'Experience pure immersive sound with active noise cancellation and 40-hour battery life. Featuring custom titanium drivers for audiophile-grade clarity.',
    price: 349.99,
    discountPrice: 299.99,
    category: 'electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
    rating: 4.8,
    reviewCount: 1250,
    specifications: { 'Battery': '40 Hours', 'Weight': '250g', 'Connectivity': 'Bluetooth 5.2' },
    stock: 50,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    name: 'Aether 24" Curved Monitor',
    description: 'Ultra-thin bezel, 165Hz refresh rate, and HDR10 support. Perfect for gaming and professional creative work.',
    price: 499.99,
    discountPrice: 449.99,
    category: 'electronics',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800'],
    rating: 4.9,
    reviewCount: 850,
    specifications: { 'Refresh Rate': '165Hz', 'Panel': 'IPS', 'Resolution': '1440p' },
    stock: 20,
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p3',
    name: 'Quantum Minimalist Watch',
    description: 'Sustainable materials meet precision engineering. A timepiece designed for the modern minimalist.',
    price: 199.99,
    discountPrice: 159.99,
    category: 'fashion',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'],
    rating: 4.7,
    reviewCount: 420,
    specifications: { 'Movement': 'Quartz', 'Waterproof': '50m', 'Strap': 'Recycled Leather' },
    stock: 100,
    isFeatured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p4',
    name: 'Lumina Smart Lamp',
    description: 'Control your ambiance with 16 million colors and voice integration. Energy efficient and sleek design.',
    price: 89.99,
    discountPrice: 74.99,
    category: 'home-living',
    images: ['https://images.unsplash.com/photo-1507412895525-46729b740523?auto=format&fit=crop&q=80&w=800'],
    rating: 4.6,
    reviewCount: 230,
    specifications: { 'Lumens': '800lm', 'Connectivity': 'Wi-Fi', 'Voice': 'Alexa/Google' },
    stock: 75,
    isFeatured: true,
    createdAt: new Date().toISOString()
  }
];
