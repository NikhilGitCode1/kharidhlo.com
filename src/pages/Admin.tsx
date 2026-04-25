import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingBag, 
  Plus, 
  Search, 
  MoreVertical, 
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Edit
} from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { profile, loading: authLoading, isAdmin } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubscribe = onSnapshot(query(collection(db, 'products'), orderBy('createdAt', 'desc')), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  if (authLoading) return <div className="p-20 text-center">Checking Authorization...</div>;
  if (!isAdmin) return <Navigate to="/" />;

  const stats = [
    { label: 'Total Sales', value: '$84,250', icon: BarChart3, color: 'text-purple-400', trend: '+12.5%', isUp: true },
    { label: 'Active Orders', value: '1,240', icon: ShoppingBag, color: 'text-pink-400', trend: '+5.2%', isUp: true },
    { label: 'Total Users', value: '45.2K', icon: Users, color: 'text-indigo-400', trend: '-2.1%', isUp: false },
    { label: 'Products', value: products.length.toString(), icon: Package, color: 'text-blue-400', trend: '+1.4%', isUp: true },
  ];

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-bold">Admin Console</h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Command Center & Analytics</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold flex items-center space-x-2 hover:scale-105 transition-all">
          <Plus className="w-5 h-5" />
          <span>New Product</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl border-white/5 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend}
                {stat.isUp ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
              <div className="text-3xl font-display font-bold">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Management Table */}
      <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-xl font-display font-bold text-gradient">Inventory Management</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Filter inventory..."
              className="pl-10 pr-4 py-2 rounded-xl glass border-white/5 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-8 py-6">Product</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Price</th>
                <th className="px-8 py-6">Stock</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl glass p-2 flex items-center justify-center overflow-hidden">
                        <img src={product.images[0]} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-sm">{product.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-medium text-xs text-purple-400 uppercase tracking-widest">{product.category}</td>
                  <td className="px-8 py-6 font-bold">${product.price}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <span className="text-sm font-medium">{product.stock} units</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {loading && <div className="p-20 text-center text-slate-500">Decrypting Inventory...</div>}
      </div>
    </div>
  );
}
