import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Award, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export default function GiftMatcher({ products, onSelectProduct }) {
  const { addToCart } = useCart();
  const [recipient, setRecipient] = useState(null);
  const [occasion, setOccasion] = useState(null);
  const [budget, setBudget] = useState(null);
  const [matchedProducts, setMatchedProducts] = useState(null);

  const recipientOptions = [
    { id: 'for-her', label: 'Her (Girlfriend / Wife)', icon: '💍', sub: 'Romantic & Elegant' },
    { id: 'for-him', label: 'Him (Boyfriend / Husband)', icon: '🏎️', sub: 'Cars, Hampers & Art' },
    { id: 'friend', label: 'Best Friend', icon: '✨', sub: 'Memories & Fun' },
    { id: 'family', label: 'Parents / Family', icon: '🏡', sub: 'Cherished Moments' },
    { id: 'kids', label: 'Kids & Teens', icon: '🧸', sub: 'Chocolates & Toys' }
  ];

  const occasionOptions = [
    { id: 'birthday', label: 'Birthday Celebration', icon: '🎂' },
    { id: 'anniversary', label: 'Anniversary / Monthsary', icon: '💖' },
    { id: 'love', label: 'Valentine’s / Pure Love', icon: '🌹' },
    { id: 'apology', label: 'Sorry / Make Up Gift', icon: '🥺' },
    { id: 'any', label: 'Just Because / Special Day', icon: '🎁' }
  ];

  const budgetOptions = [
    { id: 'budget-1', label: 'Under LKR 2,000', max: 2000, min: 0 },
    { id: 'budget-2', label: 'LKR 2,000 - 5,000', max: 5000, min: 2000 },
    { id: 'budget-3', label: 'LKR 5,000 - 8,500', max: 8500, min: 5000 },
    { id: 'budget-4', label: 'Luxury (LKR 8,500+)', max: 99999, min: 8500 }
  ];

  const handleMatch = () => {
    if (!recipient || !occasion || !budget) return;

    const selectedBudget = budgetOptions.find(b => b.id === budget);

    // Filter products
    let matches = products.filter(p => {
      const price = p.price;
      const withinBudget = price >= selectedBudget.min && price <= selectedBudget.max;

      // Recipient tag matching
      let recipientMatch = true;
      if (recipient === 'for-him') {
        recipientMatch = p.tags.includes('for-him') || p.tags.includes('car') || p.category === 'hampers' || p.category === 'art_drawings';
      } else if (recipient === 'for-her') {
        recipientMatch = p.tags.includes('for-her') || p.category === 'jhumkas' || p.tags.includes('rose') || p.tags.includes('butterfly') || p.tags.includes('makeup');
      } else if (recipient === 'kids') {
        recipientMatch = p.tags.includes('kids') || p.tags.includes('teddy') || p.category === 'puzzles';
      }

      return withinBudget && recipientMatch;
    });

    // Fallback if strict match has few items
    if (matches.length < 3) {
      matches = products.filter(p => p.price >= selectedBudget.min && p.price <= selectedBudget.max);
    }

    // Sort by rating and reviews
    matches.sort((a, b) => (b.rating * b.reviews_count) - (a.rating * a.reviews_count));
    const topMatches = matches.slice(0, 3);
    setMatchedProducts(topMatches);

    // Celebration confetti
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#F43F5E', '#10B981']
    });
  };

  const handleReset = () => {
    setRecipient(null);
    setOccasion(null);
    setBudget(null);
    setMatchedProducts(null);
  };

  return (
    <section id="matcher" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Gift Concierge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Magic Gift Matcher Quiz
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Not sure what to give? Tell us in 3 quick taps and we'll reveal the perfect handcrafted surprise!
          </p>
        </div>

        {/* Quiz Container */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#121522]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          
          {!matchedProducts ? (
            <div className="space-y-8">
              
              {/* Step 1: Recipient */}
              <div>
                <label className="block text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">1</span>
                  <span>Who are you gifting today?</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {recipientOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRecipient(opt.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        recipient === opt.id
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/20 scale-[1.02]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1.5">{opt.icon}</div>
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Occasion */}
              <div>
                <label className="block text-sm font-bold text-rose-300 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-extrabold">2</span>
                  <span>What's the special occasion?</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {occasionOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setOccasion(opt.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        occasion === opt.id
                          ? 'bg-rose-500/20 border-rose-400 text-white shadow-lg shadow-rose-500/20 scale-[1.02]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1.5">{opt.icon}</div>
                      <div className="text-xs font-bold">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Budget */}
              <div>
                <label className="block text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">3</span>
                  <span>Select your target budget (LKR):</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setBudget(opt.id)}
                      className={`p-3.5 rounded-2xl text-center border transition-all ${
                        budget === opt.id
                          ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-[1.02]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleMatch}
                  disabled={!recipient || !occasion || !budget}
                  className={`px-8 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all ${
                    recipient && occasion && budget
                      ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Reveal My Perfect Gift Matches ✨</span>
                </button>
              </div>

            </div>
          ) : (
            /* Results View */
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                    <span>✨ Handpicked Matches for Your Loved One</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Based on your selection, here are the top 3 highest-rated gifts!
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset & Try Again</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchedProducts.map((p, idx) => (
                  <div
                    key={p.id}
                    className="rounded-2xl p-4 bg-slate-900/80 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400 transition-all hover:scale-[1.02] shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold">
                      #{idx + 1} Best Match
                    </div>

                    <div>
                      <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-black/40">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[10px] font-semibold uppercase text-amber-400">
                        {p.category_name}
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-amber-400">
                          LKR {p.price.toLocaleString()}
                        </div>
                        {p.original_price > p.price && (
                          <div className="text-[10px] text-slate-500 line-through">
                            LKR {p.original_price.toLocaleString()}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white text-xs font-bold transition-all shadow-md"
                        >
                          + Cart
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
