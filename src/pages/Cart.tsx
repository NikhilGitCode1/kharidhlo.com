import { Heart, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, count } = useCart();
  const shipping = total > 500 ? 0 : 25;
  const grandTotal = total + shipping;

  if (count === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center space-y-8">
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl animate-pulse" />
          <ShoppingBag className="w-full h-full text-slate-700 relative z-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold">Your cart is empty.</h1>
          <p className="text-slate-500">Seems like you haven't added anything to your futuristic collection yet.</p>
        </div>
        <Link to="/shop" className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold hover:scale-105 transition-all">
          <span>Start Shopping</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 space-y-12">
      <h1 className="text-5xl font-display font-bold">Your Basket<span className="text-purple-500">.</span></h1>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-6 flex flex-col md:flex-row gap-8 group"
              >
                <div className="w-full md:w-48 aspect-square glass rounded-2xl p-6 bg-white/5 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-2 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-display font-bold">{item.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">${item.discountPrice || item.price} each</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center glass rounded-xl border-white/5 p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-2xl font-bold">
                      ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="space-y-8">
          <div className="glass rounded-[2rem] p-10 space-y-8 bg-white/5 border-white/10 sticky top-32">
            <h3 className="text-2xl font-display font-bold">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Subtotal</span>
                <span className="text-white font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Shipping</span>
                <span className="text-white font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left">Total Amount</div>
                  <div className="text-4xl font-display font-bold">${grandTotal.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <button className="w-full py-5 rounded-2xl bg-white text-slate-950 font-bold text-lg hover:scale-[1.02] shadow-xl shadow-white/10 active:scale-95 transition-all">
              Proceed to Checkout
            </button>
            
            <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Secure Checkout Enabled</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
