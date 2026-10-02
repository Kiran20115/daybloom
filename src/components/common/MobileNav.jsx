import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CheckSquare,
  GraduationCap,
  Sprout,
  Menu,
  X,
  Target,
  Calendar,
  BarChart3,
  BookOpenText,
  Award,
  Settings,
  Clock3,
} from 'lucide-react';

export const MobileNav = () => {
  const { activeTab, setActiveTab, isMobileNavOpen, setIsMobileNavOpen } = useApp();

  const primaryItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'study', label: 'Study', icon: GraduationCap },
    { id: 'habits', label: 'Habits', icon: Sprout },
    { id: 'more', label: 'Menu', icon: Menu },
  ];

  const fullNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'planner', label: 'Daily Planner', icon: Clock3 },
    { id: 'study', label: 'Study Tracker 📚', icon: GraduationCap },
    { id: 'habits', label: 'Habit Tracker 🌱', icon: Sprout },
    { id: 'goals', label: 'Goals & Progress 🎯', icon: Target },
    { id: 'calendar', label: 'Calendar 📅', icon: Calendar },
    { id: 'analytics', label: 'Productivity Analytics 📊', icon: BarChart3 },
    { id: 'notes', label: 'Notes & Journal 📝', icon: BookOpenText },
    { id: 'rewards', label: 'Rewards & Badges 🏆', icon: Award },
    { id: 'settings', label: 'Profile & Settings ⚙️', icon: Settings },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMobileNavOpen(false);
  };

  return (
    <>
      {/* Bottom bar for mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#151221]/95 border-t border-purple-100 dark:border-purple-900/30 backdrop-blur-md px-2 py-2 flex items-center justify-around shadow-soft-lg">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const isSelected = item.id === 'more' ? isMobileNavOpen : activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'more') {
                  setIsMobileNavOpen(!isMobileNavOpen);
                } else {
                  handleSelectTab(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                isSelected
                  ? 'text-purple-600 dark:text-purple-300 font-semibold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Drawer for all navigation tabs on mobile */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-[#161324] shadow-2xl z-50 p-6 flex flex-col justify-between animate-bloom">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-purple-50 dark:border-purple-900/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌷</span>
                  <span className="font-serif font-bold text-lg text-slate-800 dark:text-slate-100">
                    DayBloom
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-1 max-h-[70vh] overflow-y-auto">
                {fullNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-purple-500" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-purple-50 dark:border-purple-900/30 text-xs text-center text-slate-400">
              DayBloom — Blossom Every Day
            </div>
          </div>
        </div>
      )}
    </>
  );
};
