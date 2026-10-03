import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, Tag, Truck, Gift, MessageSquare, Phone, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onProceedCheckout }) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCost,
    discountAmount,
    discountPercent,
    giftWrapCost,
    total,
    deliveryMethod,
    setDeliveryMethod,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    couponCode,
    applyCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const handleWhatsAppCheckout = async () => {
    if (cartItems.length === 0) return;

    // Create a quick order via WhatsApp
    let itemsText = '';
    cartItems.forEach((it, idx) => {
      const opt = it.selectedOption ? ` (${it.selectedOption})` : '';
      let cust = '';
      if (it.customDetails) {
        const parts = Object.entries(it.customDetails).map(([k, v]) => `${k}: ${v}`);
        if (parts.length > 0) cust = ` [${parts.join(', ')}]`;
      }
      itemsText += `${idx + 1}. ${it.name}${opt} x${it.quantity} - LKR ${(it.price * it.quantity).toLocaleString()}${cust}\n`;
    });

    const msg = (
      `🎁 *NEW ORDER - INT GIFT MART*\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *Items:*\n${itemsText}\n` +
      `💰 *Subtotal:* LKR ${subtotal.toLocaleString()}\n` +
      (discountAmount > 0 ? `🎟️ *Discount (${discountPercent}%):* -LKR ${discountAmount.toLocaleString()}\n` : '') +
      `🚚 *Delivery:* ${deliveryMethod === 'colombo' ? 'Colombo Suburbs' : 'Islandwide Sri Lanka'} (LKR ${shippingCost.toLocaleString()})\n` +
      (giftWrap ? `🎀 *Gift Wrapping:* Yes (LKR 350)\n` : '') +
      (giftMessage ? `💌 *Card Message:* "${giftMessage}"\n` : '') +
      `✨ *ESTIMATED TOTAL:* LKR ${total.toLocaleString()}\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `Hi INT Gift Mart! Please confirm my order for Commercial Bank transfer. I will send the deposit slip. Thank you! ✨`
    );

    window.open(`https://wa.me/94753259928?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d101b] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Your Gift Bag</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                {cartItems.reduce((acc, it) => acc + it.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Your bag is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Explore our handcrafted bouquets, Spotify plaques, and jewelry boxes to surprise your loved ones!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.itemKey}
                  className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex gap-3 relative group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedOption && (
                      <p className="text-[10px] text-amber-300 font-medium">
                        {item.selectedOption}
                      </p>
                    )}

                    {item.customDetails && Object.keys(item.customDetails).length > 0 && (
                      <div className="text-[10px] text-slate-400 bg-black/40 px-2 py-1 rounded-md">
                        {Object.entries(item.customDetails).map(([k, v]) => (
                          <div key={k} className="truncate">
                            <span className="text-slate-300 font-medium">{k}:</span> {v}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-xs font-extrabold text-amber-400">
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </div>

                      <div className="flex items-center border border-white/15 rounded-lg bg-black/40 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="space-y-4 pt-2">
                {/* Gift Wrapping & Card Note */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <label className="flex items-center justify-between cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-rose-400" />
                      <div>
                        <div className="font-bold text-white">Add Luxury Gift Box & Ribbon</div>
                        <div className="text-[10px] text-slate-400">Signature INT silk packaging (+ LKR 350)</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                  </label>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-amber-400" />
                      <span>Complimentary Handwritten Gift Card Note:</span>
                    </label>
                    <textarea
                      rows={2}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write your heartfelt message here..."
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Delivery Selector */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Sri Lanka Delivery Area:</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('colombo')}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        deliveryMethod === 'colombo'
                          ? 'bg-amber-500/20 border-amber-400 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">Colombo & Suburbs</div>
                      <div className="text-[10px] text-amber-300 mt-0.5">LKR 350 (1-2 days)</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('islandwide')}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        deliveryMethod === 'islandwide'
                          ? 'bg-amber-500/20 border-amber-400 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">Island-wide Courier</div>
                      <div className="text-[10px] text-amber-300 mt-0.5">LKR 550 (2-3 days)</div>
                    </button>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Coupon Code (e.g. INTMAGIC15)"
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white uppercase focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponFeedback && (
                    <p className={`text-[11px] font-medium ${couponFeedback.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout CTAs */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#0a0c14] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">LKR {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="font-mono">-LKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Delivery ({deliveryMethod === 'colombo' ? 'Colombo' : 'Island-wide'}):</span>
                  <span className="font-mono text-white">LKR {shippingCost.toLocaleString()}</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between text-slate-400">
                    <span>Gift Wrapping:</span>
                    <span className="font-mono text-white">+LKR 350</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total Amount:</span>
                  <span className="text-amber-400 font-mono">LKR {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Instant WhatsApp Order */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-slate-950" />
                  <span>Order via WhatsApp ⚡ (Recommended)</span>
                </button>

                {/* 2. Direct Web Checkout */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onProceedCheckout();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Proceed to Commercial Bank Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Secure Sri Lanka Delivery Guarantee • 100% Handcrafted</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
