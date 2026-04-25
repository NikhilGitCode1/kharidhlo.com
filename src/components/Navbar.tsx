import React from 'react';
import { ShoppingCart, LogIn, User, Search, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, profile, signInWithGoogle, logout, isAdmin } = useAuth();
  const { count } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="nav-blur h-20 flex items-center justify-between px-6 lg:px-12">
      <Link to="/" className="text-3xl font-display font-extrabold tracking-tighter text-gradient">
        Kharidlo<span className="text-white">.com</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/shop" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Shop</Link>
        <Link to="/categories" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Categories</Link>
        
        <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
          <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>
          
          <button className="p-2 text-slate-300 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-white/40 transition-colors">
                  <img src={profile?.photoURL || user.photoURL || ''} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{profile?.displayName?.split(' ')[0]}</span>
              </Link>
              {isAdmin && (
                <Link to="/admin" className="p-2 text-slate-300 hover:text-white transition-colors" title="Admin Panel">
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
              )}
              <button 
                onClick={() => logout()}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signInWithGoogle()}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-slate-950/95 backdrop-blur-xl z-[60] flex flex-col p-8 space-y-8 md:hidden"
          >
            <Link to="/shop" onClick={() => setIsOpen(false)} className="text-2xl font-semibold">Shop</Link>
            <Link to="/categories" onClick={() => setIsOpen(false)} className="text-2xl font-semibold">Categories</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="text-2xl font-semibold flex items-center">
              Cart ({count})
            </Link>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-2xl font-semibold">Profile</Link>
                {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="text-2xl font-semibold">Admin Panel</Link>}
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-2xl font-semibold text-left text-red-500">Logout</button>
              </>
            ) : (
              <button 
                onClick={() => { signInWithGoogle(); setIsOpen(false); }} 
                className="w-full py-4 rounded-2xl bg-white text-slate-950 font-bold"
              >
                Login with Google
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
