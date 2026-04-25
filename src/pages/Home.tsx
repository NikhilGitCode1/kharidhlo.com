import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../lib/mock-data';

export default function Home() {
  const { addItem } = useCart();
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isFeatured);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-bold tracking-widest uppercase text-purple-400">
              <span>Future of Commerce</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-display font-extrabold leading-[1.1] tracking-tight">
              Elegance in <br />
              <span className="text-gradient">Every Pixel.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Experience the next generation of premium shopping. Hand-picked products, curated for those who seek the extraordinary.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/shop" className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold hover:scale-105 transition-all shadow-xl shadow-white/10">
                Explore Collection
              </Link>
              <Link to="/about" className="flex items-center space-x-2 text-sm font-semibold group">
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 glass rounded-full p-2 aspect-square flex items-center justify-center border-white/5 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
                  alt="Hero Product" 
                  className="w-4/5 h-4/5 object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-110 transition-transform duration-700"
                />
            </div>
            {/* Floating metrics */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 -right-4 p-6 glass rounded-2xl border-white/10 z-20 space-y-1"
            >
              <div className="text-xs text-slate-400 font-bold">Total Sales</div>
              <div className="text-2xl font-display font-bold">12.4K</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold">Curated Categories</h2>
            <p className="text-slate-400 max-w-sm">From precision electronics to timeless fashion, discover quality across all dimensions.</p>
          </div>
          <Link to="/categories" className="text-sm font-bold flex items-center space-x-2 hover:text-purple-400 transition-colors">
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl glass border-white/5 cursor-pointer"
            >
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 space-y-2">
                <h3 className="text-2xl font-display font-bold">{cat.name}</h3>
                <p className="text-xs text-slate-400 font-medium">Explore {cat.name} &rarr;</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spotlight Products */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <h2 className="text-4xl font-display font-bold text-center">Spotlight Products</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card group overflow-hidden"
            >
              <div className="aspect-[4/5] relative overflow-hidden p-8 bg-white/5">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-6 right-6 flex flex-col space-y-4">
                  <button className="p-3 rounded-full glass border-white/10 hover:bg-white/20 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => addItem(product)}
                    className="p-3 rounded-full glass border-white/10 hover:bg-brand-primary transition-colors hover:text-white"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center space-x-1 px-3 py-1 transparent-glass rounded-full text-[10px] font-bold">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span>{product.rating}</span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-widest">{product.category}</div>
                  <h3 className="text-xl font-display font-bold">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">${product.discountPrice || product.price}</span>
                    {product.discountPrice && (
                      <span className="text-sm text-slate-500 line-through">${product.price}</span>
                    )}
                  </div>
                  <Link to={`/product/${product.id}`} className="text-xs font-bold border-b border-white/20 pb-0.5 hover:border-white transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[3rem] p-12 lg:p-24 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -z-10" />
          <h2 className="text-4xl lg:text-5xl font-display font-bold">Stay Ahead of the Curve</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Subscribe to our newsletter and be the first to know about new arrivals, exclusive drops, and futuristic limited editions.</p>
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-2xl glass border-white/10 focus:outline-none focus:border-purple-500 transition-colors" 
            />
            <button className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold hover:scale-105 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
