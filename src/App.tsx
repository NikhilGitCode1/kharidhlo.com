/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { useEffect } from 'react';
import { seedDatabase } from './lib/seed';

function SeedManager() {
  const { isAdmin, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && isAdmin) {
      seedDatabase();
    }
  }, [isAdmin, loading]);

  return null;
}

// Layout wrapper
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {children}
      </main>
      <footer className="py-12 border-t border-white/5 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Kharidlo.com. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SeedManager />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
