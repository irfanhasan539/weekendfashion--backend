/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Star,
  HardHat,
  Shirt,
  Watch,
  Eye,
  Zap,
  Footprints
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductDetail from './ProductDetail';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// --- Constants & Mock Data ---

const TICKER_TEXT = "[LOOP] WEEKEND SHOPPING FINAL DROP. NOT MANY SERIAL NUMBERS LEFT! ★ [LOOP] WEEKEND SHOPPING FINAL DROP. NOT MANY SERIAL NUMBERS LEFT! ★";

const CATEGORIES = [
  "CLEARANCE", "NEW ARRIVALS", "EYEWEAR", "HEADWEAR", "CLOTHING", "ACCESSORIES", "COLLABS", "ABOUT US"
];

const ICON_CATEGORIES = [
  { name: "ALL", icon: Star },
  { name: "HATS & CAPS", icon: HardHat },
  { name: "TSHIRTS", icon: Shirt },
  { name: "WATCHES", icon: Watch },
  { name: "EYEWEAR", icon: Eye },
  { name: "SHIRTS", icon: Zap },
  { name: "SHOES", icon: Footprints },
];

// --- Components ---

const Ticker = () => (
  <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
    <motion.div 
      initial={{ x: 0 }}
      animate={{ x: "-50%" }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="inline-block text-[10px] font-mono tracking-widest uppercase"
    >
      <span className="mx-4">{TICKER_TEXT}</span>
      <span className="mx-4">{TICKER_TEXT}</span>
    </motion.div>
  </div>
);

const Navbar = ({ onAdminClick }:{ onAdminClick: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Main Nav */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <div className="flex flex-col leading-none">
            <span className="text-xl md:text-3xl font-black tracking-tighter uppercase italic">WEEKEND</span>
            <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">SHOPPING</span>
          </div>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="SEARCH FOR PRODUCTS" 
              className="w-full bg-gray-50 border border-gray-200 py-3 px-4 text-xs font-medium tracking-wider focus:outline-none focus:border-black transition-colors"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-6">
          <button 
            onClick={onAdminClick}
            className="px-3 py-2 text-[11px] font-bold tracking-widest uppercase bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Admin
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User size={20} className="md:w-6 md:h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Heart size={20} className="md:w-6 md:h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingBag size={20} className="md:w-6 md:h-6" />
            <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
          </button>
        </div>
      </div>

      {/* Secondary Nav - Desktop */}
      <div className="hidden md:block border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto px-8 py-3 flex justify-center gap-8">
          {CATEGORIES.map((cat) => (
            <a 
              key={cat} 
              href="#" 
              className="text-[11px] font-bold tracking-widest hover:text-red-600 transition-colors flex items-center gap-1 group"
            >
              {cat}
              {cat === "CLOTHING" && <ChevronRight size={12} className="group-hover:rotate-90 transition-transform" />}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white md:hidden"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <span className="font-black italic text-xl">WEEKEND</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {CATEGORIES.map((cat) => (
                <a key={cat} href="#" className="text-lg font-bold tracking-tighter border-b border-gray-50 pb-2">
                  {cat}
                </a>
              ))}

              {/* Admin entry for mobile */}
              <button
                onClick={() => { setIsMobileMenuOpen(false); onAdminClick(); }}
                className="mt-4 px-4 py-3 text-sm font-bold tracking-widest uppercase bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Admin
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-[60vh] md:h-[85vh] bg-neutral-900 overflow-hidden">
    <img 
      src="/images/landingpage.jpg" 
      alt="Hero" 
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
      {/* Hero content removed as requested */}
    </div>
    
    {/* Navigation Arrows */}
    <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
      <ChevronLeft size={24} />
    </button>
    <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
      <ChevronRight size={24} />
    </button>
  </section>
);

const CategoryIcons = ({ activeFilter, setActiveFilter }:{activeFilter:string; setActiveFilter:(s:string)=>void}) => (
  <div className="py-8 md:py-12 bg-white overflow-x-auto scrollbar-hide">
    <div className="max-w-[1600px] mx-auto px-4 flex gap-6 min-w-max md:min-w-0">
      {ICON_CATEGORIES.map((cat) => {
        const IconComponent = cat.icon;
        return (
          <button
            key={cat.name}
            onClick={() => setActiveFilter(cat.name)}
            className={`flex flex-col items-center gap-2 px-4 py-2 transition-all ${activeFilter === cat.name ? 'bg-black text-white' : 'bg-transparent text-gray-700 hover:text-black'}`}
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 rounded-lg transition-all ${
              activeFilter === cat.name ? 'border-white bg-black' : 'border-gray-300 hover:border-gray-500'
            }`}>
              <IconComponent size={24} />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-center">{cat.name}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const ProductSection = ({ activeFilter, onProductClick, products }:{activeFilter:string; onProductClick:(p:any)=>void; products: any[]}) => {
  const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

  // Filter products based on selected category
  const filtered = products.filter((p) => {
    if (!activeFilter || activeFilter === 'ALL') return true;
    
    // Normalize for comparison
    const category = (p.category || '').toLowerCase().trim();
    const filter = activeFilter.toLowerCase().trim();
    
    // Exact category match
    if (category === filter) return true;
    
    // Handle special cases (e.g., "HATS & CAPS" should match "HEADWEAR")
    if (filter === 'hats & caps' && category === 'headwear') return true;
    if (filter === 'watches' && category === 'watches') return true;
    if (filter === 'eyewear' && category === 'eyewear') return true;
    if (filter === 'tshirts' && category === 'tshirts') return true;
    if (filter === 'shirts' && category === 'shirts') return true;
    if (filter === 'shoes' && category === 'shoes') return true;
    
    return false;
  });

  // Remove duplicates based on product ID
  const uniqueFiltered = Array.from(new Map(filtered.map(item => [item.id, item])).values());

  return (
    <section className="pb-20 bg-white px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        {uniqueFiltered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-bold tracking-widest uppercase mb-4">
              No products found in this category
            </p>
            <p className="text-sm text-gray-400">Check back soon for new items!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {uniqueFiltered.map((product) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                  <Heart size={18} />
                </button>
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-black px-2 py-1 tracking-tighter">
                    {product.tag}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase line-clamp-1 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm font-black">{formatter.format(product.price)}</p>
                <p className="text-[9px] md:text-[10px] text-gray-600 font-medium line-clamp-2">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
            </div>

            <div className="mt-16 flex justify-center">
              <button className="flex items-center gap-2 text-xs font-black tracking-widest border-b-2 border-black pb-1 hover:gap-4 transition-all">
                VIEW ALL PRODUCTS <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black text-white pt-20 pb-10 px-4 md:px-8">
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col leading-none mb-8">
            <span className="text-4xl font-black tracking-tighter uppercase italic">WEEKEND</span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">SHOPPING</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed mb-8">
            Redefining street fashion through limited edition drops and premium craftsmanship. 
            Join the movement.
          </p>
          <div className="flex gap-6">
            <Instagram className="hover:text-red-600 cursor-pointer transition-colors" />
            <Facebook className="hover:text-red-600 cursor-pointer transition-colors" />
            <Twitter className="hover:text-red-600 cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="font-black text-xs tracking-widest uppercase mb-6">SUPPORT</h4>
          <ul className="space-y-4 text-gray-400 text-xs font-bold tracking-widest">
            <li className="hover:text-white cursor-pointer">TRACK ORDER</li>
            <li className="hover:text-white cursor-pointer">RETURNS & EXCHANGES</li>
            <li className="hover:text-white cursor-pointer">SHIPPING POLICY</li>
            <li className="hover:text-white cursor-pointer">CONTACT US</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-xs tracking-widest uppercase mb-6">NEWSLETTER</h4>
          <div className="flex border-b border-white/30 pb-2">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-transparent flex-1 text-xs focus:outline-none"
            />
            <button className="text-xs font-black tracking-widest hover:text-red-600 transition-colors">
              JOIN
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold tracking-widest text-gray-500">
          © 2026 WEEKEND SHOPPING. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8 text-[10px] font-bold tracking-widest text-gray-500">
          <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
          <span className="hover:text-white cursor-pointer">TERMS OF SERVICE</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<any|null>(null);
  const [adminMode, setAdminMode] = useState<'home' | 'login' | 'dashboard'>('home');
  const [adminUser, setAdminUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const apiUrl = process.env.VITE_API_URL || 'https://weekendfashion-backend.onrender.com/api';
        const response = await fetch(`${apiUrl}/products`);
        if (response.ok) {
          const backendProducts = await response.json();
          // Only use backend products - no mock data mixing
          const formattedProducts = backendProducts.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.category,
            tag: p.tag || 'NEW ARRIVAL',
            description: p.description,
            image: p.image_path.startsWith('http') 
              ? p.image_path 
              : `https://weekendfashion-backend.onrender.com${p.image_path}`
          }));
          setProducts(formattedProducts);
        } else {
          console.error('Failed to fetch products');
          setProducts([]);
        }
      } catch (error) {
        console.error('Backend not available:', error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []); // Run only once on component mount

  // If admin logged in, show dashboard
  if (adminMode === 'dashboard' && adminUser) {
    return (
      <AdminDashboard 
        user={adminUser}
        onLogout={() => {
          setAdminMode('home');
          setAdminUser(null);
          // Refresh products after admin logout
          window.location.reload();
        }}
      />
    );
  }

  // If admin login page
  if (adminMode === 'login') {
    return (
      <AdminLogin
        onLoginSuccess={(user) => {
          setAdminUser(user);
          setAdminMode('dashboard');
        }}
        onCancel={() => setAdminMode('home')}
      />
    );
  }

  // If a product is selected, show the product detail page
  if (selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <Ticker />
      <Navbar onAdminClick={() => setAdminMode('login')} />
      <main>
        <Hero />
        <CategoryIcons activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <ProductSection activeFilter={activeFilter} onProductClick={setSelectedProduct} products={products} />
        
        {/* Secondary Banner */}
        <section className="h-[50vh] md:h-[70vh] relative overflow-hidden bg-gray-900">
          <img 
            src="/images/landingpage.jpg" 
            alt="Banner" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-6">
                THE ACCESSORIES<br />COLLECTION
              </h2>
              <button className="bg-white text-black px-8 py-3 text-[10px] font-black tracking-widest hover:bg-black hover:text-white transition-all">
                SHOP NOW
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
