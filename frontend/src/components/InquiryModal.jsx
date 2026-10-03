import React, { useState } from 'react';
import { X, Send, Sparkles, Phone, CheckCircle2 } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [budget, setBudget] = useState('LKR 5,000 - 8,000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setLoading(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          occasion,
          budget,
          message
        })
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const handleSendWhatsAppDirect = () => {
    const text = `Hi INT Gift Mart! 🎁 My name is ${name || 'Customer'}. I am looking for a custom gift for ${occasion} with a budget of ${budget}. Details: ${message || 'Please guide me!'}`;
    window.open(`https://wa.me/94753259928?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0f121e] border border-white/15 p-6 sm:p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan Consultation</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Custom Gift Inquiry
          </h3>
          <p className="text-xs text-slate-400">
            Have a unique gift idea? Tell us and our artisans will craft it for you!
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Inquiry Received!</h4>
            <p className="text-xs text-emerald-300">
              Our INT Gift Mart artisan team will contact you via WhatsApp (+94 75 325 9928) within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ruwanthi"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 075 325 9928"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Valentine's">Valentine's Day</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Apology">Apology / Love</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Budget (LKR)</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Under LKR 3,000">Under LKR 3,000</option>
                  <option value="LKR 3,000 - 6,000">LKR 3,000 - 6,000</option>
                  <option value="LKR 6,000 - 10,000">LKR 6,000 - 10,000</option>
                  <option value="LKR 10,000+ Luxury">LKR 10,000+ Luxury</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Custom Request Details *</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe what you want (custom photos, favorite chocolates, special colors, date of delivery)..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>

              <button
                type="button"
                onClick={handleSendWhatsAppDirect}
                className="py-3 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chat Now on WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
