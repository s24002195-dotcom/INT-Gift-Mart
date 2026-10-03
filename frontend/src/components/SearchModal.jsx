import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, products, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category_name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f121e] border border-white/15 p-5 text-white shadow-2xl space-y-4">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gifts (e.g. Spotify, Jhumka, Car bouquet, Rose, 4D frame, LKR)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white text-xs px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto space-y-2">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-slate-400 space-y-3">
              <p>Type keywords to search INT Gift Mart collection:</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Spotify Frame', 'Car Bouquet', 'Jhumkas', 'Kinder Joy', '4D Light', 'Boys Hamper', 'Polaroid'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No gifts found matching "{query}". Try a different keyword or browse categories below.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-white/5 hover:border-amber-500/30 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                        {item.category_name}
                      </span>
                      <span className="text-slate-500">•</span>
                      <div className="flex items-center gap-0.5 text-amber-400 text-[10px]">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-xs font-extrabold text-amber-400">
                    LKR {item.price.toLocaleString()}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
