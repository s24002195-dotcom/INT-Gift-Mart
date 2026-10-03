import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Phone, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#F59E0B', '#F43F5E']
    });
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleDirectWhatsApp = (e) => {
    e.stopPropagation();
    const msg = `Hi INT Gift Mart! 🎁 I want to order "${product.name}" (LKR ${product.price.toLocaleString()}). Could you please share customization details?`;
    window.open(`https://wa.me/94753259928?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative rounded-2xl p-3 sm:p-3.5 bg-[#121522]/80 hover:bg-[#151928] border border-white/10 hover:border-amber-500/40 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Media & Badges */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-white/5 mb-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/products/crop_1_3.jpg';
          }}
        />

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wide shadow-md">
              {product.badge}
            </span>
          )}
          {product.customizable && (
            <span className="px-2 py-0.5 rounded-md bg-rose-500/90 text-white font-bold text-[9px] backdrop-blur-sm shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Customizable</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-all z-10 hover:scale-110 active:scale-95"
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
        </button>

        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-amber-400/90 font-semibold tracking-wider uppercase text-[10px]">
            {product.category_name}
          </span>
          <div className="flex items-center gap-1 text-slate-300">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-bold text-[11px]">{product.rating}</span>
            <span className="text-slate-500 text-[10px]">({product.reviews_count})</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Bottom Pricing & Actions */}
      <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between gap-2">
        <div>
          <div className="text-sm sm:text-base font-extrabold text-white">
            <span className="text-amber-400 text-xs mr-0.5">LKR</span>
            {product.price.toLocaleString()}
          </div>
          {product.original_price > product.price && (
            <div className="text-[10px] text-slate-500 line-through">
              LKR {product.original_price.toLocaleString()}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* WhatsApp Direct Buy */}
          <button
            onClick={handleDirectWhatsApp}
            className="w-8 h-8 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Order directly on WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
              isAdded
                ? 'bg-emerald-500 text-slate-950 scale-105'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+ Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
