import React from 'react';
import { CheckCircle2, Phone, ShoppingBag, Sparkles, Copy, Truck } from 'lucide-react';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.order_id);
    alert(`Copied Order ID: ${order.order_id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0f121e] border border-amber-500/30 p-6 sm:p-8 text-center text-white shadow-2xl space-y-6">
        
        {/* Animated Check Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Order Successfully Placed! 🎉
          </h3>
          <p className="text-xs text-slate-300">
            Thank you for trusting <strong className="text-amber-300">INT Gift Mart</strong>. Our artisan team is currently preparing your customized handcrafted surprise!
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-left space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Order Reference:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-amber-400">{order.order_id}</span>
              <button
                onClick={handleCopyOrderId}
                className="text-slate-400 hover:text-white"
                title="Copy ID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Order Status:</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
              {order.status || 'Confirmed'}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-2">
            <span className="text-slate-400">Total Amount:</span>
            <span className="text-base font-extrabold text-white">
              LKR {order.total ? order.total.toLocaleString() : '0.00'}
            </span>
          </div>
        </div>

        {/* Delivery note */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center justify-center gap-2">
          <Truck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Island-wide tracking link will be sent to your WhatsApp shortly.</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {order.whatsapp_url && (
            <a
              href={order.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Connect on WhatsApp for Live Updates ⚡</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Exploring Gifts</span>
          </button>
        </div>

      </div>
    </div>
  );
}
