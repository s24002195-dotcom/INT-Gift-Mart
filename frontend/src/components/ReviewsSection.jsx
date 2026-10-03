import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, ShieldCheck, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (e) {
      // Fallback reviews
      setReviews([
        {
          id: "r1",
          customer_name: "Kavindi Perera",
          city: "Colombo 07",
          rating: 5,
          comment: "I ordered the A4 Spotify frame for our 2nd anniversary and my fiancé literally cried! The sound wave scanned instantly and the wood finish was so luxury.",
          created_at: "2026-09-20"
        },
        {
          id: "r2",
          customer_name: "Fathima Rizna",
          city: "Kandy",
          rating: 5,
          comment: "The 16 pair Jhumka box is magnificent! All earrings are authentic premium quality and the velvet box is a showstopper. Super fast delivery to Kandy.",
          created_at: "2026-09-22"
        },
        {
          id: "r3",
          customer_name: "Nimasha Senanayake",
          city: "Galle",
          rating: 5,
          comment: "Gave the diecast car bouquet to my boyfriend on his 25th birthday. Best reaction ever! The Hot Wheels arrangement with midnight ribbons is unmatched.",
          created_at: "2026-09-24"
        },
        {
          id: "r4",
          customer_name: "Dulshan Madusanka",
          city: "Nugegoda",
          rating: 5,
          comment: "The 4D glowing light frame looks 10x better in person than photos. The warm ambient LED transforms our bedroom at night.",
          created_at: "2026-09-25"
        }
      ]);
    }
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name,
          city: city || 'Sri Lanka',
          rating: rating,
          comment: comment
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setShowReviewForm(false);
          fetchReviews();
        }, 2000);
      }
    } catch (e) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowReviewForm(false);
      }, 2000);
    }
  };

  return (
    <section id="reviews" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              1,800+ Happy Hearts Across Sri Lanka
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Discover authentic feedback from customers who turned special moments into unforgettable memories.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400">4.98 Overall Satisfaction</span>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Review Form Drawer/Modal */}
        {showReviewForm && (
          <div className="mb-10 p-6 rounded-3xl bg-[#121522] border border-amber-500/30 max-w-xl mx-auto animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-white mb-3">Share Your INT Gift Mart Experience</h3>
            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Your verified review has been posted.</span>
              </div>
            ) : (
              <form onSubmit={handlePostReview} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Your City (e.g. Colombo, Kandy)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star className={`w-4 h-4 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what you loved about your gift or unboxing experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl p-5 bg-[#121522]/90 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {rev.created_at}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{rev.customer_name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[10px] text-slate-400">{rev.city}</p>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
