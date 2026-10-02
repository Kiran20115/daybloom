import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';

export const MotivationalBanner = () => {
  const { motivationalQuotes } = useApp();
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * motivationalQuotes.length));

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
  };

  const currentQuote = motivationalQuotes[quoteIndex] || motivationalQuotes[0];

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-purple-100/90 via-pink-100/70 to-amber-50/80 dark:from-[#211A33] dark:via-[#281E38] dark:to-[#1F1B2C] border border-purple-200/50 dark:border-purple-800/30 shadow-soft">
      {/* Decorative blurred background shapes */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-300/30 dark:bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-pink-300/30 dark:bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 max-w-2xl">
          <div className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0 shadow-soft-sm">
            <Quote className="w-5 h-5 fill-purple-200/50 dark:fill-purple-800/30" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700/80 dark:text-purple-300/80 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Daily Inspiration
            </span>
            <p className="text-sm sm:text-base font-serif italic text-slate-800 dark:text-slate-100 leading-relaxed">
              "{currentQuote.text}"
            </p>
            <p className="text-xs font-semibold text-purple-800/80 dark:text-purple-300 mt-2">
              — {currentQuote.author}
            </p>
          </div>
        </div>

        <button
          onClick={handleNextQuote}
          title="Inspire me with another quote"
          className="p-2 sm:p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 text-purple-600 dark:text-purple-300 transition-all shadow-soft-sm hover:rotate-180"
          aria-label="Refresh quote"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
