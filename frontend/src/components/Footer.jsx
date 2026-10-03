import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck, Sparkles, Truck, Clock, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Footer({ onOpenAdmin, onOpenInquiry }) {
  const { bankSettings } = useCart();
  return (
    <footer className="border-t border-white/10 bg-[#090b12] text-slate-400 text-xs relative pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300">
                <img
                  src="/images/logo.jpg"
                  alt="INT Gift Mart"
                  className="w-full h-full object-cover rounded-[14px]"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white">INT Gift Mart</span>
                <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">Sri Lanka's Handcrafted Studio</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Every celebration deserves a handcrafted masterpiece. Specializing in customized scannable Spotify plaques, glowing 4D light frames, Hot Wheels car bouquets, royal Jhumka organizers, and heartfelt gifts.
            </p>

            <div className="flex items-center gap-3 text-slate-300">
              <a
                href="https://wa.me/94753259928"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors"
                title="WhatsApp Us"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:support@intgiftmart.lk"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Email Us"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Gift Categories</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Floral & Chocolate Bouquets</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">4D Glowing Light Frames</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Jhumkas Luxury Boxes</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Spotify & Voice QR Frames</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Pencil & Oil Art Portraits</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Gentlemen's Gift Hampers</a></li>
            </ul>
          </div>

          {/* Customer Service & Delivery */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sri Lanka Delivery</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Colombo & Suburbs:</strong>
                  <p>Next-day express delivery (LKR 350)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">All 25 Island-wide Districts:</strong>
                  <p>2 - 3 business days via registered courier (LKR 550)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Workshop Location:</strong>
                  <p>Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Commercial Bank details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Orders & Assistance</h4>
            <p className="text-xs text-slate-400">
              Need assistance selecting or customizing a gift? Reach our artisan team directly:
            </p>
            <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 space-y-1.5">
              <div className="text-white font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+94 75 325 9928</span>
              </div>
              <p className="text-[11px] text-amber-300">Open 7 Days: 9:00 AM – 9:00 PM</p>
            </div>
            <button
              onClick={onOpenInquiry}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-colors"
            >
              Request Custom Design
            </button>
          </div>

        </div>

        {/* Bottom Bar (Cleaned up: No public Admin Portal text) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <p>© 2026 INT Gift Mart. All rights reserved. Handcrafted with love in Sri Lanka.</p>
            {/* Discreet hidden admin shortcut lock */}
            <button
              onClick={onOpenAdmin}
              className="opacity-20 hover:opacity-100 transition-opacity p-0.5 text-slate-400 hover:text-amber-400"
              title="Admin Staff Login"
              aria-label="Staff Login"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400/90 font-medium">
              Official Bank: {bankSettings?.bank_name || 'Commercial Bank of Ceylon PLC'} (Acc: {bankSettings?.bank_account_number || '8010 4492 1102'})
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
