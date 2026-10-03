import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Phone, Sparkles, User, UserCheck, Menu, X, Upload, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenSearch, onOpenInquiry, onOpenAuth }) {
  const { totalItemsCount, setIsCartOpen, wishlist, shopLogo, updateShopLogo, currentUser } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0c13]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      {/* Top micro-announcement banner */}
      {!isScrolled && (
        <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-4 pb-2 text-xs text-amber-300/80 border-b border-white/5 font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>✨ 🇱🇰 Island-wide Delivery in Sri Lanka • 100% Customized Handcrafted Gifts</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href="https://wa.me/94753259928?text=Hi%20INT%20Gift%20Mart,%20I'd%20like%20to%20inquire%20about%20a%20gift!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +94 75 325 9928</span>
            </a>
            <span className="text-white/20">|</span>
            <button 
              onClick={onOpenAuth} 
              className="text-xs text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              {currentUser ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-white font-medium">{currentUser.name}</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Customer Sign In</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo (Official Display-Only with Blue BG & Golden-Pink 3D Shaded Glow) */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 shadow-xl shadow-rose-500/20 group-hover:shadow-amber-400/40 group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="w-full h-full rounded-[14px] bg-[#0b132b] flex items-center justify-center overflow-hidden">
                <img
                  src={shopLogo}
                  alt="INT Gift Mart Logo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/images/logo.jpg';
                  }}
                />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0a0c13] rounded-full flex items-center justify-center text-[8px] text-white pointer-events-none shadow-md">
              ✓
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>INT</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 font-serif italic">
                Gift Mart
              </span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-amber-300/70 font-semibold">
              Where Memories Turn To Magic
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
          <a href="#catalog" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <span>Catalog</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">
              45+
            </span>
          </a>
          <a href="#delivery-journey" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-300">
            <Truck className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>3D Unboxing</span>
          </a>
          <a href="#matcher" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Gift Matcher</span>
          </a>
          <a href="#studio" className="hover:text-amber-400 transition-colors">
            Custom Studio
          </a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">
            Reviews
          </a>
          <button
            onClick={onOpenInquiry}
            className="hover:text-amber-400 transition-colors text-slate-300"
          >
            Custom Order
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-amber-500/40 transition-all"
            title="Search Gifts"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Customer Auth Button (Mobile & Desktop) */}
          <button
            onClick={onOpenAuth}
            className={`h-10 px-3 rounded-full flex items-center gap-2 border transition-all text-xs font-semibold ${
              currentUser
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title={currentUser ? `Logged in as ${currentUser.name}` : "Sign In with Mobile or Email"}
          >
            {currentUser ? (
              <>
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name}</span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Sign In</span>
              </>
            )}
          </button>

          {/* Wishlist Indicator */}
          <a
            href="#catalog"
            className="relative w-10 h-10 rounded-full hidden md:flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-rose-400 hover:bg-white/10 transition-all"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center shadow-lg">
                {wishlist.length}
              </span>
            )}
          </a>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 sm:px-4 py-2 rounded-full flex items-center gap-2 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-slate-900 font-extrabold text-xs animate-bounce">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e111c] border-b border-white/10 px-6 py-5 mt-2 space-y-4">
          <nav className="flex flex-col gap-3 text-base font-medium">
            <a 
              href="#catalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-amber-400 py-1"
            >
              🎁 All Gifts Catalog (45 Items)
            </a>
            <a 
              href="#delivery-journey" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-300 hover:text-amber-200 py-1 flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>3D Delivery & Unboxing Journey</span>
            </a>
            <a 
              href="#matcher" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-amber-400 py-1 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Magic Gift Matcher Quiz</span>
            </a>
            <a 
              href="#studio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-amber-400 py-1"
            >
              🎨 Custom Gift Studio (Spotify & QR Frames)
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-amber-400 py-1"
            >
              ⭐️ Customer Testimonials
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="text-left text-slate-200 hover:text-amber-400 py-1"
            >
              💌 Request Special Customization
            </button>
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-2 font-medium text-xs"
            >
              <User className="w-4 h-4" />
              <span>{currentUser ? `Account: ${currentUser.name}` : 'Customer Sign In / Register'}</span>
            </button>
            <a
              href="https://wa.me/94753259928?text=Hi%20INT%20Gift%20Mart,%20I'd%20like%20to%20order!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-2 font-medium text-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Chat on WhatsApp (+94 75 325 9928)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
