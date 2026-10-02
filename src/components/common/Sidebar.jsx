import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CheckSquare,
  Clock3,
  GraduationCap,
  Sprout,
  Target,
  Calendar,
  BarChart3,
  BookOpenText,
  Award,
  Settings,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

export const Sidebar = () => {
  const { activeTab, setActiveTab, tasks, habits, user, currentUser, logout } = useApp();

  const todayStr = formatDate();

  // Badge calculations
  const pendingTasksToday = tasks.filter(
    (t) => t.dueDate === todayStr && t.status !== 'Completed'
  ).length;

  const habitsPendingToday = habits.filter(
    (h) => !h.archived && !h.completedDates?.[todayStr]
  ).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: pendingTasksToday > 0 ? pendingTasksToday : null },
    { id: 'planner', label: 'Daily Planner', icon: Clock3 },
    { id: 'study', label: 'Study Tracker', icon: GraduationCap },
    { id: 'habits', label: 'Habits 🌱', icon: Sprout, badge: habitsPendingToday > 0 ? `${habitsPendingToday}` : null },
    { id: 'goals', label: 'Goals & Progress', icon: Target },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notes', label: 'Notes & Journal', icon: BookOpenText },
    { id: 'rewards', label: 'Rewards & Badges', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col h-screen sticky top-0 bg-[#FAF5EF]/90 dark:bg-[#120F1D]/90 border-r border-purple-100/80 dark:border-purple-950/40 p-5 transition-colors">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 py-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-400 via-pink-400 to-rose-300 flex items-center justify-center text-xl shadow-soft text-white">
          🌷
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-700 via-pink-600 to-rose-500 dark:from-purple-300 dark:via-pink-300 dark:to-rose-300 bg-clip-text text-transparent font-serif">
            DayBloom
          </span>
          <p className="text-[10px] uppercase tracking-wider text-purple-600/70 dark:text-purple-300/70 font-semibold">
            Study & Life Studio
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-100 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/30 text-purple-900 dark:text-purple-200 shadow-soft-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/40 hover:text-purple-700 dark:hover:text-purple-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-300'
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-purple-500'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-100'
                      : 'bg-purple-100/70 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile & Sign Out */}
      <div className="pt-4 border-t border-purple-100/60 dark:border-purple-900/30">
        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-purple-50 dark:border-purple-900/20 shadow-soft-sm flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center text-base shrink-0">
              {user.avatar || '🌷'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 truncate">
                {currentUser?.email || 'kiran@daybloom.app'}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
