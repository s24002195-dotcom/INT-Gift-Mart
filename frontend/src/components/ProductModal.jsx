import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Phone, Sparkles, Check, Truck, ShieldCheck, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;
  return <ProductModalContent key={product.id} product={product} onClose={onClose} />;
}

function ProductModalContent({ product, onClose }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    product.options && product.options.length > 0 ? product.options[0].label : null
  );
  const [customText, setCustomText] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = selectedOption && product.options?.find(o => o.label === selectedOption)?.price
    ? product.options.find(o => o.label === selectedOption).price
    : product.price;

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedOption,
      customText ? { "Personal Note": customText } : null
    );
    setIsAdded(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#F43F5E']
    });
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleWhatsAppBuy = () => {
    const optStr = selectedOption ? ` (${selectedOption})` : '';
    const noteStr = customText ? ` | Custom Note: "${customText}"` : '';
    const msg = `Hi INT Gift Mart! 🎁 I would like to order: "${product.name}"${optStr} x${quantity} for LKR ${(currentPrice * quantity).toLocaleString()}${noteStr}. Please let me know how to proceed!`;
    window.open(`https://wa.me/94753259928?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#0f121d] border border-white/15 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Container */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center bg-slate-950/60 border-b md:border-b-0 md:border-r border-white/10 relative">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs shadow-lg">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[11px] text-amber-300/80 font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Authentic Handcrafted INT Gift Mart Creation</span>
            </p>
          </div>
        </div>

        {/* Right: Details & Customizer */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                {product.category_name}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-white">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviews_count} reviews)</span>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-white leading-snug">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-amber-400">
                LKR {currentPrice.toLocaleString()}
              </span>
              {product.original_price > currentPrice && (
                <span className="text-xs text-slate-400 line-through">
                  LKR {product.original_price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Options Selection if any */}
            {product.options && product.options.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-bold text-slate-200">
                  Select Option:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedOption(opt.label)}
                      className={`p-2.5 rounded-xl border text-xs text-left font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedOption === opt.label
                          ? 'bg-amber-500/20 border-amber-400 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="font-bold text-amber-300">LKR {opt.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Dedication Note */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-bold text-slate-200">
                Personalized Note / Dedication (Optional):
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. Happy Birthday Sarah! / With all my love"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-bold text-slate-200">Quantity:</span>
              <div className="flex items-center border border-white/20 rounded-xl bg-slate-900 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-slate-300 hover:text-white hover:bg-white/10 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-slate-300 hover:text-white hover:bg-white/10 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Sri Lanka Delivery note */}
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Available for islandwide courier delivery (1-3 days)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                isAdded
                  ? 'bg-emerald-500 text-slate-950 scale-105'
                  : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{isAdded ? 'Added to Cart!' : `Add to Cart • LKR ${(currentPrice * quantity).toLocaleString()}`}</span>
            </button>

            <button
              onClick={handleWhatsAppBuy}
              className="py-3 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Buy on WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
