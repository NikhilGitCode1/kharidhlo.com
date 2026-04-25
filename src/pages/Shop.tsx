import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ShoppingBag, Star, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../lib/mock-data';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function Shop() {
  const { addItem } = useCart();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, selectedCategory, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-display font-bold">The Marketplace.</h1>
          <p className="text-slate-400">Discover premium products curated for the modern world.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="pl-14 pr-6 py-4 rounded-2xl glass border-white/5 focus:outline-none focus:border-purple-500 w-full md:w-80 transition-all shadow-xl shadow-black/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-4 rounded-2xl glass border-white/5 hover:bg-white/10 transition-colors"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Filters Sidebar */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 1024) && (
            <motion.aside 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Categories</h3>
                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className={`text-left text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}
                  >
                    All Collections
                  </button>
                  {MOCK_CATEGORIES.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`text-left text-sm font-medium transition-colors ${selectedCategory === cat.slug ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Price Range</h3>
                  <span className="text-xs font-bold">${priceRange}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-purple-500 bg-white/5 h-1 rounded-full appearance-none"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-600">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing <span className="text-white font-bold">{filteredProducts.length}</span> results</p>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
              <span>Sort by:</span>
              <select className="bg-transparent border-none focus:ring-0 text-white cursor-pointer group hover:text-purple-400 transition-colors">
                <option value="popular">Popularity</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card group overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden p-8 bg-white/5">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 rounded-xl glass border-white/10 hover:bg-white/20 transition-colors">
                      <Heart className="w-4 h-4 text-slate-300" />
                    </button>
                    <button 
                      onClick={() => addItem(product)}
                      className="p-2.5 rounded-xl glass border-white/10 hover:bg-brand-primary transition-colors hover:border-brand-primary"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 px-2.5 py-1 transparent-glass rounded-full text-[9px] font-bold">
                    <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{product.category}</div>
                    <h3 className="text-lg font-display font-bold truncate leading-tight">{product.name}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-bold">${product.discountPrice || product.price}</span>
                      {product.discountPrice && (
                        <span className="text-xs text-slate-500 line-through">${product.price}</span>
                      )}
                    </div>
                    <Link to={`/product/${product.id}`} className="text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-0.5 hover:border-white transition-colors">
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-40 glass rounded-[3rem] space-y-4">
              <Search className="w-12 h-12 text-slate-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xl font-bold">No products found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your filters or search keywords to find what you're looking for.</p>
              </div>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('all'); setPriceRange(1000); }}
                className="text-sm font-bold text-purple-400"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
