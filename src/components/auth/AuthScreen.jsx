import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
  BookOpen,
} from 'lucide-react';
import { triggerCelebrationConfetti } from '../common/FlowerConfetti';

const AVATAR_OPTIONS = ['🌷', '🌸', '🌿', '☕', '💻', '📚', '✨', '🦊', '🌙', '🦋'];

export const AuthScreen = () => {
  const { login, signup, loginAsGuest, loginAsDemoKiran, notify } = useApp();

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('🌷');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signin') {
      if (!email.trim() || !password) {
        setErrorMsg('Please enter both email and password.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const result = login(email.trim(), password);
        setIsLoading(false);
        if (!result.success) {
          setErrorMsg(result.message || 'Invalid email or password.');
        } else {
          triggerCelebrationConfetti();
        }
      }, 300);
    } else {
      // Sign Up
      if (!name.trim()) {
        setErrorMsg('Please provide your name.');
        return;
      }
      if (!email.trim()) {
        setErrorMsg('Please provide a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const result = signup({
          name: name.trim(),
          email: email.trim(),
          password,
          avatar,
        });
        setIsLoading(false);
        if (!result.success) {
          setErrorMsg(result.message);
        } else {
          triggerCelebrationConfetti();
        }
      }, 300);
    }
  };

  const handleForgotPassword = () => {
    notify('Password reset link simulated: Please log in using your demo password or continue as Guest!', 'info');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#0C0A14] flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 relative overflow-hidden">
      {/* Soft pastel decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/25 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/25 dark:bg-pink-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-4xl bg-white/90 dark:bg-[#161324]/90 border border-purple-100 dark:border-purple-900/30 shadow-soft-xl overflow-hidden backdrop-blur-xl z-10 animate-bloom">
        {/* Left Side: Brand Story & Aesthetics */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-purple-100/70 via-pink-50/60 to-cream-100 dark:from-[#211A33] dark:via-[#1D172E] dark:to-[#171324] flex flex-col justify-between border-b md:border-b-0 md:border-r border-purple-100/80 dark:border-purple-900/20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-300 flex items-center justify-center text-2xl shadow-soft text-white">
                🌷
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-700 via-pink-600 to-rose-500 dark:from-purple-300 dark:via-pink-300 dark:to-rose-300 bg-clip-text text-transparent font-serif">
                  DayBloom
                </span>
                <p className="text-[11px] uppercase tracking-wider text-purple-600 dark:text-purple-300 font-semibold">
                  Personal Productivity Studio
                </p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
              Bloom with clarity. <br />
              <span className="text-purple-600 dark:text-purple-300 font-serif italic font-normal">
                One gentle step at a time.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Designed specifically for students to organize study targets, Pomodoro sessions, healthy routines, and joyful consistency.
            </p>

            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-purple-200/60 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Full study tracker with Pomodoro focus cycles</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-pink-200/60 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>90-day consistency heatmap & gentle habit streaks</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-amber-200/60 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Secure, isolated offline storage with JSON backup</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-purple-200/50 dark:border-purple-900/30 mt-8">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              "Small daily improvements over time lead to stunning results."
            </p>
          </div>
        </div>

        {/* Right Side: Sign In / Sign Up Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-purple-50/80 dark:bg-slate-800/80 rounded-2xl border border-purple-100 dark:border-purple-900/30 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'signin'
                    ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-100 shadow-soft-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-100 shadow-soft-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {mode === 'signin' ? 'Welcome Back! 🌸' : 'Plant Your Garden 🌷'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              {mode === 'signin'
                ? 'Sign in to access your personal dashboard and habits.'
                : 'Create an account to start your mindful productivity journey.'}
            </p>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-600 dark:text-rose-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kiran Sharma"
                        className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Choose Your Emblem
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setAvatar(av)}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-transform ${
                            avatar === av
                              ? 'bg-purple-100 dark:bg-purple-900 ring-2 ring-purple-500 scale-110'
                              : 'bg-slate-50 dark:bg-slate-800 hover:scale-105'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kiran@daybloom.app"
                    className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
              )}

              {mode === 'signin' && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-400"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 mt-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-glow-lavender transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Blossoming...</span>
                ) : (
                  <>
                    <span>{mode === 'signin' ? 'Sign In to DayBloom' : 'Create My Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Demo & Guest Access */}
          <div className="mt-6 pt-5 border-t border-purple-100 dark:border-purple-900/30 space-y-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={loginAsDemoKiran}
                className="flex-1 py-2 px-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-100 transition-all text-center"
              >
                ✨ 1-Click Demo (Kiran)
              </button>

              <button
                type="button"
                onClick={loginAsGuest}
                className="flex-1 py-2 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 transition-all text-center"
              >
                🌿 Continue as Guest
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400">
              Demo preloads realistic DSA study schedules, habits & goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
