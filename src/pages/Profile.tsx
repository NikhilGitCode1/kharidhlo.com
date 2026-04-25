import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, Package, LogOut, Settings, Bell } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, profile, loading, logout } = useAuth();

  if (loading) return <div className="p-20 text-center">Loading Profile Data...</div>;
  if (!user) return <Navigate to="/" />;

  const mockOrders = [
    { id: 'ORD-8274', date: '2024-03-15', status: 'Delivered', total: 299.99, items: 2 },
    { id: 'ORD-9102', date: '2024-04-02', status: 'Processing', total: 159.99, items: 1 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 space-y-12">
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass rounded-[3rem] p-10 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 -z-10" />
             
             <div className="flex flex-col items-center text-center space-y-6 pt-12">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl relative z-10 scale-110">
                    <img src={profile?.photoURL || user.photoURL || ''} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="space-y-1">
                  <h2 className="text-3xl font-display font-bold">{profile?.displayName}</h2>
                  <div className="flex items-center justify-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>Member since April 2024</span>
                  </div>
                </div>
             </div>

             <div className="space-y-4 pt-8">
                <div className="flex items-center space-x-4 p-4 glass rounded-2xl border-white/5">
                  <div className="p-2.5 rounded-xl bg-white/5 text-slate-400"><Mail className="w-5 h-5" /></div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</div>
                    <div className="text-sm font-medium truncate">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 glass rounded-2xl border-white/5">
                  <div className="p-2.5 rounded-xl bg-white/5 text-slate-400"><Calendar className="w-5 h-5" /></div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Joined On</div>
                    <div className="text-sm font-medium">April 25, 2024</div>
                  </div>
                </div>
             </div>

             <div className="pt-8 space-y-3">
               <button className="w-full py-4 rounded-2xl glass border-white/5 flex items-center justify-center space-x-3 text-sm font-bold hover:bg-white/5 transition-all">
                 <Settings className="w-4 h-4" />
                 <span>Account Settings</span>
               </button>
               <button 
                onClick={() => logout()}
                className="w-full py-4 rounded-2xl glass border-white/5 flex items-center justify-center space-x-3 text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all"
               >
                 <LogOut className="w-4 h-4" />
                 <span>Sign Out</span>
               </button>
             </div>
          </div>
        </div>

        {/* Orders & Activity */}
        <div className="lg:col-span-2 space-y-12">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-display font-bold">Order History</h3>
            <button className="p-3 rounded-full glass border-white/5 hover:bg-white/5 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-brand-primary rounded-full border-2 border-slate-950" />
            </button>
          </div>

          <div className="space-y-6">
            {mockOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 group"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-2xl glass border-white/10 flex items-center justify-center text-slate-400 group-hover:text-purple-400 transition-colors">
                    <Package className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-display font-bold">Order #{order.id}</h4>
                    <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                      <span>{order.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span>{order.items} Items</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2">
                   <div className="text-2xl font-bold font-display">${order.total}</div>
                   <div className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                     {order.status}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass rounded-[3rem] p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent -z-10" />
            <div className="space-y-2">
              <h4 className="text-2xl font-display font-bold">Discover More.</h4>
              <p className="text-slate-500 max-w-sm mx-auto">Based on your previous interactions, we've curated a new set of futuristic essentials.</p>
            </div>
            <button className="px-8 py-3.5 rounded-2xl glass border-white/10 font-bold hover:scale-105 transition-all">
              See Curated Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
