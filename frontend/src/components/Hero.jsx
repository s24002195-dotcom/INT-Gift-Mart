import React, { useState } from 'react';
import { Sparkles, ArrowRight, Gift, ShieldCheck, HeartHandshake, Truck, Tag, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero({ onExploreCatalog, onOpenStudio }) {
  const [unboxed, setUnboxed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleUnbox = () => {
    setUnboxed(true);
    // Trigger festive golden confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#F43F5E', '#FBBF24', '#FFFFFF']
    });
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('INTMAGIC15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-rose-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-amber-500/5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sri Lanka's Premier Handcrafted Gift Boutique</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Handcrafted With Love,{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-amber-200 font-serif italic">
                Sealed With Magic.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From glowing scannable <strong className="text-white font-medium">Spotify & Voice QR Frames</strong> to magnificent <strong className="text-white font-medium">Chocolate & Rose Bouquets</strong>, royal <strong className="text-white font-medium">Jhumka jewelry organizers</strong>, and handcrafted portraits. Every gift is customized to tell your unique story.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalog"
                onClick={onExploreCatalog}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-bold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 group"
              >
                <span>Explore Catalog (45+ Gifts)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#studio"
                onClick={onOpenStudio}
                className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/15 hover:border-amber-400/50 text-white font-semibold text-sm backdrop-blur-md hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Custom Gift Studio</span>
              </a>

              <a
                href="https://wa.me/94753259928?text=Hi%20INT%20Gift%20Mart!%20I'd%20like%20to%20order%20a%20surprise%20gift."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/25 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span>⚡ WhatsApp Order</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <Truck className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Islandwide</h4>
                  <p className="text-[11px] text-slate-400">All 25 districts</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-left">
                <HeartHandshake className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">100% Custom</h4>
                  <p className="text-[11px] text-slate-400">Tailored for you</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">4.98 ★ Rated</h4>
                  <p className="text-[11px] text-slate-400">1,800+ reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Interactive Unboxing Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Hero Banner Showcase Frame */}
            <div className="relative w-full max-w-lg lg:max-w-xl rounded-3xl p-1 bg-gradient-to-b from-amber-500/40 via-rose-500/20 to-transparent shadow-2xl shadow-amber-500/10 group">
              <div className="relative rounded-[22px] overflow-hidden bg-slate-900 border border-white/10 aspect-[16/9] shadow-2xl">
                <img
                  src="/images/hero.jpg?v=3"
                  alt="INT Gift Mart Official Handcrafted Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = '/products/crop_1_3.jpg';
                  }}
                />
                
                {/* Overlay floating badge (top-right so it never blocks the top-left INT Gift Mart logo) */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Official Studio Display</span>
                </div>

                <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold shadow-xl flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>From LKR 499/- to 9,800/-</span>
                </div>
              </div>

              {/* Floating decorative badge */}
              <div className="absolute -bottom-5 -left-4 bg-[#0b132b]/95 border border-amber-400/30 p-2.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-float">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shadow-md">
                  <img src="/images/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-[11px] font-bold text-white">Handcrafted With Love</p>
                  <p className="text-[10px] text-amber-400/90 font-medium">Islandwide Sri Lanka</p>
                </div>
              </div>
            </div>

            {/* Interactive Unbox Surprise Box */}
            <div className="w-full max-w-md mt-10 pt-4">
              <div className="relative rounded-2xl p-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-500/30 backdrop-blur-md text-center">
                {!unboxed ? (
                  <button
                    onClick={handleUnbox}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4 animate-bounce" />
                    <span>Click to Unbox Today's Secret Voucher 🎁</span>
                  </button>
                ) : (
                  <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Congratulations! You Unlocked 15% OFF!</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="px-3.5 py-1.5 rounded-lg bg-black/60 border border-amber-400/40 text-amber-300 font-mono text-sm tracking-wider font-bold">
                        INTMAGIC15
                      </div>
                      <button
                        onClick={copyCoupon}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-950" /> : <Tag className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Apply at checkout for 15% discount on all custom frames & bouquets!
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
