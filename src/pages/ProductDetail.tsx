import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingBag, Heart, Check } from 'lucide-react';
import { MOCK_PRODUCTS } from '../lib/mock-data';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return <div className="p-20 text-center">Product not found.</div>;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 space-y-24">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Product Images */}
        <div className="space-y-8 sticky top-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] glass rounded-[3rem] p-12 bg-white/5 border-white/5 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
            <img 
              src={product.images[activeImg]} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-700" 
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`aspect-square glass rounded-2xl p-4 overflow-hidden group transition-all ${activeImg === idx ? 'border-purple-500 border-2 bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
              >
                <img src={img} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="px-5 py-1.5 rounded-full glass border-white/10 text-[10px] font-bold uppercase tracking-widest text-purple-400">
                {product.category}
              </span>
              <div className="flex items-center space-x-1.5 px-3 py-1 transparent-glass rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span>{product.rating}</span>
                <span className="text-slate-500 ml-1">({product.reviewCount} Reviews)</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-tight tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline space-x-6">
              <span className="text-5xl font-bold">${product.discountPrice || product.price}</span>
              {product.discountPrice && (
                <span className="text-2xl text-slate-500 line-through">${product.price}</span>
              )}
              <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold animate-pulse">In Stock</span>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="glass p-6 rounded-2xl border-white/5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{key}</div>
                <div className="font-bold">{val as string}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex-1 group py-6 rounded-[2rem] font-bold text-lg flex items-center justify-center space-x-3 transition-all active:scale-95 ${isAdding ? 'bg-green-500 text-white' : 'bg-white text-slate-950 hover:shadow-2xl hover:shadow-white/20'}`}
            >
              {isAdding ? (
                <>
                  <Check className="w-6 h-6 animate-bounce" />
                  <span>Added to Collection</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-6 h-6" />
                  <span>Secure for ${product.discountPrice || product.price}</span>
                </>
              )}
            </button>
            <button className="px-8 py-6 rounded-[2rem] glass border-white/10 hover:bg-white/5 flex items-center justify-center transition-all">
              <Heart className="w-6 h-6 text-pink-500" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 py-12 border-y border-white/5">
            {[
              { icon: Truck, label: 'Global Shipping' },
              { icon: ShieldCheck, label: '2-Year Warranty' },
              { icon: RotateCcw, label: '30-Day Returns' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center space-y-3 text-center">
                <div className="p-4 rounded-2xl glass-dark border-white/5">
                  <feature.icon className="w-6 h-6 text-slate-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation Slot */}
      <section className="space-y-12">
        <h3 className="text-3xl font-display font-bold">You Might Also Adore</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.filter(p => p.id !== id).slice(0, 4).map((p) => (
            <Link to={`/product/${p.id}`} key={p.id} className="glass-card group p-6 space-y-4">
              <div className="aspect-square bg-white/5 rounded-2xl p-6 overflow-hidden">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500" />
              </div>
              <div>
                <h4 className="font-bold truncate">{p.name}</h4>
                <div className="text-slate-400 text-sm font-medium">${p.discountPrice || p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
