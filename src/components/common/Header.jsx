import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTimeGreeting, formatFullDate } from '../../utils/dateUtils';
import {
  Sun,
  Moon,
  Plus,
  Sparkles,
  Flame,
  Menu,
  Search,
  CalendarClock,
  LogOut,
  User,
  Settings,
} from 'lucide-react';

export const Header = () => {
  const {
    user,
    currentUser,
    logout,
    updateUser,
    setIsMobileNavOpen,
    setIsTaskModalOpen,
    setEditingTask,
    setIsPlanDayModalOpen,
    searchQuery,
    setSearchQuery,
    setActiveTab,
  } = useApp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const greetingInfo = getTimeGreeting(user.name);
  const fullDateStr = formatFullDate();

  const toggleTheme = () => {
    updateUser({ theme: user.theme === 'dark' ? 'light' : 'dark' });
  };

  const handleOpenAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-purple-100/70 dark:border-purple-900/20 px-4 sm:px-8 py-3.5 sm:py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Personalized Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/30 transition-colors"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <span>{greetingInfo.greeting}</span>
                <span className="animate-bounce inline-block">{greetingInfo.emoji}</span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5">
              {fullDateStr} • <span className="italic text-purple-600 dark:text-purple-300">{greetingInfo.subtext}</span>
            </p>
          </div>
        </div>

        {/* Center / Search bar on desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, notes, habits..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/30 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions: Streak, Plan My Day, Add Task, Theme & Profile Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Consistency Streak Pill */}
          <div
            title={`${user.streak} day consistency streak!`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200/60 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-xs font-semibold shadow-soft-sm cursor-default"
          >
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>{user.streak} {user.streak === 1 ? 'day' : 'days'} streak</span>
          </div>

          {/* Plan My Day button */}
          <button
            onClick={() => setIsPlanDayModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-100/70 transition-all shadow-soft-sm"
          >
            <CalendarClock className="w-3.5 h-3.5" />
            <span>Plan My Day</span>
          </button>

          {/* Quick Add Task */}
          <button
            onClick={handleOpenAddTask}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-glow-lavender transition-all duration-200 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors shadow-soft-sm"
            aria-label="Toggle theme"
          >
            {user.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-purple-500" />
            )}
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center text-lg border border-purple-200/60 dark:border-purple-800/40 shadow-soft-sm hover:scale-105 transition-all"
              title="Account Menu"
            >
              {user.avatar || '🌷'}
            </button>

            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#1C182B] rounded-2xl shadow-soft-xl border border-purple-100 dark:border-purple-900/40 p-2 z-30 animate-bloom text-xs">
                  <div className="px-3 py-2 border-b border-purple-50 dark:border-purple-900/20 mb-1">
                    <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {currentUser?.email || 'kiran@daybloom.app'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setActiveTab('settings');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 text-purple-500" />
                    <span>Profile & Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
