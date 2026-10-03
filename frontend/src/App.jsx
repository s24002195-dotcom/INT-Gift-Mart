import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleCanvas from './components/ParticleCanvas';
import DeliveryJourney3D from './components/DeliveryJourney3D';
import GiftMatcher from './components/GiftMatcher';
import CustomStudio from './components/CustomStudio';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ReviewsSection from './components/ReviewsSection';
import AdminModal from './components/AdminModal';
import AuthModal from './components/AuthModal';
import InquiryModal from './components/InquiryModal';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import staticProducts from './data/products.json';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Filter, RefreshCcw } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState(staticProducts);
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All Gifts', count: staticProducts.length },
    { id: 'bouquets', name: 'Bouquets & Flowers', count: 16 },
    { id: 'frames_4d', name: '4D Light Frames', count: 8 },
    { id: 'spotify_qr', name: 'Spotify & QR Frames', count: 5 },
    { id: 'jhumkas', name: 'Jhumkas Jewelry Boxes', count: 3 },
    { id: 'art_drawings', name: 'Art Portraits', count: 6 },
    { id: 'hampers', name: 'Gift Hampers', count: 4 },
    { id: 'cards_polaroids', name: 'Cards & Polaroids', count: 4 },
    { id: 'puzzles', name: 'Puzzles & Magazines', count: 3 }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(12000);
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  // Secret admin trigger listeners: Ctrl+Shift+A or #admin in URL
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
        // Clear hash to keep clean
        history.replaceState(null, null, ' ');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const fetchLiveProducts = () => {
    fetch('/api/products')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchLiveProducts();

    // Try fetching categories from backend
    fetch('/api/categories')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  // Filter and sort products
  let filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
    const priceMatch = p.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  if (sortBy === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else {
    // featured: bestsellers & most reviews first
    filteredProducts.sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0));
  }

  return (
    <div className="min-h-screen bg-[#08090f] text-slate-100 relative selection:bg-amber-500 selection:text-black">
      {/* Background Interactive Stardust */}
      <ParticleCanvas />

      {/* Navigation Header */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4">
        {/* 1. Hero Section with 3D Unboxing Box */}
        <Hero
          onExploreCatalog={() => {
            const el = document.getElementById('catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenStudio={() => {
            const el = document.getElementById('studio');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Interactive 3D Courier Delivery, Handover, Unboxing & 5-Star Reaction */}
        <DeliveryJourney3D
          onOrderNow={() => {
            const el = document.getElementById('catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Interactive Magic Gift Matcher Quiz */}
        <GiftMatcher
          products={products}
          onSelectProduct={(p) => setQuickViewProduct(p)}
        />

        {/* 4. Live Custom Gift Studio (Spotify & Voice QR & Bouquet Builder) */}
        <CustomStudio />

        {/* 5. Complete Catalog Section */}
        <section id="catalog" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Catalog Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handcrafted Gift Boutique</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Explore The Complete Collection
              </h2>
              <p className="text-slate-400 text-sm">
                Each product is meticulously handcrafted with love and delivered across Sri Lanka in pristine gift packaging.
              </p>
            </div>

            {/* Category Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none justify-start lg:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-black/30 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Filter & Sort Controls Bar */}
            <div className="my-6 p-4 rounded-2xl bg-[#121522]/90 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Price Slider */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Max Price:</span>
                </span>
                <input
                  type="range"
                  min="350"
                  max="12000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full md:w-48 accent-amber-500"
                />
                <span className="text-xs font-extrabold text-amber-400 font-mono shrink-0">
                  LKR {maxPrice.toLocaleString()}
                </span>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <span className="text-xs text-slate-400 font-medium">
                  Showing <strong className="text-white">{filteredProducts.length}</strong> gifts
                </span>
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="featured">Featured / Most Popular</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Highest Rated ★</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-sm text-slate-400">No gifts found matching your price criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setMaxPrice(12000);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-semibold flex items-center gap-1.5 mx-auto"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* 6. Customer Reviews Section */}
        <ReviewsSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Modals and Drawers */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <CartDrawer
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={(order) => {
          setIsCheckoutOpen(false);
          setOrderSuccessData(order);
        }}
      />

      <OrderSuccessModal
        order={orderSuccessData}
        onClose={() => setOrderSuccessData(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Secret Password-Protected Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshProducts={fetchLiveProducts}
      />

      {/* User Email / Mobile Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

    </div>
  );
}
