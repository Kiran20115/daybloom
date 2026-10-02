import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, CheckCircle2, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 px-4 rounded-2xl bg-white/95 dark:bg-[#1E1A2E]/95 border border-purple-100 dark:border-purple-900/40 shadow-soft-lg backdrop-blur-md transform transition-all duration-300 animate-bloom"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/40 text-purple-600 dark:text-purple-300 shrink-0">
              {toast.type === 'flower' ? (
                <span className="text-base">🌷</span>
              ) : toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Sparkles className="w-4 h-4 text-purple-500" />
              )}
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
